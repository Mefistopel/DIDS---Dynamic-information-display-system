var canvas_pressure = this.__canvas = new fabric.StaticCanvas('canvas_pressure');
fabric.Object.prototype.transparentCorners = false;


var pressureText = new fabric.Text('Давление газов под сводом печи:', { left: 10, top: 15, fontSize: 21,
    fill: 'DarkSlateGrey', selectable: false });
canvas_pressure.add(pressureText);
var pressure;
function funcPressure(displ) {//функция отображения давления
    canvas_pressure.remove(pressure);
    misl = (Math.round(displ*1000)/1000);
    pressure = new fabric.Text(misl +' Па', { left: 330, top: 15, fontSize: 21, fill: 'DarkSlateGrey', selectable: false });
    canvas_pressure.add(pressure);
}

var objectRegutalation = new Vue({
    el: '#coefficientModel',
    data: {
        ratio: '-1.8',
        standing: '11',
        delay: '5'
    }
});
//Переменные для функции systemRegulationPressure
window.Y = [];window.U = [];window.Upr = []; window.Uint = []; window.Ep = []; window.Yu = []; window.c1; window.c2;
window.target = []; window.counter_pressure = []; window.clamour = []; window.Ep_sqr = []; window.Q_srv = [];
window.fet = 0;


var PIDregutalation = new Vue({
    el: '#coefficientRegulation',
    data: {
        checked: false,
        selected: 'B',
        options: [
            { text: '1. Вручную', value: "A" },
            { text: '2. По Ротачу В.Я.', value: 'B' },
            { text: '3. С системы 2', value: 'C' }
        ],
        proportional_test:0,
        integral_test: 0,
        styleObject: {
            display: 'none'
        }
    },
    computed: {
        proportional: {
            get: function () {
                if (this.selected == 'A'){
                    this.styleObject.display = 'block';
                    if (this.checked == true){
                        return this.proportional_test
                    }
                }
                if (this.selected == 'B'){
                    this.styleObject.display = 'none'; this.checked = false;
                    // ВАЖНО: proportional_test - это переменная! А this.proportional_test - одно из свойств ОБЪЕКТА
                    proportional_test = objectRegutalation.standing/(objectRegutalation.ratio*objectRegutalation.delay);
                    return proportional_test;
                } else if (this.selected == 'C'){
                    this.styleObject.display = 'none'; this.checked = false;
                    proportional_test = eval('likeness.proportional_likeness_'+city);
                    return proportional_test;
                } else return proportional_test
            }
        },
        integral: {
            get: function () {
                if (this.selected == 'A'){
                    if (this.checked == true){
                        return this.integral_test
                    }
                }
                if (this.selected == 'B'){
                    integral_test = 0.1 /(objectRegutalation.ratio*objectRegutalation.delay);
                    return integral_test;
                } else if (this.selected == 'C'){
                    integral_test = eval('likeness.integral_likeness_'+city);
                    return integral_test;
                } else return integral_test
            }
        },
        combination: {
            get: function () {
                y_targer = 0;
                systemRegulationPressure(fet, objectRegutalation.ratio,objectRegutalation.standing,objectRegutalation.delay,
                    this.proportional,this.integral)
                return (this.proportional+" "+this.integral);
            }
        }
    }
});

function systemRegulationPressure(i,k, T, tt,Kp,Kint){
    /* i - индекс заполнения массива
     y - задание
     k - коэффициент передачи объекта упр
     T - постоянная времени объекта упр
     tt - запаздывание объекта упр
     dt - шаг дискретизации
     */
    for (i ; i < disturbance.length; i++){
        c1 = Math.exp(-(0.1/T));
        c2 =(k*(1-c1));
        X = Math.ceil(tt/0.1);
        clamour [i] = parseFloat(disturbance[i].replace(',','.')); // шум
        if (i != 0){
            if (i>X){
                Yu[i] = ((U[i-X]*c2+c1*Yu[i-1]));
            } else {Yu[i] = c1*Yu[i-1]}
            Y[i] = clamour [i]+Yu[i]; //
            Ep[i] = parseFloat(y_targer-Y[i]);//Отклонение от заданного
            Upr[i] = parseFloat(Kp * Ep[i]); //пропорциональная составляющая закона регулирования,
            Uint[i] = (Uint[i-1]+Kint*Ep[i]); //интегральная составляющая закона регулирования,
            U[i] = (Upr[i] + Uint[i]); //закон регулирования
            Ep_sqr[i] = Math.pow(Ep[i], 2);

        }
        else {
            Ep[i] = 0;
            Upr[i] = 0;
            Uint[i] = 0;
            U[i] = 0;
            Yu[i] = 0;
            Y[i] = 0;
            Ep_sqr[i] = 0;
            Q_srv[i] = 0;
        }
    }
}
function valueQ_srv(alpha){
    for (var i = 1; i<disturbance.length; i++){
        Q_srv[i] = alpha*Q_srv[i-1]+(1-alpha)*Math.sqrt(Ep_sqr[i]);
    }
}

function transfer(){
    PIDregutalation.checked = false;
}

var theImpactToSchedule = new Vue({
    el: '#checkboxes',
    data: {
        checkedNames: ['true']
    },
    computed: {
        recurrent: {
            set: function (newValue) {
                valueQ_srv(newValue)
            }
        },
        interval: {
            // сеттер:
            set: function (newValue) {
                supportGraphics(newValue)
                autoSTDeviation(newValue)
            }
        }
    }
});

var autoСorrelation = new Vue({
    el: '#block1',
    data: {
        the_evaluation_exhibitor: 0,
        the_evaluation_time: ''
    },
    computed: {
        the_evaluation_interval: {
            // сеттер:
            get: function () {
                this.the_evaluation_time
            },
            set: function (newValue) {
                N = newValue;
                if (typeof counterAutoGraphics !=="undefined"){
                    clearInterval(counterAutoGraphics)
                }
                autoСorrelationFunc(N);
                correlationGraphics(newValue, this.the_evaluation_time)

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



    // По значению строить АФК
    function autoСorrelationFunc(N) {
        var myList = Yu;
        var sr1 = []; var sr2 = []; var sr3 = []; window.afk =[];var mxX=[]; var mxY=[]; var DxX=[]; var DxY=[]; var mxS=[] ; //Ну, так надо.
        var summ3 = []; var summ4 = []; var summ5 = []; var summ6 = []; var counter=[];
        for (var j = 0; j < N; j++) {
            counter[j]=j; //Счетчик
            sr1[j]=[]; sr2[j]=[]; summ3[j] = 0; summ4[j]=0; summ6[j]=0; summ5[j]=0; sr3[j]=0;
            for (var i = 0; i < myList.length-j; i++) {
                myList[i]=myList[i];
                sr1[j][i]=myList[i]; //Верно
                summ3[j] = summ3[j]+ parseFloat(myList[i]);
                summ4[j] = summ4[j]+ parseFloat(Math.pow(myList[i],2));
            }
            for (var i = j; i < myList.length; i++) {
                myList[i]=myList[i];
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

    }


