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
$insertProducto = [
    "nombre" => "pity",
    "precio" => 100,
    "stock" => 1
];
$updateProducto = [
    "nombre" => "fede",
    "precio" => 2.50,
    "stock" => 2
];
print_r($productoModel->obtenerTodos());
print_r($productoModel->obtenerPorId(4));
//echo $productoModel->crear($insertProducto);
//echo $productoModel->actualizar(1,$updateProducto);
echo $productoModel->eliminar();
?>