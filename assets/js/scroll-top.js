// Scroll back to top button
$(document).ready(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {
          $('.scroll-top').show();
      } else {
          $('.scroll-top').hide();
      }
  });
  $('.scroll-top').click(function() {
      $('body,html').animate({
          scrollTop : 0
      }, 500);
  });
});