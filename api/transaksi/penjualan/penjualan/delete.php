<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jenis_penjualan = $_POST['jenis_penjualan'];
    $kode = $_POST['kode'];

    $query = '';

    if ($jenis_penjualan == 'tunai') {
        $query = "DELETE FROM penjualan_tunai WHERE kode='".$kode."'";
    } else if ($jenis_penjualan == 'konsinyasi') {
        $query = "DELETE FROM penjualan_konsinyasi WHERE kode='".$kode."'";
    } else {
        $query = "DELETE FROM penjualan_pesanan WHERE kode='".$kode."'";
    }
    
    $result = $conn->query($query);

    $response = [];
    
    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];
    
        if ($result) {

            if ($jenis_penjualan == 'tunai' || $jenis_penjualan == 'konsinyasi') {
                $query = "DELETE FROM detail_penjualan WHERE kode='".$kode."'";
            } else {
                $query = "DELETE FROM detail_penjualan_pesanan WHERE kode='".$kode."'";
            }
            
            $result = $conn->query($query);
    
            if ($result) {
                $response['data'] = $result;
            } else {
                $response['data'] = [];
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

?>