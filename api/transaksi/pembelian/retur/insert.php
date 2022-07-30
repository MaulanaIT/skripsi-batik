<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_kas_keluar = $_POST['kode_kas_keluar'];
    $tanggal = $_POST['tanggal'];
    $kode_supplier = $_POST['kode_supplier'];
    $total_harga = $_POST['total_harga'];
    $file_nota = $_FILES['file_nota']['tmp_name'];
    $nama_file = $_POST['nama_file'];

    $jenis_retur = $_POST['jenis_retur'];
    $data = json_decode($_POST['data']);

    $query = "INSERT INTO retur_pembelian(kode, kode_kas_keluar, tanggal, kode_supplier, total_harga, status, nota) VALUES('" . $kode . "', '" . $kode_kas_keluar . "', '" . $tanggal . "', '" . $kode_supplier . "', '" . $total_harga . "', 0, '" . $nama_file . "')";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        $upload_directory = $base_url . "File Nota Retur/";

        if (!file_exists($upload_directory) && !is_dir($upload_directory)) {
            mkdir($upload_directory, 0777, true);
        }

        $upload_nota = move_uploaded_file($file_nota, $upload_directory . $nama_file);

        foreach ($data as $key) {
            $query = "INSERT INTO detail_retur (kode, kode_item, nama_item, jumlah, harga, total_harga, total_kapasitas) VALUES('" . $key->kode . "', '" . $key->kode_item . "', '" . $key->nama_item . "', '" . $key->jumlah . "', '" . $key->harga . "', '" . $key->jumlah * $key->harga . "', '" . $key->total_kapasitas . "')";

            $result = $conn->query($query);

            if (!$result) break;
        }

        if ($result) {

            if ($jenis_pembelian == 'alat') {
                foreach ($data as $key) {
                    $query = "UPDATE master_inventory_alat SET jumlah=(jumlah-".$key->jumlah."), harga=(harga-".$key->total_harga."), total_kapasitas=(total_kapasitas-".$key->total_kapasitas."), bop=(harga/total_kapasitas) WHERE kode='".$key->kode_item."'";
        
                    $result = $conn->query($query);
        
                    if (!$result) break;
                }
            } else if ($jenis_pembelian == 'bahan') {
                foreach ($data as $key) {
                    $query = "UPDATE master_inventory_bahanbaku SET harga=(((jumlah*harga)-".$key->total_harga.")/(jumlah-".$key->jumlah.")), jumlah=(jumlah-".$key->jumlah.") WHERE kode='".$key->kode_item."'";
        
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
            $response['data'] = [];
        }
    } else {
        $response = mysqli_error($conn);
    }

    $response = json_encode($response);

    if ($token) print $response;
}

$conn->close();
