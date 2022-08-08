<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode_alat = $_POST['kode_alat'];
    $jumlah = $_POST['jumlah'];

    $query = "UPDATE master_inventory_alat SET total_kapasitas=(total_kapasitas-".$jumlah.") WHERE kode='".$kode_alat."'";

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