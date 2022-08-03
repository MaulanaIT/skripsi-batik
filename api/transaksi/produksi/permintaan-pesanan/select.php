<?php
require_once '../../../config/connection.php';

$query = "SELECT a.*, b.nama AS nama_pesanan, c.kode AS kode_customer, c.nama AS nama_customer, b.deskripsi AS deskripsi FROM permintaan_pesanan AS a INNER JOIN estimasi_pesanan AS b ON a.kode_pesanan = b.kode INNER JOIN master_customer AS c ON b.kode_customer = c.kode WHERE b.notifikasi > 0 AND a.kode NOT IN (SELECT kode FROM produksi_pesanan)";

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
