<?php
require_once __DIR__ . "/controllers/ProductoController.php";
require_once __DIR__ . "/controllers/CategoriaController.php";
require_once __DIR__ . "/controllers/LineaController.php";
require_once __DIR__ . "/controllers/UsuarioController.php";
require_once __DIR__ . "/controllers/DireccionController.php";
require_once __DIR__ . "/controllers/LocalidadController.php";
require_once __DIR__ . "/controllers/CarritoController.php";
require_once __DIR__ . "/controllers/DetalleCarritoController.php";
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
    case "lineas":
        $controller = new LineaController();
        break;
    case "usuarios":
        $controller = new UsuarioController();
        break;
    case "direcciones":
        $controller = new DireccionController();
        break;
    case "localidades":
        $controller = new LocalidadController();
        break;
    case "carritos":
        if ($id === "productos") {
            $controller = new DetalleCarritoController();
            } else {
            $controller = new CarritoController();
        }
        break;
    default:
        http_response_code(404);
        echo json_encode(["error" => "Recurso no encontrado"]);
        exit;
}
$datos = json_decode(file_get_contents("php://input"), true);
switch ($metodo) {
    case "GET":
        if ($controller instanceof DetalleCarritoController) {
        $controller->obtenerTodos($_GET['idCarrito'] ?? null);
        } elseif ($id === "usuario" && method_exists($controller, "obtenerPorIdUsuario")) {
        $controller->obtenerPorIdUsuario($segmentos[2]);
        } elseif ($id !== null) {
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
        if ($controller instanceof DetalleCarritoController) {
        $idCarrito = $_GET['idCarrito'] ?? null;
        $idProducto = $segmentos[2] ?? null;
        $controller->actualizar($idCarrito, $idProducto, $datos);
        } elseif (method_exists($controller, "actualizarPatch")) {
            $controller->actualizarPatch($id, $datos);
        } else {
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
        }
        break;
    case "DELETE":
        if ($controller instanceof DetalleCarritoController) {
        $idCarrito = $_GET['idCarrito'] ?? null;
        $idProducto = $segmentos[2] ?? null;

        $controller->eliminar($idCarrito, $idProducto);
        } else {
        $controller->eliminar($id);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}