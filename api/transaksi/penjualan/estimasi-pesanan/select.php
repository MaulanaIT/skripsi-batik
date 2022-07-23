<?php
require_once '../../../config/connection.php';

$query = "SELECT estimasi_pesanan.*, master_customer.nama AS nama_customer 
            FROM estimasi_pesanan 
            INNER JOIN master_customer 
            ON estimasi_pesanan.kode_customer = master_customer.kode";

$result = $conn->query($query);

$response = [];

if ($result) {
    $response['status'] = 200;
    $response['data'] = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response['data'][] = $row;
        }
    } else {
        $response['data'] = [];
    }
} else {
    $response = mysqli_error($conn);
}

$response = json_encode($response);

if ($token) print $response;

$conn->close();
