<?php

require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    $telepon = $_POST['telepon'];
    $rekening = $_POST['rekening'];
    
    $query = "UPDATE master_supplier SET nama='".$nama."', alamat='".$alamat."', telepon='".$telepon."', rekening='".$rekening."' WHERE id='".$id."'";
    
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