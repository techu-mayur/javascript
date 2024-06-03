function hiderror() {
  setTimeout(function (e) {
    $(".errormsg").css("display", "none");
  }, 5000);
}
$("#reachusform").submit(function (e) {
  e.preventDefault();
  var loginEmail = $("#loginEmail").val();
  var loginPassword = $("#loginPassword").val();
  var filter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (loginEmail === "") {
    $("#frm_Email_error").show();
    hiderror();
    return false;
  } else if (!filter.test(loginEmail)) {
    $("#frm_Email_error2").show();
    hiderror();
    return false;
  } else if (loginPassword === "") {
    $("#frm_Pwd_error").show();
    hiderror();
    return false;
  } else if (grecaptcha.getResponse(0) == "") {
    $("#frm_Captcha_error").fadeIn();
    hiderror();
    return false;
  } else {
    var formData = new FormData($("#reachusform")[0]);
    //for (var pair of formData.entries()) {
    //console.log(pair[0] + ', ' + pair[1]);
    //}
    $("#subbtnd").html("Logged In...");
    $("#subbtnd").prop("disabled", true);
    $(".pleasewait").css("display", "inline-block"),
      $.ajax({
        url: "reachusformdata.php",
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
          console.log(response);
          $(".pleasewait").css("display", "none");
          $("#subbtnd").attr("disabled", false);
          $("#subbtnd").html("Submit");
          $("#reachusform")[0].reset();
          // $("#connect-popup").fadeIn(500);
          grecaptcha.reset();
          showThankYouPopup();
        },
        error: function (xhr, status, error) {
          console.log("AJAX Error:", error); // Log the error message
          $(".pleasewait").css("display", "none");
          $("#subbtnd").attr("disabled", false);
          $("#subbtnd").html("Submit");
          // alert(
          //   "An error occurred while submitting the form. Please try again later."
          // );
        },
      });
  }
});
function showThankYouPopup() {
  $(".thankpop").show();
  $("#backgroundPopup").show().css({ display: "block", opacity: "0.7" });
}

$("div.close").click(function () {
  disablePopup();
});

function disablePopup() {
  $(".thankpop").fadeOut("normal");
  $("#backgroundPopup").fadeOut("normal");
}
