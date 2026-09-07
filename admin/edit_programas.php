<?php
require_once '../config.php';
require_once 'includes/auth.php';

// --- LEER DATOS ACTUALES ---
$stmt = $pdo->query("SELECT * FROM programas ORDER BY orden");
$programas = $stmt->fetchAll();

// Obtener traducciones por programa
$traducciones = [];
$stmt = $pdo->query("SELECT * FROM programas_traducciones");
foreach ($stmt->fetchAll() as $t) {
    $traducciones[$t['programa_id']][$t['idioma_id']] = $t;
}

// --- GUARDAR CAMBIOS ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Actualizar nombre y duración (en la tabla 'programas')
    foreach ($_POST['nombre'] as $id => $nombre) {
        $stmt = $pdo->prepare("UPDATE programas SET nombre = ?, duracion = ? WHERE id = ?");
        $stmt->execute([$nombre, $_POST['duracion'][$id], $id]);
    }

    // Actualizar traducciones por idioma (para cada idioma)
    foreach ($_POST['traducciones'] as $programa_id => $idiomas) {
        foreach ($idiomas as $idioma_id => $datos) {
            // Verificar si existe
            $stmt = $pdo->prepare("SELECT id FROM programas_traducciones WHERE programa_id = ? AND idioma_id = ?");
            $stmt->execute([$programa_id, $idioma_id]);

            if ($stmt->fetch()) {
                // Actualizar
                $stmt = $pdo->prepare("UPDATE programas_traducciones SET etiqueta = ?, descripcion = ? WHERE programa_id = ? AND idioma_id = ?");
                $stmt->execute([$datos['etiqueta'], $datos['descripcion'], $programa_id, $idioma_id]);
            } else {
                // Insertar
                $stmt = $pdo->prepare("INSERT INTO programas_traducciones (programa_id, idioma_id, etiqueta, descripcion) VALUES (?, ?, ?, ?)");
                $stmt->execute([$programa_id, $idioma_id, $datos['etiqueta'], $datos['descripcion']]);
            }
        }
    }

    header('Location: edit_programas.php?msg=ok');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Programas</title>
    <style>
        body{font-family:sans-serif;background:#f4f4f4;padding:20px}
        .container{max-width:1000px;margin:auto;background:white;padding:20px;border-radius:10px}
        .programa{border:1px solid #ddd;padding:15px;margin-bottom:20px;border-radius:8px}
        .lang-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}
        input,textarea{width:100%;padding:8px;margin-bottom:5px}
        textarea{resize:vertical}
        button{background:#2B6B8A;color:white;border:none;padding:10px 20px;cursor:pointer}
    </style>
</head>
<body>
<div class="container">
    <h2>Editar Programas Alfa</h2>
    <?php if(isset($_GET['msg'])): ?><p style="color:green">Cambios guardados correctamente.</p><?php endif; ?>

    <form method="POST">
        <?php foreach ($programas as $programa): ?>
        <div class="programa">
            <h3><?php echo $programa['nombre']; ?></h3>
            <div style="display:flex;gap:10px;">
                <label>Nombre (no se traduce):</label>
                <input type="text" name="nombre[<?php echo $programa['id']; ?>]" value="<?php echo $programa['nombre']; ?>">
                <label>Duración:</label>
                <input type="text" name="duracion[<?php echo $programa['id']; ?>]" value="<?php echo $programa['duracion']; ?>">
            </div>

            <div class="lang-grid">
                <?php foreach ($idiomas as $idioma): ?>
                <div style="border:1px solid #ccc;padding:10px;">
                    <strong><?php echo $idioma['codigo']; ?> (<?php echo $idioma['nombre']; ?>)</strong>
                    <label>Etiqueta (ej: Diagnóstico):</label>
                    <input type="text" name="traducciones[<?php echo $programa['id']; ?>][<?php echo $idioma['id']; ?>][etiqueta]" value="<?php echo $traducciones[$programa['id']][$idioma['id']]['etiqueta'] ?? ''; ?>">
                    <label>Descripción:</label>
                    <textarea name="traducciones[<?php echo $programa['id']; ?>][<?php echo $idioma['id']; ?>][descripcion]"><?php echo $traducciones[$programa['id']][$idioma['id']]['descripcion'] ?? ''; ?></textarea>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
        <button type="submit">Guardar Todos</button>
    </form>
</div>
</body>
</html>