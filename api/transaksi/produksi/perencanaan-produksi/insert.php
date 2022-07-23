<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $tanggal = $_POST['tanggal'];
    $jumlah = $_POST['jumlah'];
    $lama = $_POST['lama'];
    $status = $_POST['status'];
    $jenis_produksi = $_POST['jenis_produksi'];

    if ($jenis_produksi == 'pesanan') {
        $kode_pesanan = $_POST['kode_pesanan'];
        $tanggal_pesan = $_POST['tanggal_pesan'];
        $kode_customer = $_POST['kode_customer'];
        $deskripsi = $_POST['deskripsi'];
        $query = "INSERT INTO produksi_pesanan(kode, kode_pesanan, tanggal, tanggal_pesan, kode_customer, jumlah, lama, deskripsi, status) VALUES('" . $kode . "', '" . $kode_pesanan . "', '" . $tanggal . "', '" . $tanggal_pesan . "', '" . $kode_customer . "', '" . $jumlah . "', '" . $lama . "', '" . $deskripsi . "', '" . $status . "')";
    } else if ($jenis_produksi == 'stok') {
        $kode_permintaan = $_POST['kode_permintaan'];
        $kode_produk = $_POST['kode_produk'];
        $query = "INSERT INTO produksi_stok(kode, kode_permintaan, kode_produk, tanggal, jumlah, lama, status) VALUES('" . $kode . "', '" . $kode_permintaan . "', '" . $kode_produk . "', '" . $tanggal . "', '" . $jumlah . "', '" . $lama . "', '" . $status . "')";
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
