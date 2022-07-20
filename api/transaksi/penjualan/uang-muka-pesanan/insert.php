<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $tanggal = $_POST['tanggal'];
    $kode_customer = $_POST['kode_customer'];
    $total_jual = $_POST['total_jual'];
    $uang_muka = $_POST['uang_muka'];
    $sisa = $_POST['sisa'];
    $file_transfer = $_FILES['file_transfer']['tmp_name'];
    $nama_file = $_POST['nama_file'];

    $query = "INSERT INTO uang_muka_pesanan(kode, tanggal, kode_customer, total_jual, uang_muka, sisa, file) VALUES('".$kode."', '".$tanggal."', '".$kode_customer."', '".$total_jual."', '".$uang_muka."', '".$sisa."', '" . $nama_file . "')";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];
    
        $upload_directory = $base_url . "File Uang Muka/";

        if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
            mkdir($upload_directory, 0777, true);
        }

        $upload_nota = move_uploaded_file($file_transfer, $upload_directory . $nama_file);

        if ($upload_nota) {
            $query = "UPDATE estimasi_pesanan SET status = 1 WHERE kode='".$kode."'";
        
            $result = $conn->query($query);

            if ($result) {
                $query = "UPDATE master_akun SET saldo=(saldo+" . $uang_muka . ") WHERE kode='" . $kode_akun . "'";
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
