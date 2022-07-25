<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_produk = $_POST['kode_produk'];
    $hpp_per_produk = $_POST['hpp_per_produk'];
    $jumlah = $_POST['jumlah'];
    $harga_jual = $_POST['harga_jual'];
    $status = $_POST['status'];
    $jenis_produksi = $_POST['jenis_produksi'];

    if ($jenis_produksi == 'stok') {
        $query = "UPDATE produksi_stok SET status=".$status." WHERE kode='".$kode."'";
    } else if ($jenis_produksi == 'pesanan') {
        $query = "UPDATE produksi_pesanan SET status=".$status." WHERE kode='".$kode."'";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($status == 1) {
            $query = "UPDATE master_inventory_produk SET hpp_per_produk=(((hpp_per_produk*jumlah)+(".$hpp_per_produk."*".$jumlah."))/(jumlah+".$jumlah.")), jumlah=(jumlah+".$jumlah."), harga_jual='".$harga_jual."' WHERE kode='".$kode_produk."'";

            $result = $conn->query($query);
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
