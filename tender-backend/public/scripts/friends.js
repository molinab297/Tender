(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FriendsList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  function addRow(friend) {
    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(friend);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  }

  function Row(friend) {
    var $div = $('<div></div>', {
      'friend': 'label', // TODO fix according to html
      'class': 'label'
    });

    var $label = $('<label></label>');

    var friendName = friend.name;

    $label.append(friendName);
    $div.append($label);

    this.$element = $div;
  }

  App.FriendsList = FriendsList;
  window.App = App;
})(window);
