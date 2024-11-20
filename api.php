<?php
// Connexion à SQLite
$db = new PDO('sqlite:Database/citations.db');

// Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Gérer une requête GET : récupérer les citations
    $query = $db->query("
        SELECT quotes.text, authors.name AS author 
        FROM quotes 
        INNER JOIN authors ON quotes.author_id = authors.id
    ");
    $quotes = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($quotes);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Gérer une requête POST : ajouter une citation
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['text'], $input['author_id'])) {
        $text = $input['text'];
        $author_id = $input['author_id'];

        $stmt = $db->prepare("INSERT INTO quotes (text, author_id) VALUES (:text, :author_id)");
        $stmt->bindParam(':text', $text);
        $stmt->bindParam(':author_id', $author_id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Citation ajoutée avec succès!"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Une erreur s'est produite."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Données invalides."]);
    }
}
?>
