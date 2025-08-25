<?php
class Conexion {
    private static $host = "localhost";       // Tu servidor MySQL
    private static $db = "bdproyecto";   // Nombre de tu base de datos
    private static $user = "root";            // Usuario MySQL
    private static $pass = "";                // Contraseña MySQL

    public static function conectar() {
        try {
            $conn = new PDO(
                "mysql:host=" . self::$host . ";dbname=" . self::$db . ";charset=utf8",
                self::$user,
                self::$pass
            );

            // Configurar PDO para que lance excepciones en caso de error
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $conn;

        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}
?>
