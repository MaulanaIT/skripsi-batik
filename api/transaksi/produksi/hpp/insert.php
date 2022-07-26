<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_produksi = $_POST['kode_produksi'];
    $kode_permintaan = $_POST['kode_permintaan'];
    $tanggal_mulai = $_POST['tanggal_mulai'];
    $tanggal_selesai = $_POST['tanggal_selesai'];
    $biaya_bahan_baku = $_POST['biaya_bahan_baku'];
    $biaya_tenaga_kerja = $_POST['biaya_tenaga_kerja'];
    $biaya_overhead_pabrik = $_POST['biaya_overhead_pabrik'];
    $jumlah = $_POST['jumlah'];
    $hpp = $_POST['hpp'];

    if (str_contains($kode_produksi, 'PS')) {
        $kode_produk = $_POST['kode_produk'];

        $query = "INSERT INTO hpp(kode, kode_produk, kode_produksi, kode_permintaan, tanggal_mulai, tanggal_selesai, biaya_bahan_baku, biaya_tenaga_kerja, biaya_overhead_pabrik, jumlah, hpp) 
                VALUES('" . $kode . "', '" . $kode_produk . "', '" . $kode_produksi . "', '" . $kode_permintaan . "', '" . $tanggal_mulai . "', '" . $tanggal_selesai . "', '" . $biaya_bahan_baku . "', '" . $biaya_tenaga_kerja . "', '" . $biaya_overhead_pabrik . "', '" . $jumlah . "', '" . $hpp . "')
            ON DUPLICATE KEY UPDATE
            biaya_bahan_baku='" . $biaya_bahan_baku . "', biaya_tenaga_kerja='" . $biaya_tenaga_kerja . "', biaya_overhead_pabrik='" . $biaya_overhead_pabrik . "', hpp='" . $hpp . "'";
    } else if (str_contains($kode_produksi, 'PP')) {
        $kode_pesanan = $_POST['kode_pesanan'];
        $kode_customer = $_POST['kode_customer'];

        $query = "INSERT INTO hpp(kode, kode_pesanan, kode_customer, kode_produksi, kode_permintaan, tanggal_mulai, tanggal_selesai, biaya_bahan_baku, biaya_tenaga_kerja, biaya_overhead_pabrik, jumlah, hpp) 
                VALUES('" . $kode . "', '" . $kode_pesanan . "', '" . $kode_customer . "', '" . $kode_produksi . "', '" . $kode_permintaan . "', '" . $tanggal_mulai . "', '" . $tanggal_selesai . "', '" . $biaya_bahan_baku . "', '" . $biaya_tenaga_kerja . "', '" . $biaya_overhead_pabrik . "', '" . $jumlah . "', '" . $hpp . "')
            ON DUPLICATE KEY UPDATE
            biaya_bahan_baku='" . $biaya_bahan_baku . "', biaya_tenaga_kerja='" . $biaya_tenaga_kerja . "', biaya_overhead_pabrik='" . $biaya_overhead_pabrik . "', hpp='" . $hpp . "'";
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
