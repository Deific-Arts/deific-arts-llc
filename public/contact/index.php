<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$parentDir = dirname(__DIR__);

$dotenv = Dotenv\Dotenv::createImmutable($parentDir);
$dotenv->load();

$formData = json_decode(file_get_contents('php://input'), true);

$userName = $formData['user'] ?? '';
$userEmail = $formData['email'] ?? '';
$userPhone = $formData['phone'] ?? '';
$userMessage = $formData['message'] ?? '';

error_log(print_r($_ENV, true));

$htmlMessage = "
  <h3>$userName wrote the following:</h3>
  <hr />
  <article>$userMessage</article>
  <hr />
  <div>Email: $userEmail</div>
  <div>Phone: $userPhone</div>
";

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $_ENV['MAIL_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['MAIL_USER'];
    $mail->Password   = $_ENV['MAIL_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('dev@hasanirogers.me', 'Hasani Rogers');
    $mail->addAddress('dev@hasanirogers.me', 'Hasani Rogers');
    $mail->addAddress('contact@deificarts.com', 'Deific Arts LLC');

    // Content
    $mail->isHTML(true);
    $mail->Subject = "$userName is interested in Deific Arts LLC";
    $mail->Body    = $htmlMessage;
    $mail->AltBody = $userMessage;

    $mail->send();

    if ($mail->send()) {
      http_response_code(200);
      echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully.',
        'status' => 200
      ]);
    } else {
      http_response_code(400);
      echo json_encode([
        'success' => true,
        'message' => 'There was an error sending your email.',
        'status' => 400
      ]);
    }
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'An unknown error has occurred.',
    'error' => $e->getMessage()
  ]);
}
