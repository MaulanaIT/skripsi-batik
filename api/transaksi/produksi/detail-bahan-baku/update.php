<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode_bahan_baku = $_POST['kode_bahan_baku'];
    $jumlah = $_POST['jumlah'];

    $query = "UPDATE master_inventory_bahanbaku SET jumlah=(jumlah-" . $jumlah . ") WHERE kode='" . $kode_bahan_baku . "'";

    $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        $response['data'] = $result;
    } else {
        $response = mysqli_error($conn);
    }

    $response = json_encode($response);

    if ($token) print $response;
}

$conn->close();