<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $nama = $_POST['nama'];
    $tanggal = $_POST['tanggal'];
    $kode_customer = $_POST['kode_customer'];
    $jenis_produk = $_POST['jenis_produk'];
    $jumlah = $_POST['jumlah'];
    $deskripsi = $_POST['deskripsi'];
    $hpp = $_POST['hpp'];
    $profit = $_POST['profit'];
    $harga_jual = $_POST['harga_jual'];

    $query = "INSERT INTO estimasi_pesanan(kode, nama, tanggal, kode_customer, jenis_produk, jumlah, deskripsi, hpp, profit, harga_jual, status) VALUES('".$kode."', '".$nama."', '".$tanggal."', '".$kode_customer."', '".$jenis_produk."', '".$jumlah."', '".$deskripsi."', '".$hpp."', '".$profit."', '".$harga_jual."', 0)";

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
