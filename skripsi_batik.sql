-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2022 at 05:21 AM
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
  `harga` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_order_pembelian`
--

INSERT INTO `detail_order_pembelian` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `created_at`, `updated_at`) VALUES
(10, 'O0003', 'BB0001', 'Botol', 5, '5000.00', '25000.00', '2022-06-20 13:26:01', '2022-06-20 13:26:01'),
(12, 'O0004', 'BB0001', 'Botol', 5, '5000.00', '25000.00', '2022-07-10 12:37:46', '2022-07-10 12:37:46'),
(13, 'O0005', 'BB0001', 'Botol', 5, '5000.00', '25000.00', '2022-07-10 12:42:05', '2022-07-10 12:42:05');

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

--
-- Dumping data for table `detail_order_pembelian_bahanbaku`
--

INSERT INTO `detail_order_pembelian_bahanbaku` (`id`, `kode`, `kode_bahanbaku`, `kuantitas`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'O0001', 'BB0001', 5, 10000, '2022-06-05 08:36:53', '2022-06-05 08:36:53'),
(2, 'O0001', 'BB0001', 5, 15000, '2022-06-05 08:36:53', '2022-06-05 08:36:53'),
(3, 'O0002', 'BB0001', 5, 1600, '2022-06-05 08:46:07', '2022-06-05 08:46:07'),
(4, 'O0002', 'BB0001', 5, 4600, '2022-06-05 08:46:07', '2022-06-05 08:46:07'),
(5, 'O0003', 'BB0001', 5, 15000, '2022-06-05 08:46:59', '2022-06-05 08:46:59'),
(6, 'O0003', 'BB0001', 5, 35000, '2022-06-05 08:46:59', '2022-06-05 08:46:59');

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
  `harga` decimal(10,2) NOT NULL,
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
  `harga` double NOT NULL,
  `total_harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_pengeluaran_kas`
--

INSERT INTO `detail_pengeluaran_kas` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `created_at`, `updated_at`) VALUES
(1, 'O0003', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-07 07:26:05', '2022-07-07 07:26:05'),
(2, 'O0003', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-07 07:33:20', '2022-07-07 07:33:20'),
(3, 'KK0009', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-07 09:11:30', '2022-07-07 09:11:30'),
(4, 'KK0010', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 09:52:54', '2022-07-10 09:52:54'),
(5, 'KK0011', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 09:53:19', '2022-07-10 09:53:19'),
(6, 'KK0012', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 09:53:57', '2022-07-10 09:53:57'),
(7, 'KK0013', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 09:54:10', '2022-07-10 09:54:10'),
(8, 'KK0014', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 10:00:55', '2022-07-10 10:00:55'),
(9, 'KK0015', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 10:02:06', '2022-07-10 10:02:06'),
(10, 'KK0016', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 10:07:01', '2022-07-10 10:07:01'),
(11, '', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-10 12:45:55', '2022-07-10 12:45:55');

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
  `harga` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `created_at`, `updated_at`) VALUES
(1, 'JK0001', 'PROD0001', 'Produk 1', 5, '5500.00', '27500.00', '2022-07-20 08:03:04', '2022-07-20 08:03:04'),
(2, 'JK0002', 'PROD0001', 'Produk 1', 5, '5500.00', '27500.00', '2022-07-21 07:47:45', '2022-07-21 07:47:45'),
(3, 'JK0003', 'PROD0001', 'Produk 1', 4, '5500.00', '22000.00', '2022-07-21 08:37:11', '2022-07-21 08:37:11'),
(4, 'JT0001', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '2022-07-24 14:49:23', '2022-07-24 14:49:23'),
(5, 'JT0002', 'PROD0001', 'Produk 1', 5, '7000.00', '35000.00', '2022-07-24 14:50:40', '2022-07-24 14:50:40');

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
  `harga` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_retur`
--

INSERT INTO `detail_retur` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `created_at`, `updated_at`) VALUES
(6, 'RET0001', 'BB0001', 'Botol', 5, '5000.00', '25000.00', '2022-07-10 13:50:50', '2022-07-10 13:50:50'),
(7, 'RET0002', 'BB0001', 'Botol', 5, '5000.00', '25000.00', '2022-07-24 15:05:25', '2022-07-24 15:05:25');

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
  `harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `hpp` decimal(10,2) NOT NULL,
  `profit` decimal(10,2) NOT NULL,
  `harga_jual` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Menunggu,\r\n1 = Uang Muka Dibayar,\r\n2 = Selesai',
  `notifikasi` int(11) NOT NULL COMMENT '0 = Belum ditambahkan,\r\n1 = Sudah ditambahkan',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estimasi_pesanan`
--

INSERT INTO `estimasi_pesanan` (`id`, `kode`, `nama`, `tanggal`, `kode_customer`, `jenis_produk`, `jumlah`, `deskripsi`, `hpp`, `profit`, `harga_jual`, `status`, `notifikasi`, `created_at`, `updated_at`) VALUES
(3, 'PESAN0001', 'Pesanan 1', '2022-07-20', 'CUS0001', 'Kain', 5, 'Catatan', '20000.00', '10.00', '110000.00', 2, 1, '2022-07-20 02:29:37', '2022-07-26 03:14:05'),
(4, 'PESAN0002', 'Pesanan 1', '2022-07-20', 'CUS0001', 'Kain', 3, 'Catatan', '18000.00', '20.00', '64800.00', 2, 1, '2022-07-20 02:43:48', '2022-07-26 03:14:07'),
(5, 'PESAN0003', 'Pesanan 2', '2022-07-24', 'CUS0001', 'Kain', 5, 'Deskripsi 2', '20000.00', '10.00', '110000.00', 0, 1, '2022-07-24 14:51:16', '2022-07-26 03:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `hpp`
--

CREATE TABLE `hpp` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `kode_produksi` varchar(10) NOT NULL,
  `kode_permintaan` varchar(10) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `biaya_bahan_baku` decimal(10,2) NOT NULL,
  `biaya_tenaga_kerja` decimal(10,2) NOT NULL,
  `biaya_overhead_pabrik` decimal(10,2) NOT NULL,
  `hpp` decimal(10,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_jual` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp`
--

INSERT INTO `hpp` (`id`, `kode`, `kode_produk`, `kode_produksi`, `kode_permintaan`, `tanggal_mulai`, `tanggal_selesai`, `biaya_bahan_baku`, `biaya_tenaga_kerja`, `biaya_overhead_pabrik`, `hpp`, `jumlah`, `harga_jual`, `created_at`, `updated_at`) VALUES
(13, 'HPP0001', 'PROD0001', 'PS0001', 'PPS0001', '2022-07-25', '2022-08-04', '30000.00', '7000.00', '16000.00', '53000.00', 10, '0.00', '2022-07-25 08:14:44', '2022-07-25 09:35:40');

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
  `harga` decimal(10,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_alat`
--

INSERT INTO `hpp_detail_alat` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_permintaan`, `kode_alat`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(14, 'BOPAlat0001', 'HPP0001', 'PS0001', 'PPS0001', 'ALAT0001', '2022-07-25', '2000.00', 8, '16000.00', '2022-07-25 08:14:44', '2022-07-25 08:14:44');

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
  `harga` decimal(10,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_bahan_baku`
--

INSERT INTO `hpp_detail_bahan_baku` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_permintaan`, `kode_bahan_baku`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(26, 'BBB0001', 'HPP0001', 'PS0001', 'PPS0001', 'BB0001', '2022-07-25', '5000.00', 6, '30000.00', '2022-07-25 08:14:44', '2022-07-25 08:14:44');

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
  `harga` decimal(10,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `harga` decimal(10,2) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hpp_detail_tenaga_kerja`
--

INSERT INTO `hpp_detail_tenaga_kerja` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_tenaga_kerja`, `departemen`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(11, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0001', 'Designer', '2022-07-25', '100001.00', 2, '2000.00', '2022-07-25 08:14:44', '2022-07-25 15:47:21'),
(20, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0002', 'Cap/Canting', '2022-07-25', '1000.00', 5, '5000.00', '2022-07-25 09:35:40', '2022-07-25 15:47:27');

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
  `saldo` decimal(10,2) NOT NULL,
  `jenis` int(11) NOT NULL COMMENT '0 = debit, 1 = kredit',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_akun`
--

INSERT INTO `master_akun` (`id`, `kode`, `nama`, `saldo`, `jenis`, `created_at`, `updated_at`) VALUES
(9, '1101', 'Kas di Tangan', '195500.00', 0, '2022-07-02 03:35:56', '2022-07-24 14:50:40'),
(10, '1102', 'Kas Bank', '42800.00', 0, '2022-07-02 03:36:09', '2022-07-20 02:53:29'),
(11, '1103', 'Piutang Konsinyasi', '65000.00', 0, '2022-07-02 03:36:21', '2022-07-21 08:37:11'),
(12, '2101', 'Uang Muka Pesanan', '0.00', 1, '2022-07-02 03:36:48', '2022-07-02 03:36:48'),
(13, '4101', 'Penjualan', '286800.00', 1, '2022-07-02 03:40:10', '2022-07-24 14:50:40'),
(14, '4201', 'Potongan Penjualan', '27000.00', 0, '2022-07-02 03:40:22', '2022-07-24 14:50:40'),
(15, '4202', 'Beban Angkut Penjualan', '24000.00', 0, '2022-07-02 03:40:32', '2022-07-24 14:50:40'),
(16, '5101', 'HPP', '0.00', 0, '2022-07-02 03:40:42', '2022-07-02 03:40:42'),
(17, '5201', 'Potongan Pembelian', '0.00', 1, '2022-07-02 03:40:51', '2022-07-02 03:40:51'),
(18, '5202', 'Retur Pembelian', '0.00', 1, '2022-07-02 03:41:06', '2022-07-02 03:41:06'),
(19, '5203', 'Beban Angkut Pembelian', '0.00', 0, '2022-07-02 03:41:15', '2022-07-02 03:41:15');

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
(1, 'CONS0001', 'Consignee 1', 'Semarang', '0847328445', '2022-05-26 00:22:56', '2022-05-26 00:22:56');

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
(1, 'CUS0001', 'Customer 1', 'Semarang', '1094802973048', '2022-06-21 02:29:20', '2022-06-21 02:29:20'),
(2, 'CUS0002', 'Customer 2', 'Jakarta', '523984701831', '2022-06-21 02:29:29', '2022-06-21 02:29:29');

-- --------------------------------------------------------

--
-- Table structure for table `master_inventory_alat`
--

CREATE TABLE `master_inventory_alat` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `kapasitas` int(11) NOT NULL,
  `total_kapasitas` int(11) NOT NULL,
  `bop` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_alat`
--

INSERT INTO `master_inventory_alat` (`id`, `kode`, `nama`, `jumlah`, `harga`, `kapasitas`, `total_kapasitas`, `bop`, `created_at`, `updated_at`) VALUES
(1, 'ALAT0001', 'Sendok', 100, '2000.00', 10, 0, '0.00', '2022-06-20 12:33:58', '2022-06-20 12:33:58');

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
  `harga` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_bahanbaku`
--

INSERT INTO `master_inventory_bahanbaku` (`id`, `kode`, `nama`, `satuan`, `stok_minimal`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'BB0001', 'Botol', 'Buah', 0, 100, '5000.00', '2022-06-05 03:51:14', '2022-06-05 03:51:14');

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
  `harga` decimal(10,2) NOT NULL,
  `tarif_bop` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_bahanpenolong`
--

INSERT INTO `master_inventory_bahanpenolong` (`id`, `kode`, `nama`, `satuan`, `stok_minimal`, `jumlah`, `harga`, `tarif_bop`, `created_at`, `updated_at`) VALUES
(3, 'BP0001', 'Penolong 1', 'Lembar', 0, 10, '5000.00', '10000.00', '2022-07-26 03:20:10', '2022-07-26 03:20:10');

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
  `hpp_per_produk` decimal(10,2) NOT NULL,
  `harga_jual` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_produk`
--

INSERT INTO `master_inventory_produk` (`id`, `kode`, `nama`, `jenis`, `warna`, `jumlah`, `stok_minimal`, `hpp_per_produk`, `harga_jual`, `created_at`, `updated_at`) VALUES
(1, 'PROD0001', 'Produk 1', 'Cair', 'Bening', 110, 10, '18891.12', '0.00', '2022-06-22 04:39:34', '2022-07-25 06:51:14');

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
(1, 'SUP0001', 'Supplier 1', 'Semarang', '0810248102848', '455552342398237491279384791080', '2022-06-05 03:48:55', '2022-06-05 03:48:55');

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
  `upah` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_tenagakerja`
--

INSERT INTO `master_tenagakerja` (`id`, `kode`, `nama`, `departemen`, `telepon`, `upah`, `created_at`, `updated_at`) VALUES
(1, 'TK0001', 'Nama', 'Designer', '234234131', '100001.00', '2022-07-23 05:37:51', '2022-07-25 15:47:38'),
(2, 'TK0002', 'Nama Cap', 'Cap/Canting', '123123', '1000.00', '2022-07-25 08:18:48', '2022-07-25 15:47:43');

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
-- Stand-in structure for view `notifikasi`
-- (See below for the actual view)
--
CREATE TABLE `notifikasi` (
`kode` varchar(10)
,`nama` varchar(50)
,`jumlah` int(11)
,`stok_minimal` int(11)
,`harga` decimal(10,2)
,`created_at` timestamp
,`updated_at` timestamp
);

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_pembelian`
--

INSERT INTO `order_pembelian` (`id`, `kode`, `jenis_pembelian`, `tanggal`, `kode_supplier`, `total_harga`, `status`, `created_at`, `updated_at`) VALUES
(20, 'O0003', 'bahan', '2022-06-20', 'SUP0001', '25000.00', 3, '2022-06-20 13:26:01', '2022-07-10 09:47:55'),
(21, 'O0004', 'bahan', '2022-07-10', 'SUP0001', '25000.00', 3, '2022-07-10 12:37:46', '2022-07-10 12:44:39'),
(22, 'O0005', 'bahan', '2022-07-10', 'SUP0001', '25000.00', 1, '2022-07-10 12:42:05', '2022-07-14 07:16:56');

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

INSERT INTO `pengeluaran_kas` (`id`, `kode`, `tanggal`, `kode_order`, `kode_supplier`, `diskon`, `ongkos_kirim`, `total_bayar`, `file`, `created_at`, `updated_at`) VALUES
(1, '', '0000-00-00', '', '', '0.00', '0.00', '0.00', '', '2022-07-07 06:50:43', '2022-07-07 06:50:43'),
(2, 'KK0001', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0001 - 2022-07-07', '2022-07-07 06:51:33', '2022-07-07 06:51:33'),
(3, 'KK0002', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0002 - 2022-07-07', '2022-07-07 06:53:15', '2022-07-07 06:53:15'),
(4, 'KK0003', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0003 - 2022-07-07', '2022-07-07 06:54:19', '2022-07-07 06:54:19'),
(5, 'KK0004', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0004 - 2022-07-07', '2022-07-07 06:56:55', '2022-07-07 06:56:55'),
(6, 'KK0005', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0005 - 2022-07-07', '2022-07-07 07:12:47', '2022-07-07 07:12:47'),
(7, 'KK0006', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0006 - 2022-07-07', '2022-07-07 07:23:14', '2022-07-07 07:23:14'),
(8, 'KK0007', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0007 - 2022-07-07', '2022-07-07 07:26:05', '2022-07-07 07:26:05'),
(9, 'KK0008', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '8000.00', '38000.00', 'File Transfer - KK0008 - 2022-07-07', '2022-07-07 07:33:20', '2022-07-07 07:33:20'),
(10, 'KK0009', '2022-07-07', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0009 - 2022-07-07', '2022-07-07 09:11:30', '2022-07-07 09:11:30'),
(11, 'KK0010', '2022-07-10', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0010 - 2022-07-10', '2022-07-10 09:52:54', '2022-07-10 09:52:54'),
(12, 'KK0011', '2022-07-10', 'O0003', 'SUP0001', '0.00', '0.00', '25000.00', 'File Transfer - KK0011 - 2022-07-10', '2022-07-10 09:53:18', '2022-07-10 09:53:18'),
(13, 'KK0012', '2022-07-10', 'O0003', 'SUP0001', '0.00', '0.00', '25000.00', 'File Transfer - KK0012 - 2022-07-10', '2022-07-10 09:53:57', '2022-07-10 09:53:57'),
(14, 'KK0013', '2022-07-10', 'O0003', 'SUP0001', '0.00', '0.00', '25000.00', 'File Transfer - KK0013 - 2022-07-10', '2022-07-10 09:54:10', '2022-07-10 09:54:10'),
(15, 'KK0014', '2022-07-10', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0014 - 2022-07-10.pdf', '2022-07-10 10:00:55', '2022-07-10 10:00:55'),
(16, 'KK0015', '2022-07-10', 'O0003', 'SUP0001', '5000.00', '12000.00', '42000.00', 'File Transfer - KK0015 - 2022-07-10.pdf', '2022-07-10 10:02:06', '2022-07-10 10:02:06'),
(17, 'KK0016', '2022-07-10', 'O0003', 'SUP0001', '0.00', '0.00', '25000.00', 'File Transfer - KK0016 - 2022-07-10.pdf', '2022-07-10 10:07:01', '2022-07-10 10:07:01'),
(18, 'KK0017', '2022-07-10', 'O0004', 'SUP0001', '8000.00', '15000.00', '48000.00', 'File Transfer - KK0017 - 2022-07-10.pdf', '2022-07-10 12:45:54', '2022-07-10 12:45:54');

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
  `diskon` decimal(10,2) NOT NULL,
  `piutang` decimal(10,2) NOT NULL,
  `terima_piutang` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualan_konsinyasi`
--

INSERT INTO `penjualan_konsinyasi` (`id`, `kode`, `tanggal`, `kode_consignee`, `total_jual`, `diskon`, `piutang`, `terima_piutang`, `sisa`, `created_at`, `updated_at`) VALUES
(1, 'JK0001', '2022-07-20', 'CONS0001', '27500.00', '5000.00', '22500.00', '22500.00', '0.00', '2022-07-20 08:03:04', '2022-07-20 09:32:40'),
(2, 'JK0002', '2022-07-21', 'CONS0001', '27500.00', '5000.00', '22500.00', '0.00', '0.00', '2022-07-21 07:47:45', '2022-07-21 07:47:45'),
(3, 'JK0003', '2022-07-21', 'CONS0001', '22000.00', '2000.00', '20000.00', '0.00', '20000.00', '2022-07-21 08:37:11', '2022-07-21 08:37:11'),
(4, 'JK0004', '2022-07-25', 'undefined', '0.00', '0.00', '0.00', '0.00', '0.00', '2022-07-25 16:19:19', '2022-07-25 16:19:19');

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
  `diskon` decimal(10,2) NOT NULL,
  `ongkos_kirim` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualan_pesanan`
--

INSERT INTO `penjualan_pesanan` (`id`, `kode`, `kode_pesanan`, `tanggal`, `kode_customer`, `total_jual`, `diskon`, `ongkos_kirim`, `total_harga`, `total_bayar`, `sisa`, `created_at`, `updated_at`) VALUES
(1, 'JP0001', 'PESAN0001', '2022-07-20', 'CUS0001', '110000.00', '5000.00', '8000.00', '113000.00', '113000.00', '0.00', '2022-07-20 02:50:14', '2022-07-20 03:56:33'),
(2, 'JP0002', 'PESAN0002', '2022-07-20', 'CUS0001', '64800.00', '5000.00', '8000.00', '67800.00', '67800.00', '0.00', '2022-07-20 02:53:29', '2022-07-20 03:55:55');

-- --------------------------------------------------------

--
-- Table structure for table `penjualan_tunai`
--

CREATE TABLE `penjualan_tunai` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `ongkos_kirim` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualan_tunai`
--

INSERT INTO `penjualan_tunai` (`id`, `kode`, `tanggal`, `kode_customer`, `total_jual`, `diskon`, `ongkos_kirim`, `total_harga`, `total_bayar`, `created_at`, `updated_at`) VALUES
(1, 'JT0001', '2022-07-24', 'CUS0001', '0.00', '0.00', '0.00', '0.00', '0.00', '2022-07-24 14:49:23', '2022-07-24 14:49:23'),
(2, 'JT0002', '2022-07-24', 'CUS0001', '35000.00', '5000.00', '8000.00', '38000.00', '40000.00', '2022-07-24 14:50:40', '2022-07-24 14:50:40');

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
(11, 'PPS0001', 'PROD0001', 10, 1, '2022-07-25 07:04:47', '2022-07-25 07:04:59');

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
(6, 'PS0001', 'PPS0001', 'PROD0001', '2022-07-25', 10, 10, 0, '2022-07-25 07:05:20', '2022-07-25 07:12:03'),
(7, 'PS0002', 'PPS0001', 'PROD0001', '2022-07-26', 10, 10, 0, '2022-07-26 03:20:39', '2022-07-26 03:20:39');

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_retur` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `jumlah_terima` decimal(10,2) NOT NULL,
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refund`
--

INSERT INTO `refund` (`id`, `kode`, `kode_retur`, `tanggal`, `jumlah_terima`, `file`, `created_at`, `updated_at`) VALUES
(1, 'KMR0001', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0001 - 2022-07-10.pdf', '2022-07-14 07:03:17', '2022-07-14 07:03:17'),
(2, 'KMR0002', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0002 - 2022-07-10.pdf', '2022-07-14 07:03:43', '2022-07-14 07:03:43'),
(3, 'KMR0003', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0003 - 2022-07-10.pdf', '2022-07-14 07:04:23', '2022-07-14 07:04:23'),
(4, 'KMR0004', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0004 - 2022-07-10.pdf', '2022-07-14 07:11:34', '2022-07-14 07:11:34'),
(5, 'KMR0005', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0005 - 2022-07-10.pdf', '2022-07-14 07:12:56', '2022-07-14 07:12:56'),
(6, 'KMR0006', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0006 - 2022-07-10.pdf', '2022-07-14 07:13:39', '2022-07-14 07:13:39'),
(7, 'KMR0007', '2022-07-10', '0000-00-00', '25000.00', 'File Transfer - KMR0007 - 2022-07-10.pdf', '2022-07-14 07:14:09', '2022-07-14 07:14:09');

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

--
-- Dumping data for table `retur_pembelian`
--

INSERT INTO `retur_pembelian` (`id`, `kode`, `kode_kas_keluar`, `tanggal`, `kode_supplier`, `total_harga`, `status`, `nota`, `created_at`, `updated_at`) VALUES
(7, 'RET0001', 'KK0009', '2022-07-10', 'SUP0001', '25000.00', 3, 'File Nota Pembelian - RET0001 - 2022-07-10.pdf', '2022-07-10 13:50:50', '2022-07-14 07:14:09'),
(8, 'RET0002', 'KK0011', '2022-07-24', 'SUP0001', '25000.00', 0, 'File Nota Pembelian - RET0002 - 2022-07-24.undefin', '2022-07-24 14:59:29', '2022-07-24 14:59:29'),
(9, 'RET0002', 'KK0013', '2022-07-24', 'SUP0001', '0.00', 0, '', '2022-07-24 15:01:57', '2022-07-24 15:01:57'),
(10, 'RET0002', 'KK0015', '2022-07-24', 'SUP0001', '25000.00', 0, '', '2022-07-24 15:02:07', '2022-07-24 15:02:07'),
(11, 'RET0002', 'KK0016', '2022-07-24', 'SUP0001', '25000.00', 0, '', '2022-07-24 15:05:25', '2022-07-24 15:05:25');

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
  `status` int(11) NOT NULL COMMENT '0 = Belum Dibayar,\r\n1 = Sudah Dibayar',
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terima_barang`
--

INSERT INTO `terima_barang` (`id`, `kode`, `kode_order`, `jenis_pembelian`, `tanggal`, `kode_supplier`, `total_barang`, `status`, `file`, `created_at`, `updated_at`) VALUES
(6, 'TB0001', 'O0003', 'bahan', '2022-07-04', 'SUP0001', 5, 1, '', '2022-07-04 04:21:52', '2022-07-10 10:07:01'),
(7, 'TB0002', 'O0004', 'bahan', '2022-07-10', 'SUP0001', 5, 1, 'File Nota Pembelian - TB0002 - 2022-07-10.pdf', '2022-07-10 12:44:39', '2022-07-10 12:45:54');

-- --------------------------------------------------------

--
-- Table structure for table `terima_piutang`
--

CREATE TABLE `terima_piutang` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_jual` varchar(10) NOT NULL,
  `kode_consignee` varchar(10) NOT NULL,
  `piutang` decimal(10,2) NOT NULL,
  `terima_piutang` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terima_piutang`
--

INSERT INTO `terima_piutang` (`id`, `kode`, `kode_jual`, `kode_consignee`, `piutang`, `terima_piutang`, `sisa`, `created_at`, `updated_at`) VALUES
(3, 'TP0001', 'JK0001', 'CONS0001', '22500.00', '2000.00', '25500.00', '2022-07-20 09:30:56', '2022-07-20 09:30:56'),
(4, 'TP0002', 'JK0001', 'CONS0001', '22500.00', '20500.00', '0.00', '2022-07-20 09:32:40', '2022-07-20 09:32:40'),
(5, 'TP0003', '', '', '0.00', '0.00', '0.00', '2022-07-24 14:38:59', '2022-07-24 14:38:59'),
(6, 'TP0004', '', '', '0.00', '0.00', '0.00', '2022-07-24 14:39:39', '2022-07-24 14:39:39'),
(7, 'TP0005', '', '', '0.00', '0.00', '0.00', '2022-07-24 14:39:54', '2022-07-24 14:39:54'),
(8, 'TP0006', 'JK0003', 'CONS0001', '20000.00', '0.00', '20000.00', '2022-07-24 14:44:24', '2022-07-24 14:44:24'),
(9, 'TP0007', '', '', '0.00', '0.00', '0.00', '2022-07-24 14:46:02', '2022-07-24 14:46:02'),
(10, 'TP0008', '', '', '0.00', '0.00', '0.00', '2022-07-24 14:46:16', '2022-07-24 14:46:16');

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
  `kode_customer` varchar(10) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `uang_muka` decimal(10,2) NOT NULL,
  `sisa` decimal(10,2) NOT NULL,
  `file` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uang_muka_pesanan`
--

INSERT INTO `uang_muka_pesanan` (`id`, `kode`, `tanggal`, `kode_customer`, `total_jual`, `uang_muka`, `sisa`, `file`, `created_at`, `updated_at`) VALUES
(2, 'PESAN0001', '2022-07-20', 'CUS0001', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:45:28', '2022-07-20 02:45:28'),
(3, 'PESAN0001', '2022-07-20', 'CUS0001', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:46:50', '2022-07-20 02:46:50'),
(4, 'PESAN0001', '2022-07-20', 'CUS0001', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:48:54', '2022-07-20 02:48:54'),
(5, 'PESAN0001', '2022-07-20', 'CUS0001', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:49:24', '2022-07-20 02:49:24'),
(6, 'PESAN0001', '2022-07-20', 'CUS0001', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:50:14', '2022-07-20 02:50:14'),
(7, 'PESAN0002', '2022-07-20', 'CUS0001', '67800.00', '50000.00', '17800.00', 'File Uang Muka - PESAN0002 - 2022-07-20.pdf', '2022-07-20 02:53:29', '2022-07-20 02:53:29');

-- --------------------------------------------------------

--
-- Structure for view `notifikasi`
--
DROP TABLE IF EXISTS `notifikasi`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notifikasi`  AS SELECT `master_inventory_bahanbaku`.`kode` AS `kode`, `master_inventory_bahanbaku`.`nama` AS `nama`, `master_inventory_bahanbaku`.`jumlah` AS `jumlah`, `master_inventory_bahanbaku`.`stok_minimal` AS `stok_minimal`, `master_inventory_bahanbaku`.`harga` AS `harga`, `master_inventory_bahanbaku`.`created_at` AS `created_at`, `master_inventory_bahanbaku`.`updated_at` AS `updated_at` FROM `master_inventory_bahanbaku` WHERE `master_inventory_bahanbaku`.`jumlah` <= `master_inventory_bahanbaku`.`stok_minimal` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_order_pembelian`
--
ALTER TABLE `detail_order_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_order_pembelian_alat`
--
ALTER TABLE `detail_order_pembelian_alat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_order_pembelian_bahanbaku`
--
ALTER TABLE `detail_order_pembelian_bahanbaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_order_pembelian_bahanpenolong`
--
ALTER TABLE `detail_order_pembelian_bahanpenolong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pembelian_alat`
--
ALTER TABLE `detail_pembelian_alat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pembelian_bahanbaku`
--
ALTER TABLE `detail_pembelian_bahanbaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_pembelian_bahanpenolong`
--
ALTER TABLE `detail_pembelian_bahanpenolong`
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
-- Indexes for table `detail_penjualan_konsinyasi`
--
ALTER TABLE `detail_penjualan_konsinyasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_penjualan_pesanan`
--
ALTER TABLE `detail_penjualan_pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_penjualan_tunai`
--
ALTER TABLE `detail_penjualan_tunai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_retur`
--
ALTER TABLE `detail_retur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_retur_alat`
--
ALTER TABLE `detail_retur_alat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_retur_bahanbaku`
--
ALTER TABLE `detail_retur_bahanbaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_retur_bahanpenolong`
--
ALTER TABLE `detail_retur_bahanpenolong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_terima`
--
ALTER TABLE `detail_terima`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_terima_alat`
--
ALTER TABLE `detail_terima_alat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_terima_bahanbaku`
--
ALTER TABLE `detail_terima_bahanbaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_terima_bahanpenolong`
--
ALTER TABLE `detail_terima_bahanpenolong`
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
-- Indexes for table `kartu_ketersediaan_alat`
--
ALTER TABLE `kartu_ketersediaan_alat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kartu_persediaan_bahanbaku`
--
ALTER TABLE `kartu_persediaan_bahanbaku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kartu_persediaan_bahanpenolong`
--
ALTER TABLE `kartu_persediaan_bahanpenolong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kartu_persediaan_produk`
--
ALTER TABLE `kartu_persediaan_produk`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `detail_order_pembelian_alat`
--
ALTER TABLE `detail_order_pembelian_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_order_pembelian_bahanbaku`
--
ALTER TABLE `detail_order_pembelian_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `detail_order_pembelian_bahanpenolong`
--
ALTER TABLE `detail_order_pembelian_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pembelian_alat`
--
ALTER TABLE `detail_pembelian_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pembelian_bahanbaku`
--
ALTER TABLE `detail_pembelian_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pembelian_bahanpenolong`
--
ALTER TABLE `detail_pembelian_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pengeluaran_kas`
--
ALTER TABLE `detail_pengeluaran_kas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `detail_penjualan_konsinyasi`
--
ALTER TABLE `detail_penjualan_konsinyasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_penjualan_pesanan`
--
ALTER TABLE `detail_penjualan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_penjualan_tunai`
--
ALTER TABLE `detail_penjualan_tunai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_retur`
--
ALTER TABLE `detail_retur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `detail_retur_alat`
--
ALTER TABLE `detail_retur_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_retur_bahanbaku`
--
ALTER TABLE `detail_retur_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_retur_bahanpenolong`
--
ALTER TABLE `detail_retur_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_terima`
--
ALTER TABLE `detail_terima`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_terima_alat`
--
ALTER TABLE `detail_terima_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_terima_bahanbaku`
--
ALTER TABLE `detail_terima_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_terima_bahanpenolong`
--
ALTER TABLE `detail_terima_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estimasi_pesanan`
--
ALTER TABLE `estimasi_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hpp`
--
ALTER TABLE `hpp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `hpp_detail_alat`
--
ALTER TABLE `hpp_detail_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hpp_detail_bahan_baku`
--
ALTER TABLE `hpp_detail_bahan_baku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `hpp_detail_penolong`
--
ALTER TABLE `hpp_detail_penolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hpp_detail_tenaga_kerja`
--
ALTER TABLE `hpp_detail_tenaga_kerja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `kartu_ketersediaan_alat`
--
ALTER TABLE `kartu_ketersediaan_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kartu_persediaan_bahanbaku`
--
ALTER TABLE `kartu_persediaan_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kartu_persediaan_bahanpenolong`
--
ALTER TABLE `kartu_persediaan_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kartu_persediaan_produk`
--
ALTER TABLE `kartu_persediaan_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_akun`
--
ALTER TABLE `master_akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `master_consignee`
--
ALTER TABLE `master_consignee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_customer`
--
ALTER TABLE `master_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_inventory_alat`
--
ALTER TABLE `master_inventory_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_inventory_bahanbaku`
--
ALTER TABLE `master_inventory_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_inventory_bahanpenolong`
--
ALTER TABLE `master_inventory_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `master_inventory_produk`
--
ALTER TABLE `master_inventory_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_supplier`
--
ALTER TABLE `master_supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_tenagakerja`
--
ALTER TABLE `master_tenagakerja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_user`
--
ALTER TABLE `master_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_pembelian`
--
ALTER TABLE `order_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `penjualan_konsinyasi`
--
ALTER TABLE `penjualan_konsinyasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `penjualan_pesanan`
--
ALTER TABLE `penjualan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penjualan_tunai`
--
ALTER TABLE `penjualan_tunai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permintaan_pesanan`
--
ALTER TABLE `permintaan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permintaan_stok`
--
ALTER TABLE `permintaan_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `produksi`
--
ALTER TABLE `produksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produksi_pesanan`
--
ALTER TABLE `produksi_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `produksi_stok`
--
ALTER TABLE `produksi_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `retur_pembelian`
--
ALTER TABLE `retur_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `terima_barang`
--
ALTER TABLE `terima_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `terima_piutang`
--
ALTER TABLE `terima_piutang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `uang_muka_pesanan`
--
ALTER TABLE `uang_muka_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
