<?php
header('Content-Type: application/json'); // Para que React interprete la respuesta como JSON

require_once '../modelo/Categoria.php'; // Ajusta la ruta según tu estructura

$categoria = new Categoria();

// Verifica si se envió algún parámetro de acción (opcional)
$action = isset($_GET['action']) ? $_GET['action'] : 'getAll';

switch($action) {
    case 'getAll':
        // Devuelve todas las categorías activas
        $categorias = $categoria->getAll();
        echo json_encode($categorias);
        break;

    case 'getById':
        // Devuelve una categoría específica por ID
        if(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $cat = $categoria->getById($id);
            echo json_encode($cat);
        } else {
            echo json_encode(['error' => 'ID no proporcionado']);
        }
        break;

    case 'create':
        // Crear categoría nueva (se puede usar POST)
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data['nombre'], $data['descripcion'], $data['imagen_url'], $data['estado'])) {
            $success = $categoria->create($data['nombre'], $data['descripcion'], $data['imagen_url'], $data['estado']);
            echo json_encode(['success' => $success]);
        } else {
            echo json_encode(['error' => 'Datos incompletos']);
        }
        break;

    case 'update':
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data['id_categoria'], $data['nombre'], $data['descripcion'], $data['imagen_url'], $data['estado'])) {
            $success = $categoria->update($data['id_categoria'], $data['nombre'], $data['descripcion'], $data['imagen_url'], $data['estado']);
            echo json_encode(['success' => $success]);
        } else {
            echo json_encode(['error' => 'Datos incompletos']);
        }
        break;

    case 'delete':
        if(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $success = $categoria->delete($id);
            echo json_encode(['success' => $success]);
        } else {
            echo json_encode(['error' => 'ID no proporcionado']);
        }
        break;

    default:
        echo json_encode(['error' => 'Acción no válida']);
        break;
}
?>
