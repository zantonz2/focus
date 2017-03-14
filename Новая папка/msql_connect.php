<?php
$user="root";
$pass="";
$path="localhost";
$DB="userName";
mysql_connect($path,$user,$pass) or die("Нет связи с БД");
@mysql_query("CREATE DATABASE $DB"); //создать
mysql_select_db($DB) or die ("НЕ УДАЛОСЬ выбрать БД::::".mysql_error()); //выбор БД
?>