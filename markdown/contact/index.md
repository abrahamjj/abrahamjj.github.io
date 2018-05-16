---
layout: page
title: Contact Me
permalink: /contact
type: contact
comments: false
---

<div class="success-modal-wrapper" id="#success-modal" >
  <div class="success-modal">
    <i class="fa fa-fw fa-check-circle"></i>
    <div class="modal-text-container">
      <h2>Success!</h2>
      <p>Your message has been sent.</p>
      <a href="javascript: dismissModal()" class="btn">DISMISS</a>
    </div>
  </div>
</div>

<form id="contact-form" method="POST">
    <p>Feel free to drop me a line via this contact form below, or click the
    mail icon in the navigation bar to send me an email directly.</p>

    <div class="contact-input-group">
      <label>Name:</label>
      <input
        type="text"
        name="Name"
        id="contact-input-name"
        placeholder="Your name (optional)..."
        maxlength="50">
    </div>

    <div class="contact-input-group">
      <label>Email:</label>
      <input
        type="email"
        name="Email"
        id="contact-input-email"
        placeholder="Your Email address (optional)..."
        maxlength="50">
      <span id="invalid-email-text" class="byline">
        <i class="fa fa-fw fa-exclamation-triangle"></i>
        Please enter a valid email address.
      </span>
    </div>

    <div class="contact-input-group">
      <label>Subject:</label>
      <input
        type="text"
        name="Subject"
        id="contact-input-subj"
        placeholder="Subject line (required)..."
        maxlength="100">
      <span id="invalid-subj-text" class="byline">
        <i class="fa fa-fw fa-exclamation-triangle"></i>
        Please enter a subject line.
      </span>
    </div>

    <div class="contact-input-group">
      <label>Message:</label>
      <textarea
        name="Message"
        id="contact-input-msg"
        placeholder="Message body (required)..."
        maxlength="2000"
      ></textarea>
      <span id="invalid-msg-text" class="byline">
        <i class="fa fa-fw fa-exclamation-triangle"></i>
        Please enter a message body.
      </span>
      <div class="byline">
        Please allow at least 24 hours for me
        to get back to you...
      </div>
    </div>

    <a href="javascript: clearContactForm();" class="btn">
      Clear
    </a>
    <a href="javascript: submitContactForm();" class="btn">
      Send
    </a>

    <!-- redirect to custom thank you -->
    <input
      type="hidden"
      name="_next"
      value="/contact#success-modal" />

    <!-- tell Formspree to neglect forms submitted by bots -->
    <input type="text" name="_gotcha" style="display:none" />
</form>

<div class="contact-img">
  <img
    src="http://johnabraham.me/assets/img/if_envelope.png"
    alt="contact-me-photo">
</div>

<script type="text/javascript">
  /* Trigger form submission success modal on redirect */
  if(window.location.hash === '#success-modal') {
    setTimeout(function() {
      document.getElementById('#success-modal').style.visibility = 'visible';
      document.getElementById('#success-modal').classList.add('fade-in-third');
    }, 500);
  }

  /* Dismiss success modal */
  function dismissModal() {
    document.getElementById('#success-modal').style.display = 'none';
  }
</script>