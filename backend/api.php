<?php
require_once __DIR__ . "/controllers/ProductoController.php";
require_once __DIR__ . "/controllers/CategoriaController.php";
header("Content-Type: application/json; charset=UTF-8");
$metodo = $_SERVER["REQUEST_METHOD"];
$ruta = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$base = "/backend/e-commerce-tp-final";
$ruta = substr($ruta, strlen($base));
$ruta = preg_replace("#^/api/?#", "", $ruta);
$segmentos = explode("/", trim($ruta, "/"));
$recurso = $segmentos[0] ?? "";
$id = $segmentos[1] ?? null;
$filtros = $_GET;

switch ($recurso) {
    case "productos":
        $controller = new ProductoController();
        break;
    case "categorias":
        $controller = new CategoriaController();
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Recurso no encontrado"]);
        exit;
}

$datos = json_decode(file_get_contents("php://input"), true);

switch ($metodo) {
    case "GET":
        if ($id !== null) {
            $controller->obtenerPorId($id);
        } else {
            $controller->obtenerTodos();
        }
        break;

    case "POST":
        $controller->crear($datos);
        break;

    case "PUT":
        $controller->actualizar($id, $datos);
        break;

    case "PATCH":
        if (method_exists($controller, "actualizarPatch")) {
            $controller->actualizarPatch($id, $datos);
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
        }
        break;
    case "DELETE":
        $controller->eliminar($id);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}