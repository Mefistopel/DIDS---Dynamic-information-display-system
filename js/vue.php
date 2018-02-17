<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>re</title>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>

<script src="https://code.highcharts.com/modules/exporting.js"></script>

    </head>
  <body>
  <div id="exab" class="row" >
      <p align="left">Параметры модели объекта регулирования</p>
      <div>
          <p>k</p>
          <input  v-model="ratio" placeholder="k">
          <p>Введённое сообщение: {{ ratio }}</p>
      </div>
      <div>
          <p>T</p>
          <input    placeholder="T">
          <p>Введённое сообщение: {{ asar }}</p>

      </div>

  </div>
  <script type="text/javascript">
      var app = new Vue({
          el: '#exab',
          data: {
              ratio: ''
          },
          computed: {
              asar: function () {
                  return this.ratio - (-21)
              }
          }

      })
  </script>

  watch: {
  proportional: function (val) {
  this.integral = val + '21'
  },
  integral: function (val) {
  objectRegutalation.standing = val
  }
  }

  <div id="example-1" class="demo">
      <p>Блядь</p>
      <div>
          <p>k</p>

          <input v-model="sarter" placeholder="отредактируй меня">
          <p>Введённое сообщение: {{ sarter }}</p>

      </div>
      <div>
          <input v-model="lox" placeholder="отредактируй меня">
          <p>{{ lox }}</p>

      </div>

  </div>
  <script>
      new Vue({
          el: '#example-1',
          data: {
              sarter: '',
              lox: ''
          }
      })
  </script>

  <div id="example-3" >
      <input type="checkbox" id="jack"  v-model="checkedNames[0]">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john"  v-model="checkedNames[1]">
      <label for="john">John</label>
      <input type="checkbox" id="mike"  v-model="checkedNames[2]">
      <label for="mike">Mike</label>
      <br>
      <span>Отмеченные имена: {{ checkedNames }}</span>
  </div>
  <script>
     var tre = new Vue({
          el: '#example-3',
          data: {
              checkedNames: ['true','true']
          }
      })
  </script>
  <script>
      function Relation(startX, startY, endX, endY) {
          this.startPoint = {
              x: startX,
              y: startY
          };
          this.endPoint = {
              x: endX,
              y: endY
          };
      }

      var i = 0,
          length = 10,
          relations = [];

      for(; i< length; i++) {
          relations.push(new Relation(i, i, i, i));
      }

      console.log(relations);
  </script>
  <div id="demo">
      <input v-model="firstName" placeholder="отредактируй меня">
      <input v-model="lastName" placeholder="отредактируй меня">

      <input v-model="fullName" placeholder="отредактируй меня">

  </div>
  <script>
      var vm = new Vue({
          el: '#demo',
          data: {
              firstName: 'Foo',
              lastName: 'Bar',
              blead: 0
          },
          computed: {
              fullName: {
                  // геттер:
                  get: function () {
                      return this.firstName + ' ' + this.lastName
                  },
                  // сеттер:
                  set: function (newValue) {
                      var names = newValue.split(' ')
                      this.firstName = names[0]
                      this.lastName = names[names.length - 1]
                  }
              }
          }
      })
  </script>
  <div id="example-7" class="demo">
      <select v-model="selected">
          <option v-for="option in options" v-bind:value="option.value">
              {{ option.text }}
          </option>
      </select>
      <span>Выбрано: {{ selected }}</span>
  </div>
  <script>
      new Vue({
          el: '#example-7',
          data: {
              selected: 'B',
              options: [
                  { text: '1. Вручную', value: "A" },
                  { text: '2. По Ротачу В.Я.', value: 'B' },
                  { text: '3. С системы 2', value: 'C' }
              ]
          }
      })
  </script>
  <div id="watch-example">
      <p>
          Задайте вопрос, на который можно ответить "да" или "нет":
          <input v-model="question">
      </p>
      <p>{{ answer }}</p>
  </div>
  <!-- Поскольку уже существует обширная экосистема ajax-библиотек  -->
  <!-- и библиотек функций общего назначения, ядро Vue может        -->
  <!-- оставаться маленьким и не изобретать их заново. Кроме того,  -->
  <!-- это позволяет вам использовать только знакомые инструменты. -->
  <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
  <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
  <script>
      var watchExampleVM = new Vue({
          el: '#watch-example',
          data: {
              question: '',
              answer: 'Пока вы не зададите вопрос, я не могу ответить!'
          },
          watch: {
              // эта функция запускается при любом изменении вопроса
              question: function (newQuestion) {
                  this.answer = 'Ожидаю, когда вы закончите печатать...'
                  this.getAnswer()
              }
          },
          methods: {
              // _.debounce — это функция из lodash, позволяющая ограничить
              // то, насколько часто может выполняться определённая операция.
              // В данном случае, мы хотим ограничить частоту обращений к yesno.wtf/api,
              // дожидаясь завершения печати вопроса перед тем как послать ajax-запрос.
              // Чтобы узнать больше о функции _.debounce (и её родственнице _.throttle),
              // см. документацию: https://lodash.com/docs#debounce
              getAnswer: _.debounce(
                  function () {
                      if (this.question.indexOf('?') === -1) {
                          this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)'
                          return
                      }
                      this.answer = 'Думаю...'
                      var vm = this
                      axios.get('https://yesno.wtf/api')
                          .then(function (response) {
                              vm.answer = _.capitalize(response.data.answer)
                          })
                          .catch(function (error) {
                              vm.answer = 'Ошибка! Не могу связаться с API. ' + error
                          })
                  },
                  // Это число миллисекунд, которое мы ждём, после того как пользователь прекратил печатать:
                  500
              )
          }
      })
  </script>
<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

  <script type="text/javascript">
  Highcharts.chart('container', {
  title: {
      text: 'Monthly Average Temperature',
      x: -20 //center
  },
  subtitle: {
      text: 'Source: WorldClimate.com',
      x: -20
  },
  xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
      title: {
          text: 'Temperature (°C)'
      },
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }]
  },
  tooltip: {
      valueSuffix: '°C'
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
  },
  series: [{
      name: 'Tokyo',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  }, {
      name: 'New York',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
  }, {
      name: 'Berlin',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  }]
});
  </script>
  </body>
</html>
