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

if ($_GET) {
    if (isset($_GET['token']) && $_GET['token'] === json_decode($token)->data->token) {
        print $response;
    } else {
        print 'Token is not match.';
    }
} else {
    print 'Token required.';
}
?>