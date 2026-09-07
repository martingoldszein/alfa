<?php
require_once 'config.php';

// Obtener textos de la sección "programas" (header)
$stmt = $pdo->prepare("SELECT campo, texto FROM contenido
    WHERE seccion_id = (SELECT id FROM secciones WHERE clave = 'programas')
    AND idioma_id = (SELECT id FROM idiomas WHERE codigo = ?)");
$stmt->execute([$lang]);
$contenido = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

// Obtener programas con sus traducciones para el idioma actual
$stmt = $pdo->prepare("SELECT p.id, p.nombre, p.duracion, pt.etiqueta, pt.descripcion
    FROM programas p
    LEFT JOIN programas_traducciones pt ON pt.programa_id = p.id
    AND pt.idioma_id = (SELECT id FROM idiomas WHERE codigo = ?)
    ORDER BY p.orden");
$stmt->execute([$lang]);
$programas = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <!-- Tus estilos y fuentes -->
</head>
<body>
    <!-- Tu HTML con PHP inyectado -->

    <div class="programas-alfa-wrapper">
        <div class="programas-alfa-inner">
            <h2><?php echo $contenido['titulo'] ?? 'Programas Alfa'; ?></h2>
            <p><?php echo $contenido['subtitulo'] ?? ''; ?></p>

            <div class="programas-alfa-grid">
                <?php foreach ($programas as $programa): ?>
                <div class="programa-card-alfa">
                    <h3><?php echo $programa['nombre']; ?></h3>
                    <span><?php echo $programa['duracion']; ?></span>
                    <p><?php echo $programa['etiqueta']; ?></p>
                    <p><?php echo $programa['descripcion']; ?></p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</body>
</html>