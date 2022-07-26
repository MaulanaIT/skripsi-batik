<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_retur = $_POST['kode_retur'];
    $tanggal = $_POST['tanggal'];
    $jumlah_terima = $_POST['jumlah_terima'];
    $file_transfer = $_FILES['file_transfer']['tmp_name'];
    $nama_file = $_POST['nama_file'];
    $kode_akun = $_POST['kode_akun'];

    $query = "INSERT INTO refund(kode, kode_retur, tanggal, jumlah_terima, file) VALUES('" . $kode . "', '" . $kode_retur . "', '" . $tanggal . "', '" . $jumlah_terima . "', '" . $nama_file . "')";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($result) {
            $upload_directory = $base_url . "File Retur/";

            if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
                mkdir($upload_directory, 0777, true);
            }

            $upload_transfer = move_uploaded_file($file_transfer, $upload_directory . $nama_file);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $jumlah_terima . ") WHERE kode='" . $kode_akun . "'";

            $result = $conn->query($query);

            if ($result) {
                $query = "UPDATE retur_pembelian SET status=3 WHERE kode='" . $kode_retur . "'";

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
            $response['data'] = [];
        }
    } else {
        $response = mysqli_error($conn);
    }

    $response = json_encode($response);

    if ($token) print $response;
}

$conn->close();
