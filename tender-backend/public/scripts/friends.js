(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FriendsList() {

  }

  FriendsList.prototype.createFriend = function(data) {
    console.log("Adding Following");
    addRow(data);
  };

  function addRow(friend) {
    // Create a new instance of a row, using the coffee order info
    Row(friend);

    // Add the new row instance's $element property to the checklist
  }

  function Row(friend) {

    var li = document.createElement("LI");
    li.className="friendList";

    var para = document.createElement("P");
    para.className="friendList friendName";

    var img = document.createElement("IMG");
    img.className="friendList friendImg";
    img.src=""; // TODO we need to add user image here

    var name = document.createTextNode(friend);
    para.appendChild(name);

    li.appendChild(para);
    li.appendChild(img);
    document.getElementById("friendList").appendChild(li);

    /*
    var element = document.getElementById("friendList");
    element.appendChild("<p class='friendList friendName'>Bob</p>");
    var $div = $('<div></div>', {
      'data-friends-list': 'label', // TODO fix according to html
      'class': 'label'
    });

    var $label = $('<label></label>');

    var friendName = friend.displayName;

    $label.append(friendName);
    $div.append($label);

    this.$element = $div;

    */
  }

  App.FriendsList = FriendsList;
  window.App = App;
})(window);
