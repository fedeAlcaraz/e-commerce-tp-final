<?php
    require_once __DIR__ . "/controllers/ProductoController.php";
    $metodo = $_SERVER["REQUEST_METHOD"];
    $recurso = $_GET["recurso"] ?? "";
    switch ($recurso) {
    case "productos":

        $controller = new ProductoController();

        if ($metodo === "GET") {
            $controller->obtenerTodos();
        }

        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Recurso no encontrado"]);
        break;
}
?>