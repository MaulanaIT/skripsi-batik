<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT * FROM (SELECT date_format(created_at, '%Y-%m-%d') AS tanggal, kode, 'Penerimaan Piutang' AS keterangan, terima_piutang AS nominal, created_at FROM terima_piutang
    UNION
    SELECT tanggal, kode, 'Refund Barang' AS keterangan, jumlah_terima AS nominal, created_at FROM refund
    UNION
    SELECT tanggal, kode, 'Penjualan Tunai' AS keterangan, total_harga AS nominal, created_at FROM penjualan_tunai
    UNION
    SELECT tanggal, kode, 'Uang Muka Pesanan' AS keterangan, uang_muka AS nominal, created_at FROM uang_muka_pesanan
    UNION
    SELECT tanggal, kode, 'Penjualan Pesanan' AS keterangan, total_harga AS nominal, created_at FROM penjualan_pesanan) a WHERE a.created_at >= '" . $tanggal_awal . "' AND a.created_at <= '" . $tanggal_akhir . "'";

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
