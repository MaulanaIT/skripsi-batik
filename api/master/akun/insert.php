<?php

require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $nama = $_POST['nama'];
    $saldo = $_POST['saldo'];
    $jenis = $_POST['jenis'];

    $query;
    
    if ($jenis == 'debit') {
        $query = "INSERT INTO master_akun(kode, nama, saldo, jenis) VALUES('".$kode."', '".$nama."', '".$saldo."', 0)";
    } else if ($jenis == 'kredit') {
        $query = "INSERT INTO master_akun(kode, nama, saldo, jenis) VALUES('".$kode."', '".$nama."', '".$saldo."', 1)";
    }
    
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