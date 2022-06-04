<?php

require_once '../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $departemen = $_POST['departemen'];
    $telepon = $_POST['telepon'];
    $upah = $_POST['upah'];
    
    $query = "UPDATE master_tenagakerja SET nama='".$nama."', departemen='".$departemen."', telepon='".$telepon."', upah='".$upah."' WHERE id='".$id."'";
    
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