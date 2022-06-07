<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $tanggal = $_POST['tanggal'];
    $kode_supplier = $_POST['kode_supplier'];
    $total_harga = $_POST['total_harga'];

    $jenis_pembelian = $_POST['jenis_pembelian'];
    $data = json_decode($_POST['data']);

    $query = "INSERT INTO order_pembelian(kode, tanggal, kode_supplier, total_harga, status) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_supplier . "', '" . $total_harga . "', 0)";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        /* if ($jenis_pembelian == 'alat') {
            foreach ($data as $key) {
                $query = "INSERT INTO detail_order_pembelian_alat(kode, kode_alat, kuantitas, harga) VALUES('" . $key->kode . "', '" . $key->kode_alat . "', '" . $key->jumlah . "', '" . $key->harga . "')";
            
                $result = $conn->query($query);

                if (!$result) break;
            }
        } else if ($jenis_pembelian == 'bahan') {
            foreach ($data as $key) {
                $query = "INSERT INTO detail_order_pembelian_bahanbaku(kode, kode_bahanbaku, kuantitas, harga) VALUES('" . $key->kode . "', '" . $key->kode_bahan . "', '" . $key->jumlah . "', '" . $key->harga . "')";
            
                $result = $conn->query($query);

                if (!$result) break;
            }
        } */
        
        foreach ($data as $key) {
            $query = "INSERT INTO detail_order_pembelian (kode, kode_item, nama_item, jumlah, harga) VALUES('" . $key->kode . "', '" . $key->kode_item . "', '" . $key->nama_item . "', '" . $key->jumlah . "', '" . $key->harga . "')";
        
            $result = $conn->query($query);

            if (!$result) break;
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
