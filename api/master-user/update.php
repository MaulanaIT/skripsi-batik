<?php

require_once '../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $password = $_POST['password'];
    $jabatan = $_POST['jabatan'];
    
    $query = "UPDATE master_user SET nama='".$nama."', password='".$password."', jabatan='".$jabatan."' WHERE id='".$id."'";
    
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