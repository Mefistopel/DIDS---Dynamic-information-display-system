
    var canvas = this.__canvas = new fabric.StaticCanvas('canvas');
    fabric.Object.prototype.transparentCorners = false;




    //котлован
     var furnace = new fabric.Path('M 0 0 L 0 250 Q 170, 390, 340, 250 L 340 0 L 360 0 L 360 250 Q 170 430 -20 250 L -20 0 z', { fill: '#800000', stroke: 'black' });
        furnace.set({ left: 100, top: 150,     selectable: false });
    //печь
     var furnace1 = new fabric.Path('M 0 0 L 0 380 L 420 380 L 420 0 L 400 0 L 400 270 Q 200 450 21 269 L 21 0  L 400 0 L 400 21  L 21 21 L 21 0 z', { fill: 'black', stroke: 'black' });
        furnace1.set({ left: 80, top: 130,     selectable: false });

    var candle = []; //свечи
    var torch = []; //факелы
    for (var i=0; i<3; i++){
       candle[i] = new fabric.Path('M 0 0 L 0 150 Q 10, 170, 20, 150 L 20 0 z', {
        fill: '#696969', stroke: '' });
         candle[i].set({
          left: 160+i*110,
          top: 50,
          selectable: false });
        torch[i] = new fabric.Path('M 0 0 L 0 10 Q 10, 90, 20, 10 L 20 0 z', {
         fill: '#00BFFF', stroke: '#FFE4E1'            });
          torch[i].set({
          left: 160+i*110,
          top: 200,
          selectable: false });
     }
    var text = new fabric.Text('Режим:', { left: 425, top: 25, fontSize: 18, selectable: false });
    var text2 = new fabric.Text('Температура:', { left: 425, top: 50, fontSize: 18, selectable: false });
    var text3 = new fabric.Text('Вес:', { left: 425, top: 75, fontSize: 18, selectable: false });
    var text4 = new fabric.Text('Время работы:', { left: 425, top: 100, fontSize: 18, selectable: false });
    canvas.add( text, text2, text3, text4);

     var condition; FuncCondition ('Не активно', 'black');
    function FuncCondition(displ, color) {//функция отображения статуса
      canvas.remove(condition);
      condition =  new fabric.Text(displ, { left: 490, top: 25, fontSize: 18, fill: color, selectable: false });canvas.add(condition);
    }

    var weight; FuncWeight(0);
    function FuncWeight(displ) { //функция отображения веса
      canvas.remove(weight);
      weight = new fabric.Text(displ.toFixed(3) + ' т.', { left: 470, top: 75, fontSize: 18, selectable: false });canvas.add(weight);
    }

    var temp; FuncTemp(0);
    function FuncTemp(displ) {//функция отображения температуры
      canvas.remove(temp);
      temp = new fabric.Text(displ +' °t', { left: 540, top: 50, fontSize: 18, selectable: false });canvas.add(temp);
    }


    var sec; FuncSec(0);
    function FuncSec(displ) {//функция отображения времени
      canvas.remove(sec);
      sec = new fabric.Text(' '+displ + ' cек.', { left: 540, top: 100, fontSize: 18, selectable: false });canvas.add(sec);
          }

    function Timer()  { //функция таймера
       if (timer) clearInterval(timer);
       timer = setInterval(
          function () {
           secs++;
           FuncSec(secs);
         }, 1000);
           }

    window.metal_one_kind = new Array(); window.metal_two_kind = new Array();
    var clonedStartPoints = [];
    window.polygon = [];
    window.startPoints = [ //слитки
       {x: 0, y: 0}, //
       {x: 0, y: 20},//
       {x: 10, y: 20},
       {x: 20, y: 20},
       {x: 30, y: 20},
       {x: 40, y: 20},//
       {x: 40, y: 0}//
     ];
    window.endPoints = [ //слитки расплавлены
       {x: -20, y: 140}, //
       {x: -20, y: 180}, //
       {x: 0, y: 180},
       {x: 20, y: 175},
       {x: 30, y: 180},
       {x: 40, y: 180}, //
       {x: 40, y: 150} //
     ];
       window.startPoints1 = [ // координаты самого первого объекта = "расплавленного металла"
          {x: 0, y: 0}, //0
          {x: 36, y:0 },
          {x: 72, y:0 },
          {x: 108, y:0 },
          {x: 144, y:0 }, //4
          {x: 180, y: 0},
          {x: 216, y:0 },
          {x: 252, y:0 },
          {x: 288, y:0 }, //8
          {x: 324, y:0 },
          {x: 360, y:0 },
          {x: 360, y:40 },
          {x: 0,  y:40 } //12
        ];
        window.slagStart = [ //шлак начальный
          {x: 0, y: -1}, //0
          {x: 36, y:-1 },
          {x: 72, y:-1 },
          {x: 108, y:-1 },
          {x: 144, y:-1 }, //4
          {x: 180, y: -1},
          {x: 216, y:-1 },
          {x: 252, y:-1 },
          {x: 288, y:-1 }, //8
          {x: 324, y:-1 },
          {x: 360, y:-1 },
          {x: 360, y:40 },
          {x: 0,  y:40 } //12
          ];
          var clonedSlag;
    clonedSlag = slagStart.map(function(o){ //функция клонирования свойств объекта
      return fabric.util.object.clone(o);
    });
        window.slagEnd = [
          {x: -40, y: -178}, //0
          {x: 0, y: -178},
          {x: 40, y: -178},
          {x: 80, y: -178},
          {x: 120, y: -178}, //4
          {x: 160, y: -178},
          {x: 200, y: -178},
          {x: 240, y: -178},
          {x: 280, y: -178}, //8
          {x: 320, y: -178},
          {x: 360, y: -178},
          {x: 360, y: 40},
          {x: -40, y: 40} //12
          ];

       window.endPoints1 = [// координаты "заполненного" котла
          {x: -40, y: -170}, //0
          {x: 0, y: -170},
          {x: 40, y: -170},
          {x: 80, y: -170},
          {x: 120, y: -170}, //4
          {x: 160, y: -170},
          {x: 200, y: -170},
          {x: 240, y: -170},
          {x: 280, y: -170}, //8
          {x: 320, y: -170},
          {x: 360, y: -170},
          {x: 360, y: 40},
          {x: -40, y: 40} //12
        ];
        var clonedStartPoints1;
          clonedStartPoints1 = startPoints1.map(function(o){ //функция клонирования свойств объекта
            return fabric.util.object.clone(o);
          });
          window.slagWave = [
            {x: -40, y: -153}, //0
            {x: 0, y: -168},
            {x: 40, y: -173},
            {x: 80, y: -168},
            {x: 120, y: -173}, //4
            {x: 160, y: -168},
            {x: 200, y: -173},
            {x: 240, y: -168},
            {x: 280, y: -173}, //8
            {x: 320, y: -168},
            {x: 360, y: -173},
            {x: 360, y: 40},
            {x: -40, y: 40} //12
            ];

        window.endPoints2 = [ // координаты "волн" желтого объекта
          {x: -40, y: -150}, //0
          {x: 0, y: -160},
          {x: 40, y: -165},
          {x: 80, y: -160},
          {x: 120, y: -165}, //4
          {x: 160, y: -160},
          {x: 200, y: -165},
          {x: 240, y: -160},
          {x: 280, y: -165}, //8
          {x: 320, y: -160},
          {x: 360, y: -165},
          {x: 360, y: 40},
          {x: -40, y: 40} //12
        ];
        window.endPoints3 = [ // координаты "выливания"
           {x: 170, y: 40}, //0
           {x: 170, y: 40},
           {x: 170, y: 40},
           {x: 170, y: 40},
           {x: 170, y: 40}, //4
           {x: 170, y: 40},
           {x: 200, y: -50},
           {x: 300, y: -305},
           {x: 350, y: -400}, //8
           {x: 340, y: -300},
           {x: 360, y: -300},
           {x: 360, y: 40},
           {x: 170, y: 40} //12
         ];
        window.endPoints4 = [ //координатыы "болота"
           {x: -40, y: -0}, //0
           {x: 0, y: -0},
           {x: 40, y: -0},
           {x: 80, y: -0},
           {x: 120, y: -0}, //4
           {x: 160, y: -0},
           {x: 200, y: -0},
           {x: 240, y: -0},
           {x: 280, y: -0}, //8
           {x: 320, y: -0},
           {x: 360, y: -0},
           {x: 360, y: 40},
           {x: -40, y: 40} //12
         ];
        window.systemGroup =  new fabric.Group([furnace,furnace1],{selectable: false});
        canvas.add(systemGroup);
        window.candleGroup = new fabric.Group([candle[0], candle[1], candle[2]],{selectable: false}); //группирование объектов
          canvas.add( candleGroup);

     window.len = true; window.LenFifth = true;
           function rewrite(group){ //перезапись объектов, чтобы появляющиеся после объекты не накладывались сверху на печь
             canvas.remove(group);
             canvas.add(group);
      }

function addPolygon1() { // фунция добавления "расплавленного металла" = желтого объекта
        polygon1 = new fabric.Polygon(clonedStartPoints1, { //фигура и её свойства
        left: 125,
        top: 440,
        selectable: false
      });

      slag = new fabric.Polygon(clonedSlag, { //фигура и её свойства
            left: 125,
            top: 440,
            fill: '#696969',
            selectable: false
          });
        canvas.add(slag)
      canvas.add(polygon1);

           }
function ObjectMettal() {
  canvas.remove(candleGroup);
  clonedStartPoints = startPoints.map(function(o){ //функция клонирования свойств объекта
       return fabric.util.object.clone(o);
     });

     var strPolygon = '['; var strMetall = '[';
         OneOn = 2;
        for (s = 0; s<5; s++){
          polygon[s] = new fabric.Polygon(clonedStartPoints, { //фигура и её свойства
             left: 175+s*50,
             top: 115+ 4.4 * 40,
             angle: fabric.util.getRandomInt(-60, 30),
             fill: 'rgba(128,0,0,0.8)',
             selectable: false
           });
           if (s !=4) { //чтобы все объекты можно было записать в длинную строчку и передать для группировки в код
             strPolygon += 'polygon['+(s)+'], ';
           } else strPolygon += 'polygon['+(s)+']] ';

      }
      strPolygon = eval(strPolygon); //преобразование из строкового в программу
      window.polygonGroup = new fabric.Group(strPolygon,{}); //группирование объектов
        canvas.add( polygonGroup);
  //объекты, изображавшие металл
    for (var i=0; i<9; i++){ //объекты по горизонтали
      metal_one_kind[i] = new Array();
      metal_two_kind[i] = new Array();
     for (var j=0; j<10; j++){ //сколько будет горизонтальных объектов
      if (j !=9  ){z = j;} else { z = 2;}//для top, чтобы не вышло за рамки объекта
      //слитки
     metal_one_kind[i][j] = new fabric.Path('M 0 0 L 0 20 L 40, 20 L 40 0 z', {
               fill: 'rgba(128,0,0,0.8)' });
               metal_one_kind[i][j].set({
                 left: 125+i*37,
                 top: 268+44+z* 44 ,
                 angle: fabric.util.getRandomInt(-60, 30),
                 selectable: false });
            //круги
               metal_two_kind[i][j] = new fabric.Circle({
                 radius: 11,
                 fill: 'rgba(128,0,0,0.8)',
                 left: fabric.util.getRandomInt(125, 350),
                 top: 265+44+z * fabric.util.getRandomInt(20, 36),
                selectable: false
           });
           if (i !=8 || j != 9) { //чтобы все объекты можно было записать в длинную строчку и передать для группировки в код
             strMetall += 'metal_one_kind['+(i)+']['+(j)+'], metal_two_kind['+(i)+']['+(j)+'], ';
           } else strMetall += 'metal_one_kind['+(i)+']['+(j)+'], metal_two_kind['+(i)+']['+(j)+'] ]';

    }}
    strMetall = eval(strMetall); //преобразование из строкового в программу
    window.metallGroup = new fabric.Group(strMetall,{}); //группирование объектов
      canvas.add( metallGroup);
      metallGroup.animate('top', '268', {
            from: 0,
            duration: 1500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: rewrite(systemGroup)});
  }





var z, s; var x = 0;var timer; secs = 0; window.OneOn = 1;
function patternRunOne() {//кнопка ЗАВАЛИТЬ
    (function() { //Функция удаления блока хим состава металла
        canvas.remove(carbon);
        canvas.remove(silicon);
        canvas.remove(manganese);
        canvas.remove(sulfur);
        canvas.remove(phosphorus);
        canvas.remove(aluminum);
        canvas.remove(iron);
        canvas.remove(textMetallGroup); //<---ОТОБРАЖЕНИЕ ХИМ СОСТАВА МЕТАЛЛА
    })();
    FuncCondition ('Завалка', 'green'); FuncWeight(x+=fabric.util.getRandomInt(1,5, 3));
     if (len == true) {
          Timer();//единственный раз добавляет запускает таймер
       }
      window.proviso = 1; window.even = true;
       if (OneOn == 1) { //чтобы нельзя было запустить при работающей функции
         ObjectMettal();
         //setTimeout(function(){FuncIron(90.5);FuncAluminum(0);FuncPhosphorus(0);FuncSulfur(0.008);FuncManganese(0);FuncSilicon(0);FuncCarbon(1.2);}, 1550); Обновляет данные хим состава металла
       }

  }
    window.temperature = 0;


 function patternRunSecond(){ //кнопка ПЛАВЛЕНИЕ
     (function(){
         $("#recurrent").val(0.98);
         $("#interval").val(100);
         $("#the_evaluation_time").val(14);
         $("#the_evaluation_interval").val(100);

         theImpactToSchedule.recurrent = 0.98;
         theImpactToSchedule.interval = 100;
         autoСorrelation.the_evaluation_time = 14;
         autoСorrelation.the_evaluation_interval = 100;
    })();


   canvas.add(candleGroup);
   candleGroup.animate('top', '50', { //анимация опускания свеч в печь
         from: -50,
         duration: 1500,
         onChange: canvas.renderAll.bind(canvas),
         onComplete: function(){
           canvas.remove(candleGroup);
      for (var i=0; i<3; i++){ //здесь включаются свечи
          canvas.remove(  torch[i]);
          canvas.add( torch[i]);
          candle[i].set('stroke', '#00BFFF')}
          for (var i = 0; i < polygon.length; i++) { //поворот всех объект в 0 градусов
            polygon[i].animate('angle',0,{onChange: canvas.renderAll.bind(canvas)});
          }
          rewrite(systemGroup); rewrite(candleGroup);
        } });

     timerPressure();
   FuncCondition ('Нагрев', 'red'); //Надпись
   var timer1; var stopTimer1 = true; var StopWeight = true; window.stop = 1;
   StopCooling = false;

  (function() //функция запуска изменения температуры
        {
     if (timer1) clearInterval(timer1);
     timer1 = setInterval(
     function () {

         if (stopTimer1 == true && stop !=2) {
             if(temperature<1600 && secs%1==0){ //каждую 1 секунду

               temperature+=Math.floor(Math.random() * (150 - 10 + 1)) + 10;}
               else {// случайное число в качестве температуры
                 temperature = 1600; stopTimer1 = false; //отключает изменение
               }

             FuncTemp(temperature);
              // ПАРАМЕТРЫ НА РЕГУЛИРОВАНИЕ
           }},
           1000
           );
             })();

   function animatePoint(r, prop, endPoints) { // функция анимирования плавки металла
    fabric.util.animate({
      startValue: polygon[1].points[r][prop],
      endValue: endPoints[r][prop],
      duration: 5000, //время анимации объектов "слитков, которые плавятся" = прямоугольниокв
      onChange: function(value) {
        polygon[0].points[r][prop] = value; //нужны для самой анимации, но почему-то работает для всех объектов массива
        polygon[1].points[r][prop] = value;
        polygon[3].points[r][prop] = value;
        // only render once
        if (r === startPoints.length - 1 && prop === 'y') {canvas.renderAll();}
      },
      onComplete: function() {
       if ( r==3 && prop=='y'){
         if (len == true) {
           addPolygon1(); //единственный раз добавляет желтый объект
           len = false;
         }
         polygon1.setGradient('fill', {
             x1: 0,
             y1: -polygon1.height/2,
             x2:  0,
             y2: polygon1.height,
             colorStops: {
                0: "red",
                0.1: "orange",
                0.8: "orange",
                1: "yellow"
             }
         });
        animate1(); animateSlag();
        FuncWeight(x-=Math.random() * (0.008 - 0.0004) + 0.0004);
        rewrite(systemGroup); rewrite(candleGroup);
        }
      }
    });
  }
  function animate() { //параметры для "плавления" слитков = прямоугольных объектов
    for (var r = 0, len = startPoints.length; r < len; r++) {
      animatePoint(r, 'x', true ? endPoints : startPoints);
      animatePoint(r, 'y', true ? endPoints : startPoints);
    }
  }
  setTimeout(animate, 1000); //запуск функции плавления верхнего слоя шлака

function animatePoint11(r, prop, endPoints) {//анимация заполнения рабочего пространства печи расплавленным металлом
    fabric.util.animate({
      startValue: polygon1.points[r][prop],
      endValue: endPoints1[r][prop],
      duration: 5000, //время анимации заполнения рабочего пространства печи расплавленным металлом
      onChange: function(value) {
        polygon1.points[r][prop] = value;
        // only render once
        if (r === startPoints1.length - 1 && prop === 'y') {
          canvas.renderAll();}
      },
      onComplete: function() {
        polygon1.setCoords();
        if ( r==12 && prop=='y'){
         animate2();
         rewrite(systemGroup); rewrite(candleGroup);
         FuncWeight(x-=Math.random() * (0.06 - 0.02) + 0.02); //когда расплавленный объект полностью заполнил рабочее пространство
        }
      }
    });
  }
  function animate1() { //передаём параметры в функцию "заполнения" жидким металлом рабочего пространства
    for (var r = 0, len = startPoints1.length; r < len; r++) {
      animatePoint11(r, 'x',  endPoints1);
      animatePoint11(r, 'y',  endPoints1);
    }
  }
// БЛОК ДЛЯ АНИМАЦИИ ШЛАКА
function animateSlagTrue(r, prop, endPoints) {
    fabric.util.animate({
      startValue: slag.points[r][prop],
      endValue: endPoints[r][prop],
      duration: 5000,
      onChange: function(value) {
        slag.points[r][prop] = value;
        // only render once
        if (r === slagEnd.length - 1 && prop === 'y') {
          canvas.renderAll();
        }
      },
      onComplete: function() {
        slag.setCoords();
        // only start animation once
      }
    });
  }

  function animateSlag() { //передаём параметры в функцию "заполнения" жидким металлом рабочего пространства
      for (var r = 0, len = slagStart.length; r < len; r++) {
        animateSlagTrue(r, 'x', slagEnd);
        animateSlagTrue(r, 'y', slagEnd);
      }
  }

  function animateSlagWave(r, prop, endPoints2) {

    fabric.util.animate({
      startValue: slag.points[r][prop],
      endValue: endPoints2[r][prop],
      duration: 1000,
      onChange: function(value) {
        slag.points[r][prop] = value;
        // only render once
        if (r === endPoints1.length - 1 && prop === 'y') {
          canvas.renderAll();
        }
      },
     easing: fabric.util.ease.easeOutBounce,
      onComplete: function() {
        slag.setCoords();
        // only start animation once
      }
    });
  }

//ЗАКАНЧИВАЕТСЯ БЛОК АНИМАЦИИ ШЛАКА
var stopAnimate2 = true;
  function animatePoint2(r, prop, endPoints2) {

    fabric.util.animate({
      startValue: polygon1.points[r][prop],
      endValue: endPoints2[r][prop],
      duration: 1000,
      onChange: function(value) {
        polygon1.points[r][prop] = value;
        // only render once
        if (r === endPoints1.length - 1 && prop === 'y') {
          canvas.renderAll();
        }
      },
     easing: fabric.util.ease.easeOutBounce,
      onComplete: function() {
        polygon1.setCoords();
        // only start animation once
        if (r === endPoints1.length - 1 && prop === 'y') {
          even = !even;
          if (StopWeight == true) {
            for (i = 0; i < 2; i++) {
              FuncWeight(x-=Math.random() * (0.001 - 0.0005) + 0.0005);
              canvas.remove(polygonGroup, metallGroup); // плавка и расход веса - два раза
            }
            StopWeight = false; //исключить измениние веса, а то при длительном времени уйдём в минус веса
          }
          if (stopAnimate2 == true) {
            animate2();

          }

        }
      }
    });
  }
  function animate2() { // функция, изображающая максимальное плавление и волны в металле
    if (stop != 2) {
      for (var r = 0, len = endPoints1.length; r < len; r++) {
        animatePoint2(r, 'x', even ? endPoints1 : endPoints2);
        animatePoint2(r, 'y', even ? endPoints1 : endPoints2);
        animateSlagWave(r, 'x', even ? slagEnd : slagWave);
        animateSlagWave(r, 'y', even ? slagEnd : slagWave);
      }
    } else {
      for (var r = 0, len = endPoints1.length; r < len; r++) {
        animatePoint2(r, 'x', endPoints1);
        animatePoint2(r, 'y', endPoints1);
        animateSlagWave(r, 'x', slagEnd);
        animateSlagWave(r, 'y', slagEnd);
      } stopAnimate2 = false;}}
 }


 window.StopCooling = true;
function patternRunThird() { //кнопка ОТКЛЮЧИТЬ СВЕЧИ
  FuncCondition ('Простой', '#8B008B');StopCooling = true
    stop = 2; proviso = 1; OneOn = 1;
    for (var i=0; i<3; i++){ //здесь отключаются свечи
     canvas.remove(  torch[i]);
     candle[i].set('stroke', '');
    }

     cooling();
     function cooling() { //охлаждение при остывании. Отнимает температуру
       if (StopCooling == true ) { //здесь отключаем при значении переменной false

         if (temperature != 0) { //чтобы температура не ушла в минус
            setTimeout(function(){FuncTemp(temperature-=(Math.floor(Math.random() * (3 - 1 + 1)) + 1));}, 2000);
            setTimeout(cooling, 2000); //каждые 2 секунды запускает функцию
         }else {
           FuncTemp(0);
         }

       }
     }
}



function patternRunFourth() { //кнопка ПРОИЗВЕСТИ РАСКИСЛЕНИЕ
    stopTimerWei = setInterval(function(){if (stop !=2) { // каждые 10 секунд отнимает от веса случайное число. Мол, свечи ключены и металл плавится, а значит с паром некоторый вес уходит
      FuncWeight(x-=Math.random() * (0.002 - 0.001) + 0.001)
    } else clearInterval(stopTimerWei)}, 10000);
window.stop = 1; StopCooling = true;
FuncCondition ('Раскисление', ' #00008B');var scavengers = []; var str = '[';
  for (var i = 0; i < 70; i++) { // сколько маленьких шариков
      scavengers[i] = new fabric.Circle({
      radius: 3, fill: 'blue', left: 100, top: 100
    });
      scavengers[i].set({
                left: 130+i*4.6,
                top: 10,
                angle: fabric.util.getRandomInt(-60, 60),
                selectable: false });
      if (i !=69) { //чтобы все объекты можно было записать в длинную строчку и передать для группировки в код
        str += 'scavengers['+(i)+'], ';
      } else str += 'scavengers['+(i)+']] ';
                }
    str = eval(str); //преобразование из строкового в программу
    var scavengersGroup = new fabric.Group(str,{}); //группирование объектов
      canvas.add( scavengersGroup);
      scavengersGroup.animate('top', fabric.util.getRandomInt(285, 300), {
          onChange:   canvas.renderAll.bind(canvas),
          onComplete: function () {
            canvas.remove(scavengersGroup);
            FuncWeight(x+=Math.random() * (0.08 - 0.02) + 0.02); // добавляет вес раскислителей

              FuncTemp(temperature-=Math.floor(Math.random() * (60 - 10 + 1)) + 10);

             //изменение температуры, т.к. раскислители холодные
            deoxidizationTemp()
            function deoxidizationTemp() { //функция добавления температуры до max "маленькими шажками"
            if (stop !=2) {
              if (temperature<1600 ) {
                setTimeout(function(){temperature+=(Math.floor(Math.random() * (10 - 1 + 1)) + 1);FuncTemp(temperature);}, 1500);
                setTimeout(deoxidizationTemp, 1500);
              } else FuncTemp(1600);
            }
            }
          }

        });StopCooling = false;

}



var singleton; // переменная для анимации "выливания" металла из котла
function patternRunFifth() { //пятая кнопка

  candleGroup.animate('top', '-100', {
      onChange:   canvas.renderAll.bind(canvas),
      duration: 1500,
      onComplete: function(){canvas.remove(candleGroup);}
  });
  FuncCondition ('Слив металла', '#778899');
    var t = 0; StopCooling = false; //отключаем функцию cooling
    if (proviso == 1) { //чтобы нельзя было запустить при работающей функции
      setTimeout(Union, 1000);
    }
    function Union(){proviso = 2; //для отключения второго запуска
      if (LenFifth == true) { // единожды это делает, чтобы сгруппировать все объекты на холсте
        canvas.remove(systemGroup, polygon1, slag);
         systemGroup =  new fabric.Group([slag,polygon1,systemGroup],{});
           systemGroup.set({selectable: false});
                       canvas.add(systemGroup);
      }
    AngleSystem(0 , 60); //передаёт параметры для поворота печи
    betaTest(); //запускаем
  }

   function AngleSystem(sV,eV) { // функция поворота печи
      fabric.util.animate(
        {
              startValue: sV,
              endValue: eV,
              duration: 1000,
              onChange: function(value) {
                  ter = value;
                  systemGroup.setAngle(ter)
                  canvas.renderAll();},
              onComplete: function () {systemGroup.setCoords();}
      });
    }

function betaTest() {
  singleton = true; // true - при наклоне происходит "выливание"
  setTimeout(animate3(), 1000); //единожды
  setTimeout(function(){
          canvas.add( textMetallGroup); //<---ОТОБРАЖЕНИЕ ХИМ СОСТАВА МЕТАЛЛА
          funcAddChemicalElement(getRandomArbitrary(46, 54) / 100, getRandomArbitrary(17,37)/ 100, getRandomArbitrary(50,80)/ 100,
              getRandomArbitrary(35,40)/ 1000, getRandomArbitrary(5,8)/ 100, getRandomArbitrary(80,110)/ 100,
              getRandomArbitrary(35,40)/ 1000);//<---ОТОБРАЖЕНИЕ ЭЛЕМЕНТОВ % ХИМ СОСТАВА МЕТАЛЛА
    AngleSystem(60,0); //передаёт параметры на наклон в 90 градусов
    FuncWeight(x=Math.random() * (0.7 - 0.4) + 0.4); // вес болота
    FuncCondition ('Не активно', 'black'); // отображение статуса
    window.StopCooling = true;
    delete  even; delete polygonGroup; delete metallGroup; //удаляем переменные
    polygon1.setGradient('fill', { //Изменяем цвет желтого-красного обеъекта
        x1: 0,
        y1: -polygon1.height/2,
        x2:  0,
        y2: polygon1.height,
        colorStops: {
           0: "red",
           0.1: "orange",
           0.8: "red",
           1: "red"
        }
    });
  },
     2500); //единожды запускается и ОЧЕНЬ ПОЛЕЗНАЯ
var endIng = 0;
  function animate3() {//параметры для анимации в fabric.util.animate
    if (endIng != 1) { //ЧТОБЫ НЕ БЫЛО ЦИКЛА И ПАМЯТЬ НЕ ЗАБИВАЛАСЬ
      for ( r = 0, len = endPoints3.length; r < len; r++) {
        animatePoint3(polygon1,r, 'x', singleton ? endPoints3 : endPoints4);
        animatePoint3(polygon1,r, 'y', singleton ? endPoints3 : endPoints4);
        animatePoint3(slag,r, 'x', singleton ? endPoints3 : endPoints4);
        animatePoint3(slag,r, 'y', singleton ? endPoints3 : endPoints4);
      }
      endIng +=1;
    }

}
function animatePoint3(polygon1,r, prop, endPoints3) { //сама анимация объекта: "выливание" и "заливание"

  fabric.util.animate({
    startValue: polygon1.points[r][prop],
    endValue: endPoints3[r][prop],
    duration: 2500,
    onChange: function(value) {
      polygon1.points[r][prop] = value;
      // only render once
      if (r === endPoints3.length - 1 && prop === 'y') {
        canvas.renderAll();
      }
    },
    onComplete: function() {
      polygon1.setCoords();
      FuncTemp(temperature=Math.floor(Math.random() * (25 - 20 + 1)) + 20);
      if (r === endPoints3.length - 1 && prop === 'y') {
        singleton = false;  // для заливания "болота" обратно в котёл
        LenFifth = false; //единожды
        if (proviso != 1) {
          animate3();
        }
      }
    }
  });
}}}

/* Код можно сократить и сделать компактным, вынеся функцию fabric.util.animate и передавая ей множество параметров. Это уменьшит размер кода примерно в 2~3 раза.
Функция delete работает, но только для некоторых объектов. Можно сделать немного искуснее.
Над этим работал Андрей Янусов, контакт для связи: morphingsleep@gmail.com
Написан за 1 месяц прерывной работы в Июле-Августе 2016 года. Новокузнецк.
Также следует заметить, что в функции setTimeout нужно настраивать самостоятельно, запуски анимации во множестве раз зависят от этих функций. Если переносить код на реальный объект, необходимо избавиться от этих функций.*/
/*
Правки в код осуществлены 27.03.2017
 */