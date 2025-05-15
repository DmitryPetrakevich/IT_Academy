(function () {
    "use strict";
    const root = document.documentElement;

    const navToggle = document.querySelector("#js-navToggle");
    navToggle.addEventListener("click", function() {
      root.classList.toggle("show-nav");
    });

    const eventpp = document.querySelector("#js-eventpp")
    const eventOpenBtn = document.querySelector("#js-eventOpenBtn")

    if(eventpp && eventOpenBtn) {
      eventOpenBtn.addEventListener("click", function() {
        root.classList.add("show-event-popup")
      });

      eventpp.addEventListener("click", function(event) {
        if(event.target === this || event.target.classList.contains("js-ppCloseBtn")){
          root.classList.remove("show-event-popup")
        }
      })
    }

  })();

