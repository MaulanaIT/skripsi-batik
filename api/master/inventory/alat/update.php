<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $jumlah = $_POST['jumlah'];
    $harga = $_POST['harga'];
    $kapasitas = $_POST['kapasitas'];
    
    $query = "UPDATE master_inventory_alat SET nama='".$nama."', jumlah='".$jumlah."', harga='".$harga."', kapasitas='".$kapasitas."' WHERE id='".$id."'";

    
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