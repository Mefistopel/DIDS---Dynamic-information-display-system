var canvas_pressure = this.__canvas = new fabric.StaticCanvas('canvas_pressure');
fabric.Object.prototype.transparentCorners = false;


var pressureText = new fabric.Text('Давление в рабочем пространстве печи:', { left: 10, top: 15, fontSize: 21,
    fill: 'DarkSlateGrey', selectable: false });
canvas_pressure.add(pressureText);

function funcPressure(displ) {//функция отображения давления
    canvas_pressure.remove(pressure);
    misl = (Math.round(displ*1000)/1000);
    pressure = new fabric.Text(misl +' Па', { left: 380, top: 15, fontSize: 21, fill: 'DarkSlateGrey', selectable: false });
    canvas_pressure.add(pressure);
}

var objectRegutalation = new Vue({
    el: '#coefficientModel',
    data: {
        ratio: '1',
        standing: '5',
        delay: '1'
    }
});
window.Y = [];window.U = [];window.Upr = []; window.Uint = []; window.Ep = []; window.Yu = []; window.c1; window.c2;
window.target = []; window.counter_pressure = []; window.clamour = [];
Kp = objectRegutalation.standing/(objectRegutalation.ratio*objectRegutalation.delay);
Kint = 0.1 /(objectRegutalation.ratio*objectRegutalation.delay);
window.fet = 0;
var PIDregutalation = new Vue({
    el: '#coefficientRegulation',
    data: {
        proportional: Kp,
        integral: Kint,
    },
    computed: {
        combination: {
            get: function () {

                y_targer = 0; alert(fet+" fet")
                alert(Yu.join('\n').replace( /\./g, "," )+" ДО ")

                systemRegulationPressure(fet, objectRegutalation.ratio,objectRegutalation.standing,objectRegutalation.delay,
                    this.proportional,this.integral)
                alert(" После "+ Yu.join('\n').replace( /\./g, "," ) )


            }
        }
    }
});

function systemRegulationPressure(i,k, T, tt,Kp,Kint){
    for (i ; i < 200; i++){
        c1 = Math.exp(-(0.1/T));
        c2=(k*(1-c1));
        X = Math.ceil(tt/0.1);
        clamour [i] = parseFloat(disturbance[i].replace(',','.')); // шум
        if (i != 0){
            if (i>X){
                Yu[i] = ((U[i-X]*c2+c1*Yu[i-1])); //"-1" подправить!
            } else {Yu[i] = c1*Yu[i-1]}
            Y[i] = clamour [i]+Yu[i]; //
            Ep[i] = parseFloat(y_targer-Y[i]);//Отклонение от заданного
            Upr[i] = parseFloat(Kp * Ep[i]); //пропорциональная составляющая закона регулирования,
            Uint[i] = (Uint[i-1]+Kint*Ep[i]); //интегральная составляющая закона регулирования,
            U[i] = (Upr[i] + Uint[i]); //закон регулирования

        }
        else {
            Ep[i] = 0;
            Upr[i] = 0;
            Uint[i] = 0;
            U[i] = 0;
            Yu[i] = 0;
            Y[i] = 0;

        }
    }
}

/*
 ,
 computed: {
 proportional: {
 // геттер:
 get: function () {
 return (objectRegutalation.standing/(objectRegutalation.ratio*objectRegutalation.delay))
 },
 // сеттер:
 set: function (newValue) {
 this.proportional = newValue
 alert(this.proportional) }
 }
 }
 */
var likeness = new Vue({
    el: '#likeness',
    data: {
        proportional_likeness: '5',
        integral_likeness: '0.2'
    }
});
function transfer(){
    document.getElementById('proportional').value =likeness.proportional_likeness;
    document.getElementById('integral').value =likeness.integral_likeness;
    PIDregutalation.proportional = likeness.proportional_likeness;
    PIDregutalation.integral = likeness.integral_likeness;
}

var theImpactToSchedule = new Vue({
    el: '#checkboxes',
    data: {
        checkedNames: ['true']
    },
    computed: {
        interval: {
            // геттер:
            get: function () {
                PIDregutalation.proportional
                PIDregutalation.integral
            },
            // сеттер:
            set: function (newValue) {
                supportGraphics(newValue)
            }
        }
    }
});

var autoСorrelation = new Vue({
    el: '#block1',
    data: {
        the_evaluation_exhibitor: '',
        the_evaluation_time: ''
    },
    computed: {
        the_evaluation_interval: {
            // сеттер:
            get: function () {
                this.the_evaluation_exhibitor
                this.the_evaluation_time
            },
            set: function (newValue) {
                correlationGraphics(this.the_evaluation_exhibitor,newValue, this.the_evaluation_time)

            }
        }
    }
});


var timerPressureDiscr; var secsTime = 0;
function timerPressure()  {
/*функция дискретного времени изменения давления нужна для того, чтобы "обнулять" время, с помощью которого заполняется
* массив данных MASSIV[i}, где i - дискретное время. Необходимо для того, чтобы заполнять массив с нулевого индекса.*/
    if (timerPressureDiscr) clearInterval(timerPressureDiscr);
    timerPressureDiscr = setInterval(
        function () {
            if (secsTime == 0){document.getElementById("time").value +=secsTime}
            else {document.getElementById("time").value +="\n"+secsTime;}//Отправляет индексы в область "Время, сек" на форме
            regulationPressure((secsTime), 0, 1, 5, 1, 0.1); //ЗДЕСЬ ОТПРАВЛЯЕМ ПАРАМЕТРЫ В СИСТЕМУ
            secsTime++; //увеличевает массив на 1
            updateTextarea();
            autoStdeviation(); //Обновляем функцию среднеквадратического отклонения
        }, 1000);
}




function RegulationPressure(i,y, k, T, tt, dt){

    /* i - индекс заполнения массива
        y - задание
        k - коэффициент передачи объекта упр
        T - постоянная времени объекта упр
        tt - запаздывание объекта упр
        dt - шаг дискретизации
     */
    c1 = Math.exp(-(dt/T));
    c2=(k*(1-c1));
    X = Math.ceil(tt/dt);
    Kp = T/(k*tt);
    Kint = dt /(k*tt);
    clamour [i] = parseFloat(disturbance[i].replace(',','.')); // шум
    if (i != 0){
        if (i>X){
            Yu[i] = ((U[i-X]*c2+c1*Yu[i-1])); //"-1" подправить!
        } else {Yu[i] = c1*Yu[i-1]}
            Y[i] = clamour [i]+Yu[i]; //
            Ep[i]=parseFloat(y-Y[i]);//Отклонение от заданного
            Upr[i] = parseFloat(Kp * Ep[i]); //пропорциональная составляющая закона регулирования,
            Uint[i] = (Uint[i-1]+Kint*Ep[i]); //интегральная составляющая закона регулирования,
            U[i] = (Upr[i] + Uint[i]); //закон регулирования

            funcPressure(Y[i]);
            autoСorrelation("pressure");
    }
    else {
        Ep[i] = 0;
        Upr[i] = 0;
        Uint[i] = 0;
        U[i] = 0;
        Yu[i] = 0;
        Y[i] = 0;

        funcPressure(Y[i]);
    }



        counter_pressure[i] = i;
/*

    Highcharts.chart('', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Давление газов в рабочем пространстве печи'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: counter_pressure
        },
        yAxis: {
            title: {
                text: 'Давление'
            },
            labels: {
                formatter: function () {
                    return this.value + ' Па';
                }
            }
        },
        tooltip: {
            crosshairs: false,
            shared: true
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Внешние возмущения',
            marker: {
                symbol: 'square'
            },
            data: clamour

        },
            {
                name: 'Выходная величина',
                marker: {
                    symbol: 'diamond'
                },
                data: Y

            }]
    });
*/

}

var text; var myList;  var N; var sr1 = []; var sr2 = []; var sr3 = []; var afk=[];
    var mxX=[]; var mxY=[]; var DxX=[]; var DxY = []; var mxS = [] ; //Ну, так надо.
var summ3 = []; var summ4 = []; var summ5 = []; var summ6 = []; var counter = [];

    // По значению строить АФК
    function autoСorrelation(htmlObject) {
         text = document.getElementById(htmlObject); //создаём объект, состоящий из всех данных html-формы
         myList = text.value.replace(',','.').split('\n');//создаётся массив данных из формы
         N = (myList.length-1); //На сколько шагов пройти вперёд
        for (var j = 0; j < N; j++) {
            counter[j]=j; //Счетчик
            sr1[j]=[]; sr2[j]=[]; summ3[j] = 0; summ4[j]=0; summ6[j]=0; summ5[j]=0; sr3[j]=0;
            for (var i = 0; i < myList.length-j; i++) {
                myList[i]=myList[i].replace(',','.');
                sr1[j][i]=myList[i]; //Верно
                summ3[j] = summ3[j]+ parseFloat(myList[i]);
                summ4[j] = summ4[j]+ parseFloat(Math.pow(myList[i],2));
            }
            for (var i = j; i < myList.length; i++) {
                myList[i]=myList[i].replace(',','.');
                summ6[j] = summ6[j]+ parseFloat(myList[i]);
                summ5[j] = summ5[j]+ parseFloat(Math.pow(myList[i],2));
                sr2[j][i-j]=myList[i];
            }
            for (var i = 0; i < myList.length-j; i++) {
                sr3[j] += parseFloat(sr1[j][i]*sr2[j][i]);
            }

            mxX[j] = (summ3[j]/(myList.length-j));
            mxY[j] = (summ6[j]/(myList.length-j));
            DxX[j] = (summ4[j]/(myList.length-j)-Math.pow(mxX[j], 2));
            DxY[j] = (summ5[j]/(myList.length-j)-Math.pow(mxY[j], 2));
            mxS[j] = (sr3[j]/(myList.length-j)); //произведение ср х*y
            afk[j] = (mxS[j] - mxY[j]*mxX[j])/(Math.sqrt(DxX[j])*Math.sqrt(DxY[j]));
        }
        document.getElementById('afkvalueU').innerHTML = afk.join('\n').replace( /\./g, "," );

        Highcharts.chart('scheduleU', {//Построение графика
            title: {
                text: 'График автокорреляционной функции',
                x: -20 //center
            },
            xAxis: {

                categories: counter
            },
            yAxis: {

                title: {
                    text: 'Коэффициенты'
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
            series: [{name: htmlObject, data: afk, stack: '1'}]
        });
    }





// По выбранному значению строить СРЕДНЕКВ
function autoStdeviation() {
     text = document.getElementById("afkvalueSrd"); //создаём объект, состоящий из всех данных html-формы
     myList =  text.value.split('\n');//создаётся массив данных из формы
     N = myList.length;
     data = [];

    for (i = 0; i<N; i++){
        myList[i]=parseFloat(myList[i]);
        data[i] = myList[i];
        counter[i] = i;
    }

    Highcharts.chart('scheduleSrd', {//Построение графика
        title: {
            text: 'График среднеквадратического отклонения ',
            x: -20 //center
        },
        xAxis: {

            categories: counter
        },
        yAxis: {

            title: {
                text: 'Коэффициенты'
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
        series: [{name: 'valueSrd', data: data, stack: '1'}]
    });
}

//График задания
function targetProcess(i,zadanie) {
    target[i] = zadanie;

}