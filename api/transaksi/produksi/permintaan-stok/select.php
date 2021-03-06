<?php
require_once '../../../config/connection.php';

$query = "SELECT a.*, b.nama AS nama_produk FROM permintaan_stok AS a INNER JOIN master_inventory_produk AS b ON a.kode_produk = b.kode WHERE a.kode NOT IN (SELECT kode_permintaan FROM produksi_stok)";

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
