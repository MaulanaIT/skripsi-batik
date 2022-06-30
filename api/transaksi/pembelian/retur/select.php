<?php
require_once '../../../config/connection.php';

$query = "SELECT retur_pembelian.*, SUM(detail_retur.jumlah) AS jumlah_retur, master_supplier.nama AS nama_supplier 
            FROM retur_pembelian 
            INNER JOIN master_supplier 
            ON retur_pembelian.kode_supplier = master_supplier.kode
            INNER JOIN detail_retur
            ON retur_pembelian.kode = detail_retur.kode
            GROUP BY retur_pembelian.kode";

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