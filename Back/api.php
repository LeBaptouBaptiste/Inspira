<?php
// Connexion à SQLite
$db = new PDO('sqlite:citations.db');

// Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Fonction pour échapper les données avant de les afficher
function escape_html($string) {
    return htmlspecialchars($string, ENT_NOQUOTES, 'UTF-8');  // Ne pas échapper les apostrophes et guillemets
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Gérer une requête GET : récupérer les citations
    $query = $db->query("
        SELECT quotes.quote, quotes.author
        FROM quotes;
    ");
    $quotes = $query->fetchAll(PDO::FETCH_ASSOC);

    // Échapper les données avant de les renvoyer au client (pour éviter XSS)
    foreach ($quotes as &$quote) {
        $quote['quote'] = escape_html($quote['quote']);
        $quote['author'] = escape_html($quote['author']);
    }
    
    echo json_encode($quotes);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Gérer une requête POST : ajouter une citation
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['quote'], $input['author'])) {
        // Nettoyer et échapper les données entrantes avant d'insérer
        $quote = htmlspecialchars($input['quote'], ENT_NOQUOTES, 'UTF-8');
        $author = htmlspecialchars($input['author'], ENT_NOQUOTES, 'UTF-8');

        // Préparer l'insertion dans la base de données
        $stmt = $db->prepare("INSERT INTO quotes (quote, author) VALUES (:quote, :author)");
        $stmt->bindParam(':quote', $quote);
        $stmt->bindParam(':author', $author);

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
