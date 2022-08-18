<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $kode_item = $_POST['kode_item'];

        $query = "SELECT '' AS tanggal, nama, 0 AS unit_masuk, 0 AS kapasitas_masuk, 0 AS unit_keluar, 0 AS kapasitas_keluar, jumlah AS unit_saldo, total_kapasitas AS kapasitas_saldo FROM master_inventory_alat WHERE kode='".$kode_item."'";

        $resultMaster = $conn->query($query);

        $query = "SELECT DATE_FORMAT(a.tanggal, '%Y-%m-%d') AS tanggal, a.keterangan, a.unit_masuk AS unit_masuk, a.kapasitas_masuk AS kapasitas_masuk, a.unit_keluar AS unit_keluar, a.kapasitas_keluar AS kapasitas_keluar, unit_masuk - unit_keluar AS unit_saldo, kapasitas_masuk - kapasitas_keluar AS kapasitas_saldo FROM 
        (SELECT b.tanggal, 'Order Pembelian Alat' AS keterangan, a.jumlah AS unit_masuk, a.total_kapasitas AS kapasitas_masuk, 0 AS unit_keluar, 0 AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo FROM detail_order_pembelian a INNER JOIN order_pembelian b ON a.kode = b.kode WHERE a.kode_item = '".$kode_item."' AND b.status = 3
        UNION ALL
        SELECT a.updated_at AS tanggal, 'Retur Pembelian Alat' AS keterangan, 0 AS unit_masuk, 0 AS kapasitas_masuk, a.jumlah AS unit_keluar, a.total_kapasitas AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo from detail_retur a INNER JOIN retur_pembelian b ON a.kode = b.kode WHERE kode_item = '".$kode_item."' AND b.status = 3
        UNION ALL
        SELECT updated_at AS tanggal, 'Produksi Pembelian Alat' AS keterangan, 0 AS unit_masuk, 0 AS kapasitas_masuk, jumlah AS unit_keluar, jumlah AS kapasitas_keluar, 0 AS unit_saldo, 0 AS kapasitas_saldo from hpp_detail_alat WHERE kode_alat = '".$kode_item."') a";

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
