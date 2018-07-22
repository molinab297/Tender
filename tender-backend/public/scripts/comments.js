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
  CommentList.prototype.addRow = function(comment) {

    // To figure out the unique post id
    var variable = this.$element;
    variable = variable[0].parentElement.parentElement.id;

    // find the text input form where the unique post id exist
    var text = $(".form-control", "#"+variable).val();

    var rowElement = new Row(comment,text);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);

    submitComment(variable,text);
  };

// generates dom elements for the comment to be added
  function Row(comment,text) {

    var $div = $('<div></div>', {
      'class': 'commentData'
    });

    var $label = $('<label></label>');

    // user input
    $label.append(text);
    $div.append($label);

    this.$element = $div;
  }

  function submitComment(id,text)
  {
    var jsonPost = '{"comment_1": {"username": "a@a.com","message": "I hate u!"}}';
    console.log(id);
    dpd.users.me(function(user) { //used to get user's name
      // $.put('http://localhost:2403/pictures/' + id, {
      //   'message': "IhateThis",
      //   'email': "fagot@cokc.com"
      // }, function(result) {
      //     console.log(result);
      // });
      dpd.pictures.get(id, function(result, error) {
        console.log(result.comments);
      });

      dpd.pictures.post(id, {"comments": {$push: [ user.username, text]}}, function(result) {
        console.log(result);
      });
    });
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


// TODO Need to be refactored or be able to use class functions of CommentList

function initializeComments(comments,id)
{
  //console.log("Initializing comments");
  var $commentList = $(".commentList", "#"+id);
  //view every array pair
  comments.forEach(function(comment){

    // dom elements for new comment
    var $div = $('<div></div>', {
      'class': 'commentData'
    });

    var $label = $('<label></label>');

    // user input
    $label.append(comment[1]);
    $div.append($label);

    $commentList.append($div);

    //console.log(comment[0] + " " + comment[1]);
  });
}
