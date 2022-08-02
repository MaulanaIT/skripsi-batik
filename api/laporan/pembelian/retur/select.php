<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_pembelian = $_POST['jenis_pembelian'];
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT a.kode AS kode_retur, a.tanggal AS tanggal, d.jenis_pembelian, a.kode_supplier, c.nama AS nama_supplier, a.total_harga FROM retur_pembelian a INNER JOIN pengeluaran_kas b ON a.kode_kas_keluar = b.kode INNER JOIN master_supplier c ON a.kode_supplier = c.kode INNER JOIN order_pembelian d ON b.kode_order = d.kode WHERE d.jenis_pembelian LIKE '%".$jenis_pembelian."' AND b.created_at >= '".$tanggal_awal."' AND b.created_at <= '".$tanggal_akhir."'";

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
