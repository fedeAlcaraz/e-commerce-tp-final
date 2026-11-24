<?php
require_once __DIR__ . "/../models/Usuario.php";
require_once __DIR__ . "/../models/Carrito.php";
class AuthController {
    private $usuario;
    private $carrito;
    public function __construct() {
        $this->usuario = new Usuario();
        $this->carrito = new Carrito();
    }
    public function iniciarSesion($datos) {
        if (!isset($datos['email']) || !isset($datos['password'])) {
            http_response_code(400);
            echo json_encode(["error" => "email y contraseña son obligatorios"]);
            exit;
        }
        $usuario = $this->usuario->obtenerPorEmail($datos['email']);
        if (!$usuario || !password_verify($datos['password'], $usuario['password'])) {
            http_response_code(401);
            echo json_encode(["error" => "email o contraseña incorrectos"]);
            exit;
        }
        $carrito = $this->carrito->obtenerPorIdUsuario($usuario['idUsuario']);
        if (!$carrito) {
        $idCarrito = $this->carrito->crear($usuario['idUsuario']);
        } else {
            $idCarrito = $carrito['idCarrito'];
        }
        session_regenerate_id(true); 
        $_SESSION['idUsuario'] = $usuario['idUsuario'];
        $_SESSION['idCarrito'] = $idCarrito;
        http_response_code(200);
        echo json_encode([
            "mensaje" => "sesión iniciada correctamente",
            "idUsuario" => $usuario['idUsuario']
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}