<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_hpp = $_POST['kode_hpp'];
    $kode_produksi = $_POST['kode_produksi'];
    $kode_permintaan = $_POST['kode_permintaan'];
    $tanggal = $_POST['tanggal'];
    
    $data = json_decode($_POST['data']);

    foreach ($data as $key) {
        $query = "INSERT INTO hpp_detail_tenaga_kerja(kode, kode_hpp, kode_produksi, kode_tenaga_kerja, departemen, tanggal, harga, jumlah, total_harga) VALUES('" . $kode . "', '" . $kode_hpp . "', '" . $kode_produksi . "', '" . $key->kode_tenaga_kerja . "', '" . $key->departemen . "', '" . $tanggal . "', '" . $key->harga . "', '" . $key->jumlah . "', '" . $key->total_harga . "')
        ON DUPLICATE KEY UPDATE
        jumlah='".$key->jumlah."', total_harga='".$key->total_harga."'";

        $result = $conn->query($query);

        if (!$result) break;
    }

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