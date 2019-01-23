// Связанные списки выбора города и страны на странице регистрации
function selectCountry() {

  var url = 'https://raw.githubusercontent.com/AntonLitvin/all-countries-and-cities-json/master/countries.min.json';
  var countries = $('.country');
  var city = $('.city');

  countries.empty();
  city.empty();

  countries.append('<option selected="true" disabled>Choose Country</option>');
  //countries.prop('selectedIndex', 0);

  city.append('<option selected="true" disabled>Choose City</option>');
  //city.prop('selectedIndex', 0);

  $.getJSON(url, function (data) {

    $.each(data, function (key, value) {
      countries.append($("<option></option>").attr("value", key).text(key));
    });

    setTimeout(pg_form_set, 500);

  });


  $(countries).on('change', function () {

    var country = $(this).val();
    $(city).find("option:first").text("Loading...");

    $.getJSON(url, function (result) {
    
      var values = result[country];
      // city.empty();

      if (values != undefined && values.length > 0) {
        city.find('option').remove();
        $(values).each(function(index, element) {
          city.append($("<option></option>").attr("value", element).text(element));
        });
      }
    });
  });

}

selectCountry();
