<?php

require_once 'header.php';

// $base_url = 'http://leksana-batik.virtusrox.me/upload/';
$base_url = '/xampp/htdocs/skripsi-batik/upload/';

// $username = "u158919227_leksana_root";
// $password = "Leksana521*";
// $host = "localhost";
// $database = "u158919227_leksana_batik";

$username = "root";
$password = "";
$host = "localhost";
$database = "skripsi_batik";

$conn = mysqli_connect($host, $username, $password, $database);

if ($conn -> connect_errno) {
    echo "Failed to connect to MySQL: " . $conn -> connect_error;
    exit();
}

require_once 'token.php';
