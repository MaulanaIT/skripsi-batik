<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_produksi = $_POST['jenis_produksi'];
    $kode_produksi = $_POST['kode_produksi'];

        $query = "SELECT a.*, b.nama AS nama_produk, c.tanggal, null AS nama_pesanan FROM hpp a INNER JOIN master_inventory_produk b ON a.kode_produk = b.kode INNER JOIN produksi_stok c ON a.kode_produksi = c.kode WHERE a.kode_produksi = '".$kode_produksi."'
        UNION
        SELECT a.*, b.nama AS nama_produk, c.tanggal, d.nama AS nama_pesanan FROM hpp a INNER JOIN master_inventory_produk b ON a.kode_produk = b.kode INNER JOIN produksi_pesanan c ON a.kode_produksi = c.kode INNER JOIN estimasi_pesanan d ON a.kode_pesanan = d.kode WHERE a.kode_produksi = '".$kode_produksi."'";

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
