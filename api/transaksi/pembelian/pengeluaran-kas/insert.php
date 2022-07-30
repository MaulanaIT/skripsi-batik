<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_order = $_POST['kode_order'];
    $tanggal = $_POST['tanggal'];
    $kode_supplier = $_POST['kode_supplier'];
    $diskon = $_POST['diskon'];
    $ongkos_kirim = $_POST['ongkos_kirim'];
    $total_bayar = $_POST['total_bayar'];
    $file_transfer = $_FILES['file_transfer']['tmp_name'];
    $nama_file = $_POST['nama_file'];
    $kode_akun = $_POST['kode_akun'];

    $query = "INSERT INTO pengeluaran_kas(kode, tanggal, kode_order, kode_supplier, diskon, ongkos_kirim, total_bayar, file) VALUES('" . $kode . "', '" . $tanggal . "', '" . $kode_order . "', '" . $kode_supplier . "', '" . $diskon . "', '" . $ongkos_kirim . "', '" . $total_bayar . "', '" . $nama_file . "')";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($result) {
            $upload_directory = $base_url . "File Transfer/";

            if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
                mkdir($upload_directory, 0777, true);
            }

            $upload_transfer = move_uploaded_file($file_transfer, $upload_directory . $nama_file);

            $query = "UPDATE master_akun SET saldo=(saldo-" . $total_bayar . ") WHERE kode='" . $kode_akun . "'";
            $result = $conn->query($query);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $ongkos_kirim . ") WHERE kode='5203'";
            $result = $conn->query($query);

            $query = "UPDATE master_akun SET saldo=(saldo+" . $diskon . ") WHERE kode='5201'";
            $result = $conn->query($query);

            if ($result) {
                $query = "UPDATE terima_barang SET status=1 WHERE kode_order='" . $kode_order . "'";

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
