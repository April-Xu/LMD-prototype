<?php
    require("class.phpmailer.php");
    $from = $_POST["email"];
    $firstname = $_POST["f_name"];
    $lastname = $_POST["l_name"];
    $mobile=$_POST["mobile"];
    $subject=$_POST["subject"];
    $message=$_POST["message"];
    $PHPMailer = new PHPMailer();
    $emailcontent = "Name:".$firstname."<br>Mobile:".$mobile."<br>Email:".$from."<br>Subject:".$subject."<br>Subject".$message;
    $PHPMailer->From = $from;
    $PHPMailer->FromName = $_POST["f_name"];
	//change where to mail sent 
    $PHPMailer->AddAddress('info@pentathemes.com');
    $PHPMailer->Subject = "photomania Contact";
    $PHPMailer->MsgHTML($emailcontent);
    if ($PHPMailer->Send()) {
        $success=true;
    } else {
        $success=false;
    }
    $json_data = array('success' => $success);
    echo json_encode($json_data);
    exit();

?>