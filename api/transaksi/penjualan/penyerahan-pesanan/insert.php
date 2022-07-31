<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_akun = $_POST['kode_akun'];
    $sisa = $_POST['sisa'];
    $jenis_penjualan = $_POST['jenis_penjualan'];
    $file_transfer = $_FILES['file_transfer']['tmp_name'];
    $nama_file = $_POST['nama_file'];

    if ($jenis_penjualan == 'pesanan') {
        $query = "UPDATE penjualan_pesanan SET total_bayar=(total_bayar + " . $sisa . "), sisa=(sisa-" . $sisa . ") WHERE kode='" . $kode . "'";
    }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        $upload_directory = $base_url . "File Penyerahan Pesanan/";

        if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
            mkdir($upload_directory, 0777, true);
        }

        $upload_nota = move_uploaded_file($file_transfer, $upload_directory . $nama_file);

        $query = "UPDATE estimasi_pesanan SET status = 2 WHERE kode=(SELECT kode_pesanan FROM penjualan_pesanan WHERE kode='" . $kode . "')";

        $result = $conn->query($query);

        if ($result) {
            $query = "UPDATE master_akun SET saldo=(saldo+" . $uang_muka . ") WHERE kode='4101'";
            $result = $conn->query($query);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $ongkos_kirim . ") WHERE kode='4202'";
            $result = $conn->query($query);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $diskon . ") WHERE kode='4201'";
            $result = $conn->query($query);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $sisa . ") WHERE kode='" . $kode_akun . "'";
            $result = $conn->query($query);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $total_hpp . ") WHERE kode='5101'";
            $result = $conn->query($query);
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
