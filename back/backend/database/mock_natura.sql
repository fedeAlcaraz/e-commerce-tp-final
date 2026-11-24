-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2026 a las 15:48:23
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
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

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

--
-- Volcado de datos para la tabla `detalle_carrito`
--

INSERT INTO `detalle_carrito` (`idCarrito`, `idProducto`, `cantidad`) VALUES
(2, 41, 1),
(3, 44, 2),
(3, 53, 1),
(3, 54, 3),
(4, 42, 1),
(5, 49, 2),
(5, 50, 1),
(6, 45, 2),
(6, 46, 1),
(7, 56, 2),
(7, 58, 1),
(8, 47, 1),
(8, 48, 1),
(9, 55, 2),
(9, 57, 3),
(10, 51, 2),
(10, 52, 2),
(10, 54, 1);

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
(1, 41, 2, 32500.00),
(1, 44, 1, 14500.00),
(1, 54, 3, 6500.00),
(2, 42, 1, 48900.00),
(2, 48, 1, 29800.00),
(3, 51, 2, 11900.00),
(3, 52, 1, 13200.00),
(3, 53, 2, 8900.00),
(4, 55, 1, 24500.00),
(4, 57, 2, 7800.00),
(5, 43, 1, 27900.00),
(5, 50, 2, 9800.00),
(6, 45, 1, 15200.00),
(6, 46, 1, 18900.00),
(7, 56, 1, 9200.00),
(7, 58, 2, 11500.00),
(8, 47, 1, 21500.00),
(8, 49, 1, 12500.00),
(9, 41, 1, 32500.00),
(9, 55, 2, 24500.00),
(10, 44, 2, 14500.00),
(10, 53, 3, 8900.00),
(11, 52, 2, 13200.00),
(11, 54, 2, 6500.00),
(12, 42, 1, 48900.00),
(12, 43, 1, 27900.00),
(12, 50, 1, 9800.00);

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
(1, 1, 'San Martín', '123', NULL, NULL, '7540', 1),
(2, 2, 'Avenida Colón', '456', '2', 'B', '8000', 2),
(3, 3, 'Calle 12', '789', NULL, NULL, '1900', 3),
(4, 4, 'Avenida Independencia', '321', '1', 'A', '7600', 4),
(5, 5, 'Belgrano', '654', NULL, NULL, '7000', 5),
(6, 6, 'Rivadavia', '987', '3', 'C', '7400', 6),
(7, 7, 'Corrientes', '111', '4', 'D', '1043', 7),
(8, 8, 'Avenida 59', '222', NULL, NULL, '7630', 8),
(9, 9, 'Mitre', '333', '1', 'A', '7300', 9),
(10, 10, 'Moreno', '444', NULL, NULL, '8170', 10);

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
(1, 'Coronel Suárez'),
(2, 'Bahía Blanca'),
(3, 'La Plata'),
(4, 'Mar del Plata'),
(5, 'Tandil'),
(6, 'Olavarría'),
(7, 'Buenos Aires'),
(8, 'Necochea'),
(9, 'Azul'),
(10, 'Pigüé');

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

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`idPago`, `idPedido`, `monto`, `medio_pago`, `estado`) VALUES
(1, 1, 99000.00, 'transferencia', 'pendiente'),
(2, 2, 78700.00, 'transferencia', 'aprobado'),
(3, 3, 54800.00, 'transferencia', 'aprobado'),
(4, 4, 40100.00, 'efectivo', 'aprobado'),
(5, 5, 47500.00, 'transferencia', 'rechazado'),
(6, 6, 34100.00, 'efectivo', 'pendiente'),
(7, 7, 32200.00, 'transferencia', 'aprobado'),
(8, 8, 34000.00, 'transferencia', 'aprobado'),
(9, 9, 81500.00, 'efectivo', 'aprobado'),
(10, 10, 55700.00, 'efectivo', 'rechazado'),
(11, 11, 39400.00, 'transferencia', 'aprobado'),
(12, 12, 86600.00, 'transferencia', 'pendiente');

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
(1, 1, 'pendiente', 99000.00, '2026-11-20 10:30:00'),
(2, 2, 'pagado', 78700.00, '2026-11-19 14:20:00'),
(3, 3, 'enviado', 54800.00, '2026-11-17 09:15:00'),
(4, 4, 'entregado', 40100.00, '2026-11-10 16:45:00'),
(5, 5, 'cancelado', 47500.00, '2026-11-18 11:00:00'),
(6, 6, 'pendiente', 34100.00, '2026-11-23 18:30:00'),
(7, 7, 'pagado', 32200.00, '2026-11-15 12:00:00'),
(8, 8, 'enviado', 34000.00, '2026-11-16 13:40:00'),
(9, 9, 'entregado', 81500.00, '2026-11-08 10:00:00'),
(10, 10, 'cancelado', 55700.00, '2026-11-21 17:10:00'),
(11, 1, 'pagado', 39400.00, '2026-11-22 15:20:00'),
(12, 3, 'pendiente', 86600.00, '2026-11-24 08:30:00');

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
(41, 'Kaiak Clásico Masculino', 'Fragancia fresca con notas aromáticas y acuáticas.', NULL, 'M', 1, 2, 32500.00, 15),
(42, 'Essencial Floral', 'Fragancia elegante con notas florales y amaderadas.', NULL, 'F', 1, 6, 48900.00, 8),
(43, 'Humor Próprio', 'Fragancia juvenil, fresca y divertida para todos los días.', NULL, 'Unisex', 1, 3, 27900.00, 20),
(44, 'Crema Corporal Tododia Almendras', 'Crema hidratante corporal de textura suave.', NULL, 'Unisex', 2, 4, 14500.00, 25),
(45, 'Crema Corporal Tododia Frutos Rojos', 'Hidratación diaria con una fragancia frutal.', NULL, 'Unisex', 2, 4, 15200.00, 18),
(46, 'Aceite Corporal Erva Doce', 'Aceite corporal para el cuidado y la hidratación de la piel.', NULL, 'Unisex', 2, 12, 18900.00, 12),
(47, 'Gel Limpiador Facial Chronos', 'Gel de limpieza facial para uso diario.', NULL, 'Unisex', 3, 5, 21500.00, 10),
(48, 'Crema Facial Chronos', 'Crema facial para complementar la rutina de cuidado.', NULL, 'Unisex', 3, 5, 29800.00, 7),
(49, 'Máscara de Pestañas Faces', 'Máscara para realzar y definir las pestañas.', NULL, 'F', 4, 11, 12500.00, 22),
(50, 'Labial Faces Rojo', 'Labial de color rojo intenso.', NULL, 'F', 4, 11, 9800.00, 16),
(51, 'Shampoo Ekos Maracuyá', 'Shampoo para la limpieza y el cuidado diario del cabello.', NULL, 'Unisex', 5, 1, 11900.00, 30),
(52, 'Acondicionador Ekos Maracuyá', 'Acondicionador para facilitar el peinado.', NULL, 'Unisex', 5, 1, 13200.00, 24),
(53, 'Jabón Líquido Tododia', 'Jabón líquido para la higiene diaria.', NULL, 'Unisex', 6, 4, 8900.00, 35),
(54, 'Jabón en Barra Ekos', 'Jabón vegetal para la higiene corporal.', NULL, 'Unisex', 6, 1, 6500.00, 40),
(55, 'Protector Solar FPS 50', 'Protector solar para el cuidado diario de la piel.', NULL, 'Unisex', 7, 13, 24500.00, 14),
(56, 'Desodorante Kaiak Aerosol', 'Desodorante con fragancia fresca.', NULL, 'M', 8, 2, 9200.00, 28),
(57, 'Desodorante Tododia Roll-on', 'Desodorante para uso diario.', NULL, 'Unisex', 8, 4, 7800.00, 32),
(58, 'Espuma de Afeitar Homem', 'Espuma para facilitar el afeitado.', NULL, 'M', 9, 9, 11500.00, 17);

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
(1, 'Lucía', 'Fernández', '40111222', 'lucia.fernandez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '2001-04-12'),
(2, 'Mateo', 'González', '40222333', 'mateo.gonzalez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '1999-08-23'),
(3, 'Camila', 'Rodríguez', '40333444', 'camila.rodriguez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '2003-02-17'),
(4, 'Tomás', 'Martínez', '40444555', 'tomas.martinez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '1998-11-05'),
(5, 'Valentina', 'López', '40555666', 'valentina.lopez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '2002-06-30'),
(6, 'Santiago', 'Pérez', '40666777', 'santiago.perez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '2000-09-14'),
(7, 'Martina', 'Sánchez', '40777888', 'martina.sanchez@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '2004-01-21'),
(8, 'Joaquín', 'Romero', '40888999', 'joaquin.romero@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '1997-12-03'),
(9, 'Agustina', 'Díaz', '40999111', 'agustina.diaz@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '2001-07-19'),
(10, 'Nicolás', 'Torres', '41000222', 'nicolas.torres@test.com', '$2y$12$fNiz.wYnhyko9rW7Byc1auB8EMo.Aqq78X8mLfDGHuT5G/8dLbWoO', '1999-03-26');

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
  ADD UNIQUE KEY `unique_pago_pedido` (`idPedido`),
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
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `idLocalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `tipo_piel`
--
ALTER TABLE `tipo_piel`
  MODIFY `idTipoPiel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
