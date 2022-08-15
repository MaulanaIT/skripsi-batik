<?php
require_once '../../../config/connection.php';

$query = "SELECT retur_pembelian.*, order_pembelian.kode AS kode_order, SUM(detail_retur.jumlah) AS jumlah_retur, master_supplier.nama AS nama_supplier, master_supplier.alamat AS alamat_supplier
            FROM retur_pembelian 
            INNER JOIN master_supplier 
            ON retur_pembelian.kode_supplier = master_supplier.kode
            INNER JOIN detail_retur
            ON retur_pembelian.kode = detail_retur.kode
            INNER JOIN pengeluaran_kas
            ON retur_pembelian.kode_kas_keluar = pengeluaran_kas.kode
            INNER JOIN order_pembelian
            ON pengeluaran_kas.kode_order = order_pembelian.kode
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