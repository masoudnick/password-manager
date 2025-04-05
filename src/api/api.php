<?php
require_once "db.php";


// Encrypt and decrypt functions   
function encryptPassword($password, $key): string
{
    $iv = openssl_random_pseudo_bytes(16);
    $encrypted = openssl_encrypt($password, 'AES-256-CBC', $key, 0, $iv);
    return base64_encode($iv . $encrypted);
}

function decryptPassword($password, $key): string
{
    $data = base64_decode($password);
    $iv = substr($data, 0, 16);
    $encrypted = substr($data, 16);
    return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
}

// function downloadSiteIcon($site): void
// {
//     $host = preg_replace('/^www\./', '', $site);
//     $icon_path = "icons/$host.ico";
//     $isIconExist = file_exists($icon_path);
//     if (!$isIconExist) {
//         $response = file_get_contents("https://favicone.com/.$domain.?s=32&json");
//         if ($response["hasIcon"]) {
//             $icon = file_get_contents($response["icon"]);
//             file_put_contents($icon_path, $icon);
//         }
//     }
// }

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $master_key = getenv('MASTER_KEY');
        $result = $conn->query(isset($_GET['id']) ? "SELECT id, site, username, password FROM passwords WHERE id = " . $_GET['id'] . " AND status = 1" : "SELECT id, site, username, password From passwords WHERE status = 1");
        $passwords = [];
        while ($row = $result->fetch_assoc()) {
            $decriptedPassword =  decryptPassword($row['password'], $master_key);
            $passwords[] = ['id' => $row["id"], 'site' => $row["site"], 'username' => $row["username"], 'password' => $decriptedPassword];
        }
        echo json_encode(["status" => 200, "data" => $passwords]);
        break;

    case 'POST':
        $master_key = getenv('MASTER_KEY');
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO $tableName (site, username, password) VALUES (?, ?, ?)");
        $encryptedPassword =  encryptPassword($data['password'], $master_key);
        $stmt->bind_param("sss", $data['site'], $data['username'], $encryptedPassword);
        $stmt->execute();
        echo json_encode(["status" => 200, "message" => "Password added successfully"]);
        break;

    case 'PUT': 
        $master_key = getenv('MASTER_KEY');
        $data = json_decode(file_get_contents("php://input"), true);
        $encryptedPassword =  encryptPassword($data['password'], $master_key);
        $stmt = $conn->prepare("UPDATE passwords SET username=?, password=? WHERE id=?");
        $stmt->bind_param("ssi", $data['username'], $encryptedPassword, $_GET['id']);
        $stmt->execute();
        echo json_encode(["success" => 200, "message" => "Password updated successfully"]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("UPDATE passwords SET status=0 WHERE id=?");
        $stmt->bind_param("i", $_GET['id']);
        $stmt->execute();
        echo json_encode(["success" => 200, "message" => "Password deleted successfully"]);
        break;
}
