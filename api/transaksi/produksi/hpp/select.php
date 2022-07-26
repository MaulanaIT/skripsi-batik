<?php
require_once '../../../config/connection.php';

$query = "SELECT a.*, b.nama AS nama_produk, null AS nama_pesanan, null AS nama_customer FROM hpp AS a INNER JOIN master_inventory_produk b ON a.kode_produk = b.kode UNION SELECT c.*, null AS nama_produk, d.nama AS nama_pesanan, e.nama AS nama_customer FROM hpp c INNER JOIN estimasi_pesanan d ON c.kode_pesanan = d.kode INNER JOIN master_customer e ON d.kode_customer = e.kode WHERE kode_produk=''";

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

$conn->close();
