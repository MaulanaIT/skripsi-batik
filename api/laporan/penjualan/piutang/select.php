<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT a.kode, a.tanggal, a.kode_consignee, b.nama AS nama_consignee, a.piutang, a.sisa FROM penjualan_konsinyasi a INNER JOIN master_consignee b ON a.kode_consignee = b.kode WHERE a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'";

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
