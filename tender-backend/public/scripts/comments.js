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

  // default function called on submit handler for the add comment button
  CommentList.prototype.addRow = function(commentText) {
    var rowElement = new Row(commentText);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  // generates dom elements for the comment to be added
  function Row(comment) {

    var $div = $('<div></div>', {
      'class': 'commentData'
    });

    var $label = $('<label></label>');

    // user input
    $label.append(comment);
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

  CommentList.prototype.initializeComments = function(commentList, comments, id) {

    //view every array pair
    comments.forEach(function(comment) {
      var commentText = comment[1];
      commentList.addRow.call(commentList, commentText);

      //console.log(comment[0] + " " + comment[1]);
    });
  }

  App.CommentList = CommentList;
  window.App = App;
})(window);
