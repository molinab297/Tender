(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FriendsList() {

  }

  FriendsList.prototype.createFriend = function(name, profilePicture) {
    console.log("Adding Following");
    addRow(name, profilePicture);
  };

  function addRow(friend, profilePicture) {
    // Create a new instance of a row, using the coffee order info
    Row(friend, profilePicture);

    // Add the new row instance's $element property to the checklist
  }

  function Row(friend, profilePicture) {

    var li = document.createElement("LI");
    li.className="friendList";

    var para = document.createElement("P");
    para.className="friendList friendName";

    var img = document.createElement("IMG");
    img.className="friendList friendImg";
    img.src=profilePicture; // TODO we need to add user image here

    var name = document.createTextNode(friend);
    para.appendChild(name);

    li.appendChild(img);
    li.appendChild(para);
    console.log(li);
    document.getElementById("friendList").appendChild(li);
  }

  App.FriendsList = FriendsList;
  window.App = App;
})(window);
