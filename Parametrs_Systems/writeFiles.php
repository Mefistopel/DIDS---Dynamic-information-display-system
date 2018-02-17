<?php
$city =   $_GET[messar];
$name =   $_GET[name];
$fp = fopen($name.'_'.$city.'.txt', 'w+');
$mytext =  $_GET[message]; // Исходная строка
$test = fwrite($fp, $mytext); // Запись в файл
if ($test) echo 'Данные в файл успешно занесены.';
else echo 'Ошибка при записи в файл.';
fclose($fp); //Закрытие файла
