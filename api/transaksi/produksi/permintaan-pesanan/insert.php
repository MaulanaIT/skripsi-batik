<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_pesanan = $_POST['kode_pesanan'];
    $jumlah = $_POST['jumlah'];

    $query = "INSERT INTO permintaan_pesanan(kode, kode_pesanan, jumlah, status) VALUES('" . $kode . "', '" . $kode_pesanan . "', '" . $jumlah . "', 0)";

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
