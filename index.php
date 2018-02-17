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

    <title>Главная страница - DIDS</title>

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
    <style media="screen">
        /*Подсветка блоков на этой странице*/
        .col-md-6 {
            border: 2px solid transparent;
        }
        .col-md-6:hover {
            border-style: inset;
        }
        .col-md-6:hover {
            border-color: #f00;
        }
    </style>
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
                    <!-- <a href="mailto:morphingsleep@gmail.com">Андрей Янусов, практика 2016</a> -->
                </li>
            </ul>

        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>

<!-- Page Content -->
<div class="container" style="color: black">
    <div class="row">
        <div class="col-md-6 col-sm-12" >
            <a  href="main.php?nameSite=Объект управления №1&city=moscow"><h2>Объект управления №1</h2></a>
            <hr>
            <table class="table-bordered table">
                <caption style="color: #122b40">Химический состав стали</caption>
                <tr align="center">
                    <td>
                        <p>углерод</p>
                        <span id="carbon_std_moscow"></span> %
                    </td>
                    <td>
                        <p>кремний</p>
                        <span id="silicon_std_moscow"></span> %
                    <td>
                        <p>марганец</p>
                        <span id="manganese_std_moscow"></span> %
                    </td>
                    <td>
                        <p>алюминий</p>
                        <span id="aluminum_std_moscow"></span> %
                    </td>
                </tr>
                <tr align="center">
                    <td>
                        <p>сера</p>
                        <span id="sulfur_std_moscow"></span> %
                    </td>
                    <td>
                        <p>фосфор</p>
                        <span id="phosphorus_std_moscow"></span> %
                    </td>
                    <td>
                        <p>хром</p>
                        <span id="iron_std_moscow"></span> %
                    </td>

                </tr>
            </table>
            <table style="border-color: black" class="table-bordered table" >
                <caption style="color: #122b40">Параметры объекта управления</caption>
                <tr align="center">
                    <td>
                        <p>k</p>
                        <span id="ratio_moscow">0</span>
                    </td>
                    <td>
                        <p>T</p>
                        <span id="standing_moscow">0</span>
                    <td>
                        <p>&#964;</p>
                        <span id="delay_moscow">0</span>
                    </td>
                </tr>
            </table>
            <table class="table-bordered table" >
                <caption style="color: #122b40">Параметры закона регулирования</caption>
                <tr align="center">
                    <td>
                        <p>&#922;п</p>
                        <span id="proportional_moscow">0</span>
                    </td>
                    <td>
                        <p>&#922;и</p>
                        <span id="integral_moscow">0</span>
                    </td>
                    <td style="color: red">
                        <p>CKO</p>
                        <span id="std_moscow">0</span>
                    </td>
                </tr>
            </table>

        </div>
        <div class="col-md-6 col-sm-12" >
            <a  href="main.php?nameSite=Объект управления №2&city=spb"><h2>Объект управления №2</h2></a>
            <hr>
            <table class="table-bordered table">
                <caption style="color: #122b40">Химический состав стали</caption>
                <tr align="center">
                    <td>
                        <p>углерод</p>
                        <span id="carbon_std_spb"></span> %
                    </td>
                    <td>
                        <p>кремний</p>
                        <span id="silicon_std_spb"></span> %
                    <td>
                        <p>марганец</p>
                        <span id="manganese_std_spb"></span> %
                    </td>
                    <td>
                        <p>алюминий</p>
                        <span id="aluminum_std_spb"></span> %
                    </td>
                </tr>
                <tr align="center">
                    <td>
                        <p>сера</p>
                        <span id="sulfur_std_spb"></span> %
                    </td>
                    <td>
                        <p>фосфор</p>
                        <span id="phosphorus_std_spb"></span> %
                    </td>
                    <td>
                        <p>хром</p>
                        <span id="iron_std_spb"></span> %
                    </td>
                </tr>
            </table>
            <table style="border-color: black" class="table-bordered table" >
                <caption style="color: #122b40">Параметры объекта управления</caption>
                <tr align="center">
                    <td>
                        <p>k</p>
                        <span id="ratio_spb">0</span>
                    </td>
                    <td>
                        <p>T</p>
                        <span id="standing_spb">0</span>
                    <td>
                        <p>&#964;</p>
                        <span id="delay_spb">0</span>
                    </td>
                </tr>
            </table>
            <table class="table-bordered table" >
                <caption style="color: #122b40">Параметры закона регулирования</caption>
                <tr align="center">
                    <td>
                        <p>&#922;п</p>
                        <span id="proportional_spb">0</span>
                    </td>
                    <td>
                        <p>&#922;и</p>
                        <span id="integral_spb">0</span>
                    </td>
                    <td style="color: red">
                        <p>CKO</p>
                        <span id="std_spb">0</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- /.row -->



</div>
<!-- /.container -->
<script type="text/javascript">
    setTimeout(function(){location.reload()}, 4000); //перезагрузка страницы каждые 4 секунды
</script>
<script src="js/forMain.js"></script>
<!-- jQuery -->
<script src="js/jquery.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>
<!-- Fabric.js -->
<script src="js/fabric.js"></script>
<!-- DIDS - Dynamic information display system -->
<script src="js/DIDS.js"></script>
<script src="js/chemical.js"></script>
<script src="js/dataAndTime.js"></script>
<script type="text/javascript">
    clock();
    var city ; var strinLinkessObject = ""; var stringNamesParametrs ;
    var massNameCity = ["moscow", "spb"];
    var massNameParametrs = ["ratio", "standing", "delay", "proportional", "integral", "std"];
    for (var i = 0; i< massNameCity.length; i++){
        city = massNameCity[i];
        for (var j = 0; j < massNameParametrs.length; j++){
            stringNamesParametrs = "#"+massNameParametrs[j]+"_"+city;
            strinLinkessObject = massNameParametrs[j];
            tests(stringNamesParametrs) // иначе никак не закинуть строку в ajax
            function tests(x){
                //отправляем ( куда , что (имя / значение) , получаем ответ)
                $.get('http://dids/Parametrs_Systems/readerFilesIndex.php', {messar: city, name: massNameParametrs[j]}, function(data)	{
                    $(x).text(data);
                });

        }
            }
    }


</script>
</body>

</html>
