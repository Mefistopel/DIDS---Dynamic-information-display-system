<!DOCTYPE html>
<html class="full" lang="en">
<!-- Make sure the <html> tag is set to the .full CSS class. Change the background image in the full.css file. -->

<head>
    <script src="https://code.highcharts.com/highcharts.js"></script>

    <script src="https://code.highcharts.com/modules/exporting.js"></script>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <script src="js/vue.js"></script>

    <title><?php if (isset($_GET['nameSite'])) echo  $_GET['nameSite'];?> - Dynamic information display system</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/the-big-picture.css" rel="stylesheet">
    <link href="css/newcss.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
</head>

<body>
<!-- Navigation -->
<nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="mailto:morphingsleep@gmail.com"><span id="doc_time">Дата и время</span></a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a href="index.php">Главная страница</a>
                </li>
            </ul>

        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>

<!-- Page Content -->
<div class="container">
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <h2>Система отображения информации объекта: <br>	&laquo;Дуговая сталеплавильная печь&raquo;
                <br>
                <i>
                <?php //принимает переменные по строковой передаче данных
                    if (isset($_GET['nameSite']))
                    echo  $_GET['nameSite'];
                    $var = $_GET['city'];;
                    print '<script language="javascript"> city = "'.$var.'";</script>' //связывает php с javascript
                ?>
                </i>
            </h2>
            <hr>
            <h4><strong>Инструкция:</strong></h4>
            <ol>
                <li>Произведите заправку печи. Проверьте печь на наличие лишних предметов</li>
                <li>Загрузите шихту при помощи кнопки <span style="color: green;">&laquo;Завалка&raquo;</span>.</li>
                <li>Запустите систему плавления металла кнопкой: <span style="color: red;">&laquo;Нагрев&raquo;</span>.</li>
                <li>Запустите раскисление  при помощи кнопки: <span style="color: #00008B">&laquo;Раскисление&raquo;</span>.</li>
                <li>Отключите работу свечей при помощи кнопки: <span style="color: #8B008B">&laquo;Выключение печи&raquo;</span>.</li>
                <li>Выпустите готовую сталь при помощи кнопки: <span style="color: #2F4F4F">&laquo;Слив металла&raquo;</span>.</li>
            </ol>
            <table class="table">
                <tr>
                    <td>
                        <a data-tooltip="Загружает шихтовые материалы на под печи" class="btn btn-start-green btn-start
                        btn-lg" href="#" role="button"  onclick="patternRunOne()">Завалка</a>
                    </td>
                    <td>
                        <a data-tooltip="Происходит расплав металла, при этом он окисляется" class="btn btn-start-red
                        btn-start btn-lg" href="#" role="button"  onclick="patternRunSecond()">Нагрев</a>

                    </td>
                    <td>
                        <a data-tooltip="Электроды отключаются" class="btn btn-start-indigo btn-start btn-lg" href="#"
                           role="button"  onclick="patternRunThird()">Выключение печи</a>
                    </td>

                </tr>
                <tr>
                    <td align="center" colspan="2">
                        <a data-tooltip="Добавление примесей для данной марки стали" class="btn btn-start-blue btn-start
                         btn-lg" href="#" role="button"  onclick="patternRunFourth()">Раскисление</a>
                    </td>
                    <td>
                        <a data-tooltip="Выпуск готовой стали и шлака осуществляется через сталевыпускное отверстие и
                        желоб путем наклона рабочего пространства" class="btn btn-start-gray btn-start btn-lg" href="#"
                           role="button"  onclick="patternRunFifth()">Слив металла</a>
                    </td>
                </tr>
            </table>
            <a data-tooltip="Регулирование технологического процесса" class="btn btn-start-SkyBlue btn-start
            btn-lg" href="#STATIC_WINDOW" role="button"  onclick="show('STATIC_WINDOW')">Регулирование</a>
            <div id="tooltip"></div>

        </div>
        <div id="floge" class="col-md-6 col-sm-12" >
            <canvas id="canvas"  width="700px" height="510" ></canvas>
            <canvas id="canvas_pressure"  width="700px" height="50"></canvas>


        </div>
    </div>


<!-- Начало блока показателя качества-->
    <div id="STATIC_WINDOW" class="row" style="display: yes">
        <h2>Статистические характеристики давления в рабочем пространстве печи</h2>
        <div class="row">
            <div class="row">
                <!--Начало блока с параметрами-->
                <div  class="col-md-4 col-sm-4" align="center" >
                    <div id="coefficientModel"  class="row" >
                        <p align="left">Параметры модели объекта регулирования</p>
                        <div class="col-md-3 col-sm-3" >
                            <p >k</p>
                            <input id="ratio" class="my-input" v-model="ratio" placeholder="k">
                            <p>Введённое сообщение: {{ ratio }}</p>
                        </div>
                        <div  class="col-md-3 col-sm-3">
                            <p>T</p>
                                <input id="standing" class="my-input" v-model="standing" placeholder="T">
                            <p>Введённое сообщение: {{ standing }}</p>
                        </div>
                        <div class="col-md-3 col-sm-3" >
                            <p>&#964;</p>
                            <input id="delay" class="my-input" v-model="delay" placeholder="&#964;">
                            <p>Введённое сообщение: {{ delay }}</p>
                        </div>
                    </div>
                    <br>
                    <div id="coefficientRegulation" class="row" >
                        <p align="left">Параметры закона регулирования</p>
                        <!-- Выбор закона регулирования -->
                        <p align="left" ><i>Закон регулирования:</i> <select v-model="selected">
                                <option v-for="option in options" v-bind:value="option.value">
                                    {{ option.text }}
                                </option>
                            </select></p>



<!--                        Начало блока ручных настроек-->
                        <div class="row" v-bind:style="styleObject">
                            <div class="row" >
                                <div class="col-md-9 col-sm-9">
                                    <p style="color: red">Задайте настройки вручную и нажмите на кнопку для переноса параметров</p>
                                </div>
                            </div>

                            <div class="col-md-3 col-sm-3" >
                                <p style="color: red">&#922;п</p>
                                <input id="proportional_test" class="my-input" v-model="proportional_test" placeholder="&#922;п"
                                       style="color: red">
                            </div>
                            <div  class="col-md-3 col-sm-3" >
                                <button type="button" class="btn btn-warning btn-lg" v-on:click="checked=true">&darr;</button>
                            </div>
                            <div  class="col-md-3 col-sm-3">
                                <p style="color: red">&#922;и</p>
                                <input id="integral_test" class="my-input" v-model="integral_test" placeholder="&#922;и"
                                       style="color: red">
                            </div>
                            <br><br><br>
                        </div>
                        <!--  Конец блока ручных настроек-->





                        <div class="col-md-3 col-sm-3">
                            <p>&#922;п</p>
                            <input id="proportional" class="my-input" v-model="proportional" placeholder="&#922;п">
                        </div>
                        <div  class="col-md-3 col-sm-3" >

                           <div style="display: none ">
                               <input id="combination" class="my-input" v-model="combination" placeholder="Совокупность">
                           </div>
                        </div>
                        <div  class="col-md-3 col-sm-3">
                            <p>&#922;и</p>
                            <input id="integral" class="my-input" v-model="integral" placeholder="&#922;и">
                        </div>
                    </div>
                    <br>
                    <div id="likeness" class="row" >
                        <p  align="left">Параметры закона регулирования в системе 2</p>

                        <div  class="col-md-3 col-sm-3">
                            <p>&#922;п</p>
                            <input  id="proportional_likeness<?php echo "_".$_GET['city'];?>" class="my-input"
                                    v-model="proportional_likeness<?php echo "_".$_GET['city'];?>" disabled>
                        </div>
                        <div  class="col-md-3 col-sm-3">
                        </div>
                        <div  class="col-md-3 col-sm-3">
                            <p>&#922;и</p>
                            <input  id="integral_likeness<?php echo "_".$_GET['city'];?>" class="my-input"
                                    v-model="integral_likeness<?php echo "_".$_GET['city'];?>" disabled>
                        </div>

                    </div>

                </div>
                <!--Конец блока с параметрами-->



                <!--Начало блока с чекбоксами для графика-->
                <div id="checkboxes" class="col-md-1 col-sm-1" align="center">
                    <br><br>
                    <input type="checkbox" id="job"  v-model="checkedNames[0]">
                    <label for="job">Y</label>
                    <br><br>
                    <input type="checkbox" id="mission"  v-model="checkedNames[1]">
                    <label for="mission">Y*</label>
                    <br><br>
                    <input type="checkbox" id="interference"  v-model="checkedNames[2]">
                    <label for="interference">&Delta;W</label>

                    <br><br>
                    <p align="left">Интервал отрисовки</p>
                        <!-- Время -->
                    <div  class="col-md-3 col-sm-3">
                        <input id="interval" class="my-input" v-model="interval" placeholder="100">
                    </div>


                    <br><br>
                    <p align="left">&alpha; для СКО <font size="2">(коэффициент сглаживания)</font> </p>
                    <!-- Время -->
                    <div  class="col-md-3 col-sm-3">
                        <input id="recurrent" class="my-input" v-model="recurrent" placeholder="100">
                    </div>
                </div>

                <!--Конец блока с чекбоксами для графика-->

                <!--Начало блока с графиком-->
                <div class="col-md-7 col-sm-7" align="center">
                    <div class="row">
                        <div id="div_pressure"  style=" height: 250px; margin: 0 auto; border: 1px solid black"></div>
                    </div>
                    <div class="row">
                        <div id="div_std" style=" height: 250px; margin: 10px auto; border: 1px solid black"></div>
                    </div>
                </div>
                <!--Конец блока с графиком-->
            </div>
            <br>
            <p>
                <a class="btn btn-primary " href="#block1" onclick="show('block1')"  role="button" >Открыть окно АКФ</a>
            </p>

        </div>
    </div>
<!-- Конец блока показателя качества-->

    <!-- НАЧАЛО БЛОКА АКФ -->
    <div class="row" id="block1" style="display: block">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <H3 style="color: mediumvioletred">Автокорреляционная функция</H3>
            </div>
        </div>
        <div class="row">
            <h4>ГРАФИК АКФ</h4>
            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9" >
                <p>Коэффициент спада АКФ</p>
                <div  class="col-md-3 col-sm-3">
                    <input id="the_evaluation_exhibitor" class="my-input" v-model="the_evaluation_exhibitor" placeholder="100" disabled>
                </div>
                <br>
                <div id="scheduleU" style="min-width: 310px; height: 380px; margin: 0 auto; border: 1px solid black"></div>
                <br>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <p align="left">Интервал оценки</p>
                <!-- Время -->
                <div  class="col-md-3 col-sm-3">
                    <input id="the_evaluation_interval" class="my-input" v-model="the_evaluation_interval" placeholder="100">
                </div>
                <br><br>
                <p align="left">Время отрисовки, сек</p>
                <!-- Время -->
                <div class="col-md-3 col-sm-3">
                    <input id="the_evaluation_time" class="my-input" v-model="the_evaluation_time" placeholder="100">
                </div>

            </div>
        </div>
    </div>
    <!-- КОНЕЦ БЛОКА АКФ -->


</div>
<!-- /.container -->

<!-- jQuery -->
<script src="js/jquery.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>
<!-- Fabric.js -->
<script src="js/fabric.js"></script>
<!-- DIDS - Dynamic information display system -->
<script src="js/DIDS.js"></script>
<script src="js/chemical.js"></script>
<?php $disturbance = file("disturbance.txt");?>
<script type="text/javascript">
    var disturbance = <?php echo json_encode($disturbance ); ?>;



</script>
<script src="js/pressureInTheWorking.js"></script>

<script src="js/dataAndTime.js"></script>
<script src="js/graphics.js"></script>

<script type="text/javascript">
    clock(); //время внизу экрана
    $("[data-tooltip]").mousemove(function (eventObject) { //всплывающие подсказки при наведении курсора на кнопку

        $data_tooltip = $(this).attr("data-tooltip");

        $("#tooltip").text($data_tooltip)
            .css({
                "top" : eventObject.pageY

            })
            .show();

    }).mouseout(function () {

        $("#tooltip").hide()
            .text("")
            .css({
                "top" : 0,
                "left" : 0
            });
    });
    function show(divid) // Разворот/сокрытие блока
    {
        if(document.getElementById(divid).style.display=="none")
        {document.getElementById(divid).style.display="block";   }
        else {document.getElementById(divid).style.display="none";   }
    }
    var stringNamesParametrs ; var strinLinkessObject = "";
    var massNameParametrs = ["ratio", "standing", "delay", "proportional", "integral"];

    setInterval(function() {

        for (var i = 0; i < massNameParametrs.length; i++){
            stringNamesParametrs = "#"+massNameParametrs[i];
            //отправляем ( куда , что (имя / значение) , получаем ответ)
            $.get('http://dids/Parametrs_Systems/writeFiles.php', {message:$(stringNamesParametrs).val(), messar: city, name: massNameParametrs[i]});
        }
        for (var j = 0; j < massNameParametrs.length; j++){
            strinLinkessObject = massNameParametrs[j];
            x1 = eval('"likeness.K_'+strinLinkessObject+'_likeness"');
            tests(x1) // иначе никак не закинуть строку в ajax
        function tests(x){
            //отправляем ( куда , что (имя / значение) , получаем ответ)
            $.get('http://dids/Parametrs_Systems/readerFiles.php', {messar: city, name: massNameParametrs[j]}, function(data)	{
                eval(x+"=data")
            });
        }}
        $.get('http://dids/Parametrs_Systems/readerFiles.php', {messar: city, name: "std"}, function(data)	{
            likeness.K_std_likeness=data;
        });
    }, 2000);
</script>

<?php
echo "<script>

                        var likeness = new Vue({
                            el: '#likeness',
                            data: {
                                K_ratio_likeness: 0,
                                K_standing_likeness: 0,
                                K_delay_likeness: 0,
                                K_proportional_likeness: 0,
                                K_integral_likeness:0,
                                K_std_likeness: 0,
                                K_std_object:0,
                                alpha_likeness: 0
                            },
                            computed: {
                               proportional_likeness_" . $_GET['city'] . ": {
                                    get: function () {
                                       return this.K_proportional_likeness*((this.K_ratio_likeness*
                                       this.K_delay_likeness*objectRegutalation.standing)/(objectRegutalation.ratio*
                                       objectRegutalation.delay*this.K_standing_likeness))*Math.exp((1/0.4)*
                                       (0.1*objectRegutalation.delay-0.5*this.K_delay_likeness))
                                    }
                                },
                               integral_likeness_".$_GET['city'].": {
                                    get: function () {
                                       return this.K_integral_likeness*((this.K_ratio_likeness*this.K_delay_likeness)/
                                       (objectRegutalation.ratio*objectRegutalation.delay))*Math.exp((1/0.4)*
                                       (0.1*objectRegutalation.delay-0.5*this.K_delay_likeness))
                                    }
                                }
                            }
                        });
                    </script>";
?>

</body>

</html>
