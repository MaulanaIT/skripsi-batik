<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];
    $kode_akun = $_POST['kode_akun'];
    $kode_jual = $_POST['kode_jual'];
    $kode_consignee = $_POST['kode_consignee'];
    $jumlah_piutang = $_POST['jumlah_piutang'];
    $sisa = $_POST['sisa'];
    $terima_piutang = $_POST['terima_piutang'];

    $query = "INSERT INTO terima_piutang(kode, kode_jual, kode_consignee, piutang, terima_piutang, sisa) VALUES('" . $kode . "', '" . $kode_jual . "', '" . $kode_consignee . "', '" . $jumlah_piutang . "', '" . $terima_piutang . "', '" . $sisa . "')";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        $query = "UPDATE penjualan_konsinyasi SET terima_piutang=(terima_piutang+" . $terima_piutang . "), sisa='" . $sisa . "' WHERE kode='" . $kode_jual . "'";

        $result = $conn->query($query);

        if ($result) {
            $query = "UPDATE master_akun SET saldo=(saldo+" . $terima_piutang . ") WHERE kode='" . $kode_akun . "'";

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
