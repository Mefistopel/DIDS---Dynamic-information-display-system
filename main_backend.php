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
    <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>

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
        <h2>Ститистические характеристики давления в рабочем пространстве печи</h2>
        <div class="row">
            <div class="row" style="border: 1px solid red">

                <!--Начало блока с параметрами-->
                <div class="col-md-4 col-sm-4" style="border: 1px solid blue" align="center">
                    <div class="row" >
                        <p align="left">Параметры модели объекта регулирования</p>
                        <div id="coefficientModel"  class="col-md-3 col-sm-3" >
                            <p >k</p>
                            <input class="my-input" v-model="message" placeholder="k">
                        </div>
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                            <p>T</p>
                            <input class="my-input" v-model="message" placeholder="T">
                        </div>
                        <div id="coefficientModel" class="col-md-3 col-sm-3" >
                            <p>&#964;</p>
                            <input class="my-input" v-model="message" placeholder="&#964;">
                        </div>
                    </div>
                    <br>
                    <div class="row" >
                        <p align="left">Параметры закона регулирования</p>
                        <!-- Время -->
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                            <p>&#922;п</p>
                            <input class="my-input" v-model="message" placeholder="&#922;п">
                        </div>
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                        </div>
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                            <p>&#922;и</p>
                            <input class="my-input" v-model="message" placeholder="&#922;и">
                        </div>
                    </div>
                    <br>
                    <div class="row" >
                        <p align="left">Система по степени подобия</p>
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                            <p>&#922;п</p>
                            <input class="my-input" v-model="message" placeholder="k">
                        </div>
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                            <button type="button" class="btn btn-warning btn-lg">&#8593;</button>
                        </div>
                        <div id="coefficientModel" class="col-md-3 col-sm-3">
                            <p>&#922;и</p>
                            <input class="my-input" v-model="message" placeholder="отр">
                        </div>
                    </div>
                </div>
                <!--Конец блока с параметрами-->


                <!--Начало блока с чекбоксами для графика-->
                <div class="col-md-1 col-sm-1" style="border: 1px solid blue" align="center">
                    <br><br>
                    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
                    <label for="jack">y</label>
                    <br><br>
                    <input type="checkbox" id="john" value="John" v-model="checkedNames">
                    <label for="john">y*</label>
                    <br><br>
                    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
                    <label for="mike">&#969;</label>
                    <br><br>
                    <p align="left">Интервал отрисовки</p>
                        <!-- Время -->
                    <div id="coefficientModel" class="col-md-3 col-sm-3">
                        <input class="my-input" v-model="message" placeholder="100">
                    </div>


                </div>
                <!--Конец блока с чекбоксами для графика-->

                <!--Начало блока с графиком-->
                <div class="col-md-7 col-sm-7" style="border: 1px solid blue" align="center">
                    <div id="div_pressure" style=" min-width:auto; height: auto; margin: 0 0; border: 1px solid black"></div>
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
                <p>&#945; - экспоненты</p>
                <!-- Время -->
                <div id="coefficientModel" class="col-md-3 col-sm-3">
                    <input class="my-input" v-model="message" placeholder="100">
                </div>
                <div id="scheduleU" style="min-width: 310px; height: 380px; margin: 0 auto"></div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <p align="left">Интервал оценки</p>
                <!-- Время -->
                <div id="coefficientModel" class="col-md-3 col-sm-3">
                    <input class="my-input" v-model="message" placeholder="100">
                </div>
                <br><br>
                <p align="left">Время оценки</p>
                <!-- Время -->
                <div id="coefficientModel" class="col-md-3 col-sm-3">
                    <input class="my-input" v-model="message" placeholder="100">
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
<?php $disturbance = file("disturbance.txt"); ?>
<script type="text/javascript">
    var disturbance = <?php echo json_encode($disturbance ); ?>;
</script>
<script src="js/pressureInTheWorking.js"></script>

<script src="js/dataAndTime.js"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#coefficientModel',
        data: {
            message: ''
        }
    })
</script>
<script type="text/javascript">
    clock();
    $("[data-tooltip]").mousemove(function (eventObject) {

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
    function show(divid) // Для выбора моделирования
    {
        if(document.getElementById(divid).style.display=="none")
        {document.getElementById(divid).style.display="block";   }
        else {document.getElementById(divid).style.display="none";   }
    }
</script>
</body>

</html>
