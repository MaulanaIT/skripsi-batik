<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT a.tanggal, a.kode, 'Pembelian Alat' AS keterangan, b.total_harga AS nominal, a.created_at FROM pengeluaran_kas a INNER JOIN order_pembelian b ON a.kode_order = b.kode WHERE b.status = 3 AND b.jenis_pembelian = 'alat' AND a.created_at >= '" . $tanggal_awal . "' AND a.created_at <= '" . $tanggal_akhir . "'
    UNION
    SELECT a.tanggal, a.kode, 'Pembelian Bahan' AS keterangan, b.total_harga AS nominal, a.created_at FROM pengeluaran_kas a INNER JOIN order_pembelian b ON a.kode_order = b.kode WHERE b.status = 3 AND b.jenis_pembelian = 'bahan' AND a.created_at >= '" . $tanggal_awal . "' AND a.created_at <= '" . $tanggal_akhir . "'";

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
}

$conn->close();
