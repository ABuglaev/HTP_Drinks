'use strict';
var spa = function() {
  var
  //константы
  html_template = '<div id="main_block">\
                    <ul id="main_menu">\
                      <li><div id="add"  class="button" title="Add a new drink"><\/div>\
                      <li><div id="info" class="button" title="Get information about drink"><\/div>\
                      <li><div id="list" class="button" title="Get the full list"><\/div>\
                      <li><div id="del"  class="button" title="Remove drink from the list"><\/div>\
                    <\/ul>\
                    <div id="info_window"> <\/div>\
                  <\/div>',
  //хэши
  drinks = new HashStorage,
  //функции
  initModule, onClickAdd, onClickInfo, onClickList, onClickDel;

  //добавление напитка и инфо о нем
  onClickAdd = function() {
    var name, isAlc, recipe, description = {};
    name = prompt("Введите название напитка");
    drinks.addValue(name);
    
    isAlc = confirm("Алкогольный?");
    description['isAlc'] = isAlc;
    recipe = prompt("Рецепт?");
    description['recipe'] = recipe;

    drinks[name] = description;
  };

  //удаление
  onClickDel = function() {
    var name;
    name = prompt("Какое название удаляемого напитка?");
    drinks.deleteValue(name);
    document.getElementById('info_window').innerHTML = ( 'Удалено: ' + name );
  };

  //вывод списка
  onClickList = function() {
    var drinksList, $li;
    drinksList = drinks.getKeys();

    document.getElementById('info_window').innerHTML = '<ul id=\"drinks_list\"><\/ul>';    
    for (var i = 6; i < drinksList.length; i++) {     //Костыль! :)
      $li = document.createElement('li');
      $li.innerHTML = drinksList[i];
      document.getElementById('drinks_list').appendChild($li);
    };
  };

  //инфо по напитку
  onClickInfo = function() {
    var name, alcStr;
    name = prompt("Какое название напитка?");
    drinks.getValue(name);
    alcStr = ( drinks[name]['isAlc'] === true ) ? 'Да' : 'Нет';
    document.getElementById('info_window').innerHTML=('Напиток: '    + name   + '<br>'+
                                                      'Алкогольный: '+ alcStr + '<br>'+
                                                      'Рецепт: '     + drinks[name]['recipe']
                                                     );
  };

  //Отрисовка HTML и привязка обработчиков событий
  initModule = function() {
  document.body.innerHTML = html_template;
  document.getElementById("add").addEventListener('click', onClickAdd );
  document.getElementById("info").addEventListener('click', onClickInfo );
  document.getElementById("list").addEventListener('click', onClickList );
  document.getElementById("del").addEventListener('click', onClickDel );
  };

  return {initModule : initModule};

}();

document.addEventListener("DOMContentLoaded", function (){ spa.initModule(); } );