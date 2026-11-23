<?php
require_once __DIR__ . "/config/session.php";
require_once __DIR__ . "/controllers/AuthController.php";

require_once __DIR__ . "/controllers/ProductoController.php";
require_once __DIR__ . "/controllers/CategoriaController.php";
require_once __DIR__ . "/controllers/LineaController.php";
require_once __DIR__ . "/controllers/UsuarioController.php";
require_once __DIR__ . "/controllers/DireccionController.php";
require_once __DIR__ . "/controllers/LocalidadController.php";
require_once __DIR__ . "/controllers/CarritoController.php";
require_once __DIR__ . "/controllers/DetalleCarritoController.php";
require_once __DIR__ . "/controllers/PedidoController.php";
require_once __DIR__ . "/controllers/PagoController.php";
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
    case "pedidos":
        if (isset($segmentos[2]) && $segmentos[2] === "pago") {
            $controller = new PagoController();
        } else {
            $controller = new PedidoController();
        }
        break;
    case "pagos":
        $controller = new PagoController();
        break;
    case "auth":
        $controller = new AuthController();
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
        $controller->obtenerTodos($_SESSION['idCarrito'] ?? null);
        } elseif ($id === "usuario" && method_exists($controller, "obtenerPorIdUsuario")) {
        $controller->obtenerPorIdUsuario($segmentos[2]);
        } elseif ($controller instanceof CarritoController) {
            $idUsuario = $_SESSION['idUsuario'] ?? null;
            if ($idUsuario === null) {
                http_response_code(401);
                echo json_encode(["error" => "debes iniciar sesión"]);
                exit;
            }
        $controller->obtenerPorIdUsuario($idUsuario);
        } elseif ($controller instanceof PagoController) {
            if ($id !== null) {
                $controller->obtenerPorId($id);
            } else {
                $controller->obtenerTodos();
            } 
        } elseif ($controller instanceof PedidoController) {
            $idUsuario = $_SESSION['idUsuario'] ?? null;
            if ($idUsuario === null) {
                http_response_code(401);
                echo json_encode(["error" => "no iniciaste sesion pa"]);
            exit;
            }
            if (isset($segmentos[2]) && $segmentos[2] === "detalles") {
                $controller->obtenerDetalles($id, $idUsuario);
            } elseif ($id !== null) {
            $controller->obtenerPorId($id, $idUsuario);
            } else {
            $controller->obtenerTodos($idUsuario);
            }
        } elseif ($id !== null) {
        $controller->obtenerPorId($id);
        } elseif(method_exists($controller,"obtenerPorEmail")) {
            $controller->obtenerPorEmail($email);
        }else {
        $controller->obtenerTodos();
        }
        break;
    case "POST":
        if ($controller instanceof AuthController) {
            if ($id === "login") {
            $controller->iniciarSesion($datos);
            } 
        } elseif ($controller instanceof CarritoController) {
            $idUsuario = $_SESSION['idUsuario'] ?? null;
            if ($idUsuario === null) {
                http_response_code(401);
                echo json_encode(["error" => "inicia sesion pa"]);
                exit;
            }
            $controller->crear($idUsuario);
        } elseif ($controller instanceof DetalleCarritoController) {
            $idCarrito = $_SESSION['idCarrito'] ?? null;
            $controller->crear($idCarrito, $datos);

        } elseif ($controller instanceof PagoController) {
            $controller->crear($id, $datos);
        } elseif ($controller instanceof PedidoController) {
            $idUsuario = $_SESSION['idUsuario'] ?? null;
            if ($idUsuario === null) {
                http_response_code(401);
                echo json_encode(["error" => "inicia sesion pa"]);
                exit;
            }
            $controller->crear($idUsuario);
        } else {
        $controller->crear($datos);
        }
        break;
    case "PUT":
        $controller->actualizar($id, $datos);
        break;
    case "PATCH":
        if ($controller instanceof DetalleCarritoController) {
        $idCarrito = $_SESSION['idCarrito'] ?? null;
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
            $idCarrito = $_SESSION['idCarrito'] ?? null;
            $idProducto = $segmentos[2] ?? null;
            $controller->eliminar($idCarrito, $idProducto);
        } else {
            $controller->eliminar($id);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido / ruta no encontrada"]);
        break;
}
