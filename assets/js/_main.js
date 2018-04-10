/*
   Responsive Menu
   [http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/]
   ========================================================================== */
/* The function to change the class */
var changeClass = function (r,className1,className2) {
  var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
  if( regex.test(r.className) ) {
    r.className = r.className.replace(regex,' '+className2+' ');
    }
    else{
    r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
    }
    return r.className;
};

/* Creating our button in JS for smaller screens */
document.getElementById('site-nav').insertAdjacentHTML(
  'afterBegin',
  '<button type="button" role="button" id="menutoggle" class="navtoggle navicon-lines-button x" aria-hidden="true">' +
    '<span class="navicon-lines"></span>' +
    '<span class="navicon-text">menu</span>' +
  '</button>'
);

/* Toggle the class on click to show / hide the menu */
document.getElementById('menutoggle').onclick = function() {
  changeClass(this, 'navtoggle active', 'navtoggle');
  $('.top-navigation-mobile').slideToggle();
};

/* http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/comment-page-2/#comment-438918 */
document.onclick = function(e) {
  var mobileButton = document.getElementById('menutoggle'),
    buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

  if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
    changeClass(mobileButton, 'navtoggle active', 'navtoggle');
  }
};

/*
   Scroll to top button functionality
   ========================================================================== */
$(document).ready(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() >= 300) {
          $('.scroll-top').show();
      } else {
          $('.scroll-top').hide();
      }
  });
  $('.scroll-top').click(function() {
      $('body,html').animate({scrollTop : 0}, 500);
  });
});

/*
   Tag lookup results page
   ========================================================================== */
$(document).ready(function() {
  var query = getParameterByName('tag');
  $('#search-results-header').append('<i>\"'+query+'\"</i>');

  for (i=1; i<=$('.search-results-article').length; i++) {
    var articleId = '#search-results-article-'+i;
    var articleTags = $('#search-results-article-'+i).data('tags').split(',');
    if ( articleTags.includes(query) ) {
      $(articleId).show();
    }
  }

  function getParameterByName(name) {
      url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
});

/*
   Plugin options and other jQuery stuff
   ========================================================================== */
/* FitVids options */
$(function() {
  $("article").fitVids();
});

/* Table of Contents toggle */
$(function() {
  $(".toc h3").click(function () {
    $("#drawer").toggleClass("js-hidden");
  });
});

/* Add lightbox class to all image links */
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

/* Magnific-Popup options */
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});