<?php
require_once '../../../config/connection.php';

$query = "SELECT a.*, b.nama AS nama_tenaga_kerja FROM hpp_detail_tenaga_kerja a 
INNER JOIN master_tenagakerja b ON a.kode_tenaga_kerja=b.kode";

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
