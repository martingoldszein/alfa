<?php
require_once '../config.php';
require_once 'includes/auth.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin · Alfalógica</title>
    <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body">

<!-- SIDEBAR -->
<div class="admin-sidebar">
    <div class="admin-sidebar__logo">
        <img src="../images/logo.png" alt="Alfalógica">
    </div>
    <ul class="admin-sidebar__menu">
        <li>
            <a href="dashboard.php" class="active">
                <span class="menu-icon">📊</span>
                <span class="menu-text">Dashboard</span>
            </a>
        </li>
        <li>
            <a href="edit_contenido.php">
                <span class="menu-icon">📝</span>
                <span class="menu-text">Editar Contenido</span>
            </a>
        </li>
        <li>
            <a href="edit_programas.php">
                <span class="menu-icon">🎯</span>
                <span class="menu-text">Programas Alfa</span>
            </a>
        </li>
        <li>
            <a href="logout.php">
                <span class="menu-icon">🚪</span>
                <span class="menu-text">Cerrar Sesión</span>
            </a>
        </li>
    </ul>
</div>

<!-- HEADER -->
<div class="admin-header">
    <div class="admin-header__left">
        Bienvenido al Panel de Administración
    </div>
    <div class="admin-header__right">
        <a href="../index.php" target="_blank">Ver Sitio →</a>
        <span class="admin-header__user">👤 Admin</span>
    </div>
</div>

<!-- CONTENIDO -->
<div class="admin-content">
    <h1>Dashboard</h1>

    <div class="admin-card">
        <div class="admin-card__header">
            <h2>Resumen</h2>
        </div>
        <p>Este panel te permite editarte los textos y los programas del sitio de Alfalógica.</p>
        <div style="display: flex; gap: 15px; margin-top: 20px;">
            <a href="edit_contenido.php" class="admin-btn">📝 Editar Contenido</a>
            <a href="edit_programas.php" class="admin-btn admin-btn--clay">🎯 Editar Programas</a>
        </div>
    </div>
</div>

</body>
</html>