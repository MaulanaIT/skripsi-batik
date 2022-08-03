<?php
require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    $penjualan = "SELECT '4101' AS kode, 'Penjualan' AS nama, 0 AS debit, SUM(a.total_jual) AS kredit FROM (SELECT SUM(total_jual) AS total_jual, updated_at FROM penjualan_tunai
    UNION ALL
    SELECT SUM(total_jual) AS total_jual, updated_at FROM penjualan_konsinyasi
    UNION ALL
    SELECT SUM(total_jual) AS total_jual, updated_at FROM penjualan_pesanan) a WHERE a.updated_at >= '" . $tanggal_awal . "' AND a.updated_at <= '" . $tanggal_akhir . "'";

    $potongan_penjualan = "SELECT '4201' AS kode, 'Potongan Penjualan' AS nama, SUM(a.diskon) AS debit, 0 AS kredit FROM (SELECT SUM(diskon) AS diskon, updated_at FROM penjualan_tunai
    UNION ALL
    SELECT SUM(diskon) AS diskon, updated_at FROM penjualan_konsinyasi
    UNION ALL
    SELECT SUM(diskon) AS diskon, updated_at FROM penjualan_pesanan) a WHERE a.updated_at >= '" . $tanggal_awal . "' AND a.updated_at <= '" . $tanggal_akhir . "'";

    $beban_angkut_penjualan = "SELECT '4202' AS kode, 'Beban Angkut Penjualan' AS nama, SUM(a.ongkos_kirim) AS debit, 0 AS kredit FROM (SELECT SUM(ongkos_kirim) AS ongkos_kirim, updated_at FROM penjualan_tunai
    UNION ALL
    SELECT SUM(ongkos_kirim) AS ongkos_kirim, updated_at FROM penjualan_pesanan) a WHERE a.updated_at >= '" . $tanggal_awal . "' AND a.updated_at <= '" . $tanggal_akhir . "'";

    $hpp = "SELECT '5101' AS kode, 'HPP' AS nama, SUM(a.total_hpp) AS debit, 0 AS kredit FROM (SELECT SUM(total_hpp) AS total_hpp, updated_at FROM penjualan_tunai
    UNION ALL
    SELECT SUM(total_hpp) AS total_hpp, updated_at FROM penjualan_konsinyasi
    UNION ALL
    SELECT SUM(hpp) AS total_hpp, updated_at FROM estimasi_pesanan) a WHERE a.updated_at >= '" . $tanggal_awal . "' AND a.updated_at <= '" . $tanggal_akhir . "'";

    $potongan_pembelian = "SELECT '5201' AS kode, 'Potongan Pembelian' AS nama, 0 AS debit, SUM(diskon) AS kredit FROM pengeluaran_kas WHERE updated_at >= '" . $tanggal_awal . "' AND updated_at <= '" . $tanggal_akhir . "'";

    $beban_angkut_pembelian = "SELECT '5203' AS kode, 'Beban Angkut Pembelian' AS nama, SUM(ongkos_kirim) AS debit, 0 AS kredit FROM pengeluaran_kas WHERE updated_at >= '" . $tanggal_awal . "' AND updated_at <= '" . $tanggal_akhir . "'";

    $query = "".$penjualan." UNION ".$potongan_penjualan." UNION ".$beban_angkut_penjualan." UNION ".$hpp." UNION ".$potongan_pembelian." UNION ".$beban_angkut_pembelian."";

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
