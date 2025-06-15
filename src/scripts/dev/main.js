(function () {
  "use strict";
  const root = document.documentElement;

  const navToggle = document.querySelector("#js-navToggle");
  navToggle.addEventListener("click", function () {
    root.classList.toggle("show-nav");
  });

  const eventpp = document.querySelector("#js-eventpp")
  const eventOpenBtn = document.querySelector("#js-eventOpenBtn")

  document.addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
      root.classList.remove("show-event-popup")
    }
  })

  if (eventpp) {
    const eventOpenBtn = document.querySelector("#js-eventOpenBtn");
    const closeEventPP = function (event) {
      function close() {
        document.removeEventListener("keyup", closeEventPP);
        eventpp.removeEventListener("click", closeEventPP);
        root.classList.remove("show-event-popup");
      }
      switch (event.type) {
        case "keyup":
          if (event.key === "Escape" || event.keyCode === 27) close();
          break;
        case "click":
          if (
            event.target === this ||
            event.target.classList.contains("js-ppCloseBtn")
          )
            close();
          break;
      }
    };
    eventOpenBtn.addEventListener("click", function () {
      root.classList.add("show-event-popup");
      document.addEventListener("keyup", closeEventPP);
      eventpp.addEventListener("click", closeEventPP);
    });
  }

  const swipers = document.querySelectorAll(".js-swiper");
  swipers.forEach(function (swpr) {
    new Swiper(swpr, {
      updateOnWindowResize: true,
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 0,
      speed: 500,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
        disabledClass: "arrow--disabled"
      }
    });
  });

  const contactsMap = document.querySelector("#js-contactsMap");
  if (contactsMap) {
    const mapStyles = [
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    ];

    const mapCenter = new google.maps.LatLng(56.49387, 84.96274);
    const mapOptions = {
      center: mapCenter,
      disableDefaultUI: true,
      draggable: true,
      gestureHandling: "cooperative",
      scrollwheel: false,
      styles: mapStyles,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    };
    const map = new google.maps.Map(contactsMap, mapOptions);

  }

  const jsSelectric = $(".js-selectric");
  if (jsSelectric.length) {
    jsSelectric.selectric({
      nativeOnMobile: false
    });
  }

  const mobileMask = $('.js-mobileMask');
  if (mobileMask.length) {
    mobileMask.mask('+7 (000) 000 00 00', { placeholder: "+7 (___) ___ __ __" });
  }

  const dateField = $(".js-dateField");
  if (dateField.length) {
    const pickerInit = function (pick) {
      const dateInput = pick.find(".js-dateInput");
      const dateDay = pick.find(".js-dateDay");
      const dateMonth = pick.find(".js-dateMonth");
      const dateYear = pick.find(".js-dateYear");
      const dateConfig = {
        autoClose: true,
        minDate: new Date(),
        navTitles: {
          days: "MMMM <i>yyyy</i>"
        },
        onSelect: function ({ date }) {
          dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
          dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
          dateYear.val(date ? date.getFullYear() : "");
        }
      };
      new AirDatepicker(dateInput[0], dateConfig);
    };
    $.each(dateField, function (i) {
      pickerInit($(this));
    });
  }

  







console.log("Hello");
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".check__input");
    const seats = document.querySelectorAll(".reserve__scene circle"); // Стулья
    const tables = document.querySelectorAll(".reserve__scene rect"); // Столы
    const numbers = document.querySelectorAll(".reserve__scene .table-number"); // Только номера столов!

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const tableId = this.dataset.tableId;
            const tablePrice = this.closest(".reserve__check").dataset.price;
            const color = tablePrice === "1400" ? "#BC3324" : "#1F1E1E";
            const textColor = this.checked ? "#FFFFFF" : "#1F1E1E";

            toggleSelection(tableId, this.checked, color, textColor);
        });
    });

    function toggleSelection(tableId, isChecked, color, textColor) {
        seats.forEach((seat) => {
            if (seat.dataset.tableId === tableId) {
                seat.style.fill = isChecked ? color : "transparent";
            }
        });

        tables.forEach((table) => {
            if (table.dataset.tableId === tableId) {
                table.style.fill = isChecked ? color : "transparent";
            }
        });

        numbers.forEach((number) => {
            if (number.dataset.tableId === tableId) {
                number.setAttribute("fill", textColor);
                number.removeAttribute("stroke"); // Убираем границу, если она мешает изменению цвета
            }
        });
    }
});









document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".check__input");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const price = +checkbox.closest(".reserve__check").dataset.price;
            const qtyEl = document.querySelector(`.reserve__qty[data-price="${price}"]`);
            const sumEl = qtyEl?.nextElementSibling;

            if (!qtyEl || !sumEl) return;

            let qty = +qtyEl.textContent;
            qtyEl.textContent = checkbox.checked ? qty + 1 : Math.max(0, qty - 1);
            sumEl.textContent = +qtyEl.textContent * price;

            updateTotal();
        });
    });

    function updateTotal() {
        const totalEl = document.querySelector(".reserve__total");
        const allSums = document.querySelectorAll(".reserve__sum");

        const total = Array.from(allSums)
            .reduce((acc, el) => acc + +el.textContent, 0);

        totalEl.textContent = total;
    }
});







  

})();

