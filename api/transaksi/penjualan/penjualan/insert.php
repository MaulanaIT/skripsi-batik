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
        $total_hpp = $_POST['total_hpp'];
        $total_harga = $_POST['total_harga'];
        $total_bayar = $_POST['total_bayar'];

        $query = "INSERT INTO penjualan_tunai(kode, tanggal, kode_customer, total_jual, total_hpp, diskon, ongkos_kirim, total_harga, total_bayar) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_customer . "', '" . $total_jual . "', '" . $total_hpp . "', '" . $diskon . "', '" . $ongkos_kirim . "', '" . $total_harga . "', '" . $total_bayar . "')";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $kode_consignee = $_POST['kode_consignee'];
        $total_hpp = $_POST['total_hpp'];
        $piutang = $_POST['piutang'];

        $query = "INSERT INTO penjualan_konsinyasi(kode, tanggal, kode_consignee, total_jual, total_hpp, diskon, piutang, terima_piutang, sisa) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_consignee . "', '" . $total_jual . "', '" . $total_hpp . "', '" . $diskon . "', '" . $piutang . "', 0, '" . $piutang . "')";
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

        if ($jenis_penjualan == 'tunai') {
            $file_transfer = $_FILES['file_transfer']['tmp_name'];
            $nama_file = $_POST['nama_file'];

            $upload_directory = $base_url . "File Penjualan Tunai/";
    
            if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
                mkdir($upload_directory, 0777, true);
            }
    
            $upload_nota = move_uploaded_file($file_transfer, $upload_directory . $nama_file);
        }

        if ($jenis_penjualan == 'tunai' || $jenis_penjualan == 'konsinyasi') {
            $data = json_decode($_POST['data']);

            foreach ($data as $key) {
                $query = "INSERT INTO detail_penjualan (kode, kode_item, nama_item, jumlah, harga, total_harga, hpp, total_hpp) VALUES('" . $key->kode . "', '" . $key->kode_item . "', '" . $key->nama_item . "', '" . $key->jumlah . "', '" . $key->harga . "', '" . $key->jumlah * $key->harga . "', '" . $key->hpp . "', '" . $key->total_hpp . "')";

                $result = $conn->query($query);

                if ($result) {
                    $query = "UPDATE master_inventory_produk SET jumlah=(jumlah-".$key->jumlah.") WHERE kode='".$key->kode_item."'";
    
                    $result = $conn->query($query);
                } else {
                    break;
                }
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
                
                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_hpp . ") WHERE kode='5101'";
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
                
                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_hpp . ") WHERE kode='5101'";
                $result = $conn->query($query);
            }

            if ($jenis_penjualan == 'pesanan') {
                $query = "UPDATE master_akun SET saldo=(saldo+" . $total_jual . ") WHERE kode='4101'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo+" . $ongkos_kirim . ") WHERE kode='4202'";
                $result = $conn->query($query);
    
                $query = "UPDATE master_akun SET saldo=(saldo+" . $diskon . ") WHERE kode='2101'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo-" . $total_bayar . ") WHERE kode='4201'";
                $result = $conn->query($query);

                $query = "UPDATE master_akun SET saldo=(saldo+" . $sisa . ") WHERE kode='" . $kode_akun . "'";
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
