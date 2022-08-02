-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 03:07 AM
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
  `total_kapasitas` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_order_pembelian`
--

INSERT INTO `detail_order_pembelian` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `total_kapasitas`, `created_at`, `updated_at`) VALUES
(1, 'O0001', 'BB0001', 'Botol', 5, '5000.00', '25000.00', 0, '2022-07-31 00:57:01', '2022-07-31 00:57:01'),
(2, 'O0002', 'ALAT0001', 'Sendok', 5, '10000.00', '50000.00', 6, '2022-07-31 00:57:12', '2022-07-31 01:00:09');

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
(1, 'KK0001', 'BB0001', 'Botol', 5, 5000, 25000, '2022-07-31 00:59:19', '2022-07-31 00:59:19'),
(2, 'KK0002', 'ALAT0001', 'Sendok', 5, 10000, 50000, '2022-07-31 01:00:51', '2022-07-31 01:00:51');

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
  `hpp` decimal(10,2) NOT NULL,
  `total_hpp` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `hpp`, `total_hpp`, `created_at`, `updated_at`) VALUES
(1, 'JT0001', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 01:41:19', '2022-07-31 01:41:19'),
(2, 'JT0002', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 01:42:54', '2022-07-31 01:42:54'),
(3, 'JK0001', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 01:43:05', '2022-07-31 01:43:05'),
(4, 'JT0003', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 10:09:12', '2022-07-31 10:09:12'),
(5, 'JT0004', 'PROD0001', 'Produk 1', 10, '0.00', '0.00', '10000.00', '100000.00', '2022-07-31 10:10:04', '2022-07-31 10:10:04'),
(6, 'JT0005', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 10:10:48', '2022-07-31 10:10:48'),
(7, 'JK0002', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 10:12:56', '2022-07-31 10:12:56'),
(8, 'JT0006', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '10000.00', '50000.00', '2022-07-31 11:14:22', '2022-07-31 11:14:22'),
(9, 'JT0007', 'PROD0001', 'Produk 1', 5, '0.00', '0.00', '63161.47', '315807.35', '2022-08-01 13:50:55', '2022-08-01 13:50:55'),
(10, 'JT0008', 'PROD0001', 'Kain Batik Mangrove Api-api Sintetis 1 Warna', 5, '0.00', '0.00', '0.00', '0.00', '2022-08-01 15:46:28', '2022-08-01 15:46:28');

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
  `total_kapasitas` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_retur`
--

INSERT INTO `detail_retur` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `total_kapasitas`, `created_at`, `updated_at`) VALUES
(1, 'RET0001', 'ALAT0001', 'Sendok', 5, '10000.00', '50000.00', 5, '2022-07-31 01:21:23', '2022-07-31 01:21:23');

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
  `profit` decimal(10,2) NOT NULL COMMENT '%',
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
(1, 'PESAN0001', 'Pesanan 1', '2022-07-31', 'CUS0001', 'Kain', 10, '', '25000.00', '10.00', '275000.00', 1, 0, '2022-07-31 01:54:08', '2022-07-31 02:02:54'),
(2, 'PESAN0002', 'Pesanan 1', '2022-07-31', 'CUS0001', 'Kain', 5, '', '143965.60', '20.00', '172758.72', 0, 0, '2022-07-31 02:19:23', '2022-07-31 02:19:23');

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

INSERT INTO `hpp` (`id`, `kode`, `kode_produk`, `kode_pesanan`, `kode_customer`, `kode_produksi`, `kode_permintaan`, `tanggal_mulai`, `tanggal_selesai`, `biaya_bahan_baku`, `biaya_tenaga_kerja`, `biaya_overhead_pabrik`, `hpp`, `jumlah`, `harga_jual`, `created_at`, `updated_at`) VALUES
(1, 'HPP0001', 'PROD0001', '', '', 'PS0001', 'PPS0001', '2022-07-31', '2022-08-06', '35991.40', '200002.00', '1029000.00', '1264993.40', 6, '0.00', '2022-07-31 10:32:29', '2022-07-31 10:53:45');

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
(1, 'BOPAlat0001', 'HPP0001', 'PS0001', 'PPS0001', 'ALAT0002', '2022-07-31', '1000.00', 7, '7000.00', '2022-07-31 10:32:29', '2022-07-31 10:32:29'),
(3, 'BOPAlat0001', 'HPP0001', 'PS0001', 'PPS0001', 'ALAT0001', '2022-07-31', '167000.00', 6, '1002000.00', '2022-07-31 10:53:45', '2022-07-31 10:53:45');

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
(1, 'BBB0001', 'HPP0001', 'PS0001', 'PPS0001', 'BB0001', '2022-07-31', '7198.28', 5, '35991.40', '2022-07-31 10:32:29', '2022-07-31 10:32:29');

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

--
-- Dumping data for table `hpp_detail_penolong`
--

INSERT INTO `hpp_detail_penolong` (`id`, `kode`, `kode_hpp`, `kode_produksi`, `kode_permintaan`, `kode_penolong`, `tanggal`, `harga`, `jumlah`, `total_harga`, `created_at`, `updated_at`) VALUES
(1, 'BBP0001', 'HPP0001', 'PS0001', 'PPS0001', 'BP0001', '2022-07-31', '5000.00', 4, '20000.00', '2022-07-31 10:32:29', '2022-07-31 10:32:29');

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
(1, 'BTKL0001', 'HPP0001', 'PS0001', 'TK0001', '', '2022-07-31', '100001.00', 2, '200002.00', '2022-07-31 10:32:29', '2022-07-31 10:32:29');

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
(1, '1101', 'Kas di Tangan', '195500.00', 0, '2022-07-02 03:35:56', '2022-07-24 14:50:40'),
(2, '1102', 'Kas Bank', '42800.00', 0, '2022-07-02 03:36:09', '2022-07-20 02:53:29'),
(3, '1103', 'Piutang Konsinyasi', '65000.00', 0, '2022-07-02 03:36:21', '2022-07-21 08:37:11'),
(4, '2101', 'Uang Muka Pesanan', '0.00', 1, '2022-07-02 03:36:48', '2022-07-02 03:36:48'),
(5, '4101', 'Penjualan', '286800.00', 1, '2022-07-02 03:40:10', '2022-07-24 14:50:40'),
(6, '4201', 'Potongan Penjualan', '27000.00', 0, '2022-07-02 03:40:22', '2022-07-24 14:50:40'),
(7, '4202', 'Beban Angkut Penjualan', '24000.00', 0, '2022-07-02 03:40:32', '2022-07-24 14:50:40'),
(8, '5101', 'HPP', '0.00', 0, '2022-07-02 03:40:42', '2022-07-02 03:40:42'),
(9, '5201', 'Potongan Pembelian', '0.00', 1, '2022-07-02 03:40:51', '2022-07-02 03:40:51'),
(10, '5202', 'Retur Pembelian', '0.00', 1, '2022-07-02 03:41:06', '2022-07-02 03:41:06'),
(11, '5203', 'Beban Angkut Pembelian', '0.00', 0, '2022-07-02 03:41:15', '2022-07-02 03:41:15');

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
(2, 'CONS0002', 'Hotel Dafam', 'Cilacap', '08563746', '2022-07-26 11:55:26', '2022-07-26 11:55:26'),
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
(6, 'CUS0006', 'Dinas Kepemudaan dan Olahraga', 'Cilacap', '08564783', '2022-07-26 11:55:09', '2022-07-26 11:55:09');

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
  `total_kapasitas` int(11) NOT NULL,
  `bop` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_alat`
--

INSERT INTO `master_inventory_alat` (`id`, `kode`, `nama`, `jumlah`, `harga`, `total_kapasitas`, `bop`, `created_at`, `updated_at`) VALUES
(1, 'ALAT0001', 'Sarung Tangan', 60, '1800000.00', 6000, '300.00', '2022-07-26 11:41:40', '2022-07-26 11:41:40'),
(2, 'ALAT0002', 'Sepatu Boot', 12, '960000.00', 518400, '1.85', '2022-07-26 11:43:18', '2022-07-26 11:43:18'),
(3, 'ALAT0003', 'Dandang', 6, '1200000.00', 69120, '17.36', '2022-07-26 11:43:52', '2022-07-26 11:43:52'),
(4, 'ALAT0004', 'Bak Celup', 2, '4000000.00', 288000, '13.89', '2022-07-26 11:44:11', '2022-07-26 11:44:11'),
(5, 'ALAT0005', 'Ember', 7, '350000.00', 100800, '3.47', '2022-07-26 11:44:28', '2022-07-26 11:44:28'),
(6, 'ALAT0006', 'Canting', 40, '320000.00', 46080, '6.94', '2022-07-26 11:44:48', '2022-07-26 11:44:48'),
(7, 'ALAT0007', 'Gas', 10, '210000.00', 2500, '84.00', '2022-07-26 11:45:05', '2022-07-26 11:45:05'),
(8, 'ALAT0008', 'Kompor', 10, '700000.00', 691200, '1.01', '2022-07-26 11:45:25', '2022-07-26 11:45:25'),
(9, 'ALAT0009', 'Cap Lurik Wijayakusuma', 1, '1500000.00', 144000, '10.42', '2022-07-26 11:46:27', '2022-07-26 11:46:27'),
(10, 'ALAT0010', 'Cap Kerapu Bakau', 1, '950000.00', 144000, '6.60', '2022-07-26 11:46:48', '2022-07-26 11:46:48'),
(11, 'ALAT0011', 'Cap Mangrove Bakautancang', 1, '1200000.00', 144000, '8.33', '2022-07-26 11:47:18', '2022-07-26 11:47:18'),
(12, 'ALAT0012', 'Cap Kawung Wijayakusuma', 1, '1100000.00', 144000, '7.64', '2022-07-31 12:38:56', '2022-07-31 12:38:56'),
(13, 'ALAT0013', 'Cap Mangrove Api-api', 1, '1350000.00', 144000, '9.38', '2022-07-31 12:39:59', '2022-07-31 12:39:59'),
(14, 'ALAT0014', 'Cap Sekar Wijayakusuma', 1, '1650000.00', 144000, '11.46', '2022-07-31 12:40:22', '2022-07-31 12:40:22'),
(15, 'ALAT0015', 'Cap Truntum', 1, '850000.00', 144000, '5.90', '2022-07-31 12:40:46', '2022-07-31 12:40:46'),
(16, 'ALAT0016', 'Cap Bumi Wijayakusuma', 1, '1250000.00', 144000, '8.68', '2022-07-31 12:41:08', '2022-07-31 12:41:08'),
(17, 'ALAT0017', 'Cap Bogem Mentah', 1, '900000.00', 144000, '6.25', '2022-07-31 12:41:30', '2022-07-31 12:41:30'),
(18, 'ALAT0018', 'Cap Lurik', 1, '650000.00', 144000, '4.51', '2022-07-31 12:41:49', '2022-07-31 12:41:49');

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
(2, 'BB0001', 'Kain Tari Kupu', 'Meter', 10, 100, '60000.00', '2022-07-26 11:25:09', '2022-07-26 11:59:20'),
(3, 'BB0002', 'Kain Mori Sanforis', 'Meter', 10, 100, '40000.00', '2022-07-26 11:25:33', '2022-07-26 11:59:24'),
(4, 'BB0003', 'Kain Sutra', 'Meter', 10, 100, '150000.00', '2022-07-26 11:32:40', '2022-07-26 11:59:30'),
(5, 'BB0004', 'Malam Tulis', 'Kg', 10, 100, '40000.00', '2022-07-26 11:33:03', '2022-07-26 11:59:35'),
(6, 'BB0005', 'Malam Semi', 'Kg', 10, 100, '25000.00', '2022-07-26 11:33:27', '2022-07-26 11:59:40'),
(7, 'BB0006', 'Pewarna Mangrove', 'Kg', 0, 100, '6000.00', '2022-07-26 11:33:51', '2022-07-26 11:33:51'),
(8, 'BB0007', 'Pewarna Kayu Tegeran', 'Kg', 0, 100, '60000.00', '2022-07-26 11:34:10', '2022-07-26 11:34:10'),
(9, 'BB0008', 'Pewarna Kayu Jolawe', 'Kg', 0, 100, '60000.00', '2022-07-26 11:34:31', '2022-07-26 11:34:31'),
(10, 'BB0009', 'Green IB', 'Kg', 0, 100, '290000.00', '2022-07-26 11:34:55', '2022-07-26 11:34:55'),
(16, 'BB0015', 'Water Glass', 'Liter', 0, 100, '25000.00', '2022-07-26 11:37:28', '2022-07-26 11:37:28'),
(17, 'BB0016', 'Rebusan Air Soda As', 'Liter', 0, 100, '15000.00', '2022-07-26 11:37:56', '2022-07-26 11:37:56'),
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
(29, 'BB0028', 'AS-BO', 'Kg', 0, 100, '210000.00', '2022-07-31 12:32:28', '2022-07-31 12:32:28');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_bahanpenolong`
--

INSERT INTO `master_inventory_bahanpenolong` (`id`, `kode`, `nama`, `satuan`, `stok_minimal`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(4, 'BP0001', 'Pensil', 'pcs', 10, 100, '2000.00', '2022-07-26 11:38:24', '2022-07-26 11:59:49'),
(5, 'BP0002', 'Penghapus', 'pcs', 10, 100, '500.00', '2022-07-26 11:38:38', '2022-07-26 11:59:54'),
(6, 'BP0003', 'Plastik', 'pcs', 10, 100, '200.00', '2022-07-26 11:39:31', '2022-07-26 11:59:59'),
(7, 'BP0004', 'Box', 'pcs', 10, 100, '1500.00', '2022-07-26 11:39:53', '2022-07-26 12:00:03'),
(8, 'BP0005', 'Nitrit', 'Kg', 0, 100, '25000.00', '2022-07-31 12:33:36', '2022-07-31 12:33:36'),
(9, 'BP0006', 'Air Akizuur', 'Liter', 0, 100, '10000.00', '2022-07-31 12:34:09', '2022-07-31 12:34:09'),
(10, 'BP0007', 'Tawas', 'Kg', 0, 100, '35000.00', '2022-07-31 12:34:58', '2022-07-31 12:34:58'),
(11, 'BP0008', 'Tunjung', 'Kg', 0, 100, '50000.00', '2022-07-31 12:35:16', '2022-07-31 12:35:16'),
(12, 'BP0009', 'Kancing Baju', 'pcs', 0, 5000, '174.00', '2022-07-31 12:36:03', '2022-07-31 12:36:03'),
(13, 'BP0010', 'Benang', 'roll', 0, 500, '240.00', '2022-07-31 12:38:09', '2022-07-31 12:38:09');

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
(4, 'PROD0001', 'Kain Batik Mangrove Api-api Sintetis 1 Warna', 'Cap', 'Sintetis', 30, 5, '0.00', '0.00', '2022-07-29 07:54:42', '2022-08-01 15:46:28'),
(5, 'PROD0002', 'Batik Bumi Wijayakusuma Kombinasi 2 Warna Sintetis', 'Kombinasi', 'Sintetis', 20, 5, '0.00', '160000.00', '2022-07-29 08:26:51', '2022-07-29 08:26:51'),
(6, 'PROD0003', 'Kain Batik Tulis Lasem Primissima 1 Warna Alami', 'Tulis', 'Alami', 20, 5, '0.00', '500000.00', '2022-07-30 20:19:20', '2022-07-30 20:19:20'),
(7, 'PROD0004', 'Kemeja Sekar Wijayakusuma Size S', 'Cap', 'Sintetis', 30, 5, '0.00', '160000.00', '2022-07-30 20:22:50', '2022-07-30 20:22:50'),
(8, 'PROD0005', 'Kemeja Sekar Wijayakusuma Size M', 'Cap', 'Sintetis', 20, 5, '0.00', '160000.00', '2022-07-30 20:23:38', '2022-07-30 20:23:38'),
(9, 'PROD0006', 'Kemeja Sekar Wijayakusuma Size L', 'Cap', 'Sintetis', 20, 5, '0.00', '160000.00', '2022-07-30 20:24:05', '2022-07-30 20:24:05'),
(10, 'PROD0007', 'Kemeja Sekar Wijayakusuma Size XL', 'Cap', 'Sintetis', 15, 5, '0.00', '165000.00', '2022-07-30 20:24:50', '2022-07-30 20:24:50'),
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
  `upah` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_tenagakerja`
--

INSERT INTO `master_tenagakerja` (`id`, `kode`, `nama`, `departemen`, `telepon`, `upah`, `created_at`, `updated_at`) VALUES
(1, 'TK0001', 'Nama', 'Designer', '234234131', '100001.00', '2022-07-23 05:37:51', '2022-07-25 15:47:38'),
(2, 'TK0002', 'Nama Cap', 'Cap/Canting', '123123', '1000.00', '2022-07-25 08:18:48', '2022-07-25 15:47:43'),
(3, 'TK0003', 'Ali', 'Designer', '0853674893', '30000.00', '2022-07-26 11:48:50', '2022-07-26 11:48:50'),
(4, 'TK0004', 'Putri', 'Cap/Canting', '0856749830', '60000.00', '2022-07-26 11:49:22', '2022-07-26 11:49:22'),
(5, 'TK0005', 'Sinta', 'Designer', '8983743', '3000.00', '2022-07-26 11:50:53', '2022-07-30 20:05:31'),
(6, 'TK0006', 'Tono', 'Designer', '7382904', '3000.00', '2022-07-26 11:51:05', '2022-07-30 20:05:48'),
(7, 'TK0007', 'Yani', 'Packing', '0853674889', '20000.00', '2022-07-26 11:51:40', '2022-07-26 11:51:40'),
(8, 'TK0008', 'Putra', 'Cap/Canting', '07836483', '6000.00', '2022-07-30 20:06:17', '2022-07-30 20:06:17');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_pembelian`
--

INSERT INTO `order_pembelian` (`id`, `kode`, `jenis_pembelian`, `tanggal`, `kode_supplier`, `total_harga`, `status`, `created_at`, `updated_at`) VALUES
(1, 'O0001', 'bahan', '2022-07-31', 'SUP0001', '25000.00', 3, '2022-07-31 00:57:01', '2022-07-31 00:58:16'),
(2, 'O0002', 'alat', '2022-07-31', 'SUP0001', '50000.00', 3, '2022-07-31 00:57:12', '2022-07-31 01:00:28');

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
(1, 'KK0001', '2022-07-31', 'O0001', 'SUP0001', '20000.00', '5000.00', '10000.00', '', '2022-07-31 00:59:19', '2022-07-31 00:59:19'),
(2, 'KK0002', '2022-07-31', 'O0002', 'SUP0001', '40000.00', '10000.00', '20000.00', '', '2022-07-31 01:00:51', '2022-07-31 01:00:51');

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

--
-- Dumping data for table `penjualan_konsinyasi`
--

INSERT INTO `penjualan_konsinyasi` (`id`, `kode`, `tanggal`, `kode_consignee`, `total_jual`, `total_hpp`, `diskon`, `piutang`, `terima_piutang`, `sisa`, `created_at`, `updated_at`) VALUES
(1, 'JK0001', '2022-07-31', 'CONS0003', '0.00', '50000.00', '0.00', '0.00', '0.00', '0.00', '2022-07-31 01:43:05', '2022-08-01 18:52:32'),
(2, 'JK0002', '2022-07-31', 'CONS0003', '0.00', '50000.00', '0.00', '0.00', '0.00', '0.00', '2022-07-31 10:12:56', '2022-08-01 18:52:34');

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
(1, 'JP0001', 'PESAN0001', '2022-07-31', 'CUS0001', '2750000.00', '200000.00', '10000.00', '2560000.00', '2000000.00', '560000.00', '2022-07-31 02:00:24', '2022-07-31 02:00:24'),
(2, 'JP0002', 'PESAN0001', '2022-07-31', 'CUS0001', '2750000.00', '500000.00', '10000.00', '2260000.00', '2000000.00', '260000.00', '2022-07-31 02:02:01', '2022-07-31 02:02:01');

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

INSERT INTO `penjualan_tunai` (`id`, `kode`, `tanggal`, `kode_customer`, `total_jual`, `total_hpp`, `diskon`, `ongkos_kirim`, `total_harga`, `total_bayar`, `file`, `created_at`, `updated_at`) VALUES
(1, 'JT0001', '2022-07-31', 'CUS0001', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '', '2022-07-31 01:41:19', '2022-07-31 01:41:19'),
(2, 'JT0002', '2022-07-31', 'CUS0001', '0.00', '50000.00', '0.00', '0.00', '0.00', '0.00', '', '2022-07-31 01:42:54', '2022-07-31 01:42:54'),
(3, 'JT0003', '2022-07-31', 'CUS0001', '0.00', '50000.00', '0.00', '0.00', '0.00', '0.00', '', '2022-07-31 10:09:12', '2022-07-31 10:09:12'),
(4, 'JT0004', '2022-07-31', 'CUS0002', '0.00', '100000.00', '0.00', '0.00', '0.00', '0.00', '', '2022-07-31 10:10:04', '2022-07-31 10:10:04'),
(5, 'JT0005', '2022-07-31', 'CUS0001', '0.00', '50000.00', '0.00', '0.00', '0.00', '0.00', '', '2022-07-31 10:10:48', '2022-07-31 10:10:48'),
(6, 'JT0006', '2022-07-31', 'CUS0001', '0.00', '50000.00', '0.00', '0.00', '0.00', '0.00', '', '2022-07-31 11:14:22', '2022-07-31 11:14:22'),
(7, 'JT0007', '2022-08-01', 'CUS0001', '0.00', '315807.35', '0.00', '0.00', '0.00', '0.00', '', '2022-08-01 13:50:55', '2022-08-01 13:50:55'),
(8, 'JT0008', '2022-08-01', 'CUS0003', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '', '2022-08-01 15:46:28', '2022-08-01 15:46:28');

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
(1, 'PPS0001', 'PROD0001', 6, 1, '2022-07-31 10:14:47', '2022-07-31 10:14:48');

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
(1, 'PS0001', 'PPS0001', 'PROD0001', '2022-07-31', 6, 6, 0, '2022-07-31 10:15:04', '2022-08-02 00:36:44');

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
(1, 'REF0001', 'RET0001', '2022-07-31', '50000.00', '', '2022-07-31 01:23:53', '2022-07-31 01:23:53');

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
(1, 'RET0001', 'KK0002', '2022-07-31', 'SUP0001', '50000.00', 3, '', '2022-07-31 01:21:23', '2022-07-31 01:23:53');

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
(1, 'TB0001', 'O0001', 'bahan', '2022-07-31', 'SUP0001', 5, 0, 1, '', '2022-07-31 00:58:16', '2022-07-31 00:59:19'),
(2, 'TB0002', 'O0002', 'alat', '2022-07-31', 'SUP0001', 5, 0, 1, '', '2022-07-31 01:00:28', '2022-07-31 01:00:51');

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
  `total_hpp` decimal(10,2) NOT NULL,
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

INSERT INTO `uang_muka_pesanan` (`id`, `kode`, `tanggal`, `kode_customer`, `total_hpp`, `total_jual`, `uang_muka`, `sisa`, `file`, `created_at`, `updated_at`) VALUES
(1, 'PESAN0001', '2022-07-31', 'CUS0001', '250000.00', '2260000.00', '2000000.00', '260000.00', '', '2022-07-31 02:02:01', '2022-07-31 02:02:01');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `detail_order_pembelian_alat`
--
ALTER TABLE `detail_order_pembelian_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_order_pembelian_bahanbaku`
--
ALTER TABLE `detail_order_pembelian_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hpp`
--
ALTER TABLE `hpp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hpp_detail_alat`
--
ALTER TABLE `hpp_detail_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hpp_detail_bahan_baku`
--
ALTER TABLE `hpp_detail_bahan_baku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hpp_detail_penolong`
--
ALTER TABLE `hpp_detail_penolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hpp_detail_tenaga_kerja`
--
ALTER TABLE `hpp_detail_tenaga_kerja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `master_inventory_alat`
--
ALTER TABLE `master_inventory_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `master_inventory_bahanbaku`
--
ALTER TABLE `master_inventory_bahanbaku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `master_inventory_bahanpenolong`
--
ALTER TABLE `master_inventory_bahanpenolong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `master_user`
--
ALTER TABLE `master_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_pembelian`
--
ALTER TABLE `order_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penjualan_konsinyasi`
--
ALTER TABLE `penjualan_konsinyasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penjualan_pesanan`
--
ALTER TABLE `penjualan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penjualan_tunai`
--
ALTER TABLE `penjualan_tunai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `permintaan_pesanan`
--
ALTER TABLE `permintaan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permintaan_stok`
--
ALTER TABLE `permintaan_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `produksi`
--
ALTER TABLE `produksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produksi_pesanan`
--
ALTER TABLE `produksi_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produksi_stok`
--
ALTER TABLE `produksi_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `retur_pembelian`
--
ALTER TABLE `retur_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `terima_barang`
--
ALTER TABLE `terima_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
