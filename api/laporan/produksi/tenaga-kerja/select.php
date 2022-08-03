<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT a.tanggal, a.departemen, a.jumlah AS kuantitas, a.harga AS upah, a.total_harga AS total_biaya, b.nama, d.nama AS nama_produk FROM hpp_detail_tenaga_kerja a INNER JOIN master_tenagakerja b ON a.kode_tenaga_kerja = b.kode INNER JOIN hpp c ON a.kode_hpp = c.kode INNER JOIN master_inventory_produk d ON c.kode_produk = d.kode WHERE a.tanggal >= '".$tanggal_awal."' AND a.tanggal <= '".$tanggal_akhir."'";

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
