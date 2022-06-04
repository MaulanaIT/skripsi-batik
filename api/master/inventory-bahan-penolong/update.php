<?php

require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $satuan = $_POST['satuan'];
    $stok_minimal = $_POST['stok_minimal'];
    $jumlah = $_POST['jumlah'];
    $harga = $_POST['harga'];
    
    $query = "UPDATE master_inventory_bahanpenolong SET nama='".$nama."', satuan='".$satuan."', stok_minimal='".$stok_minimal."', jumlah='".$jumlah."', harga='".$harga."' WHERE id='".$id."'";

    
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