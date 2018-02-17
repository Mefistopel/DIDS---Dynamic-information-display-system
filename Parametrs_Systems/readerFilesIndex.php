<?php
$city =   $_GET[messar];
$name =   $_GET[name];
$fp = fopen($name.'_'.$city.'.txt', 'r');
while(!feof($fp))
{
    $str = htmlentities(fgets($fp));
    if ($str) echo $str;
    else echo 'Ошибка чтения файла.';
}
fclose($fp); //Закрытие файла
