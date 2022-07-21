<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_produksi = $_POST['jenis_produksi'];

    $query = '';

    if ($jenis_produksi == 'stok') {
        $query = "SELECT * FROM produksi_stok";
    } else if ($jenis_produksi == 'pesanan') {
        $query = "SELECT * FROM produksi_pesanan";
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
