<?php
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

$email = new \SendGrid\Mail\Mail();
$email->setFrom($userEmail, $userName);
$email->setSubject("$userName is interested in Deific Arts LLC");
$email->addTo("hasani.rogers@gmail.com", "Hasani Rogers");
$email->addTo("contact@deificarts.com", "Deific Arts LLC");
$email->addContent("text/plain", $userMessage);
$email->addContent("text/html", $htmlMessage);

$sendgrid = new \SendGrid($_ENV['SENDGRID_API_KEY']);

header('Content-Type: application/json');

try {
  $response = $sendgrid->send($email);
  $statusCode = $response->statusCode();

  if ($statusCode >= 200 && $statusCode < 300) {
    echo json_encode([
      'success' => true,
      'message' => 'Email sent successfully.',
      'status' => $statusCode
    ]);
  } else {
    $errorBody = json_decode($response->body(), true);

    echo json_encode([
      'success' => false,
      'message' => $errorBody['errors'][0]['message'] ?? 'Failed to send message.',
      'status' => $statusCode
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
