<?php
$query = "SELECT * FROM token";

$result = $conn->query($query);

$token = [];

if ($result) {
    $token['status'] = 200;
    $token['data'] = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $token['data'] = $row;
        }
    } else {
        $token['data'] = [];
    }
} else {
    $token = mysqli_error($conn);
}

$token = json_encode($token);

$headers = getAuthorizationHeader();

if (!empty($headers)) {
    if ($headers === json_decode($token)->data->token) {
        $token = true;
    } else {
        $token = false;
        return print 'Token is not match.';
    }
} else {
    $token = false;
    return print 'Token required.';
}

function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}
?>