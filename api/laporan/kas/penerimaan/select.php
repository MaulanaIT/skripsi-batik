<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $query = "SELECT * FROM (SELECT date_format(a.created_at, '%Y-%m-%d') AS tanggal, a.kode, b.nama AS nama_akun, 'Penerimaan Piutang' AS keterangan, a.terima_piutang AS nominal, a.created_at FROM terima_piutang a INNER JOIN master_akun b ON a.kode_akun = b.kode
    UNION
    SELECT a.tanggal, a.kode, b.nama AS nama_akun, 'Refund Barang' AS keterangan, a.jumlah_terima AS nominal, a.created_at FROM refund a INNER JOIN master_akun b ON a.kode_akun = b.kode
    UNION
    SELECT a.tanggal, a.kode, b.nama AS nama_akun, 'Penjualan Tunai' AS keterangan, a.total_harga AS nominal, a.created_at FROM penjualan_tunai a INNER JOIN master_akun b ON a.kode_akun = b.kode
    UNION
    SELECT a.tanggal, a.kode, b.nama AS nama_akun, 'Uang Muka Pesanan' AS keterangan, a.uang_muka AS nominal, a.created_at FROM uang_muka_pesanan a INNER JOIN master_akun b ON a.kode_akun = b.kode
    UNION
    SELECT a.tanggal, a.kode, b.nama AS nama_akun, 'Pelunasan Pesanan' AS keterangan, a.sisa AS nominal, a.created_at FROM uang_muka_pesanan a INNER JOIN master_akun b ON a.kode_akun = b.kode) c WHERE c.created_at >= '" . $tanggal_awal . "' AND c.created_at <= '" . $tanggal_akhir . "'";

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
