$l(function() {
  var el = $l("ul");
  // el.removeClass("fun");
  el.addClass("fun");

  $l('ul.fun').on("click", 'li', () => el.removeClass());

  // setTimeout(function (){el.removeClass();}, 2000);
});
