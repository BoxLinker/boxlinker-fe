(function($) {
  var Multiman = {
    // Initialization the functions
    init() {
      Multiman.AffixMenu();
      Multiman.MobileMenu();
      Multiman.ScrollSpy();
      Multiman.SmoothScroll();
      Multiman.FitVids();
      Multiman.PlaceHolder();
      Multiman.Carousel();
      Multiman.Lightbox();
      Multiman.CounterUp();
      // Multiman.Form();
      Multiman.Scrollup();
      Multiman.Customizer();

      $(window).on('load', () => {
        Multiman.Animated();
      });
    },

    // Navigation menu affix
    AffixMenu() {
      $('body').waypoint(
        () => {
          $('#navigation').removeClass('affix');
        },
        {
          offset: -49,
        },
      );

      $('body').waypoint(
        () => {
          $('#navigation').addClass('affix');
        },
        {
          offset: -50,
        },
      );
    },

    // Add mobile navigation
    MobileMenu() {
      let navMenu = '<nav id="navigation_mobile">';
      navMenu += '<div class="nav-menu-links">';
      navMenu += '<ul>';
      navMenu += $('#navigation .nav').html();
      navMenu += '</ul>';
      navMenu += '</div>';
      navMenu += '<div class="nav-menu-button">';
      navMenu +=
        '<button class="nav-menu-toggle"><i class="ion ion-navicon"></i></button>';
      navMenu += '</div>';
      navMenu += '</nav>';

      $('#header').before(navMenu);

      $('.nav-menu-toggle').on('click', function() {
        $(this)
          .parent('.nav-menu-button')
          .prev('.nav-menu-links')
          .slideToggle(300, () => {
            $(window).trigger('resize.px.parallax');
          });
      });
    },

    // Navigation menu scrollspy to anchor section
    ScrollSpy() {
      setTimeout(() => {
        $('body').scrollspy({
          target: '#navigation.scrollspy',
          offset: 71,
        });
      }, 100);
    },

    // Smooth scrolling to anchor section
    SmoothScroll() {
      $('a.smooth-scroll').on('click', function(event) {
        const $anchor = $(this);
        let offsetTop = '';

        if (window.Response.band(768)) {
          offsetTop = parseInt($($anchor.attr('href')).offset().top - 70, 0);
        } else {
          offsetTop = parseInt($($anchor.attr('href')).offset().top, 0);
        }

        $('html, body').stop().animate(
          {
            scrollTop: offsetTop,
          },
          1500,
          'easeInOutExpo',
        );

        event.preventDefault();
      });
    },

    // Responsive video size
    FitVids() {
      $('body').fitVids();
    },

    // Placeholder compatibility for IE8
    PlaceHolder() {
      $('input, textarea').placeholder();
    },

    // Slider with SliderPro & Slick carousel
    Carousel() {
      // Testimonials carousel
      $('.carousel-slider.testimonials-row').slick({
        slidesToShow: 5,
        speed: 300,
        draggable: false,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              draggable: true,
            },
          },
          {
            breakpoint: 540,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      // General slider
      $('.carousel-slider.general-slider').slick({
        dots: true,
        speed: 300,
        adaptiveHeight: true,
        draggable: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              draggable: true,
            },
          },
        ],
      });
    },

    // Preview images popup gallery with Fancybox
    Lightbox() {
      $('.fancybox').fancybox({
        loop: false,
      });

      $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        prevEffect: 'none',
        nextEffect: 'none',
        arrows: false,
        helpers: {
          media: {},
          buttons: {},
        },
      });
    },

    // Number counter ticker animation
    CounterUp() {
      $('.affa-counter > h4').counterUp({
        delay: 10,
        time: 3000,
      });
    },

    // Form submit function
    Form() {
      const pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

      // Checking form input when focus and keypress event
      $(
        '.affa-form-contact input[type="text"], .affa-form-contact input[type="email"], .affa-form-contact textarea, .affa-form-signup input[type="text"], .affa-form-signup input[type="email"], .affa-form-signup input[type="password"], .affa-form-signup input[type="number"], .affa-form-signup textarea, .affa-form-signup select',
      ).on('focus keypress', function() {
        const $input = $(this);

        if ($input.hasClass('error')) {
          $input.removeClass('error');
        }
      });

      // Contact form when submit button clicked
      $('.affa-form-contact').submit(function() {
        const $form = $(this);
        const submitData = $form.serialize();
        const $name = $form.find('input[name="name"]');
        const $email = $form.find('input[name="email"]');
        const $subject = $form.find('input[name="subject"]');
        const $message = $form.find('textarea[name="message"]');
        const $submit = $form.find('input[name="submit"]');
        let status = true;

        if ($email.val() === '' || pattern.test($email.val()) === false) {
          $email.addClass('error');
          status = false;
        }
        if ($message.val() === '') {
          $message.addClass('error');
          status = false;
        }

        if (status) {
          $name.attr('disabled', 'disabled');
          $email.attr('disabled', 'disabled');
          $subject.attr('disabled', 'disabled');
          $message.attr('disabled', 'disabled');
          $submit.attr('disabled', 'disabled');

          $.ajax({
            type: 'POST',
            url: 'process-contact.php',
            data: `${submitData}&action=add`,
            dataType: 'html',
            success(msg) {
              if (parseInt(msg, 0) !== 0) {
                const msg_split = msg.split('|');
                if (msg_split[0] === 'success') {
                  $name.val('').removeAttr('disabled').removeClass('error');
                  $email.val('').removeAttr('disabled').removeClass('error');
                  $subject.val('').removeAttr('disabled').removeClass('error');
                  $message.val('').removeAttr('disabled').removeClass('error');
                  $submit.removeAttr('disabled');
                  $form
                    .find('.submit-status')
                    .html(
                      `<div class="submit-status-text"><span class="success"><i class="ion ion-ios-checkmark-outline"></i> ${msg_split[1]}</span></div>`,
                    )
                    .fadeIn(300)
                    .delay(3000)
                    .fadeOut(300);
                } else {
                  $name.removeAttr('disabled').removeClass('error');
                  $email.removeAttr('disabled').removeClass('error');
                  $subject.removeAttr('disabled').removeClass('error');
                  $message.removeAttr('disabled').removeClass('error');
                  $submit.removeAttr('disabled').removeClass('error');
                  $form
                    .find('.submit-status')
                    .html(
                      `<div class="submit-status-text"><span class="error"><i class="ion ion-ios-close-outline"></i> ${msg_split[1]}</span></div>`,
                    )
                    .fadeIn(300)
                    .delay(3000)
                    .fadeOut(300);
                }
              }
            },
          });
        }

        status = true;

        return false;
      });

      // Signup form when submit button clicked
      $('.affa-form-signup').submit(function() {
        const $form = $(this);
        const submitData = $form.serialize();
        const $name = $form.find('input[name="name"]');
        const $email = $form.find('input[name="email"]');
        const $password = $form.find('input[name="password"]');

        // var $phone		= $form.find('input[name="phone"]');
        // var $message	= $form.find('textarea[name="message"]');
        // var $submit		= $form.find('input[name="submit"]');
        let status = true;

        if ($email.val() === '' || pattern.test($email.val()) === false) {
          $email.addClass('error');
          status = false;
        }
        // if ($message.val() === '') {
        // 	$message.addClass('error');
        // 	status = false;
        // }
        if (
          $password.val().trim() === '' ||
          $password.val().trim().length < 6
        ) {
          $password.addClass('error');
          status = false;
        }

        if (status) {
          $name.attr('disabled', 'disabled');
          $email.attr('disabled', 'disabled');
          $password.attr('disabled', 'disabled');
          // $phone.attr('disabled', 'disabled');
          // $message.attr('disabled', 'disabled');
          // $submit.attr('disabled', 'disabled');

          $.ajax({
            type: 'POST',
            url: 'process-signup.php',
            data: `${submitData}&action=add`,
            dataType: 'html',
            success(msg) {
              if (parseInt(msg, 0) !== 0) {
                const msg_split = msg.split('|');
                if (msg_split[0] === 'success') {
                  $name.val('').removeAttr('disabled');
                  $email.val('').removeAttr('disabled');
                  // $phone.val('').removeAttr('disabled');
                  // $message.val('').removeAttr('disabled');
                  // $submit.removeAttr('disabled');
                  $form
                    .find('.submit-status')
                    .html(
                      `<span class="success"><i class="ion ion-ios-checkmark-outline"></i> ${msg_split[1]}</span>`,
                    )
                    .fadeIn(300)
                    .delay(3000)
                    .fadeOut(300);
                } else {
                  $name.removeAttr('disabled');
                  $email.removeAttr('disabled');
                  // $phone.removeAttr('disabled');
                  // $message.removeAttr('disabled');
                  // $submit.removeAttr('disabled');
                  $form
                    .find('.submit-status')
                    .html(
                      `<span class="error"><i class="ion ion-ios-close-outline"></i> ${msg_split[1]}</span>`,
                    )
                    .fadeIn(300)
                    .delay(3000)
                    .fadeOut(300);
                }
              }
            },
          });
        }

        status = true;

        return false;
      });
    },

    // Back to top button function
    Scrollup() {
      const $scrollUp = $('.scrollup');
      const $header = $('#header');

      $('body').waypoint(
        () => {
          $scrollUp.removeClass('visible');
        },
        {
          offset: -$header.height(),
        },
      );

      $('body').waypoint(
        () => {
          $scrollUp.addClass('visible');
        },
        {
          offset: -($header.height() + 1),
        },
      );

      $scrollUp.click(() => {
        $('html, body').stop().animate(
          {
            scrollTop: 0,
          },
          2000,
          'easeInOutExpo',
        );

        return false;
      });
    },

    // Embed animation effects to HTML elements with CSS3
    Animated() {
      $('.animation, .animation-visible').each(function() {
        const $element = $(this);
        $element.waypoint(
          () => {
            let delay = 0;
            if ($element.data('delay'))
              delay = parseInt($element.data('delay'), 0);
            if (!$element.hasClass('animated')) {
              setTimeout(() => {
                $element.addClass(`animated ${$element.data('animation')}`);
              }, delay);
            }
            delay = 0;
          },
          {
            offset: '85%',
          },
        );
      });
    },

    // Customizer to change the template layouts
    Customizer() {
      $('#customize .popup-open').click(function() {
        const $parent = $(this).parents('#customize');
        if ($parent.hasClass('in')) {
          $parent.removeClass('in');
        } else {
          $parent.addClass('in');
        }
      });

      $('#customize .customize-list-color a').click(function(e) {
        const $color = $(this).attr('class');
        $('head').append(
          `<link rel="stylesheet" type="text/css" href="css/colors/${$color}.css">`,
        );
        e.preventDefault();
      });
    },
  };

  // Run the main function
  $(() => {
    Multiman.init();
  });
})(window.jQuery);
