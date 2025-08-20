<?php
// Usuarios de prueba
$usuario = $_POST['usuario'];
$password = $_POST['password'];

// Ejemplo: Usuario = admin, Password = 1234
if($usuario === "admin" && $password === "1234"){
    session_start();
    $_SESSION['usuario'] = $usuario;
    header("Location: ../modelo/categoria.php"); // Página interna después de login
    exit();
} else {
    echo "<script>alert('Usuario o contraseña incorrectos'); window.location.href='login.php';</script>";
}
?>
