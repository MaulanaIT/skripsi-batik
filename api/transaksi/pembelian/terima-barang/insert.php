<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_order = $_POST['kode_order'];
    $jenis_pembelian = $_POST['jenis_pembelian'];
    $kode_supplier = $_POST['kode_supplier'];
    $total_barang = $_POST['total_barang'];
    $file_nota = $_FILES['file_nota']['tmp_name'];
    $nama_file = $_POST['nama_file'];
    
    $query = "INSERT INTO terima_barang(kode, kode_order, jenis_pembelian, kode_supplier, total_barang, file) VALUES('".$kode."', '".$kode_order."', '".$jenis_pembelian."', '".$kode_supplier."', '".$total_barang."', '".$nama_file."')";
    
    $result = $conn->query($query);

    $response = [];
    
    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];
    
        $upload_directory = $base_url . "File Nota Pembelian/";

        if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
            mkdir($upload_directory, 0777, true);
        }

        $upload_nota = move_uploaded_file($file_nota, $upload_directory . $nama_file);
        
        if ($upload_transfer) {
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