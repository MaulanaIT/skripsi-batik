<?php

require_once '../../../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $kode = $_POST['kode'];

    $query = "SELECT * FROM detail_retur WHERE kode = '" . $kode . "'";

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
