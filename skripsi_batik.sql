-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2022 at 06:15 PM
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
-- Table structure for table `detail_order_pembelian`
--

CREATE TABLE `detail_order_pembelian` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `total_kapasitas` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_order_pembelian`
--

INSERT INTO `detail_order_pembelian` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `total_kapasitas`, `created_at`, `updated_at`) VALUES
(10, 'O0001', 'BB0002', 'Kain Mori Sanforis', 40, '42000.00', '1680000.00', 0, '2022-08-08 04:35:24', '2022-08-08 04:35:24'),
(18, 'O0002', 'BB0006', 'Pewarna Mangrove', 20, '7000.00', '140000.00', 0, '2022-08-09 16:38:01', '2022-08-09 16:38:01'),
(19, 'O0003', 'BB0003', 'Kain Sutra', 10, '150000.00', '1500000.00', 0, '2022-08-09 16:48:38', '2022-08-09 16:48:38'),
(20, 'O0003', 'BB0002', 'Kain Mori Sanforis', 5, '8000.00', '40000.00', 0, '2022-08-10 13:52:13', '2022-08-10 13:52:13'),
(21, 'O0003', 'BB0004', 'Malam Tulis', 3, '79000.00', '237000.00', 0, '2022-08-10 13:52:13', '2022-08-10 13:52:13'),
(22, 'O0003', 'BB0002', 'Kain Mori Sanforis', 4, '4000.00', '16000.00', 0, '2022-08-10 13:55:04', '2022-08-10 13:55:04'),
(23, 'O0003', 'BB0005', 'Malam Semi', 1, '200000.00', '200000.00', 0, '2022-08-10 13:55:04', '2022-08-10 13:55:04');

-- --------------------------------------------------------

--
-- Table structure for table `detail_order_pembelian_alat`
--

CREATE TABLE `detail_order_pembelian_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_alat` varchar(10) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_order_pembelian_bahanbaku`
--

CREATE TABLE `detail_order_pembelian_bahanbaku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanbaku` varchar(10) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_order_pembelian_bahanpenolong`
--

CREATE TABLE `detail_order_pembelian_bahanpenolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanpenolong` varchar(10) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian`
--

CREATE TABLE `detail_pembelian` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian_alat`
--

CREATE TABLE `detail_pembelian_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_alat` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian_bahanbaku`
--

CREATE TABLE `detail_pembelian_bahanbaku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanbaku` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembelian_bahanpenolong`
--

CREATE TABLE `detail_pembelian_bahanpenolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanpenolong` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pengeluaran_kas`
--

CREATE TABLE `detail_pengeluaran_kas` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_pengeluaran_kas`
--

INSERT INTO `detail_pengeluaran_kas` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `created_at`, `updated_at`) VALUES
(4, 'KK0004', 'ALAT0001', 'Sarung Tangan', 5, '50.00', '250.00', '2022-08-07 15:03:11', '2022-08-07 15:03:11'),
(5, '', 'BB0002', 'Kain Mori Sanforis', 40, '42000.00', '1680000.00', '2022-08-08 05:02:24', '2022-08-08 05:02:24'),
(6, '', 'BB0002', 'Kain Mori Sanforis', 20, '61000.00', '1220000.00', '2022-08-09 05:09:29', '2022-08-09 05:09:29'),
(7, '', 'BB0006', 'Pewarna Mangrove', 20, '7000.00', '140000.00', '2022-08-09 16:44:02', '2022-08-09 16:44:02'),
(8, 'KK0002', 'BB0003', 'Kain Sutra', 10, '150000.00', '1500000.00', '2022-08-09 16:51:08', '2022-08-09 16:51:08');

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` double NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `hpp` decimal(20,2) NOT NULL,
  `total_hpp` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `hpp`, `total_hpp`, `created_at`, `updated_at`) VALUES
(1, 'JT0001', 'PROD0003', 'Kain Batik Tulis Lasem Primissima 1 Warna Alami', 2, '500000.00', '1000000.00', '0.00', '0.00', '2022-08-06 15:19:55', '2022-08-06 15:19:55'),
(2, 'JK0001', 'PROD0003', 'Kain Batik Tulis Lasem Primissima 1 Warna Alami', 2, '500000.00', '1000000.00', '0.00', '0.00', '2022-08-07 15:07:35', '2022-08-07 15:07:35'),
(3, 'JT0001', 'PROD0001', 'Kain Batik Mangrove Api-api Sintetis 1 Warna', 3, '90000.00', '270000.00', '75000.00', '225000.00', '2022-08-08 03:29:11', '2022-08-08 03:29:11'),
(4, 'JT0002', 'PROD0001', 'Kain Batik Mangrove Api-api Sintetis 1 Warna', 2, '90000.00', '180000.00', '75000.00', '150000.00', '2022-08-08 03:30:50', '2022-08-08 03:30:50'),
(5, 'JT0004', 'PROD0003', 'Kain Batik Tulis Lasem Primissima 1 Warna Alami', 4, '500000.00', '2000000.00', '140500.00', '562000.00', '2022-08-11 16:09:59', '2022-08-11 16:09:59');

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan_konsinyasi`
--

CREATE TABLE `detail_penjualan_konsinyasi` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `harga` double NOT NULL,
  `jumlah` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan_pesanan`
--

CREATE TABLE `detail_penjualan_pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `jumlah` double NOT NULL,
  `harga` double NOT NULL,
  `total_harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan_tunai`
--

CREATE TABLE `detail_penjualan_tunai` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `harga` double NOT NULL,
  `jumlah` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_retur`
--

CREATE TABLE `detail_retur` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `total_kapasitas` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_retur_alat`
--

CREATE TABLE `detail_retur_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_alat` varchar(10) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_retur_bahanbaku`
--

CREATE TABLE `detail_retur_bahanbaku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanbaku` varchar(10) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_retur_bahanpenolong`
--

CREATE TABLE `detail_retur_bahanpenolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanpenolong` varchar(10) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_terima`
--

CREATE TABLE `detail_terima` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_terima`
--

INSERT INTO `detail_terima` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'TB0003', 'BB0003', 'Kain Sutra', 10, '150000.00', '2022-08-10 13:55:52', '2022-08-10 13:55:52'),
(2, 'TB0003', 'BB0002', 'Kain Mori Sanforis', 5, '8000.00', '2022-08-10 13:55:52', '2022-08-10 13:55:52'),
(3, 'TB0003', 'BB0004', 'Malam Tulis', 3, '79000.00', '2022-08-10 13:55:52', '2022-08-10 13:55:52'),
(4, 'TB0003', 'BB0002', 'Kain Mori Sanforis', 4, '4000.00', '2022-08-10 13:55:52', '2022-08-10 13:55:52'),
(5, 'TB0003', 'BB0005', 'Malam Semi', 1, '200000.00', '2022-08-10 13:55:52', '2022-08-10 13:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `detail_terima_alat`
--

CREATE TABLE `detail_terima_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_alat` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_terima_bahanbaku`
--

CREATE TABLE `detail_terima_bahanbaku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanbaku` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detail_terima_bahanpenolong`
--

CREATE TABLE `detail_terima_bahanpenolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_bahanpenolong` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `estimasi_pesanan`
--

CREATE TABLE `estimasi_pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `jenis_produk` varchar(20) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `deskripsi` longtext NOT NULL,
  `hpp` decimal(20,2) NOT NULL,
  `profit` decimal(20,2) NOT NULL COMMENT '%',
  `harga_jual` decimal(20,2) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Menunggu,\r\n1 = Uang Muka Dibayar,\r\n2 = Selesai',
  `notifikasi` int(11) NOT NULL COMMENT '0 = Belum ditambahkan,\r\n1 = Sudah ditambahkan',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estimasi_pesanan`
--

INSERT INTO `estimasi_pesanan` (`id`, `kode`, `nama`, `tanggal`, `kode_customer`, `jenis_produk`, `jumlah`, `deskripsi`, `hpp`, `profit`, `harga_jual`, `status`, `notifikasi`, `created_at`, `updated_at`) VALUES
(1, 'PESAN0001', 'Seragama', '2022-08-08', 'CUS0006', 'Pakaian', 25, '', '579463.40', '20.00', '695356.08', 0, 1, '2022-08-08 00:01:48', '2022-08-08 00:52:55'),
(2, 'PESAN0002', 'Baju SMA', '2022-08-08', 'CUS0003', 'Pakaian', 5, '', '260.40', '30.00', '338.52', 0, 1, '2022-08-08 00:18:55', '2022-08-08 03:20:25');

-- --------------------------------------------------------

--
-- Table structure for table `hpp`
--

CREATE TABLE `hpp` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `kode_pesanan` varchar(10) NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `kode_produksi` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `biaya_bahan_baku` decimal(20,2) NOT NULL,
  `biaya_tenaga_kerja` decimal(20,2) NOT NULL,
  `biaya_overhead_pabrik` decimal(20,2) NOT NULL,
  `hpp` decimal(20,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_jual` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp`
--

INSERT INTO `hpp` (`id`, `kode`, `kode_produk`, `kode_pesanan`, `kode_customer`, `kode_produksi`, `kode_permintaan`, `tanggal_mulai`, `tanggal_selesai`, `biaya_bahan_baku`, `biaya_tenaga_kerja`, `biaya_overhead_pabrik`, `hpp`, `jumlah`, `harga_jual`, `created_at`, `updated_at`) VALUES
(1, 'HPP0001', 'PROD0007', '', '', 'PS0001', 'PPS0002', '2022-08-08', '2022-08-17', '1080000.00', '534000.00', '12254.10', '1626254.10', 15, '85000.00', '2022-08-07 23:55:00', '2022-08-08 02:03:56'),
(9, 'HPP0002', '', 'PESAN0002', 'CUS0003', 'PP0002', 'PPP0002', '2022-08-08', '2022-08-14', '0.00', '0.00', '260.40', '260.40', 5, '0.00', '2022-08-08 00:20:39', '2022-08-08 00:38:35'),
(10, 'HPP0003', '', 'PESAN0001', 'CUS0006', 'PP0001', 'PPP0001', '2022-08-08', '2022-08-14', '575000.00', '0.00', '4463.40', '579463.40', 25, '50000.00', '2022-08-08 00:21:03', '2022-08-08 00:51:56');

-- --------------------------------------------------------

--
-- Table structure for table `hpp_detail_alat`
--

CREATE TABLE `hpp_detail_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(12) NOT NULL,
  `kode_hpp` varchar(10) NOT NULL,
  `kode_produksi` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `kode_alat` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_alat`
--

INSERT INTO `hpp_detail_alat` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_permintaan`, `kode_alat`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(1, 'BOPAlat0001', 'HPP0001', 'PS0001', 'PPS0002', 'ALAT0006', '2022-08-08', '6.94', 15, '104.10', '2022-08-07 23:56:08', '2022-08-07 23:56:08'),
(2, 'BOPAlat0001', 'HPP0001', 'PS0001', 'PPS0002', 'ALAT0007', '2022-08-08', '210.00', 15, '3150.00', '2022-08-07 23:56:08', '2022-08-07 23:56:08'),
(13, 'BOPAlat0002', 'HPP0003', 'PP0001', 'PPP0001', 'ALAT0001', '2022-08-08', '297.56', 15, '4463.40', '2022-08-08 00:36:41', '2022-08-08 00:36:41'),
(14, 'BOPAlat0002', 'HPP0002', 'PP0002', 'PPP0002', 'ALAT0003', '2022-08-08', '17.36', 15, '260.40', '2022-08-08 00:38:35', '2022-08-08 00:38:35');

-- --------------------------------------------------------

--
-- Table structure for table `hpp_detail_bahan_baku`
--

CREATE TABLE `hpp_detail_bahan_baku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_hpp` varchar(10) NOT NULL,
  `kode_produksi` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `kode_bahan_baku` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_bahan_baku`
--

INSERT INTO `hpp_detail_bahan_baku` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_permintaan`, `kode_bahan_baku`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(7, 'BBB0002', 'HPP0001', 'PP0001', 'PPP0001', 'BB0005', '2022-08-08', '25000.00', 5, '125000.00', '2022-08-08 00:13:21', '2022-08-08 00:23:20'),
(10, 'BBB0002', 'HPP0001', 'PS0001', 'PPS0002', 'BB0004', '2022-08-08', '40000.00', 5, '200000.00', '2022-08-08 00:17:28', '2022-08-08 00:20:39'),
(26, 'BBB0002', 'HPP0003', 'PP0001', 'PPP0001', 'BB0003', '2022-08-08', '150000.00', 3, '450000.00', '2022-08-08 00:29:36', '2022-08-08 00:29:36'),
(29, 'BBB0001', 'HPP0001', 'PS0001', 'PPS0002', 'BB0002', '2022-08-08', '40000.00', 6, '240000.00', '2022-08-08 02:03:48', '2022-08-08 02:03:48');

-- --------------------------------------------------------

--
-- Table structure for table `hpp_detail_penolong`
--

CREATE TABLE `hpp_detail_penolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_hpp` varchar(10) NOT NULL,
  `kode_produksi` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `kode_penolong` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_penolong`
--

INSERT INTO `hpp_detail_penolong` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_permintaan`, `kode_penolong`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(1, 'BBP0001', 'HPP0001', 'PS0001', 'PPS0002', 'BP0006', '2022-08-08', '10000.00', 1, '8000.00', '2022-08-07 23:57:40', '2022-08-07 23:57:40'),
(3, 'BBP0001', 'HPP0001', 'PS0001', 'PPS0002', 'BP0003', '2022-08-08', '200.00', 5, '1000.00', '2022-08-07 23:58:36', '2022-08-07 23:58:36');

-- --------------------------------------------------------

--
-- Table structure for table `hpp_detail_tenaga_kerja`
--

CREATE TABLE `hpp_detail_tenaga_kerja` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_hpp` varchar(10) NOT NULL,
  `kode_produksi` varchar(10) NOT NULL,
  `kode_tenaga_kerja` varchar(10) NOT NULL,
  `departemen` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_tenaga_kerja`
--

INSERT INTO `hpp_detail_tenaga_kerja` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_tenaga_kerja`, `departemen`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(1, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0003', 'Designer', '2022-08-08', '30000.00', 5, '150000.00', '2022-08-07 23:55:00', '2022-08-07 23:55:00'),
(3, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0004', 'Cap/Canting', '2022-08-08', '60000.00', 6, '360000.00', '2022-08-07 23:56:08', '2022-08-08 00:21:04'),
(6, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0009', 'Pewarnaan', '2022-08-08', '3000.00', 2, '6000.00', '2022-08-07 23:57:40', '2022-08-07 23:57:40'),
(10, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0010', 'Packing', '2022-08-08', '3000.00', 6, '18000.00', '2022-08-07 23:58:36', '2022-08-07 23:58:36');

-- --------------------------------------------------------

--
-- Table structure for table `kartu_ketersediaan_alat`
--

CREATE TABLE `kartu_ketersediaan_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_alat` varchar(10) NOT NULL,
  `harga_perolehan` double NOT NULL,
  `pemakaian` double NOT NULL,
  `sisa_taksiran` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kartu_persediaan_bahanbaku`
--

CREATE TABLE `kartu_persediaan_bahanbaku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_bahanbaku` varchar(10) NOT NULL,
  `masuk` double NOT NULL,
  `keluar` double NOT NULL,
  `harga` double NOT NULL,
  `keterangan` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kartu_persediaan_bahanpenolong`
--

CREATE TABLE `kartu_persediaan_bahanpenolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_bahanpenolong` varchar(10) NOT NULL,
  `masuk` double NOT NULL,
  `keluar` double NOT NULL,
  `harga` double NOT NULL,
  `keterangan` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kartu_persediaan_produk`
--

CREATE TABLE `kartu_persediaan_produk` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `masuk` double NOT NULL,
  `keluar` double NOT NULL,
  `harga` double NOT NULL,
  `keterangan` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `master_akun`
--

CREATE TABLE `master_akun` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `saldo` decimal(20,2) NOT NULL,
  `jenis` int(11) NOT NULL COMMENT '0 = debit, 1 = kredit',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_akun`
--

INSERT INTO `master_akun` (`id`, `kode`, `nama`, `saldo`, `jenis`, `created_at`, `updated_at`) VALUES
(1, '1101', 'Kas di Tangan', '8545000.00', 0, '2022-07-02 03:35:56', '2022-08-11 16:09:59'),
(2, '1102', 'Kas Bank', '150068000.00', 0, '2022-07-02 03:36:09', '2022-08-09 16:51:08'),
(3, '1103', 'Piutang Konsinyasi', '1345000.00', 0, '2022-07-02 03:36:21', '2022-08-07 22:52:57'),
(4, '2101', 'Uang Muka Pesanan', '1479517.34', 1, '2022-07-02 03:36:48', '2022-08-07 19:46:01'),
(5, '4101', 'Penjualan', '15137698.82', 1, '2022-07-02 03:40:10', '2022-08-11 16:09:59'),
(6, '4201', 'Potongan Penjualan', '1092482.12', 0, '2022-07-02 03:40:22', '2022-08-11 16:09:59'),
(7, '4202', 'Beban Angkut Penjualan', '769000.00', 0, '2022-07-02 03:40:32', '2022-08-11 16:09:59'),
(8, '5101', 'HPP', '4291363.39', 0, '2022-07-02 03:40:42', '2022-08-11 16:09:59'),
(9, '5201', 'Potongan Pembelian', '50000.00', 1, '2022-07-02 03:40:51', '2022-08-07 14:56:33'),
(10, '5202', 'Retur Pembelian', '208000.00', 1, '2022-07-02 03:41:06', '2022-08-07 19:02:19'),
(11, '5203', 'Beban Angkut Pembelian', '49100.00', 0, '2022-07-02 03:41:15', '2022-08-07 15:01:12');

-- --------------------------------------------------------

--
-- Table structure for table `master_consignee`
--

CREATE TABLE `master_consignee` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `telepon` varchar(13) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_consignee`
--

INSERT INTO `master_consignee` (`id`, `kode`, `nama`, `alamat`, `telepon`, `created_at`, `updated_at`) VALUES
(2, 'CONS0002', 'Hotel Dafam', 'Cilacap', '08563746', '2022-07-26 11:55:26', '2022-08-04 14:17:19'),
(3, 'CONS0003', 'Whiz Hotel', 'Cilacap', '085647383', '2022-07-26 11:55:41', '2022-07-26 11:55:41'),
(4, 'CONS0004', 'Toko Hendys Batik', 'Cilacap', '08553673', '2022-07-26 11:55:59', '2022-07-26 11:55:59'),
(5, 'CONS0005', 'Galeri Bupati', 'Cilacap', '0846875', '2022-07-26 11:56:12', '2022-07-26 11:56:12'),
(6, 'CONS0006', 'Rumah Zamira', 'Cilacap', '08564758', '2022-07-26 11:56:24', '2022-07-26 11:56:24'),
(7, 'CONS0007', 'Batik Nusantara', 'Cilacap', '085637463', '2022-07-26 11:56:34', '2022-07-26 11:56:34'),
(8, 'CONS0008', 'Galeri Camat Cilacap Tengah', 'Cilacap', '08564736', '2022-07-26 11:56:53', '2022-07-26 11:56:53');

-- --------------------------------------------------------

--
-- Table structure for table `master_customer`
--

CREATE TABLE `master_customer` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `telepon` varchar(13) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_customer`
--

INSERT INTO `master_customer` (`id`, `kode`, `nama`, `alamat`, `telepon`, `created_at`, `updated_at`) VALUES
(3, 'CUS0003', 'Dinas Sosial', 'Cilacap', '0856473892', '2022-07-26 11:54:18', '2022-07-26 11:54:18'),
(4, 'CUS0004', 'Rumah Sakit Fatimah', 'Cilacap', '085647382', '2022-07-26 11:54:36', '2022-07-26 11:54:36'),
(5, 'CUS0005', 'Pemda Cilacap', 'Cilacap', '08647362', '2022-07-26 11:54:51', '2022-07-26 11:54:51'),
(6, 'CUS0006', 'Dinas Kepemudaan dan Olahraga', 'Cilacap', '08564783', '2022-07-26 11:55:09', '2022-07-26 11:55:09'),
(13, 'CUS0007', 'Pelanggan Umum', 'Umum', '08000', '2022-08-07 19:14:59', '2022-08-07 19:14:59');

-- --------------------------------------------------------

--
-- Table structure for table `master_inventory_alat`
--

CREATE TABLE `master_inventory_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `total_kapasitas` int(11) NOT NULL,
  `bop` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_alat`
--

INSERT INTO `master_inventory_alat` (`id`, `kode`, `nama`, `jumlah`, `harga`, `total_kapasitas`, `bop`, `created_at`, `updated_at`) VALUES
(1, 'ALAT0001', 'Sarung Tangan', 80, '2440000.00', 8200, '297.56', '2022-07-26 11:41:40', '2022-08-07 18:54:18'),
(2, 'ALAT0002', 'Sepatu Boot', 22, '1035000.00', 516705, '2.00', '2022-07-26 11:43:18', '2022-08-07 14:52:35'),
(3, 'ALAT0003', 'Dandang', 6, '1200000.00', 68960, '17.36', '2022-07-26 11:43:52', '2022-08-07 16:16:44'),
(4, 'ALAT0004', 'Bak Celup', 2, '4000000.00', 287840, '13.89', '2022-07-26 11:44:11', '2022-08-07 16:16:44'),
(5, 'ALAT0005', 'Ember', 7, '350000.00', 100800, '3.47', '2022-07-26 11:44:28', '2022-07-26 11:44:28'),
(6, 'ALAT0006', 'Canting', 54, '432000.00', 62103, '6.94', '2022-07-26 11:44:48', '2022-08-08 00:17:28'),
(7, 'ALAT0007', 'Gas', 10, '210000.00', 695, '210.00', '2022-07-26 11:45:05', '2022-08-08 00:17:28'),
(8, 'ALAT0008', 'Kompor', 10, '700000.00', 690960, '1.01', '2022-07-26 11:45:25', '2022-08-07 16:16:44'),
(9, 'ALAT0009', 'Cap Lurik Wijayakusuma', 1, '1500000.00', 144000, '10.42', '2022-07-26 11:46:27', '2022-07-26 11:46:27'),
(10, 'ALAT0010', 'Cap Kerapu Bakau', 1, '950000.00', 144000, '6.60', '2022-07-26 11:46:48', '2022-07-26 11:46:48'),
(11, 'ALAT0011', 'Cap Mangrove Bakautancang', 1, '1200000.00', 144000, '8.33', '2022-07-26 11:47:18', '2022-07-26 11:47:18'),
(12, 'ALAT0012', 'Cap Kawung Wijayakusuma', 1, '1100000.00', 144000, '7.64', '2022-07-31 12:38:56', '2022-07-31 12:38:56'),
(13, 'ALAT0013', 'Cap Mangrove Api-api', 1, '1350000.00', 144000, '9.38', '2022-07-31 12:39:59', '2022-07-31 12:39:59'),
(14, 'ALAT0014', 'Cap Sekar Wijayakusuma', 1, '1650000.00', 144000, '11.46', '2022-07-31 12:40:22', '2022-07-31 12:40:22'),
(15, 'ALAT0015', 'Cap Truntum', 1, '850000.00', 143760, '5.90', '2022-07-31 12:40:46', '2022-08-07 16:16:44'),
(16, 'ALAT0016', 'Cap Bumi Wijayakusuma', 1, '1250000.00', 144000, '8.68', '2022-07-31 12:41:08', '2022-07-31 12:41:08'),
(17, 'ALAT0017', 'Cap Bogem Mentah', 1, '900000.00', 144000, '6.25', '2022-07-31 12:41:30', '2022-07-31 12:41:30'),
(18, 'ALAT0018', 'Cap Lurik', 1, '650000.00', 144000, '4.51', '2022-07-31 12:41:49', '2022-07-31 12:41:49'),
(19, 'ALAT0019', 'Cap Logo Kantor', 1, '300000.00', -4, '300000.00', '2022-08-07 16:08:51', '2022-08-07 16:16:44'),
(20, 'ALAT0020', 'Alat Cap Custom', 0, '0.00', 0, '0.00', '2022-08-07 17:23:03', '2022-08-07 17:23:03');

-- --------------------------------------------------------

--
-- Table structure for table `master_inventory_bahanbaku`
--

CREATE TABLE `master_inventory_bahanbaku` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `stok_minimal` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_bahanbaku`
--

INSERT INTO `master_inventory_bahanbaku` (`id`, `kode`, `nama`, `satuan`, `stok_minimal`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(2, 'BB0001', 'Kain Tari Kupu', 'Meter', 10, 0, '0.00', '2022-07-26 11:25:09', '2022-08-07 14:57:07'),
(3, 'BB0002', 'Kain Mori Sanforis', 'Meter', 10, 45, '38971.82', '2022-07-26 11:25:33', '2022-08-10 13:55:52'),
(4, 'BB0003', 'Kain Sutra', 'Meter', 10, 38, '150000.00', '2022-07-26 11:32:40', '2022-08-10 13:55:52'),
(5, 'BB0004', 'Malam Tulis', 'Kg', 10, 92, '42543.48', '2022-07-26 11:33:03', '2022-08-10 13:55:52'),
(6, 'BB0005', 'Malam Semi', 'Kg', 10, 47, '28723.40', '2022-07-26 11:33:27', '2022-08-10 13:55:52'),
(7, 'BB0006', 'Pewarna Mangrove', 'Kg', 0, 120, '6166.67', '2022-07-26 11:33:51', '2022-08-09 16:41:27'),
(8, 'BB0007', 'Pewarna Kayu Tegeran', 'Kg', 0, 64, '60000.00', '2022-07-26 11:34:10', '2022-08-08 00:17:28'),
(9, 'BB0008', 'Pewarna Kayu Jolawe', 'Kg', 0, 100, '60000.00', '2022-07-26 11:34:31', '2022-07-26 11:34:31'),
(10, 'BB0009', 'Green IB', 'Kg', 0, 96, '290000.00', '2022-07-26 11:34:55', '2022-08-07 16:16:44'),
(16, 'BB0015', 'Water Glass', 'Liter', 0, 100, '25000.00', '2022-07-26 11:37:28', '2022-07-26 11:37:28'),
(17, 'BB0016', 'Rebusan Air Soda As', 'Liter', 0, 96, '15000.00', '2022-07-26 11:37:56', '2022-08-06 15:14:29'),
(18, 'BB0017', 'Yellow IGK', 'Kg', 0, 100, '290000.00', '2022-07-31 12:28:28', '2022-07-31 12:28:28'),
(19, 'BB0018', 'Yellow IRK', 'Kg', 0, 100, '290000.00', '2022-07-31 12:28:44', '2022-07-31 12:28:44'),
(20, 'BB0019', 'Orange HR', 'Kg', 0, 100, '290000.00', '2022-07-31 12:29:00', '2022-07-31 12:29:00'),
(21, 'BB0020', 'Rose IR', 'Kg', 0, 100, '290000.00', '2022-07-31 12:29:35', '2022-07-31 12:29:35'),
(22, 'BB0021', 'Blue 04B', 'Kg', 0, 100, '290000.00', '2022-07-31 12:29:50', '2022-07-31 12:29:50'),
(23, 'BB0022', 'Grey IRL', 'Kg', 0, 100, '290000.00', '2022-07-31 12:30:12', '2022-07-31 12:30:12'),
(24, 'BB0023', 'Brown IRRD', 'Kg', 0, 100, '750000.00', '2022-07-31 12:30:36', '2022-07-31 12:30:36'),
(25, 'BB0024', 'Violet 14R', 'Kg', 0, 100, '850000.00', '2022-07-31 12:31:05', '2022-07-31 12:31:05'),
(26, 'BB0025', 'AS-G', 'Kg', 0, 100, '400000.00', '2022-07-31 12:31:32', '2022-07-31 12:31:32'),
(27, 'BB0026', 'AS-LB', 'Kg', 0, 100, '1580000.00', '2022-07-31 12:31:49', '2022-07-31 12:31:49'),
(28, 'BB0027', 'AS-D', 'Kg', 0, 100, '220000.00', '2022-07-31 12:32:06', '2022-07-31 12:32:06'),
(29, 'BB0028', 'AS-BO', 'Kg', 0, 100, '210000.00', '2022-07-31 12:32:28', '2022-07-31 12:32:28'),
(30, 'BB0029', 'Alat Custom', 'pcs', 0, 0, '0.00', '2022-08-07 17:19:14', '2022-08-07 17:19:14');

-- --------------------------------------------------------

--
-- Table structure for table `master_inventory_bahanpenolong`
--

CREATE TABLE `master_inventory_bahanpenolong` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `stok_minimal` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_bahanpenolong`
--

INSERT INTO `master_inventory_bahanpenolong` (`id`, `kode`, `nama`, `satuan`, `stok_minimal`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(4, 'BP0001', 'Pensil', 'pcs', 10, 0, '2000.00', '2022-07-26 11:38:24', '2022-08-05 14:45:25'),
(5, 'BP0002', 'Penghapus', 'pcs', 10, 92, '500.00', '2022-07-26 11:38:38', '2022-08-06 15:14:29'),
(6, 'BP0003', 'Plastik', 'pcs', 10, 35, '200.00', '2022-07-26 11:39:31', '2022-08-08 00:17:28'),
(7, 'BP0004', 'Box', 'pcs', 10, 86, '500.00', '2022-07-26 11:39:53', '2022-08-07 19:21:06'),
(8, 'BP0005', 'Nitrit', 'Kg', 0, 96, '25000.00', '2022-07-31 12:33:36', '2022-08-07 16:16:44'),
(9, 'BP0006', 'Air Akizuur', 'Liter', 0, 94, '10000.00', '2022-07-31 12:34:09', '2022-08-08 00:17:28'),
(10, 'BP0007', 'Tawas', 'Kg', 0, 111, '32081.09', '2022-07-31 12:34:58', '2022-08-06 03:45:06'),
(11, 'BP0008', 'Tunjung', 'Kg', 0, 100, '50000.00', '2022-07-31 12:35:16', '2022-07-31 12:35:16'),
(12, 'BP0009', 'Kancing Baju', 'pcs', 0, 4720, '174.00', '2022-07-31 12:36:03', '2022-08-07 16:16:44'),
(13, 'BP0010', 'Benang', 'roll', 0, 460, '240.00', '2022-07-31 12:38:09', '2022-08-07 16:16:44'),
(14, 'BP0011', 'Air Rebusan Soda', 'Liter', 0, 76, '15000.00', '2022-08-07 16:12:57', '2022-08-07 16:16:44');

-- --------------------------------------------------------

--
-- Table structure for table `master_inventory_produk`
--

CREATE TABLE `master_inventory_produk` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jenis` varchar(20) NOT NULL,
  `warna` varchar(20) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `stok_minimal` int(11) NOT NULL,
  `hpp_per_produk` decimal(20,2) NOT NULL,
  `harga_jual` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_produk`
--

INSERT INTO `master_inventory_produk` (`id`, `kode`, `nama`, `jenis`, `warna`, `jumlah`, `stok_minimal`, `hpp_per_produk`, `harga_jual`, `created_at`, `updated_at`) VALUES
(4, 'PROD0001', 'Kain Batik Mangrove Api-api Sintetis 1 Warna', 'Cap', 'Sintetis', 0, 5, '75000.00', '90000.00', '2022-07-29 07:54:42', '2022-08-08 03:30:50'),
(5, 'PROD0002', 'Batik Bumi Wijayakusuma Kombinasi 2 Warna Sintetis', 'Kombinasi', 'Sintetis', 30, 5, '145000.00', '160000.00', '2022-07-29 08:26:51', '2022-08-07 22:51:38'),
(6, 'PROD0003', 'Kain Batik Tulis Lasem Primissima 1 Warna Alami', 'Tulis', 'Alami', 7, 5, '140500.00', '500000.00', '2022-07-30 20:19:20', '2022-08-11 16:09:59'),
(7, 'PROD0004', 'Kemeja Sekar Wijayakusuma Size S', 'Cap', 'Sintetis', 30, 5, '0.00', '160000.00', '2022-07-30 20:22:50', '2022-07-30 20:22:50'),
(8, 'PROD0005', 'Kemeja Sekar Wijayakusuma Size M', 'Cap', 'Sintetis', 15, 5, '0.00', '160000.00', '2022-07-30 20:23:38', '2022-08-06 11:04:44'),
(9, 'PROD0006', 'Kemeja Sekar Wijayakusuma Size L', 'Cap', 'Sintetis', 15, 5, '0.00', '160000.00', '2022-07-30 20:24:05', '2022-08-06 11:02:41'),
(10, 'PROD0007', 'Kemeja Sekar Wijayakusuma Size XL', 'Cap', 'Sintetis', 30, 5, '36208.47', '85000.00', '2022-07-30 20:24:50', '2022-08-07 23:59:29'),
(11, 'PROD0008', 'Kain Batik Tulis Garuda 1 Warna Alami', 'Tulis', 'Alami', 15, 5, '0.00', '505000.00', '2022-07-31 11:42:02', '2022-07-31 11:42:02');

-- --------------------------------------------------------

--
-- Table structure for table `master_supplier`
--

CREATE TABLE `master_supplier` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `telepon` varchar(13) NOT NULL,
  `rekening` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_supplier`
--

INSERT INTO `master_supplier` (`id`, `kode`, `nama`, `alamat`, `telepon`, `rekening`, `created_at`, `updated_at`) VALUES
(1, 'SUP0001', 'Supplier 1', 'Semarang', '0810248102848', '455552342398237491279384791080', '2022-06-05 03:48:55', '2022-06-05 03:48:55'),
(2, 'SUP0002', 'Toko Zaky', 'Yogyakarta', '086739402', '123778920', '2022-07-26 11:52:13', '2022-07-26 11:52:13'),
(3, 'SUP0003', 'Toko Bima Kunting', 'Solo', '082736281', '99382763', '2022-07-26 11:52:35', '2022-07-26 11:52:35'),
(4, 'SUP0004', 'Toko Bu Puput', 'Sukoharjo', '0852638374', '2230384', '2022-07-26 11:53:01', '2022-07-26 11:53:01'),
(5, 'SUP0005', 'Toko Hendri', 'Sukoharjo', '0867584938', '77854732', '2022-07-26 11:53:18', '2022-07-26 11:53:18'),
(6, 'SUP0006', 'Perbain Fuad', 'Banyumas', '0856473648', '223464', '2022-07-26 11:53:39', '2022-07-26 11:53:39'),
(7, 'SUP0007', 'Sabari (Alat Cap)', 'Pekalongan', '085674839', '748857', '2022-07-26 11:53:59', '2022-07-26 11:53:59');

-- --------------------------------------------------------

--
-- Table structure for table `master_tenagakerja`
--

CREATE TABLE `master_tenagakerja` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `departemen` varchar(50) NOT NULL,
  `telepon` varchar(13) NOT NULL,
  `upah` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_tenagakerja`
--

INSERT INTO `master_tenagakerja` (`id`, `kode`, `nama`, `departemen`, `telepon`, `upah`, `created_at`, `updated_at`) VALUES
(3, 'TK0003', 'Ali', 'Designer', '0853674893', '30000.00', '2022-07-26 11:48:50', '2022-07-26 11:48:50'),
(4, 'TK0004', 'Putri', 'Cap/Canting', '0856749830', '60000.00', '2022-07-26 11:49:22', '2022-07-26 11:49:22'),
(7, 'TK0007', 'Yani', 'Packing', '0853674889', '20000.00', '2022-07-26 11:51:40', '2022-07-26 11:51:40'),
(8, 'TK0008', 'Putra', 'Cap/Canting', '07836483', '6000.00', '2022-07-30 20:06:17', '2022-07-30 20:06:17'),
(9, 'TK0009', 'Suci', 'Pewarnaan', '0853674893', '3000.00', '2022-08-07 16:12:10', '2022-08-07 16:12:10'),
(10, 'TK0010', 'Parti', 'Packing', '0853674893', '3000.00', '2022-08-07 16:12:30', '2022-08-07 16:12:30');

-- --------------------------------------------------------

--
-- Table structure for table `master_user`
--

CREATE TABLE `master_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `jabatan` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_user`
--

INSERT INTO `master_user` (`id`, `username`, `password`, `jabatan`, `created_at`, `updated_at`) VALUES
(2, 'Maulana', '67f5272d2d67c7d6d194c3e77345b98cfe3da8b3d0afbe78d7afc8eb67c77235', 'Owner', '2022-07-02 02:20:21', '2022-07-02 07:57:02'),
(3, 'Admin', '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2', 'Admin, Keuangan', '2022-07-02 07:41:20', '2022-07-03 23:29:19'),
(4, 'Gudang', 'd68fe9e6092567b1f3c5c07f5a31230946d8fe5d8c47fa7e561dd8a367b9078d', 'Gudang, Pembelian', '2022-07-03 23:29:38', '2022-07-03 23:29:38'),
(5, 'Owner', '4e9036ea221b6acee54c7bf8b9a12f704ce4dad814ea5e998ff2921aaf86bae6', 'Owner', '2022-07-10 15:27:16', '2022-07-10 15:27:16'),
(11, 'Designer', '717cffdeeb26a61cc49499c9cf7b8d18729f85183589e5ec03e36cf6996a60ff', 'Designer', '2022-07-25 00:22:30', '2022-07-25 00:22:30'),
(12, 'Cap/Canting', '5fc12f487515716b0d52b075980fdda56df1b6bb159062365821722207e53219', 'Cap/Canting', '2022-07-25 00:22:53', '2022-07-25 00:22:53'),
(13, 'Pewarnaan', '8017f589795a1a0b5518ce14b474c9a06b5b2bc974b8b62be70ee63bfcaede01', 'Pewarnaan', '2022-07-25 00:23:06', '2022-07-25 00:23:06'),
(14, 'Packing', '0ef054da28af61c64b6e9b5dfe8dccd993092d16014d91c81f6b2211c0ec8c9d', 'Packing', '2022-07-25 00:23:13', '2022-07-25 00:23:13'),
(15, 'Super Admin', '0eeaa9fdda267f5bf6f0b4fe2fabb4133c1b8689d02832052fb90d129ea3093f', 'Super Admin', '2022-07-25 15:52:57', '2022-07-25 15:53:18');

-- --------------------------------------------------------

--
-- Table structure for table `order_pembelian`
--

CREATE TABLE `order_pembelian` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `jenis_pembelian` varchar(20) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_supplier` varchar(10) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Menunggu,\r\n1 = Disetujui,\r\n2 = Proses Order,\r\n3 = Dibayar',
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_pembelian`
--

INSERT INTO `order_pembelian` (`id`, `kode`, `jenis_pembelian`, `tanggal`, `kode_supplier`, `total_harga`, `status`, `file`, `created_at`, `updated_at`) VALUES
(5, 'O0001', 'bahan', '2022-08-08', 'SUP0003', '1680000.00', 3, '', '2022-08-08 04:35:24', '2022-08-08 05:00:08'),
(11, 'O0002', 'bahan', '2022-08-09', 'SUP0005', '140000.00', 3, '', '2022-08-09 16:38:01', '2022-08-09 16:41:27'),
(12, 'O0003', 'bahan', '2022-08-09', 'SUP0004', '1500000.00', 3, '', '2022-08-09 16:48:38', '2022-08-10 13:55:52'),
(13, 'O0003', 'bahan', '2022-08-10', 'SUP0001', '277000.00', 3, '', '2022-08-10 13:52:13', '2022-08-10 13:55:52'),
(14, 'O0003', 'bahan', '2022-08-10', 'SUP0001', '216000.00', 3, '', '2022-08-10 13:55:04', '2022-08-10 13:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `pembelian`
--

CREATE TABLE `pembelian` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nota` varchar(50) NOT NULL,
  `kode_terima` varchar(10) NOT NULL,
  `kode_supplier` varchar(10) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `biaya_kirim` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pengeluaran_kas`
--

CREATE TABLE `pengeluaran_kas` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_akun` varchar(10) NOT NULL,
  `kode_order` varchar(10) NOT NULL,
  `kode_supplier` varchar(10) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `ongkos_kirim` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengeluaran_kas`
--

INSERT INTO `pengeluaran_kas` (`id`, `kode`, `tanggal`, `kode_akun`, `kode_order`, `kode_supplier`, `diskon`, `ongkos_kirim`, `total_bayar`, `file`, `created_at`, `updated_at`) VALUES
(1, 'KK0001', '2022-08-08', '', 'O0001', 'SUP0003', '0.00', '0.00', '1680000.00', 'File Transfer - KK0001 - 2022-08-08.pdf', '2022-08-08 05:02:24', '2022-08-08 05:02:24'),
(2, 'KK0002', '2022-08-09', '', 'O0002', 'SUP0002', '0.00', '0.00', '1220000.00', 'File Bukti Bayar - KK0002 - 2022-08-09.pdf', '2022-08-09 05:09:28', '2022-08-09 05:09:28'),
(3, 'KK0002', '2022-08-09', '', 'O0002', 'SUP0002', '0.00', '0.00', '140000.00', 'File Bukti Bayar - KK0002 - 2022-08-09.pdf', '2022-08-09 16:44:02', '2022-08-09 16:44:02'),
(4, 'KK0002', '2022-08-09', '', 'O0003', 'SUP0004', '0.00', '0.00', '1500000.00', 'File Bukti Bayar - KK0002 - 2022-08-09.pdf', '2022-08-09 16:51:08', '2022-08-09 16:51:08');

-- --------------------------------------------------------

--
-- Table structure for table `penjualan_konsinyasi`
--

CREATE TABLE `penjualan_konsinyasi` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_consignee` varchar(10) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `total_hpp` decimal(10,2) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `piutang` decimal(10,2) NOT NULL,
  `terima_piutang` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `penjualan_pesanan`
--

CREATE TABLE `penjualan_pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_pesanan` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `total_hpp` decimal(10,2) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `ongkos_kirim` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `penjualan_tunai`
--

CREATE TABLE `penjualan_tunai` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_akun` varchar(10) NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `total_hpp` decimal(10,2) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `ongkos_kirim` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualan_tunai`
--

INSERT INTO `penjualan_tunai` (`id`, `kode`, `tanggal`, `kode_akun`, `kode_customer`, `total_jual`, `total_hpp`, `diskon`, `ongkos_kirim`, `total_harga`, `total_bayar`, `file`, `created_at`, `updated_at`) VALUES
(1, 'JT0001', '2022-08-08', '', 'CUS0007', '270000.00', '225000.00', '0.00', '0.00', '270000.00', '270000.00', '', '2022-08-08 03:29:11', '2022-08-08 03:29:11'),
(2, 'JT0002', '2022-08-08', '', 'CUS0003', '180000.00', '150000.00', '0.00', '0.00', '180000.00', '180000.00', '', '2022-08-08 03:30:50', '2022-08-08 03:30:50'),
(3, 'JT0003', '2022-08-10', '', 'undefined', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '', '2022-08-10 13:11:19', '2022-08-10 13:11:19'),
(4, 'JT0004', '2022-08-11', '1101', 'CUS0004', '2000000.00', '562000.00', '5000.00', '20000.00', '2015000.00', '2020000.00', '', '2022-08-11 16:09:59', '2022-08-11 16:09:59');

-- --------------------------------------------------------

--
-- Table structure for table `permintaan_pesanan`
--

CREATE TABLE `permintaan_pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_pesanan` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Menunggu,\r\n1 = Di Acc',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permintaan_pesanan`
--

INSERT INTO `permintaan_pesanan` (`id`, `kode`, `kode_pesanan`, `jumlah`, `status`, `created_at`, `updated_at`) VALUES
(1, 'PPP0001', 'PESAN0001', 25, 0, '2022-08-08 00:02:13', '2022-08-08 00:02:13'),
(2, 'PPP0002', 'PESAN0002', 5, 0, '2022-08-08 00:19:26', '2022-08-08 00:19:26');

-- --------------------------------------------------------

--
-- Table structure for table `permintaan_stok`
--

CREATE TABLE `permintaan_stok` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Menunggu,\r\n1 = Di Acc',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permintaan_stok`
--

INSERT INTO `permintaan_stok` (`id`, `kode`, `kode_produk`, `jumlah`, `status`, `created_at`, `updated_at`) VALUES
(1, 'PPS0001', 'PROD0003', 4, 0, '2022-08-07 23:52:22', '2022-08-07 23:52:22'),
(2, 'PPS0002', 'PROD0007', 15, 1, '2022-08-07 23:52:34', '2022-08-07 23:53:31'),
(3, 'PPS0003', 'PROD0001', 20, 0, '2022-08-08 03:20:00', '2022-08-08 03:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `produksi`
--

CREATE TABLE `produksi` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_pesanan` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `jumlah` int(11) NOT NULL,
  `lama_produksi` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `produksi_pesanan`
--

CREATE TABLE `produksi_pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `kode_pesanan` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `tanggal_pesan` date NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `lama` int(11) NOT NULL,
  `deskripsi` longtext NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Proses,\r\n1 = Selesai',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produksi_pesanan`
--

INSERT INTO `produksi_pesanan` (`id`, `kode`, `kode_permintaan`, `kode_pesanan`, `tanggal`, `tanggal_pesan`, `kode_customer`, `jumlah`, `lama`, `deskripsi`, `status`, `created_at`, `updated_at`) VALUES
(1, 'PP0001', 'PPP0001', 'PESAN0001', '2022-08-08', '2022-08-08', 'CUS0006', 25, 6, '', 1, '2022-08-08 00:02:37', '2022-08-08 02:03:15'),
(2, 'PP0002', 'PPP0002', 'PESAN0002', '2022-08-08', '2022-08-08', 'CUS0003', 5, 6, '', 1, '2022-08-08 00:19:46', '2022-08-08 03:20:25');

-- --------------------------------------------------------

--
-- Table structure for table `produksi_stok`
--

CREATE TABLE `produksi_stok` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `jumlah` int(11) NOT NULL,
  `lama` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Proses,\r\n1 = Selesai',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produksi_stok`
--

INSERT INTO `produksi_stok` (`id`, `kode`, `kode_permintaan`, `kode_produk`, `tanggal`, `jumlah`, `lama`, `status`, `created_at`, `updated_at`) VALUES
(1, 'PS0001', 'PPS0002', 'PROD0007', '2022-08-08', 15, 9, 0, '2022-08-07 23:54:11', '2022-08-08 00:17:28');

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_akun` varchar(10) NOT NULL,
  `kode_retur` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `jumlah_terima` decimal(10,2) NOT NULL,
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `retur_pembelian`
--

CREATE TABLE `retur_pembelian` (
  `id` int(11) NOT NULL,
  `kode` varchar(20) NOT NULL,
  `kode_kas_keluar` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_supplier` varchar(20) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Menunggu,\r\n1 = Disetujui,\r\n2 = Proses Retur,\r\n3 = Selesai',
  `nota` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `terima_barang`
--

CREATE TABLE `terima_barang` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_order` varchar(10) NOT NULL,
  `jenis_pembelian` varchar(20) NOT NULL,
  `tanggal` date NOT NULL DEFAULT current_timestamp(),
  `kode_supplier` varchar(10) NOT NULL,
  `total_barang` int(11) NOT NULL,
  `total_kapasitas` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Belum Dibayar,\r\n1 = Sudah Dibayar',
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terima_barang`
--

INSERT INTO `terima_barang` (`id`, `kode`, `kode_order`, `jenis_pembelian`, `tanggal`, `kode_supplier`, `total_barang`, `total_kapasitas`, `status`, `file`, `created_at`, `updated_at`) VALUES
(1, 'TB0001', 'O0001', 'bahan', '2022-08-08', 'SUP0003', 40, 0, 1, 'File Nota Pembelian - TB0001 - 2022-08-08.pdf', '2022-08-08 05:00:08', '2022-08-08 05:02:24'),
(2, 'TB0002', 'O0002', 'bahan', '2022-08-09', 'SUP0002', 20, 0, 1, 'File Nota Tagihan - TB0002 - 2022-08-09.pdf', '2022-08-09 05:08:36', '2022-08-09 05:09:28'),
(3, 'TB0002', 'O0002', 'bahan', '2022-08-09', 'SUP0005', 20, 0, 1, 'File Nota Tagihan - TB0002 - 2022-08-09.pdf', '2022-08-09 16:41:27', '2022-08-09 16:44:02'),
(4, 'TB0003', 'O0003', 'bahan', '2022-08-09', 'SUP0004', 10, 0, 1, 'File Nota Tagihan - TB0003 - 2022-08-09.pdf', '2022-08-09 16:49:51', '2022-08-09 16:51:08'),
(5, 'TB0003', 'O0003', 'bahan', '2022-08-10', 'SUP0001', 18, 0, 0, 'File Nota Tagihan - TB0003 - 2022-08-10.pdf', '2022-08-10 13:53:36', '2022-08-10 13:53:36'),
(6, 'TB0003', 'O0003', 'bahan', '2022-08-10', 'SUP0001', 23, 0, 0, 'File Nota Tagihan - TB0003 - 2022-08-10.pdf', '2022-08-10 13:55:52', '2022-08-10 13:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `terima_piutang`
--

CREATE TABLE `terima_piutang` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_akun` varchar(10) NOT NULL,
  `kode_jual` varchar(10) NOT NULL,
  `kode_consignee` varchar(10) NOT NULL,
  `piutang` decimal(10,2) NOT NULL,
  `terima_piutang` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `token`, `created_at`, `updated_at`) VALUES
(1, '$2a$16$V8nX0lYVYeAdzmwd2qaV.egge8PmIYEzrI6uksbt.HmTpWElFOou.', '2022-04-27 03:35:00', '2022-04-27 03:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `uang_muka_pesanan`
--

CREATE TABLE `uang_muka_pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_akun` varchar(10) NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `total_hpp` decimal(10,2) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `uang_muka` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_order_pembelian`
--
ALTER TABLE `detail_order_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pengeluaran_kas`
--
ALTER TABLE `detail_pengeluaran_kas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_retur`
--
ALTER TABLE `detail_retur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_terima`
--
ALTER TABLE `detail_terima`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estimasi_pesanan`
--
ALTER TABLE `estimasi_pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hpp`
--
ALTER TABLE `hpp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `hpp_detail_alat`
--
ALTER TABLE `hpp_detail_alat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_alat` (`kode_alat`);

--
-- Indexes for table `hpp_detail_bahan_baku`
--
ALTER TABLE `hpp_detail_bahan_baku`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_bahan_baku` (`kode_bahan_baku`);

--
-- Indexes for table `hpp_detail_penolong`
--
ALTER TABLE `hpp_detail_penolong`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_penolong` (`kode_penolong`);

--
-- Indexes for table `hpp_detail_tenaga_kerja`
--
ALTER TABLE `hpp_detail_tenaga_kerja`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_tenaga_kerja` (`kode_tenaga_kerja`);

--
-- Indexes for table `master_akun`
--
ALTER TABLE `master_akun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_consignee`
--
ALTER TABLE `master_consignee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_customer`
--
ALTER TABLE `master_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_inventory_alat`
--
ALTER TABLE `master_inventory_alat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_inventory_bahanbaku`
--
ALTER TABLE `master_inventory_bahanbaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_inventory_bahanpenolong`
--
ALTER TABLE `master_inventory_bahanpenolong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_inventory_produk`
--
ALTER TABLE `master_inventory_produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_supplier`
--
ALTER TABLE `master_supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_tenagakerja`
--
ALTER TABLE `master_tenagakerja`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_user`
--
ALTER TABLE `master_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_pembelian`
--
ALTER TABLE `order_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penjualan_konsinyasi`
--
ALTER TABLE `penjualan_konsinyasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penjualan_pesanan`
--
ALTER TABLE `penjualan_pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penjualan_tunai`
--
ALTER TABLE `penjualan_tunai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permintaan_pesanan`
--
ALTER TABLE `permintaan_pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permintaan_stok`
--
ALTER TABLE `permintaan_stok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produksi`
--
ALTER TABLE `produksi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produksi_pesanan`
--
ALTER TABLE `produksi_pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produksi_stok`
--
ALTER TABLE `produksi_stok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `retur_pembelian`
--
ALTER TABLE `retur_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terima_barang`
--
ALTER TABLE `terima_barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terima_piutang`
--
ALTER TABLE `terima_piutang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uang_muka_pesanan`
--
ALTER TABLE `uang_muka_pesanan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_order_pembelian`
--
ALTER TABLE `detail_order_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pengeluaran_kas`
--
ALTER TABLE `detail_pengeluaran_kas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `detail_retur`
--
ALTER TABLE `detail_retur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_terima`
--
ALTER TABLE `detail_terima`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `estimasi_pesanan`
--
ALTER TABLE `estimasi_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hpp`
--
ALTER TABLE `hpp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `hpp_detail_alat`
--
ALTER TABLE `hpp_detail_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hpp_detail_bahan_baku`
--
ALTER TABLE `hpp_detail_bahan_baku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `hpp_detail_penolong`
--
ALTER TABLE `hpp_detail_penolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hpp_detail_tenaga_kerja`
--
ALTER TABLE `hpp_detail_tenaga_kerja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `master_akun`
--
ALTER TABLE `master_akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `master_consignee`
--
ALTER TABLE `master_consignee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `master_customer`
--
ALTER TABLE `master_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `master_inventory_alat`
--
ALTER TABLE `master_inventory_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `master_inventory_bahanbaku`
--
ALTER TABLE `master_inventory_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `master_inventory_bahanpenolong`
--
ALTER TABLE `master_inventory_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `master_inventory_produk`
--
ALTER TABLE `master_inventory_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `master_supplier`
--
ALTER TABLE `master_supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `master_tenagakerja`
--
ALTER TABLE `master_tenagakerja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `master_user`
--
ALTER TABLE `master_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_pembelian`
--
ALTER TABLE `order_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `penjualan_konsinyasi`
--
ALTER TABLE `penjualan_konsinyasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penjualan_pesanan`
--
ALTER TABLE `penjualan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `penjualan_tunai`
--
ALTER TABLE `penjualan_tunai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permintaan_pesanan`
--
ALTER TABLE `permintaan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permintaan_stok`
--
ALTER TABLE `permintaan_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `produksi`
--
ALTER TABLE `produksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produksi_pesanan`
--
ALTER TABLE `produksi_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `produksi_stok`
--
ALTER TABLE `produksi_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `retur_pembelian`
--
ALTER TABLE `retur_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `terima_barang`
--
ALTER TABLE `terima_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `terima_piutang`
--
ALTER TABLE `terima_piutang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `uang_muka_pesanan`
--
ALTER TABLE `uang_muka_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
