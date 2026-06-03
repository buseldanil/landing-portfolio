<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

$to = "kuzmenko3@gmail.com";

$name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
$phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "";
$message = isset($_POST["message"]) ? trim($_POST["message"]) : "";
$page = isset($_POST["page"]) ? trim($_POST["page"]) : "Сайт";

$name = htmlspecialchars($name, ENT_QUOTES, "UTF-8");
$phone = htmlspecialchars($phone, ENT_QUOTES, "UTF-8");
$message = htmlspecialchars($message, ENT_QUOTES, "UTF-8");
$page = htmlspecialchars($page, ENT_QUOTES, "UTF-8");

if ($name === "" || $phone === "") {
    header("Location: contacts.html?status=error");
    exit;
}

$subject = "Нова заявка з сайту адвоката";

$body = "
Нова заявка з сайту

Сторінка: {$page}

Ім'я: {$name}
Телефон: {$phone}

Повідомлення:
{$message}
";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: Website Form <no-reply@" . $_SERVER['SERVER_NAME'] . ">";
$headers[] = "Reply-To: kuzmenko3@gmail.com";

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

$redirect = isset($_SERVER["HTTP_REFERER"]) ? $_SERVER["HTTP_REFERER"] : "contacts.html";
$separator = strpos($redirect, "?") === false ? "?" : "&";

if ($sent) {
    header("Location: " . $redirect . $separator . "status=success");
    exit;
} else {
    header("Location: " . $redirect . $separator . "status=error");
    exit;
}
?>