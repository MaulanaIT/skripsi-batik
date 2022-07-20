<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_penjualan = $_POST['jenis_penjualan'];

    $query = '';

    if ($jenis_penjualan == 'tunai') {
        $query = "SELECT * FROM penjualan_tunai";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $query = "SELECT * FROM penjualan_konsinyasi";
    } else if ($jenis_penjualan == 'pesanan') {
        $query = "SELECT * FROM penjualan_pesanan";
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
