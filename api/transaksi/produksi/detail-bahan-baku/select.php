<?php
require_once '../../../config/connection.php';

$query = "SELECT a.*, b.nama AS nama_bahan_baku FROM hpp_detail_bahan_baku a 
            INNER JOIN master_inventory_bahanbaku b ON a.kode_bahan_baku=b.kode";

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
