<?php

require_once '../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $nama = $_POST['nama'];
    $satuan = $_POST['satuan'];
    $stok_minimal = $_POST['stok_minimal'];
    $jumlah = $_POST['jumlah'];
    $harga = $_POST['harga'];
    
    $query = "INSERT INTO master_inventory_bahanbaku(kode, nama, satuan, stok_minimal, jumlah, harga) VALUES('".$kode."', '".$nama."', '".$satuan."', '".$stok_minimal."', '".$jumlah."', '".$harga."')";
    
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