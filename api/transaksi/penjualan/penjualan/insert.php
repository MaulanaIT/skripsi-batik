<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $tanggal = $_POST['tanggal'];
    $kode_customer = $_POST['kode_customer'];
    $kode_consignee = $_POST['kode_consignee'];
    $total_jual = $_POST['total_jual'];
    $diskon = $_POST['diskon'];
    $ongkos = $_POST['ongkos'];
    $total_harga = $_POST['total_harga'];
    $total_bayar = $_POST['total_bayar'];

    $jenis_penjualan = $_POST['jenis_penjualan'];
    $data = json_decode($_POST['data']);

    $query = '';

    if ($jenis_penjualan == 'tunai') {
        $query = "INSERT INTO penjualan_tunai(kode, tanggal, kode_customer, total_jual, diskon, ongkos total_bayar) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_customer . "', '" . $total_jual . "', '" . $diskon . "', '" . $ongkos . "', '" . $total_bayar . "')";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $query = "INSERT INTO penjualan_konsinyasi(kode, tanggal, kode_consignee, total_jual, diskon, piutang) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_consignee . "', '" . $total_jual . "', '" . $diskon . "', '" . $total_jual - $diskon . "')";
    } else {
        $query = "DELETE FROM order_pembelian WHERE kode='" . $kode . "'";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($jenis_penjualan == 'tunai' || $jenis_penjualan == 'konsinyasi') {
            foreach ($data as $key) {
                $query = "INSERT INTO detail_penjualan (kode, kode_item, nama_item, jumlah, harga, total_harga) VALUES('" . $key->kode . "', '" . $key->kode_item . "', '" . $key->nama_item . "', '" . $key->jumlah . "', '" . $key->harga . "', '" . $key->jumlah * $key->harga . "')";
    
                $result = $conn->query($query);
    
                if (!$result) break;
            }
        } else {
            return;
        }

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
