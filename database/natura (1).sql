-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2026 a las 08:46:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `natura`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idCarrito`, `idUsuario`) VALUES
(4, 1),
(3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`) VALUES
(9, 'Afeitado'),
(5, 'Cabello'),
(2, 'Cuidado corporal'),
(3, 'Cuidado facial'),
(8, 'Desodorantes'),
(6, 'Higiene personal'),
(4, 'Maquillaje'),
(1, 'Perfumería'),
(7, 'Protección solar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_carrito`
--

CREATE TABLE `detalle_carrito` (
  `idCarrito` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`idPedido`, `idProducto`, `cantidad`, `precio_unitario`) VALUES
(3, 4, 1, 10000.00),
(3, 6, 2, 15000.00),
(3, 7, 1, 15000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `idDireccion` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `altura` varchar(6) NOT NULL,
  `piso` varchar(10) DEFAULT NULL,
  `dpto` varchar(10) DEFAULT NULL,
  `cp` varchar(10) NOT NULL,
  `idLocalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`idDireccion`, `idUsuario`, `calle`, `altura`, `piso`, `dpto`, `cp`, `idLocalidad`) VALUES
(1, 1, 'San Martin', '125', NULL, NULL, '8000', 1),
(2, 1, 'Belgrano', '450', '2', 'A', '8000', 1),
(3, 1, 'Mitre', '780', NULL, NULL, '8000', 1),
(4, 1, 'San Martin', '999', '1', 'B', '8000', 1),
(5, 1, 'Belgrano', '450', '2', 'A', '8000', 1),
(6, 1, 'Mitre', '780', NULL, NULL, '8000', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familia_olfativa`
--

CREATE TABLE `familia_olfativa` (
  `idFamilia` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea`
--

CREATE TABLE `linea` (
  `idLinea` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `linea`
--

INSERT INTO `linea` (`idLinea`, `nombre`) VALUES
(5, 'Chronos'),
(1, 'Ekos'),
(12, 'Erva Doce'),
(6, 'Essencial'),
(11, 'Faces'),
(9, 'Homem'),
(3, 'Humor'),
(2, 'Kaiak'),
(8, 'Luna'),
(10, 'Mamãe e Bebê'),
(13, 'Plant'),
(4, 'Tododia'),
(7, 'Una');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `idLocalidad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`idLocalidad`, `nombre`) VALUES
(1, 'suarez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `medio_pago` enum('efectivo','transferencia') NOT NULL,
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `estado` enum('pendiente','pagado','enviado','entregado','cancelado') NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `idUsuario`, `estado`, `total`, `fecha`) VALUES
(2, 1, 'pagado', 0.00, '2026-11-23 04:33:51'),
(3, 1, 'pagado', 55000.00, '2026-11-23 04:37:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `genero` enum('F','M','Unisex') NOT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `idLinea` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombre`, `descripcion`, `imagen`, `genero`, `idCategoria`, `idLinea`, `precio`, `stock`) VALUES
(1, 'fede', NULL, NULL, 'F', NULL, NULL, 3.00, 2),
(4, 'reptiles', NULL, NULL, 'F', NULL, NULL, 10000.00, 20),
(5, 'pity', NULL, NULL, 'F', NULL, NULL, 100.00, 1),
(6, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(7, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(8, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(9, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(10, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(11, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(12, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(13, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(14, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(15, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(16, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(17, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(18, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(19, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(20, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(21, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(23, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 42),
(24, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(25, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(26, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(27, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(28, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(29, 'Crema hidra', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(30, 'Crema delir', NULL, NULL, 'F', NULL, NULL, 15000.00, 20),
(31, 'Crema delir', NULL, NULL, 'F', NULL, NULL, 15000.00, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_piel`
--

CREATE TABLE `tipo_piel` (
  `idTipoPiel` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `dni`, `email`, `password`, `fecha_nacimiento`) VALUES
(1, 'Juan', 'Perez', '30111222', 'juan.perez@example.com', '$2y$10$vJ1AaC5XBKLr6uDpZFw7EO1mJitMY.WZdWnF1/NAwwi7PyMvBZagO', '1998-05-12'),
(2, 'Maria', 'Gomez', '30222333', 'maria.gomez@example.com', '$2y$10$14XrCFhYH4iBNuyWTsj6GeujUaG///v5RAI5Nm5iEatekSQjVGkY.', '2000-08-21'),
(3, 'Lucas', 'Fernandez', '30333444', 'lucas.fernandez@example.com', '$2y$10$mIfyYb4cOxuk.pmkPbL2OOS1oVR..PildtJGDE2c5SN96PdyYrEBu', '1999-02-15'),
(4, 'Sofia', 'Rodriguez', '30444555', 'sofia.rodriguez@example.com', '$2y$10$riNf.1o89eIhCyCOy87oG.5tszysW0rU/aH3xY8J5IbKPfh6YiNPG', '2001-11-03'),
(5, 'Mateo', 'Lopez', '30555666', 'mateo.lopez@example.com', '$2y$10$goW0.lQvksAW7Lzg2KpgY.VUHaU3mCwxvAexgiHRgY2FZTfX2NRAq', '1997-07-29');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idCarrito`),
  ADD UNIQUE KEY `uq_carrito_usuario` (`idUsuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD PRIMARY KEY (`idCarrito`,`idProducto`),
  ADD KEY `fk_detalle_carrito_producto` (`idProducto`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`idPedido`,`idProducto`),
  ADD KEY `fk_detalle_pedido_producto` (`idProducto`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`idDireccion`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idx_direccion_localidad` (`idLocalidad`);

--
-- Indices de la tabla `familia_olfativa`
--
ALTER TABLE `familia_olfativa`
  ADD PRIMARY KEY (`idFamilia`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`idLinea`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`idLocalidad`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `idPedido` (`idPedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idLinea` (`idLinea`);

--
-- Indices de la tabla `tipo_piel`
--
ALTER TABLE `tipo_piel`
  ADD PRIMARY KEY (`idTipoPiel`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `familia_olfativa`
--
ALTER TABLE `familia_olfativa`
  MODIFY `idFamilia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `linea`
--
ALTER TABLE `linea`
  MODIFY `idLinea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `idLocalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `tipo_piel`
--
ALTER TABLE `tipo_piel`
  MODIFY `idTipoPiel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD CONSTRAINT `fk_detalle_carrito_carrito` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_carrito_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_detalle_pedido_pedido` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_pedido_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `fk_dir_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_direccion_localidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_pago_pedido` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_producto_linea` FOREIGN KEY (`idLinea`) REFERENCES `linea` (`idLinea`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
