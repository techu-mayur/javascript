<?php
require 'mailer/Exception.php';
require 'mailer/OAuthTokenProvider.php';
require 'mailer/OAuth.php';
require 'mailer/PHPMailer.php';
require 'mailer/POP3.php';
require 'mailer/SMTP.php';
$email = isset($_POST['loginEmail']) ? $_POST['loginEmail'] : '';
$pwd = isset($_POST['loginPassword']) ? $_POST['loginPassword'] : '';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'techumayur@gmail.com';
$mail->Password = 'ykhpeyotgaxpqkqc';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;
$mail->setFrom('techumayur@gmail.com', 'Techu Mayur');
$mail->addReplyTo('techumayur@gmail.com', 'Techu Mayur');
$mail->addAddress('techumayur@gmail.com', 'Techu Mayur');
$mail->Subject = 'Techu Mayur - Form Validation';
$mail->isHTML(true);
$body_message = '
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
    <head>
        <title>Techu Mayur</title>
<!-- [if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}      </style>      <![endif]-->
<!-- [if gte mso 9]>
<style>sup { font-size: 100% !important; }</style>      <![endif]-->
<!-- [if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style type="text/css">
body{font-family:"Open Sans" , sans-serif ;}
         #outlook a {         padding:0;         }         .ExternalClass {         width:100%;         }         .ExternalClass,         .ExternalClass p,         .ExternalClass span,         .ExternalClass font,         .ExternalClass td,         .ExternalClass div {         line-height:100%;         }         .es-button {         mso-style-priority:100!important;         text-decoration:none!important;         }         a[x-apple-data-detectors] {         color:inherit!important;         text-decoration:none!important;         font-size:inherit!important;         font-family:inherit!important;         font-weight:inherit!important;         line-height:inherit!important;         }         .es-desk-hidden {         display:none;         float:left;         overflow:hidden;         width:0;         max-height:0;         line-height:0;         mso-hide:all;         }      </style>
         </head>
     <body>
<div class="es-wrapper-color" style="background-color: #f6f6f6;"><!-- [if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; padding: 0; margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr class="gmail-fix" style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 600px;" border="0" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; line-height: 1px; min-width: 600px;" height="0"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; max-height: 0px; min-height: 0px; min-width: 600px; width: 600px;" src="https://esputnik.com/repository/applications/images/blank.gif" alt="" width="600" height="1" /></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;" valign="top">
<table class="es-content" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%;" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;" align="center">
<table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 600px; border: 2px solid #0b666a;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 556px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; font-size: 0px;" align="center"><img class="adapt-img" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="https://www.techumayur.in/wp-content/uploads/2022/10/logo.png" alt="" /></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 556px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 20px; margin: 0;" align="left">
<p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size: 25px;  line-height: 40px; color: #5d5858;"><strong>Dear Admin</strong></p>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="margin: 0; padding: 20px 20px 35px 20px;" align="left">
<p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size:25px;  line-height: 30px; color: #333333;">You have received the following enquiry</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 556px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; border: 2px solid #0b666a;" role="presentation" border="0" width="100%" cellspacing="2" cellpadding="3">
<tbody>

<tr style="border-collapse: collapse;">
<td style="padding: 20px; margin: 0; border: 2px solid #0b666a;"><strong>Email ID:</strong></td>
<td style="padding: 20px; margin: 0; border: 2px solid #0b666a; line-height: 0.1;"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly;  font-size: 14px; text-decoration: none; color: #5d5858;" href="mailto:' . $email . '" target="_blank" rel="noopener">
' . $email . '</a></td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 20px; margin: 0; border: 2px solid #0b666a;"><strong>Phone Number:</strong></td>
<td style="padding: 20px; margin: 0; border: 2px solid #0b666a;">' . $pwd . '</td>
</tr>

</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 40px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 596px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;" align="right" bgcolor="#0b666a">
<p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size: 20px; padding:10px 20px;  line-height:28px; color: #fff;"><strong>Powered By Techu Mayur</strong></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</body>
</html>
';
$mail->Body = $body_message;
// Auto Responder
$mail2 = new PHPMailer();
$mail2->isSMTP();
$mail2->Host = 'smtp.gmail.com';
$mail2->SMTPAuth = true;
$mail2->Username = 'techumayur@gmail.com';
$mail2->Password = 'ykhpeyotgaxpqkqc';
$mail2->SMTPSecure = 'tls';
$mail2->Port = 587;
$mail2->setFrom('techumayur@gmail.com', 'Techu Mayur');
$mail2->addReplyTo('techumayur@gmail.com', 'Techu Mayur');
$mail2->addAddress($email);
$mail2->Subject = 'Response to your Query | Techu Mayur';
$mail2->isHTML(true);
$body_message2 = '
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Techu Mayur</title>
<!-- [if (mso 16)]>
<style type="text/css">
    a {text-decoration: none;}    </style>    <![endif]-->
<!-- [if gte mso 9]>
<style>sup { font-size: 100% !important; }</style><![endif]-->
<!-- [if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style type="text/css">
body{font-family:"Open Sans" , sans-serif ;}
#outlook a {	padding:0;}.ExternalClass {	width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {	line-height:100%;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}</style>
</head>
     <body>
<div class="es-wrapper-color" style="background-color: #f6f6f6;"><!-- [if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; padding: 0; margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr class="gmail-fix" style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; width: 600px;" border="0" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; line-height: 1px; min-width: 600px;" height="0"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; max-height: 0px; min-height: 0px; min-width: 600px; width: 600px;" src="https://esputnik.com/repository/applications/images/blank.gif" alt="" width="600" height="1" /></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;" valign="top">
<table class="es-content" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%;" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;" align="center">
<table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 600px; border: 1px solid #0b666a;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 558px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; font-size: 0px;" align="center"><img class="adapt-img" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="https://www.techumayur.in/wp-content/uploads/2022/10/logo.png" alt="" /></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 558px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 25px; padding-left: 25px; padding-right: 25px;" align="left">
<h1 style="margin: 0; line-height: 52px; mso-line-height-rule: exactly;  font-size: 26px; font-style: normal; font-weight: normal; color: #5d5858; text-align: center;"><strong>Thank you for your Login!</strong></h1>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 20px; padding-left: 20px; padding-right: 20px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 558px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; padding-top: 40px;" align="left">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0; width: 598px;" align="center" valign="top">
<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-collapse: collapse;">
<td style="padding: 0; margin: 0;" align="right" bgcolor="#0b666a">
<p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-size: 20px; padding:10px 20px;  line-height:28px; color: #fff;"><strong>Powered By Techu Mayur</strong></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</body>
    </html>
';
$mail2->Body = $body_message2;
$mail2->send();
// End Auto Responder
// Attempt to send email
if ($mail->send()) {
    $response = array(
        "result" => "no_errors",
        "message" => "Message sent."
    );
} else {
    // Handle errors
    $response = array(
        "result" => "error",
        "message" => "Message could not be sent. Mailer Error: " . $mail->ErrorInfo
    );
}
// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
