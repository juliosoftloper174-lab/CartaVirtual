<?php 
// Conectar a la base de datos
$servidor = 'localhost';
$usuario = 'root';
$contraseña = '123456';
$base = 'bdproyecto';

// Utilizando pdo para la conexión
try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$base", $usuario, $contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>