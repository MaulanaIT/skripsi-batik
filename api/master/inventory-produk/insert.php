<?php

require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $nama = $_POST['nama'];
    $jenis = $_POST['jenis'];
    $wrana = $_POST['wrana'];
    $stok_minimal = $_POST['stok_minimal'];
    $hpp = $_POST['hpp'];
    $harga_jual = $_POST['harga_jual'];
    
    $query = "INSERT INTO master_inventory_produk(kode, nama, jenis, wrana, stok_minimal, hpp, harga_jual) VALUES('".$kode."', '".$nama."', '".$jenis."', '".$wrana."', '".$stok_minimal."', '".$hpp."', '".$harga_jual."')";
    
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