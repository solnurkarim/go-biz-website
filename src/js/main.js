var carouselList = $(".carousel-area .owl-carousel");
var franchiseSlider = $(".franchise .owl-carousel");
var officesSlider = $(".offices .owl-carousel");
var carouselObjects = [];

// Добавление индикаторов и создание объекта для каждой карусели
carouselList.each(function() {
  var indicatorsList = $(this).find(".indicators");
  indicatorsList.each(function(indicatorsElemIndex) {
    for (var i = 0; i < indicatorsList.length; i++) {
      var dotElem = `<div class="carousel-dot${
        i === indicatorsElemIndex ? " active" : ""
      }" data-index='${i}'></div`;
      indicatorsList[indicatorsElemIndex].innerHTML += dotElem;
    }
  });

  var carouselObj = {
    carousel: $(this),
    leftArrow: $(this)
      .parent()
      .find(".arrow-left"),
    rightArrow: $(this)
      .parent()
      .find(".arrow-right"),
    dotList: $(this).find(".indicators"),
    setCommand: function(command) {
      this.carousel
        .trigger(...command)
        .trigger("stop.owl.autoplay")
        .trigger("play.owl.autoplay");
    }
  };

  carouselObjects.push(carouselObj);
});

// настройка каруселей и прикрепление обработчиков событий на кнопки и индикаторы
carouselObjects.forEach(carouselObj => {
  carouselObj.carousel.owlCarousel({
    loop: true,
    items: 1,
    autoplay: true,
    nav: false,
    dots: false,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    autoplayHoverPause: true
  });

  carouselObj.leftArrow.click(function() {
    carouselObj.setCommand(["prev.owl.carousel"]);
  });

  carouselObj.rightArrow.click(function() {
    carouselObj.setCommand(["next.owl.carousel"]);
  });

  carouselObj.dotList.click(function(e) {
    carouselObj.setCommand(["to.owl.carousel", [e.target.dataset.index]]);
  });
});

// настройка слайдеров основных секций и прикрепление обработчиков событий на кнопки
franchiseSlider.owlCarousel({
  loop: true,
  items: 5,
  autoplay: true,
  nav: false,
  dots: false,
  autoplayHoverPause: true
});

$(".franchise .arrow-left").click(function() {
  franchiseSlider
    .trigger("prev.owl.carousel")
    .trigger("stop.owl.autoplay")
    .trigger("play.owl.autoplay");
});

$(".franchise .arrow-right").click(function() {
  franchiseSlider
    .trigger("next.owl.carousel")
    .trigger("stop.owl.autoplay")
    .trigger("play.owl.autoplay");
});

officesSlider.owlCarousel({
  loop: true,
  items: 3,
  autoplay: true,
  nav: false,
  dots: false,
  margin: 12,
  autoplayHoverPause: true
});

$(".offices .arrow-left").click(function() {
  officesSlider
    .trigger("prev.owl.carousel")
    .trigger("stop.owl.autoplay")
    .trigger("play.owl.autoplay");
});

$(".offices .arrow-right").click(function() {
  officesSlider
    .trigger("next.owl.carousel")
    .trigger("stop.owl.autoplay")
    .trigger("play.owl.autoplay");
});
