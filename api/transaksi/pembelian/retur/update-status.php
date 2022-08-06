<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $status = $_POST['status'];
    
    $query = "UPDATE retur_pembelian SET status='".$status."' WHERE kode='".$kode."'";
    
    $result = $conn->query($query);

    $response = [];
    
    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($status == 2) {
            $data = json_decode($_POST['data']);

            foreach ($data as $key) {
                if (str_contains($key->kode_item, 'ALAT')) {
                    $query = "UPDATE master_inventory_alat SET jumlah=(jumlah-" . $key->jumlah . "), harga=(harga-" . $key->total_harga . "), total_kapasitas=(total_kapasitas-" . $key->total_kapasitas . "), bop=(harga/total_kapasitas) WHERE kode='" . $key->kode_item . "'";
                } else if (str_contains($key->kode_item, 'BB')) {
                    $query = "UPDATE master_inventory_bahanbaku SET harga=(((jumlah*harga)-" . $key->total_harga . ")/(jumlah-" . $key->jumlah . ")), jumlah=(jumlah-" . $key->jumlah . ") WHERE kode='" . $key->kode_item . "'";
                } else if  (str_contains($key->kode_item, 'BP')) {
                    $query = "UPDATE master_inventory_bahanpenolong SET harga=(((jumlah*harga)-" . $key->total_harga . ")/(jumlah-" . $key->jumlah . ")), jumlah=(jumlah-" . $key->jumlah . ") WHERE kode='" . $key->kode_item . "'";
                }
    
                $result = $conn->query($query);
    
                if (!$result) break;
            }
        }
    
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