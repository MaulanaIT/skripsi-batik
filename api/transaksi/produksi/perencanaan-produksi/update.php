<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $jenis_produksi = $_POST['jenis_produksi'];

    if ($jenis_produksi == 'stok') {
        $query = "UPDATE produksi_stok SET status=1 WHERE kode='".$kode."'";
    } else if ($jenis_produksi == 'pesanan') {
        $query = "UPDATE produksi_pesanan SET status=1 WHERE kode='".$kode."'";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($result) {
            $response['data'] = $result;
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
