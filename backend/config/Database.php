<?php
include __DIR__ . "/../models/Producto.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_de_datos = "natura";
try{
    $conn = new mysqli($servidor, $usuario, $password, $base_de_datos);
    echo "La conexion funciona re nazi amigo";
}catch(mysqli_sql_exception $error){
    echo "Error de db: " . $error->getMessage();
}
$productoModel = new Producto($conn);
print_r($productoModel->obtenerTodos());
?>