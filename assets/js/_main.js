/*
   Inits
   ========================================================================== */

$(document).ready(function() {
  // smooth scroll init
  $("a").smoothScroll({ offset: -20 });
});

/*
   Scroll to top button functionality
   ========================================================================== */

$(document).ready(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() >= 100) {
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
  /* Set header dynamically with query param */
  var query = getParameterByName('tag') ? getParameterByName('tag').toLowerCase() : null;
  $('#search-results-header').append('\"'+query+'\"');

  function getParameterByName(name) {
      url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /* Populate search results */
  for (i=1; i<=$('.search-results-article').length; i++) {
    var articleId = '#search-results-article-'+i;
    var articleTitle = $('#search-results-article-'+i).data('title').toLowerCase();
    var articleTags = getArticleTags(i);
    if (articleTags.includes(query) || articleTitle.indexOf(query) >= 0) {
      $(articleId).show();
    }
  }

  function getArticleTags(i) {
    articleTags = $('#search-results-article-'+i).data('tags').split(',');

    articleTags.forEach(function(val, index) {
      articleTags[index] = val.toLowerCase();
    });

    return articleTags;
  }

  /* Search tags with input box on Enter */
  $('#search-input').keyup(function(event) {
    if (event.keyCode === 13) {
      goToResultsPage();
    }
  });
  $('#search-input-404').keyup(function(event) {
    if (event.keyCode === 13) {
      goToResultsPage();
    }
  });
});

function goToResultsPage() {
  if ($('#search-input').val()) {
    window.location.replace(
      '/results' + '?tag=' + $('#search-input').val()
    );
  }
  if ($('#search-input-404').val()) {
    window.location.replace(
      '/results' + '?tag=' + $('#search-input-404').val()
    );
  }
}

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
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']")
  .addClass("image-popup");

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

/*
   Responsive nav menu
   ========================================================================== */

function toggleMobileMenu() {
  $('#nav-mobile').slideToggle();
  if ($('#mobile-menu-icon').attr('class') == 'fa fa-fw fa-bars') {
    $('#mobile-menu-icon').removeClass('fa-bars').addClass('fa-times');
  } else {
    $('#mobile-menu-icon').removeClass('fa-times').addClass('fa-bars');
  }
}

/*
   Contact form submission: formulate action here to avoid spambots
   ========================================================================== */

function submitContactForm() {
  $('#contact-form').attr(
    'action',
    '//formspree.io/' + 'john.abraham' + '@' + 'hotmail' + '.' + 'com'
  );

  // Handle form validation
  if (validateContactForm()) {
    $('#contact-form').submit();
  }
}

function validateContactForm() {
  // email validation styling
  if ( !validateEmail($('#contact-input-email').val()) ) {
    $('#contact-input-email').addClass('required');
    $('#invalid-email-text').show();
  } else {
    $('#contact-input-email').removeClass('required');
    $('#invalid-email-text').hide();
  }

  // subject validation styling
  if ( !$('#contact-input-subj').val() ) {
    $('#contact-input-subj').addClass('required');
    $('#invalid-subj-text').show();
  } else {
    $('#contact-input-subj').removeClass('required');
    $('#invalid-subj-text').hide();
  }

  // message validation styling
  if ( !$('#contact-input-msg').val() ) {
    $('#contact-input-msg').addClass('required');
    $('#invalid-msg-text').show();
  } else {
    $('#contact-input-msg').removeClass('required');
    $('#invalid-msg-text').hide();
  }

  // validate email, subject, and messages fields 
  if ( !$('#contact-input-subj').val() ||
       !$('#contact-input-msg').val() ||
       !validateEmail($('#contact-input-email').val()) ) {
    return false;
  }

  return true;
}

function validateEmail(email) {
  if (email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);    
  }

  return true;
}

function clearContactForm() {
  $('#contact-input-name').val('');

  $('#contact-input-email').val('');
  $('#contact-input-email').removeClass('required');
  $('#invalid-email-text').hide();
 
  $('#contact-input-subj').val('');
  $('#contact-input-subj').removeClass('required');
  $('#invalid-subj-text').hide();

  $('#contact-input-msg').val('');
  $('#contact-input-msg').removeClass('required');
  $('#invalid-msg-text').hide();
}

/* Trigger form submission success modal on successful redirect */
$(document).ready(function() {
  if(window.location.hash === '#success-modal') {
    setTimeout(function() {
      document.getElementById('#success-modal').style.visibility = 'visible';
      document.getElementById('#success-modal').classList.add('fade-in-third');
    }, 500);
  }

});

/* Dismiss success modal */
function dismissModal() {
  document.getElementById('#success-modal').style.display = 'none';
}

/*
   Static comments
   ========================================================================== */

(function($) {
  var $comments = $(".js-comments");

  $("#comment-form").submit(function() {
    var form = this;

    $(form).addClass("disabled");
    $("#comment-form-submit").html(
      '<span>Loading...</span>'
    );

    $.ajax({
      type: $(this).attr("method"),
      url: $(this).attr("action"),
      data: $(this).serialize(),
      contentType: "application/x-www-form-urlencoded",
      success: function(data) {
        $("#comment-form-submit")
          .html("Submitted")
          .addClass("btn--disabled");
        $("#comment-form .js-notice")
          .removeClass("notice--danger")
          .addClass("notice--success");
        showAlert(
          '<strong>Thanks for your comment!</strong>'
        );
      },
      error: function(err) {
        console.log(err);
        $("#comment-form-submit").html("Submit Comment");
        $("#comment-form .js-notice")
          .removeClass("notice--success")
          .addClass("notice--danger");
        showAlert(
          "<strong>Sorry, there was an error with your submission." +
          "</strong> Please make sure all required fields have been " +
          "completed and try again."
        );
        $(form).removeClass("disabled");
      }
    });

    return false;
  });

  function showAlert(message) {
    $("#comment-form .js-notice").removeClass("hidden");
    $("#comment-form .js-notice-text").html(message);
  }
})(jQuery);

// Staticman comment replies
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
var addComment = {
  moveForm: function(commId, parentId, respondId, postId) {
    var div,
      element,
      style,
      cssHidden,
      t = this,
      comm = t.I(commId),
      respond = t.I(respondId),
      cancel = t.I("cancel-comment-reply-link"),
      parent = t.I("comment-replying-to"),
      post = t.I("comment-post-slug"),
      commentForm = respond.getElementsByTagName("form")[0];

    if (!comm || !respond || !cancel || !parent || !commentForm) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if (!t.I("sm-temp-form-div")) {
      div = document.createElement("div");
      div.id = "sm-temp-form-div";
      div.style.display = "none";
      respond.parentNode.insertBefore(div, respond);
    }

    comm.parentNode.insertBefore(respond, comm.nextSibling);
    if (post && postId) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = "";

    cancel.onclick = function() {
      var t = addComment,
        temp = t.I("sm-temp-form-div"),
        respond = t.I(t.respondId);

      if (!temp || !respond) {
        return;
      }

      t.I("comment-replying-to").value = null;
      temp.parentNode.insertBefore(respond, temp);
      temp.parentNode.removeChild(temp);
      this.style.display = "none";
      this.onclick = null;
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     * Try/catch used just to avoid errors in IE 7- which return visibility
     * 'inherit' when the visibility value is inherited from an ancestor.
     */
    try {
      for (var i = 0; i < commentForm.elements.length; i++) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ("getComputedStyle" in window) {
          style = window.getComputedStyle(element);
          // IE 8.
        } else if (document.documentElement.currentStyle) {
          style = element.currentStyle;
        }

        /*
         * For display none, do the same thing jQuery does. For visibility,
         * check the element computed style since browsers are already doing
         * the job for us. In fact, the visibility computed style is the actual
         * computed value and already takes into account the element ancestors.
         */
        if (
          (element.offsetWidth <= 0 && element.offsetHeight <= 0) ||
          style.visibility === "hidden"
        ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ("hidden" === element.type || element.disabled || cssHidden) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }
    } catch (er) {}

    return false;
  },

  I: function(id) {
    return document.getElementById(id);
  }
};

/*
 * Clear comment form
 */
function clearCommentForm() {
  $('#comment-form-message').val('');
  $('#comment-form-name').val('');
  $('#comment-form-email').val('');
  $('#comment-form-url').val('');
}

/*
 * Toggle visibility of reply comments
 */
function toggleReplyComments(parentCommentIndex) {
  var parentCommentId = 'comment-' + parentCommentIndex;

  $( '#show-replies-'+ parentCommentIndex ).toggle();
  $( '#hide-replies-'+ parentCommentIndex ).toggle();

  $( 'article[id^="'+parentCommentId+'-"]' ).slideToggle();
}