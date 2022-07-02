-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2022 at 12:05 PM
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
  `harga` double NOT NULL,
  `total_harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_order_pembelian`
--

INSERT INTO `detail_order_pembelian` (`id`, `kode`, `kode_item`, `nama_item`, `jumlah`, `harga`, `total_harga`, `created_at`, `updated_at`) VALUES
(10, 'O0003', 'BB0001', 'Botol', 5, 5000, 25000, '2022-06-20 13:26:01', '2022-06-20 13:26:01');

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
  `harga` double NOT NULL,
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
-- Table structure for table `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `kode_item` varchar(10) NOT NULL,
  `nama_item` varchar(50) NOT NULL,
  `jumlah` double NOT NULL,
  `harga` double NOT NULL,
  `total_harga` double NOT NULL,
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
  `harga` double NOT NULL,
  `total_harga` double NOT NULL,
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
  `harga` double NOT NULL,
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
  `hpp` double NOT NULL,
  `profit` double NOT NULL,
  `harga_jual` double NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `saldo` double NOT NULL,
  `jenis` int(11) NOT NULL COMMENT '0 = debit, 1 = kredit',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_akun`
--

INSERT INTO `master_akun` (`id`, `kode`, `nama`, `saldo`, `jenis`, `created_at`, `updated_at`) VALUES
(9, '1101', 'Kas di Tangan', 0, 0, '2022-07-02 03:35:56', '2022-07-02 03:51:51'),
(10, '1102', 'Kas Bank', 0, 0, '2022-07-02 03:36:09', '2022-07-02 03:36:09'),
(11, '1103', 'Piutang Konsinyasi', 0, 0, '2022-07-02 03:36:21', '2022-07-02 03:36:21'),
(12, '2101', 'Uang Muka Pesanan', 0, 1, '2022-07-02 03:36:48', '2022-07-02 03:36:48'),
(13, '4101', 'Penjualan', 0, 1, '2022-07-02 03:40:10', '2022-07-02 03:40:10'),
(14, '4201', 'Potongan Penjualan', 0, 0, '2022-07-02 03:40:22', '2022-07-02 03:40:22'),
(15, '4202', 'Beban Angkut Penjualan', 0, 0, '2022-07-02 03:40:32', '2022-07-02 03:40:32'),
(16, '5101', 'HPP', 0, 0, '2022-07-02 03:40:42', '2022-07-02 03:40:42'),
(17, '5201', 'Potongan Pembelian', 0, 1, '2022-07-02 03:40:51', '2022-07-02 03:40:51'),
(18, '5202', 'Retur Pembelian', 0, 1, '2022-07-02 03:41:06', '2022-07-02 03:41:06'),
(19, '5203', 'Beban Angkut Pembelian', 0, 0, '2022-07-02 03:41:15', '2022-07-02 03:41:15');

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
  `harga` double NOT NULL,
  `kapasitas` int(11) NOT NULL,
  `total_kapasitas` int(11) NOT NULL,
  `bop` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_alat`
--

INSERT INTO `master_inventory_alat` (`id`, `kode`, `nama`, `jumlah`, `harga`, `kapasitas`, `total_kapasitas`, `bop`, `created_at`, `updated_at`) VALUES
(1, 'ALAT0001', 'Sendok', 100, 2000, 10, 0, 0, '2022-06-20 12:33:58', '2022-06-20 12:33:58');

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
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_bahanbaku`
--

INSERT INTO `master_inventory_bahanbaku` (`id`, `kode`, `nama`, `satuan`, `stok_minimal`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(1, 'BB0001', 'Botol', 'Buah', 0, 100, 5000, '2022-06-05 03:51:14', '2022-06-05 03:51:14');

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
  `harga` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `hpp` double NOT NULL,
  `harga_jual` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `master_inventory_produk`
--

INSERT INTO `master_inventory_produk` (`id`, `kode`, `nama`, `jenis`, `warna`, `jumlah`, `stok_minimal`, `hpp`, `harga_jual`, `created_at`, `updated_at`) VALUES
(1, 'PROD0001', 'Produk 1', 'Cair', 'Bening', 100, 10, 5000, 5500, '2022-06-22 04:39:34', '2022-06-22 04:39:34');

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
  `upah` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(3, 'Admin', '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2', 'Owner', '2022-07-02 07:41:20', '2022-07-02 07:41:20');

-- --------------------------------------------------------

--
-- Table structure for table `order_pembelian`
--

CREATE TABLE `order_pembelian` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_supplier` varchar(10) NOT NULL,
  `total_harga` double NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_pembelian`
--

INSERT INTO `order_pembelian` (`id`, `kode`, `tanggal`, `kode_supplier`, `total_harga`, `status`, `created_at`, `updated_at`) VALUES
(11, 'O0001', '2022-06-05', 'SUP0001', 0, 'Menunggu', '2022-06-05 08:36:27', '2022-06-05 09:23:22'),
(13, 'O0002', '2022-06-05', 'SUP0001', 0, 'Menunggu', '2022-06-05 08:46:07', '2022-06-05 09:23:26'),
(20, 'O0003', '2022-06-20', 'SUP0001', 25000, '0', '2022-06-20 13:26:01', '2022-06-20 13:26:01');

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
  `diskon` double NOT NULL,
  `biaya_kirim` double NOT NULL,
  `total_bayar` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `penjualan_konsinyasi`
--

CREATE TABLE `penjualan_konsinyasi` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `kode_consignee` varchar(10) NOT NULL,
  `total_jual` double NOT NULL,
  `diskon` double NOT NULL,
  `piutang` double NOT NULL,
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
  `total_jual` double NOT NULL,
  `biaya_kirim` double NOT NULL,
  `uang_muka` double NOT NULL,
  `diskon` double NOT NULL,
  `total_bayar` double NOT NULL,
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
  `total_jual` double NOT NULL,
  `diskon` double NOT NULL,
  `ongkos_kirim` double NOT NULL,
  `total_harga` double NOT NULL,
  `total_bayar` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `piutang`
--

CREATE TABLE `piutang` (
  `id` int(11) NOT NULL,
  `kode_jual` varchar(10) NOT NULL,
  `kode_customer` varchar(10) NOT NULL,
  `piutang` double NOT NULL,
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
  `tanggal` date NOT NULL,
  `nota` varchar(50) NOT NULL,
  `kode_supplier` varchar(20) NOT NULL,
  `total_harga` double NOT NULL,
  `status` varchar(20) NOT NULL,
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
  `tanggal` date NOT NULL,
  `kode_supplier` varchar(10) NOT NULL,
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
-- Indexes for table `piutang`
--
ALTER TABLE `piutang`
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
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_order_pembelian`
--
ALTER TABLE `detail_order_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_user`
--
ALTER TABLE `master_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_pembelian`
--
ALTER TABLE `order_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `piutang`
--
ALTER TABLE `piutang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `retur_pembelian`
--
ALTER TABLE `retur_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `terima_barang`
--
ALTER TABLE `terima_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
