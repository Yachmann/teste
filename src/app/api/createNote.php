<?php
// Cabeçalhos necessários para permitir solicitações de outras origens e definir o formato da resposta
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexão com o banco de dados
$servername = "localhost";
$username = "root"; // Altere para o usuário do seu banco de dados
$password = "Chile518";   // Altere para a senha do seu banco de dados
$dbname = "projeto_ionic"; // Altere para o nome do seu banco de dados

// Conexão usando mysqli
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Se a requisição for GET, buscamos as notas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM notes";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $notes = [];

        while ($row = $result->fetch_assoc()) {
            $notes[] = $row;  // Preenche o array de notas
        }

        echo json_encode($notes);  // Retorna o array de notas
    } else {
        echo json_encode([]);  // Retorna um array vazio se não houver notas
    }
}

// Se a requisição for POST, cria uma nova nota
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os dados JSON enviados pelo aplicativo
    $data = json_decode(file_get_contents("php://input"));

    // Valida que dados não estão vazios
    if(!empty($data->title) && !empty($data->content)) {
        $title = $conn->real_escape_string($data->title);
        $content = $conn->real_escape_string($data->content);

        // Insere a nota no banco de dados
        $sql = "INSERT INTO notes (title, content) VALUES ('$title', '$content')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["mensagem" => "Nota criada com sucesso"]);
        } else {
            echo json_encode(["erro" => "Erro ao criar a nota: " . $conn->error]);
        }
    } else {
        echo json_encode(["erro" => "Dados insuficientes para criar a nota"]);
    }
}

$conn->close();
?>
