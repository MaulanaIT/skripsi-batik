<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // $jenis_laporan = $_POST['jenis_laporan'];

    // if ($jenis_laporan == 'tanggal') {
    //     $tanggal_awal = $_POST['tanggal_awal'];
    //     $tanggal_akhir = $_POST['tanggal_akhir'];

    //     $query = "SELECT DATE_FORMAT(a.tanggal, '%Y-%m-%d') AS tanggal, '' AS keterangan, SUM(a.unit_masuk) AS unit_masuk, SUM(a.kapasitas_masuk) AS kapasitas_masuk, SUM(a.unit_keluar) AS unit_keluar, SUM(a.kapasitas_keluar) AS kapasitas_keluar, SUM(unit_masuk - unit_keluar) AS unit_saldo, SUM(kapasitas_masuk - kapasitas_keluar) AS kapasitas_saldo FROM 
    //     (SELECT b.tanggal, a.jumlah AS unit_masuk, a.total_kapasitas AS kapasitas_masuk, 0 AS unit_keluar, 0 AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo FROM detail_order_pembelian a INNER JOIN order_pembelian b ON a.kode = b.kode WHERE a.kode_item LIKE 'ALAT%'
    //     UNION ALL
    //     SELECT updated_at AS tanggal, 0 AS unit_masuk, 0 AS kapasitas_masuk, jumlah AS unit_keluar, total_kapasitas AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo from detail_retur WHERE kode_item LIKE 'ALAT%'
    //     UNION ALL
    //     SELECT updated_at AS tanggal, 0 AS unit_masuk, 0 AS kapasitas_masuk, jumlah AS unit_keluar, jumlah AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo from hpp_detail_alat) a WHERE a.tanggal >= '".$tanggal_awal."' AND a.tanggal <= '".$tanggal_akhir."'";
    // } else if ($jenis_laporan == 'alat') {
        $kode_item = $_POST['kode_item'];

        $query = "SELECT '' AS tanggal, nama, 0 AS unit_masuk, 0 AS kapasitas_masuk, 0 AS unit_keluar, 0 AS kapasitas_keluar, jumlah AS unit_saldo, total_kapasitas AS kapasitas_saldo FROM master_inventory_alat WHERE kode='".$kode_item."'";

        $resultMaster = $conn->query($query);

        $query = "SELECT DATE_FORMAT(a.tanggal, '%Y-%m-%d') AS tanggal, '' AS keterangan, SUM(a.unit_masuk) AS unit_masuk, SUM(a.kapasitas_masuk) AS kapasitas_masuk, SUM(a.unit_keluar) AS unit_keluar, SUM(a.kapasitas_keluar) AS kapasitas_keluar, SUM(unit_masuk - unit_keluar) AS unit_saldo, SUM(kapasitas_masuk - kapasitas_keluar) AS kapasitas_saldo FROM 
        (SELECT b.tanggal, a.jumlah AS unit_masuk, a.total_kapasitas AS kapasitas_masuk, 0 AS unit_keluar, 0 AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo FROM detail_order_pembelian a INNER JOIN order_pembelian b ON a.kode = b.kode WHERE a.kode_item = '".$kode_item."'
        UNION ALL
        SELECT updated_at AS tanggal, 0 AS unit_masuk, 0 AS kapasitas_masuk, jumlah AS unit_keluar, total_kapasitas AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo from detail_retur WHERE kode_item = '".$kode_item."'
        UNION ALL
        SELECT updated_at AS tanggal, 0 AS unit_masuk, 0 AS kapasitas_masuk, jumlah AS unit_keluar, jumlah AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo from hpp_detail_alat WHERE kode_alat = '".$kode_item."') a GROUP BY tanggal";
    // }

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];
        $response['master'] = [];

        if ($resultMaster->num_rows > 0) {
            while ($row = $resultMaster->fetch_assoc()) {
                $response['master'] = $row;
            }
        } else {
            $response['master'] = [];
        }

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
