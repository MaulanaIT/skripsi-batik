<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_order = $_POST['kode_order'];
    $jenis_pembelian = $_POST['jenis_pembelian'];
    $kode_supplier = $_POST['kode_supplier'];
        
    $total_kapasitas = $_POST['total_kapasitas'];
    $total_barang = $_POST['total_barang'];
    $file_nota = $_FILES['file_nota']['tmp_name'];
    $nama_file = $_POST['nama_file'];

    $data = json_decode($_POST['data']);
    
    $query = "INSERT INTO terima_barang(kode, kode_order, jenis_pembelian, kode_supplier, total_barang, file) VALUES('".$kode."', '".$kode_order."', '".$jenis_pembelian."', '".$kode_supplier."', '".$total_barang."', '".$nama_file."')";
    
    $result = $conn->query($query);

    $response = [];
    
    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($jenis_pembelian == 'alat') {
            foreach ($data as $key) {
                $query = "UPDATE master_inventory_alat SET jumlah=(jumlah+".$key->jumlah."), harga=(harga+".$key->total_harga."), total_kapasitas=(total_kapasitas+".$key->total_kapasitas."), bop=(harga/total_kapasitas) WHERE kode='".$key->kode_item."'";
    
                $result = $conn->query($query);
    
                if (!$result) break;
            }
        } else if ($jenis_pembelian == 'bahan') {
            foreach ($data as $key) {
                $query = "UPDATE master_inventory_bahanbaku SET harga=(((jumlah*harga)+".$key->total_harga.")/(jumlah+".$key->jumlah.")), jumlah=(jumlah+".$key->jumlah.") WHERE kode='".$key->kode_item."'";
    
                $result = $conn->query($query);
    
                if (!$result) break;
            }
        }
    
        $upload_directory = $base_url . "File Nota Pembelian/";

        if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
            mkdir($upload_directory, 0777, true);
        }

        $upload_nota = move_uploaded_file($file_nota, $upload_directory . $nama_file);
        
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
