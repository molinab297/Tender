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
  CommentList.prototype.addRow = function(commentText, timeLog) {
    var rowElement = new Row(commentText,timeLog);
    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  // generates dom elements for the comment to be added
  function Row(comment, timeLog) {

    var $div =
      '<li>' +
        '<div class="commenterImage">' +
          '<img src="http://placekitten.com/40/40" />' +
        '</div>' +
        '<div class="commentText">' +
          '<p class="">'+ comment +'</p> <span class="date sub-text">on ' + timeLog + '</span>' +
        '</div>' +
      '</li>';

    //var $label = $('<label></label>');

    // // user input
    // $label.append(comment);
    // $div.append($label);

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

  CommentList.prototype.initializeComments = function(commentList, comments) {

    //view every array pair
    comments.forEach(function(comment) {
      commentList.addRow.call(commentList, comment[1], comment[2]);

      //console.log(comment[0] + " " + comment[1]);
    });
  }

  App.CommentList = CommentList;
  window.App = App;
})(window);
