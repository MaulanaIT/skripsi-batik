<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_produksi = $_POST['jenis_produksi'];
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    if ($jenis_produksi == 'stok') {
        $query = "SELECT tanggal, kode, jumlah, lama, if(status = 0, 'Proses', 'Selesai') AS status FROM produksi_stok WHERE created_at >= '".$tanggal_awal."' AND created_at <= '".$tanggal_akhir."'";
    } else if ($jenis_produksi == 'pesanan') {
        $query = "SELECT tanggal, kode, jumlah, lama, if(status = 0, 'Proses', 'Selesai') AS status FROM produksi_pesanan WHERE created_at >= '".$tanggal_awal."' AND created_at <= '".$tanggal_akhir."'";
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
