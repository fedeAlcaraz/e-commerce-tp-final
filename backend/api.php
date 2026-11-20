<?php
require_once __DIR__ . "/controllers/ProductoController.php";
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
        switch ($metodo) {
            case "GET":
                if ($id !== null) {
                    $controller->obtenerPorId($id);
                } else {
                    $controller->obtenerTodos();
                }
                break;
            case "POST":
                $datos = json_decode(file_get_contents("php://input"), true);
                $controller->crearProducto($datos);
                break;
            case "PUT":
                $datos = json_decode(file_get_contents("php://input"), true);
                $controller->actualizarProducto($id, $datos);
                break;
            case "PATCH":
                $datos = json_decode(file_get_contents("php://input"), true);
                $controller->actualizarPatch($id, $datos);
        break;
            case "DELETE":
                $controller->eliminarProducto($id);
                break;
            default:
                http_response_code(405);
                echo json_encode(["error" => "Método no permitido"]);
                break;
        }
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Recurso no encontrado"]);
        break;
}