<?php
require_once '../../../config/connection.php';

$query = "SELECT pengeluaran_kas.*, master_supplier.nama AS nama_supplier 
            FROM pengeluaran_kas 
            INNER JOIN master_supplier
            ON pengeluaran_kas.kode_supplier = master_supplier.kode";

$result = $conn->query($query);

$response = [];

if ($result) {
    $response['status'] = 200;
    $response['data'] = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
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
?>