<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro - Burguer Peru</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .register-box {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            width: 300px;
            text-align: center;
        }
        .register-box input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .register-box button {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            background: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .register-box button:hover {
            background: #388E3C;
        }
    </style>
</head>
<body>
    <div class="register-box">
        <h2>Registro de Usuario</h2>
        <form method="POST" action=""> <!--dentro de action va un archivo php para guardar usuarios-->
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="email" name="correo" placeholder="Correo electrónico" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <!-- Checkbox de términos -->
            <label style="display:block; margin:10px 0; font-size:14px;">
            <input type="checkbox" name="terminos" required>
             Acepto los <a href="" target="_blank">Términos y Condiciones</a> <!--dentro de href va un archivo php para mostrar terminos y condiciones-->
            </label>
            <button type="submit">Registrar</button>
        </form>
    </div>
</body>
</html>
