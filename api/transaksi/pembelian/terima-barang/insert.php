<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_order = $_POST['kode_order'];
    $jenis_pembelian = $_POST['jenis_pembelian'];
    $kode_supplier = $_POST['kode_supplier'];
    $total_barang = $_POST['total_barang'];
    
    $query = "INSERT INTO terima_barang(kode, kode_order, jenis_pembelian, kode_supplier, total_barang) VALUES('".$kode."', '".$kode_order."', '".$jenis_pembelian."', '".$kode_supplier."', '".$total_barang."')";
    
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