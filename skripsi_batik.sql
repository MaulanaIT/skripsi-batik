-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2022 at 05:14 PM
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
(1, 'O0001', 'BB0001', 'Botol', 5, '50000.00', '250000.00', 0, '2022-07-26 05:10:55', '2022-07-28 02:20:07'),
(2, 'O0002', 'ALAT0001', 'Sendok', 6, '120000.00', '720000.00', 2, '2022-07-26 05:11:03', '2022-07-29 17:19:51'),
(3, 'O0003', 'BB0001', 'Botol', 6, '10000.00', '60000.00', 0, '2022-07-30 14:31:26', '2022-07-30 14:31:37');

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
(2, 'KK0002', 'BB0001', 'Botol', 5, 50000, 250000, '2022-07-29 23:50:55', '2022-07-29 23:50:55'),
(3, 'KK0003', 'ALAT0001', 'Sendok', 6, 120000, 720000, '2022-07-29 23:55:35', '2022-07-29 23:55:35');

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
(2, 'RET0001', 'ALAT0001', 'Sendok', 4, '120000.00', '480000.00', 4, '2022-07-30 14:48:04', '2022-07-30 14:48:04');

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
(1, 'PESAN0001', 'Pesanan 1', '2022-07-26', 'CUS0001', 'Kain', 5, 'Deskripsi', '77000.00', '10.00', '84700.00', 0, 1, '2022-07-26 04:31:08', '2022-07-26 09:20:16'),
(2, 'PESAN0002', 'Pesanan 2', '2022-07-26', 'CUS0002', 'Pakaian', 10, 'Catatan 2', '0.00', '15.00', '0.00', 0, 1, '2022-07-26 08:59:34', '2022-07-26 09:21:04');

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
(4, 'HPP0001', '', 'PESAN0001', 'CUS0001', 'PP0001', 'PPP0001', '2022-07-26', '2022-07-31', '25000.00', '7000.00', '45000.00', '77000.00', 5, '0.00', '2022-07-26 09:19:52', '2022-07-26 09:19:52'),
(5, 'HPP0002', '', 'PESAN0002', 'CUS0002', 'PP0002', 'PPP0002', '2022-07-26', '2022-08-02', '0.00', '0.00', '0.00', '0.00', 10, '0.00', '2022-07-26 09:23:33', '2022-07-26 09:23:33');

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
(2, 'BOPAlat0001', 'HPP0001', 'PP0001', 'PPP0001', 'ALAT0002', '2022-07-26', '5000.00', 5, '25000.00', '2022-07-26 09:19:53', '2022-07-26 09:19:53');

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
(2, 'BBB0001', 'HPP0001', 'PP0001', 'PPP0001', 'BB0001', '2022-07-26', '5000.00', 5, '25000.00', '2022-07-26 09:19:53', '2022-07-26 09:19:53');

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
(2, 'BBP0001', 'HPP0001', 'PP0001', 'PPP0001', 'BP0001', '2022-07-26', '5000.00', 4, '20000.00', '2022-07-26 09:19:53', '2022-07-26 09:19:53');

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
(1, 'BTKL0001', 'HPP0001', 'PP0001', 'TK0002', '', '2022-07-26', '1000.00', 7, '7000.00', '2022-07-26 09:19:53', '2022-07-26 09:19:53');

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
(9, '1101', 'Kas di Tangan', '1155500.00', 0, '2022-07-02 03:35:56', '2022-07-30 15:02:40'),
(10, '1102', 'Kas Bank', '42800.00', 0, '2022-07-02 03:36:09', '2022-07-20 02:53:29'),
(11, '1103', 'Piutang Konsinyasi', '65000.00', 0, '2022-07-02 03:36:21', '2022-07-21 08:37:11'),
(12, '2101', 'Uang Muka Pesanan', '0.00', 1, '2022-07-02 03:36:48', '2022-07-02 03:36:48'),
(13, '4101', 'Penjualan', '286800.00', 1, '2022-07-02 03:40:10', '2022-07-24 14:50:40'),
(14, '4201', 'Potongan Penjualan', '3307000.00', 0, '2022-07-02 03:40:22', '2022-07-29 23:55:35'),
(15, '4202', 'Beban Angkut Penjualan', '84000.00', 0, '2022-07-02 03:40:32', '2022-07-29 23:40:22'),
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
  `total_kapasitas` int(11) NOT NULL,
  `bop` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_alat`
--

INSERT INTO `master_inventory_alat` (`id`, `kode`, `nama`, `jumlah`, `harga`, `total_kapasitas`, `bop`, `created_at`, `updated_at`) VALUES
(1, 'ALAT0001', 'Sendok', 108, '962000.00', 0, '0.00', '2022-06-20 12:33:58', '2022-07-30 15:02:40'),
(2, 'ALAT0002', 'Alat 2', 5, '5000.00', 5, '1000.00', '2022-07-26 05:06:22', '2022-07-26 05:08:10');

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
(1, 'BB0001', 'Botol', 'Buah', 100, 105, '7142.86', '2022-06-05 03:51:14', '2022-07-29 23:35:10');

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
(3, 'BP0001', 'Penolong 1', 'Lembar', 0, 10, '5000.00', '2022-07-26 03:20:10', '2022-07-26 03:20:10');

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
(1, 'PROD0001', 'Produk 1', 'Cair', 'Bening', 115, 10, '10000.00', '0.00', '2022-06-22 04:39:34', '2022-07-29 12:33:26');

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
(1, 'O0001', 'bahan', '2022-07-26', 'SUP0001', '25000.00', 3, '2022-07-26 05:10:55', '2022-07-29 23:35:10'),
(2, 'O0002', 'alat', '2022-07-26', 'SUP0001', '50000.00', 3, '2022-07-26 05:11:03', '2022-07-29 23:55:12'),
(3, 'O0003', 'bahan', '2022-07-30', 'SUP0001', '40000.00', 2, '2022-07-30 14:31:26', '2022-07-30 14:32:27');

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
(2, 'KK0002', '2022-07-30', 'O0001', 'SUP0001', '240000.00', '0.00', '10000.00', '', '2022-07-29 23:50:55', '2022-07-29 23:50:55'),
(3, 'KK0003', '2022-07-30', 'O0002', 'SUP0001', '700000.00', '0.00', '20000.00', '', '2022-07-29 23:55:35', '2022-07-29 23:55:35');

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
  `kode_customer` varchar(10) NOT NULL,
  `total_jual` decimal(10,2) NOT NULL,
  `total_hpp` decimal(10,2) NOT NULL,
  `diskon` decimal(10,2) NOT NULL,
  `ongkos_kirim` decimal(10,2) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `total_bayar` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'PPP0001', 'PESAN0001', 5, 0, '2022-07-26 04:31:12', '2022-07-26 04:31:12'),
(2, 'PPP0002', 'PESAN0002', 10, 0, '2022-07-26 09:00:31', '2022-07-26 09:00:31');

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
(1, 'PPS0001', 'PROD0001', 5, 1, '2022-07-26 04:20:17', '2022-07-26 04:20:34');

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
(2, 'PP0001', 'PPP0001', 'PESAN0001', '2022-07-26', '2022-07-26', 'CUS0001', 5, 5, 'Deskripsi', 0, '2022-07-26 04:47:57', '2022-07-26 04:49:25'),
(3, 'PP0002', 'PPP0002', 'PESAN0002', '2022-07-26', '2022-07-26', 'CUS0002', 10, 7, 'Catatan 2', 0, '2022-07-26 09:00:41', '2022-07-26 09:00:41');

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
(1, 'PS0001', 'PPS0001', 'PROD0001', '2022-07-26', 5, 3, 1, '2022-07-26 04:21:20', '2022-07-26 09:20:02');

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
(1, 'REF0001', 'RET0001', '2022-07-30', '480000.00', '', '2022-07-30 15:00:39', '2022-07-30 15:00:39'),
(2, 'REF0001', 'RET0001', '2022-07-30', '480000.00', '', '2022-07-30 15:00:39', '2022-07-30 15:00:39'),
(3, 'REF0002', 'RET0001', '2022-07-30', '480000.00', '', '2022-07-30 15:02:40', '2022-07-30 15:02:40');

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
(2, 'RET0001', 'KK0003', '2022-07-30', 'SUP0001', '480000.00', 3, '', '2022-07-30 14:48:04', '2022-07-30 15:02:40');

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
(4, 'TB0002', 'O0001', 'bahan', '2022-07-30', 'SUP0001', 5, 0, 1, '', '2022-07-29 23:35:10', '2022-07-29 23:50:55'),
(5, 'TB0003', 'O0002', 'alat', '2022-07-30', 'SUP0001', 6, 0, 1, '', '2022-07-29 23:55:12', '2022-07-29 23:55:35');

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
(2, 'PESAN0001', '2022-07-20', 'CUS0001', '0.00', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:45:28', '2022-07-20 02:45:28'),
(3, 'PESAN0001', '2022-07-20', 'CUS0001', '0.00', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:46:50', '2022-07-20 02:46:50'),
(4, 'PESAN0001', '2022-07-20', 'CUS0001', '0.00', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:48:54', '2022-07-20 02:48:54'),
(5, 'PESAN0001', '2022-07-20', 'CUS0001', '0.00', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:49:24', '2022-07-20 02:49:24'),
(6, 'PESAN0001', '2022-07-20', 'CUS0001', '0.00', '113000.00', '50000.00', '63000.00', 'File Uang Muka - PESAN0001 - 2022-07-20.pdf', '2022-07-20 02:50:14', '2022-07-20 02:50:14'),
(7, 'PESAN0002', '2022-07-20', 'CUS0001', '0.00', '67800.00', '50000.00', '17800.00', 'File Uang Muka - PESAN0002 - 2022-07-20.pdf', '2022-07-20 02:53:29', '2022-07-20 02:53:29');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hpp_detail_alat`
--
ALTER TABLE `hpp_detail_alat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengeluaran_kas`
--
ALTER TABLE `pengeluaran_kas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permintaan_pesanan`
--
ALTER TABLE `permintaan_pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `produksi_stok`
--
ALTER TABLE `produksi_stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `retur_pembelian`
--
ALTER TABLE `retur_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `terima_barang`
--
ALTER TABLE `terima_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
