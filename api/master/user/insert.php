<?php

require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $jabatan = $_POST['jabatan'];
    
    $query = "INSERT INTO master_user(username, password, jabatan) VALUES('".$username."', '".$password."', '".$jabatan."')";
    
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