<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_penjualan = $_POST['jenis_penjualan'];
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT a.kode, 'Tunai' AS jenis_jual, a.tanggal, a.kode_customer, b.nama AS nama_customer, c.kode_item, c.nama_item, c.jumlah, c.harga, c.total_harga FROM penjualan_tunai a INNER JOIN master_customer b ON a.kode_customer = b.kode INNER JOIN detail_penjualan c ON a.kode = c.kode WHERE a.kode LIKE 'JT%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'";

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
