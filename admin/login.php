<?php
require_once '../config.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ?");
    $stmt->execute([$_POST['usuario']]);
    $user = $stmt->fetch();

    if ($user && password_verify($_POST['password'], $user['password_hash'])) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Usuario o contraseña incorrectos';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Login Admin</title>
    <style>body{font-family:sans-serif;background:#f4f4f4;display:flex;justify-content:center;align-items:center;height:100vh}form{background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}input{display:block;margin:10px 0;padding:8px;width:100%}button{background:#E39881;color:white;border:none;padding:10px;width:100%;cursor:pointer}</style>
</head>
<body>
    <form method="POST">
        <h2>Admin Alfalógica</h2>
        <?php if($error): ?><p style="color:red"><?php echo $error; ?></p><?php endif; ?>
        <input type="text" name="usuario" placeholder="Usuario" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <button type="submit">Entrar</button>
    </form>
</body>
</html>