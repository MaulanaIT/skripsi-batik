<?php
require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_penjualan = $_POST['jenis_penjualan'];
    $tanggal_awal = $_POST['tanggal_awal'];
    $tanggal_akhir = $_POST['tanggal_akhir'];

    if ($jenis_penjualan == 'semua') {
        $query = "SELECT a.kode, a.total_jual, a.diskon, a.ongkos_kirim, a.total_harga, a.total_bayar, 'Tunai' AS jenis_jual, a.tanggal, a.kode_customer, b.nama AS nama_customer, null AS kode_consignee, null AS nama_consignee, c.kode_item, c.nama_item, c.jumlah, c.harga, c.total_harga 
        FROM penjualan_tunai a 
        INNER JOIN master_customer b 
        ON a.kode_customer = b.kode 
        INNER JOIN detail_penjualan c 
        ON a.kode = c.kode 
        WHERE a.kode LIKE 'JT%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'
        UNION ALL
        SELECT a.kode, a.total_jual, a.diskon, null AS ongkos_kirim, null AS total_harga, null AS total_bayar, 'Konsinyasi' AS jenis_jual, a.tanggal, null AS kode_customer, null AS nama_customer, a.kode_consignee, b.nama AS nama_consignee, c.kode_item, c.nama_item, c.jumlah, c.harga, c.total_harga FROM penjualan_konsinyasi a INNER JOIN master_consignee b ON a.kode_consignee = b.kode INNER JOIN detail_penjualan c ON a.kode = c.kode WHERE a.kode LIKE 'JK%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'
        UNION ALL
        SELECT a.kode, a.total_jual, a.diskon, a.ongkos_kirim, a.total_harga, a.total_bayar, 'Pesanan' AS jenis_jual, a.tanggal, a.kode_customer, b.nama AS nama_customer, null AS kode_consignee, null AS nama_consignee, c.kode, c.nama, c.jumlah, a.total_harga/c.jumlah as harga, a.total_harga FROM penjualan_pesanan a INNER JOIN master_customer b ON a.kode_customer = b.kode INNER JOIN estimasi_pesanan c ON a.kode_pesanan = c.kode WHERE a.kode LIKE 'JP%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'";
    } else if ($jenis_penjualan == 'tunai') {
        $query = "SELECT a.kode, a.total_jual, a.diskon, a.ongkos_kirim, a.total_harga, a.total_bayar, 'Tunai' AS jenis_jual, a.tanggal, a.kode_customer, b.nama AS nama_customer, c.kode_item, c.nama_item, c.jumlah, c.harga, c.total_harga 
        FROM penjualan_tunai a 
        INNER JOIN master_customer b 
        ON a.kode_customer = b.kode 
        INNER JOIN detail_penjualan c 
        ON a.kode = c.kode 
        WHERE a.kode LIKE 'JT%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $query = "SELECT a.kode, a.total_jual, a.diskon, null AS ongkos_kirim, null AS total_harga, null AS total_bayar, 'Konsinyasi' AS jenis_jual, a.tanggal, a.kode_consignee, b.nama AS nama_consignee, c.kode_item, c.nama_item, c.jumlah, c.harga, c.total_harga 
        FROM penjualan_konsinyasi a 
        INNER JOIN master_consignee b 
        ON a.kode_consignee = b.kode 
        INNER JOIN detail_penjualan c 
        ON a.kode = c.kode 
        WHERE a.kode LIKE 'JK%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'";
    } else if ($jenis_penjualan == 'pesanan') {
        $query = "SELECT a.kode, a.total_jual, a.diskon, a.ongkos_kirim, a.total_harga, a.total_bayar, 'Pesanan' AS jenis_jual, a.tanggal, a.kode_customer, b.nama AS nama_customer, c.kode, c.nama, c.jumlah, a.total_harga/c.jumlah as harga, a.total_harga 
        FROM penjualan_pesanan a 
        INNER JOIN master_customer b 
        ON a.kode_customer = b.kode 
        INNER JOIN estimasi_pesanan c 
        ON a.kode_pesanan = c.kode 
        WHERE a.kode LIKE 'JP%' AND a.created_at >= '".$tanggal_awal."' AND a.created_at <= '".$tanggal_akhir."'";
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
