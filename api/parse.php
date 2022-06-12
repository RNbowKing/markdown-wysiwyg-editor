<?php
/**
 * Parser pour Markdown Editor
 * @author Quentin Pugeat
 * @version 1
 * @uses Parsedown
 */

require( __DIR__."/parsedown-1.7.4/Parsedown.php");
$parser = new Parsedown();

header("Content-Type: application/json");

try {
    if(empty($_POST['cleartext'])) {
        echo json_encode([
            "status" => true,
            "message" => "Text is empty.",
            "result" => ""
        ]);
        return;
    }

    $parser->setSafeMode(true);

    echo json_encode([
        "status" => true,
        "message" => "Parsing done.",
        "result" => $parser->text($_POST['cleartext'])
    ]);
} catch(Throwable $t) {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => $t->getMessage(),
        "exception" => $t->__toString(),
        "result" => ""
    ]);
}
?>