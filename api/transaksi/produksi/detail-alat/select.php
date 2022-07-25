<?php
require_once '../../../config/connection.php';

$query = "SELECT a.*, b.nama AS nama_alat FROM hpp_detail_alat a 
INNER JOIN master_inventory_alat b ON a.kode_alat=b.kode";

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
