function convertToBase64(callback) {
  console.log("Trying to save picture to database");

  var $ = window.jQuery;
  var image = document.querySelector("input[type=file]").files[0];
  // text for the photo posted
  var text = document.getElementById('foodMessage').value;
  console.log(text);
  var reader = new FileReader();
  console.log(image);
  if (image) {
    reader.readAsDataURL(image);
    reader.onload = function() {
      $.post('http://localhost:2403/pictures', {
        'file': reader.result, 'message': text
      }, function(result) {
        $.get("http://localhost:2403/pictures", function(result) {
          console.log(result);
          $("#my_image").attr("src", result[0].file);
        });
      });
    };
    // close the modal box on submitted
    document.getElementById("myModal").modal("hide");
    $("#submitError").hide();

    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }
  else{
    $("#submitError").show();
  }
}

function createPost(callback)
{
  console.log("Creating a Post");
  // Used if picture has been uploaded by user
  convertToBase64();
  // Used if user has typed a message initial

}
