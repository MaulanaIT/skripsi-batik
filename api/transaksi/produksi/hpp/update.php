<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $harga_jual = $_POST['harga_jual'];

    $query = "UPDATE hpp SET harga_jual='".$harga_jual."' WHERE kode='".$kode."'";

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
