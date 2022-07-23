<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nama = $_POST['nama'];
    $jenis = $_POST['jenis'];
    $warna = $_POST['warna'];
    $jumlah = $_POST['jumlah'];
    $stok_minimal = $_POST['stok_minimal'];
    $hpp = $_POST['hpp'];
    $harga_jual = $_POST['harga_jual'];
    
    $query = "UPDATE master_inventory_produk SET nama='".$nama."', jenis='".$jenis."', warna='".$warna."', jumlah='".$jumlah."', stok_minimal='".$stok_minimal."', hpp='".$hpp."', harga_jual='".$harga_jual."' WHERE id='".$id."'";

    
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