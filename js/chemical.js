//Начало блока Статического текста хим состава
var text5 = new fabric.Text('Химический состав', { left: 510, top: 150, fill: 'Teal', fontSize: 18, selectable: false });
var text6 = new fabric.Text('металла:', { left: 510, top: 165, fill: 'Teal', fontSize: 18, selectable: false });
var text7 = new fabric.Text('C (углерод):', { left: 510, top: 185, fontSize: 18, selectable: false });
var text8 = new fabric.Text('Si (кремний):', { left: 510, top: 225, fontSize: 18, selectable: false });
var text9 = new fabric.Text('Mn (марганец):', { left: 510, top: 265, fontSize: 18, selectable: false });
var text10 = new fabric.Text('S (сера):', { left: 510, top: 305, fontSize: 18, selectable: false });
var text11 = new fabric.Text('P (фосфор):', { left: 510, top: 345, fontSize: 18, selectable: false });
var text12 = new fabric.Text('Al (алюминий):', { left: 510, top: 385, fontSize: 18, selectable: false });
var text13 = new fabric.Text('Сr (хром):', { left: 510, top: 425, fontSize: 18, selectable: false });
var textMetallGroup = new fabric.Group([text5, text6, text7, text8,text9, text10, text11, text12, text13],{selectable: false}); //группирование объектов хим состава металла
//Конец блока Статического текста хим состава

function funcAddChemicalElement(carbon, silicon, manganese, sulfur, phosphorus, aluminum, iron, nickel) //функция для автоматического задания значений элементов хим
{
    FuncCarbon(carbon);FuncSilicon(silicon);FuncManganese(manganese); FuncSulfur(sulfur);
    FuncPhosphorus(phosphorus);FuncAluminum(aluminum);FuncIron(iron);
}

//Начало блока Динамического текста хим состава
var carbon;
function FuncCarbon(displ) {//функция отображения углерода
  canvas.remove(carbon);
  carbon = new fabric.Text(displ +' %', { left: 540, top: 205, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(carbon);
    quqiFunction("carbon", displ);
}
var silicon;
function FuncSilicon(displ) {//функция отображения кремния
  canvas.remove(silicon);
  silicon = new fabric.Text(displ +' %', { left: 540, top: 245, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(silicon);
    quqiFunction("silicon", displ);
}
var manganese;
function FuncManganese(displ) {//функция отображения марганца
  canvas.remove(manganese);
  manganese = new fabric.Text(displ +' %', { left: 540, top: 285, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(manganese);
    quqiFunction("manganese", displ);
}
var sulfur;
function FuncSulfur(displ) {//функция отображения серы
  canvas.remove(sulfur);
  sulfur = new fabric.Text(displ +' %', { left: 540, top: 325, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(sulfur);
    quqiFunction("sulfur", displ);
}
var phosphorus;
function FuncPhosphorus(displ) {//функция отображения фосфора
  canvas.remove(phosphorus);
  phosphorus = new fabric.Text(displ +' %', { left: 540, top: 365, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(phosphorus);
    quqiFunction("phosphorus", displ);
}
var aluminum;
function FuncAluminum(displ) {//функция отображения фосфора
  canvas.remove(aluminum);
  aluminum = new fabric.Text(displ +' %', { left: 540, top: 405, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(aluminum);
    quqiFunction("aluminum", displ);
}

var iron;
function FuncIron(displ) {//функция отображения железа
  canvas.remove(iron);
  iron = new fabric.Text(displ +' %', { left: 540, top: 445, fontSize: 18, fill: 'Teal', selectable: false });canvas.add(iron);
    quqiFunction("iron", displ);
}

//Конец блока Динамического текста хим состава

//НАЧАЛО Функции генерации случайных чисел в выбранном диапазоне
function getRandomArbitrary(min, max) {
    randomArbitrary = Math.random() * (max - min) + min;
    return randomArbitrary.toFixed(0)
}//КОНЕЦ Функции генерации случайных чисел в выбранном диапазоне




//Данные сохраняются в текстовые поля, где каждое данное занимает строку и идёт добавление
/*var ifOne = true;
function saveData(htmlObject, valueChemical) {
    if (ifOne) {
        document.getElementById(htmlObject).value +=valueChemical;
        std_deviation(htmlObject);
        ifOne = false;
    } else   document.getElementById(htmlObject).value +="\n"+valueChemical;
    std_deviation(htmlObject);
}
*/

function quqiFunction(htmlObject, Std){ //куки функция
    eval('document.cookie = "'+htmlObject+'_std_'+city+'='+Std+'"'); //создаёт куки документа

}
var summ; var summ2; var totalizer = true;
function std_deviation(htmlObject){ //Функция среденеквадратического отклонения
     summ = 0;  summ2 = 0;
     text = document.getElementById(htmlObject); //создаём объект, состоящий из всех данных html-формы
     myList = text.value.replace(',','.').split('\n');//создаётся массив данных из формы
    for (var i = 0; i < myList.length; i++) {
        summ = summ+  parseFloat(myList[i]); //суммирует все данные U
        summ2 = summ2+ parseFloat(Math.pow(myList[i],2)); //данные в квадрате U
    }
    mx = Math.round((summ/myList.length)*10000)/10000; //мат ожидание U
    Dx = Math.round(((summ2/myList.length)-Math.pow(mx, 2))*10000)/10000; //дисперсия U
    Std = Math.round(Math.sqrt(Dx)*100000)/100000; //Среднеквадратическое отклонение
    eval('document.getElementById("'+htmlObject+'_std_'+city+'").innerHTML='+Std);

    if (totalizer){
        document.getElementById('afkvalueSrd').value =Std;
        totalizer = false;
    } else document.getElementById('afkvalueSrd').value +="\n"+Std;



    eval('document.cookie = "'+htmlObject+'_std_'+city+'='+Std+'"'); //создаёт куки документа

}









