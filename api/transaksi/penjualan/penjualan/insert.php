<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $tanggal = $_POST['tanggal'];
    $kode_akun = $_POST['kode_akun'];
    $total_jual = $_POST['total_jual'];
    $diskon = $_POST['diskon'];

    $jenis_penjualan = $_POST['jenis_penjualan'];

    $query = '';

    if ($jenis_penjualan == 'tunai') {
        $kode_customer = $_POST['kode_customer'];
        $ongkos_kirim = $_POST['ongkos_kirim'];
        $total_harga = $_POST['total_harga'];
        $total_bayar = $_POST['total_bayar'];

        $query = "INSERT INTO penjualan_tunai(kode, tanggal, kode_customer, total_jual, diskon, ongkos_kirim, total_harga, total_bayar) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_customer . "', '" . $total_jual . "', '" . $diskon . "', '" . $ongkos_kirim . "', '" . $total_harga . "', '" . $total_bayar . "')";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $kode_consignee = $_POST['kode_consignee'];
        $piutang = $_POST['piutang'];

        $query = "INSERT INTO penjualan_konsinyasi(kode, tanggal, kode_consignee, total_jual, diskon, piutang) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_consignee . "', '" . $total_jual . "', '" . $diskon . "', '" . $piutang . "')";
    } else if ($jenis_penjualan == 'pesanan') {
        $kode_pesanan = $_POST['kode_pesanan'];
        $kode_customer = $_POST['kode_customer'];
        $ongkos_kirim = $_POST['ongkos_kirim'];
        $sisa = $_POST['sisa'];
        $total_harga = $_POST['total_harga'];
        $total_bayar = $_POST['total_bayar'];

        $query = "INSERT INTO penjualan_pesanan(kode, kode_pesanan, tanggal, kode_customer, total_jual, diskon, ongkos_kirim, total_harga, total_bayar, sisa) VALUES('" . $kode . "', '" . $kode_pesanan . "', '" . $tanggal . "', '" . $kode_customer . "', '" . $total_jual . "', '" . $diskon . "', '" . $ongkos_kirim . "', '" . $total_harga . "', '" . $total_bayar . "', '" . $sisa . "')";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($jenis_penjualan == 'tunai' || $jenis_penjualan == 'konsinyasi') {
            $data = json_decode($_POST['data']);

            foreach ($data as $key) {
                $query = "INSERT INTO detail_penjualan (kode, kode_item, nama_item, jumlah, harga, total_harga) VALUES('" . $key->kode . "', '" . $key->kode_item . "', '" . $key->nama_item . "', '" . $key->jumlah . "', '" . $key->harga . "', '" . $key->jumlah * $key->harga . "')";

                $result = $conn->query($query);

                if (!$result) break;
            }
        }

        if ($result) {
            if ($jenis_penjualan == 'konsinyasi') {
                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_jual . ") WHERE kode='4101'";
                $result = $conn->query($query);
    
                $query = "UPDATE master_akun SET saldo=(saldo+" . $diskon . ") WHERE kode='4201'";
                $result = $conn->query($query);
                
                $query = "UPDATE master_akun SET saldo=(saldo+" . $piutang . ") WHERE kode='1103'";
                $result = $conn->query($query);
            }

            if ($jenis_penjualan == 'tunai') {
                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_jual . ") WHERE kode='4101'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo+" . $ongkos_kirim . ") WHERE kode='4202'";
                $result = $conn->query($query);
    
                $query = "UPDATE master_akun SET saldo=(saldo+" . $diskon . ") WHERE kode='4201'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_harga . ") WHERE kode='" . $kode_akun . "'";
                $result = $conn->query($query);
            }

            if ($jenis_penjualan == 'pesanan') {
                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_bayar . ") WHERE kode='4101'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo+" . $ongkos_kirim . ") WHERE kode='4202'";
                $result = $conn->query($query);
    
                $query = "UPDATE master_akun SET saldo=(saldo+" . $diskon . ") WHERE kode='4201'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_bayar . ") WHERE kode='" . $kode_akun . "'";
                $result = $conn->query($query);
            }

            if ($result) {
                $response['data'] = $result;
            } else {
                $response['data'] = [];
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
