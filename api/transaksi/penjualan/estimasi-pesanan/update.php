<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode_pesanan = $_POST['kode_pesanan'];
    $hpp = $_POST['hpp'];
    
    $query = "UPDATE estimasi_pesanan SET hpp='".$hpp."' WHERE kode='".$kode_pesanan."'";
    
    $result = $conn->query($query);
    
    $query = "UPDATE penjualan_pesanan SET total_hpp='".$hpp."' WHERE kode='".$kode_pesanan."'";
    
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