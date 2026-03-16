$(document).ready(function () {
  // 1. Mobile Menu Toggle
  $("#mobile-menu-btn").on("click", function () {
    $("#mobile-menu").slideToggle(300);
  });
  $(".mobile-link").on("click", function () {
    $("#mobile-menu").slideUp(300);
  });

  // 2. Smooth Scrolling for Anchor Links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = this.hash;
    if (target) {
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - 80, // Adjust for sticky header
        },
        800,
        "swing",
      );
    }
  });

  // 3. Navbar background style change on scroll
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $("#navbar").addClass("shadow-sm bg-white/95").removeClass("bg-white/90");
    } else {
      $("#navbar").removeClass("shadow-sm bg-white/95").addClass("bg-white/90");
    }
  });

  // 4. FAQ Accordion Logic
  $(".faq-toggle").on("click", function () {
    const $answer = $(this).next(".faq-answer");
    const $icon = $(this).find("i");

    // Toggle current answer
    $answer.slideToggle(300);

    // Rotate Icon
    if ($icon.hasClass("rotate-180")) {
      $icon.removeClass("rotate-180");
    } else {
      $icon.addClass("rotate-180");
    }

    // Close others (Optional, makes it act like a strict accordion)
    $(".faq-answer").not($answer).slideUp(300);
    $(".faq-toggle i").not($icon).removeClass("rotate-180");
  });

  // 5. Scroll Reveal & Slot Machine Numbers using Intersection Observer
  const revealElements = document.querySelectorAll(".reveal");
  const counterElements = document.querySelectorAll(".counter");
  let countersAnimated = false;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Handle fade-in reveal elements
      if (entry.isIntersecting) {
        $(entry.target).addClass("active");

        // Handle Slot Machine Counters if visible
        if ($(entry.target).find(".counter").length > 0 && !countersAnimated) {
          countersAnimated = true;
          $(".counter").each(function () {
            const $this = $(this);
            const countTo = $this.attr("data-target");

            $({ countNum: $this.text() }).animate(
              {
                countNum: countTo,
              },
              {
                duration: 3000,
                easing: "swing",
                step: function () {
                  $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                  $this.text(this.countNum);
                  // Add comma for thousands if needed
                  if (this.countNum > 999) {
                    $this.text(
                      this.countNum
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    );
                  }
                },
              },
            );
          });
        }
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
  // Ensure counters section is also observed if not wrapped in reveal
  $(".counter").closest("section").addClass("reveal");
  observer.observe($(".counter").closest("section")[0]);
});
