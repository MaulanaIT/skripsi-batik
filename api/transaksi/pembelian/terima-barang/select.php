<?php
require_once '../../../config/connection.php';

$query = "SELECT nested.*, order_pembelian.kode AS kode_order
            FROM (SELECT terima_barang.*, master_supplier.nama AS nama_supplier 
                FROM terima_barang 
                INNER JOIN master_supplier 
                ON terima_barang.kode_supplier = master_supplier.kode) AS nested 
            INNER JOIN order_pembelian ON nested.kode_order = order_pembelian.kode";

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