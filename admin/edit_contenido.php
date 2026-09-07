<?php
require_once '../config.php';
require_once 'includes/auth.php';

// --- OBTENER SECCIONES E IDIOMAS ---
$stmt = $pdo->query("SELECT * FROM secciones ORDER BY id");
$secciones = $stmt->fetchAll();

$stmt = $pdo->query("SELECT * FROM idiomas ORDER BY id");
$idiomas = $stmt->fetchAll();

// --- OBTENER SECCIÓN SELECCIONADA ---
$seccion_id = $_GET['seccion'] ?? $secciones[0]['id'] ?? 1;

// Obtener clave de la sección
$stmt = $pdo->prepare("SELECT clave FROM secciones WHERE id = ?");
$stmt->execute([$seccion_id]);
$seccion_clave = $stmt->fetchColumn();

// --- DEFINIR CAMPOS POR SECCIÓN ---
$campos_por_seccion = [
    'hero' => ['titulo', 'subtitulo', 'cta'],
    'programas' => ['titulo', 'subtitulo', 'modalidad'],
    'ia' => ['titulo', 'subtitulo', 'cta'],
    'contacto' => ['titulo', 'subtitulo'],
];

$campos = $campos_por_seccion[$seccion_clave] ?? [];

// --- OBTENER CONTENIDO ACTUAL ---
$contenido = [];
$stmt = $pdo->prepare("SELECT * FROM contenido WHERE seccion_id = ?");
$stmt->execute([$seccion_id]);
foreach ($stmt->fetchAll() as $row) {
    $contenido[$row['idioma_id']][$row['campo']] = $row['texto'];
}

// --- GUARDAR CAMBIOS ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach ($idiomas as $idioma) {
        $idioma_id = $idioma['id'];

        foreach ($campos as $campo) {
            $texto = $_POST[$campo][$idioma_id] ?? '';

            $stmt = $pdo->prepare("SELECT id FROM contenido WHERE seccion_id = ? AND idioma_id = ? AND campo = ?");
            $stmt->execute([$seccion_id, $idioma_id, $campo]);

            if ($stmt->fetch()) {
                $stmt = $pdo->prepare("UPDATE contenido SET texto = ? WHERE seccion_id = ? AND idioma_id = ? AND campo = ?");
                $stmt->execute([$texto, $seccion_id, $idioma_id, $campo]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO contenido (seccion_id, idioma_id, campo, texto) VALUES (?, ?, ?, ?)");
                $stmt->execute([$seccion_id, $idioma_id, $campo, $texto]);
            }
        }
    }

    header('Location: edit_contenido.php?seccion=' . $seccion_id . '&msg=ok');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Contenido · Alfalógica</title>
    <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body">

<!-- SIDEBAR -->
<div class="admin-sidebar">
    <div class="admin-sidebar__logo">
        <img src="../images/logo.png" alt="Alfalógica">
    </div>
    <ul class="admin-sidebar__menu">
        <li><a href="dashboard.php"><span class="menu-icon">📊</span><span class="menu-text">Dashboard</span></a></li>
        <li><a href="edit_contenido.php" class="active"><span class="menu-icon">📝</span><span class="menu-text">Editar Contenido</span></a></li>
        <li><a href="edit_programas.php"><span class="menu-icon">🎯</span><span class="menu-text">Programas Alfa</span></a></li>
        <li><a href="logout.php"><span class="menu-icon">🚪</span><span class="menu-text">Cerrar Sesión</span></a></li>
    </ul>
</div>

<!-- HEADER -->
<div class="admin-header">
    <div class="admin-header__left">Editar Contenido</div>
    <div class="admin-header__right">
        <a href="../index.php" target="_blank">Ver Sitio →</a>
        <span class="admin-header__user">👤 Admin</span>
    </div>
</div>

<!-- CONTENIDO -->
<div class="admin-content">
    <h1>📝 Editar Contenido</h1>

    <?php if(isset($_GET['msg'])): ?>
        <p style="color: green; font-size: 14px; margin-bottom: 20px;">Cambios guardados correctamente.</p>
    <?php endif; ?>

    <!-- Tabs de secciones -->
    <div class="section-tabs" style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
        <?php foreach ($secciones as $sec): ?>
            <a href="edit_contenido.php?seccion=<?php echo $sec['id']; ?>"
               style="padding: 10px 15px; background: <?php echo $sec['id'] == $seccion_id ? 'var(--admin-accent)' : 'var(--admin-bg)'; ?>; color: <?php echo $sec['id'] == $seccion_id ? 'white' : 'var(--admin-text)'; ?>; border-radius: 5px; text-decoration: none; font-size: 13px;">
                <?php echo $sec['nombre']; ?>
            </a>
        <?php endforeach; ?>
    </div>

    <!-- Formulario con pestañas por idioma -->
    <form method="POST">
        <div class="admin-card">
            <div class="admin-card__header">
                <h2><?php echo $seccion_clave; ?> · Textos</h2>
            </div>

            <!-- Tabs por idioma -->
            <div class="lang-tabs">
                <?php foreach ($idiomas as $index => $idioma): ?>
                    <button type="button" class="lang-tab <?php echo $index === 0 ? 'active' : ''; ?>"
                            data-lang-target="lang-<?php echo $idioma['id']; ?>">
                        <?php echo strtoupper($idioma['codigo']); ?>
                    </button>
                <?php endforeach; ?>
            </div>

            <!-- Bloques por idioma -->
            <?php foreach ($idiomas as $index => $idioma): ?>
                <div class="lang-block" id="lang-<?php echo $idioma['id']; ?>" style="<?php echo $index === 0 ? '' : 'display: none;'; ?>">
                    <h3 style="margin-bottom: 15px; font-size: 14px; color: var(--admin-accent);">
                        <?php echo $idioma['nombre']; ?>
                    </h3>

                    <?php foreach ($campos as $campo): ?>
                        <div class="admin-field">
                            <label><?php echo ucfirst(str_replace('_', ' ', $campo)); ?>:</label>

                            <?php if (in_array($campo, ['subtitulo', 'descripcion'])): ?>
                                <textarea name="<?php echo $campo; ?>[<?php echo $idioma['id']; ?>]"><?php echo $contenido[$idioma['id']][$campo] ?? ''; ?></textarea>
                            <?php else: ?>
                                <input type="text" name="<?php echo $campo; ?>[<?php echo $idioma['id']; ?>]" value="<?php echo $contenido[$idioma['id']][$campo] ?? ''; ?>">
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endforeach; ?>

            <button type="submit" class="admin-btn">Guardar Todos</button>
        </div>
    </form>
</div>

<!-- JS para pestañas por idioma -->
<script>
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Quitar activo de todos
            document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));

            // Activar este
            this.classList.add('active');

            // Ocultar todos los bloques
            document.querySelectorAll('.lang-block').forEach(block => block.style.display = 'none');

            // Mostrar el bloque correspondiente
            document.getElementById(this.dataset.langTarget).style.display = 'block';
        });
    });
</script>

</body>
</html>