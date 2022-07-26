-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2022 at 11:35 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skripsi_batik`
--

-- --------------------------------------------------------

--
-- Structure for view `notifikasi`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notifikasi`  AS SELECT `master_inventory_bahanbaku`.`kode` AS `kode`, `master_inventory_bahanbaku`.`nama` AS `nama`, `master_inventory_bahanbaku`.`jumlah` AS `jumlah`, `master_inventory_bahanbaku`.`stok_minimal` AS `stok_minimal`, `master_inventory_bahanbaku`.`harga` AS `harga`, `master_inventory_bahanbaku`.`created_at` AS `created_at`, `master_inventory_bahanbaku`.`updated_at` AS `updated_at` FROM `master_inventory_bahanbaku` WHERE `master_inventory_bahanbaku`.`jumlah` <= `master_inventory_bahanbaku`.`stok_minimal` ;

--
-- VIEW `notifikasi`
-- Data: None
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
