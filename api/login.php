<?php

require_once './config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT jabatan FROM master_user WHERE username='".$username."' AND password='".$password."'";
    
    $result = $conn->query($query);

    $response = [];
    
    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];
    
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $response['data'] = [
                    'data' => $row,
                    'status' => true
                ];
            }
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
