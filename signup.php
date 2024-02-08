<?php
$server = "localhost";
$username = "root";
$password = 123;
$db = "ikaze";

$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/JSON');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':

        $result = $conn->query("SELECT * FROM home2");
        $students = array();
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
        echo json_encode($students);
        break;
    case 'POST':

        $fname = $_POST['first_name'];
        $lname = $_POST['last_name'];
        $email = $_POST['email'];
        $pass = $_POST['password'];
        $dob = $_POST['dob'];
        $card = $_POST['card'];
        $gender = $_POST['gender'];
        $res =  $conn->query("INSERT INTO home2 (first_name, last_name, email, password, gender, dob, card) VALUES ('$fname', '$lname', '$email','$pass','$gender','$dob','$card')");

        if ($res == TRUE) {
            echo json_encode(array('status' => 'success'));
        } else {
            echo json_encode(array('error' => 'statement failed'));
        }
        break;
    case 'PUT':

        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $fname = $_PUT['first_name'];
        $lname = $_PUT['last_name'];
        $email = $_PUT['email'];
        $pass = $_PUT['password'];
        $dob = $_PUT['dob'];
        $card = $_PUT['card'];
        $gender = $_PUT['gender'];

        $conn->query("UPDATE home2 SET first_name='$fname',last_name='$lname', password='$pass', email='$email',dob='$dob',card='$card',gender='$gender' WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
    case 'DELETE':

        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];
        $conn->query("DELETE FROM  home2 WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
}
$conn->close();
