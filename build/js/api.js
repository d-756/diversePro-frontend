/*
 *
 * API
 *
 */

$(document).ready(function () {
  checkCookie();
  // $(".swipebox").swipebox();

  // var apiDomain = "https://diversepro.api.creativeteam.io";
  var apiDomain = "https://api.diversepro.com";

  $(".language-menu li").each(function () {
    if (Cookies.get("language") === $(this).find("a").attr("data-lang")) {
      $(".language-menu li").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(".hero-search-form-wrapper form .main-input").on("keyup", function(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("searchAP").click();
    }
  });

  $(".hero-search-form-wrapper form #city-state").on("keyup", function(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("searchAP").click();
    }
  });

  //Main Search
  $(".hero-search-form-wrapper form").on("submit", function (e) {
    e.preventDefault();

    var searchText = $(".hero-search-form-wrapper form .main-input").val();
    var location = $(".hero-search-form-wrapper form #city-state").val();
    window.open(
      "search.html?query=" + searchText + "&location=" + location + "&page=1",
      "_self"
    );
    $("body").removeClass("loading");
    $("#confirm").attr("hidden", false);
  });

  //Practice Search
  $(".prartices-wrapper .btn-primary").on("click", function (e) {
    e.preventDefault();
    var practiceArea = "";
    var speciality = "";
    if ($(".practices-search option:selected").attr("data-pr-or-sp") === "pr") {
      practiceArea = $(".practices-search").val();
      speciality = "";
    } else {
      speciality = $(".practices-search").val();
      practiceArea = "";
    }

    var location = $("#city-state").val();
    window.open(
      "search.html?practiceArea=" +
        practiceArea +
        "&speciality=" +
        speciality +
        "&location=" +
        location +
        "&page=1",
      "_self"
    );
    $("body").removeClass("loading");
  });

  /*
   *
   *   STEP 1  (Find your profile)
   *
   */
  $(document).on("submit", ".find-profile", function (e) {
    e.preventDefault();
    var name = $("#find-profile-name").val();
    var city = $("#find-profile-city").val();
    $.ajax({
      type: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: apiDomain + "/Search/Attorneys",
      dataType: "json",
      data: JSON.stringify({
        query: name,
        location: city,
        attorneyType: "Unclaimed",
        currentPage: 0,
        pageSize: 9,
      }),
      beforeSend: function () {
        $("body").addClass("loading");
      },
      success: function (res) {
        var item = "";
        var links = "";
        var count = res["totalCount"];
        res = res["attorneys"];
        $.each(res, function (key, arr) {
          var address = "";
          if (res[key]["address"] !== null) {
            address = res[key]["address"]["fullAddress"];
          } else {
            address = "";
          }

          var name = res[key]["fullName"];
          var id = res[key]["id"];
          item +=
            '                    <div class="register-results__people-item">\n' +
            '                        <div class="people-block">\n' +
            '                            <div class="people-image">\n' +
            '                                <img src="images/user.png" alt="">\n' +
            "                            </div>\n" +
            '                            <div class="people-info">\n' +
            '                                <p class="name">' +
            name +
            "</p>\n" +
            '                                <p class="address">' +
            address +
            "</p>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            '                        <button class="btn btn-primary claim-btn" data-id="' +
            id +
            '">Claim profile</button>\n' +
            "                    </div>\n";
        });
        var recapWrapper = "";
        if (count <= 9) {
          recapWrapper = "";
        } else {
          recapWrapper =
            '<div class="captcha">' +
            '   <div class="g-recaptcha" id="RecaptchaField3" data-sitekey="6LdyrMgZAAAAALg5Lav0tZYREW3gpMJyVBMrDnE4"></div>\n' +
            '   <div class="text-danger" id="recaptchaError-search"></div>' +
            "</div>\n";
          var decade = parseInt(count / 10) + 1;
          var i;
          if (decade > 6) {
            $cycleSize = 6;
          } else {
            $cycleSize = decade;
          }
          for (i = 1; i <= $cycleSize; i++) {
            var active = "";
            if (i === 1) {
              active = "active";
            } else {
              active = "";
            }
            if (decade >= 6) {
              if (i <= 6) {
                links +=
                  '<a class="need-captcha-reg ' + active + '">' + i + "</a>";
              } else {
                if (i === decade) {
                  links += '<a class="none">...</a>';
                  links +=
                    '<a class="need-captcha-reg ' + active + '">' + i + "</a>";
                }
              }
            } else {
              links +=
                '<a class="need-captcha-reg ' + active + '">' + i + "</a>";
            }
          }
        }
        $(".step1").after(
          '<section class="register step2" style="display:none;">\n' +
            '    <div class="container">\n' +
            '        <div class="register-wrapper">\n' +
            '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
            "            <h2>Find your profile</h2>\n" +
            '            <ul class="steps">\n' +
            '                <li class="completed"></li>\n' +
            '                <li class="active">Step 2</li>\n' +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "            </ul>\n" +
            '            <div class="register-results">\n' +
            '                <p class="search-name">Lawyers named <span>' +
            name +
            "</span></p>\n" +
            '                <p class="count-results">' +
            count +
            " found</p>\n" +
            '                <div class="register-results__people">\n' +
            item +
            "                </div>" +
            recapWrapper +
            '<div class="pagination">' +
            links +
            "</div>" +
            '                <div class="reg-create-profile">\n' +
            "                    <h3>Don't see your profile?</h3>\n" +
            '                    <p>We may not have it yet. <a href="#" class="create-account"><span>Create a profile here.</span></a></p>\n' +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</section>"
        );
        if (count > 9) {
          grecaptcha.render("RecaptchaField3", {
            sitekey: "6LdyrMgZAAAAALg5Lav0tZYREW3gpMJyVBMrDnE4",
          });
        }
        $(".step1").fadeOut();
        $(".step2").fadeIn();
      },
      complete: function () {
        smoothScroll();
        $("body").removeClass("loading");
      },
    });
  });

  /*
   *
   * STEP 1 (Pagination)
   *
   */
  $(document).on("click", ".register-results .pagination a", function () {
    var page = parseInt($(this).text());
    var name = $("#find-profile-name").val();
    var city = $("#find-profile-city").val();
    var response = grecaptcha.getResponse(0);
    if (response.length !== 0) {
      grecaptcha.reset();
      $(".pagination a").removeClass("active");
      $(this).addClass("active");
      $("#recaptchaError-search").text("");
      $.ajax({
        type: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: apiDomain + "/Search/Attorneys",
        dataType: "json",
        data: JSON.stringify({
          query: name,
          attorneyType: "Unclaimed",
          location: city,
          currentPage: page - 1,
          pageSize: 9,
        }),
        beforeSend: function () {
          $("body").addClass("loading");
        },
        success: function (res) {
          var item = "";
          var links = "";
          var count = res["totalCount"];
          res = res["attorneys"];
          $.each(res, function (key, arr) {
            var address = "";
            if (res[key]["address"] !== null) {
              address = res[key]["address"]["fullAddress"];
            } else {
              address = "";
            }

            var name = res[key]["fullName"];
            var id = res[key]["id"];
            item +=
              '                    <div class="register-results__people-item">\n' +
              '                        <div class="people-block">\n' +
              '                            <div class="people-image">\n' +
              '                                <img src="images/user.png" alt="">\n' +
              "                            </div>\n" +
              '                            <div class="people-info">\n' +
              '                                <p class="name">' +
              name +
              "</p>\n" +
              '                                <p class="address">' +
              address +
              "</p>\n" +
              "                            </div>\n" +
              "                        </div>\n" +
              '                        <button class="btn btn-primary claim-btn" data-id="' +
              id +
              '">Claim profile</button>\n' +
              "                    </div>\n";
          });
          $(".register-results__people").html(item);
        },
        complete: function () {
          smoothScroll();
          $("body").removeClass("loading");
        },
      });
    } else {
      if (!$("#recaptchaError-search").text()) {
        $("#recaptchaError-search").append(
          "You must complete the verification in order to proceed."
        );
      }
    }
  });

  /*
   *
   *   STEP 2  (Claim single profile)
   *
   */
  $(document).on("click", ".claim-btn", function () {
    var attorneyId = $(this).attr("data-id");

    $.ajax({
      type: "GET",
      url: apiDomain + "/Attorney/" + attorneyId,
      beforeSend: function () {
        $("body").addClass("loading");
      },
      success: function (res) {
        var id = res["id"];
        var middleName = "";
        if (res["middleName"] !== undefined || res["middleName"] !== null) {
          middleName = " " + res["middleName"];
        }
        var name = res["fullName"];
        var education = "";
        if (res["educationalInfo"] && res["educationalInfo"]["lawSchool"]) {
          education = res["educationalInfo"]["lawSchool"];
        } else education = "";
        var address = res["address"]["fullAddress"];
        if (res["address"]["address1"]) {
          address =
            '<p><span class="icon-location-g"></span>' + address + "</p>";
        }
        if (education !== "") {
          education =
            '<p><span class="icon-education"></span>' + education + "</p>";
        }
        var license = [];
        $.each(res["licenses"], function (pkey, parr) {
          var d = new Date();
          var currYear = d.getFullYear();
          if (res["licenses"][pkey]["date"]) {
            var licenseYear = res["licenses"][pkey]["date"].substr(0, 4);
            var diffYear = currYear - licenseYear;
            var licenseDate = res["licenses"][pkey]["date"].substr(0, 16);
            license.push(
              '<div class="license">' +
                '<span class="year">Licensed for ' +
                diffYear +
                " years</span>" +
                '<span class="number">' +
                res["licenses"][pkey]["state"] +
                " - " +
                licenseDate +
                "</span>" +
                "</div>"
            );
          } else {
            license = "";
          }
        });
        if (license) license.join("");
        $(".step2, .single-page-profile").after(
          '<section class="register step3" style="display:none;">\n' +
            '    <div class="container">\n' +
            '        <div class="register-wrapper">\n' +
            '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
            "            <h2>Claim your Profile</h2>\n" +
            '            <ul class="steps">\n' +
            '                <li class="completed"></li>\n' +
            '                <li class="completed"></li>\n' +
            '                <li class="active">Step 3</li>\n' +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "                <li></li>\n" +
            "            </ul>\n" +
            '            <div class="register-results__people">\n' +
            '                <div class="register-results__people-item">\n' +
            '                    <div class="people-block">\n' +
            '                        <div class="people-image">\n' +
            '                            <img src="images/user.png" alt="">\n' +
            "                        </div>\n" +
            '                        <div class="people-info">\n' +
            '                            <p class="name">' +
            name +
            "</p>\n" +
            license +
            "                        </div>\n" +
            "                    </div>\n" +
            '                    <div class="location">\n' +
            address +
            education +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            '            <div class="confirm">\n' +
            '                <input class="styled-checkbox" id="styled-checkbox-1" type="checkbox">\n' +
            '                <label for="styled-checkbox-1">I confirm that I am ' +
            name +
            ' and I accept DiversePro\'s <a href="terms.html" target="_blank">Terms of Use</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>.\n' +
            "                </label>\n" +
            "            </div>\n" +
            '            <button class="btn btn-primary from-step3" data-id="' +
            id +
            '">Continue</button>\n' +
            "        </div>\n" +
            "    </div>\n" +
            "</section>"
        );
        $(".step2, .single-page-profile").fadeOut();
        smoothScroll();
        $(".step3").fadeIn();
      },
      complete: function () {
        $("body").removeClass("loading");
      },
    });
  });

  /*
   *
   *   STEP 2  (Create Account)
   *
   */
  $(document).on("click", ".create-account", function () {
    $(".step2").fadeOut();
    $(".step2").after(
      '<section class="register step3-create" style="display:none;">\n' +
        '    <div class="container">\n' +
        '        <div class="register-wrapper">\n' +
        '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
        "            <h2>Create your profile</h2>\n" +
        '            <ul class="steps">\n' +
        '                <li class="completed"></li>\n' +
        '                <li class="completed"></li>\n' +
        '                <li class="active">Step 3</li>\n' +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "            </ul>\n" +
        '            <div class="create-account-block">\n' +
        '                <h3 class="create-title">Become active on DiversePro!</h3>\n' +
        '                <div class="confirm">\n' +
        '                    <input class="styled-checkbox" id="styled-checkbox-5" type="checkbox">\n' +
        '                    <label for="styled-checkbox-5">I accept DiversePro\'s <a href="terms.html" target="_blank">Terms of Use</a> and <a href="privacy.html" target="_blank"> Privacy Policy</a>.</label>\n' +
        "                </div>\n" +
        "            </div>\n" +
        "\n" +
        '            <button class="btn btn-primary from-step3-create">Continue</button>\n' +
        "        </div>\n" +
        "    </div>\n" +
        "</section>"
    );
    smoothScroll();
    $(".step3-create").fadeIn();
  });

  /*
   *
   *   STEP 3  (Create - Open Contact Info)
   *
   */
  $(document).on("click", ".from-step3-create", function () {
    if ($("#styled-checkbox-5").is(":checked")) {
      $(".step4").remove();
      $(".step3-create").after(
        '<section class="register step4" style="display:none;">\n' +
          '    <div class="container">\n' +
          '        <div class="register-wrapper">\n' +
          '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
          "            <h2>Add your contact information</h2>\n" +
          '            <ul class="steps">\n' +
          '                <li class="completed"></li>\n' +
          '                <li class="completed"></li>\n' +
          '                <li class="completed"></li>\n' +
          '                <li class="active">Step 4</li>\n' +
          "                <li></li>\n" +
          "                <li></li>\n" +
          "                <li></li>\n" +
          "                <li></li>\n" +
          "                <li></li>\n" +
          "            </ul>\n" +
          '            <div class="add-info-form">\n' +
          '                <form class="from-step4">\n' +
          "                    <h3>Account details</h3>\n" +
          "                    <b></b>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="username">Username <span class="required">*</span></label>\n' +
          '                        <input type="text" id="username" placeholder="Type here" required minlength="8" maxlength="15">\n' +
          '                        <div class="tooltip-info">\n' +
          '                            <img src="images/info.svg" alt="">\n' +
          "                            <p>Usernames must be 8-15 characters in length and may contain letters, numbers, or special characters.</p>\n" +
          "                        </div>\n" +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="password">Password <span class="required">*</span></label>\n' +
          '                        <input type="password" id="password" class="password" placeholder="Enter password" required minlength="8" maxlength="15">\n' +
          '                        <span class="icon-show toggle-password"></span>\n' +
          '                        <div class="tooltip-info">\n' +
          '                            <img src="images/info.svg" alt="">\n' +
          "                            <p>Passwords must be 8-15 characters in length and must contain at least 1 letter and 1 number</p>\n" +
          "                        </div>\n" +
          "                    </div>\n" +
          "                    <h3>Name details</h3>\n" +
          "                    <b></b>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="firstname">First Name <span class="required">*</span></label>\n' +
          '                        <input type="text" id="firstname" placeholder="Type here" required>\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="middlename">Middle Name</label>\n' +
          '                        <input type="text" id="middlename" placeholder="Type here" >\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="maidenname">Maiden Name</label>\n' +
          '                        <input type="text" id="maidenname" placeholder="Type here">\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="lastname">Last Name <span class="required">*</span></label>\n' +
          '                        <input type="text" id="lastname" placeholder="Type here" required>\n' +
          "                    </div>\n" +
          "                    <h3>Business details</h3>\n" +
          "                    <b></b>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="company">Company / Organization</label>\n' +
          '                        <input type="text" id="company" placeholder="Type here">\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="address">Address</label>\n' +
          '                        <input type="text" id="address" placeholder="Type here">\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="suite">Suite</label>\n' +
          '                        <input type="text" id="suite" placeholder="Type here">\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="city">City</label>\n' +
          '                        <input type="text" id="city" placeholder="Type here">\n' +
          "                    </div>\n" +
          "                    <b></b>\n" +
          '                    <div class="form-group small">\n' +
          '                        <label for="state">State</label>\n' +
          '                        <select id="state" class="add-info-select">' +
          '<option value="AL">AL</option>\n' +
          '\t<option value="AK">AK</option>\n' +
          '\t<option value="AZ">AZ</option>\n' +
          '\t<option value="AR">AR</option>\n' +
          '\t<option value="CA">CA</option>\n' +
          '\t<option value="CO">CO</option>\n' +
          '\t<option value="CT">CT</option>\n' +
          '\t<option value="DE">DE</option>\n' +
          '\t<option value="DC">DC</option>\n' +
          '\t<option value="FM">FM</option>\n' +
          '\t<option value="FL">FL</option>\n' +
          '\t<option value="GA">GA</option>\n' +
          '\t<option value="HI">HI</option>\n' +
          '\t<option value="ID">ID</option>\n' +
          '\t<option value="IL">IL</option>\n' +
          '\t<option value="IN">IN</option>\n' +
          '\t<option value="IA">IA</option>\n' +
          '\t<option value="KS">KS</option>\n' +
          '\t<option value="KY">KY</option>\n' +
          '\t<option value="LA">LA</option>\n' +
          '\t<option value="ME">ME</option>\n' +
          '\t<option value="MH">MH</option>\n' +
          '\t<option value="MD">MD</option>\n' +
          '\t<option value="MA">MA</option>\n' +
          '\t<option value="MI">MI</option>\n' +
          '\t<option value="MN">MN</option>\n' +
          '\t<option value="MS">MS</option>\n' +
          '\t<option value="MO">MO</option>\n' +
          '\t<option value="MT">MT</option>\n' +
          '\t<option value="NE">NE</option>\n' +
          '\t<option value="NV">NV</option>\n' +
          '\t<option value="NH">NH</option>\n' +
          '\t<option value="NJ">NJ</option>\n' +
          '\t<option value="NM">NM</option>\n' +
          '\t<option value="NY">NY</option>\n' +
          '\t<option value="NC">NC</option>\n' +
          '\t<option value="ND">ND</option>\n' +
          '\t<option value="OH">OH</option>\n' +
          '\t<option value="OK">OK</option>\n' +
          '\t<option value="OR">OR</option>\n' +
          '\t<option value="PW">PW</option>\n' +
          '\t<option value="PA">PA</option>\n' +
          '\t<option value="RI">RI</option>\n' +
          '\t<option value="SC">SC</option>\n' +
          '\t<option value="SD">SD</option>\n' +
          '\t<option value="TN">TN</option>\n' +
          '\t<option value="TX">TX</option>\n' +
          '\t<option value="UT">UT</option>\n' +
          '\t<option value="VT">VT</option>\n' +
          '\t<option value="VA">VA</option>\n' +
          '\t<option value="WA">WA</option>\n' +
          '\t<option value="WV">WV</option>\n' +
          '\t<option value="WI">WI</option>\n' +
          '\t<option value="WY">WY</option>' +
          '<option value="AS">AS</option>\n' +
          '<option value="GU">GU</option>\n' +
          '<option value="MP">MP</option>\n' +
          '<option value="PR">PR</option>\n' +
          '<option value="UM">UM</option>\n' +
          '<option value="VI">VI</option>' +
          '<option value="AA">AA</option>\n' +
          '<option value="AP">AP</option>\n' +
          '<option value="AE">AE</option>\t' +
          "</select>\n" +
          "                    </div>\n" +
          '                    <div class="form-group small">\n' +
          '                        <label for="zip">Zip</label>\n' +
          '                        <input type="text" id="zip" placeholder="Type here">\n' +
          "                    </div>\n" +
          "                    <h3>Contacts</h3>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="workphone">Work Phone <span class="required">*</span></label>\n' +
          '                        <input type="text" id="workphone" class="phone-format" placeholder="Type here" required>\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="homephone">Home Phone</label>\n' +
          '                        <input type="text" id="homephone" class="phone-format" placeholder="Type here">\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="mobilephone">Mobile Phone <span class="required">*</span></label>\n' +
          '                        <input type="text" id="mobilephone" class="phone-format" placeholder="Type here" required>\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="fax">Fax </label>\n' +
          '                        <input type="text" id="fax" class="phone-format" placeholder="Type here">\n' +
          "                    </div>\n" +
          '                    <div class="form-group">\n' +
          '                        <label for="email">Email <span class="required">*</span></label>\n' +
          '                        <input type="text" id="email" placeholder="Type here" required>\n' +
          "                    </div>\n" +
          '                    <div class="form-submit">\n' +
          '                        <p class="description"><span class="required">*</span> Required Fields</p>\n' +
          '                        <button type="submit" class="btn btn-primary">Continue</button>\n' +
          "                    </div>\n" +
          "                </form>\n" +
          "            </div>\n" +
          "        </div>\n" +
          "    </div>\n" +
          "</section>"
      );
      $(".step3-create").fadeOut();
      smoothScroll();
      $(".phone-format")
        .toArray()
        .forEach(function (field) {
          new Cleave(field, {
            numericOnly: true,
            blocks: [0, 3, 0, 3, 4],
            delimiters: ["(", ")", " ", "-"],
          });
        });
      $(".step4").fadeIn();
      initSelect2($(".add-info-select"));
    } else if (!$(".step3-create .need-check").length) {
      $("#styled-checkbox-5")
        .next()
        .after(
          '<p class="need-check">To claim or create your profile, you must agree to DiversePro’s <a href="terms.html" target="_blank">Terms of Use</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>.</p>'
        );
    }
  });

  /*
   *
   *   STEP 3  (Claim Account)
   *
   */
  $(document).on("click", ".from-step3", function () {
    if ($("#styled-checkbox-1").is(":checked")) {
      var attorneyId = $(this).attr("data-id");
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        beforeSend: function () {
          $("body").addClass("loading");
        },
        success: function (res) {
          var firstName = res["firstName"];
          var lastName = res["lastName"];
          var middleName = res["middleName"];
          var maidenName = res["maidenName"];
          var company = res["professionalInfo"]["company"];
          var address = res["address"]["address1"];
          var city = res["address"]["city"];
          var states = res["address"]["state"];
          var zips = res["address"]["zip"];
          var workPhone = res["contactInfo"]["workPhoneNumber"];
          var mobilePhone = res["contactInfo"]["mobilePhoneNumber"];
          var homePhone = res["contactInfo"]["homePhoneNumber"];
          var email = res["contactInfo"]["emailAddress"];

          firstName = firstName != null ? res["firstName"] : "";
          lastName = lastName !== null ? res["lastName"] : "";
          middleName = middleName !== null ? res["middleName"] : "";
          maidenName = maidenName !== null ? res["maidenName"] : "";
          company = company !== null ? res["professionalInfo"]["company"] : "";
          address = address !== null ? res["address"]["address1"] : "";
          city = city !== null ? res["address"]["city"] : "";
          states = states !== null ? res["address"]["state"] : "";
          zips = zips !== null ? res["address"]["zip"] : "";
          workPhone =
            workPhone !== null ? res["contactInfo"]["workPhoneNumber"] : "";
          mobilePhone =
            mobilePhone !== null ? res["contactInfo"]["mobilePhoneNumber"] : "";
          homePhone =
            homePhone !== null ? res["contactInfo"]["homePhoneNumber"] : "";
          email = email !== null ? res["contactInfo"]["emailAddress"] : "";

          $(".step4").remove();
          $(".step3").after(
            '<section class="register step4 claim-account" style="display:none;">\n' +
              '    <div class="container">\n' +
              '        <div class="register-wrapper">\n' +
              '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
              "            <h2>Add your contact information</h2>\n" +
              '            <ul class="steps">\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="active">Step 4</li>\n' +
              "                <li></li>\n" +
              "                <li></li>\n" +
              "                <li></li>\n" +
              "                <li></li>\n" +
              "                <li></li>\n" +
              "            </ul>\n" +
              '            <div class="add-info-form">\n' +
              '                <form class="from-step4">\n' +
              "                    <h3>Account details</h3>\n" +
              "                    <b></b>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="username">Username <span class="required">*</span></label>\n' +
              '                        <input type="text" id="username" placeholder="Type here" required minlength="8" maxlength="15">\n' +
              '                        <div class="tooltip-info">\n' +
              '                            <img src="images/info.svg" alt="">\n' +
              "                            <p>Usernames must be 8-15 characters in length and may contain letters, numbers, or special characters.</p>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="password">Password <span class="required">*</span></label>\n' +
              '                        <input type="password" id="password" class="password" placeholder="Enter password" required minlength="8" maxlength="15">\n' +
              '                        <span class="icon-show toggle-password"></span>\n' +
              '                        <div class="tooltip-info">\n' +
              '                            <img src="images/info.svg" alt="">\n' +
              "                            <p>Passwords must be 8-15 characters in length and must contain at least 1 letter and 1 number</p>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              "                    <h3>Name details</h3>\n" +
              "                    <b></b>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="firstname">First Name <span class="required">*</span></label>\n' +
              '                        <input type="text" id="firstname" placeholder="Type here" value="' +
              firstName +
              '" required>\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="middlename">Middle Name</label>\n' +
              '                        <input type="text" id="middlename" placeholder="Type here" value="' +
              middleName +
              '">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="maidenname">Maiden Name</label>\n' +
              '                        <input type="text" id="maidenname" placeholder="Type here" value="' +
              maidenName +
              '">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="lastname">Last Name <span class="required">*</span></label>\n' +
              '                        <input type="text" id="lastname" placeholder="Type here" value="' +
              lastName +
              '" required>\n' +
              "                    </div>\n" +
              "                    <h3>Business details</h3>\n" +
              "                    <b></b>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="company">Company / Organization</label>\n' +
              '                        <input type="text" id="company" placeholder="Type here" value="' +
              company +
              '">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="address">Address</label>\n' +
              '                        <input type="text" id="address" placeholder="Type here" value="' +
              address +
              '">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="suite">Suite</label>\n' +
              '                        <input type="text" id="suite" placeholder="Type here">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="city">City</label>\n' +
              '                        <input type="text" id="city" placeholder="Type here" value="' +
              city +
              '">\n' +
              "                    </div>\n" +
              "                    <b></b>\n" +
              '                    <div class="form-group small">\n' +
              '                        <label for="state">State</label>\n' +
              // '                        <input type="text" id="state" placeholder="Type here" value="' + states + '">\n' +
              '                        <select id="state" class="add-info-select">' +
              '<option value="AL">AL</option>\n' +
              '\t<option value="AK">AK</option>\n' +
              '\t<option value="AZ">AZ</option>\n' +
              '\t<option value="AR">AR</option>\n' +
              '\t<option value="CA">CA</option>\n' +
              '\t<option value="CO">CO</option>\n' +
              '\t<option value="CT">CT</option>\n' +
              '\t<option value="DE">DE</option>\n' +
              '\t<option value="DC">DC</option>\n' +
              '\t<option value="FM">FM</option>\n' +
              '\t<option value="FL">FL</option>\n' +
              '\t<option value="GA">GA</option>\n' +
              '\t<option value="HI">HI</option>\n' +
              '\t<option value="ID">ID</option>\n' +
              '\t<option value="IL">IL</option>\n' +
              '\t<option value="IN">IN</option>\n' +
              '\t<option value="IA">IA</option>\n' +
              '\t<option value="KS">KS</option>\n' +
              '\t<option value="KY">KY</option>\n' +
              '\t<option value="LA">LA</option>\n' +
              '\t<option value="ME">ME</option>\n' +
              '\t<option value="MH">MH</option>\n' +
              '\t<option value="MD">MD</option>\n' +
              '\t<option value="MA">MA</option>\n' +
              '\t<option value="MI">MI</option>\n' +
              '\t<option value="MN">MN</option>\n' +
              '\t<option value="MS">MS</option>\n' +
              '\t<option value="MO">MO</option>\n' +
              '\t<option value="MT">MT</option>\n' +
              '\t<option value="NE">NE</option>\n' +
              '\t<option value="NV">NV</option>\n' +
              '\t<option value="NH">NH</option>\n' +
              '\t<option value="NJ">NJ</option>\n' +
              '\t<option value="NM">NM</option>\n' +
              '\t<option value="NY">NY</option>\n' +
              '\t<option value="NC">NC</option>\n' +
              '\t<option value="ND">ND</option>\n' +
              '\t<option value="OH">OH</option>\n' +
              '\t<option value="OK">OK</option>\n' +
              '\t<option value="OR">OR</option>\n' +
              '\t<option value="PW">PW</option>\n' +
              '\t<option value="PA">PA</option>\n' +
              '\t<option value="RI">RI</option>\n' +
              '\t<option value="SC">SC</option>\n' +
              '\t<option value="SD">SD</option>\n' +
              '\t<option value="TN">TN</option>\n' +
              '\t<option value="TX">TX</option>\n' +
              '\t<option value="UT">UT</option>\n' +
              '\t<option value="VT">VT</option>\n' +
              '\t<option value="VA">VA</option>\n' +
              '\t<option value="WA">WA</option>\n' +
              '\t<option value="WV">WV</option>\n' +
              '\t<option value="WI">WI</option>\n' +
              '\t<option value="WY">WY</option>' +
              '<option value="AS">AS</option>\n' +
              '<option value="GU">GU</option>\n' +
              '<option value="MP">MP</option>\n' +
              '<option value="PR">PR</option>\n' +
              '<option value="UM">UM</option>\n' +
              '<option value="VI">VI</option>' +
              '<option value="AA">AA</option>\n' +
              '<option value="AP">AP</option>\n' +
              '<option value="AE">AE</option>\t' +
              "</select>\n" +
              "                    </div>\n" +
              '                    <div class="form-group small">\n' +
              '                        <label for="zip">Zip</label>\n' +
              '                        <input type="text" id="zip" placeholder="Type here" value="' +
              zips +
              '">\n' +
              "                    </div>\n" +
              "                    <h3>Contacts</h3>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="workphone">Work Phone <span class="required">*</span></label>\n' +
              '                        <input type="text" id="workphone" class="phone-format" placeholder="Type here" value="' +
              workPhone +
              '" required>\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="homephone">Home Phone</label>\n' +
              '                        <input type="text" id="homephone" class="phone-format" placeholder="Type here" value="' +
              homePhone +
              '">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="mobilephone">Mobile Phone <span class="required">*</span></label>\n' +
              '                        <input type="text" id="mobilephone" class="phone-format" placeholder="Type here" value="' +
              mobilePhone +
              '" required>\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="fax">Fax </label>\n' +
              '                        <input type="text" id="fax" class="phone-format" placeholder="Type here">\n' +
              "                    </div>\n" +
              '                    <div class="form-group">\n' +
              '                        <label for="email">Email <span class="required">*</span></label>\n' +
              '                        <input type="text" id="email" placeholder="Type here" value="' +
              email +
              '" required>\n' +
              "                    </div>\n" +
              '                    <div class="form-submit">\n' +
              '                        <p class="description"><span class="required">*</span> Required Fields</p>\n' +
              '                        <button type="submit" class="btn btn-primary" data-id="' +
              attorneyId +
              '">Continue</button>\n' +
              "                    </div>\n" +
              "                </form>\n" +
              "            </div>\n" +
              "        </div>\n" +
              "    </div>\n" +
              "</section>"
          );
          $(".phone-format")
            .toArray()
            .forEach(function (field) {
              new Cleave(field, {
                numericOnly: true,
                blocks: [0, 3, 0, 3, 4],
                delimiters: ["(", ")", " ", "-"],
              });
            });
          $(".step3").fadeOut();
          smoothScroll();
          $(".step4").fadeIn();
          initSelect2($(".add-info-select"));
        },
        complete: function () {
          $("body").removeClass("loading");
        },
      });
    } else if (!$(".step3 .need-check").length) {
      $("#styled-checkbox-1")
        .next()
        .after(
          '<p class="need-check">To claim or create your profile, you must agree to DiversePro’s <a href="terms.html" target="_blank">Terms of Use</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>.</p>'
        );
    }
  });

  /*
   *
   *   STEP 4  (Add contact information)
   *
   */
  $(document).on("submit", ".from-step4", function (e) {
    e.preventDefault();

    var workPhone = $(this).find("#mobilephone").val();
    var email = $(this).find("#email").val();
    var username = $(this).find("#username").val();
    var password = $(this).find("#password").val();
    $.ajax({
      type: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: apiDomain + "/Register",
      data: JSON.stringify({
        email: email,
        password: password,
        userName: username,
      }),
      success: function () {
        smoothScroll();
        $("#confirm-phone").attr("hidden", false);
        $("#confirm-phone .confirm input").val(workPhone);
        $("#confirm-phone .confirm input").attr("data-email", email);
      },
      error: function (response) {
        if (response["responseJSON"].indexOf("User name") > -1) {
          smoothScroll();
          if (!$(".from-step4 .error").length) {
            $(".from-step4 #username").addClass("busy");
            $(".from-step4 #username").after(
              '<img src="images/error.svg" alt="">\n' +
                '<p class="error">This username is already taken. Please enter a new username.</p>'
            );
          }
        } else {
          if (!$(".from-step4 .error").length) {
            $(".from-step4 #email").addClass("busy");
            $(".from-step4 #email").after(
              '<img src="images/error.svg" alt="">\n' +
                '<p class="error">This email is already taken. Please enter a new email.</p>'
            );
          }
        }
      },
    });
  });
  $(document).on("submit", "#confirm-phone form", function (e) {
    e.preventDefault();

    var workPhone = $("#confirm-phone .confirm input").val();
    var email = $("#confirm-phone .confirm input").attr("data-email");
    $.ajax({
      type: "GET",
      url:
        apiDomain +
        "/SendPhoneCode?EmailAddress=" +
        email +
        "&PhoneNumber=" +
        workPhone,
      success: function () {
        $("#confirm-phone").attr("hidden", true);
        $("#confirm-phone-code").attr("hidden", false);
        $("#confirm-phone-code .confirm .phone-number").text(workPhone);
        $("#confirm-phone-code .confirm .phone-number").attr(
          "data-email",
          email
        );
        $("#email").val(email);
      },
    });
  });

  /*
   *
   *   STEP 4  (Verify code)
   *
   */
  $(document).on("submit", "#confirm-phone-code form", function (e) {
    e.preventDefault();
    var email = $("#confirm-phone-code .confirm .phone-number").attr(
      "data-email"
    );
    var code = $("#confirmCode").val();
    var phone = $("#confirm-phone-code .confirm .phone-number").text();
    $.ajax({
      type: "POST",
      url:
        apiDomain +
        "/ConfirmPhone?Email=" +
        email +
        "&Code=" +
        code +
        "&Phone=" +
        phone,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      beforeSend: function () {
        $("#confirm-phone-code .thank-you").addClass("loading");
      },
      success: function (data) {
        var firstName = $(".from-step4").find("#firstname").val();
        var lastName = $(".from-step4").find("#lastname").val();
        var middleName = $(".from-step4").find("#middlename").val();
        var maidenName = $(".from-step4").find("#maidenname").val();
        var company = $(".from-step4").find("#company").val();
        var address = $(".from-step4").find("#address").val();
        var suite = $(".from-step4").find("#suite").val();
        var city = $(".from-step4").find("#city").val();
        var states = $(".from-step4").find("#state").val();
        var zips = $(".from-step4").find("#zip").val();
        var wPhone = $(".from-step4").find("#workphone").val();
        var homePhone = $(".from-step4").find("#homephone").val();
        var fax = $(".from-step4").find("#fax").val();

        Cookies.set("token", data);
        var token = Cookies.get("token");
        if ($(".step4").hasClass("claim-account")) {
          var attorneyId = $(".from-step4 .btn-primary").attr("data-id");
          Cookies.set("attorneyId", attorneyId);
          $.ajax({
            type: "PUT",
            url: apiDomain + "/Attorney/ClaimAttorney?attorneyId=" + attorneyId,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            success: function () {
              $.ajax({
                type: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                url: apiDomain + "/Attorney/UpdateAttorneyContactInfo",
                data: JSON.stringify({
                  attorneyId: attorneyId,
                  firstName: firstName,
                  middleName: middleName,
                  maidenName: maidenName,
                  lastName: lastName,
                  company: company,
                  addressLine1: address,
                  addressLine2: suite,
                  city: city,
                  state: states,
                  zip: zips,
                  homePhone: homePhone,
                  workPhone: wPhone,
                  mobilePhone: phone,
                  fax: fax,
                  email: email,
                }),
                success: function () {
                  Cookies.set("state", states);
                  $("#confirm-phone-code").attr("hidden", true);
                  $("#was-verified").attr("hidden", false);
                  $("#was-verified .was-verified p a").text(phone);
                },
              });
            },
          });
        } else {
          $.ajax({
            type: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            url: apiDomain + "/Attorney/CreateAttorney",
            data: JSON.stringify({
              firstName: firstName,
              middleName: middleName,
              maidenName: maidenName,
              lastName: lastName,
              company: company,
              addressLine1: address,
              addressLine2: suite,
              city: city,
              state: states,
              zip: zips,
              homePhone: homePhone,
              workPhone: wPhone,
              mobilePhone: phone,
              fax: fax,
              email: email,
            }),
            success: function () {
              Cookies.set("state", states);
              $.ajax({
                type: "GET",
                url: apiDomain + "/Attorney/Email/" + email,
                success: function (data) {
                  Cookies.set("attorneyId", data["id"]);
                  $("#confirm-phone-code").attr("hidden", true);
                  $("#was-verified").attr("hidden", false);
                  $("#was-verified .was-verified p a").text(phone);
                },
              });
            },
          });
        }
      },

      error: function () {
        $("#confirm-phone-code .thank-you").removeClass("loading");
        if (!$("#confirmCode").hasClass("busy")) {
          $("#confirmCode").after(
            '<img src="images/error.svg" alt="">\n' +
              '<p class="error">You entered an invalid code. Try re-entering the\n' +
              "code or hit Resend for a new code.</p>"
          );
          $("#confirmCode").addClass("busy");
        }
      },
    });
  });

  /*
   *
   *Resend Code
   *
   */
  $(".resend").on("click", function (e) {
    e.preventDefault();
    var workPhone = $(".from-step4").find("#mobilephone").val();
    var email = $(".from-step4").find("#email").val();
    $.ajax({
      type: "GET",
      url:
        apiDomain +
        "/SendPhoneCode?EmailAddress=" +
        email +
        "&PhoneNumber=" +
        workPhone,
      success: function () {
        $("#confirm-phone-code").attr("hidden", false);
        $("#confirm-phone-code #confirmCode").next().remove();
        $("#confirm-phone-code #confirmCode").next().remove();
        $("#confirm-phone-code #confirmCode").removeClass("busy");
      },
    });
  });

  /*
   *
   *   STEP 4  (Open STEP 5)
   *
   */
  $(document).on("submit", "#was-verified .was-verified", function (e) {
    e.preventDefault();

    $(".step4").fadeOut();
    $("#was-verified").attr("hidden", true);
    $(".step4").after(
      '<section class="register step5" style="display:none;">\n' +
        '    <div class="container">\n' +
        '        <div class="register-wrapper">\n' +
        '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
        "            <h2>Add your professional information</h2>\n" +
        '            <ul class="steps">\n' +
        '                <li class="completed"></li>\n' +
        '                <li class="completed"></li>\n' +
        '                <li class="completed"></li>\n' +
        '                <li class="completed"></li>\n' +
        '                <li class="active">Step 5</li>\n' +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "                <li></li>\n" +
        "            </ul>\n" +
        '            <div class="add-info-form">\n' +
        '                <form class="from-step5">\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="lawschool">Law School <span class="required">*</span></label>\n' +
        '                        <select id="lawschool" class="add-info-select">\n' +
        "                            <option></option>\n" +
        "                        </select>\n" +
        "                    </div>\n" +
        '                    <div class="form-group">\n' +
        '                        <label for="practiceareas">Practice Areas <span class="required">*</span><span class="desc"> (select up to 3)</span> </label>\n' +
        '                        <select id="practiceareas" class="add-info-select three-select" multiple="multiple">\n' +
        "                            <option></option>\n" +
        "                        </select>\n" +
        "                    </div>\n" +
        '                    <div class="form-group">\n' +
        '                        <label for="othereducation">Other education <span class="desc">(optional)</span></label>\n' +
        '                        <input type="text" id="othereducation" placeholder="Type here">\n' +
        "                    </div>\n" +
        '                    <div class="form-group">\n' +
        '                        <label for="specialty">Specialty <span class="desc">(select up to 5)</span></label>\n' +
        '                        <select id="specialty" class="add-info-select fifth-select" multiple="multiple">\n' +
        "                            <option></option>\n" +
        "                        </select>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <h3>License</h3>\n" +
        '                    <div class="licenses">\n' +
        '                        <div class="form-group smaller">\n' +
        '                            <label for="licensedstate">Licensed State <span class="required">*</span></label>\n' +
        '                            <select id="licensedstate" name="licenseState[0]" class="add-info-select licensedstate">\n' +
        "                                <option></option>\n" +
        '<option value="Alabama">Alabama</option>\n' +
        '\t<option value="Alaska">Alaska</option>\n' +
        '\t<option value="Arizona">Arizona</option>\n' +
        '\t<option value="Arkansas">Arkansas</option>\n' +
        '\t<option value="California">California</option>\n' +
        '\t<option value="Colorado">Colorado</option>\n' +
        '\t<option value="Connecticut">Connecticut</option>\n' +
        '\t<option value="Delaware">Delaware</option>\n' +
        '\t<option value="District Of Columbia">District Of Columbia</option>\n' +
        '\t<option value="Florida">Florida</option>\n' +
        '\t<option value="Georgia">Georgia</option>\n' +
        '\t<option value="Hawaii">Hawaii</option>\n' +
        '\t<option value="Idaho">Idaho</option>\n' +
        '\t<option value="Illinois">Illinois</option>\n' +
        '\t<option value="Indiana">Indiana</option>\n' +
        '\t<option value="Iowa">Iowa</option>\n' +
        '\t<option value="Kansas">Kansas</option>\n' +
        '\t<option value="Kentucky">Kentucky</option>\n' +
        '\t<option value="Louisiana">Louisiana</option>\n' +
        '\t<option value="Maine">Maine</option>\n' +
        '\t<option value="Maryland">Maryland</option>\n' +
        '\t<option value="Massachusetts">Massachusetts</option>\n' +
        '\t<option value="Michigan">Michigan</option>\n' +
        '\t<option value="Minnesota">Minnesota</option>\n' +
        '\t<option value="Mississippi">Mississippi</option>\n' +
        '\t<option value="Missouri">Missouri</option>\n' +
        '\t<option value="Montana">Montana</option>\n' +
        '\t<option value="Nebraska">Nebraska</option>\n' +
        '\t<option value="Nevada">Nevada</option>\n' +
        '\t<option value="New Hampshire">New Hampshire</option>\n' +
        '\t<option value="New Jersey">New Jersey</option>\n' +
        '\t<option value="New Mexico">New Mexico</option>\n' +
        '\t<option value="New York">New York</option>\n' +
        '\t<option value="North Carolina">North Carolina</option>\n' +
        '\t<option value="North Dakota">North Dakota</option>\n' +
        '\t<option value="Ohio">Ohio</option>\n' +
        '\t<option value="Oklahoma">Oklahoma</option>\n' +
        '\t<option value="Oregon">Oregon</option>\n' +
        '\t<option value="Palau">Palau</option>\n' +
        '\t<option value="Pennsylvania">Pennsylvania</option>\n' +
        '\t<option value="Rhode Island">Rhode Island</option>\n' +
        '\t<option value="South Carolina">South Carolina</option>\n' +
        '\t<option value="South Dakota">South Dakota</option>\n' +
        '\t<option value="Tennessee">Tennessee</option>\n' +
        '\t<option value="Texas">Texas</option>\n' +
        '\t<option value="Utah">Utah</option>\n' +
        '\t<option value="Vermont">Vermont</option>\n' +
        '\t<option value="Virginia">Virginia</option>\n' +
        '\t<option value="Washington">Washington</option>\n' +
        '\t<option value="West Virginia">West Virginia</option>\n' +
        '\t<option value="Wisconsin">Wisconsin</option>\n' +
        '\t<option value="Wyoming">Wyoming</option>' +
        "                            </select>\n" +
        "                        </div>\n" +
        '                        <div class="form-group smaller">\n' +
        '                            <label for="licenseddate">Licensed Date <span class="required">*</span></label>\n' +
        '                            <select id="licenseddate" name="licenseDate[0]" class="add-info-select licenseddate">\n' +
        "                                <option></option>\n" +
        '<option value="2020-01-01">2020</option>\n' +
        '<option value="2019-01-01">2019</option>\n' +
        '<option value="2018-01-01">2018</option>\n' +
        '<option value="2017-01-01">2017</option>\n' +
        '<option value="2016-01-01">2016</option>\n' +
        '<option value="2015-01-01">2015</option>\n' +
        '<option value="2014-01-01">2014</option>\n' +
        '<option value="2013-01-01">2013</option>\n' +
        '<option value="2012-01-01">2012</option>\n' +
        '<option value="2011-01-01">2011</option>\n' +
        '<option value="2010-01-01">2010</option>\n' +
        '<option value="2009-01-01">2009</option>\n' +
        '<option value="2008-01-01">2008</option>\n' +
        '<option value="2007-01-01">2007</option>\n' +
        '<option value="2006-01-01">2006</option>\n' +
        '<option value="2005-01-01">2005</option>\n' +
        '<option value="2004-01-01">2004</option>\n' +
        '<option value="2003-01-01">2003</option>\n' +
        '<option value="2002-01-01">2002</option>\n' +
        '<option value="2001-01-01">2001</option>\n' +
        '<option value="2000-01-01">2000</option>\n' +
        '<option value="1999-01-01">1999</option>\n' +
        '<option value="1998-01-01">1998</option>\n' +
        '<option value="1997-01-01">1997</option>\n' +
        '<option value="1996-01-01">1996</option>\n' +
        '<option value="1995-01-01">1995</option>\n' +
        '<option value="1994-01-01">1994</option>\n' +
        '<option value="1993-01-01">1993</option>\n' +
        '<option value="1992-01-01">1992</option>\n' +
        '<option value="1991-01-01">1991</option>\n' +
        '<option value="1990-01-01">1990</option>\n' +
        '<option value="1989-01-01">1989</option>\n' +
        '<option value="1988-01-01">1988</option>\n' +
        '<option value="1987-01-01">1987</option>\n' +
        '<option value="1986-01-01">1986</option>\n' +
        '<option value="1985-01-01">1985</option>\n' +
        '<option value="1984-01-01">1984</option>\n' +
        '<option value="1983-01-01">1983</option>\n' +
        '<option value="1982-01-01">1982</option>\n' +
        '<option value="1981-01-01">1981</option>\n' +
        '<option value="1980-01-01">1980</option>\n' +
        '<option value="1979-01-01">1979</option>\n' +
        '<option value="1978-01-01">1978</option>\n' +
        '<option value="1977-01-01">1977</option>\n' +
        '<option value="1976-01-01">1976</option>\n' +
        '<option value="1975-01-01">1975</option>\n' +
        '<option value="1974-01-01">1974</option>\n' +
        '<option value="1973-01-01">1973</option>\n' +
        '<option value="1972-01-01">1972</option>\n' +
        '<option value="1971-01-01">1971</option>\n' +
        '<option value="1970-01-01">1970</option>\n' +
        '<option value="1969-01-01">1969</option>\n' +
        '<option value="1968-01-01">1968</option>\n' +
        '<option value="1967-01-01">1967</option>\n' +
        '<option value="1966-01-01">1966</option>\n' +
        '<option value="1965-01-01">1965</option>\n' +
        '<option value="1964-01-01">1964</option>\n' +
        '<option value="1963-01-01">1963</option>\n' +
        '<option value="1962-01-01">1962</option>\n' +
        '<option value="1961-01-01">1961</option>\n' +
        '<option value="1960-01-01">1960</option>\n' +
        '<option value="1959-01-01">1959</option>\n' +
        '<option value="1958-01-01">1958</option>\n' +
        '<option value="1957-01-01">1957</option>\n' +
        '<option value="1956-01-01">1956</option>\n' +
        '<option value="1955-01-01">1955</option>\n' +
        '<option value="1954-01-01">1954</option>\n' +
        '<option value="1953-01-01">1953</option>\n' +
        '<option value="1952-01-01">1952</option>\n' +
        '<option value="1951-01-01">1951</option>\n' +
        '<option value="1950-01-01">1950</option>\n' +
        "                            </select>\n" +
        "                        </div>\n" +
        '                        <div class="form-group smaller">\n' +
        '                            <label for="licensenumber">License Number <span class="required">*</span></label>\n' +
        '                            <input type="text" id="licensenumber" name="licenseNumber[0]" class="licensenumber" placeholder="Type here">\n' +
        "                        </div>\n" +
        '                        <div class="form-group smaller last">\n' +
        '                            <button type="button" class="btn btn-primary add-license">+ Add another license</button>\n' +
        "                        </div>\n" +
        "                    </div>\n" +
        '                    <div class="form-group checkbox mt-40">\n' +
        '                        <input class="styled-checkbox" id="styled-checkbox-4" type="checkbox">\n' +
        '                        <label for="styled-checkbox-4">I confirm that I am in good standing and eligible to practice law in the jurisdiction(s) selected above.</label>\n' +
        "                    </div>\n" +
        "\n" +
        '                    <div class="form-submit">\n' +
        '                        <p class="description"><span class="required">*</span> Required Fields</p>\n' +
        '                        <button type="submit" class="btn btn-primary">Continue</button>\n' +
        "                    </div>\n" +
        "                </form>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</section>"
    );
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/LawSchools?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#lawschool").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Colleges?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#college").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Specialities?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#specialty").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    // $.ajax({
    //     type: "GET",
    //     url: apiDomain + '/Lookup/OtherEducations?total=9999',
    //     success: function (data) {
    //         $.each(data, function (key, arr) {
    //             $("#othereducation").append($("<option></option>")
    //                 .attr("value",data[key])
    //                 .text(data[key]));
    //         });
    //     }
    // });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/PracticeAreas?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#practiceareas").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    initSelect2($(".add-info-select"));
    initSelect3($(".three-select"));
    initSelect4($(".fifth-select"));
    smoothScroll();
    $(".step5").fadeIn();
  });

  /*
   *
   *   STEP 5  (Add pro information)
   *
   */
  $(document).on("submit", ".register .from-step5", function (e) {
    e.preventDefault();
    if ($("#styled-checkbox-4").is(":checked")) {
      var token = Cookies.get("token");
      var attorneyId = Cookies.get("attorneyId");
      var lawSchool = $("#lawschool option:selected").val();
      var college = $("#college option:selected").val();
      var otherEducation = $("#othereducation").val();
      var practiceAreas = $("#practiceareas").val();
      var legalIssues = $("#specialty").val();

      var states = [];
      var licenses = [];
      var count = 0;
      $(".licensedstate").each(function () {
        states.push($(this).val());
        count++;
      });
      var dates = [];
      $(".licenseddate").each(function () {
        dates.push($(this).val());
      });
      var numbers = [];
      $(".licensenumber").each(function () {
        numbers.push($(this).val());
      });
      for (var i = 0; i < count; i++) {
        licenses.push({
          state: states[i],
          date: dates[i],
          number: numbers[i],
        });
      }
      $.ajax({
        type: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        url: apiDomain + "/Attorney/UpdateAttorneyProfessionalInfo",
        data: JSON.stringify({
          attorneyId: attorneyId,
          lawSchool: lawSchool,
          college: college,
          otherEducation: otherEducation,
          practiceAreas: practiceAreas.join(),
          legalIssues: legalIssues.join(),
          licenses: licenses,
        }),
        beforeSend: function () {
          $("body").addClass("loading");
        },
        success: function () {
          $(".step5").fadeOut();
          $(".step5").after(
            '<section class="register step6" style="display:none;">' +
              '<div class="container">' +
              '<div class="register-wrapper">' +
              '<a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>' +
              "<h2>Add what makes you unique</h2>" +
              '<ul class="steps">' +
              '   <li class="completed"></li>' +
              '   <li class="completed"></li>' +
              '   <li class="completed"></li>' +
              '   <li class="completed"></li>' +
              '   <li class="completed"></li>' +
              '   <li class="active">Step 6</li>' +
              "   <li></li>" +
              "   <li></li>" +
              "   <li></li>" +
              "</ul>" +
              '<div class="reg-demographic">' +
              "<h3>Legal consumers are searching for culturally competent lawyers.<br>" +
              " Help them find <span>You</span>.</h3>" +
              '<div class="reg-demographic__icons">' +
              '<div class="icons-item">' +
              '<span class="icon-sun"></span>' +
              "Culture" +
              " </div>" +
              '<div class="icons-item">' +
              ' <span class="icon-ancient-scroll"></span>' +
              "Heritage" +
              "</div>" +
              '<div class="icons-item">' +
              '<span class="icon-translation"></span>' +
              "Language" +
              "</div>" +
              '<div class="icons-item">' +
              '<span class="icon-hourglass"></span>' +
              "Experience" +
              "</div>" +
              " </div>" +
              '<div class="reg-demographic__select">' +
              "<h4>Categories</h4>" +
              ' <p class="text">Search and add up to 3 categories. Must select at least one category.</p>' +
              ' <select class="reg-demographic-selected" id="categories" name="categories[]" multiple="multiple" data-placeholder="Type here" required>' +
              " </select>" +
              '<span class="description">Examples: Asian, Mexican-American, Egyptian, LGBTQ+, Black, Nigerian, Lakota</span>' +
              ' <input class="styled-checkbox" id="styled-checkbox-3" type="checkbox">' +
              '<label for="styled-checkbox-3">I affirm that I meet DiversePro’s eligibility requirements. Visit <a href="terms.html" target="_blank">Terms of Use</a> for details.</a>' +
              '<div class="tooltip-info">' +
              ' <img src="images/info.svg" alt="">' +
              '<p>Eligible lawyers are women, minority, LGBTQ+, or disabled lawyers and veterans or active duty service members. Visit <a href="terms.html" target="_blank">Terms of Use</a> for more details.</p>' +
              "</div>" +
              " </label>" +
              `
                <div class="gender-wrapper">
                  <h4>Add your gender experience</h4>
                  <input class="styled-checkbox" id="radio-woman" type="radio" name="gender">
                  <label for="radio-woman" class="lb-gender">Woman</label>
                  <input class="styled-checkbox" id="radio-man" type="radio" name="gender">
                  <label for="radio-man" class="lb-gender">Man</label>
                  <input class="styled-checkbox" id="radio-other" type="radio" name="gender">
                  <label for="radio-other" class="lb-gender">Other</label>
                </div>
              ` +
              "<h4>Do you speak other languages?</h4>" +
              '<p class="text">If so, search and add up to 3 languages</p>' +
              '<select class="reg-demographic-selected reg-lang-selected" id="languages" name="categories[]" multiple="multiple" data-placeholder="Type here">' +
              "</select>" +
              '<span class="description">By adding a language, you affirm that you can personally communicate effectively with a legal consumer in the selected language.</span>' +
              '<div class="continue">' +
              '<button class="btn btn-primary from-step6">Continue</button>' +
              '<span class="description">By pressing "CONTINUE," you confirm that the information provided above <br>is true to the best of your knowledge.</span>' +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              " </section>"
          );
          initRegSelect2($(".reg-demographic-selected"));
          initRegSelect3($(".reg-lang-selected"));
          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/Languages?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                if (data[key] != "Not Listed") {
                  $("#languages").append(
                    $("<option></option>")
                      .attr("value", data[key])
                      .text(data[key])
                  );
                }
              });
            },
          });
          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/Demographics?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                var optionValue = data[key];
                if (data[key].includes('&')) {
                  optionValue = data[key].replace('&', 'and');
                }
                $("#categories").append(
                  $("<option></option>")
                    .attr("value", optionValue)
                    .text(data[key])
                );
              });
            },
          });
          smoothScroll();
          $(".step6").fadeIn();
        },
        complete: function () {
          $("body").removeClass("loading");
        },
      });
    } else if (!$(".step5 .need-check").length) {
      $("#styled-checkbox-4")
        .next()
        .after(
          '<p class="need-check">You must confirm that you are in good standing and eligible to practice law in the jurisdiction(s) selected above.</p>'
        );
    }
  });

  /*
   *
   *   STEP 6  (Add bio information)
   *
   */
  $(document).on("click", ".from-step6", function (e) {
    e.preventDefault();
    if (
      $("#styled-checkbox-3").is(":checked") &&
      $("#categories option:selected").length !== 0
    ) {
      var token = Cookies.get("token");
      var attorneyId = Cookies.get("attorneyId");
      var categories = $("#categories").val();
      var languages = $("#languages").val();

      var gender = '';
      if ($("#radio-woman").is(':checked')) gender = 'woman';
      else if ($("#radio-man").is(':checked')) gender = 'man';
      else if ($("#radio-other").is(':checked')) gender = 'other';
      else gender = '';

      $.ajax({
        type: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        url: apiDomain + "/Attorney/UpdateAttorneyBiographicalInfo",
        data: JSON.stringify({
          attorneyId: attorneyId,
          ethnicities: categories.join(),
          languages: languages.join(),
          gender: gender
        }),
        beforeSend: function () {
          $("body").addClass("loading");
        },
        success: function () {
          $(".step6").fadeOut();
          $(".step6").after(
            '<section class="register step7" style="display:none;">\n' +
              '    <div class="container">\n' +
              '        <div class="register-wrapper">\n' +
              '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
              "            <h2>Choose a subscription plan</h2>\n" +
              '            <ul class="steps">\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="completed"></li>\n' +
              '                <li class="active">Step 7</li>\n' +
              "                <li></li>\n" +
              "                <li></li>\n" +
              "            </ul>\n" +
              '            <div class="plan-wrapper">\n' +
              '                <div class="plan__item premium">\n' +
              '                    <img src="images/bookmark.svg" class="bookmark" alt="">\n' +
              '                    <div class="plan__item-top">\n' +
              '                        <p class="name">Premium</p>\n' +
              '                        <p class="price">$49.99/mo <span>(annual subscription)</span></p>\n' +
              "                    </div>\n" +
              '                    <div class="plan__item-middle">\n' +
              "                        <ul>\n" +
              "                            <li>All benefits in Pro and Pro Plus subscription plans</li>\n" +
              "                            <li>Enhanced search result profile display</li>\n" +
              "                            <li>Add Keywords search tool</li>\n" +
              "                            <li>Upload photos</li>\n" +
              "                            <li>Top priority in search results</li>\n" +
              "                            <li>No competitive ads or lawyers on profile page</li>\n" +
              "                        </ul>\n" +
              "                    </div>\n" +
              '                    <div class="plan__item-bottom">\n' +
              '                        <button class="btn from-step7" data-plan="premium">Choose plan</button>\n' +
              "                    </div>\n" +
              "                </div>\n" +
              '                <div class="plan__item pro-plus">\n' +
              '                    <div class="plan__item-top">\n' +
              '                        <p class="name">Pro Plus</p>\n' +
              '                        <p class="price">$24.99/mo <span>(annual subscription)</span></p>\n' +
              "                    </div>\n" +
              '                    <div class="plan__item-middle">\n' +
              "                        <ul>\n" +
              "                            <li>All benefits in Pro subscription plan</li>\n" +
              '                            <li>Personalized headline <br>("Tough, Smart Divorce Lawyer")</li>\n' +
              "                            <li>Prioritized profile position\n" +
              "                                in search results</li>\n" +
              "                            <li>Add social media link</li>\n" +
              "                            <li>Contact information prominently displayed in search results</li>\n" +
              "                        </ul>\n" +
              "                    </div>\n" +
              '                    <div class="plan__item-bottom">\n' +
              '                        <button class="btn from-step7" data-plan="pro-plus">Choose plan</button>\n' +
              "                    </div>\n" +
              "                </div>\n" +
              '                <div class="plan__item pro">\n' +
              '                    <div class="plan__item-top">\n' +
              '                        <p class="name">Pro</p>\n' +
              '                        <p class="price">Free</p>\n' +
              "                    </div>\n" +
              '                    <div class="plan__item-middle">\n' +
              "                        <ul>\n" +
              "                            <li>Limited personalization</li>\n" +
              "                            <li>Upload headshot</li>\n" +
              "                            <li>Add or update your personal and professional information</li>\n" +
              "                        </ul>\n" +
              "                    </div>\n" +
              '                    <div class="plan__item-bottom">\n' +
              '                        <button class="btn from-step7" data-plan="pro">Choose plan</button>\n' +
              "                    </div>\n" +
              "                </div>\n" +
              "            </div>\n" +
              "        </div>\n" +
              "    </div>\n" +
              "</section>"
          );
          smoothScroll();
          $(".step7").fadeIn();
        },
        complete: function () {
          $("body").removeClass("loading");
        },
      });
    } else if (
      $("#categories option:selected").length !== 0 &&
      !$("#styled-checkbox-3").is(":checked")
    ) {
      if (!$(".step6 .need-check").length) {
        $("#styled-checkbox-3")
          .next()
          .after(
            '<p class="need-check">You must affirm that you meet DiversePro’s eligibility requirements.</p>'
          );
      }
    } else if (
      $("#styled-checkbox-3").is(":checked") &&
      $("#categories option:selected").length === 0
    ) {
      $("#categories + .select2 .reg-demographic-selected").addClass(
        "empty-cat"
      );
      setTimeout(function () {
        $("#categories + .select2 .reg-demographic-selected").removeClass(
          "empty-cat"
        );
      }, 4000);
    } else {
      if (!$(".step6 .need-check").length) {
        $("#styled-checkbox-3")
          .next()
          .after(
            '<p class="need-check">You must affirm that you meet DiversePro’s eligibility requirements.</p>'
          );
      }
      $("#categories + .select2 .reg-demographic-selected").addClass(
        "empty-cat"
      );
      setTimeout(function () {
        $("#categories + .select2 .reg-demographic-selected").removeClass(
          "empty-cat"
        );
      }, 4000);
    }
  });

  /*
   *
   *   STEP 7  (Select subscription)
   *
   */
  var dropzone_default;
  $(document).on("click", ".from-step7", function () {
    var token = Cookies.get("token");
    var attorneyId = Cookies.get("attorneyId");
    var plan = $(this).attr("data-plan");

    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Plans",
      success: function (data) {
        var planId, planName, productId;
        if (plan === "premium") {
          planId = data[0]["id"];
          planName = data[0]["name"];
          productId = data[0]["product"]["id"];
        } else if (plan === "pro-plus") {
          planId = data[1]["id"];
          planName = data[1]["name"];
          productId = data[1]["product"]["id"];
        } else if (plan === "pro") {
          planId = data[2]["id"];
          planName = data[2]["name"];
          productId = data[2]["product"]["id"];
        }
        $.ajax({
          type: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          url: apiDomain + "/Attorney/UpdateAttorneySubscriptionInfo",
          data: JSON.stringify({
            attorneyId: attorneyId,
            subscriptionName: planName,
            planId: planId,
            productId: productId,
          }),
          success: function () {
            // set membership plan info to cookie
            Cookies.set("planId", planId);
            Cookies.set("planName", planName);
            Cookies.set("productId", productId);
            $(".step7").fadeOut();
            if (plan === "premium") {
              if ($(".step8-premium").length === 0) {
                $(".step7").after(
                  '<section class="register step8-premium" style="display:none;">\n' +
                    '    <div class="container">\n' +
                    '        <div class="register-wrapper">\n' +
                    '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                    '            <h2>Complete your profile<span class="status premium">Premium</span></h2>\n' +
                    '            <ul class="steps">\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="active">Step 8</li>\n' +
                    "                <li></li>\n" +
                    "            </ul>\n" +
                    '            <form class="socials from-step8">\n' +
                    "                <h4>Add photo to your profile</h4>\n" +
                    '                <div class="upload-photo">\n' +
                    '                    <div id="upload-images"></div>\n' +
                    '                    <img src="images/user.png" id="uploadedImage" alt="">\n' +
                    '                    <div class="file-buttons">\n' +
                    '                        <input type="file" class="file-input" value="Upload photo">\n' +
                    '                        <button type="button" class="btn btn-secondary file-delete">Delete photo</button>\n' +
                    "                    </div>\n" +
                    "                </div>\n" +
                    '                   <input class="styled-checkbox" id="styled-checkbox-10" type="checkbox" checked>\n' +
                    '                   <label for="styled-checkbox-10">Yes, I\'m accepting new clients!</label>' +
                    "                <h4>Add details about you</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <textarea placeholder="Max 1050 characters" id="about" maxlength="1050"></textarea>\n' +
                    "                </div>\n" +
                    "                <h4>Add website</h4>\n" +
                    '                <div class="form-group">\n' +                    
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2 mr-1" style="padding-left: 0">https://</span>\n' +
                    '                       <input class="col-md-7" id="website-link" placeholder="Enter your website URL" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    "                <h4>Add a personalized headline</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <input id="headline" placeholder="Your personalized headline" maxlength="50">\n' +
                    '                    <span class="head-counter"></span>\n' +
                    '                    <p class="description">Example: "Tough, Smart Divorce Lawyer."</p>\n' +
                    "                </div>\n" +
                    "                <h4>Add Keywords</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <p>Add up to 20 keywords (Add keyword by pressing "Enter")</p>\n' +
                    '                    <select class="keywords-selected" name="keywords[]" multiple="multiple" data-placeholder="Type here">\n' +
                    "                        <option></option>\n" +
                    "                    </select>\n" +
                    '                    <p class="description">Help clients find you with unique keywords (e.g. CCPA, mandamus, anti-SLAPP)</p>\n' +
                    "                </div>\n" +
                    "                <h4>Add social media to your profile</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2 mr-1" style="padding-left: 0">https://facebook.com/</span>\n' +
                    '                       <input class="col-md-7" id="facebook" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2" style="padding-left: 0">https://linkedin.com/in/</span>\n' +
                    '                       <input class="col-md-7" id="linkedIn" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2" style="padding-left: 0">https://instagram.com/</span>\n' +
                    '                       <input class="col-md-7" id="instagram" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2" style="padding-left: 0; margin-right: 30px">https://twitter.com/</span>\n' +
                    '                       <input class="col-md-7" id="twitter" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    "                <h4>Photos</h4>\n" +
                    '                <div class="dropzone" id="premium-dropzone">\n' +
                    '                   <img src="images/upload.svg" alt="">\n' +
                    '                   <div class="dz-message" data-dz-message>Drag and drop here or <span>browse</span> to upload</div>\n' +
                    "                </div>" +
                    '                <div class="form-group group-buttons">\n' +
                    '                    <button class="btn btn-secondary btn-preview" data-plan="premium">Preview your profile</button>\n' +
                    '                    <button type="submit" class="btn btn-primary" data-plan="premium">Continue</button>\n' +
                    "                </div>\n" +
                    "            </form>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>"
                );
              }
              $(".step8").remove();
              $(".step8-pro").remove();
              smoothScroll();
              $(".step8-premium").fadeIn();
              Dropzone.autoDiscover = false;
              dropzone_default = new Dropzone("#premium-dropzone", {
                url: "/",
                maxFiles: 10,
                maxFilesize: 50,
                uploadMultiple: true,
                parallelUploads: 10,
                addRemoveLinks: true,
                autoProcessQueue: false,
                timeout: 60000,
                acceptedFiles: 'image/*',
                // accept: function(file, done) {
                //     console.log(file);
                //     if (file.type != "image/jpeg" && file.type != "image/png") {
                //         done("Error! Files of this type are not accepted");
                //     }
                //     else { done(); }
                // }
              });
            } else if (plan === "pro-plus") {
              if ($(".step8").length === 0) {
                $(".step7").after(
                  '<section class="register step8" style="display:none;">\n' +
                    '    <div class="container">\n' +
                    '        <div class="register-wrapper">\n' +
                    '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                    '            <h2>Complete your profile<span class="status pro-plus">Pro Plus</span></h2>\n' +
                    '            <ul class="steps">\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="active">Step 8</li>\n' +
                    "                <li></li>\n" +
                    "            </ul>\n" +
                    '            <form class="socials from-step8">\n' +
                    "                <h4>Add photo to your profile</h4>\n" +
                    '                <div class="upload-photo">\n' +
                    '                    <div id="upload-images"></div>\n' +
                    '                    <img src="images/user.png" id="uploadedImage" alt="">\n' +
                    '                    <div class="file-buttons">\n' +
                    '                        <input type="file" class="file-input" value="Upload photo">\n' +
                    '                        <button type="button" class="btn btn-secondary file-delete">Delete photo</button>\n' +
                    "                    </div>\n" +
                    "                </div>\n" +
                    '                   <input class="styled-checkbox" id="styled-checkbox-10" type="checkbox" checked>\n' +
                    '                   <label for="styled-checkbox-10">Yes, I\'m accepting new clients!</label>' +
                    "                <h4>Add details about you</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <textarea placeholder="Max 1050 characters" id="about" maxlength="1050"></textarea>\n' +
                    "                </div>\n" +
                    "                <h4>Add website</h4>\n" +
                    '                <div class="form-group">\n' +                    
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2 mr-1" style="padding-left: 0">https://</span>\n' +
                    '                       <input class="col-md-7" id="website-link" placeholder="Enter your website URL" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    "                <h4>Add a personalized headline</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <input id="headline" placeholder="Your personalized headline" maxlength="50">\n' +
                    '                    <span class="head-counter"></span>\n' +
                    '                    <p class="description">Example: "Tough, Smart Divorce Lawyer."</p>\n' +
                    "                </div>\n" +
                    "                <h4>Add social media to your profile</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2 mr-1" style="padding-left: 0">https://facebook.com/</span>\n' +
                    '                       <input class="col-md-7" id="facebook" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2" style="padding-left: 0">https://linkedin.com/in/</span>\n' +
                    '                       <input class="col-md-7" id="linkedIn" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2" style="padding-left: 0">https://instagram.com/</span>\n' +
                    '                       <input class="col-md-7" id="instagram" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="form-group">\n' +
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2" style="padding-left: 0; margin-right: 30px">https://twitter.com/</span>\n' +
                    '                       <input class="col-md-7" id="twitter" placeholder="Enter Your ID" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="plan__item premium">\n' +
                    '                    <div class="plan__item-top">\n' +
                    '                        <p class="name center-text">Upgrade to Premium!</p>\n' +
                    "                    </div>\n" +
                    '                    <div class="plan__item-middle">\n' +
                    "                        <p>For only $49.99/mo, enhance your profile with:</p>\n" +
                    "                        <ul>\n" +
                    "                            <li>All benefits in Pro and Pro Plus subscription plans</li>\n" +
                    "                            <li>Enhanced search result profile display</li>\n" +
                    "                            <li>Add Keywords search tool</li>\n" +
                    "                            <li>Upload photos</li>\n" +
                    "                            <li>Top priority in search results</li>\n" +
                    "                            <li>No competitive ads or lawyers on profile page</li>\n" +
                    "                        </ul>\n" +
                    "                    </div>\n" +
                    '                    <div class="plan__item-bottom">\n' +
                    '                        <button type="button" class="btn from-step7" data-plan="premium">Upgrade plan</button>\n' +
                    "                    </div>\n" +
                    "                </div>\n" +
                    '                <div class="form-group group-buttons">\n' +
                    '                    <button class="btn btn-secondary btn-preview" data-plan="pro-plus">Preview your profile</button>\n' +
                    '                    <button type="submit" class="btn btn-primary" data-plan="pro-plus">Continue</button>\n' +
                    "                </div>\n" +
                    "            </form>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>"
                );
              }
              $(".step8-premium").remove();
              $(".step8-pro").remove();
              smoothScroll();
              $(".step8").fadeIn();
            } else if (plan === "pro") {
              if ($(".step8-pro").length === 0) {
                $(".step7").after(
                  '<section class="register step8-pro" style="display:none;">\n' +
                    '    <div class="container">\n' +
                    '        <div class="register-wrapper">\n' +
                    '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                    '            <h2>Complete your profile<span class="status pro">Pro</span></h2>\n' +
                    '            <ul class="steps">\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="active">Step 8</li>\n' +
                    "            </ul>\n" +
                    '            <form class="socials from-step8 from-step8-pro">\n' +
                    "                <h4>Add photo to your profile</h4>\n" +
                    '                <div class="upload-photo">\n' +
                    '                    <div id="upload-images"></div>\n' +
                    '                    <img src="images/user.png" id="uploadedImage" alt="">\n' +
                    '                    <div class="file-buttons">\n' +
                    '                        <input type="file" class="file-input" value="Upload photo">\n' +
                    '                        <button type="button" class="btn btn-secondary file-delete">Delete photo</button>\n' +
                    "                    </div>\n" +
                    "                </div>\n" +
                    '                   <input class="styled-checkbox" id="styled-checkbox-10" type="checkbox" checked>\n' +
                    '                   <label for="styled-checkbox-10">Yes, I\'m accepting new clients!</label>' +
                    "                <h4>Add details about you</h4>\n" +
                    '                <div class="form-group">\n' +
                    '                    <textarea placeholder="Max 1050 characters" id="about" maxlength="1050"></textarea>\n' +
                    "                </div>\n" +
                    "                <h4>Add website</h4>\n" +
                    '                <div class="form-group">\n' +                    
                    '                    <div class="col-md-12" style="padding-left: 0">\n' +
                    '                       <span class="col-md-2 mr-1" style="padding-left: 0">https://</span>\n' +
                    '                       <input class="col-md-7" id="website-link" placeholder="Enter your website URL" autocomplete="off">\n' +
                    '                    </div>\n' +
                    "                </div>\n" +
                    '                <div class="plan__item premium">\n' +
                    '                    <div class="plan__item-top">\n' +
                    '                        <p class="name center-text">Upgrade to Premium!</p>\n' +
                    "                    </div>\n" +
                    '                    <div class="plan__item-middle">\n' +
                    "                        <p>For only $49.99/mo, enhance your profile with:</p>\n" +
                    "                        <ul>\n" +
                    "                            <li>All benefits in Pro and Pro Plus subscription plans</li>\n" +
                    "                            <li>Enhanced search result profile display</li>\n" +
                    "                            <li>Add Keywords search tool</li>\n" +
                    "                            <li>Upload photos</li>\n" +
                    "                            <li>Top priority in search results</li>\n" +
                    "                            <li>No competitive ads or lawyers on profile page</li>\n" +
                    "                        </ul>\n" +
                    "                    </div>\n" +
                    '                    <div class="plan__item-bottom">\n' +
                    '                        <button type="button" class="btn from-step7" data-plan="premium">Upgrade plan</button>\n' +
                    "                    </div>\n" +
                    "                </div>\n" +
                    '                <div class="plan__item pro-plus">\n' +
                    '                    <div class="plan__item-top">\n' +
                    '                        <p class="name center-text">Upgrade to Pro Plus!</p>\n' +
                    "                    </div>\n" +
                    '                    <div class="plan__item-middle">\n' +
                    "                        <p>For only $24.99/mo, and enhance your profile with:</p>\n" +
                    "                        <ul>\n" +
                    "                            <li>Personalized headline</li>\n" +
                    "                            <li>Prioritized profile position in search results</li>\n" +
                    "                            <li>Add social media link</li>\n" +
                    "                            <li>Contact information prominently displayed in search results</li>\n" +
                    "                            <li>All benefits in Pro subscription plan</li>\n" +
                    "                        </ul>\n" +
                    "                    </div>\n" +
                    '                    <div class="plan__item-bottom">\n' +
                    '                        <button type="button" class="btn from-step7" data-plan="pro-plus">Upgrade plan</button>\n' +
                    "                    </div>\n" +
                    "                </div>\n" +
                    '                <div class="form-group group-buttons">\n' +
                    '                    <button class="btn btn-secondary btn-preview" data-plan="pro">Preview your profile</button>\n' +
                    '                    <button type="submit" class="btn btn-primary" data-plan="pro">Publish your profile</button>\n' +
                    "                </div>\n" +
                    "            </form>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>"
                );
              }
              $(".step8").remove();
              $(".step8-premium").remove();
              smoothScroll();
              $(".step8-pro").fadeIn();
            }
            keywordSelect2($(".keywords-selected"));
          },
        });
      },
    });
  });

  /*
   *
   *   STEP 8  (Preview)
   *
   */
  $(document).on("click", ".btn-preview", function (e) {
    e.preventDefault();

    var plan = $(this).attr("data-plan");
    var id = Cookies.get("attorneyId");
    var acceptClients = $("#styled-checkbox-10").is(":checked");
    localStorage.setItem("acceptClients", acceptClients);

    var socials = [];
    var keywords = "";
    if (
      $(".keywords-selected").length &&
      $(".keywords-selected").val().length
    ) {
      keywords =
        '<div class="info-block">\n' +
        '                 <h3>Keywords <span class="dotted"></span></h3>\n' +
        '                 <p class="description">' +
        $(".keywords-selected").val().join(" ") +
        "</p>\n" +
        "            </div>";
    } else {
      keywords = "";
    }

    if ($("#facebook").length && $("#facebook").val().length) {
      socials.push(
        '<a href="https://facebook.com/' +
          $("#facebook").val() +
          '" target="_blank"><span class="icon-fb"></span></a>'
      );
    }
    if ($("#linkedIn").length && $("#linkedIn").val().length) {
      socials.push(
        '<a href="https://linkedin.com/in/' +
          $("#linkedIn").val() +
          '" target="_blank"><span class="icon-linkedin"></span></a>'
      );
    }
    if ($("#instagram").length && $("#instagram").val().length) {
      socials.push(
        '<a href="https://instagram.com/' +
          $("#instagram").val() +
          '" target="_blank"><span class="icon-inst"></span></a>'
      );
    }
    if ($("#twitter").length && $("#twitter").val().length) {
      socials.push(
        '<a href="https://twitter.com/' +
          $("#twitter").val() +
          '" target="_blank"><span class="icon-twitter"></span></a>'
      );
    }
    socials = socials.join("");
    if (socials.length > 0) {
      socials =
        ' <div class="info-block">\n' +
        '                        <h3>Social media <span class="dotted"></span></h3>\n' +
        '                        <div class="social">' +
        socials +
        "</div>" +
        "</div>";
    }
    var headline = "";
    if ($("#headline").length) {
      if ($("#headline").val().length > 0) {
        headline =
          ' <div class="review"><p>' + $("#headline").val() + "</p></div>";
      }
    }
    var about = "";
    if ($("#about").val().length) {
      about = '<h3>About <span class="dotted"></span></h3><p class="description">' +
        $("#about").val() +
        "</p>";
    }
    var websiteUrl = "";
    if ($("#website-link").val().length) {
      websiteUrl = `
        <div class="contact-row">
            <span class="icon-link"></span>
            <p>
            <a href='https://${$("#website-link").val()}' target='_blank' style="color: #212529;">
              ${$("#website-link").val()}
            </a>
            </p>
        </div>
        `;
    }

    var albumItems = [];
    // display media data
    let previewLeftShowMedia = "";
    let previewRightShowMedia = "";
    let previewLeftShowMediaStr = "";
    let previewRightShowMediaStr = "";

    if (plan == "premium") {
      if (dropzone_default.getAcceptedFiles().length != 0) {
        dropzone_default.files.forEach((element) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          async function covertMain() {
            const result = await toBase64(element).catch((e) => Error(e));
            if (result instanceof Error) {
              console.log("Error: ", result.message);
              return;
            }
            albumItems.push({
              id: "",
              pictureUrl: "",
              imageData: result,
              isVideo: element.type.split("/")[0] == "video",
            });
          }
          covertMain();
        });
      }
      // formData["albumItems"] = albumItems;
      
    }

    // console.log("---media data on step 8's preview page:", albumItems);

    if ($(".file-input").val()) {
      $uploadCrop
        .croppie("result", {
          type: "canvas",
          size: "original",
          format: "jpeg",
          quality: 1,
          circle: false,
        })
        .then(function (resp) {
          $.ajax({
            url: apiDomain + "/Attorney/" + id,
            type: "GET",
            dataType: "json",
            beforeSend: function () {
              $("body").addClass("loading");
            },
            success: function (res) {
              console.log("------- response on the preview page of step 8", res);
              $("body").removeClass("loading");
              var id = res["id"];
              var name = res["fullName"];
              var company = "";
              var specialities = [];
              if (res["professionalInfo"]) {
                company = res["professionalInfo"]["company"];
                if(res["professionalInfo"]["legalIssues"]) {
                  $.each(res["professionalInfo"]["legalIssues"], function (pkey, parr) {
                    specialities.push(
                      "<span>" + res["professionalInfo"]["legalIssues"][pkey] + "</span>"
                    );
                  });
                  specialities = specialities.join("");
                  if (specialities.length > 0) {
                    specialities =
                      '<div class="info-block">\n' +
                      '                        <h3>Specialty <span class="dotted"></span></h3>\n' +
                      '                        <div class="tags">\n' +
                      specialities +
                      "                        </div>\n" +
                      "                    </div>";
                  }
                } else {
                  specialities = "";
                }
              } else {
                company = "";
                specialities = "";
              }
              var address = "";
              if (res["address"]) {
                address =
                  res["address"]["address1"] +
                  " <br>" +
                  res["address"]["address2"] +
                  "<br> " +
                  res["address"]["city"] +
                  " " +
                  res["address"]["state"] +
                  " " +
                  res["address"]["zip"];
              } else {
                address = "";
              }
              var ethnic = res["biographicalInfo"]["ethnicities"];
              var phoneSingle = res["contactInfo"]["workPhoneNumber"];

              var tags = [];
              var languages = [];
              var ethnicities = [];
              $.each(res["professionalInfo"]["practiceAreas"], function (
                pkey,
                parr
              ) {
                tags.push(
                  "<span>" +
                    res["professionalInfo"]["practiceAreas"][pkey] +
                    "</span>"
                );
              });
              tags = tags.join("");

              if (res["biographicalInfo"]["languages"]) {
                $.each(res["biographicalInfo"]["languages"], function (
                  pkey,
                  parr
                ) {
                  languages.push(
                    "<span>" +
                      res["biographicalInfo"]["languages"][pkey] +
                      "</span>"
                  );
                });
                languages = languages.join("");
              }
              if (languages.length > 0) {
                languages =
                  '<div class="info-block">\n' +
                  '             <h3>Languages <span class="dotted"></span></h3>\n' +
                  '             <div class="tags">\n' +
                  languages +
                  "                 </div>" +
                  "             </div>";
              }
              if (res["biographicalInfo"]["ethnicities"]) {
                $.each(res["biographicalInfo"]["ethnicities"], function (
                  pkey,
                  parr
                ) {
                  ethnicities.push(
                    "<span>" +
                      res["biographicalInfo"]["ethnicities"][pkey] +
                      "</span>"
                  );
                });
                ethnicities = ethnicities.join("");
              }
              var phone = "";
              if (res["contactInfo"]["workPhoneNumber"]) {
                phone = `
                  <div class="contact-row">
                    <span class="icon-phone"></span>
                      <a href="tel:${res['contactInfo']['workPhoneNumber']}" onclick="event.stopPropagation();" style="color: #212529;">
                        ${res['contactInfo']['workPhoneNumber']}
                      </a>
                  </div>
                `;
              }
              var education = res["educationalInfo"]["lawSchool"];

              var license = [];
              $.each(res["licenses"], function (pkey, parr) {
                if (res["licenses"][pkey]["date"]) {
                  var licenseDate = res["licenses"][pkey]["date"].substr(0, 4);
                  license.push(
                    "<span >" +
                      res["licenses"][pkey]["state"] +
                      ", " +
                      licenseDate +
                      "</span>"
                  );
                }
              });
              license.join("");
              if (license.length > 0) {
                license =
                  '<div class="info-block">\n' +
                  '         <h3>License <span class="dotted"></span></h3>\n' +
                  '             <div class="tags">\n' +
                  license +
                  "             </div>" +
                  "      </div>";
              }
              var fax = "";
              if (res["contactInfo"]["faxNumber"]) {
                fax =
                  '<div class="contact-row">\n' +
                  '           <span class="icon-fax-g"></span>\n' +
                  "           <p>" +
                  res["contactInfo"]["faxNumber"] +
                  "</p>\n" +
                  "      </div>\n";
              } else {
                fax = "";
              }

              if (acceptClients === false) {
                acceptClients =
                  '<p class="not-accept">Not accepting clients</p><input type="hidden" id="accept-clients" value="false" />';
              } else {
                acceptClients = '<input type="hidden" id="accept-clients" value="true" />';
              }

              if (plan === "pro-plus") {
                $(".step8").fadeOut();
                smoothScroll();
                $(".step8").after(
                  '<section class="profile pro-plus" style="display: none">\n' +
                    '    <div class="container">\n' +
                    '        <div class="profile-inner">\n' +
                    '            <a href="#" class="return-back"><span class="icon-arrow_left"></span>Back</a>\n' +
                    '            <div class="profile-wrapper">\n' +
                    '                <div class="profile__image">\n' +
                    '                    <img src="' +
                    resp +
                    '" class="circle-image" alt="">\n' +
                    '                    <span class="status">Pro&nbsp;Plus</span>\n' +
                    '                    <div class="contacts">\n' +
                    '                        <a href="#"><span class="icon-email"></span>Message</a>\n' +
                    '                        <a href="#"><span class="icon-phone"></span>' +
                    phoneSingle +
                    "</a>\n" +
                    '                        <a href="#"><span class="icon-link"></span>Share</a>\n' +
                    "                    </div>\n" +
                    acceptClients +
                    "                </div>\n" +
                    '                <div class="profile__info">\n' +
                    '                    <h2 class="name">' +
                    name +
                    "</h2>\n" +
                    '                    <p class="place">' +
                    company +
                    "</p>\n" +
                    headline +
                    '                    <div class="info-block">\n' +
                    about +
                    "                    </div>\n" +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
                    '                        <div class="tags">\n' +
                    tags +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    specialities +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
                    '                        <div class="tags">\n' +
                    ethnicities +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    languages +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Education <span class="dotted"></span></h3>\n' +
                    '                        <div class="tags">\n' +
                    education +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    license +
                    socials +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                    '                        <div class="contact-row">\n' +
                    '                            <span class="icon-location-g"></span>\n' +
                    "                            <p>" +
                    address +
                    "</p>\n" +
                    "                        </div>\n" +
                    phone +
                    websiteUrl +
                    fax +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    '            <form class="profile-buttons from-step8">\n' +
                    '                <a href="#" class="btn btn-secondary edit-info">Edit information</a>\n' +
                    '                <button type="submit" class="btn btn-primary" data-plan="pro-plus">Continue</button>\n' +
                    "            </form>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>"
                );
                $(".profile.pro-plus").fadeIn();
              } else if (plan === "pro") {
                smoothScroll();
                $(".step8-pro")
                  .fadeOut()
                  .after(
                    '<section class="profile pro" style="display:none;">\n' +
                      '    <div class="container">\n' +
                      '        <div class="profile-inner">\n' +
                      '            <a href="#" class="return-back"><span class="icon-arrow_left"></span>Back</a>\n' +
                      '            <div class="profile-wrapper">\n' +
                      '                <div class="profile__image">\n' +
                      '                    <img src="' +
                      resp +
                      '" class="circle-image" alt="">\n' +
                      '                    <span class="status">Pro</span>\n' +
                      '                    <div class="contacts">\n' +
                      '                        <a href="#"><span class="icon-email"></span>Message</a>\n' +
                      '                        <a href="#"><span class="icon-phone"></span>' +
                      phoneSingle +
                      "</a>\n" +
                      '                        <a href="#"><span class="icon-link"></span>Share</a>\n' +
                      "                    </div>\n" +
                      acceptClients +
                      "                </div>\n" +
                      '                <div class="profile__info">\n' +
                      '                    <h2 class="name">' +
                      name +
                      "</h2>\n" +
                      '                    <p class="place">' +
                      company +
                      "</p>\n" +
                      '                    <div class="info-block">\n' +
                      about +
                      "                    </div>\n" +
                      '                    <div class="info-block">\n' +
                      '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
                      '                        <div class="tags">\n' +
                      tags +
                      "                        </div>\n" +
                      "                    </div>\n" +
                      specialities +
                      '                    <div class="info-block">\n' +
                      '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
                      '                        <div class="tags">\n' +
                      ethnicities +
                      "                        </div>\n" +
                      "                    </div>\n" +
                      languages +
                      '                    <div class="info-block">\n' +
                      '                        <h3>Education <span class="dotted"></span></h3>\n' +
                      '                        <div class="tags">\n' +
                      education +
                      "                        </div>\n" +
                      "                    </div>\n" +
                      license +
                      '                    <div class="info-block">\n' +
                      '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                      '                        <div class="contact-row">\n' +
                      '                            <span class="icon-location-g"></span>\n' +
                      "                            <p>" +
                      address +
                      "</p>\n" +
                      "                        </div>\n" +
                      phone +
                      websiteUrl +
                      fax +
                      "                    </div>\n" +
                      "                </div>\n" +
                      "            </div>\n" +
                      '            <form class="profile-buttons from-step8">\n' +
                      '                <a href="#" class="btn btn-secondary edit-info">Edit information</a>\n' +
                      '                <button type="submit" class="btn btn-primary" data-plan="pro">Publish your profile</a>\n' +
                      "            </form>\n" +
                      "        </div>\n" +
                      "    </div>\n" +
                      "</section>"
                  );
                $(".profile.pro").fadeIn();
              } else if (plan === "premium") {
                smoothScroll();
                setTimeout(() => {
                  // Save albumItems to browser cookie on the preview page of step 8
                  localStorage.setItem("albumItems", JSON.stringify(albumItems));
                 
                  if (albumItems.length != 0) {
                    albumItems.forEach((element) => {
                      if (element.isVideo) {
                        previewLeftShowMedia += `
                          <div class="col-xs-3 media-items">
                            <a data-fancybox="bigbuckbunny1" href=${element.imageData} style="display: flex;">
                              <div class="video-item">
                                <video width="91px" height="44px">
                                  <source src=${element.imageData}></source>
                                </video>
                              </div>
                            </a>
                          </div>
                        `;
                        previewRightShowMedia += `
                          <div class="col-xs-3 media-items">
                            <a data-fancybox="bigbuckbunny2" href=${element.imageData} style="display: flex;">
                              <div class="video-item">
                                <video width="91px" height="44px">
                                  <source src=${element.imageData}></source>
                                </video>
                              </div>
                            </a>
                          </div>
                        `;
                      } else {
                        previewLeftShowMedia += `
                          <div class="col-xs-3 media-items">
                            <a class="d-block" data-fancybox="bigbuckbunny1" href=${element.imageData}>
                              <img
                                class="media-img"
                                src=${element.imageData}
                              />
                            </a>
                          </div>
                        `;
                        previewRightShowMedia += `
                          <div class="col-xs-3 media-items">
                            <a class="d-block" data-fancybox="bigbuckbunny2" href=${element.imageData}>
                              <img
                                class="media-img"
                                src=${element.imageData}
                              />
                            </a>
                          </div>
                        `;
                      }
                    });
                    previewLeftShowMediaStr = "<div class='row media-data-wrapper'>" +
                                                previewLeftShowMedia +
                                              "</div>";
                    previewRightShowMediaStr = '<div class="info-block">\n' +
                                              '                        <h3>Photos\n' +
                                              '                            <span class="dotted"></span>\n' +
                                              '                        </h3>\n' +
                                              '                        <div class="premium-container">\n' +
                                              '                            <div class="row">\n' +
                                                                            previewRightShowMedia +
                                              '                            </div>\n' +
                                              '                        </div>\n' +
                                              '                    </div>\n';
                  }

                  // console.log("---media data on step 8's preview page:", albumItems, previewLeftShowMediaStr, previewRightShowMediaStr);
                  
                  $(".step8-premium")
                    .fadeOut()
                    .after(
                      '<section class="profile premium" style="display: none">\n' +
                        '    <div class="container">\n' +
                        '        <div class="profile-inner">\n' +
                        '            <a href="#" class="return-back"><span class="icon-arrow_left"></span>Back</a>\n' +
                        '            <div class="profile-wrapper">\n' +
                        '                <div class="profile__image">\n' +
                        '                    <img src="' +
                        resp +
                        '" class="circle-image" alt="">\n' +
                        '                    <span class="status">Premium</span>\n' +
                        previewLeftShowMediaStr +
                        '                    <div class="contacts">\n' +
                        '                        <a href="#" class="popup-opener" data-popup="message"><span class="icon-email"></span>Message</a>\n' +
                        '                        <a href="#"><span class="icon-phone"></span>' +
                        phoneSingle +
                        "</a>\n" +
                        '                        <a href="#" class="popup-opener" data-popup="refer"><span class="icon-link"></span>Share</a>\n' +
                        "                    </div>\n" +
                        acceptClients +
                        "                </div>\n" +
                        '                <div class="profile__info">\n' +
                        '                    <h2 class="name">' +
                        name +
                        "</h2>\n" +
                        '                    <p class="place">' +
                        company +
                        "</p>\n" +
                        headline +
                        '                    <div class="info-block">\n' +
                        about +
                        "                    </div>\n" +
                        '                    <div class="info-block">\n' +
                        '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
                        '                        <div class="tags">\n' +
                        tags +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        specialities +
                        '                    <div class="info-block">\n' +
                        '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
                        '                        <div class="tags">\n' +
                        ethnicities +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        languages +
                        '                    <div class="info-block">\n' +
                        '                        <h3>Education <span class="dotted"></span></h3>\n' +
                        '                        <div class="tags">\n' +
                        education +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        license +
                        socials +
                        '                    <div class="info-block">\n' +
                        '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                        '                        <div class="contact-row">\n' +
                        '                            <span class="icon-location-g"></span>\n' +
                        "                            <p>" +
                        address +
                        "</p>\n" +
                        "                        </div>\n" +
                        phone +
                        websiteUrl +
                        fax +
                        "                    </div>\n" +
                        previewRightShowMediaStr +
                        keywords +
                        "                </div>\n" +
                        "            </div>\n" +
                        '            <form class="profile-buttons from-step8">\n' +
                        '                <a href="#" class="btn btn-secondary edit-info">Edit information</a>\n' +
                        '                <button type="submit" class="btn btn-primary" data-plan="premium">Continue</button>\n' +
                        "            </form>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</section>"
                    );
                  $(".profile.premium").fadeIn();

                }, 100);
              }
              $(".icon-phone + p").text(function (i, text) {
                return text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
              });
              $(".profile__image .contacts a:nth-child(2)").html(
                '<span class="icon-phone"></span>' +
                  $(".profile__image .contacts a:nth-child(2)")
                    .text()
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
              );
              readFile(".file-input");
            },
          });
        });
    } else {
      $.ajax({
        url: apiDomain + "/Attorney/" + id,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
          $("body").addClass("loading");
        },
        success: function (res) {
          // console.log("------- response on the preview page of step 8", res);
          $("body").removeClass("loading");
          var id = res["id"];
          var name = res["fullName"];
          var company = "";
          var specialities = [];
          
          if (res["professionalInfo"]) {
            company = res["professionalInfo"]["company"];
            if(res["professionalInfo"]["legalIssues"]) {
              $.each(res["professionalInfo"]["legalIssues"], function (pkey, parr) {
                specialities.push(
                  "<span>" + res["professionalInfo"]["legalIssues"][pkey] + "</span>"
                );
              });
              specialities = specialities.join("");
              if (specialities.length > 0) {
                specialities =
                  '<div class="info-block">\n' +
                  '                        <h3>Specialty <span class="dotted"></span></h3>\n' +
                  '                        <div class="tags">\n' +
                  specialities +
                  "                        </div>\n" +
                  "                    </div>";
              }
            } else {
              specialities = "";
            }
          } else {
            company = "";
            specialities = "";
          }

          var address = "";
          if (res["address"]) {
            address =
              res["address"]["address1"] +
              " <br>" +
              res["address"]["address2"] +
              "<br> " +
              res["address"]["city"] +
              " " +
              res["address"]["state"] +
              " " +
              res["address"]["zip"];
          } else {
            address = "";
          }
          var ethnic = res["biographicalInfo"]["ethnicities"];
          var phoneSingle = res["contactInfo"]["workPhoneNumber"];
          var tags = [];
          var languages = [];
          var ethnicities = [];
          $.each(res["professionalInfo"]["practiceAreas"], function (
            pkey,
            parr
          ) {
            tags.push(
              "<span>" +
                res["professionalInfo"]["practiceAreas"][pkey] +
                "</span>"
            );
          });
          tags = tags.join("");

          if (res["biographicalInfo"]["languages"]) {
            $.each(res["biographicalInfo"]["languages"], function (pkey, parr) {
              languages.push(
                "<span>" +
                  res["biographicalInfo"]["languages"][pkey] +
                  "</span>"
              );
            });
            languages = languages.join("");
          }
          if (languages.length > 0) {
            languages =
              '<div class="info-block">\n' +
              '             <h3>Languages <span class="dotted"></span></h3>\n' +
              '             <div class="tags">\n' +
              languages +
              "                 </div>" +
              "             </div>";
          }

          if (res["biographicalInfo"]["ethnicities"]) {
            $.each(res["biographicalInfo"]["ethnicities"], function (
              pkey,
              parr
            ) {
              ethnicities.push(
                "<span>" +
                  res["biographicalInfo"]["ethnicities"][pkey] +
                  "</span>"
              );
            });
            ethnicities = ethnicities.join("");
          }
          var phone = "";
          if (res["contactInfo"]["workPhoneNumber"]) {
              phone =
              '<div class="contact-row">\n' +
              '             <span class="icon-phone"></span>\n' +
              "             <p>" +
              res["contactInfo"]["workPhoneNumber"] +
              "</p>\n" +
              "        </div>";
          }

          var education = res["educationalInfo"]["lawSchool"];

          var license = [];
          $.each(res["licenses"], function (pkey, parr) {
            var licenseDate = res["licenses"][pkey]["date"].substr(0, 4);
            license.push(
              "<span >" +
                res["licenses"][pkey]["state"] +
                "," +
                licenseDate +
                "</span>"
            );
          });
          license.join("");
          if (license.length > 0) {
            license =
              '<div class="info-block">\n' +
              '         <h3>License <span class="dotted"></span></h3>\n' +
              '             <div class="tags">\n' +
              license +
              "             </div>" +
              "      </div>";
          }
          var fax = "";
          if (res["contactInfo"]["faxNumber"]) {
            fax =
              '<div class="contact-row">\n' +
              '           <span class="icon-fax-g"></span>\n' +
              "           <p>" +
              res["contactInfo"]["faxNumber"] +
              "</p>\n" +
              "      </div>\n";
          } else {
            fax = "";
          }
          if (acceptClients === false) {
            acceptClients = '<p class="not-accept">Not accepting clients</p>';
          } else {
            acceptClients = "";
          }

          if (plan === "pro-plus") {
            $(".step8").fadeOut();
            smoothScroll();
            $(".step8").after(
              '<section class="profile pro-plus" style="display: none">\n' +
                '    <div class="container">\n' +
                '        <div class="profile-inner">\n' +
                '            <a href="#" class="return-back"><span class="icon-arrow_left"></span>Back</a>\n' +
                '            <div class="profile-wrapper">\n' +
                '                <div class="profile__image">\n' +
                '                    <img src="images/user.png" class="circle-image" alt="">\n' +
                '                    <span class="status">Pro&nbsp;Plus</span>\n' +
                '                    <div class="contacts">\n' +
                '                        <a href="#"><span class="icon-email"></span>Message</a>\n' +
                '                        <a href="#"><span class="icon-phone"></span>' +
                phoneSingle +
                "</a>\n" +
                '                        <a href="#"><span class="icon-link"></span>Share</a>\n' +
                "                    </div>\n" +
                acceptClients +
                "                </div>\n" +
                '                <div class="profile__info">\n' +
                '                    <h2 class="name">' +
                name +
                "</h2>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                headline +
                '                    <div class="info-block">\n' +
                about +
                "                    </div>\n" +
                '                    <div class="info-block">\n' +
                '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                "                    </div>\n" +
                specialities +
                '                    <div class="info-block">\n' +
                '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
                '                        <div class="tags">\n' +
                ethnicities +
                "                        </div>\n" +
                "                    </div>\n" +
                languages +
                '                    <div class="info-block">\n' +
                '                        <h3>Education <span class="dotted"></span></h3>\n' +
                '                        <div class="tags">\n' +
                "                            <span>" +
                education +
                "</span>" +
                "                        </div>\n" +
                "                    </div>\n" +
                license +
                socials +
                '                    <div class="info-block">\n' +
                '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                '                        <div class="contact-row">\n' +
                '                            <span class="icon-location-g"></span>\n' +
                "                            <p>" +
                address +
                "</p>\n" +
                "                        </div>\n" +
                phone +
                websiteUrl+
                fax +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                '            <form class="profile-buttons from-step8">\n' +
                '                <a href="#" class="btn btn-secondary edit-info">Edit information</a>\n' +
                '                <button type="submit" class="btn btn-primary" data-plan="pro-plus">Continue</button>\n' +
                "            </form>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</section>"
            );
            $(".profile.pro-plus").fadeIn();
          } else if (plan === "pro") {
            smoothScroll();
            $(".step8-pro")
              .fadeOut()
              .after(
                '<section class="profile pro" style="display:none;">\n' +
                  '    <div class="container">\n' +
                  '        <div class="profile-inner">\n' +
                  '            <a href="#" class="return-back"><span class="icon-arrow_left"></span>Back</a>\n' +
                  '            <div class="profile-wrapper">\n' +
                  '                <div class="profile__image">\n' +
                  '                    <img src="images/user.png" class="circle-image" alt="">\n' +
                  '                    <span class="status">Pro</span>\n' +
                  '                    <div class="contacts">\n' +
                  '                        <a href="#"><span class="icon-email"></span>Message</a>\n' +
                  '                        <a href="#"><span class="icon-phone"></span>' +
                  phoneSingle +
                  "</a>\n" +
                  '                        <a href="#"><span class="icon-link"></span>Share</a>\n' +
                  "                    </div>\n" +
                  acceptClients +
                  "                </div>\n" +
                  '                <div class="profile__info">\n' +
                  '                    <h2 class="name">' +
                  name +
                  "</h2>\n" +
                  '                    <p class="place">' +
                  company +
                  "</p>\n" +
                  '                    <div class="info-block">\n' +
                  about +
                  "                    </div>\n" +
                  '                    <div class="info-block">\n' +
                  '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
                  '                        <div class="tags">\n' +
                  tags +
                  "                        </div>\n" +
                  "                    </div>\n" +
                  specialities +
                  '                    <div class="info-block">\n' +
                  '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
                  '                        <div class="tags">\n' +
                  ethnicities +
                  "                        </div>\n" +
                  "                    </div>\n" +
                  languages +
                  '                    <div class="info-block">\n' +
                  '                        <h3>Education <span class="dotted"></span></h3>\n' +
                  '                        <div class="tags">\n' +
                  "                            <span>" +
                  education +
                  "</span>" +
                  "                        </div>\n" +
                  "                    </div>\n" +
                  license +
                  '                    <div class="info-block">\n' +
                  '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                  '                        <div class="contact-row">\n' +
                  '                            <span class="icon-location-g"></span>\n' +
                  "                            <p>" +
                  address +
                  "</p>\n" +
                  "                        </div>\n" +
                  phone +
                  websiteUrl+
                  fax +
                  "                    </div>\n" +
                  "                </div>\n" +
                  "            </div>\n" +
                  '            <form class="profile-buttons from-step8">\n' +
                  '                <a href="#" class="btn btn-secondary edit-info">Edit information</a>\n' +
                  '                <button type="submit" class="btn btn-primary" data-plan="pro">Publish your profile</a>\n' +
                  "            </form>\n" +
                  "        </div>\n" +
                  "    </div>\n" +
                  "</section>"
              );
            $(".profile.pro").fadeIn();
          } else if (plan === "premium") {
            smoothScroll();
            setTimeout(() => {
              // Save albumItems to browser cookie on the preview page of step 8
              // console.log("--------", JSON.stringify(albumItems));
              localStorage.setItem("albumItems", JSON.stringify(albumItems));

              if (albumItems.length != 0) {
                albumItems.forEach((element) => {
                  if (element.isVideo) {
                    previewLeftShowMedia += `
                      <div class="col-xs-3 media-items">
                        <a data-fancybox="bigbuckbunny1" href=${element.imageData} style="display: flex;">
                          <div class="video-item">
                            <video width="91px" height="44px">
                              <source src=${element.imageData}></source>
                            </video>
                          </div>
                        </a>
                      </div>
                    `;
                    previewRightShowMedia += `
                      <div class="col-xs-3 media-items">
                        <a data-fancybox="bigbuckbunny2" href=${element.imageData} style="display: flex;">
                          <div class="video-item">
                            <video width="91px" height="44px">
                              <source src=${element.imageData}></source>
                            </video>
                          </div>
                        </a>
                      </div>
                    `;
                  } else {
                    previewLeftShowMedia += `
                      <div class="col-xs-3 media-items">
                        <a class="d-block" data-fancybox="bigbuckbunny1" href=${element.imageData}>
                          <img
                            class="media-img"
                            src=${element.imageData}
                          />
                        </a>
                      </div>
                    `;
                    previewRightShowMedia += `
                      <div class="col-xs-3 media-items">
                        <a class="d-block" data-fancybox="bigbuckbunny2" href=${element.imageData}>
                          <img
                            class="media-img"
                            src=${element.imageData}
                          />
                        </a>
                      </div>
                    `;
                  }
                });
                previewLeftShowMediaStr = "<div class='row media-data-wrapper'>" +
                                            previewLeftShowMedia +
                                          "</div>";
                previewRightShowMediaStr = '<div class="info-block">\n' +
                                          '                        <h3>Photos\n' +
                                          '                            <span class="dotted"></span>\n' +
                                          '                        </h3>\n' +
                                          '                        <div class="premium-container">\n' +
                                          '                            <div class="row">\n' +
                                                                        previewRightShowMedia +
                                          '                            </div>\n' +
                                          '                        </div>\n' +
                                          '                    </div>\n';
              }

              // console.log("---media data on step 8's preview page:", albumItems, previewLeftShowMediaStr, previewRightShowMediaStr);

              $(".step8-premium")
                .fadeOut()
                .after(
                  '<section class="profile premium" style="display: none">\n' +
                    '    <div class="container">\n' +
                    '        <div class="profile-inner">\n' +
                    '            <a href="#" class="return-back"><span class="icon-arrow_left"></span>Back</a>\n' +
                    '            <div class="profile-wrapper">\n' +
                    '                <div class="profile__image">\n' +
                    '                    <img src="images/user.png" class="circle-image" alt="">\n' +
                    '                    <span class="status">Premium</span>\n' +
                    previewLeftShowMediaStr +
                    '                    <div class="contacts">\n' +
                    '                        <a href="#" class="popup-opener" data-popup="message"><span class="icon-email"></span>Message</a>\n' +
                    '                        <a href="#"><span class="icon-phone"></span>' +
                    phoneSingle +
                    "</a>\n" +
                    '                        <a href="#" class="popup-opener" data-popup="refer"><span class="icon-link"></span>Share</a>\n' +
                    "                    </div>\n" +
                    acceptClients +
                    "                </div>\n" +
                    '                <div class="profile__info">\n' +
                    '                    <h2 class="name">' +
                    name +
                    "</h2>\n" +
                    '                    <p class="place">' +
                    company +
                    "</p>\n" +
                    headline +
                    '                    <div class="info-block">\n' +
                    about +
                    "                    </div>\n" +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
                    '                        <div class="tags">\n' +
                    tags +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    specialities +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
                    '                        <div class="tags">\n' +
                    ethnicities +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    languages +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Education <span class="dotted"></span></h3>\n' +
                    '                        <div class="tags">\n' +
                    "                            <span>" +
                    education +
                    "</span>" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    license +
                    socials +
                    '                    <div class="info-block">\n' +
                    '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                    '                        <div class="contact-row">\n' +
                    '                            <span class="icon-location-g"></span>\n' +
                    "                            <p>" +
                    address +
                    "</p>\n" +
                    "                        </div>\n" +
                    phone +
                    websiteUrl+
                    fax +
                    "                    </div>\n" +
                    previewRightShowMediaStr +
                    keywords +
                    "                </div>\n" +
                    "            </div>\n" +
                    '            <form class="profile-buttons from-step8">\n' +
                    '                <a href="#" class="btn btn-secondary edit-info">Edit information</a>\n' +
                    '                <button type="submit" class="btn btn-primary" data-plan="premium">Continue</button>\n' +
                    "            </form>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>"
                );
              $(".profile.premium").fadeIn();
            }, 100);
          }
          $(".icon-phone + p").text(function (i, text) {
            return text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
          });
          $(".profile__image .contacts a:nth-child(2)").html(
            '<span class="icon-phone"></span>' +
              $(".profile__image .contacts a:nth-child(2)")
                .text()
                .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
          );

          readFile(".file-input");
        },
      });
    }
  });

  //Upload Image with crop
  var $uploadCrop;

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".upload-photo").addClass("ready");
        $uploadCrop
          .croppie("bind", {
            url: e.target.result,
          })
          .then(function () {});
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      swal("Sorry - you're browser doesn't support the FileReader API");
    }
  }

  // $uploadCrop = $('#upload-images').croppie({
  //     viewport: {
  //         width: 200,
  //         height: 200,
  //         type: 'circle'
  //     },
  //     boundary: {
  //         width: 200,
  //         height: 200
  //     },
  //     enableExif: true
  // });
  //
  // $uploadCropPro = $('#upload-images-pro').croppie({
  //     viewport: {
  //         width: 200,
  //         height: 200,
  //         type: 'circle'
  //     },
  //     boundary: {
  //         width: 200,
  //         height: 200
  //     },
  //     enableExif: true
  // });
  //
  // $uploadCropPremium = $('#upload-images-premium').croppie({
  //     viewport: {
  //         width: 200,
  //         height: 200,
  //         type: 'circle'
  //     },
  //     boundary: {
  //         width: 200,
  //         height: 200
  //     },
  //     enableExif: true
  // });

  $(document).on("change", ".file-input", function () {
    $uploadCrop = $("#upload-images").croppie({
      viewport: {
        width: 200,
        height: 200,
        type: "circle",
      },
      boundary: {
        width: 200,
        height: 200,
      },
      // showZoomer: false,
      // enableResize: true,
      enforceBoundary: false,
      // enableOrientation: true,
      mouseWheelZoom: 'ctrl',
      enableExif: true,
    });

    readFile(this);
  });

  /*
   *
   *   STEP 8  (Payment)
   *
   */
  $(document).on("submit", ".register .from-step8", function (e) {
    e.preventDefault();
    var formData = new Object();
    var plan = $(this).find(".btn-primary").attr("data-plan");
    var attorneyId = Cookies.get("attorneyId");
    var token = Cookies.get("token");
    var about = $("#about").val();
    var websiteUrl = "";
    if ($("#website-link").val().length != 0) {
      websiteUrl = 'https://' + $("#website-link").val();
    }
    var headline = "";
    if ($("#headline").length) {
      headline = $("#headline").val();
    }

    var pictureUrl = "";
    var profilePicture = "";
    var facebook = "";
    if ($("#facebook").length && $("#facebook").val().length) {
      facebook = 'https://facebook.com/' + $("#facebook").val();
    }
    var linkedin = "";
    if ($("#linkedIn").length && $("#linkedIn").val().length) {
      linkedin = 'https://linkedin.com/in/' + $("#linkedIn").val();
    }
    var instagram = "";
    if ($("#instagram").length && $("#instagram").val().length) {
      instagram = 'https://instagram.com/' + $("#instagram").val();
    }
    var twitter = "";
    if ($("#twitter").length && $("#twitter").val().length) {
      twitter = 'https://twitter.com/' + $("#twitter").val();
    }
    var keywords = "";
    if ($(".keywords-selected").length) {
      keywords = $(".keywords-selected").val();
    } else {
      keywords = "";
    }

    var accepted = $("#styled-checkbox-10").is(":checked");
    formData["acceptingNewClients"] = accepted;
    // photos & videos
    var albumItems = [];
    var planId = Cookies.get("planId");
    if (plan == "premium") {
      if (dropzone_default.getAcceptedFiles().length != 0) {
        dropzone_default.files.forEach((element) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          async function covertMain() {
            const result = await toBase64(element).catch((e) => Error(e));
            if (result instanceof Error) {
              console.log("Error: ", result.message);
              return;
            }
            albumItems.push({
              id: "",
              pictureUrl: "",
              imageData: result,
              isVideo: element.type.split("/")[0] == "video",
            });
          }
          covertMain();
        });
      }
      formData["albumItems"] = albumItems;
    }
    var state = Cookies.get("state");
    if ($(".file-input").val()) {
      $uploadCrop
        .croppie("result", {
          type: "canvas",
          size: "original",
          format: "jpeg",
          quality: 1,
          circle: false,
        })
        .then(function (resp) {
          // var formData = new FormData();
          // formData.append("ProfilePicture", resp);
          // formData.append("imageData", resp);
          // formData.append("attorneyId", attorneyId);
          // formData.append("about", about);
          // formData.append("headline", headline);
          // formData.append("facebookUrl", facebook);
          // formData.append("linkedInUrl", linkedin);
          // formData.append("instagramUrl", instagram);
          // formData.append("twitterUrl", twitter);
          formData["pictureUrl"] = "";
          formData["imageData"] = resp;
          formData["attorneyId"] = attorneyId;
          formData["about"] = about;
          formData["websiteUrl"] = websiteUrl; 
          if (plan != "Pro") {
            formData["headline"] = headline;
            formData["facebookUrl"] = facebook;
            formData["linkedInUrl"] = linkedin;
            formData["instagramUrl"] = instagram;
            formData["twitterUrl"] = twitter;
          }
          setTimeout(() => {
            $.ajax({
              type: "PUT",
              // enctype: "multipart/form-data",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              processData: false,
              contentType: false,
              dataType: "json",
              url: apiDomain + "/Attorney/UpdateAttorneyProfile",
              data: JSON.stringify(formData),
              beforeSend: function () {
                $("body").addClass("loading");
              },
              success: function (res) {
                if (plan == "premium") {
                  dropzone_default.removeAllFiles(true);
                }
                var attorneyId = Cookies.get("attorneyId");
                $.ajax({
                  type: "PUT",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                  },
                  dataType: "json",
                  url:
                    apiDomain +
                    "/Attorney/UpdateAttorneyAcceptingNewClients?attorneyId=" +
                    attorneyId +
                    "&AcceptingNewClients=" +
                    accepted,
                  success: function () {
                    var attorneyId = Cookies.get("attorneyId");
                    if (plan === "pro") {
                      window.onbeforeunload = null;
                      window.open("profile-pro.html?id=" + attorneyId, "_self");
                    } else if (plan === "pro-plus") {
                      smoothScroll();
                      $.ajax({
                        type: "GET",
                        url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                        success: function (res) {
                          var tax = res["taxAmount"];
                          var total = res["totalAmount"];
                          var step8 = "";
                          if ($("section").hasClass("profile")) {
                            step8 = $(".profile");
                            $(".step8, .profile").fadeOut();
                          } else {
                            step8 = $(".step8");
                            $(".step8").fadeOut();
                          }
                          step8.after(
                            '<section class="register step9" style="display:none;">\n' +
                              '    <div class="container">\n' +
                              '        <div class="register-wrapper">\n' +
                              '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                              '            <h2>Payment<span class="status pro-plus">Pro Plus</span></h2>\n' +
                              '            <ul class="steps">\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="completed"></li>\n' +
                              '                <li class="active">Step 9</li>\n' +
                              "            </ul>\n" +
                              '            <div class="payment-form">\n' +
                              '                <form id="visa" class="pci active" data-plan="pro-plus">\n' +
                              '                    <div class="form-group">\n' +
                              '                        <label for="cardholdername">Cardholder Name</label>\n' +
                              '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                              "                    </div>\n" +
                              '                    <div class="form-group">\n' +
                              '                        <label for="cardnumber">Card Number</label>\n' +
                              '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                              "                    </div>\n" +
                              '                    <div class="form-group small">\n' +
                              '                        <label for="expirationdate">Expiration Date</label>\n' +
                              '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                              "                    </div>\n" +
                              '                    <div class="form-group small">\n' +
                              '                        <label for="CVC">CVC</label>\n' +
                              '                        <input type="password" id="cvc" required>\n' +
                              "                    </div>\n" +
                              "                    <h3>Billing address</h3>\n" +
                              '                    <div class="form-group">\n' +
                              '                        <label for="biladdress">Address</label>\n' +
                              '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                              "                    </div>\n" +
                              '                    <div class="form-group">\n' +
                              '                        <label for="bilsuite">Suite</label>\n' +
                              '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                              "                    </div>\n" +
                              '                    <div class="form-group">\n' +
                              '                        <label for="bilcity">City</label>\n' +
                              '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                              "                    </div>\n" +
                              '                    <div class="form-group small">\n' +
                              '                        <label for="bilstate">State</label>\n' +
                              '                        <select id="bilstate" class="add-info-select">\n' +
                              '                            <option value="AL">AL</option>\n' +
                              '                            <option value="AK">AK</option>\n' +
                              '                            <option value="AZ">AZ</option>\n' +
                              '                            <option value="AR">AR</option>\n' +
                              '                            <option value="CA">CA</option>\n' +
                              '                            <option value="CO">CO</option>\n' +
                              '                            <option value="CT">CT</option>\n' +
                              '                            <option value="DE">DE</option>\n' +
                              '                            <option value="DC">DC</option>\n' +
                              '                            <option value="FM">FM</option>\n' +
                              '                            <option value="FL">FL</option>\n' +
                              '                            <option value="GA">GA</option>\n' +
                              '                            <option value="HI">HI</option>\n' +
                              '                            <option value="ID">ID</option>\n' +
                              '                            <option value="IL">IL</option>\n' +
                              '                            <option value="IN">IN</option>\n' +
                              '                            <option value="IA">IA</option>\n' +
                              '                            <option value="KS">KS</option>\n' +
                              '                            <option value="KY">KY</option>\n' +
                              '                            <option value="LA">LA</option>\n' +
                              '                            <option value="ME">ME</option>\n' +
                              '                            <option value="MH">MH</option>\n' +
                              '                            <option value="MD">MD</option>\n' +
                              '                            <option value="MA">MA</option>\n' +
                              '                            <option value="MI">MI</option>\n' +
                              '                            <option value="MN">MN</option>\n' +
                              '                            <option value="MS">MS</option>\n' +
                              '                            <option value="MO">MO</option>\n' +
                              '                            <option value="MT">MT</option>\n' +
                              '                            <option value="NE">NE</option>\n' +
                              '                            <option value="NV">NV</option>\n' +
                              '                            <option value="NH">NH</option>\n' +
                              '                            <option value="NJ">NJ</option>\n' +
                              '                            <option value="NM">NM</option>\n' +
                              '                            <option value="NY">NY</option>\n' +
                              '                            <option value="NC">NC</option>\n' +
                              '                            <option value="ND">ND</option>\n' +
                              '                            <option value="OH">OH</option>\n' +
                              '                            <option value="OK">OK</option>\n' +
                              '                            <option value="OR">OR</option>\n' +
                              '                            <option value="PW">PW</option>\n' +
                              '                            <option value="PA">PA</option>\n' +
                              '                            <option value="RI">RI</option>\n' +
                              '                            <option value="SC">SC</option>\n' +
                              '                            <option value="SD">SD</option>\n' +
                              '                            <option value="TN">TN</option>\n' +
                              '                            <option value="TX">TX</option>\n' +
                              '                            <option value="UT">UT</option>\n' +
                              '                            <option value="VT">VT</option>\n' +
                              '                            <option value="VA">VA</option>\n' +
                              '                            <option value="WA">WA</option>\n' +
                              '                            <option value="WV">WV</option>\n' +
                              '                            <option value="WI">WI</option>\n' +
                              '                            <option value="WY">WY</option>\n' +
                              '                            <option value="AS">AS</option>\n' +
                              '                            <option value="GU">GU</option>\n' +
                              '                            <option value="MP">MP</option>\n' +
                              '                            <option value="PR">PR</option>\n' +
                              '                            <option value="UM">UM</option>\n' +
                              '                            <option value="VI">VI</option>\n' +
                              '                            <option value="AA">AA</option>\n' +
                              '                            <option value="AP">AP</option>\n' +
                              '                            <option value="AE">AE</option>\n' +
                              "                        </select>\n" +
                              "                    </div>\n" +
                              '                    <div class="form-group small">\n' +
                              '                        <label for="bilzip">Zip</label>\n' +
                              '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                              "                    </div>" +
                              '                    <h5 class="cost-price">Annual subscription cost: $<span>299.88</span></h5>\n' +
                              '                    <h5 class="tax-price">Sales tax: $<span>' +
                              Number.parseFloat(tax).toFixed(2) +
                              "</span></h5>\n" +
                              '                    <h5 class="total-price">Total cost: $<span>' +
                              Number.parseFloat(total).toFixed(2) +
                              "</span></h5>\n" +
                              '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                              "                </form>\n" +
                              "            </div>\n" +
                              "        </div>\n" +
                              "    </div>\n" +
                              "</section>"
                          );
                          // paypal_sdk.Buttons({
                          //     createOrder: function (data, actions) {
                          //         return actions.order.create({
                          //             purchase_units: [{
                          //                 amount: {
                          //                     value: '24.99'
                          //                 }
                          //             }]
                          //         });
                          //     },
                          //     onApprove: function (data, actions) {
                          //         return actions.order.capture().then(function (details) {
                          //             alert('Transaction completed by ' + details.payer.name.given_name);
                          //             window.onbeforeunload = null;
                          //             window.open('profile.html?id=' + attorneyId, "_self")
                          //         });
                          //     }
                          // }).render('#paypal-button-container');
                          initSelect2($(".add-info-select"));
                          if ($("#cardnumber").length)
                            new Cleave("#cardnumber", {
                              creditCard: true,
                            });

                          if ($("#expirationdate").length)
                            new Cleave("#expirationdate", {
                              date: true,
                              datePattern: ["m", "y"],
                            });
                          $(".step9").fadeIn();
                        },
                      });
                    } else if (plan === "premium") {
                      var attorneyId = Cookies.get("attorneyId");
                      if (keywords.length > 0) {
                        $.ajax({
                          type: "PUT",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                          },
                          url: apiDomain + "/Attorney/UpdateAttorneyKeywords",
                          data: JSON.stringify({
                            attorneyId: attorneyId,
                            keywords: keywords,
                          }),
                          success: function () {
                            smoothScroll();
                            $.ajax({
                              type: "GET",
                              url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                              success: function (res) {
                                var tax = res["taxAmount"];
                                var total = res["totalAmount"];
                                var step8 = "";
                                if ($("section").hasClass("profile")) {
                                  step8 = $(".profile");
                                  $(".step8-premium, .profile").fadeOut();
                                } else {
                                  step8 = $(".step8-premium");
                                  $(".step8-premium").fadeOut();
                                }
                                step8.after(
                                  '<section class="register step9-premium" style="display:none;">\n' +
                                    '    <div class="container">\n' +
                                    '        <div class="register-wrapper">\n' +
                                    '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                                    '            <h2>Payment<span class="status premium">Premium</span></h2>\n' +
                                    '            <ul class="steps">\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="completed"></li>\n' +
                                    '                <li class="active">Step 9</li>\n' +
                                    "            </ul>\n" +
                                    '            <div class="payment-form">\n' +
                                    '                <form id="visa" class="pci active" data-plan="premium">\n' +
                                    '                    <div class="form-group">\n' +
                                    '                        <label for="cardholdername">Cardholder Name</label>\n' +
                                    '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                                    "                    </div>\n" +
                                    '                    <div class="form-group">\n' +
                                    '                        <label for="cardnumber">Card Number</label>\n' +
                                    '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                                    "                    </div>\n" +
                                    '                    <div class="form-group small">\n' +
                                    '                        <label for="expirationdate">Expiration Date</label>\n' +
                                    '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                                    "                    </div>\n" +
                                    '                    <div class="form-group small">\n' +
                                    '                        <label for="cvc">CVC</label>\n' +
                                    '                        <input type="password" id="cvc" required>\n' +
                                    "                    </div>\n" +
                                    "                    <h3>Billing address</h3>\n" +
                                    '                    <div class="form-group">\n' +
                                    '                        <label for="biladdress">Address</label>\n' +
                                    '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                                    "                    </div>\n" +
                                    '                    <div class="form-group">\n' +
                                    '                        <label for="bilsuite">Suite</label>\n' +
                                    '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                                    "                    </div>\n" +
                                    '                    <div class="form-group">\n' +
                                    '                        <label for="bilcity">City</label>\n' +
                                    '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                                    "                    </div>\n" +
                                    '                    <div class="form-group small">\n' +
                                    '                        <label for="bilstate">State</label>\n' +
                                    '                        <select id="bilstate" class="add-info-select">\n' +
                                    '                            <option value="AL">AL</option>\n' +
                                    '                            <option value="AK">AK</option>\n' +
                                    '                            <option value="AZ">AZ</option>\n' +
                                    '                            <option value="AR">AR</option>\n' +
                                    '                            <option value="CA">CA</option>\n' +
                                    '                            <option value="CO">CO</option>\n' +
                                    '                            <option value="CT">CT</option>\n' +
                                    '                            <option value="DE">DE</option>\n' +
                                    '                            <option value="DC">DC</option>\n' +
                                    '                            <option value="FM">FM</option>\n' +
                                    '                            <option value="FL">FL</option>\n' +
                                    '                            <option value="GA">GA</option>\n' +
                                    '                            <option value="HI">HI</option>\n' +
                                    '                            <option value="ID">ID</option>\n' +
                                    '                            <option value="IL">IL</option>\n' +
                                    '                            <option value="IN">IN</option>\n' +
                                    '                            <option value="IA">IA</option>\n' +
                                    '                            <option value="KS">KS</option>\n' +
                                    '                            <option value="KY">KY</option>\n' +
                                    '                            <option value="LA">LA</option>\n' +
                                    '                            <option value="ME">ME</option>\n' +
                                    '                            <option value="MH">MH</option>\n' +
                                    '                            <option value="MD">MD</option>\n' +
                                    '                            <option value="MA">MA</option>\n' +
                                    '                            <option value="MI">MI</option>\n' +
                                    '                            <option value="MN">MN</option>\n' +
                                    '                            <option value="MS">MS</option>\n' +
                                    '                            <option value="MO">MO</option>\n' +
                                    '                            <option value="MT">MT</option>\n' +
                                    '                            <option value="NE">NE</option>\n' +
                                    '                            <option value="NV">NV</option>\n' +
                                    '                            <option value="NH">NH</option>\n' +
                                    '                            <option value="NJ">NJ</option>\n' +
                                    '                            <option value="NM">NM</option>\n' +
                                    '                            <option value="NY">NY</option>\n' +
                                    '                            <option value="NC">NC</option>\n' +
                                    '                            <option value="ND">ND</option>\n' +
                                    '                            <option value="OH">OH</option>\n' +
                                    '                            <option value="OK">OK</option>\n' +
                                    '                            <option value="OR">OR</option>\n' +
                                    '                            <option value="PW">PW</option>\n' +
                                    '                            <option value="PA">PA</option>\n' +
                                    '                            <option value="RI">RI</option>\n' +
                                    '                            <option value="SC">SC</option>\n' +
                                    '                            <option value="SD">SD</option>\n' +
                                    '                            <option value="TN">TN</option>\n' +
                                    '                            <option value="TX">TX</option>\n' +
                                    '                            <option value="UT">UT</option>\n' +
                                    '                            <option value="VT">VT</option>\n' +
                                    '                            <option value="VA">VA</option>\n' +
                                    '                            <option value="WA">WA</option>\n' +
                                    '                            <option value="WV">WV</option>\n' +
                                    '                            <option value="WI">WI</option>\n' +
                                    '                            <option value="WY">WY</option>\n' +
                                    '                            <option value="AS">AS</option>\n' +
                                    '                            <option value="GU">GU</option>\n' +
                                    '                            <option value="MP">MP</option>\n' +
                                    '                            <option value="PR">PR</option>\n' +
                                    '                            <option value="UM">UM</option>\n' +
                                    '                            <option value="VI">VI</option>\n' +
                                    '                            <option value="AA">AA</option>\n' +
                                    '                            <option value="AP">AP</option>\n' +
                                    '                            <option value="AE">AE</option>\n' +
                                    "                        </select>\n" +
                                    "                    </div>\n" +
                                    '                    <div class="form-group small">\n' +
                                    '                        <label for="bilzip">Zip</label>\n' +
                                    '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                                    "                    </div>\n" +
                                    '                    <h5 class="cost-price">Annual subscription cost: $<span>599.88</span></h5>\n' +
                                    '                    <h5 class="tax-price">Sales tax: $<span>' +
                                    Number.parseFloat(tax).toFixed(2) +
                                    "</span></h5>\n" +
                                    '                    <h5 class="total-price">Total cost: $<span>' +
                                    Number.parseFloat(total).toFixed(2) +
                                    "</span></h5>\n" +
                                    '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                                    "                </form>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "    </div>\n" +
                                    "</section>"
                                );
                                initSelect2($(".add-info-select"));
                                // paypal_sdk.Buttons({
                                //     createOrder: function (data, actions) {
                                //         return actions.order.create({
                                //             purchase_units: [{
                                //                 amount: {
                                //                     value: '49.99'
                                //                 }
                                //             }]
                                //         });
                                //     },
                                //     onApprove: function (data, actions) {
                                //         return actions.order.capture().then(function (details) {
                                //             alert('Transaction completed by ' + details.payer.name.given_name);
                                //             window.onbeforeunload = null;
                                //             window.open('profile-premium.html?id=' + attorneyId, "_self")
                                //         });
                                //     }
                                // }).render('#paypal-button-container');
                                if ($("#cardnumber").length)
                                  new Cleave("#cardnumber", {
                                    creditCard: true,
                                  });

                                if ($("#expirationdate").length)
                                  new Cleave("#expirationdate", {
                                    date: true,
                                    datePattern: ["m", "y"],
                                  });
                                $(".step9-premium").fadeIn();
                              },
                            });
                          },
                        });
                      } else {
                        smoothScroll();
                        $.ajax({
                          type: "GET",
                          url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                          success: function (res) {
                            var tax = res["taxAmount"];
                            var total = res["totalAmount"];
                            var step8 = "";
                            if ($("section").hasClass("profile")) {
                              step8 = $(".profile");
                              $(".step8-premium, .profile").fadeOut();
                            } else {
                              step8 = $(".step8-premium");
                              $(".step8-premium").fadeOut();
                            }
                            step8.after(
                              '<section class="register step9-premium" style="display:none;">\n' +
                                '    <div class="container">\n' +
                                '        <div class="register-wrapper">\n' +
                                '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                                '            <h2>Payment<span class="status premium">Premium</span></h2>\n' +
                                '            <ul class="steps">\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="active">Step 9</li>\n' +
                                "            </ul>\n" +
                                '            <div class="payment-form">\n' +
                                '                <form id="visa" class="pci active" data-plan="premium">\n' +
                                '                    <div class="form-group">\n' +
                                '                        <label for="cardholdername">Cardholder Name</label>\n' +
                                '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="cardnumber">Card Number</label>\n' +
                                '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="expirationdate">Expiration Date</label>\n' +
                                '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="cvc">CVC</label>\n' +
                                '                        <input type="password" id="cvc" required>\n' +
                                "                    </div>\n" +
                                "                    <h3>Billing address</h3>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="biladdress">Address</label>\n' +
                                '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="bilsuite">Suite</label>\n' +
                                '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="bilcity">City</label>\n' +
                                '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="bilstate">State</label>\n' +
                                '                        <select id="bilstate" class="add-info-select">\n' +
                                '                            <option value="AL">AL</option>\n' +
                                '                            <option value="AK">AK</option>\n' +
                                '                            <option value="AZ">AZ</option>\n' +
                                '                            <option value="AR">AR</option>\n' +
                                '                            <option value="CA">CA</option>\n' +
                                '                            <option value="CO">CO</option>\n' +
                                '                            <option value="CT">CT</option>\n' +
                                '                            <option value="DE">DE</option>\n' +
                                '                            <option value="DC">DC</option>\n' +
                                '                            <option value="FM">FM</option>\n' +
                                '                            <option value="FL">FL</option>\n' +
                                '                            <option value="GA">GA</option>\n' +
                                '                            <option value="HI">HI</option>\n' +
                                '                            <option value="ID">ID</option>\n' +
                                '                            <option value="IL">IL</option>\n' +
                                '                            <option value="IN">IN</option>\n' +
                                '                            <option value="IA">IA</option>\n' +
                                '                            <option value="KS">KS</option>\n' +
                                '                            <option value="KY">KY</option>\n' +
                                '                            <option value="LA">LA</option>\n' +
                                '                            <option value="ME">ME</option>\n' +
                                '                            <option value="MH">MH</option>\n' +
                                '                            <option value="MD">MD</option>\n' +
                                '                            <option value="MA">MA</option>\n' +
                                '                            <option value="MI">MI</option>\n' +
                                '                            <option value="MN">MN</option>\n' +
                                '                            <option value="MS">MS</option>\n' +
                                '                            <option value="MO">MO</option>\n' +
                                '                            <option value="MT">MT</option>\n' +
                                '                            <option value="NE">NE</option>\n' +
                                '                            <option value="NV">NV</option>\n' +
                                '                            <option value="NH">NH</option>\n' +
                                '                            <option value="NJ">NJ</option>\n' +
                                '                            <option value="NM">NM</option>\n' +
                                '                            <option value="NY">NY</option>\n' +
                                '                            <option value="NC">NC</option>\n' +
                                '                            <option value="ND">ND</option>\n' +
                                '                            <option value="OH">OH</option>\n' +
                                '                            <option value="OK">OK</option>\n' +
                                '                            <option value="OR">OR</option>\n' +
                                '                            <option value="PW">PW</option>\n' +
                                '                            <option value="PA">PA</option>\n' +
                                '                            <option value="RI">RI</option>\n' +
                                '                            <option value="SC">SC</option>\n' +
                                '                            <option value="SD">SD</option>\n' +
                                '                            <option value="TN">TN</option>\n' +
                                '                            <option value="TX">TX</option>\n' +
                                '                            <option value="UT">UT</option>\n' +
                                '                            <option value="VT">VT</option>\n' +
                                '                            <option value="VA">VA</option>\n' +
                                '                            <option value="WA">WA</option>\n' +
                                '                            <option value="WV">WV</option>\n' +
                                '                            <option value="WI">WI</option>\n' +
                                '                            <option value="WY">WY</option>\n' +
                                '                            <option value="AS">AS</option>\n' +
                                '                            <option value="GU">GU</option>\n' +
                                '                            <option value="MP">MP</option>\n' +
                                '                            <option value="PR">PR</option>\n' +
                                '                            <option value="UM">UM</option>\n' +
                                '                            <option value="VI">VI</option>\n' +
                                '                            <option value="AA">AA</option>\n' +
                                '                            <option value="AP">AP</option>\n' +
                                '                            <option value="AE">AE</option>\n' +
                                "                        </select>\n" +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="bilzip">Zip</label>\n' +
                                '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <h5 class="cost-price">Annual subscription cost: $<span>599.88</span></h5>\n' +
                                '                    <h5 class="tax-price">Sales tax: $<span>' +
                                Number.parseFloat(tax).toFixed(2) +
                                "</span></h5>\n" +
                                '                    <h5 class="total-price">Total cost: $<span>' +
                                Number.parseFloat(total).toFixed(2) +
                                "</span></h5>\n" +
                                '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                                "                </form>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "</section>"
                            );
                            initSelect2($(".add-info-select"));
                            // paypal_sdk.Buttons({
                            //     createOrder: function (data, actions) {
                            //         return actions.order.create({
                            //             purchase_units: [{
                            //                 amount: {
                            //                     value: '49.99'
                            //                 }
                            //             }]
                            //         });
                            //     },
                            //     onApprove: function (data, actions) {
                            //         return actions.order.capture().then(function (details) {
                            //             alert('Transaction completed by ' + details.payer.name.given_name);
                            //             window.onbeforeunload = null;
                            //             window.open('profile-premium.html?id=' + attorneyId, "_self")
                            //         });
                            //     }
                            // }).render('#paypal-button-container');
                            if ($("#cardnumber").length)
                              new Cleave("#cardnumber", {
                                creditCard: true,
                              });

                            if ($("#expirationdate").length)
                              new Cleave("#expirationdate", {
                                date: true,
                                datePattern: ["m", "y"],
                              });
                            $(".step9-premium").fadeIn();
                          },
                        });
                      }
                    }
                  },
                });
              },
              complete: function () {
                $("body").removeClass("loading");
              },
            });
          }, 100);
        });
    } else {
      // var formData = new FormData();
      // formData.append("ProfilePicture", "");
      // formData.append("imageData", "");
      // formData.append("attorneyId", attorneyId);
      // formData.append("about", about);
      // formData.append("headline", headline);
      // formData.append("facebookUrl", facebook);
      // formData.append("linkedInUrl", linkedin);
      // formData.append("instagramUrl", instagram);
      // formData.append("twitterUrl", twitter);
      var profileImage = $("#uploadedImage").attr("src");
      formData["pictureUrl"] = profileImage;
      formData["imageData"] = "";
      formData["attorneyId"] = attorneyId;
      formData["about"] = about;
      formData["websiteUrl"] = websiteUrl; 

      if (plan != "Pro") {
        formData["headline"] = headline;
        formData["facebookUrl"] = facebook;
        formData["linkedInUrl"] = linkedin;
        formData["instagramUrl"] = instagram;
        formData["twitterUrl"] = twitter;
      }
      setTimeout(() => {
        $.ajax({
          type: "PUT",
          // enctype: "multipart/form-data",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          processData: false,
          contentType: false,
          dataType: "json",
          url: apiDomain + "/Attorney/UpdateAttorneyProfile",
          data: JSON.stringify(formData),
          beforeSend: function () {
            $("body").addClass("loading");
          },
          success: function (res) {
            if (plan == "premium") {
              dropzone_default.removeAllFiles(true);
            }
            var attorneyId = Cookies.get("attorneyId");
            $.ajax({
              type: "PUT",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
              dataType: "json",
              url:
                apiDomain +
                "/Attorney/UpdateAttorneyAcceptingNewClients?attorneyId=" +
                attorneyId +
                "&AcceptingNewClients=" +
                accepted,
              success: function () {
                attorneyId = Cookies.get("attorneyId");
                if (plan === "pro") {
                  window.onbeforeunload = null;
                  window.open("profile-pro.html?id=" + attorneyId, "_self");
                } else if (plan === "pro-plus") {
                  smoothScroll();
                  $.ajax({
                    type: "GET",
                    url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                    success: function (res) {
                      var tax = res["taxAmount"];
                      var total = res["totalAmount"];
                      var step8 = "";
                      if ($("section").hasClass("profile")) {
                        step8 = $(".profile");
                        $(".step8, .profile").fadeOut();
                      } else {
                        step8 = $(".step8");
                        $(".step8").fadeOut();
                      }
                      step8.after(
                        '<section class="register step9" style="display:none;">\n' +
                          '    <div class="container">\n' +
                          '        <div class="register-wrapper">\n' +
                          '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                          '            <h2>Payment<span class="status pro-plus">Pro Plus</span></h2>\n' +
                          '            <ul class="steps">\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="completed"></li>\n' +
                          '                <li class="active">Step 9</li>\n' +
                          "            </ul>\n" +
                          '            <div class="payment-form">\n' +
                          '                <form id="visa" class="pci active" data-plan="pro-plus">\n' +
                          '                    <div class="form-group">\n' +
                          '                        <label for="cardholdername">Cardholder Name</label>\n' +
                          '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                          "                    </div>\n" +
                          '                    <div class="form-group">\n' +
                          '                        <label for="cardnumber">Card Number</label>\n' +
                          '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                          "                    </div>\n" +
                          '                    <div class="form-group small">\n' +
                          '                        <label for="expirationdate">Expiration Date</label>\n' +
                          '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                          "                    </div>\n" +
                          '                    <div class="form-group small">\n' +
                          '                        <label for="CVC">CVC</label>\n' +
                          '                        <input type="password" id="cvc" required>\n' +
                          "                    </div>\n" +
                          "                    <h3>Billing address</h3>\n" +
                          '                    <div class="form-group">\n' +
                          '                        <label for="biladdress">Address</label>\n' +
                          '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                          "                    </div>\n" +
                          '                    <div class="form-group">\n' +
                          '                        <label for="bilsuite">Suite</label>\n' +
                          '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                          "                    </div>\n" +
                          '                    <div class="form-group">\n' +
                          '                        <label for="bilcity">City</label>\n' +
                          '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                          "                    </div>\n" +
                          '                    <div class="form-group small">\n' +
                          '                        <label for="bilstate">State</label>\n' +
                          '                        <select id="bilstate" class="add-info-select">\n' +
                          '                            <option value="AL">AL</option>\n' +
                          '                            <option value="AK">AK</option>\n' +
                          '                            <option value="AZ">AZ</option>\n' +
                          '                            <option value="AR">AR</option>\n' +
                          '                            <option value="CA">CA</option>\n' +
                          '                            <option value="CO">CO</option>\n' +
                          '                            <option value="CT">CT</option>\n' +
                          '                            <option value="DE">DE</option>\n' +
                          '                            <option value="DC">DC</option>\n' +
                          '                            <option value="FM">FM</option>\n' +
                          '                            <option value="FL">FL</option>\n' +
                          '                            <option value="GA">GA</option>\n' +
                          '                            <option value="HI">HI</option>\n' +
                          '                            <option value="ID">ID</option>\n' +
                          '                            <option value="IL">IL</option>\n' +
                          '                            <option value="IN">IN</option>\n' +
                          '                            <option value="IA">IA</option>\n' +
                          '                            <option value="KS">KS</option>\n' +
                          '                            <option value="KY">KY</option>\n' +
                          '                            <option value="LA">LA</option>\n' +
                          '                            <option value="ME">ME</option>\n' +
                          '                            <option value="MH">MH</option>\n' +
                          '                            <option value="MD">MD</option>\n' +
                          '                            <option value="MA">MA</option>\n' +
                          '                            <option value="MI">MI</option>\n' +
                          '                            <option value="MN">MN</option>\n' +
                          '                            <option value="MS">MS</option>\n' +
                          '                            <option value="MO">MO</option>\n' +
                          '                            <option value="MT">MT</option>\n' +
                          '                            <option value="NE">NE</option>\n' +
                          '                            <option value="NV">NV</option>\n' +
                          '                            <option value="NH">NH</option>\n' +
                          '                            <option value="NJ">NJ</option>\n' +
                          '                            <option value="NM">NM</option>\n' +
                          '                            <option value="NY">NY</option>\n' +
                          '                            <option value="NC">NC</option>\n' +
                          '                            <option value="ND">ND</option>\n' +
                          '                            <option value="OH">OH</option>\n' +
                          '                            <option value="OK">OK</option>\n' +
                          '                            <option value="OR">OR</option>\n' +
                          '                            <option value="PW">PW</option>\n' +
                          '                            <option value="PA">PA</option>\n' +
                          '                            <option value="RI">RI</option>\n' +
                          '                            <option value="SC">SC</option>\n' +
                          '                            <option value="SD">SD</option>\n' +
                          '                            <option value="TN">TN</option>\n' +
                          '                            <option value="TX">TX</option>\n' +
                          '                            <option value="UT">UT</option>\n' +
                          '                            <option value="VT">VT</option>\n' +
                          '                            <option value="VA">VA</option>\n' +
                          '                            <option value="WA">WA</option>\n' +
                          '                            <option value="WV">WV</option>\n' +
                          '                            <option value="WI">WI</option>\n' +
                          '                            <option value="WY">WY</option>\n' +
                          '                            <option value="AS">AS</option>\n' +
                          '                            <option value="GU">GU</option>\n' +
                          '                            <option value="MP">MP</option>\n' +
                          '                            <option value="PR">PR</option>\n' +
                          '                            <option value="UM">UM</option>\n' +
                          '                            <option value="VI">VI</option>\n' +
                          '                            <option value="AA">AA</option>\n' +
                          '                            <option value="AP">AP</option>\n' +
                          '                            <option value="AE">AE</option>\n' +
                          "                        </select>\n" +
                          "                    </div>\n" +
                          '                    <div class="form-group small">\n' +
                          '                        <label for="bilzip">Zip</label>\n' +
                          '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                          "                    </div>\n" +
                          '                    <h5 class="cost-price">Annual subscription cost: $<span>299.88</span></h5>\n' +
                          '                    <h5 class="tax-price">Sales tax: $<span>' +
                          Number.parseFloat(tax).toFixed(2) +
                          "</span></h5>\n" +
                          '                    <h5 class="total-price">Total cost: $<span>' +
                          Number.parseFloat(total).toFixed(2) +
                          "</span></h5>\n" +
                          '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                          "                </form>\n" +
                          "            </div>\n" +
                          "        </div>\n" +
                          "    </div>\n" +
                          "</section>"
                      );
                      initSelect2($(".add-info-select"));
                      // paypal_sdk.Buttons({
                      //     createOrder: function (data, actions) {
                      //         return actions.order.create({
                      //             purchase_units: [{
                      //                 amount: {
                      //                     value: '24.99'
                      //                 }
                      //             }]
                      //         });
                      //     },
                      //     onApprove: function (data, actions) {
                      //         return actions.order.capture().then(function (details) {
                      //             alert('Transaction completed by ' + details.payer.name.given_name);
                      //             window.onbeforeunload = null;
                      //             window.open('profile.html?id=' + attorneyId, "_self")
                      //         });
                      //     }
                      // }).render('#paypal-button-container');
                      if ($("#cardnumber").length)
                        new Cleave("#cardnumber", {
                          creditCard: true,
                        });

                      if ($("#expirationdate").length)
                        new Cleave("#expirationdate", {
                          date: true,
                          datePattern: ["m", "y"],
                        });
                      $(".step9").fadeIn();
                    },
                  });
                } else if (plan === "premium") {
                  var attorneyId = Cookies.get("attorneyId");
                  if (keywords.length > 0) {
                    $.ajax({
                      type: "PUT",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                      },
                      url: apiDomain + "/Attorney/UpdateAttorneyKeywords",
                      data: JSON.stringify({
                        attorneyId: attorneyId,
                        keywords: keywords,
                      }),
                      success: function () {
                        smoothScroll();
                        $.ajax({
                          type: "GET",
                          url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                          success: function (res) {
                            var tax = res["taxAmount"];
                            var total = res["totalAmount"];
                            var step8 = "";
                            if ($("section").hasClass("profile")) {
                              step8 = $(".profile");
                              $(".step8-premium, .profile").fadeOut();
                            } else {
                              step8 = $(".step8-premium");
                              $(".step8-premium").fadeOut();
                            }
                            step8.after(
                              '<section class="register step9-premium" style="display:none;">\n' +
                                '    <div class="container">\n' +
                                '        <div class="register-wrapper">\n' +
                                '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                                '            <h2>Payment<span class="status premium">Premium</span></h2>\n' +
                                '            <ul class="steps">\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="completed"></li>\n' +
                                '                <li class="active">Step 9</li>\n' +
                                "            </ul>\n" +
                                '            <div class="payment-form">\n' +
                                '                <form id="visa" class="pci active" data-plan="premium">\n' +
                                '                    <div class="form-group">\n' +
                                '                        <label for="cardholdername">Cardholder Name</label>\n' +
                                '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="cardnumber">Card Number</label>\n' +
                                '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="expirationdate">Expiration Date</label>\n' +
                                '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="cvc">CVC</label>\n' +
                                '                        <input type="password" id="cvc" required>\n' +
                                "                    </div>\n" +
                                "                    <h3>Billing address</h3>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="biladdress">Address</label>\n' +
                                '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="bilsuite">Suite</label>\n' +
                                '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group">\n' +
                                '                        <label for="bilcity">City</label>\n' +
                                '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="bilstate">State</label>\n' +
                                '                        <select id="bilstate" class="add-info-select">\n' +
                                '                            <option value="AL">AL</option>\n' +
                                '                            <option value="AK">AK</option>\n' +
                                '                            <option value="AZ">AZ</option>\n' +
                                '                            <option value="AR">AR</option>\n' +
                                '                            <option value="CA">CA</option>\n' +
                                '                            <option value="CO">CO</option>\n' +
                                '                            <option value="CT">CT</option>\n' +
                                '                            <option value="DE">DE</option>\n' +
                                '                            <option value="DC">DC</option>\n' +
                                '                            <option value="FM">FM</option>\n' +
                                '                            <option value="FL">FL</option>\n' +
                                '                            <option value="GA">GA</option>\n' +
                                '                            <option value="HI">HI</option>\n' +
                                '                            <option value="ID">ID</option>\n' +
                                '                            <option value="IL">IL</option>\n' +
                                '                            <option value="IN">IN</option>\n' +
                                '                            <option value="IA">IA</option>\n' +
                                '                            <option value="KS">KS</option>\n' +
                                '                            <option value="KY">KY</option>\n' +
                                '                            <option value="LA">LA</option>\n' +
                                '                            <option value="ME">ME</option>\n' +
                                '                            <option value="MH">MH</option>\n' +
                                '                            <option value="MD">MD</option>\n' +
                                '                            <option value="MA">MA</option>\n' +
                                '                            <option value="MI">MI</option>\n' +
                                '                            <option value="MN">MN</option>\n' +
                                '                            <option value="MS">MS</option>\n' +
                                '                            <option value="MO">MO</option>\n' +
                                '                            <option value="MT">MT</option>\n' +
                                '                            <option value="NE">NE</option>\n' +
                                '                            <option value="NV">NV</option>\n' +
                                '                            <option value="NH">NH</option>\n' +
                                '                            <option value="NJ">NJ</option>\n' +
                                '                            <option value="NM">NM</option>\n' +
                                '                            <option value="NY">NY</option>\n' +
                                '                            <option value="NC">NC</option>\n' +
                                '                            <option value="ND">ND</option>\n' +
                                '                            <option value="OH">OH</option>\n' +
                                '                            <option value="OK">OK</option>\n' +
                                '                            <option value="OR">OR</option>\n' +
                                '                            <option value="PW">PW</option>\n' +
                                '                            <option value="PA">PA</option>\n' +
                                '                            <option value="RI">RI</option>\n' +
                                '                            <option value="SC">SC</option>\n' +
                                '                            <option value="SD">SD</option>\n' +
                                '                            <option value="TN">TN</option>\n' +
                                '                            <option value="TX">TX</option>\n' +
                                '                            <option value="UT">UT</option>\n' +
                                '                            <option value="VT">VT</option>\n' +
                                '                            <option value="VA">VA</option>\n' +
                                '                            <option value="WA">WA</option>\n' +
                                '                            <option value="WV">WV</option>\n' +
                                '                            <option value="WI">WI</option>\n' +
                                '                            <option value="WY">WY</option>\n' +
                                '                            <option value="AS">AS</option>\n' +
                                '                            <option value="GU">GU</option>\n' +
                                '                            <option value="MP">MP</option>\n' +
                                '                            <option value="PR">PR</option>\n' +
                                '                            <option value="UM">UM</option>\n' +
                                '                            <option value="VI">VI</option>\n' +
                                '                            <option value="AA">AA</option>\n' +
                                '                            <option value="AP">AP</option>\n' +
                                '                            <option value="AE">AE</option>\n' +
                                "                        </select>\n" +
                                "                    </div>\n" +
                                '                    <div class="form-group small">\n' +
                                '                        <label for="bilzip">Zip</label>\n' +
                                '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                                "                    </div>\n" +
                                '                    <h5 class="cost-price">Annual subscription cost: $<span>599.88</span></h5>\n' +
                                '                    <h5 class="tax-price">Sales tax: $<span>' +
                                Number.parseFloat(tax).toFixed(2) +
                                "</span></h5>\n" +
                                '                    <h5 class="total-price">Total cost: $<span>' +
                                Number.parseFloat(total).toFixed(2) +
                                "</span></h5>\n" +
                                '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                                "                </form>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "</section>"
                            );
                            initSelect2($(".add-info-select"));
                            // paypal_sdk.Buttons({
                            //     createOrder: function (data, actions) {
                            //         return actions.order.create({
                            //             purchase_units: [{
                            //                 amount: {
                            //                     value: '49.99'
                            //                 }
                            //             }]
                            //         });
                            //     },
                            //     onApprove: function (data, actions) {
                            //         return actions.order.capture().then(function (details) {
                            //             alert('Transaction completed by ' + details.payer.name.given_name);
                            //             window.onbeforeunload = null;
                            //             window.open('profile-premium.html?id=' + attorneyId, "_self")
                            //         });
                            //     }
                            // }).render('#paypal-button-container');
                            if ($("#cardnumber").length)
                              new Cleave("#cardnumber", {
                                creditCard: true,
                              });

                            if ($("#expirationdate").length)
                              new Cleave("#expirationdate", {
                                date: true,
                                datePattern: ["m", "y"],
                              });
                            $(".step9-premium").fadeIn();
                          },
                        });
                      },
                    });
                  } else {
                    smoothScroll();
                    $.ajax({
                      type: "GET",
                      url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                      success: function (res) {
                        var tax = res["taxAmount"];
                        var total = res["totalAmount"];
                        var step8 = "";
                        if ($("section").hasClass("profile")) {
                          step8 = $(".profile");
                          $(".step8-premium, .profile").fadeOut();
                        } else {
                          step8 = $(".step8-premium");
                          $(".step8-premium").fadeOut();
                        }
                        step8.after(
                          '<section class="register step9-premium" style="display:none;">\n' +
                            '    <div class="container">\n' +
                            '        <div class="register-wrapper">\n' +
                            '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                            '            <h2>Payment<span class="status premium">Premium</span></h2>\n' +
                            '            <ul class="steps">\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="completed"></li>\n' +
                            '                <li class="active">Step 9</li>\n' +
                            "            </ul>\n" +
                            '            <div class="payment-form">\n' +
                            '                <form id="visa" class="pci active" data-plan="premium">\n' +
                            '                    <div class="form-group">\n' +
                            '                        <label for="cardholdername">Cardholder Name</label>\n' +
                            '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                            "                    </div>\n" +
                            '                    <div class="form-group">\n' +
                            '                        <label for="cardnumber">Card Number</label>\n' +
                            '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                            "                    </div>\n" +
                            '                    <div class="form-group small">\n' +
                            '                        <label for="expirationdate">Expiration Date</label>\n' +
                            '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                            "                    </div>\n" +
                            '                    <div class="form-group small">\n' +
                            '                        <label for="cvc">CVC</label>\n' +
                            '                        <input type="password" id="cvc" required>\n' +
                            "                    </div>\n" +
                            "                    <h3>Billing address</h3>\n" +
                            '                    <div class="form-group">\n' +
                            '                        <label for="biladdress">Address</label>\n' +
                            '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                            "                    </div>\n" +
                            '                    <div class="form-group">\n' +
                            '                        <label for="bilsuite">Suite</label>\n' +
                            '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                            "                    </div>\n" +
                            '                    <div class="form-group">\n' +
                            '                        <label for="bilcity">City</label>\n' +
                            '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                            "                    </div>\n" +
                            '                    <div class="form-group small">\n' +
                            '                        <label for="bilstate">State</label>\n' +
                            '                        <select id="bilstate" class="add-info-select">\n' +
                            '                            <option value="AL">AL</option>\n' +
                            '                            <option value="AK">AK</option>\n' +
                            '                            <option value="AZ">AZ</option>\n' +
                            '                            <option value="AR">AR</option>\n' +
                            '                            <option value="CA">CA</option>\n' +
                            '                            <option value="CO">CO</option>\n' +
                            '                            <option value="CT">CT</option>\n' +
                            '                            <option value="DE">DE</option>\n' +
                            '                            <option value="DC">DC</option>\n' +
                            '                            <option value="FM">FM</option>\n' +
                            '                            <option value="FL">FL</option>\n' +
                            '                            <option value="GA">GA</option>\n' +
                            '                            <option value="HI">HI</option>\n' +
                            '                            <option value="ID">ID</option>\n' +
                            '                            <option value="IL">IL</option>\n' +
                            '                            <option value="IN">IN</option>\n' +
                            '                            <option value="IA">IA</option>\n' +
                            '                            <option value="KS">KS</option>\n' +
                            '                            <option value="KY">KY</option>\n' +
                            '                            <option value="LA">LA</option>\n' +
                            '                            <option value="ME">ME</option>\n' +
                            '                            <option value="MH">MH</option>\n' +
                            '                            <option value="MD">MD</option>\n' +
                            '                            <option value="MA">MA</option>\n' +
                            '                            <option value="MI">MI</option>\n' +
                            '                            <option value="MN">MN</option>\n' +
                            '                            <option value="MS">MS</option>\n' +
                            '                            <option value="MO">MO</option>\n' +
                            '                            <option value="MT">MT</option>\n' +
                            '                            <option value="NE">NE</option>\n' +
                            '                            <option value="NV">NV</option>\n' +
                            '                            <option value="NH">NH</option>\n' +
                            '                            <option value="NJ">NJ</option>\n' +
                            '                            <option value="NM">NM</option>\n' +
                            '                            <option value="NY">NY</option>\n' +
                            '                            <option value="NC">NC</option>\n' +
                            '                            <option value="ND">ND</option>\n' +
                            '                            <option value="OH">OH</option>\n' +
                            '                            <option value="OK">OK</option>\n' +
                            '                            <option value="OR">OR</option>\n' +
                            '                            <option value="PW">PW</option>\n' +
                            '                            <option value="PA">PA</option>\n' +
                            '                            <option value="RI">RI</option>\n' +
                            '                            <option value="SC">SC</option>\n' +
                            '                            <option value="SD">SD</option>\n' +
                            '                            <option value="TN">TN</option>\n' +
                            '                            <option value="TX">TX</option>\n' +
                            '                            <option value="UT">UT</option>\n' +
                            '                            <option value="VT">VT</option>\n' +
                            '                            <option value="VA">VA</option>\n' +
                            '                            <option value="WA">WA</option>\n' +
                            '                            <option value="WV">WV</option>\n' +
                            '                            <option value="WI">WI</option>\n' +
                            '                            <option value="WY">WY</option>\n' +
                            '                            <option value="AS">AS</option>\n' +
                            '                            <option value="GU">GU</option>\n' +
                            '                            <option value="MP">MP</option>\n' +
                            '                            <option value="PR">PR</option>\n' +
                            '                            <option value="UM">UM</option>\n' +
                            '                            <option value="VI">VI</option>\n' +
                            '                            <option value="AA">AA</option>\n' +
                            '                            <option value="AP">AP</option>\n' +
                            '                            <option value="AE">AE</option>\n' +
                            "                        </select>\n" +
                            "                    </div>\n" +
                            '                    <div class="form-group small">\n' +
                            '                        <label for="bilzip">Zip</label>\n' +
                            '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                            "                    </div>\n" +
                            '                    <h5 class="cost-price">Annual subscription cost: $<span>599.88</span></h5>\n' +
                            '                    <h5 class="tax-price">Sales tax: $<span>' +
                            Number.parseFloat(tax).toFixed(2) +
                            "</span></h5>\n" +
                            '                    <h5 class="total-price">Total cost: $<span>' +
                            Number.parseFloat(total).toFixed(2) +
                            "</span></h5>\n" +
                            '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                            "                </form>\n" +
                            "            </div>\n" +
                            "        </div>\n" +
                            "    </div>\n" +
                            "</section>"
                        );
                        initSelect2($(".add-info-select"));
                        // paypal_sdk.Buttons({
                        //     createOrder: function (data, actions) {
                        //         return actions.order.create({
                        //             purchase_units: [{
                        //                 amount: {
                        //                     value: '49.99'
                        //                 }
                        //             }]
                        //         });
                        //     },
                        //     onApprove: function (data, actions) {
                        //         return actions.order.capture().then(function (details) {
                        //             alert('Transaction completed by ' + details.payer.name.given_name);
                        //             window.onbeforeunload = null;
                        //             window.open('profile-premium.html?id=' + attorneyId, "_self")
                        //         });
                        //     }
                        // }).render('#paypal-button-container');
                        if ($("#cardnumber").length)
                          new Cleave("#cardnumber", {
                            creditCard: true,
                          });

                        if ($("#expirationdate").length)
                          new Cleave("#expirationdate", {
                            date: true,
                            datePattern: ["m", "y"],
                          });
                        $(".step9-premium").fadeIn();
                      },
                    });
                  }
                }
              },
            });
          },
          complete: function () {
            $("body").removeClass("loading");
          },
        });
      }, 100);
    }
  });

  /*
   *
   *   STEP 8  (Payment) from preview
   *
   */
  $(document).on("submit", ".profile .profile-buttons.from-step8", function (e) {
    e.preventDefault();
    var formData = new Object();
    var plan = $(this).find(".btn-primary").attr("data-plan");
    var attorneyId = Cookies.get("attorneyId");
    var token = Cookies.get("token");
    var about = $("#about").val();
    var websiteUrl = "";
    if ($("#website-link").val().length != 0) {
      websiteUrl = 'https://' + $("#website-link").val();
    }
    var headline = "";
    if ($("#headline").length) {
      headline = $("#headline").val();
    }

    var pictureUrl = "";
    var profilePicture = "";

    var facebook = "";
    if ($("#facebook").length && $("#facebook").val().length) {
      facebook = 'https://facebook.com/' + $("#facebook").val();
    }
    var linkedin = "";
    if ($("#linkedIn").length && $("#linkedIn").val().length) {
      linkedin = 'https://linkedin.com/in/' + $("#linkedIn").val();
    }
    var instagram = "";
    if ($("#instagram").length && $("#instagram").val().length) {
      instagram = 'https://instagram.com/' + $("#instagram").val();
    }
    var twitter = "";
    if ($("#twitter").length && $("#twitter").val().length) {
      twitter = 'https://twitter.com/' + $("#twitter").val();
    }
    var keywords = "";
    if ($(".keywords-selected").length) {
      keywords = $(".keywords-selected").val();
    } else {
      keywords = "";
    }

    var acceptClients = localStorage.getItem("acceptClients");
    formData["acceptingNewClients"] = acceptClients;
    var resp = "";
    if ($(".circle-image").attr("src") !== "images/user.png") {
      resp = $(".circle-image").attr("src");
      formData["pictureUrl"] = "";
      formData["imageData"] = resp;
    } else {
      resp = "";
      formData["pictureUrl"] = $(".circle-image").attr("src");
      formData["imageData"] = "";
    }
    // var formData = new FormData();
    // formData.append("ProfilePicture", resp);
    // formData.append("imageData", resp);
    // formData.append("attorneyId", attorneyId);
    // formData.append("about", about);
    // formData.append("headline", headline);
    // formData.append("facebookUrl", facebook);
    // formData.append("linkedInUrl", linkedin);
    // formData.append("instagramUrl", instagram);
    // formData.append("twitterUrl", twitter);
    formData["attorneyId"] = attorneyId;
    formData["about"] = about;
    formData["websiteUrl"] = websiteUrl;
    if (plan != "Pro") {
      formData["headline"] = headline;
      formData["facebookUrl"] = facebook;
      formData["linkedInUrl"] = linkedin;
      formData["instagramUrl"] = instagram;
      formData["twitterUrl"] = twitter;
    }

    let albumItems = JSON.parse(localStorage.getItem("albumItems"));
    if (plan == "premium") {
      formData['albumItems'] = albumItems;
    }
    var planId = Cookies.get("planId");
    var state = Cookies.get("state");

    $.ajax({
      type: "PUT",
      // enctype: "multipart/form-data",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      processData: false,
      contentType: false,
      dataType: "json",
      url: apiDomain + "/Attorney/UpdateAttorneyProfile",
      data: JSON.stringify(formData),
      beforeSend: function () {
        $("body").addClass("loading");
      },
      success: function (res) {
        if(plan == "premium") dropzone_default.removeAllFiles(true);
        attorneyId = Cookies.get("attorneyId");
        if (plan === "pro") {
          window.onbeforeunload = null;
          window.open("profile-pro.html?id=" + attorneyId, "_self");
        } else if (plan === "pro-plus") {
          smoothScroll();
          $.ajax({
            type: "GET",
            url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
            success: function (res) {
              var tax = res["taxAmount"];
              var total = res["totalAmount"];
              var step8 = "";
              if ($("section").hasClass("profile")) {
                step8 = $(".profile");
                $(".step8, .profile").fadeOut();
              } else {
                step8 = $(".step8");
                $(".step8").fadeOut();
              }
              step8.after(
                '<section class="register step9" style="display:none;">\n' +
                  '    <div class="container">\n' +
                  '        <div class="register-wrapper">\n' +
                  '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                  '            <h2>Payment<span class="status pro-plus">Pro Plus</span></h2>\n' +
                  '            <ul class="steps">\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="completed"></li>\n' +
                  '                <li class="active">Step 9</li>\n' +
                  "            </ul>\n" +
                  '            <div class="payment-form">\n' +
                  '                <form id="visa" class="pci active" data-plan="pro-plus">\n' +
                  '                    <div class="form-group">\n' +
                  '                        <label for="cardholdername">Cardholder Name</label>\n' +
                  '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                  "                    </div>\n" +
                  '                    <div class="form-group">\n' +
                  '                        <label for="cardnumber">Card Number</label>\n' +
                  '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                  "                    </div>\n" +
                  '                    <div class="form-group small">\n' +
                  '                        <label for="expirationdate">Expiration Date</label>\n' +
                  '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                  "                    </div>\n" +
                  '                    <div class="form-group small">\n' +
                  '                        <label for="CVC">CVC</label>\n' +
                  '                        <input type="password" id="cvc" required>\n' +
                  "                    </div>\n" +
                  "                    <h3>Billing address</h3>\n" +
                  '                    <div class="form-group">\n' +
                  '                        <label for="biladdress">Address</label>\n' +
                  '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                  "                    </div>\n" +
                  '                    <div class="form-group">\n' +
                  '                        <label for="bilsuite">Suite</label>\n' +
                  '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                  "                    </div>\n" +
                  '                    <div class="form-group">\n' +
                  '                        <label for="bilcity">City</label>\n' +
                  '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                  "                    </div>\n" +
                  '                    <div class="form-group small">\n' +
                  '                        <label for="bilstate">State</label>\n' +
                  '                        <select id="bilstate" class="add-info-select">\n' +
                  '                            <option value="AL">AL</option>\n' +
                  '                            <option value="AK">AK</option>\n' +
                  '                            <option value="AZ">AZ</option>\n' +
                  '                            <option value="AR">AR</option>\n' +
                  '                            <option value="CA">CA</option>\n' +
                  '                            <option value="CO">CO</option>\n' +
                  '                            <option value="CT">CT</option>\n' +
                  '                            <option value="DE">DE</option>\n' +
                  '                            <option value="DC">DC</option>\n' +
                  '                            <option value="FM">FM</option>\n' +
                  '                            <option value="FL">FL</option>\n' +
                  '                            <option value="GA">GA</option>\n' +
                  '                            <option value="HI">HI</option>\n' +
                  '                            <option value="ID">ID</option>\n' +
                  '                            <option value="IL">IL</option>\n' +
                  '                            <option value="IN">IN</option>\n' +
                  '                            <option value="IA">IA</option>\n' +
                  '                            <option value="KS">KS</option>\n' +
                  '                            <option value="KY">KY</option>\n' +
                  '                            <option value="LA">LA</option>\n' +
                  '                            <option value="ME">ME</option>\n' +
                  '                            <option value="MH">MH</option>\n' +
                  '                            <option value="MD">MD</option>\n' +
                  '                            <option value="MA">MA</option>\n' +
                  '                            <option value="MI">MI</option>\n' +
                  '                            <option value="MN">MN</option>\n' +
                  '                            <option value="MS">MS</option>\n' +
                  '                            <option value="MO">MO</option>\n' +
                  '                            <option value="MT">MT</option>\n' +
                  '                            <option value="NE">NE</option>\n' +
                  '                            <option value="NV">NV</option>\n' +
                  '                            <option value="NH">NH</option>\n' +
                  '                            <option value="NJ">NJ</option>\n' +
                  '                            <option value="NM">NM</option>\n' +
                  '                            <option value="NY">NY</option>\n' +
                  '                            <option value="NC">NC</option>\n' +
                  '                            <option value="ND">ND</option>\n' +
                  '                            <option value="OH">OH</option>\n' +
                  '                            <option value="OK">OK</option>\n' +
                  '                            <option value="OR">OR</option>\n' +
                  '                            <option value="PW">PW</option>\n' +
                  '                            <option value="PA">PA</option>\n' +
                  '                            <option value="RI">RI</option>\n' +
                  '                            <option value="SC">SC</option>\n' +
                  '                            <option value="SD">SD</option>\n' +
                  '                            <option value="TN">TN</option>\n' +
                  '                            <option value="TX">TX</option>\n' +
                  '                            <option value="UT">UT</option>\n' +
                  '                            <option value="VT">VT</option>\n' +
                  '                            <option value="VA">VA</option>\n' +
                  '                            <option value="WA">WA</option>\n' +
                  '                            <option value="WV">WV</option>\n' +
                  '                            <option value="WI">WI</option>\n' +
                  '                            <option value="WY">WY</option>\n' +
                  '                            <option value="AS">AS</option>\n' +
                  '                            <option value="GU">GU</option>\n' +
                  '                            <option value="MP">MP</option>\n' +
                  '                            <option value="PR">PR</option>\n' +
                  '                            <option value="UM">UM</option>\n' +
                  '                            <option value="VI">VI</option>\n' +
                  '                            <option value="AA">AA</option>\n' +
                  '                            <option value="AP">AP</option>\n' +
                  '                            <option value="AE">AE</option>\n' +
                  "                        </select>\n" +
                  "                    </div>\n" +
                  '                    <div class="form-group small">\n' +
                  '                        <label for="bilzip">Zip</label>\n' +
                  '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                  "                    </div>\n" +
                  '                    <h5 class="cost-price">Annual subscription cost: $<span>299.88</span></h5>\n' +
                  '                    <h5 class="tax-price">Sales tax: $<span>' +
                  Number.parseFloat(tax).toFixed(2) +
                  "</span></h5>\n" +
                  '                    <h5 class="total-price">Total cost: $<span>' +
                  Number.parseFloat(total).toFixed(2) +
                  "</span></h5>\n" +
                  '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                  "                </form>\n" +
                  "            </div>\n" +
                  "        </div>\n" +
                  "    </div>\n" +
                  "</section>"
              );
              initSelect2($(".add-info-select"));
              // paypal_sdk.Buttons({
              //     createOrder: function (data, actions) {
              //         return actions.order.create({
              //             purchase_units: [{
              //                 amount: {
              //                     value: '24.99'
              //                 }
              //             }]
              //         });
              //     },
              //     onApprove: function (data, actions) {
              //         return actions.order.capture().then(function (details) {
              //             alert('Transaction completed by ' + details.payer.name.given_name);
              //             window.onbeforeunload = null;
              //             window.open('profile.html?id=' + attorneyId, "_self")
              //         });
              //     }
              // }).render('#paypal-button-container');
              if ($("#cardnumber").length)
                new Cleave("#cardnumber", {
                  creditCard: true,
                });

              if ($("#expirationdate").length)
                new Cleave("#expirationdate", {
                  date: true,
                  datePattern: ["m", "y"],
                });
              $(".step9").fadeIn();
            },
          });
        } else if (plan === "premium") {
          if (keywords.length > 0) {
            $.ajax({
              type: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              url: apiDomain + "/Attorney/UpdateAttorneyKeywords",
              data: JSON.stringify({
                attorneyId: attorneyId,
                keywords: keywords,
              }),
              success: function () {
                smoothScroll();
                $.ajax({
                  type: "GET",
                  url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
                  success: function (res) {
                    var tax = res["taxAmount"];
                    var total = res["totalAmount"];
                    var step8 = "";
                    if ($("section").hasClass("profile")) {
                      step8 = $(".profile");
                      $(".step8-premium, .profile").fadeOut();
                    } else {
                      step8 = $(".step8-premium");
                      $(".step8-premium").fadeOut();
                    }
                    step8.after(
                      '<section class="register step9-premium" style="display:none;">\n' +
                        '    <div class="container">\n' +
                        '        <div class="register-wrapper">\n' +
                        '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                        '            <h2>Payment<span class="status premium">Premium</span></h2>\n' +
                        '            <ul class="steps">\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="completed"></li>\n' +
                        '                <li class="active">Step 9</li>\n' +
                        "            </ul>\n" +
                        '            <div class="payment-form">\n' +
                        '                <form id="visa" class="pci active" data-plan="premium">\n' +
                        '                    <div class="form-group">\n' +
                        '                        <label for="cardholdername">Cardholder Name</label>\n' +
                        '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                        "                    </div>\n" +
                        '                    <div class="form-group">\n' +
                        '                        <label for="cardnumber">Card Number</label>\n' +
                        '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                        "                    </div>\n" +
                        '                    <div class="form-group small">\n' +
                        '                        <label for="expirationdate">Expiration Date</label>\n' +
                        '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                        "                    </div>\n" +
                        '                    <div class="form-group small">\n' +
                        '                        <label for="cvc">CVC</label>\n' +
                        '                        <input type="password" id="cvc" maxlength="3" required>\n' +
                        "                    </div>\n" +
                        "                    <h3>Billing address</h3>\n" +
                        '                    <div class="form-group">\n' +
                        '                        <label for="biladdress">Address</label>\n' +
                        '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                        "                    </div>\n" +
                        '                    <div class="form-group">\n' +
                        '                        <label for="bilsuite">Suite</label>\n' +
                        '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                        "                    </div>\n" +
                        '                    <div class="form-group">\n' +
                        '                        <label for="bilcity">City</label>\n' +
                        '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                        "                    </div>\n" +
                        '                    <div class="form-group small">\n' +
                        '                        <label for="bilstate">State</label>\n' +
                        '                        <select id="bilstate" class="add-info-select">\n' +
                        '                            <option value="AL">AL</option>\n' +
                        '                            <option value="AK">AK</option>\n' +
                        '                            <option value="AZ">AZ</option>\n' +
                        '                            <option value="AR">AR</option>\n' +
                        '                            <option value="CA">CA</option>\n' +
                        '                            <option value="CO">CO</option>\n' +
                        '                            <option value="CT">CT</option>\n' +
                        '                            <option value="DE">DE</option>\n' +
                        '                            <option value="DC">DC</option>\n' +
                        '                            <option value="FM">FM</option>\n' +
                        '                            <option value="FL">FL</option>\n' +
                        '                            <option value="GA">GA</option>\n' +
                        '                            <option value="HI">HI</option>\n' +
                        '                            <option value="ID">ID</option>\n' +
                        '                            <option value="IL">IL</option>\n' +
                        '                            <option value="IN">IN</option>\n' +
                        '                            <option value="IA">IA</option>\n' +
                        '                            <option value="KS">KS</option>\n' +
                        '                            <option value="KY">KY</option>\n' +
                        '                            <option value="LA">LA</option>\n' +
                        '                            <option value="ME">ME</option>\n' +
                        '                            <option value="MH">MH</option>\n' +
                        '                            <option value="MD">MD</option>\n' +
                        '                            <option value="MA">MA</option>\n' +
                        '                            <option value="MI">MI</option>\n' +
                        '                            <option value="MN">MN</option>\n' +
                        '                            <option value="MS">MS</option>\n' +
                        '                            <option value="MO">MO</option>\n' +
                        '                            <option value="MT">MT</option>\n' +
                        '                            <option value="NE">NE</option>\n' +
                        '                            <option value="NV">NV</option>\n' +
                        '                            <option value="NH">NH</option>\n' +
                        '                            <option value="NJ">NJ</option>\n' +
                        '                            <option value="NM">NM</option>\n' +
                        '                            <option value="NY">NY</option>\n' +
                        '                            <option value="NC">NC</option>\n' +
                        '                            <option value="ND">ND</option>\n' +
                        '                            <option value="OH">OH</option>\n' +
                        '                            <option value="OK">OK</option>\n' +
                        '                            <option value="OR">OR</option>\n' +
                        '                            <option value="PW">PW</option>\n' +
                        '                            <option value="PA">PA</option>\n' +
                        '                            <option value="RI">RI</option>\n' +
                        '                            <option value="SC">SC</option>\n' +
                        '                            <option value="SD">SD</option>\n' +
                        '                            <option value="TN">TN</option>\n' +
                        '                            <option value="TX">TX</option>\n' +
                        '                            <option value="UT">UT</option>\n' +
                        '                            <option value="VT">VT</option>\n' +
                        '                            <option value="VA">VA</option>\n' +
                        '                            <option value="WA">WA</option>\n' +
                        '                            <option value="WV">WV</option>\n' +
                        '                            <option value="WI">WI</option>\n' +
                        '                            <option value="WY">WY</option>\n' +
                        '                            <option value="AS">AS</option>\n' +
                        '                            <option value="GU">GU</option>\n' +
                        '                            <option value="MP">MP</option>\n' +
                        '                            <option value="PR">PR</option>\n' +
                        '                            <option value="UM">UM</option>\n' +
                        '                            <option value="VI">VI</option>\n' +
                        '                            <option value="AA">AA</option>\n' +
                        '                            <option value="AP">AP</option>\n' +
                        '                            <option value="AE">AE</option>\n' +
                        "                        </select>\n" +
                        "                    </div>\n" +
                        '                    <div class="form-group small">\n' +
                        '                        <label for="bilzip">Zip</label>\n' +
                        '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                        "                    </div>\n" +
                        '                    <h5 class="cost-price">Annual subscription cost: $<span>599.88</span></h5>\n' +
                        '                    <h5 class="tax-price">Sales tax: $<span>' +
                        Number.parseFloat(tax).toFixed(2) +
                        "</span></h5>\n" +
                        '                    <h5 class="total-price">Total cost: $<span>' +
                        Number.parseFloat(total).toFixed(2) +
                        "</span></h5>\n" +
                        '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                        "                </form>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</section>"
                    );
                    initSelect2($(".add-info-select"));
                    // paypal_sdk.Buttons({
                    //     createOrder: function (data, actions) {
                    //         return actions.order.create({
                    //             purchase_units: [{
                    //                 amount: {
                    //                     value: '49.99'
                    //                 }
                    //             }]
                    //         });
                    //     },
                    //     onApprove: function (data, actions) {
                    //         return actions.order.capture().then(function(details) {
                    //             alert('Transaction completed by ' + details.payer.name.given_name);
                    //             window.onbeforeunload = null;
                    //             window.open('profile-premium.html?id='+attorneyId, "_self")
                    //         });
                    //     }
                    // }).render('#paypal-button-container');
                    if ($("#cardnumber").length)
                      new Cleave("#cardnumber", {
                        creditCard: true,
                      });

                    if ($("#expirationdate").length)
                      new Cleave("#expirationdate", {
                        date: true,
                        datePattern: ["m", "y"],
                      });
                    $(".step9-premium").fadeIn();
                  },
                });
              },
            });
          } else {
            smoothScroll();
            $.ajax({
              type: "GET",
              url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
              success: function (res) {
                var tax = res["taxAmount"];
                var total = res["totalAmount"];
                var step8 = "";
                if ($("section").hasClass("profile")) {
                  step8 = $(".profile");
                  $(".step8-premium, .profile").fadeOut();
                } else {
                  step8 = $(".step8-premium");
                  $(".step8-premium").fadeOut();
                }
                step8.after(
                  '<section class="register step9-premium" style="display:none;">\n' +
                    '    <div class="container">\n' +
                    '        <div class="register-wrapper">\n' +
                    '            <a href="#" class="previous-step"><span class="icon-arrow-down"></span>Previous Step</a>\n' +
                    '            <h2>Payment<span class="status premium">Premium</span></h2>\n' +
                    '            <ul class="steps">\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="completed"></li>\n' +
                    '                <li class="active">Step 9</li>\n' +
                    "            </ul>\n" +
                    '            <div class="payment-form">\n' +
                    '                <form id="visa" class="pci active" data-plan="premium">\n' +
                    '                    <div class="form-group">\n' +
                    '                        <label for="cardholdername">Cardholder Name</label>\n' +
                    '                        <input type="text" id="cardholdername" placeholder="Cardholder Name" required>\n' +
                    "                    </div>\n" +
                    '                    <div class="form-group">\n' +
                    '                        <label for="cardnumber">Card Number</label>\n' +
                    '                        <input id="cardnumber" placeholder="Card Number" required>\n' +
                    "                    </div>\n" +
                    '                    <div class="form-group small">\n' +
                    '                        <label for="expirationdate">Expiration Date</label>\n' +
                    '                        <input id="expirationdate" placeholder="MM/YY" required>\n' +
                    "                    </div>\n" +
                    '                    <div class="form-group small">\n' +
                    '                        <label for="cvc">CVC</label>\n' +
                    '                        <input type="password" id="cvc" maxlength="3" required>\n' +
                    "                    </div>\n" +
                    "                    <h3>Billing address</h3>\n" +
                    '                    <div class="form-group">\n' +
                    '                        <label for="biladdress">Address</label>\n' +
                    '                        <input type="text" id="biladdress" placeholder="Type here">\n' +
                    "                    </div>\n" +
                    '                    <div class="form-group">\n' +
                    '                        <label for="bilsuite">Suite</label>\n' +
                    '                        <input type="text" id="bilsuite" placeholder="Type here">\n' +
                    "                    </div>\n" +
                    '                    <div class="form-group">\n' +
                    '                        <label for="bilcity">City</label>\n' +
                    '                        <input type="text" id="bilcity" placeholder="Type here">\n' +
                    "                    </div>\n" +
                    '                    <div class="form-group small">\n' +
                    '                        <label for="bilstate">State</label>\n' +
                    '                        <select id="bilstate" class="add-info-select">\n' +
                    '                            <option value="AL">AL</option>\n' +
                    '                            <option value="AK">AK</option>\n' +
                    '                            <option value="AZ">AZ</option>\n' +
                    '                            <option value="AR">AR</option>\n' +
                    '                            <option value="CA">CA</option>\n' +
                    '                            <option value="CO">CO</option>\n' +
                    '                            <option value="CT">CT</option>\n' +
                    '                            <option value="DE">DE</option>\n' +
                    '                            <option value="DC">DC</option>\n' +
                    '                            <option value="FM">FM</option>\n' +
                    '                            <option value="FL">FL</option>\n' +
                    '                            <option value="GA">GA</option>\n' +
                    '                            <option value="HI">HI</option>\n' +
                    '                            <option value="ID">ID</option>\n' +
                    '                            <option value="IL">IL</option>\n' +
                    '                            <option value="IN">IN</option>\n' +
                    '                            <option value="IA">IA</option>\n' +
                    '                            <option value="KS">KS</option>\n' +
                    '                            <option value="KY">KY</option>\n' +
                    '                            <option value="LA">LA</option>\n' +
                    '                            <option value="ME">ME</option>\n' +
                    '                            <option value="MH">MH</option>\n' +
                    '                            <option value="MD">MD</option>\n' +
                    '                            <option value="MA">MA</option>\n' +
                    '                            <option value="MI">MI</option>\n' +
                    '                            <option value="MN">MN</option>\n' +
                    '                            <option value="MS">MS</option>\n' +
                    '                            <option value="MO">MO</option>\n' +
                    '                            <option value="MT">MT</option>\n' +
                    '                            <option value="NE">NE</option>\n' +
                    '                            <option value="NV">NV</option>\n' +
                    '                            <option value="NH">NH</option>\n' +
                    '                            <option value="NJ">NJ</option>\n' +
                    '                            <option value="NM">NM</option>\n' +
                    '                            <option value="NY">NY</option>\n' +
                    '                            <option value="NC">NC</option>\n' +
                    '                            <option value="ND">ND</option>\n' +
                    '                            <option value="OH">OH</option>\n' +
                    '                            <option value="OK">OK</option>\n' +
                    '                            <option value="OR">OR</option>\n' +
                    '                            <option value="PW">PW</option>\n' +
                    '                            <option value="PA">PA</option>\n' +
                    '                            <option value="RI">RI</option>\n' +
                    '                            <option value="SC">SC</option>\n' +
                    '                            <option value="SD">SD</option>\n' +
                    '                            <option value="TN">TN</option>\n' +
                    '                            <option value="TX">TX</option>\n' +
                    '                            <option value="UT">UT</option>\n' +
                    '                            <option value="VT">VT</option>\n' +
                    '                            <option value="VA">VA</option>\n' +
                    '                            <option value="WA">WA</option>\n' +
                    '                            <option value="WV">WV</option>\n' +
                    '                            <option value="WI">WI</option>\n' +
                    '                            <option value="WY">WY</option>\n' +
                    '                            <option value="AS">AS</option>\n' +
                    '                            <option value="GU">GU</option>\n' +
                    '                            <option value="MP">MP</option>\n' +
                    '                            <option value="PR">PR</option>\n' +
                    '                            <option value="UM">UM</option>\n' +
                    '                            <option value="VI">VI</option>\n' +
                    '                            <option value="AA">AA</option>\n' +
                    '                            <option value="AP">AP</option>\n' +
                    '                            <option value="AE">AE</option>\n' +
                    "                        </select>\n" +
                    "                    </div>\n" +
                    '                    <div class="form-group small">\n' +
                    '                        <label for="bilzip">Zip</label>\n' +
                    '                        <input type="text" id="bilzip" placeholder="Type here">\n' +
                    "                    </div>\n" +
                    '                    <h5 class="cost-price">Annual subscription cost: $<span>599.88</span></h5>\n' +
                    '                    <h5 class="tax-price">Sales tax: $<span>' +
                    Number.parseFloat(tax).toFixed(2) +
                    "</span></h5>\n" +
                    '                    <h5 class="total-price">Total cost: $<span>' +
                    Number.parseFloat(total).toFixed(2) +
                    "</span></h5>\n" +
                    '                    <button type="submit" class="btn btn-primary">Submit payment and publish your profile</button>\n' +
                    "                </form>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>"
                );
                initSelect2($(".add-info-select"));
                // paypal_sdk.Buttons({
                //     createOrder: function (data, actions) {
                //         return actions.order.create({
                //             purchase_units: [{
                //                 amount: {
                //                     value: '49.99'
                //                 }
                //             }]
                //         });
                //     },
                //     onApprove: function (data, actions) {
                //         return actions.order.capture().then(function (details) {
                //             alert('Transaction completed by ' + details.payer.name.given_name);
                //             window.onbeforeunload = null;
                //             window.open('profile-premium.html?id=' + attorneyId, "_self")
                //         });
                //     }
                // }).render('#paypal-button-container');
                if ($("#cardnumber").length)
                  new Cleave("#cardnumber", {
                    creditCard: true,
                  });

                if ($("#expirationdate").length)
                  new Cleave("#expirationdate", {
                    date: true,
                    datePattern: ["m", "y"],
                  });
                $(".step9-premium").fadeIn();
              },
            });
          }
        }
      },
      complete: function () {
        $("body").removeClass("loading");
      },
    });
  });

  /*
   *
   *   STEP 9  (onChange event for the state field)
   *
   */

  $(document).on("change", ".register .pci #bilstate", function (e) {
    // console.log("step9 state value ----------:", $(this).val());
    var state = $(this).val();
    var attorneyId = Cookies.get("attorneyId");
    var planId = Cookies.get("planId");
    $.ajax({
      type: "GET",
      url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state,
      success: function (res) {
        // console.log("=======", res);
        var tax = res["taxAmount"];
        var total = res["totalAmount"];
        $(".register .pci .tax-price span").text(Number.parseFloat(tax).toFixed(2))
        $(".register .pci .total-price span").text(Number.parseFloat(total).toFixed(2))
      }
    });
  })

  /*
   *
   *   STEP 9  (Submit)
   *
   */
  $(document).on("submit", ".register .pci", function (e) {
    e.preventDefault();
    smoothScroll();

    var attorneyId = Cookies.get("attorneyId");
    var token = Cookies.get("token");
    var plan = $(this).attr("data-plan");
    var planName = Cookies.get("planName");
    var planId = Cookies.get("planId");
    var productId = Cookies.get("productId");
    var cvc, number, exp, city, states, zips, name, address, suite;
    if ($("#visa").hasClass("active")) {
      cvc = $("#cvc").val();
      number = $("#cardnumber").val();
      exp = $("#expirationdate").val();
      city = $("#bilcity").val();
      states = $("#bilstate").val();
      zips = $("#bilzip").val();
      name = $("#cardholdername").val();
      address = $("#biladdress").val();
      suite = $("#bilsuite").val();
    } else if ($("#paypal").hasClass("active")) {
      cvc = $("#paypal-cvc").val();
      number = $("#paypal-cardnumber").val();
      exp = $("#paypal-expirationdate").val();
      city = $("#paypal-bilcity").val();
      states = $("#paypal-bilstate").val();
      zips = $("#paypal-bilzip").val();
      name = $("#paypal-cardholdername").val();
      address = $("#paypal-biladdress").val();
      suite = $("#paypal-bilsuite").val();
    }
    $.ajax({
      type: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      url: apiDomain + "/Attorney/UpgradeAttorneySubscription",
      beforeSend: function () {
        $("body").addClass("loading");
      },
      data: JSON.stringify({
        attorneyId: attorneyId,
        subscriptionName: planName,
        planId: planId,
        productId: productId,
        cvc: cvc,
        exp: exp,
        number: number,
        addressLine1: address,
        addressLine2: suite,
        city: city,
        state: states,
        zip: zips,
        name: name,
      }),
      success: function () {
        $("#success-payment").attr("hidden", false);
        $("#success-payment").attr("data-plan", plan);
      },
      complete: function () {
        $("body").removeClass("loading");
      },
    });
  });

  $(document).on("submit", "#success-payment .thank-you", function (e) {
    e.preventDefault();
    var attorneyId = Cookies.get("attorneyId");
    var plan = $("#success-payment").attr("data-plan");
    if (plan === "pro-plus" || plan === "ProPlus") {
      window.onbeforeunload = null;
      window.open("profile.html?id=" + attorneyId, "_self");
    } else {
      window.onbeforeunload = null;
      window.open("profile-premium.html?id=" + attorneyId, "_self");
    }
  });

  //Send message
  $("#message .profile-form").on("submit", function (e) {
    e.preventDefault();
    var id = $(".popup-content.refer").attr("data-attorney");
    var attorneyName = $(".popup-content.refer .name span").text();
    var name = $("#message #name").val();
    var phone = $("#message #phone").val();
    var email = $("#message #your-email").val();
    var subject = $("#message #your-subject").val();
    var message = $("#message #your-message").val();
    var response = grecaptcha.getResponse(1);

    if (response.length !== 0) {
      $.ajax({
        type: "POST",
        url: apiDomain + "/Communication/Message",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          attorneyId: id,
          attorneyName: attorneyName,
          name: name,
          emailAddress: email,
          phoneNumber: phone,
          subject: subject,
          message: message,
        }),
        success: function (data) {
          $("#message").attr("hidden", true);
          $("#email-success")
            .attr("hidden", false)
            .find(".thank-you p span")
            .text(attorneyName);
        },
      });
    } else {
      if (!$("#recaptchaError-message").text()) {
        $("#recaptchaError-message").append(
          "You must complete the verification in order to proceed."
        );
      }
    }
  });

  //Share profile
  $("#refer .profile-form").on("submit", function (e) {
    e.preventDefault();
    var id = $(".popup-content.refer").attr("data-attorney");
    var attorneyName = $(".popup-content.refer .name span").text();
    var email = $("#refer #email").val();
    var Recemail = $("#refer #recEmail").val();
    var subject = $("#refer #subject").val();
    var message = $("#refer #refer-message").val();
    var response = grecaptcha.getResponse(0);
    if (response.length !== 0) {
      $.ajax({
        type: "POST",
        url: apiDomain + "/Communication/Refer",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          attorneyId: id,
          attorneyName: attorneyName,
          toEmailAddress: Recemail,
          fromEmailAddress: email,
          subject: subject,
          message: message,
        }),
        success: function (data) {
          $("#refer").attr("hidden", true);
          $("#refer-success").attr("hidden", false);
        },
      });
    } else {
      if (!$("#recaptchaError-refer").text()) {
        $("#recaptchaError-refer").append(
          "You must complete the verification in order to proceed."
        );
      }
    }
  });

  //Contact form
  $(".contacts-page .contacts-form").on("submit", function (e) {
    e.preventDefault();
    var name = $(".contacts-form #name").val();
    var email = $(".contacts-form #email").val();
    var subject = $(".contacts-form #subject").val();
    var message = $(".contacts-form #message").val();
    var response = grecaptcha.getResponse();
    if (response.length !== 0) {
      $.ajax({
        type: "POST",
        url: apiDomain + "/Communication/Contact",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: name,
          emailAddress: email,
          subject: subject,
          message: message,
        }),
        success: function () {
          $("#contact-success").attr("hidden", false);
        },
      });
    } else {
      if (!$("#recaptchaError-refer").text()) {
        $("#recaptchaError-refer").append(
          "You must complete the verification in order to proceed."
        );
      }
    }
  });

  //Login
  $(".signin-form").on("submit", function (e) {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("attorneyId");
    Cookies.remove("attorneyPlan");
    Cookies.remove("emailConfirmed");

    var name = $("#username").val();
    var password = $("#password").val();
    $.ajax({
      type: "POST",
      url: apiDomain + "/Login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        identifier: name,
        password: password,
      }),
      success: function (data) {
        Cookies.set("token", data["token"]);
        Cookies.set("userName", data["userName"]);
        Cookies.set("emailConfirmed", data["emailConfirmed"]);
        if (data["attorney"]["attorneyType"] !== null) {
          Cookies.set("attorneyPlan", data["attorney"]["attorneyType"]);
        }
        Cookies.set("attorneyId", data["attorney"]["id"]);
        window.open("account-main.html", "_self");
      },
      error: function () {
        if (!$(".password").hasClass("busy")) {
          $(".password").addClass("busy sign-in");
          $(".signin-form .icon-show.toggle-password").after(
            '<div class="error-sign"><img src="images/error.svg" alt="">\n' +
              '<p class="error">Incorrect password</p></div>'
          );
        }
      },
    });
  });

  //Reset
  $(".reset-form.rf").on("submit", function (e) {
    e.preventDefault();
    var email = $("#email").val();
    $.ajax({
      type: "POST",
      url: apiDomain + "/ForgotPassword",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        emailAddress: email,
      }),
      success: function () {
        window.open("sign-in.html", "_self");
      },
    });
  });

  //Logout
  $(document).on("click", ".sign-out", function (e) {
    e.preventDefault();
    var token = Cookies.get("token");
    $.ajax({
      type: "DELETE",
      url: apiDomain + "/Logout",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      success: function () {
        Cookies.remove("token");
        Cookies.remove("userName");
        Cookies.remove("attorneyId");
        Cookies.remove("attorneyPlan");
        Cookies.remove("emailConfirmed");
        Cookies.remove("city");
        Cookies.remove("state");
        window.open("/", "_self");
      },
    });
  });

  //Confirm email page
  if ($("section").hasClass("confirm-page")) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var popup = urlParams.get("popup");
    var code = urlParams.get("code");
    var email = urlParams.get("email");
    if (popup === "open") {
      $.ajax({
        type: "GET",
        url:
          apiDomain +
          "/ConfirmEmail?Code=" +
          decodeURI(code) +
          "&Email=" +
          email,
        success: function () {
          $("#email-confirm").attr("hidden", false);
        },
        error: function () {
          $(".confirm-page").append("<h2>This page is not exist</h2>");
        },
      });
    }
  }
  $("#email-confirm .thank-you").on("submit", function (e) {
    e.preventDefault();
    $("#email-confirm").attr("hidden", true);
    Cookies.set("emailConfirmed", true);
    window.open("/sign-in.html", "_self");
  });

  //Search Result
  if ($("section").hasClass("search-results")) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var query = urlParams.get("query");
    var page = parseInt(urlParams.get("page"));
    var language = urlParams.get("language");
    var location = urlParams.get("location");
    var keywords = urlParams.get("keywords");
    var practiceArea = urlParams.get("practiceArea");
    var speciality = urlParams.get("speciality");
    var ethnicity = urlParams.get("ethnicity");

    var gender = urlParams.get("gender");
    var experience = encodeURIComponent(urlParams.get("experience"));
    if (query === null || query === undefined) query = "";
    if (language === null || language === undefined) language = "";
    if (location === null || location === undefined) location = "";
    if (practiceArea === null || practiceArea === undefined) practiceArea = "";
    if (speciality === null || speciality === undefined) speciality = "";
    if (ethnicity === null || ethnicity === undefined) ethnicity = "";
    if (
      experience === null ||
      experience === undefined ||
      experience === "null"
    )
      experience = "";
    if (keywords === null || keywords === undefined) keywords = "";
    if (gender === null || gender === undefined) gender = "";
    var specialityUrl = speciality.replace(/&/g, "%26");
    var languageUrl = language.replace(/&/g, "%26");
    var practiceAreaUrl = practiceArea.replace(/&/g, "%26");
    var ethnicityUrl = ethnicity.replace(/&/g, "%26");
    $.ajax({
      url: apiDomain + "/Search/Attorneys",
      type: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: "json",
      data: JSON.stringify({
        query: query,
        language: language,
        location: location,
        practiceArea: practiceArea,
        speciality: speciality,
        ethnicity: ethnicity,
        experience: experience,
        gender: gender,
        keywords: keywords.split(","),
        currentPage: page - 1,
        pageSize: 9,
      }),
      success: function (res) {
        var count = res["totalCount"];
        res = res["attorneys"];
        if (practiceArea) {
          $("#area").val(practiceArea).trigger("change");
        }
        if (language) {
          $("#language").val(language).trigger("change");
        }
        if (location) {
          $("#location").val(location).trigger("change");
        }
        if (speciality) {
          $("#specialty").val(speciality).trigger("change");
        }
        if (ethnicity) {
          $("#culture").val(ethnicity).trigger("change");
        }
        if (experience) {
          $("#experience").val(experience).trigger("change");
        }
        if (keywords) {
          keywords = keywords.split(",");
          $.each(keywords, function (key, arr) {
            $("#keyword").append(
              $("<option selected></option>")
                .attr("value", keywords[key])
                .text(keywords[key])
            );
          });
        }
        if (count > 0) {
          $.each(res, function (key, arr) {
            var item;
            var id = res[key]["id"];
            var company = "";
            if (
              res[key]["professionalInfo"] &&
              res[key]["professionalInfo"]["company"] !== null
            ) {
              company = res[key]["professionalInfo"]["company"];
            } else {
              company = "";
            }
            var middleName = "";
            if (
              res[key]["middleName"] !== undefined ||
              res[key]["middleName"] !== null
            ) {
              middleName = " " + res[key]["middleName"];
            }
            var name = res[key]["fullName"];
            var type = res[key]["attorneyType"];
            var imageP = "";
            var headline = "";
            if (res[key]["profile"]) {
              if (res[key]["profile"]["pictureUrl"]) {
                imageP = res[key]["profile"]["pictureUrl"];
              } else {
                imageP = "images/user.png";
              }
              if (
                res[key]["profile"]["headline"] &&
                res[key]["profile"]["headline"] !== "undefined"
              ) {
                headline = res[key]["profile"]["headline"];
              } else {
                headline = "";
              }
            } else {
              imageP = "images/user.png";
              headline = "";
            }

            var tags = [];
            if (res[key]["professionalInfo"]) {
              $.each(res[key]["professionalInfo"]["practiceAreas"], function (
                pkey,
                parr
              ) {
                if (
                  res[key]["professionalInfo"]["practiceAreas"][pkey] !==
                  "None Reported By Attorney"
                ) {
                  tags.push(
                    "<span>" +
                      res[key]["professionalInfo"]["practiceAreas"][pkey] +
                      "</span>"
                  );
                }
              });
              tags = tags.join("");
            }
            var phone = "";
            if (res[key]["contactInfo"]) {
              if (res[key]["contactInfo"]["workPhoneNumber"]) {
                phone =
                  '<div class="column">\n' +
                  '                 <span class="icon-phone"></span>\n' +
                  '                 <a href="tel:' +
                  res[key]["contactInfo"]["workPhoneNumber"] +
                  '" onclick="event.stopPropagation();">' +
                  res[key]["contactInfo"]["workPhoneNumber"] +
                  "</a>\n" +
                  "            </div>";
              } else {
                phone = "";
              }
            }

            if (type === "Unclaimed") {
              item =
                '  <div class="results-people__item" data-link="profile-unclaim.html?id=' +
                id +
                '">\n' +
                '          <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '               <div class="item-image">\n' +
                '                    <img src="' +
                imageP +
                '" alt="">\n' +
                "               </div>\n" +
                '               <div class="item-info">\n' +
                '                    <p class="name">' +
                name +
                "</p>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                "               </div>\n" +
                "          </div>\n" +
                "      </div>";
              $(".results-block-people").append(item);
            } else if (type === "Pro") {
              item =
                '<div class="results-people__item pro" data-link="profile.html?id=' +
                id +
                '">\n' +
                '                    <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '                        <div class="item-image">\n' +
                '                            <img src="' +
                imageP +
                '" alt="">\n' +
                '                            <span class="status">Pro</span>\n' +
                "                        </div>\n" +
                '                        <div class="item-info">\n' +
                '                            <p class="name">' +
                name +
                "</p>\n" +
                '                            <p class="place">' +
                company +
                "</p>\n" +
                '                            <div class="tags">\n' +
                tags +
                "                            </div>\n" +
                '                            <div class="contacts">\n' +
                '                                <div class="column">\n' +
                '                                    <span class="icon-email"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Message</a>\n' +
                "                                </div>\n" +
                phone +
                '                                <div class="column">\n' +
                '                                    <span class="icon-link"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Share</a>\n' +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                '                    <div class="mobile-info">\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                '                        <div class="contacts">\n' +
                '                            <div class="column">\n' +
                '                                <span class="icon-email"></span>\n' +
                '                                <a href="#" class="send-message">Message</a>\n' +
                "                            </div>\n" +
                phone +
                '                            <div class="column">\n' +
                '                                <span class="icon-link"></span>\n' +
                '                                <a href="#">Share</a>\n' +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
              $(".results-block-people").append(item);
            } else if (type === "ProPlus") {
              item =
                '<div class="results-people__item pro-plus" data-link="profile.html?id=' +
                id +
                '">\n' +
                '                    <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '                        <div class="item-image">\n' +
                '                            <img src="' +
                imageP +
                '" alt="">\n' +
                '                            <span class="status">Pro Plus</span>\n' +
                "                        </div>\n" +
                '                        <div class="item-info">\n' +
                '                            <p class="name">' +
                name +
                "</p>\n" +
                '                            <p class="place">' +
                company +
                "</p>\n" +
                '                            <p class="description">' +
                headline +
                "</p>" +
                '                            <div class="tags">\n' +
                tags +
                "                            </div>\n" +
                '                            <div class="contacts">\n' +
                '                                <div class="column">\n' +
                '                                    <span class="icon-email"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Message</a>\n' +
                "                                </div>\n" +
                phone +
                '                                <div class="column">\n' +
                '                                    <span class="icon-link"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Share</a>\n' +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                '                    <div class="mobile-info">\n' +
                '                        <p class="description">Big firm experience; small firm prices.</p>\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                '                        <div class="contacts">\n' +
                '                            <div class="column">\n' +
                '                                <span class="icon-email"></span>\n' +
                '                                <a href="#" class="send-message">Message</a>\n' +
                "                            </div>\n" +
                phone +
                '                            <div class="column">\n' +
                '                                <span class="icon-link"></span>\n' +
                '                                <a href="#">Share</a>\n' +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
              $(".results-block-people").append(item);
            } else if (type === "Premium") {
              item =
                '<div class="results-people__item premium" data-link="profile-premium.html?id=' +
                id +
                '">\n' +
                '                    <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '                        <div class="item-image">\n' +
                '                            <img src="' +
                imageP +
                '" alt="">\n' +
                '                            <span class="status">Premium</span>\n' +
                "                        </div>\n" +
                '                        <div class="item-info">\n' +
                '                            <p class="name">' +
                name +
                "</p>\n" +
                '                            <p class="place">' +
                company +
                "</p>\n" +
                '                            <p class="description">' +
                headline +
                "</p>" +
                '                            <div class="tags">\n' +
                tags +
                "                            </div>\n" +
                '                            <div class="contacts">\n' +
                '                                <div class="column">\n' +
                '                                    <span class="icon-email"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Message</a>\n' +
                "                                </div>\n" +
                phone +
                '                                <div class="column">\n' +
                '                                    <span class="icon-link"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Share</a>\n' +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                '                    <div class="mobile-info">\n' +
                '                        <p class="description">Big firm experience; small firm prices.</p>\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                '                        <div class="contacts">\n' +
                '                            <div class="column">\n' +
                '                                <span class="icon-email"></span>\n' +
                '                                <a href="#" class="send-message">Message</a>\n' +
                "                            </div>\n" +
                phone +
                '                            <div class="column">\n' +
                '                                <span class="icon-link"></span>\n' +
                '                                <a href="#">Share</a>\n' +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
              $(".results-block-people").append(item);
            }
          });
          if (count <= 9) {
            $(".pagination").html("");
            $(".captcha").hide();
          } else {
            var decade = parseInt(count / 10) + 1;
            var i;
            var links = "";
            var temp =
              '<a href="#" class="nav"><span class="icon-arrow-down disable prev"></span></a>\n' +
              '                    <a href="#" class="active">1</a>\n' +
              '                    <a href="#">2</a>\n' +
              '                    <a href="#">3</a>\n' +
              '                    <a href="#">4</a>\n' +
              '                    <a class="none">...</a>\n' +
              '                    <a href="#">18</a>\n' +
              '                    <a href="#" class="nav"><span class="icon-arrow-down next"></span></a>';
            if (decade > 6) {
              $cycleSize = 6;
            } else {
              $cycleSize = decade;
            }
            var active = "";
            for (i = 1; i <= $cycleSize; i++) {
              if (i === page) {
                active = 'class="active"';
              } else {
                active = "";
              }
              if (decade >= 6) {
                if (i <= 6) {
                  links +=
                    '<a href="?query=' +
                    query +
                    "&language=" +
                    languageUrl +
                    "&ethnicity=" +
                    ethnicityUrl +
                    "&speciality=" +
                    specialityUrl +
                    "&location=" +
                    location +
                    "&practiceArea=" +
                    practiceAreaUrl +
                    "&experience=" +
                    experience +
                    "&page=" +
                    i +
                    '" ' +
                    active +
                    ' class="need-captcha">' +
                    i +
                    "</a>";
                } else {
                  if (i === decade) {
                    links += '<a class="none">...</a>';
                    links +=
                      '<a href="?query=' +
                      query +
                      "&language=" +
                      languageUrl +
                      "&ethnicity=" +
                      ethnicityUrl +
                      "&speciality=" +
                      specialityUrl +
                      "&location=" +
                      location +
                      "&practiceArea=" +
                      practiceAreaUrl +
                      "&experience=" +
                      experience +
                      "&page=" +
                      i +
                      '" ' +
                      active +
                      ' class="need-captcha">' +
                      i +
                      "</a>";
                  }
                }
              } else {
                links +=
                  '<a href="?query=' +
                  query +
                  "&language=" +
                  languageUrl +
                  "&ethnicity=" +
                  ethnicityUrl +
                  "&speciality=" +
                  specialityUrl +
                  "&location=" +
                  location +
                  "&practiceArea=" +
                  practiceAreaUrl +
                  "&experience=" +
                  experience +
                  "&page=" +
                  i +
                  '" ' +
                  active +
                  ' class="need-captcha">' +
                  i +
                  "</a>";
              }
            }
            $(".pagination").append(links);
            $(".share-search, .search-buttons-bottom").show();
            $(".captcha").show();
            $(".pagination").show();
          }

          var searchQuery =
            (query ? query : "") +
            (language ? " / " + language : "") +
            (practiceArea ? " / " + decodeURI(practiceArea) : "") +
            (experience ? " / " + experience : "") +
            (ethnicity ? " / " + decodeURI(ethnicity) : "") +
            (speciality ? " / " + decodeURI(speciality) : "") +
            (gender ? " / " + gender : "") +
            (location ? " / " + location : "");
          if (searchQuery.charAt(1) === "/") {
            searchQuery = searchQuery.substr(3);
          }
          $(".search-results-inner .left-side").append(
            "<p>" +
              count +
              ' <span class="rf">results for</span> <span class="search-name">“' +
              searchQuery +
              "”</span></p>"
          );
          if (count < 5) {
            $(".search-buttons-bottom").hide();
          }
        } else {
          searchQuery =
            (query ? query : "") +
            (language ? " / " + language : "") +
            (practiceArea ? " / " + decodeURI(practiceArea) : "") +
            (experience ? " / " + experience : "") +
            (ethnicity ? " / " + decodeURI(ethnicity) : "") +
            (speciality ? " / " + decodeURI(speciality) : "") +
            (gender ? " / " + gender : "") +
            (location ? " / " + location : "");
          if (searchQuery.charAt(1) === "/") {
            searchQuery = searchQuery.substr(3);
          }
          $(".search-results-inner .left-side").append(
            '<p><span class="rf">No results for</span> <span class="search-name">“' +
              searchQuery +
              "”</span></p>"
          );
          $(".results-people").prepend(
            ' <div class="no-results">\n' +
              '                                    <img src="images/search-results.svg" alt="">\n' +
              "                                    <p>Sorry! No lawyers match your search at this time. Other, experienced lawyers are ready to help. Please broaden your search.</p>\n" +
              "                                </div>"
          );
          $(".share-search").hide();
          $(".captcha").hide();
          $(".pagination").hide();
        }
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Demographics?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#culture").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Languages?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#language").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Specialities?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#specialty").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });

    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/PracticeAreas?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $("#area").append(
            $("<option></option>").attr("value", data[key]).text(data[key])
          );
        });
      },
    });
    initSearchSelect2($(".search-select"));
  }

  // Compare Attorneys
  $(document).on("click", ".compare", function (e) {
    e.preventDefault();
    var ids = [];
    $(".results-people__item").each(function () {
      if ($(this).find(".search-checkbox input").is(":checked")) {
        ids.push($(this).find(".search-checkbox input").attr("id").slice(16));
      }
    });
    var link = "compare.html?ids=" + ids.join("&ids=");
    if (ids.length) {
      window.open(link, "_self");
    } else {
      alert("Need select lawyers");
    }
  });

  if ($("section").hasClass("compare-page")) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    $.ajax({
      url: apiDomain + "/Attorney/CompareAttornies?" + urlParams,
      type: "GET",
      success: function (res) {
        var i = 0;
        $.each(res, function (key, arr) {
          var item;
          var id = res[key]["id"];
          var company = "";
          if (
            res[key]["professionalInfo"] &&
            res[key]["professionalInfo"]["company"] !== null
          ) {
            company = res[key]["professionalInfo"]["company"];
          } else {
            company = "";
          }
          if (
            res[key]["middleName"] !== undefined ||
            res[key]["middleName"] !== null
          ) {
            var middleName = " " + res[key]["middleName"];
          }
          var name = res[key]["fullName"];
          var type = res[key]["attorneyType"];
          var imageP = "";
          var headline = "";
          if (res[key]["profile"]) {
            if (res[key]["profile"]["pictureUrl"]) {
              imageP = res[key]["profile"]["pictureUrl"];
            } else {
              imageP = "images/user.png";
            }

            if (
              res[key]["profile"]["headline"] &&
              res[key]["profile"]["headline"] !== "undefined"
            ) {
              headline = res[key]["profile"]["headline"];
            } else {
              headline = "";
            }
          } else {
            imageP = "images/user.png";
            headline = "";
          }
          var tags = [];
          if (res[key]["professionalInfo"]) {
            $.each(res[key]["professionalInfo"]["practiceAreas"], function (
              pkey,
              parr
            ) {
              if (
                res[key]["professionalInfo"]["practiceAreas"][pkey] !==
                "None Reported By Attorney"
              ) {
                tags.push(
                  "<span>" +
                    res[key]["professionalInfo"]["practiceAreas"][pkey] +
                    "</span>"
                );
              }
            });
            tags = tags.join("");
          }
          var phone = "";
          if (res[key]["contactInfo"]) {
            if (res[key]["contactInfo"]["workPhoneNumber"]) {
              phone =
                '<div class="column">\n' +
                '                 <span class="icon-phone"></span>\n' +
                '                 <a href="tel:' +
                res[key]["contactInfo"]["workPhoneNumber"] +
                '" onclick="event.stopPropagation();">' +
                res[key]["contactInfo"]["workPhoneNumber"] +
                "</a>\n" +
                "            </div>";
            } else {
              phone = "";
            }
          }

          if (type === "Unclaimed") {
            item =
              '  <div class="results-people__item" data-link="profile-unclaim.html1?id=' +
              id +
              '">\n' +
              '          <div class="item-top">\n' +
              '                        <div class="search-checkbox">\n' +
              '                            <input class="styled-checkbox" id="styled-checkbox-' +
              id +
              '" type="checkbox" checked>\n' +
              '                            <label for="styled-checkbox-' +
              id +
              '">Compare</label>\n' +
              "                        </div>\n" +
              '               <div class="item-image">\n' +
              '                    <img src="' +
              imageP +
              '" alt="">\n' +
              "               </div>\n" +
              '               <div class="item-info">\n' +
              '                    <p class="name">' +
              name +
              "</p>\n" +
              '                    <p class="place">' +
              company +
              "</p>\n" +
              "               </div>\n" +
              "          </div>\n" +
              "      </div>";
            $(".compare-page-results").append(item);
          } else if (type === "Pro") {
            item =
              '<div class="results-people__item pro" data-link="profile.html?id=' +
              id +
              '">\n' +
              '                    <div class="item-top">\n' +
              '                        <div class="search-checkbox">\n' +
              '                            <input class="styled-checkbox" id="styled-checkbox-' +
              id +
              '" type="checkbox" checked>\n' +
              '                            <label for="styled-checkbox-' +
              id +
              '">Compare</label>\n' +
              "                        </div>\n" +
              '                        <div class="item-image">\n' +
              '                            <img src="' +
              imageP +
              '" alt="">\n' +
              '                            <span class="status">Pro</span>\n' +
              "                        </div>\n" +
              '                        <div class="item-info">\n' +
              '                            <p class="name">' +
              name +
              "</p>\n" +
              '                            <p class="place">' +
              company +
              "</p>\n" +
              '                            <div class="tags">\n' +
              tags +
              "                            </div>\n" +
              '                            <div class="contacts">\n' +
              '                                <div class="column">\n' +
              '                                    <span class="icon-email"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              name +
              '">Message</a>\n' +
              "                                </div>\n" +
              phone +
              '                                <div class="column">\n' +
              '                                    <span class="icon-link"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              name +
              '">Share</a>\n' +
              "                                </div>\n" +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              '                    <div class="mobile-info">\n' +
              '                        <div class="tags">\n' +
              tags +
              "                        </div>\n" +
              '                        <div class="contacts">\n' +
              '                            <div class="column">\n' +
              '                                <span class="icon-email"></span>\n' +
              '                                <a href="#" class="send-message">Message</a>\n' +
              "                            </div>\n" +
              phone +
              '                            <div class="column">\n' +
              '                                <span class="icon-link"></span>\n' +
              '                                <a href="#">Share</a>\n' +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              "                </div>";
            $(".compare-page-results").append(item);
          } else if (type === "ProPlus") {
            item =
              '<div class="results-people__item pro-plus" data-link="profile.html?id=' +
              id +
              '">\n' +
              '                    <div class="item-top">\n' +
              '                        <div class="search-checkbox">\n' +
              '                            <input class="styled-checkbox" id="styled-checkbox-' +
              id +
              '" type="checkbox" checked>\n' +
              '                            <label for="styled-checkbox-' +
              id +
              '">Compare</label>\n' +
              "                        </div>\n" +
              '                        <div class="item-image">\n' +
              '                            <img src="' +
              imageP +
              '" alt="">\n' +
              '                            <span class="status">Pro Plus</span>\n' +
              "                        </div>\n" +
              '                        <div class="item-info">\n' +
              '                            <p class="name">' +
              name +
              "</p>\n" +
              '                            <p class="place">' +
              company +
              "</p>\n" +
              '                            <p class="description">' +
              headline +
              "</p>" +
              '                            <div class="tags">\n' +
              tags +
              "                            </div>\n" +
              '                            <div class="contacts">\n' +
              '                                <div class="column">\n' +
              '                                    <span class="icon-email"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              name +
              '">Message</a>\n' +
              "                                </div>\n" +
              phone +
              '                                <div class="column">\n' +
              '                                    <span class="icon-link"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              name +
              '">Share</a>\n' +
              "                                </div>\n" +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              '                    <div class="mobile-info">\n' +
              '                        <p class="description">Big firm experience; small firm prices.</p>\n' +
              '                        <div class="tags">\n' +
              tags +
              "                        </div>\n" +
              '                        <div class="contacts">\n' +
              '                            <div class="column">\n' +
              '                                <span class="icon-email"></span>\n' +
              '                                <a href="#" class="send-message">Message</a>\n' +
              "                            </div>\n" +
              phone +
              '                            <div class="column">\n' +
              '                                <span class="icon-link"></span>\n' +
              '                                <a href="#">Share</a>\n' +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              "                </div>";
            $(".compare-page-results").append(item);
          } else if (type === "Premium") {
            item =
              '<div class="results-people__item premium" data-link="profile-premium.html?id=' +
              id +
              '">\n' +
              '                    <div class="item-top">\n' +
              '                        <div class="search-checkbox">\n' +
              '                            <input class="styled-checkbox" id="styled-checkbox-' +
              id +
              '" type="checkbox" checked>\n' +
              '                            <label for="styled-checkbox-' +
              id +
              '">Compare</label>\n' +
              "                        </div>\n" +
              '                        <div class="item-image">\n' +
              '                            <img src="' +
              imageP +
              '" alt="">\n' +
              '                            <span class="status">Premium</span>\n' +
              "                        </div>\n" +
              '                        <div class="item-info">\n' +
              '                            <p class="name">' +
              name +
              "</p>\n" +
              '                            <p class="place">' +
              company +
              "</p>\n" +
              '                            <p class="description">' +
              headline +
              "</p>" +
              '                            <div class="tags">\n' +
              tags +
              "                            </div>\n" +
              '                            <div class="contacts">\n' +
              '                                <div class="column">\n' +
              '                                    <span class="icon-email"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              name +
              '">Message</a>\n' +
              "                                </div>\n" +
              phone +
              '                                <div class="column">\n' +
              '                                    <span class="icon-link"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              name +
              '">Share</a>\n' +
              "                                </div>\n" +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              '                    <div class="mobile-info">\n' +
              '                        <p class="description">Big firm experience; small firm prices.</p>\n' +
              '                        <div class="tags">\n' +
              tags +
              "                        </div>\n" +
              '                        <div class="contacts">\n' +
              '                            <div class="column">\n' +
              '                                <span class="icon-email"></span>\n' +
              '                                <a href="#" class="send-message">Message</a>\n' +
              "                            </div>\n" +
              phone +
              '                            <div class="column">\n' +
              '                                <span class="icon-link"></span>\n' +
              '                                <a href="#">Share</a>\n' +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>\n" +
              "                </div>";
            $(".compare-page-results").append(item);
          }

          i++;
        });

        $(".compare-page-top").prepend("<p>" + i + " laywers</p>");
      },
    });
  }

  // Filter Search
  $(document).on("submit", ".results-filter-form", function (e) {
    e.preventDefault();
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var query = urlParams.get("query");
    var language = $("#language").val();
    var languageUrl = language ? language.replace(/&/g, "%26") : '';
    var location = $("#location").val();
    var practiceArea = $("#area").val();
    var practiceAreaUrl = practiceArea ? practiceArea.replace(/&/g, "%26") : '';
    var keywords = $("#keyword").val();
    var speciality = $("#specialty").val();
    var specialityUrl = speciality ? speciality.replace(/&/g, "%26") : '';
    var experience = $("#experience").val();
    var ethnicity = $("#culture").val();
    var ethnicityUrl = ethnicity ? ethnicity.replace(/&/g, "%26") : '';
    var page = 1;

    if (query === null || query === undefined) query = "";
    if (language === null || language === undefined) language = "";
    if (location === null || location === undefined) location = "";
    if (practiceArea === null || practiceArea === undefined) practiceArea = "";
    if (speciality === null || speciality === undefined) speciality = "";
    if (ethnicity === null || ethnicity === undefined) ethnicity = "";
    if (
      experience === null ||
      experience === undefined ||
      experience === "null"
    )
      experience = "";
    if (keywords === null || keywords === undefined) keywords = "";

    $.ajax({
      url: apiDomain + "/Search/Attorneys",
      type: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: "json",
      data: JSON.stringify({
        query: query,
        language: language,
        location: location,
        practiceArea: practiceArea,
        speciality: speciality,
        experience: experience,
        ethnicity: ethnicity,
        keywords: keywords,
        currentPage: page - 1,
        pageSize: 9,
      }),
      beforeSend: function () {
        $("body").addClass("loading");
      },
      success: function (res) {
        window.history.replaceState(
          null,
          null,
          "?query=" +
            query +
            "&language=" +
            languageUrl +
            "&location=" +
            location +
            "&practiceArea=" +
            practiceAreaUrl +
            "&speciality=" +
            specialityUrl +
            "&experience=" +
            experience +
            "&ethnicity=" +
            ethnicityUrl +
            "&keywords=" +
            keywords +
            "&page=" +
            1
        );
        $(".results-block-people").empty();
        $(".search-results-inner .left-side p").remove();
        if ($(".no-results").length) {
          $(".no-results").remove();
        }
        var count = res["totalCount"];
        res = res["attorneys"];
        if (count > 0) {
          $(".share-search").show();
          $.each(res, function (key, arr) {
            var item;
            var id = res[key]["id"];
            var company = "";
            if (
              res[key]["professionalInfo"] &&
              res[key]["professionalInfo"]["company"] !== null
            ) {
              company = res[key]["professionalInfo"]["company"];
            } else {
              company = "";
            }
            var middleName = "";
            if (
              res[key]["middleName"] !== undefined ||
              res[key]["middleName"] !== null
            ) {
              middleName = " " + res[key]["middleName"];
            }
            var name = res[key]["fullName"];
            var type = res[key]["attorneyType"];
            var imageP = "";
            var headline = "";
            if (res[key]["profile"]) {
              if (res[key]["profile"]["pictureUrl"]) {
                imageP = res[key]["profile"]["pictureUrl"];
              } else {
                imageP = "images/user.png";
              }

              if (
                res[key]["profile"]["headline"] &&
                res[key]["profile"]["headline"] !== "undefined"
              ) {
                headline = res[key]["profile"]["headline"];
              } else {
                headline = "";
              }
            } else {
              imageP = "images/user.png";
              headline = "";
            }
            var tags = [];
            if (res[key]["professionalInfo"]) {
              $.each(res[key]["professionalInfo"]["practiceAreas"], function (
                pkey,
                parr
              ) {
                if (
                  res[key]["professionalInfo"]["practiceAreas"][pkey] !==
                  "None Reported By Attorney"
                ) {
                  tags.push(
                    "<span>" +
                      res[key]["professionalInfo"]["practiceAreas"][pkey] +
                      "</span>"
                  );
                }
              });
              tags = tags.join("");
            }
            var phone = "";
            if (res[key]["contactInfo"]) {
              if (res[key]["contactInfo"]["workPhoneNumber"]) {
                phone =
                  '<div class="column">\n' +
                  '                 <span class="icon-phone"></span>\n' +
                  '                 <a href="tel:' +
                  res[key]["contactInfo"]["workPhoneNumber"] +
                  '" onclick="event.stopPropagation();">' +
                  res[key]["contactInfo"]["workPhoneNumber"] +
                  "</a>\n" +
                  "            </div>";
              } else {
                phone = "";
              }
            }

            if (type === "Unclaimed") {
              item =
                '  <div class="results-people__item" data-link="profile-unclaim.html?id=' +
                id +
                '">\n' +
                '          <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '               <div class="item-image">\n' +
                '                    <img src="' +
                imageP +
                '" alt="">\n' +
                "               </div>\n" +
                '               <div class="item-info">\n' +
                '                    <p class="name">' +
                name +
                "</p>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                "               </div>\n" +
                "          </div>\n" +
                "      </div>";
              $(".results-block-people").append(item);
            } else if (type === "Pro") {
              item =
                '<div class="results-people__item pro" data-link="profile.html?id=' +
                id +
                '">\n' +
                '                    <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '                        <div class="item-image">\n' +
                '                            <img src="' +
                imageP +
                '" alt="">\n' +
                '                            <span class="status">Pro</span>\n' +
                "                        </div>\n" +
                '                        <div class="item-info">\n' +
                '                            <p class="name">' +
                name +
                "</p>\n" +
                '                            <p class="place">' +
                company +
                "</p>\n" +
                '                            <div class="tags">\n' +
                tags +
                "                            </div>\n" +
                '                            <div class="contacts">\n' +
                '                                <div class="column">\n' +
                '                                    <span class="icon-email"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Message</a>\n' +
                "                                </div>\n" +
                phone +
                '                                <div class="column">\n' +
                '                                    <span class="icon-link"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Share</a>\n' +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                '                    <div class="mobile-info">\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                '                        <div class="contacts">\n' +
                '                            <div class="column">\n' +
                '                                <span class="icon-email"></span>\n' +
                '                                <a href="#" class="send-message">Message</a>\n' +
                "                            </div>\n" +
                phone +
                '                            <div class="column">\n' +
                '                                <span class="icon-link"></span>\n' +
                '                                <a href="#">Share</a>\n' +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
              $(".results-block-people").append(item);
            } else if (type === "ProPlus") {
              item =
                '<div class="results-people__item pro-plus" data-link="profile.html?id=' +
                id +
                '">\n' +
                '                    <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '                        <div class="item-image">\n' +
                '                            <img src="' +
                imageP +
                '" alt="">\n' +
                '                            <span class="status">Pro Plus</span>\n' +
                "                        </div>\n" +
                '                        <div class="item-info">\n' +
                '                            <p class="name">' +
                name +
                "</p>\n" +
                '                            <p class="place">' +
                company +
                "</p>\n" +
                '                            <p class="description">' +
                headline +
                "</p>" +
                '                            <div class="tags">\n' +
                tags +
                "                            </div>\n" +
                '                            <div class="contacts">\n' +
                '                                <div class="column">\n' +
                '                                    <span class="icon-email"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Message</a>\n' +
                "                                </div>\n" +
                phone +
                '                                <div class="column">\n' +
                '                                    <span class="icon-link"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Share</a>\n' +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                '                    <div class="mobile-info">\n' +
                '                        <p class="description">Big firm experience; small firm prices.</p>\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                '                        <div class="contacts">\n' +
                '                            <div class="column">\n' +
                '                                <span class="icon-email"></span>\n' +
                '                                <a href="#" class="send-message">Message</a>\n' +
                "                            </div>\n" +
                phone +
                '                            <div class="column">\n' +
                '                                <span class="icon-link"></span>\n' +
                '                                <a href="#">Share</a>\n' +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
              $(".results-block-people").append(item);
            } else if (type === "Premium") {
              item =
                '<div class="results-people__item premium" data-link="profile-premium.html?id=' +
                id +
                '">\n' +
                '                    <div class="item-top">\n' +
                '                        <div class="search-checkbox">\n' +
                '                            <input class="styled-checkbox" id="styled-checkbox-' +
                id +
                '" type="checkbox">\n' +
                '                            <label for="styled-checkbox-' +
                id +
                '">Compare</label>\n' +
                "                        </div>\n" +
                '                        <div class="item-image">\n' +
                '                            <img src="' +
                imageP +
                '" alt="">\n' +
                '                            <span class="status">Premium</span>\n' +
                "                        </div>\n" +
                '                        <div class="item-info">\n' +
                '                            <p class="name">' +
                name +
                "</p>\n" +
                '                            <p class="place">' +
                company +
                "</p>\n" +
                '                            <p class="description">' +
                headline +
                "</p>" +
                '                            <div class="tags">\n' +
                tags +
                "                            </div>\n" +
                '                            <div class="contacts">\n' +
                '                                <div class="column">\n' +
                '                                    <span class="icon-email"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="message" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Message</a>\n' +
                "                                </div>\n" +
                phone +
                '                                <div class="column">\n' +
                '                                    <span class="icon-link"></span>\n' +
                '                                    <a href="#" class="popup-opener" data-popup="refer" data-image="' +
                imageP +
                '" data-attorney="' +
                id +
                '" data-name="' +
                name +
                '">Share</a>\n' +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                '                    <div class="mobile-info">\n' +
                '                        <p class="description">Big firm experience; small firm prices.</p>\n' +
                '                        <div class="tags">\n' +
                tags +
                "                        </div>\n" +
                '                        <div class="contacts">\n' +
                '                            <div class="column">\n' +
                '                                <span class="icon-email"></span>\n' +
                '                                <a href="#" class="send-message">Message</a>\n' +
                "                            </div>\n" +
                phone +
                '                            <div class="column">\n' +
                '                                <span class="icon-link"></span>\n' +
                '                                <a href="#">Share</a>\n' +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>";
              $(".results-block-people").append(item);
            }
          });
          if (count <= 9) {
            $(".pagination").html("");
          } else {
            var decade = parseInt(count / 10) + 1;
            var i;
            var links = "";

            if (decade > 6) {
              $cycleSize = 6;
            } else {
              $cycleSize = decade;
            }
            for (i = 1; i <= $cycleSize; i++) {
              var active = "";
              if (i === page) {
                active = 'class="active"';
              } else {
                active = "";
              }
              if (decade >= 6) {
                if (i <= 6) {
                  links +=
                    '<a href="?query=' +
                    query +
                    "&language=" +
                    languageUrl +
                    "&location=" +
                    location +
                    "&keywords=" +
                    keywords +
                    "&speciality=" +
                    specialityUrl +
                    "&practiceArea=" +
                    practiceAreaUrl +
                    "&experience=" +
                    experience +
                    "&ethnicity=" +
                    ethnicityUrl +
                    "&page=" +
                    i +
                    '" ' +
                    active +
                    ' class="need-captcha">' +
                    i +
                    "</a>";
                } else {
                  if (i === decade) {
                    links += '<a class="none">...</a>';
                    links +=
                      '<a href="?query=' +
                      query +
                      "&language=" +
                      languageUrl +
                      "&location=" +
                      location +
                      "&keywords=" +
                      keywords +
                      "&speciality=" +
                      specialityUrl +
                      "&practiceArea=" +
                      practiceAreaUrl +
                      "&experience=" +
                      experience +
                      "&ethnicity=" +
                      ethnicityUrl +
                      "&page=" +
                      i +
                      '" ' +
                      active +
                      ' class="need-captcha">' +
                      i +
                      "</a>";
                  }
                }
              } else {
                links +=
                  '<a href="?query=' +
                  query +
                  "&language=" +
                  languageUrl +
                  "&location=" +
                  location +
                  "&keywords=" +
                  keywords +
                  "&speciality=" +
                  specialityUrl +
                  "&practiceArea=" +
                  practiceAreaUrl +
                  "&experience=" +
                  experience +
                  "&ethnicity=" +
                  ethnicityUrl +
                  "&page=" +
                  i +
                  '" ' +
                  active +
                  ' class="need-captcha">' +
                  i +
                  "</a>";
              }
            }
            $(".pagination").html(links);

            $(".pagination, .captcha, .search-buttons-bottom").show();
            $(".share-search").show();
          }
          var searchQuery =
            (query ? query : "") +
            (language ? " / " + language : "") +
            (practiceArea ? " / " + practiceArea : "") +
            (experience ? " / " + experience : "") +
            (ethnicity ? " / " + ethnicity : "") +
            (speciality ? " / " + speciality : "") +
            (location ? " / " + location : "");
          if (searchQuery.charAt(1) === "/") {
            searchQuery = searchQuery.substr(3);
          }
          $(".search-results-inner .left-side").append(
            "<p>" +
              count +
              ' <span class="rf">results for</span> <span class="search-name">“' +
              searchQuery +
              "”</span></p>"
          );

          if (count < 5) {
            $(".search-buttons-bottom").hide();
          }
          if (count < 10) {
            $(".captcha").hide();
          }
        } else {
          searchQuery =
            (query ? query : "") +
            (language ? " / " + language : "") +
            (practiceArea ? " / " + practiceArea : "") +
            (experience ? " / " + experience : "") +
            (ethnicity ? " / " + ethnicity : "") +
            (speciality ? " / " + speciality : "") +
            (gender ? " / " + gender : "") +
            (location ? " / " + location : "");
          if (searchQuery.charAt(1) === "/") {
            searchQuery = searchQuery.substr(3);
          }
          $(".search-results-inner .left-side").append(
            '<p><span class="rf">No results for</span> <span class="search-name">“' +
              searchQuery +
              "”</span></p>"
          );

          $(".results-block-people").empty();
          $(".results-people").prepend(
            ' <div class="no-results">\n' +
              '                                    <img src="images/search-results.svg" alt="">\n' +
              "                                    <p></p>\n" +
              "                                </div>"
          );
          $(".share-search").hide();
          $(".captcha").hide();
          $(".pagination").hide();
          var lang = Cookies.get("language");
          $.ajax({
            url: apiDomain + "/PageContent/GetPageContents?pageName=search",
            type: "GET",
            dataType: "json",
            success: function (res) {
              $.each(res, function (key, arr) {
                if (res[key]["elementName"] === "broaden_your_search") {
                  var content = "";
                  if (lang === "EN" || lang === undefined)
                    content = res[key]["content"];
                  else {
                    if (lang === "AR") {
                      $("body").addClass("right-to-left");
                    }
                    content = res[key]["content_" + lang];
                  }
                  $(".no-results p").html(content);
                }
              });
            },
          });
        }
      },
      complete: function () {
        smoothScroll();
        $("body").removeClass("loading");
        var lang = Cookies.get("language");
        $.ajax({
          url: apiDomain + "/PageContent/GetPageContents?pageName=search",
          type: "GET",
          dataType: "json",
          success: function (res) {
            $.each(res, function (key, arr) {
              if (res[key]["elementName"] === "message") {
                var content = "";
                if (lang === "EN" || lang === undefined)
                  content = res[key]["content"];
                else {
                  if (lang === "AR") {
                    $("body").addClass("right-to-left");
                  }
                  content = res[key]["content_" + lang];
                }
                $(".contacts .column a[data-popup='message']").html(content);
              }
              if (res[key]["elementName"] === "share") {
                if (lang === "EN" || lang === undefined)
                  content = res[key]["content"];
                else {
                  if (lang === "AR") {
                    $("body").addClass("right-to-left");
                  }
                  content = res[key]["content_" + lang];
                }
                $(".contacts .column a[data-popup='refer']").html(content);
              }
              if (res[key]["elementName"] === "pro_plus") {
                if (lang === "EN" || lang === undefined)
                  content = res[key]["content"];
                else {
                  if (lang === "AR") {
                    $("body").addClass("right-to-left");
                  }
                  content = res[key]["content_" + lang];
                }
                if ($(".item-image .status").text() === "Pro Plus")
                  $(".item-image .status").html(content);
              }
              if (res[key]["elementName"] === "pro") {
                if (lang === "EN" || lang === undefined)
                  content = res[key]["content"];
                else {
                  if (lang === "AR") {
                    $("body").addClass("right-to-left");
                  }
                  content = res[key]["content_" + lang];
                }
                if ($(".item-image .status").text() === "Pro")
                  $(".item-image .status").html(content);
              }
              if (res[key]["elementName"] === "premium") {
                if (lang === "EN" || lang === undefined)
                  content = res[key]["content"];
                else {
                  if (lang === "AR") {
                    $("body").addClass("right-to-left");
                  }
                  content = res[key]["content_" + lang];
                }
                if ($(".item-image .status").text() === "Premium")
                  $(".item-image .status").html(content);
              }
              // if (res[key]['elementName'] === 'compare') {
              //     if (lang === "EN" || lang === undefined) {
              //         var checkbox = res[key]['content'];
              //     } else {
              //         if (lang === "AR") {
              //             $("body").addClass("right-to-left")
              //         }
              //         checkbox = res[key]['content_' + lang];
              //     }
              //     $(".share-search.compare").html(content);
              //     $(".search-checkbox").html(checkbox);
              // }
            });
          },
        });
      },
    });
  });

  //Single profile - Preview profile in Account Dashboard
  if ($("section").hasClass("single-page-profile")) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var id = urlParams.get("id");
    if (document.referrer.indexOf("search.html") > -1) {
      $(".breadcrumbs li")
        .eq(1)
        .find("a")
        .attr("href", "javascript:history.back()");
    }
    $.ajax({
      url: apiDomain + "/Attorney/" + id,
      type: "GET",
      dataType: "json",
      success: function (res) {
        // console.log("preview in account dashboard", res);
        if (res["similarAttorneys"] && res["similarAttorneys"].length > 0) {
          var similar = res["similarAttorneys"];
          var similarLayout =
            '<div class="related-profiles">' +
            "<h2>Similar Lawyers</h2>" +
            '<div class="results-people">';
          $.each(similar, function (key, arr) {
            var simName =
              '<p class="name">' + similar[key]["fullName"] + "</p>";
            var company = "";
            if (similar[key]["professionalInfo"]["company"]) {
              company =
                '<p class="place">' +
                similar[key]["professionalInfo"]["company"] +
                "</p>";
            } else {
              company = "";
            }
            var id = similar[key]["id"];
            var image = "";
            if (similar[key]["profile"]) {
              if (similar[key]["profile"]["pictureUrl"]) {
                image = similar[key]["profile"]["pictureUrl"];
              } else {
                image = "images/user.png";
              }
            } else {
              image = "images/user.png";
            }
            var message = "";
            if (similar[key]["contactInfo"]["emailAddress"]) {
              message =
                '<div class="column">\n' +
                '    <span class="icon-email"></span>\n' +
                '    <a href="#" class="popup-opener" data-popup="message">Message</a>\n' +
                "</div>\n";
            }
            var phone = "";
            if (similar[key]["contactInfo"]["workPhoneNumber"]) {
              phone =
                '<div class="column">\n' +
                '<span class="icon-phone"></span>' +
                '<a href="tel:' +
                similar[key]["contactInfo"]["workPhoneNumber"] +
                '">' +
                similar[key]["contactInfo"]["workPhoneNumber"] +
                "</a>" +
                "</div>";
            }
            var attorneyType = similar[key]["attorneyType"];
            var type = "";
            var link = "";
            if (attorneyType === "Pro") {
              type = "pro";
              link = "-pro";
            } else if (attorneyType === "ProPlus") {
              attorneyType = "Pro Plus";
              type = "pro-plus";
              link = "";
            } else if (attorneyType === "Premium") {
              type = "premium";
              link = "-premium";
            } else if (attorneyType === "Undefined" || attorneyType === "Unclaimed") {
              type = "unclaimed";
              link = "-unclaim";
            }
            var tags = [];
            if (similar[key]["professionalInfo"]) {
              $.each(
                similar[key]["professionalInfo"]["practiceAreas"],
                function (pkey, parr) {
                  if (
                    similar[key]["professionalInfo"]["practiceAreas"][pkey] !==
                    "None Reported By Attorney"
                  ) {
                    tags.push(
                      "<span>" +
                        similar[key]["professionalInfo"]["practiceAreas"][
                          pkey
                        ] +
                        "</span>"
                    );
                  }
                }
              );
              tags = tags.join("");
            }
            similarLayout +=
              '<div class="results-people__item ' +
              type +
              '" data-link="profile' +
              link +
              ".html?id=" +
              id +
              '">\n' +
              '                        <div class="item-top">\n' +
              '                            <div class="item-image">\n' +
              '                                <img src="' +
              image +
              '" class="circle-image" alt="">\n' +
              '                                <span class="status">' +
              attorneyType +
              "</span>\n" +
              "                            </div>\n" +
              '                            <div class="item-info">\n' +
              simName +
              company +
              '                                <div class="tags">\n' +
              tags +
              "                                </div>\n" +
              '                                <div class="contacts">\n' +
              message +
              phone +
              '                                    <div class="column">\n' +
              '                                        <span class="icon-link"></span>\n' +
              '                                        <a href="#" class="popup-opener" data-popup="refer">Share</a>\n' +
              "                                    </div>\n" +
              "                                </div>\n" +
              "                            </div>\n" +
              "                        </div>\n" +
              '                        <div class="mobile-info">\n' +
              '                            <p class="description">Big firm experience; small firm prices.</p>\n' +
              '                            <div class="tags">\n' +
              "                                <span>Financial Services</span>\n" +
              "                                <span>Trusts</span>\n" +
              "                                <span>Discrimination</span>\n" +
              "                            </div>\n" +
              '                            <div class="contacts">\n' +
              '                                <div class="column">\n' +
              '                                    <span class="icon-email"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="message">Message</a>\n' +
              "                                </div>\n" +
              phone +
              '                                <div class="column">\n' +
              '                                    <span class="icon-link"></span>\n' +
              '                                    <a href="#" class="popup-opener" data-popup="refer">Share</a>\n' +
              "                                </div>\n" +
              "                            </div>\n" +
              "                        </div>\n" +
              "                    </div>";
          });
          similarLayout += "</div></div>";
        } else {
          similarLayout = "";
        }

        var id = res["id"];
        var imageP = "";
        if (res["profile"]) {
          if (res["profile"]["pictureUrl"]) {
            imageP = res["profile"]["pictureUrl"];
          } else {
            imageP = "images/user.png";
          }
        } else {
          imageP = "images/user.png";
        }
        var middleName = "";
        if (res["middleName"] !== undefined || res["middleName"] !== null) {
          middleName = " " + res["middleName"];
        }
        var name = `${res["firstName"]} ${res["middleName"]} ${res["lastName"]}`;
        var fullName = res["fullName"];
        var company = "";
        if (
          res["professionalInfo"] &&
          res["professionalInfo"]["company"] !== null
        ) {
          company = res["professionalInfo"]["company"];
        } else {
          company = "";
        }
        var address = "";
        if (res["address"]) {
          address = res["address"]["fullAddress"];
        } else {
          address = "";
        }
        var phoneSingle = res["contactInfo"]["workPhoneNumber"];
        if (phoneSingle) {
          phoneSingle =
            '<a href="tel:' +
            phoneSingle +
            '"><span class="icon-phone"></span>' +
            phoneSingle +
            "</a>";
        }

        var headline = "";
        if (res["profile"]) { 
          if (res["profile"]["headline"] != "") {
            headline =
              '<div class="review"><p>' +
              res["profile"]["headline"] +
              "</p></div>";
          }
        }

        var accepted = res["acceptingNewClients"];
        if (accepted === false) {
          accepted = '<p class="not-accept">Not accepting clients</p>';
        } else {
          accepted = "";
        }
        var attorneyType = res["attorneyType"];
        var tags = [];
        var specialities = [];
        var languages = [];
        var languagesHtmlStr = '';
        var ethnic = [];
        var ethnicHtmlStr = '';
        var keywords = [];
        $.each(res["keywords"], function (pkey, parr) {
          keywords.push(res["keywords"][pkey]);
        });
        keywords = keywords.join(" ");
        if (keywords.length > 0) {
          keywords =
            '<div class="info-block">\n' +
            '                        <h3>Keywords <span class="dotted"></span></h3>\n' +
            '                        <p class="description">' +
            keywords +
            "</p>\n" +
            "                    </div>";
        }

        /* Begin for social wrap configuration */
        var socials = [];
        if (res["socialMediaLinks"].length != 0) {
          res["socialMediaLinks"].forEach((element) => {
            if (element.url !== "undefined") {
              if (element.type == "Facebook") {
                socials.push(
                  '<a href="' +
                    element.url +
                    '" target="_blank"><span class="icon-fb"></span></a>'
                );
              } else if (element.type == "LinkedIn") {
                socials.push(
                  '<a href="' +
                    element.url +
                    '" target="_blank"><span class="icon-linkedin"></span></a>'
                );
              } else if (element.type == "Twitter") {
                socials.push(
                  '<a href="' +
                    element.url +
                    '" target="_blank"><span class="icon-twitter"></span></a>'
                );
              } else if (element.type == "Instagram") {
                socials.push(
                  '<a href="' +
                    element.url +
                    '" target="_blank"><span class="icon-inst"></span></a>'
                );
              }
            }
          });
          socials = socials.join("");
          if (socials.length > 0) {
            socials =
              ' <div class="info-block">\n' +
              '                        <h3>Social media <span class="dotted"></span></h3>\n' +
              '                        <div class="social">' +
              socials +
              "</div>" +
              "</div>";
          }
        } else {
          socials = "";
        }
        /* End for social wrap configuration */

        $.each(res["professionalInfo"]["practiceAreas"], function (pkey, parr) {
          tags.push(
            "<span>" +
              res["professionalInfo"]["practiceAreas"][pkey] +
              "</span>"
          );
        });
        tags = tags.join("");
        if (tags.length > 0) {
          tags =
            '<div class="info-block">\n' +
            '                        <h3>Practice Area <span class="dotted"></span></h3>\n' +
            '                        <div class="tags">\n' +
            tags +
            "                        </div>\n" +
            "                    </div>";
        }
        $.each(res["professionalInfo"]["legalIssues"], function (pkey, parr) {
          specialities.push(
            "<span>" + res["professionalInfo"]["legalIssues"][pkey] + "</span>"
          );
        });
        specialities = specialities.join("");
        if (specialities.length > 0) {
          specialities =
            '<div class="info-block">\n' +
            '                        <h3>Specialty <span class="dotted"></span></h3>\n' +
            '                        <div class="tags">\n' +
            specialities +
            "                        </div>\n" +
            "                    </div>";
        }
        if (res["biographicalInfo"]) {
          if (res["biographicalInfo"]["languages"]) {
            $.each(res["biographicalInfo"]["languages"], function (pkey, parr) {
              languages.push(
                "<span>" + res["biographicalInfo"]["languages"][pkey] + "</span>"
              );
            });
            languages = languages.join("");
          }
          if (languages.length > 0) {
            languagesHtmlStr =
              '<div class="info-block">\n' +
              '             <h3>Languages <span class="dotted"></span></h3>\n' +
              '             <div class="tags">\n' +
              languages +
              "                 </div>" +
              "             </div>";
          }
  
          if (res["biographicalInfo"]["ethnicities"]) {
            $.each(res["biographicalInfo"]["ethnicities"], function (pkey, parr) {
              ethnic.push(
                "<span>" +
                  res["biographicalInfo"]["ethnicities"][pkey] +
                  "</span>"
              );
            });
            ethnic = ethnic.join("");
          }
          if (ethnic.length > 0) {
            ethnicHtmlStr =
              '                    <div class="info-block">\n' +
              '                        <h3>Culture, Heritage & Experience <span class="dotted"></span></h3>\n' +
              '                        <div class="tags">\n' +
              ethnic +
              "                        </div>\n" +
              "                    </div>\n";
          }
          
        }
        var phone = "";
        if (res["contactInfo"]["workPhoneNumber"]) {
          phone = `
            <div class="contact-row">
              <span class="icon-phone"></span>
                <a href="tel:${res['contactInfo']['workPhoneNumber']}" onclick="event.stopPropagation();" style="color: #212529;">
                  ${res['contactInfo']['workPhoneNumber']}
                </a>
            </div>
          `;
        }
        var websiteUrl = "";
        if (res["contactInfo"]["websiteUrl"]) {
          websiteUrl = `
            <div class="contact-row">
              <span class="icon-link"></span>
              <p>
                <a href='${res["contactInfo"]["websiteUrl"]}' target='_blank' style="color: #212529;">
                  ${res['contactInfo']['websiteUrl'].split('/')[res['contactInfo']['websiteUrl'].split('/').length - 1]}
                </a>
              </p>
            </div>
          `;
        }

        var email = "";
        if (res["contactInfo"]["emailAddress"]) {
          email =
            ' <div class="contact-row">\n' +
            '              <span class="icon-email"></span>\n' +
            "              <p>" +
            res["contactInfo"]["emailAddress"] +
            "</p>\n" +
            "         </div>";
        } else {
          email = "";
        }
        var fax = "";
        if (res["contactInfo"]["faxNumber"]) {
          fax =
            '<div class="contact-row">\n' +
            '           <span class="icon-fax-g"></span>\n' +
            "           <p>" +
            res["contactInfo"]["faxNumber"] +
            "</p>\n" +
            "      </div>\n";
        } else {
          fax = "";
        }
        var education = "";
        if (res["educationalInfo"]){
          if (res["educationalInfo"]["lawSchool"]) {
            education =
              '<div class="info-block">\n' +
              '                        <h3>Education <span class="dotted"></span></h3>\n' +
              '                        <div class="tags">\n' +
              "                            <span>" +
              res["educationalInfo"]["lawSchool"] +
              "</span>" +
              "                        </div>\n" +
              "                    </div>";
          } else {
            education = "";
          }
        }
        var about = "";
        if (res["profile"]) {
          if (res["profile"]["about"]) {
            about =
              '<h3>About <span class="dotted"></span></h3><p class="description">' +
              res["profile"]["about"] +
              "</p>";
          } else {
            about = "";
          }
        } else {
          about = "";
        }

        var license = [];

        $.each(res["licenses"], function (pkey, parr) {
          if (res["licenses"][pkey]["date"]) {
            var licenseDate = res["licenses"][pkey]["date"].substr(0, 4);
            license.push(
              "<span >" +
                res["licenses"][pkey]["state"] +
                ", " +
                licenseDate +
                "</span>"
            );
          }
        });

        license.join("");
        if (license.length > 0) {
          license =
            '<div class="info-block">\n' +
            '         <h3>License <span class="dotted"></span></h3>\n' +
            '             <div class="tags">\n' +
            license +
            "             </div>" +
            "      </div>";
        }

        var profileMessageStr = "";
        if (res['contactInfo']['emailAddress']) {
          profileMessageStr = `
            <a href="#" class="popup-opener" data-popup="message" data-image='${imageP}' data-attorney='${id}' data-name='${fullName}'>
              <span class="icon-email"></span>
              Message
            </a>
          `;
        }

        // Preview Profile on Account Dashboard
        if (attorneyType === "Unclaimed") {
          $(".profile__info")
            .prepend(
              '<h2 class="name">' +
                fullName +
                "</h2>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                tags +
                specialities +
                education +
                license +
                '                    <div class="info-block">\n' +
                '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                '                        <div class="contact-row">\n' +
                '                            <span class="icon-location-g"></span>\n' +
                "                            <p>" +
                address +
                "</p>\n" +
                "                        </div>\n" +
                phone +
                websiteUrl +
                fax +
                "                    </div>"
            )
            .hide()
            .fadeIn();
          $(".profile-wrapper .profile__image").prepend(
            '<img src="' +
              imageP +
              '" class="circle-image" alt="">\n' +
              '                    <span class="status">Not Active on DiversePro</span>\n' +
              '                    <div class="contacts">\n' +
              profileMessageStr +
              phoneSingle +
              '                        <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              fullName +
              '"><span class="icon-link"></span>Share</a>\n' +
              "                    </div>\n" +
              '                    <p class="claim-profile">Is this your profile? <a href="#" class="claim-btn" data-id="' +
              id +
              '">Claim your profile</a></p>'
          );
          $(".breadcrumbs .active a").text(fullName);
          $(".profile-wrapper").after(similarLayout);
        } else if (attorneyType === "Pro") {
          $(".profile").addClass("pro");
          $(".profile__info")
            .prepend(
              '<h2 class="name">' +
              fullName +
                "</h2>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                '                    <div class="info-block">\n' +
                about +
                "                    </div>\n" +
                tags +
                specialities +
                ethnicHtmlStr +
                languagesHtmlStr +
                education +
                license +
                '                    <div class="info-block">\n' +
                '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                '                        <div class="contact-row">\n' +
                '                           <span class="icon-location-g"></span>\n' +
                "                           <p>" +
                                              address +
                "                           </p>\n" +
                "                        </div>\n" +
                phone +
                websiteUrl +
                fax +
                "                    </div>"
            )
            .hide()
            .fadeIn();
          $(".profile-wrapper .profile__image").prepend(
            '<img src="' +
              imageP +
              '" class="circle-image" alt="">\n' +
              '                    <span class="status">' +
              attorneyType +
              "</span>\n" +
              '                    <div class="contacts">\n' +
              profileMessageStr +
              phoneSingle +
              '                        <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              fullName +
              '"><span class="icon-link"></span>Share</a>\n' +
              "                    </div>\n" +
              accepted
          );
          $(".breadcrumbs .active a").text(fullName);
          $(".profile-wrapper").after(similarLayout);
        } else if (attorneyType === "ProPlus") {
          $(".profile").addClass("pro-plus");
          attorneyType = "Pro&nbsp;Plus";
          $(".profile__info")
            .prepend(
              '<h2 class="name">' +
              fullName +
                "</h2>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                headline +
                '                    <div class="info-block">\n' +
                about +
                "                    </div>\n" +
                tags +
                specialities +
                ethnicHtmlStr +
                languagesHtmlStr +
                education +
                license +
                '                    <div class="info-block">\n' +
                '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                '                        <div class="contact-row">\n' +
                '                            <span class="icon-location-g"></span>\n' +
                "                            <p>" +
                address +
                "</p>\n" +
                "                        </div>\n" +
                phone +
                websiteUrl +
                fax +
                socials +
                "                    </div>"
            )
            .hide()
            .fadeIn();
          $(".profile-wrapper .profile__image").prepend(
            '<img src="' +
              imageP +
              '" class="circle-image" alt="">\n' +
              '                    <span class="status">' +
              attorneyType +
              "</span>\n" +
              '                    <div class="contacts">\n' +
              profileMessageStr +
              phoneSingle +
              '                        <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              fullName +
              '"><span class="icon-link"></span>Share</a>\n' +
              "                    </div>\n" +
              accepted
          );
          $(".breadcrumbs .active a").text(fullName);
          $(".profile-wrapper").after(similarLayout);
        } else {
          // display media data
          let previewLeftShowMedia = "";
          let previewRightShowMedia = "";
          let previewLeftShowMediaStr = "";
          let previewRightShowMediaStr = "";
          if (res.albumItems.length != 0) {
            res.albumItems.forEach((element) => {
              const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(
                element.photoVideoUrl
              );
              if (!isImage) {
                previewLeftShowMedia += `
                  <div class="col-xs-3 media-items">
                    <a data-fancybox="bigbuckbunny1" href=${element.photoVideoUrl} style="display: flex;">
                      <div class="video-item">
                        <video width="91px" height="44px">
                          <source src=${element.photoVideoUrl}></source>
                        </video>
                      </div>
                    </a>
                  </div>
                `;
                previewRightShowMedia += `
                  <div class="col-xs-3 media-items">
                    <a data-fancybox="bigbuckbunny2" href=${element.photoVideoUrl} style="display: flex;">
                      <div class="video-item">
                        <video width="91px" height="44px">
                          <source src=${element.photoVideoUrl}></source>
                        </video>
                      </div>
                    </a>
                  </div>
                `;
              } else {
                previewLeftShowMedia += `
                  <div class="col-xs-3 media-items">
                    <a class="d-block" data-fancybox="bigbuckbunny1" href=${element.photoVideoUrl}>
                      <img
                        class="media-img"
                        src=${element.photoVideoUrl}
                      />
                    </a>
                  </div>
                `;
                previewRightShowMedia += `
                  <div class="col-xs-3 media-items">
                    <a class="d-block" data-fancybox="bigbuckbunny2" href=${element.photoVideoUrl}>
                      <img
                        class="media-img"
                        src=${element.photoVideoUrl}
                      />
                    </a>
                  </div>
                `;
              }
            });
            previewLeftShowMediaStr = "<div class='row media-data-wrapper'>" +
                                        previewLeftShowMedia +
                                      "</div>";
            previewRightShowMediaStr = '<div class="info-block">\n' +
                                      '                        <h3>Photos\n' +
                                      '                            <span class="dotted"></span>\n' +
                                      '                        </h3>\n' +
                                      '                        <div class="premium-container">\n' +
                                      '                            <div class="row">\n' +
                                                                    previewRightShowMedia +
                                      '                            </div>\n' +
                                      '                        </div>\n' +
                                      '                    </div>\n';
          }

          $(".profile, .profile-wrapper").addClass("premium");
          $(".profile__info")
            .prepend(
              '<h2 class="name">' +
              fullName +
                "</h2>\n" +
                '                    <p class="place">' +
                company +
                "</p>\n" +
                headline +
                '                    <div class="info-block">\n' +
                about +
                "                    </div>\n" +
                tags +
                specialities +
                ethnicHtmlStr +
                languagesHtmlStr +
                education +
                license +
                '                    <div class="info-block">\n' +
                '                        <h3>Contact <span class="dotted"></span></h3>\n' +
                '                        <div class="contact-row">\n' +
                '                            <span class="icon-location-g"></span>\n' +
                "                            <p>" +
                address +
                "</p>\n" +
                "                        </div>\n" +
                phone +
                websiteUrl +
                fax +
                "                    </div>" +
                previewRightShowMediaStr +
                keywords +
                socials
            )
            .hide()
            .fadeIn();

          $(".profile-wrapper .profile__image").prepend(
            '<img src="' +
              imageP +
              '" class="circle-image" alt="">\n' +
              '                    <span class="status">' +
              attorneyType +
              "</span>\n" +
              previewLeftShowMediaStr +
              '                    <div class="contacts">\n' +
              profileMessageStr +
              phoneSingle +
              '                        <a href="#" class="popup-opener" data-popup="refer" data-image="' +
              imageP +
              '" data-attorney="' +
              id +
              '" data-name="' +
              fullName +
              '"><span class="icon-link"></span>Share</a>\n' +
              "                    </div>\n" +
              accepted
          );
          $(".breadcrumbs .active a").text(fullName);
        }
        $(".icon-phone + p").text(function (i, text) {
          return text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        });
        if ($(".profile__image .contacts a").length > 2) {
          $(".profile__image .contacts a:nth-child(2)").html(
            '<span class="icon-phone"></span>' +
              $(".profile__image .contacts a:nth-child(2)")
                .text()
                .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
          );
        }
      },
    });
  }

  //Share search results
  $("#share-results .profile-form").on("submit", function (e) {
    e.preventDefault();
    var response = grecaptcha.getResponse(3);
    if (response.length !== 0) {
      var toEmail = $("#share-rec").val();
      var fromEmail = $("#share-email").val();
      var subject = $("#share-subject").val();
      var message = $("#share-message").val();
      var queryString = window.location.href;
      var urlParams = new URLSearchParams(queryString);
      $.ajax({
        type: "POST",
        url: apiDomain + "/Communication/Compare",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          fromName: "name",
          toEmailAddress: toEmail,
          fromEmailAddress: fromEmail,
          subject: subject,
          message: message,
          url: queryString,
        }),
        success: function () {
          $("#share-results").attr("hidden", true);
          $("#share-success").attr("hidden", false);
        },
      });
    } else {
      if (!$("#recaptchaError-share").text()) {
        $("#recaptchaError-share").append(
          "You must complete the verification in order to proceed."
        );
      }
    }
  });

  $("#cancel-sub .btn-primary").on("click", function (e) {
    e.preventDefault();
    var token = Cookies.get("token");
    var attorneyId = Cookies.get("attorneyId");
    $.ajax({
      type: "PUT",
      url:
        apiDomain +
        "/Attorney/CancelAttorneySubscription?payload=" +
        attorneyId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      success: function () {
        Cookies.set("attorneyPlan", "Pro");
        // Cookies.remove("planId");
        // Cookies.remove("planName");
        // Cookies.remove("productId");
        window.location.reload();
      },
    });
  });
  //CPAA
  $(document).on("change", "#request, #request2", function () {
    if ($("#request").is(":checked")) {
      $(".step1 .form-group:nth-child(2)").fadeIn();
      $(".step1 .form-group:nth-child(2) h4").text(
        "I affirm that I am a California resident as defined by Section 17014 of Title 18 of the California Code of Regulations."
      );
    } else if ($("#request2").is(":checked")) {
      $(".step1 .form-group:nth-child(2)").fadeIn();
      $(".step1 .form-group:nth-child(2) h4").text(
        "I affirm that I am an authorized representative of a California resident as defined by Section 17014 of Title 18 of the California Code of Regulations."
      );
    }
  });

  $(document).on("submit", ".cpaa-form.step1", function (e) {
    e.preventDefault();
    smoothScroll();

    if ($("#request").is(":checked") && $("#resident").is(":checked")) {
      $(".cpaa-form.step1").fadeOut();
      $(".phone-format")
        .toArray()
        .forEach(function (field) {
          new Cleave(field, {
            numericOnly: true,
            blocks: [0, 3, 0, 3, 4],
            delimiters: ["(", ")", " ", "-"],
          });
        });
      $(".step2-block").fadeIn();
      $(".cpaa-form.step2").attr("data-cpaa", "myself");
    } else if ($("#request2").is(":checked") && $("#resident").is(":checked")) {
      $(".cpaa-form.step1").fadeOut();
      $(".phone-format")
        .toArray()
        .forEach(function (field) {
          new Cleave(field, {
            numericOnly: true,
            blocks: [0, 3, 0, 3, 4],
            delimiters: ["(", ")", " ", "-"],
          });
        });
      $(".step2-block").fadeIn();
      $(".cpaa-form.step2").attr("data-cpaa", "anonymous");
    } else if ($("#request").is(":checked") && $("#resident2").is(":checked")) {
      $("#cpaa-myself-not-resident").attr("hidden", false);
    } else {
      $("#cpaa-not-resident").attr("hidden", false);
    }
  });

  $(document).on("submit", ".cpaa-form.step2", function (e) {
    e.preventDefault();
    var firstName = $("#firstname").val();
    var middleName = $("#middlename").val();
    var lastName = $("#lastname").val();
    var address = $("#address").val();
    var suite = $("#suite").val();
    var city = $("#city").val();
    var states = $("#state").val();
    var zips = $("#zip").val();
    var comment = $("#comment").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    if ($(this).attr("data-cpaa", "myself")) {
      var token = Cookies.get("token");
      // var attorneyId = Cookies.get('attorneyId');
      $.ajax({
        url: apiDomain + "/CPAA/AnonymousCreateCPAA",
        type: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        dataType: "json",
        data: JSON.stringify({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          addressLine1: address,
          addressLine2: suite,
          city: city,
          state: states,
          zip: zips,
          workPhone: phone,
          email: email,
          comments: comment,
        }),
        success: function () {
          $("#cpaa-success").attr("hidden", false);
        },
      });
    } else {
      $.ajax({
        url: apiDomain + "/CPAA/AnonymousCreateCPAA",
        type: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        dataType: "json",
        data: JSON.stringify({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          addressLine1: address,
          addressLine2: suite,
          city: city,
          state: states,
          zip: zips,
          workPhone: phone,
          email: email,
          comments: comment,
        }),
        success: function () {
          $("#cpaa-success").attr("hidden", false);
        },
      });
    }
  });

  //Practices
  if ($("section").hasClass("practices")) {
    var city = Cookies.get("city");
    if (!city) {
      city = "";
    }
    $.ajax({
      url: apiDomain + "/Lookup/PracticeAreasSpecialities?total=9999&lang=en",
      type: "GET",
      dataType: "json",
      success: function (res) {
        var item = "";
        var letter = "A";
        var i = 0;
        $.each(res, function (pkey, parr) {
          if (i === 0) {
            item += "<h4>A</h4>";
          }
          if (res[pkey]["practiceArea"].slice(0, 1) !== letter) {
            letter = res[pkey]["practiceArea"].slice(0, 1);
            item += "<h4>" + letter + "</h4>";
          }
          item +=
            '<h5><a href="/search.html?practiceArea=' +
            res[pkey]["practiceArea"].replace(/&/g, "%26") +
            "&location=" +
            city +
            '&page=1">' +
            res[pkey]["practiceArea"] +
            "</a></h5><ul>";
          $.each(res[pkey]["specialities"], function (key, arr) {
            item +=
              '<li><a href="/search.html?speciality=' +
              res[pkey]["specialities"][key].replace(/&/g, "%26") +
              "&location=" +
              city +
              '&page=1">' +
              res[pkey]["specialities"][key] +
              "</a></li>";
          });
          item += "</ul>";
          i++;
        });
        $(".practices-block").prepend(item);
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/PracticeAreas?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $(".practices-search").append(
            $("<option></option>")
              .attr("value", data[key])
              .attr("data-pr-or-sp", "pr")
              .text(data[key])
          );
        });
      },
    });
    $.ajax({
      type: "GET",
      url: apiDomain + "/Lookup/Specialities?total=9999",
      success: function (data) {
        $.each(data, function (key, arr) {
          $(".practices-search").append(
            $("<option></option>")
              .attr("value", data[key])
              .attr("data-pr-or-sp", "sp")
              .text(data[key])
          );
        });
      },
    });
  }

  //Reset password
  $(".reset-password .reset-form").on("submit", function (e) {
    e.preventDefault();
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var popup = urlParams.get("popup");
    var token = urlParams.get("code");
    var email = urlParams.get("email");
    var password = $("#password").val();
    if (popup === "open") {
      $.ajax({
        type: "POST",
        url: apiDomain + "/ResetPassword",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email: email,
          password: password,
          token: token,
        }),
        success: function () {
          window.open("sign-in.html", "_self");
        },
      });
    }
  });

  if ($("section").hasClass("acc-pay")) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var plan = urlParams.get("plan");

    var token = Cookies.get("token");
    var attorneyId = Cookies.get("attorneyId");
    var planId = Cookies.get("planId");
    var planName = Cookies.get("planName");
    var productId = Cookies.get("productId");
    var state = Cookies.get("state");
    $("#bilstate").val(state).change();
    var price = "";
    if (plan === "ProPlus") {
      price = "24.99";
    } else if (plan === "Premium") {
      price = "49.99";
    }
    paypal_sdk
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            $.ajax({
              type: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              url: apiDomain + "/Attorney/UpdateAttorneySubscriptionInfo",
              data: JSON.stringify({
                attorneyId: attorneyId,
                subscriptionName: planName,
                planId: planId,
                productId: productId,
              }),
              success: function () {
                Cookies.set("attorneyPlan", plan);
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
                window.open("account-main.html", "_self");
              },
            });
          });
        },
      })
      .render("#paypal-button-container");
  }
});
