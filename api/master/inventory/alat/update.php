<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $jumlah = $_POST['jumlah'];
    $harga = $_POST['harga'];
    $total_kapasitas = $_POST['total_kapasitas'];
    
    $query = "UPDATE master_inventory_alat SET nama='".$nama."', jumlah='".$jumlah."', harga='".$harga."', total_kapasitas='".$total_kapasitas."', bop=".$harga / $total_kapasitas." WHERE id='".$id."'";

    
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