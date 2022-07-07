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
    $file = $_FILES['file'];
    $nama_file = $_POST['nama_file'];
    
    $query = "INSERT INTO pengeluaran_kas(kode, tanggal, kode_order, kode_supplier, diskon, ongkos_kirim, total_bayar, file) VALUES('".$kode."', '".$tanggal."', '".$kode_order."', '".$kode_supplier."', '".$diskon."', '".$ongkos_kirim."', '".$total_bayar."', '".$nama_file."')";
    
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

?>