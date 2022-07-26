<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_produksi = $_POST['jenis_produksi'];

    $query = '';

    if ($jenis_produksi == 'stok') {
        $query = "SELECT a.*, b.nama AS nama_produk, c.hpp AS hpp, SUM(c.hpp / c.jumlah) AS hpp_per_produk, c.harga_jual AS harga_jual FROM produksi_stok AS a INNER JOIN master_inventory_produk AS b ON a.kode_produk = b.kode INNER JOIN hpp AS c ON a.kode = c.kode_produksi UNION SELECT a.*, b.nama AS nama_produk, null AS hpp, null AS hpp_per_produk, null AS harga_jual FROM produksi_stok AS a INNER JOIN master_inventory_produk AS b ON a.kode_produk = b.kode WHERE a.kode NOT IN (SELECT kode_produksi FROM hpp)";
    } else if ($jenis_produksi == 'pesanan') {
        $query = "SELECT a.*, b.nama AS nama_pesanan, c.nama AS nama_customer, d.hpp AS hpp FROM produksi_pesanan AS a INNER JOIN estimasi_pesanan AS b ON a.kode_pesanan = b.kode INNER JOIN master_customer AS c ON a.kode_customer=c.kode INNER JOIN hpp AS d ON b.kode = d.kode_pesanan UNION SELECT a.*, b.nama AS nama_pesanan, c.nama AS nama_customer, null AS hpp FROM produksi_pesanan AS a INNER JOIN estimasi_pesanan AS b ON a.kode_pesanan = b.kode INNER JOIN master_customer AS c ON a.kode_customer=c.kode WHERE b.kode NOT IN (SELECT kode_pesanan FROM hpp)";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if ($row["kode"] != null) {
                    $response['data'][] = $row;
                }
            }
        } else {
            $response['data'] = [];
        }
    } else {
        $response = mysqli_error($conn);
    }

    $response = json_encode($response);

    if ($token) print $response;
}

$conn->close();
