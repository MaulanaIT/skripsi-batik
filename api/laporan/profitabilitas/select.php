<?php
require_once '../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tanggal = $_POST['tanggal'];

    $query = "SELECT * FROM (SELECT kode, nama, saldo AS debit, 0 AS kredit, created_at, updated_at FROM master_akun WHERE jenis = 0
                UNION
                SELECT kode, nama, 0 AS debit, saldo AS kredit, created_at, updated_at FROM master_akun WHERE jenis = 1) a WHERE a.updated_at <= '".$tanggal."' ORDER BY a.kode";

    $result = $conn->query($query);

    $response = [];

    if ($result) {
        $response['status'] = 200;
        $response['data'] = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response['data'][] = $row;
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
