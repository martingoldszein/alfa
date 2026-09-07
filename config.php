<?php
// config.php - Conexión a MySQL
$host = 'localhost';
$db   = 'alfalogica_db';
$user = 'root';
$pass = ''; // Por defecto en XAMPP es vacío

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Iniciar sesión para el admin
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Detectar idioma (por defecto 'es')
$lang = $_GET['lang'] ?? $_SESSION['admin_lang'] ?? 'es';
?>