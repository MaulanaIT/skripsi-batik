<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_penjualan = $_POST['jenis_penjualan'];
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    if ($jenis_penjualan == 'tunai') {
        $query = "SELECT a.tanggal, SUM(c.total_harga) AS total_harga FROM penjualan_tunai a INNER JOIN detail_penjualan c ON a.kode = c.kode WHERE a.kode LIKE 'JT%' AND a.tanggal >= '".$tanggal_awal."' AND a.tanggal <= '".$tanggal_akhir."' GROUP BY a.tanggal";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $query = "SELECT a.tanggal, SUM(c.total_harga) AS total_harga FROM penjualan_konsinyasi a INNER JOIN detail_penjualan c ON a.kode = c.kode WHERE a.kode LIKE 'JK%' AND a.tanggal >= '".$tanggal_awal."' AND a.tanggal <= '".$tanggal_akhir."' GROUP BY a.tanggal";
    } else if ($jenis_penjualan == 'pesanan') {
        $query = "SELECT a.tanggal, SUM(c.total_harga) AS total_harga FROM penjualan_pesanan a INNER JOIN detail_penjualan c ON a.kode = c.kode WHERE a.kode LIKE 'JP%' AND a.tanggal >= '".$tanggal_awal."' AND a.tanggal <= '".$tanggal_akhir."' GROUP BY a.tanggal";
    }

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
