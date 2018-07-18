(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FoodList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FoodList.prototype.addRow = function(food) {
    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(food);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  function Row(food) {
    var $div = $('<div></div>', {
      'food': 'label', // TODO fix according to html
      'class': 'label'
    });

    var $label = $('<label></label>');

    var foodDescription = food.description;

    $label.append(foodDescription);
    $div.append($label);

    this.$element = $div;
  }

  App.FoodList = FoodList;
  window.App = App;
})(window);
