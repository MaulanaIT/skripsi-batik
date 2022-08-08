<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode_penolong = $_POST['kode_penolong'];
    $jumlah = $_POST['jumlah'];

    $query = "UPDATE master_inventory_bahanpenolong SET jumlah=(jumlah-".$jumlah.") WHERE kode='".$kode_penolong."'";

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