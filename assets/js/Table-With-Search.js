var $rows = $("#tableBody tr");
$("#search").keyup(function () {
  var val = $.trim($(this).val()).replace(/ +/g, " ").toLowerCase();

  $rows
    .show()
    .filter(function () {
      var text = $(this).text().replace(/\s+/g, " ").toLowerCase();
      console.log(text);
      return !~text.indexOf(val);
    })
    .hide();
});
