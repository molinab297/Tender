(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CommentList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CommentList.prototype.addRow = function(comment) {
    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(comment);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  function Row(comment) {
    var $div = $('<div></div>', {
      'comment': 'label', // TODO fix according to html
      'class': 'label'
    });

    var $label = $('<label></label>');

    var commentText = comment.text;

    $label.append(commentText);
    $div.append($label);

    this.$element = $div;
  }

  // Function for removing comment row:
  // CommentList.prototype.removeRow = function(id) {
  //   this.$element
  //     .find('[value="' + id + '"]') // filler nonsense
  //     .closest('[comment="label"]') // filler nonsense
  //     .remove();
  //   // handle backend
  // };

  // Function for adding click handler to comments:
  // CommentList.prototype.addClickHandler = function(fn) {
  //   this.$element.on('click', 'input', function(event) {
  //     var id = -1;
  //     this.removeRow(id);
  //     fn(id);
  //   }.bind(this));
  // };

  App.CommentList = CommentList;
  window.App = App;
})(window);
