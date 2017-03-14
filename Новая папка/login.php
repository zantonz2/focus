<?php 
##Проверка на введение логина
//ini_set("error_reporting", E_ALL); //чтобы видеть все ошибки
date_default_timezone_set("UTC");
		$LOG=trim($_POST['login']);
		@$PAS=$_POST['password'];
		if ($LOG!="") 
			{	@session_start();
				require_once "msql_connect.php";
				@mysql_query("CREATE TABLE userData (log TEXT, password TEXT, ip TEXT, intime INT, id INT AUTO_INCREMENT PRIMARY KEY)");
				//mysql_query("DROP DATABASE userName");
				$intime=time();
				$ip=$_SERVER['REMOTE_ADDR'];
				$result_sql=mysql_query("SELECT * FROM userData WHERE log='$LOG'"); //ищем логин в базе
				$_SESSION['TimeZone']=$_POST['timeZone'];
				for ($result=array();$row=mysql_fetch_assoc($result_sql); $result[]=$row);
				if (empty($result)) //нет логина в БД 
					{
						//echo "Добавить пользователя <br>"; 
						mysql_query("INSERT INTO userData (log, password, ip, intime) VALUES ('$LOG', '$PAS', '$ip', '$intime')"); //добавить в базу новый логин
						$idUser=mysql_insert_id();
						$_SESSION['UserName']=$LOG;
					}
				else //есть логин в БД
					{
						foreach ($result as $key => $value)  
							{	$passt=$result[$key][password];
								//$ty=gettype($passt);
								if ($result[$key][password]==$PAS) // Если пароль совпадает с введенным
									{	//echo "Здрасте: ".$LOG;
										$idUser=$result[$key][id];
										mysql_query("UPDATE userData SET ip='$ip', intime='$intime' WHERE id='$idUser'");//обновить время входа и IP
										$_SESSION['UserName']=$LOG;
										break;
									}
								elseif ($result[$key][ip]==$ip) // Пароль не совпал, совпал IP
									{	//echo "Пароль отправлен на емайл <br>";
										$idUser=$result[$key][id];
										$_SESSION['UserName']="NoPasUser";
										//echo $idUser."Пароль отправлен на емайл";
										break;
									}
								else {	// не совпал ни Пароль ни IP
										//Header("Location: http://{$_SERVER['SERVER_NAME']}/chat/index2.html");
										$_SESSION['UserName']="NoIpPasUser";
										//echo "Вспоминайте пароль, если зайдете с прошлого IP, то будет выслан на почту"; 
										//break;
										}
							}
					}
			
						@session_start();
			if (!isset($_SESSION['count'])) $_SESSION['count'] = 0; 
			$_SESSION['count'] = $_SESSION['count'] + 1;
			if (!isset($_SESSION['color'])) $_SESSION['color'] = "#FFFFFF";
			if (!isset($_SESSION['font'])) $_SESSION['font'] = "Timens";
			if (!isset($_SESSION['size'])) $_SESSION['size']=2;
			$_SESSION['id']=$idUser;
			if (!isset($_SESSION['bold']))$_SESSION['bold']="normal";
			//$_SESSION['UserName']=$LOG;

			}
			else $_SESSION['UserName']="NoLogUser";
		
		@mysql_close();
		Header("Location: http://{$_SERVER['SERVER_NAME']}/End/chat.html");
		//$dom=new domDocument();

		//exit();



?>