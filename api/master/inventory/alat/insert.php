<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $nama = $_POST['nama'];
    $jumlah = $_POST['jumlah'];
    $harga = $_POST['harga'];
    $total_kapasitas = $_POST['total_kapasitas'];
    $bop = $_POST['bop'];
    
    $query = "INSERT INTO master_inventory_alat(kode, nama, jumlah, harga, total_kapasitas, bop) VALUES('".$kode."', '".$nama."', '".$jumlah."', '".$harga."', '".$total_kapasitas."', '".$bop."')";
    
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