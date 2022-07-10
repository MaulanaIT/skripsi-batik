<?php

require_once 'header.php';

$base_url = 'http://leksana-batik.virtusrox.me/';

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
