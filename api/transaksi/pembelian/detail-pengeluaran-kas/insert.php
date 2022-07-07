<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode($_POST['data']);

    foreach ($data as $key) {
        $query = "INSERT INTO detail_pengeluaran_kas(kode, kode_item, nama_item, jumlah, harga, total_harga) VALUES('" . $key->kode . "', '" . $key->kode_item . "', '" . $key->nama_item . "', '" . $key->jumlah . "', '" . $key->harga . "', '" . $key->jumlah * $key->harga . "')";

        $result = $conn->query($query);

        if (!$result) break;
    }

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