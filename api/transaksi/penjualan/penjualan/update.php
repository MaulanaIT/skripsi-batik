<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_akun = $_POST['kode_akun'];
    $total_bayar = $_POST['total_bayar'];
    $jenis_penjualan = $_POST['jenis_penjualan'];
    
    if ($jenis_penjualan == 'pesanan') {
        $query = "UPDATE penjualan_pesanan SET total_bayar=(total_bayar + ".$total_bayar."), sisa=(sisa-".$total_bayar.") WHERE kode='".$kode."'";
    }
    
    $result = $conn->query($query);

    $response = [];
    
    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];
    
        if ($result) {
            $response['data'] = $result;
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