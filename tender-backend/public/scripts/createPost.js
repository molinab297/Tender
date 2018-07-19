function convertToBase64(callback) {
  console.log('buttonPressed');

  var image = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();
  console.log(image);
  if (image) {
    reader.readAsDataURL(image);
    reader.onload = function() {
      $.post('http://localhost:2403/pictures', {
        'file': reader.result
      }, function(result) {
        $.get("http://localhost:2403/pictures", function(result) {
          console.log(result);
          $("#my_image").attr("src", result[0].file);
        });
      });
    };

    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
  }
}
