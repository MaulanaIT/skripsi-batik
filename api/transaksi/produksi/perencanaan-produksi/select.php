<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_produksi = $_POST['jenis_produksi'];

    $query = '';

    if ($jenis_produksi == 'stok') {
        $query = "SELECT a.*, b.nama AS nama_produk, c.hpp AS hpp, SUM(c.hpp / c.jumlah) AS hpp_per_produk, c.harga_jual AS harga_jual FROM produksi_stok AS a INNER JOIN master_inventory_produk AS b ON a.kode_produk = b.kode LEFT JOIN hpp c ON a.kode = c.kode_produksi";
    } else if ($jenis_produksi == 'pesanan') {
        $query = "SELECT a.*, b.nama AS nama_pesanan, c.nama AS nama_customer FROM produksi_pesanan AS a INNER JOIN estimasi_pesanan AS b ON a.kode_pesanan = b.kode INNER JOIN master_customer AS c ON a.kode_customer=c.kode";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response['data'][] = $row;
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
