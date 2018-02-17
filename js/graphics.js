ren = 0; blead = 0;
// комммент
//Начало функции графика работы системы
function supportGraphics(newValue){

    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        Highcharts.chart('div_pressure', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series_y = this.series[0];
                        var series_y_target = this.series[1];
                        var series_w_clamour = this.series[2];
                        setInterval(function () {
                            ren = ren + 1; fet = ren + parseInt(newValue)+1;
                            if(theImpactToSchedule.checkedNames[0]){
                                var x_y = (new Date()).getTime(), // current time
                                    y_y = Y[ren+parseInt(newValue)];
                                series_y.addPoint([x_y, y_y], true, true);
                                funcPressure(y_y);
                            }
                            if (theImpactToSchedule.checkedNames[1]){
                                var x_y_target = (new Date()).getTime(), // current time
                                    y_y_target = y_targer;
                                series_y_target.addPoint([x_y_target, y_y_target], true, true);
                            }
                            if (theImpactToSchedule.checkedNames[2]){
                                var x_w_clamour = (new Date()).getTime(), // current time
                                    y_w_clamour = clamour[ren+parseInt(newValue)];
                                series_w_clamour.addPoint([x_w_clamour, y_w_clamour], true, true);
                            }
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Работа системы'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Значения'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 3);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{  //График выхода
                name: 'Y - выход сисетмы',
                data: (function () {
                    if (theImpactToSchedule.checkedNames[0]){
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -newValue, s=0; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Y[s]
                        });
                        s += 1;
                    }
                    return data;}
                }())
            },
                { //График задания
                    name: 'Y* - Задание',
                    data: (function () {
                        if (theImpactToSchedule.checkedNames[1]){
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime(),
                                i;

                            for (i = -newValue; i <= 0; i += 1) {
                                data.push({
                                    x: time + i * 1000,
                                    y: y_targer
                                });
                            }
                            return data;}
                    }())
                },
                { //График возмущений
                    name: 'Возмущения',
                    data: (function () {
                        if (theImpactToSchedule.checkedNames[2]){
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime(),
                                i;

                            for (i = -newValue; i <= 0; i += 1) {
                                data.push({
                                    x: time + i * 1000,
                                    y: clamour[s]
                                });
                                s += 1;
                            }
                            return data;}
                    }())
                }]
        });
    });}
//КОНЕЦ ФУНКЦИИ ГРАФИКА РАБОТЫ СИСТЕМЫ

//Начало функции графика автокорреляционной функции
function correlationGraphics( evaluation_interval, evaluation_time){
    var times = evaluation_time * 1000;
    if (11>=10){
        graph()
        window.counterAutoGraphics = setInterval(function () {
            graph();
        }, times)

        function graph(){
            Highcharts.chart('scheduleU', {//Построение графика
                title: {
                    text: 'График автокорреляционной функции ',
                    x: -20 //center
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {

                    title: {
                        text: 'Значения'
                    },

                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{name: 'АКФ',

                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i; s = 0;

                        for (i = - evaluation_interval ; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y:afk[s]
                            }); s += 1;
                        }
                        return data;
                    }()),

                    stack: '1'}]
            })}
    }
}
//КОНЕЦ ФУНКЦИИ ГРАФИКА АВТОКОРРЕЛЯЦИОННОЙ ФУНКЦИИ

//Начало функции графика среднеквадратического отклонения
function autoSTDeviation(newValue){
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        Highcharts.chart('div_std', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0]; var valueZero = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Q_srv[ren+parseInt(newValue)];
                            series.addPoint([x, y], true, true);
                                zero = 0;
                            valueZero.addPoint([x, zero], true, true);
                            $.get('../Parametrs_Systems/writeFiles.php', {message:y, messar: city, name: "std"});
                            likeness.K_std_object = y;
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'График среднеквадратического отклонения '
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Значения'
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 3);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{  //График выхода
                name: 'Среднеквадратические значения',
                color: 'red',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i; s = 0;

                    for (i = - newValue ; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y:Q_srv[s]
                        }); s += 1;
                    }
                    return data;
                }())
            },
                {  //График выхода
                    color: 'black',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i; s = 0;

                        for (i = - newValue ; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y:0
                            }); s += 1;
                        }
                        return data;
                    }())
                }]
        });
    });}
//КОНЕЦ ФУНКЦИИ ГРАФИКА СРЕДНЕКВАДРАТИЧЕСКОГО ОТКЛОНЕНИЯ