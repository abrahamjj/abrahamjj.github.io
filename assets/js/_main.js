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
  $('#scroll-top').click(function() {
      $('body,html').animate({scrollTop : 0}, 500);
  });
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
   Toastem.js JQuery plugin for toast messages
   ========================================================================== */

var toastem = (function($) {
  var normal = function(content) {
    var item = $(
      '<div class="notification normal">'+
        '<span>'+
          '<i class="fa fa-fw fa-info-circle"></i>'+content+
        '</span>'+
      '</div>'
    );
    $("#toastem").append($(item));
    $(item).animate({"top":"10px"}, "fast");
    setInterval(function(){
      $(item).animate({"top":"-400px"},function() {
        $(item).remove();
      });
    },6000);
  };

  var success = function(content) {
    var item = $(
      '<div class="notification success">'+
        '<span>'+
          '<i class="fa fa-fw fa-check-circle"></i>'+content+
        '</span>'+
      '</div>'
    );
    $("#toastem").append($(item));
    $(item).animate({"top":"10px"}, "fast");
    setInterval(function(){
      $(item).animate({"top":"-400px"},function() {
        $(item).remove();
      });
    },6000);
  };

  var error = function(content) {
    var item = $(
      '<div class="notification error">'+
        '<span>'+
          '<i class="fa fa-fw fa-exclamation-circle"></i>'+content+
        '</span>'+
      '</div>'
    );
    $("#toastem").append($(item));
    $(item).animate({"top":"10px"}, "fast");
    setInterval(function(){
      $(item).animate({"top":"-400px"},function() {
        $(item).remove();
      });
    },6000);
  };

  $(document).on('click','.notification', function() {
    $(this).fadeOut(400,function() {
      $(this).remove();
    });
  });

  return{
    normal: normal,
    success: success,
    error: error
  };

})(jQuery);

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

function clearContactForm() {
  $('#contact-form')[0].reset();
  $('#contact-input-email').removeClass('required');
  $('#email-label').css('color', 'black');
  $('#contact-input-subj').removeClass('required');
  $('#subj-label').css('color', 'black');
  $('#contact-input-msg').removeClass('required');
  $('#msg-label').css('color', 'black');
}

function validateContactForm() {
  // email validation styling
  if ( !validateEmail($('#contact-input-email').val()) ) {
    $('#contact-input-email').addClass('required');
    $('#email-label').css('color', 'red');
  } else {
    $('#contact-input-email').removeClass('required');
    $('#email-label').css('color', 'black');
  }

  // subject validation styling
  if ( !$('#contact-input-subj').val() ) {
    $('#contact-input-subj').addClass('required');
    $('#subj-label').css('color', 'red');
  } else {
    $('#contact-input-subj').removeClass('required');
    $('#subj-label').css('color', 'black');
  }

  // message validation styling
  if ( !$('#contact-input-msg').val() ) {
    $('#contact-input-msg').addClass('required');
    $('#msg-label').css('color', 'red');
  } else {
    $('#contact-input-msg').removeClass('required');
    $('#msg-label').css('color', 'black');
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

/* Trigger form submission success modal on successful redirect */
$(document).ready(function() {
  if(window.location.hash === '#contact-success-msg') {
    setTimeout(function() {
      toastem.success('Thank you. Your message was sent successfully!');
    }, 250);
  }
});

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
        $("#comment-form-submit").html("Submitted").addClass("btn--disabled");
        clearCommentForm();

        toastem.success(
          'Thank you for your comment! Please allow a few minutes ' +
          'before your comment appears.'
        );
      },
      error: function(err) {
        console.log(err);
        $("#comment-form-submit").html("Submit Comment");
        toastem.error(
          'Sorry, there was an error with your submission. Please ' +
          'make sure all required fields have been completed and try again.'
        );
        $(form).removeClass("disabled");
      }
    });

    return false;
  });

  $("#reply-form").submit(function() {
    var form = this;

    $.ajax({
      type: $(this).attr("method"),
      url: $(this).attr("action"),
      data: $(this).serialize(),
      contentType: "application/x-www-form-urlencoded",
      success: function(data) {
        $("#comment-form-submit").html("Submitted").addClass("btn--disabled");
        $('[data-remodal-id=reply-comment-modal]').remodal().close();
        clearReplyForm();

        toastem.success(
          'Thank you for your reply! Please allow a few minutes before your ' +
          'comment appears.'
        );
      },
      error: function(err) {
        console.log(err);
        $("#comment-form-submit").html("Submit Comment");

        toastem.error(
          'Sorry, there was an error with your submission. Please ' +
          'make sure all required fields have been completed and try again.'
        );
        $(form).removeClass("disabled");
      }
    });

    return false;
  });
})(jQuery);

/*
 * trigger reply modal & form configs
 */
function openReplyModal(parentId) {
  $('[data-remodal-id=reply-comment-modal]').remodal().open();
  $('input[name="fields[replying_to]"]').val(parentId);
}

/*
 * Clear comment/reply forms
 */
function clearCommentForm() {
  $('#comment-form')[0].reset();
}
function clearReplyForm() {
  $('#reply-form')[0].reset();
}

/*
 * Toggle visibility of reply comments
 */
function toggleReplyComments(parentCommentIndex) {
  var parentCommentId = 'comment-' + parentCommentIndex;

  $( '#show-replies-'+ parentCommentIndex ).toggle();
  $( '#hide-replies-'+ parentCommentIndex ).toggle();

  $( 'article[id^="'+parentCommentId+'-"]' ).slideToggle('fast');
}