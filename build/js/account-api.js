$(document).ready(function () {
  checkCookie();

  // production api
  // var apiDomain = "https://api.diversepro.com";
  // dev api
  var apiDomain = "https://localhost:44383";
  var coupon_id = null;

  //Account Main
  if ($("section").hasClass("acc-m")) {
    var attorneyId = Cookies.get("attorneyId");
    var emailConfirmed = Cookies.get("emailConfirmed");
    if (emailConfirmed === "true") {
      $(".verify-email").remove();
    }
    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          if(res.length != 0) {
            Cookies.set("state", res.address.state);
          }
          var firstName = res["firstName"];
          var attorneyType = res["attorneyType"];
          var profilePage = "";
          if (attorneyType === "Pro") {
            profilePage = "account-update-pro.html";
          } else if (attorneyType === "ProPlus") {
            profilePage = "account-update-plus.html";
          } else if (attorneyType === "Premium") {
            profilePage = "account-update-premium.html";
          }
          $("#profile").attr("href", profilePage);
          $("#preview").attr("href", "account-preview.html?id=" + attorneyId);
          $(".account-main-wrapper h2 span").text(firstName);
        },
      });
    } else {
      window.open("/sign-in.html", "_self");
    }
  }

  //Account Plans
  if ($("section").hasClass("acc-pl")) {
    var attorneyId = Cookies.get("attorneyId");
    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          var attorneyType = res["attorneyType"];
          if (attorneyType === "Pro") {
            $(".plan__item.pro .btn")
              .attr("data-sub", "current")
              .text("Current");
            $(".cancel-subscription .popup-opener").hide();
          } else if (attorneyType === "ProPlus") {
            $(".plan__item.pro").hide();
            $(".plan__item.pro-plus .btn")
              .attr("data-sub", "current")
              .text("Current");
            $(".plan__item.pro-plus .btn").removeAttr("data-link");
          } else if (attorneyType === "Premium") {
            $(".plan__item.pro, .plan__item.pro-plus").hide();
            $(".plan__item.premium .btn")
              .attr("data-sub", "current")
              .text("Current");
            $(".plan__item.premium .btn").removeAttr("data-link");
          }
        },
      });
    } else {
      window.open("/sign-in.html", "_self");
    }
  }

  $(document).on(
    "click",
    ".acc-pl .plan__item-bottom button, .acc-up .plan__item-bottom button",
    function (e) {
      e.preventDefault();
      var link = $(this).attr("data-link");
      var plan = $(this).attr("data-plan");
      var token = Cookies.get("token");
      if (link) {
        $.ajax({
          type: "GET",
          url: apiDomain + "/Lookup/Plans",
          beforeSend: function () {
            $("body").addClass("loading");
          },
          success: function (data) {
            if (plan === "premium") {
              var planId = data[0]["id"];
              var planName = data[0]["name"];
              var productId = data[0]["product"]["id"];
            } else if (plan === "pro-plus") {
              planId = data[1]["id"];
              planName = data[1]["name"];
              productId = data[1]["product"]["id"];
            } else if (plan === "pro") {
              planId = data[2]["id"];
              planName = data[2]["name"];
              productId = data[2]["product"]["id"];
            }
            Cookies.set("planId", planId);
            Cookies.set("planName", planName);
            Cookies.set("productId", productId);
            $("body").removeClass("loading");
            location.href = link;
            // $.ajax({
            //     type: "PUT",
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'application/json',
            //       Authorization: 'Bearer ' + token
            //     },
            //     url: apiDomain + '/Attorney/UpdateAttorneySubscriptionInfo',
            //     data: JSON.stringify({
            //         "attorneyId": attorneyId,
            //         "subscriptionName": planName,
            //         "planId": planId,
            //         "productId": productId
            //     }),
            //     success: function () {
            //         $("body").removeClass("loading");
            //         location.href = link;
            //     }
            // });
          },
        });
      } else {}
    }
  );

  //Account image
  if ($("header").hasClass("header-logged")) {
    var attorneyId = Cookies.get("attorneyId");
    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          if (res["profile"]) {
            if (res["profile"]["pictureUrl"]) {
              $(".btn-logged img").attr("src", res["profile"]["pictureUrl"]);
            }
          }
        },
      });
    }
  }
  //profile in account dashboard
  if ($("section").hasClass("acc-up")) {
    var attorneyId = Cookies.get("attorneyId");
    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          // console.log("-----------account/profile page:", res);
          var headline = "";
          var about = "";
          var accepted = "";
          var pictureUrl = "images/user.png";
          if (res["profile"]) {
            about = res["profile"]["about"];
            accepted = res["acceptingNewClients"];
            if (
              res["profile"]["headline"] &&
              res["profile"]["headline"] !== "undefined"
            ) {
              headline = res["profile"]["headline"];
            } else {
              headline = "";
            }
            if (res["profile"]["pictureUrl"]) {
              pictureUrl = res["profile"]["pictureUrl"];
            } else {
              pictureUrl = "images/user.png";
            }
          }
          var websiteUrl = "";
          if (res['contactInfo']) {
            if (res['contactInfo']['websiteUrl']) {
              websiteUrl = res['contactInfo']['websiteUrl'].split('/')[res['contactInfo']['websiteUrl'].split('/').length - 1];
            }
          }
          var keywords = [];

          if (res["keywords"]) {
            $.each(res["keywords"], function (pkey, parr) {
              keywords.push(res["keywords"][pkey]);
            });

            $.each(keywords, function (key, arr) {
              $(".keywords-selected").append(
                $("<option selected></option>")
                .attr("value", keywords[key])
                .text(keywords[key])
              );
            });
          }
          var facebook = "";
          var linkedin = "";
          var twitter = "";
          var instagram = "";
          if (res["socialMediaLinks"].length) {
            res["socialMediaLinks"].forEach(element => {
              if(element.type == "Instagram") instagram = element.url.split('/')[element.url.split('/').length-1];
              else if(element.type == "Facebook") facebook = element.url.split('/')[element.url.split('/').length-1];
              else if(element.type == "LinkedIn") linkedin = element.url.split('/')[element.url.split('/').length-1];
              else if(element.type == "Twitter") twitter = element.url.split('/')[element.url.split('/').length-1];
            });
          }
          $("#about").val(about);
          $("#website-link").val(websiteUrl);
          $("#headline").val(headline);
          $("#facebook").val(facebook);
          $("#linkedIn").val(linkedin);
          $("#twitter").val(twitter);
          $("#instagram").val(instagram);
          $(".upload-photo img").attr("src", pictureUrl);
          $(".keywords-selected").val(keywords);

          let showMedia = "";
          res.albumItems.forEach((element) => {
            const isImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(
              element.photoVideoUrl
            );
            if (!isImage) {
              showMedia += `
                <div class="col-xs-3 media-items" id="media-item-${element.id}">
                  <a data-fancybox="bigbuckbunny" href=${element.photoVideoUrl} style="display: flex;">
                    <div class="video-item">
                      <video width="91px" height="44px">
                        <source src=${element.photoVideoUrl}></source>
                      </video>
                    </div>
                  </a>
                  <img class="icon-close" src="http://i.imgur.com/22GcIF7.png" onClick="removeMedia('${element.id}')" />
                </div>
              `;
            } else {
              showMedia += `
                <div class="col-xs-3 media-items" id="media-item-${element.id}">
                  <a class="d-block" data-fancybox="bigbuckbunny" href=${element.photoVideoUrl}>
                    <img
                      class="media-img"
                      src=${element.photoVideoUrl}
                    />
                  </a>
                  <img class="icon-close" src="http://i.imgur.com/22GcIF7.png" onClick="removeMedia('${element.id}')" />
                </div>
              `;
            }
          });
          $("#premium-dropzone").before(`<div class="row" style="margin: 0">${showMedia}</div>`);
          
          if (accepted) {
            $("#styled-checkbox-10").attr("checked", "checked");
          } else {
            $("#styled-checkbox-10").removeAttr("checked");
          }
          calculateSymbols();
          keywordSelect2($(".keywords-selected"));
        },
      });
    } else {
      window.open("/sign-in.html", "_self");
    }
  }

  var albumIdList = [];

  this.removeMedia = function (id) {
    // console.log(id);
    albumIdList.push(id);
    $(`#media-item-${id}`).hide();
  }

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

  $(document).on("change", ".file-inputs", function () {
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

  //Submit profile upon subscription upgrade
  $(document).on("submit", ".acc-up .from-step8", function (e) {
    e.preventDefault();
    var formData = new Object();
    var formData2 = new Object();
    var plan = $(".acc-up").attr("data-plan");
    var attorneyPlan = Cookies.get("attorneyPlan");
    var attorneyId = Cookies.get("attorneyId");
    var token = Cookies.get("token");
    var about = "";
    if ($("#about").length) {
      about = $("#about").val();
    }
    var websiteUrl = "";
    if ($("#website-link").val().length != 0) {
      websiteUrl = 'https://' + $("#website-link").val();
    }
    var headline = "";
    if ($("#headline").length) {
      headline = $("#headline").val();
    }
    var facebook = "";
    var linkedin = "";
    var instagram = "";
    var twitter = "";
    if ($("#facebook").length && $("#facebook").val().length) {
      facebook = 'https://facebook.com/' + $("#facebook").val();
    }
    if ($("#linkedIn").length && $("#linkedIn").val().length) {
      linkedin = 'https://linkedin.com/in/' + $("#linkedIn").val();
    }
    if ($("#instagram").length && $("#instagram").val().length) {
      instagram = 'https://instagram.com/' + $("#instagram").val();
    }
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
    if (plan == "Premium") {
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
      formData['albumItems'] = albumItems;
    }
    if ($(".file-inputs").val()) {
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
          // formData.append("pictureUrl", "");
          formData['pictureUrl'] = "";
          // profile image
          // formData.append("imageData", resp);
          // formData.append("attorneyId", attorneyId);
          // formData.append("about", about);
          formData['imageData'] = resp;
          formData['attorneyId'] = attorneyId;
          formData['about'] = about;
          formData['websiteUrl'] = websiteUrl;
          if (plan != "Pro") {
            // formData.append("headline", headline);
            // formData.append("facebookUrl", facebook);
            // formData.append("linkedInUrl", linkedin);
            // formData.append("instagramUrl", instagram);
            // formData.append("twitterUrl", twitter);
            formData['headline'] = headline;
            formData['facebookUrl'] = facebook;
            formData['linkedInUrl'] = linkedin;
            formData['instagramUrl'] = instagram;
            formData['twitterUrl'] = twitter;
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
                var attorneyId = Cookies.get("attorneyId");

                $.ajax({
                  type: "PUT",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                  },
                  dataType: "json",
                  url: apiDomain +
                    "/Attorney/UpdateAttorneyAcceptingNewClients?attorneyId=" +
                    attorneyId +
                    "&AcceptingNewClients=" +
                    accepted,
                  success: function () {
                    var attorneyId = Cookies.get("attorneyId");
                    $("body").removeClass("loading");

                    if(plan === "Premium" && albumIdList.length !== 0) {
                      // remove the following albums
                      formData2['attorneyId'] = attorneyId;
                      formData2['albumItemIds'] = albumIdList;
                      $.ajax({
                        type: "DELETE",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + token,
                        },
                        dataType: "json",
                        data: JSON.stringify(formData2),
                        url: apiDomain +
                        "/Attorney/DeleteAlbumItem",
                        success: function () {
                          console.log("The album items are removed successfully!")
                        }
                      });
                    }
                    
                    if (plan !== attorneyPlan) {
                      if (attorneyPlan === "Pro" && plan === "ProPlus")
                        location.href = "account-payment.html?plan=ProPlus";
                      else if (
                        (attorneyPlan === "Pro" || attorneyPlan === "ProPlus") &&
                        plan === "Premium"
                      )
                        location.href = "account-payment.html?plan=Premium";
                    } else {
                      if (plan === "Premium") {
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
                              window.open("account-main.html", "_self");
                            },
                          });
                        } else {
                          window.open("account-main.html", "_self");
                        }
                      } else {
                        window.open("account-main.html", "_self");
                      }
                    }
                  },
                });
              },
            });
          }, 100);
        });
    } else {
      // Select the image
      var profileImage = $("#uploadedImage").attr("src");
      formData['imageData'] = '';
      formData['pictureUrl'] = '';
      formData['attorneyId'] = attorneyId;
      formData['about'] = about;
      formData['websiteUrl'] = websiteUrl;

      if (plan != "Pro") {
        formData['headline'] = headline;
        formData['facebookUrl'] = facebook;
        formData['linkedInUrl'] = linkedin;
        formData['instagramUrl'] = instagram;
        formData['twitterUrl'] = twitter;
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
            // alert()
            var attorneyId = Cookies.get("attorneyId");
            $.ajax({
              type: "PUT",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
              dataType: "json",
              url: apiDomain +
                "/Attorney/UpdateAttorneyAcceptingNewClients?attorneyId=" +
                attorneyId +
                "&AcceptingNewClients=" +
                accepted,
              success: function () {
                $("body").removeClass("loading");
                if(plan === "Premium" && albumIdList.length !== 0) {
                  // remove the following albums
                  formData2['attorneyId'] = attorneyId;
                  formData2['albumItemIds'] = albumIdList;
                  $.ajax({
                    type: "DELETE",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token,
                    },
                    dataType: "json",
                    data: JSON.stringify(formData2),
                    url: apiDomain +
                    "/Attorney/DeleteAlbumItem",
                    success: function () {
                      console.log("The album items are removed successfully!")
                    }
                  });
                }
                if (plan !== attorneyPlan) {
                  if (attorneyPlan === "Pro" && plan === "ProPlus")
                    location.href = "account-payment.html?plan=ProPlus";
                  else if (
                    (attorneyPlan === "Pro" || attorneyPlan === "ProPlus") &&
                    plan === "Premium"
                  ) {
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
                        success: function (res) {
                          location.href = "account-payment.html?plan=Premium";
                        },
                      });
                    } else {
                      location.href = "account-payment.html?plan=Premium";
                    }
                  }
                } else {
                  if (plan === "Premium") {
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
                          window.open("account-main.html", "_self");
                        },
                      });
                    } else {
                      window.open("account-main.html", "_self");
                    }
                  } else {
                    window.open("account-main.html", "_self");
                  }
                }
              },
            });
          },
        });
      }, 100);
    }
  });

  // subscription cost object

  //Account payment
  if ($("section").hasClass("acc-pay")) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var query = urlParams.get("edit");
    var plan = urlParams.get("plan");
    var token = Cookies.get("token");
    var planId = Cookies.get("planId");
    var state = Cookies.get("state");
    if (plan === "Premium") {
      var price = 49.99 * 12;
    } else if (plan === "ProPlus") {
      price = 24.99 * 12;
    } else {
      $(".total-price, .cost-price, .tax-price").hide();
    }
    $.ajax({
      type: "GET",
      url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&PlanId=" + planId + "&State=" + state,
      success: function (res) {
        console.log("--------", res);
        var subscriptionUpgradeCost = res['subscriptionCost'];
        var tax = res["taxAmount"];
        var totalAmount = res["totalAmount"];
        // $(".cost-price span").html(Number.parseFloat(price).toFixed(2));
        // $(".tax-price span").html(Number.parseFloat(tax).toFixed(2));
        // $(".total-price span").html(
        //   (Number.parseFloat(price) + Number.parseFloat(tax)).toFixed(2)
        // );
        $(".cost-price span").html(Number.parseFloat(subscriptionUpgradeCost).toFixed(2));
        $(".tax-price span").html(Number.parseFloat(tax).toFixed(2));
        $(".total-price span").html(Number.parseFloat(totalAmount).toFixed(2));
      },
    });

    if (query === "true") {
      var attorneyId = Cookies.get("attorneyId");
      if (attorneyId) {
        $.ajax({
          type: "GET",
          url: apiDomain + "/Attorney/" + attorneyId,
          success: function (res) {
            // console.log("-------", res)
            if(res['subscriptionInfo'] != null) {
              var lastDigits = res["subscriptionInfo"]["last4Digits"];
              if (lastDigits) {
                $("#cardnumber").val("**** **** **** " + lastDigits);
              } else {
                $("#cardnumber").val("**** **** **** ****");
              }
            }
          },
        });
      } else {
        window.open("/sign-in.html", "_self");
      }
    }
  }

  /*
  *
  *   Payment upon a upgrade  (onChange event for the state field)
  *
  */

 $(document).on("change", ".account-contact .pci #bilstate", function (e) {
    var state = $(this).val();
    Cookies.set("state", state);
    var attorneyId = Cookies.get("attorneyId");
    var planId = Cookies.get("planId");
    var url = coupon_id != null ? apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state + "&coupon=" + coupon_id : apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&planId=" + planId + "&state=" + state;
    $.ajax({
      type: "GET",
      url: url,
      beforeSend: function () {
        $("body").addClass("loading");
      },
      success: function (res) {
        // console.log("change state:", res);
        $("body").removeClass("loading");
        var tax = res["taxAmount"];
        var total = res["totalAmount"];
        $(".account-contact .pci .tax-price span").text(Number.parseFloat(tax).toFixed(2));
        $(".account-contact .pci .total-price span").text(Number.parseFloat(total).toFixed(2));
      }
    });
 });
 
  $(document).on("submit", ".account-contact .pci", function (e) {
    e.preventDefault();
    smoothScroll();
    // console.log("coupon_id", coupon_id);
    var token = Cookies.get("token");
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var plan = urlParams.get("plan");
    var attorneyId = Cookies.get("attorneyId");
    var planId = Cookies.get("planId");
    var planName = Cookies.get("planName");
    var productId = Cookies.get("productId");
    var cvc = '';
    var number = '';
    var exp = '';
    var city = '';
    var states = '';
    var zips = '';
    var name = '';
    var address = '';
    var suite = '';
    var groupCode = '';
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
      groupCode = $("#groupCode").val();
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
        couponId: coupon_id,
        groupCode: groupCode,
      }),
      beforeSend: function () {
        $("body").addClass("loading");
      },
      success: function () {
        console.log("ok");
        $("#success-payment").attr("hidden", false);
        $("#success-payment").attr("data-plan", plan);
        Cookies.set("attorneyPlan", plan);
      },
      complete: function () {
        $("body").removeClass("loading");
      },
    });
  });

  //Account credentials
  $(document).on("submit", ".acc-cr form", function (e) {
    e.preventDefault();
    location.href = "account-main.html";
  });

  if ($("section").hasClass("acc-cr")) {
    $("#username").val(Cookies.get("userName"));
  }
  //Account update username
  $(document).on("click", ".change.username", function (e) {
    e.preventDefault();
    var token = Cookies.get("token");
    var username = $("#username").val();
    if (username.length >= 8) {
      $.ajax({
        type: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        url: apiDomain + "/ChangeUsername?Username=" + username,
        success: function () {
          $("#success-username").attr("hidden", false);
        },
        error: function () {
          $("#username").addClass("busy");
        },
      });
    } else {
      $("#username + .tooltip-info p").addClass("active");
    }
  });

  $(document).on("submit", "#success-username .thank-you", function (e) {
    e.preventDefault();
    alert("Now you will be redirected to the Login page");
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("attorneyId");
    Cookies.remove("attorneyPlan");
    Cookies.remove("emailConfirmed");
    window.open("/sign-in.html", "_self");
  });

  //Account update password
  $(document).on("click", ".change.password", function (e) {
    e.preventDefault();
    var token = Cookies.get("token");
    var oldPassword = $("#old-password").val();
    var newPassword = $("#new-password").val();
    if (oldPassword.length >= 8 && newPassword.length >= 8) {
      // console.log("---", oldPassword, newPassword)
      $.ajax({
        type: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        url: apiDomain +
          "/ChangePassword?OldPassword=" +
          encodeURIComponent(oldPassword) +
          "&NewPassword=" +
          encodeURIComponent(newPassword) +
          "&CompareNewPassword=" +
          encodeURIComponent(newPassword),
        success: function () {
          $("#success-password").attr("hidden", false);
        },
        error: function () {
          $("#password").addClass("busy");
        },
      });
    } else {
      $("#new-password + .toggle-password + .tooltip-info p").addClass(
        "active"
      );
    }
  });

  $(document).on("submit", "#success-password .thank-you", function (e) {
    e.preventDefault();
    alert("Now you will be redirected to the Login page");
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("attorneyId");
    Cookies.remove("attorneyPlan");
    Cookies.remove("emailConfirmed");
    window.open("/sign-in.html", "_self");
  });

  // $(document).on("submit", "#success-password .thank-you",  function (e) {
  //     e.preventDefault();
  //     $("#success-password").attr("hidden", true)
  // });

  // Account update username & password
  $(document).on("click", ".btn-change-username-pwd", function (e) {
    e.preventDefault();
    var token = Cookies.get("token");
    var username = $("#username").val();
    var oldPassword = $("#old-password").val();
    var newPassword = $("#new-password").val();

    if (
      username.length >= 8 &&
      oldPassword.length >= 8 &&
      newPassword.length >= 8
    ) {
      $.ajax({
        type: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        url: apiDomain +
          "/ChangeUsernameAndPassword?Username=" +
          username +
          "&OldPassword=" +
          oldPassword +
          "&NewPassword=" +
          newPassword +
          "&CompareNewPassword=" +
          newPassword,
        success: function () {
          $("#success-username-password").attr("hidden", false);
        },
        error: function () {
          $(".password").addClass("busy");
        },
      });
    } else if (username.length < 8) {
      $("#username + .tooltip-info p").addClass("active");
    } else if (oldPassword.length < 8 || newPassword.length < 8) {
      $("#new-password + .toggle-password + .tooltip-info p").addClass(
        "active"
      );
    } else {}
  });

  $(document).on("submit", "#success-username-password .thank-you", function (
    e
  ) {
    e.preventDefault();
    alert("Now you will be redirected to the Login page");
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("attorneyId");
    Cookies.remove("attorneyPlan");
    Cookies.remove("emailConfirmed");
    window.open("/sign-in.html", "_self");
  });

  //Account contact
  if ($("section").hasClass("acc-ct")) {
    var attorneyId = Cookies.get("attorneyId");

    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          var firstName = res["firstName"];
          var lastName = res["lastName"];
          var middleName = res["middleName"];
          var maidenName = res["maidenName"];
          var company = res["professionalInfo"]["company"];
          var address = res["address"]["address1"];
          var suite = res["address"]["address2"];
          var city = res["address"]["city"];
          var states = res["address"]["state"];
          var zips = res["address"]["zip"];
          var workPhone = res["contactInfo"]["workPhoneNumber"];
          var mobilePhone = res["contactInfo"]["mobilePhoneNumber"];
          var homePhone = res["contactInfo"]["homePhoneNumber"];
          var fax = res["contactInfo"]["faxNumber"];
          var email = res["contactInfo"]["emailAddress"];

          firstName = firstName != null ? res["firstName"] : "";
          lastName = lastName !== null ? res["lastName"] : "";
          middleName = middleName !== null ? res["middleName"] : "";
          maidenName = maidenName !== null ? res["maidenName"] : "";
          company = company !== null ? res["professionalInfo"]["company"] : "";
          address = address !== null ? res["address"]["address1"] : "";
          suite = suite !== null ? res["address"]["address2"] : "";
          city = city !== null ? res["address"]["city"] : "";
          states = states !== null ? res["address"]["state"] : "";
          zips = zips !== null ? res["address"]["zip"] : "";
          workPhone =
            workPhone !== null ? res["contactInfo"]["workPhoneNumber"] : "";
          mobilePhone =
            mobilePhone !== null ? res["contactInfo"]["mobilePhoneNumber"] : "";
          homePhone =
            homePhone !== null ? res["contactInfo"]["homePhoneNumber"] : "";
          fax = fax !== null ? res["contactInfo"]["faxNumber"] : "";
          email = email !== null ? res["contactInfo"]["emailAddress"] : "";

          $("#firstname").val(firstName);
          $("#lastname").val(lastName);
          $("#middlename").val(middleName);
          $("#maidenname").val(maidenName);
          $("#company").val(company);
          $("#address").val(address);
          $("#suite").val(suite);
          $("#city").val(city);
          $("#states").val(states).change();
          $("#zips").val(zips);
          $("#fax").val(fax);
          $("#workphone").val(workPhone);
          $("#mobilephone").val(mobilePhone);
          $("#homephone").val(homePhone);
          $("#email").val(email);
          var emailCookies = Cookies.set("email", email);
          $(".phone-format")
            .toArray()
            .forEach(function (field) {
              new Cleave(field, {
                numericOnly: true,
                blocks: [0, 3, 0, 3, 4],
                delimiters: ["(", ")", " ", "-"],
              });
            });
        },
      });
    } else {
      window.open("/sign-in.html", "_self");
    }
  }

  //Submit account contact
  $(document).on("submit", ".acc-ct .account-contact-form", function (e) {
    e.preventDefault();

    var token = Cookies.get("token");
    var attorneyId = Cookies.get("attorneyId");

    var firstName = $(this).find("#firstname").val();
    var lastName = $(this).find("#lastname").val();
    var middleName = $(this).find("#middlename").val();
    var maidenName = $(this).find("#maidenname").val();
    var company = $(this).find("#company").val();
    var address = $(this).find("#address").val();
    var suite = $(this).find("#suite").val();
    var city = $(this).find("#city").val();
    var states = $(this).find("#states").val();
    var zips = $(this).find("#zips").val();
    var wPhone = $(this).find("#workphone").val();
    var homePhone = $(this).find("#homephone").val();
    var mobilePhone = $(this).find("#mobilephone").val();
    var fax = $(this).find("#fax").val();
    var email = $(this).find("#email").val();
    if (email !== Cookies.get("email")) {
      $.ajax({
        type: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        url: apiDomain + "/ChangeEmail?EmailAddress=" + email,
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
              mobilePhone: mobilePhone,
              fax: fax,
              email: email,
            }),
            success: function () {
              location.href = "account-main.html";
            },
          });
        },
        error: function () {
          $("#email").addClass("busy");
        },
        complete: function () {
          alert("Now you will be redirected to the Login page");
          Cookies.remove("token");
          Cookies.remove("userName");
          Cookies.remove("attorneyId");
          Cookies.remove("attorneyPlan");
          Cookies.remove("emailConfirmed");
          window.open("/sign-in.html", "_self");
        },
      });
    } else {
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
          mobilePhone: mobilePhone,
          fax: fax,
          email: email,
        }),
        success: function () {
          location.href = "account-main.html";
        },
      });
    }
  });

  //Submit account categories
  $(document).on("click", ".acc-cat .reg-demographic .btn-primary", function (e) {
    e.preventDefault();
    if (
      $("#styled-checkbox-3").is(":checked") &&
      $("#categories option:selected").length !== 0
    ) {
      var token = Cookies.get("token");
      var attorneyId = Cookies.get("attorneyId");
      var categories = $("#categories").val();
      var languages = $("#languages").val();

      let genderValue = '';
      if ($("#radio-woman").is(':checked')) {
        genderValue = 'woman';
      } else if ($("#radio-man").is(':checked')) {
        genderValue = 'man';
      } else if ($("#radio-other").is(':checked')) {
        genderValue = 'other';
      }

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
          gender: genderValue
        }),
        success: function () {
          location.href = "account-main.html";
        },
      });
    } else if (
      $("#categories option:selected").length !== 0 &&
      !$("#styled-checkbox-3").is(":checked")
    ) {
      if (!$(".need-check").length) {
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
      if (!$(".need-check").length) {
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

  // Fill in dropdowns
  if ($("section").hasClass("acc-cat")) {
    var attorneyId = Cookies.get("attorneyId");
    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          var languages = [];
          var categories = [];
          var gender = "";
          if (res["biographicalInfo"]) {
            languages = res["biographicalInfo"]["languages"] != null ? res["biographicalInfo"]["languages"] : [];
            categories = res["biographicalInfo"]["ethnicities"] != null ? res["biographicalInfo"]["ethnicities"] : [];
            gender = res["biographicalInfo"]["gender"];
          }

          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/Languages?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                if(data[key] != "Not Listed"){
                  if (languages.length != 0) {
                    if(languages.includes(data[key])) {
                      $("#languages").append(
                        $("<option selected></option>")
                        .attr("value", data[key])
                        .text(data[key])
                      );
                    } else {
                      $("#languages").append(
                        $("<option></option>")
                        .attr("value", data[key])
                        .text(data[key])
                      );
                    }
                  } else {
                    $("#languages").append(
                      $("<option></option>")
                      .attr("value", data[key])
                      .text(data[key])
                    );
                  }
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
                if (categories.length != 0) {
                  if (categories.includes(optionValue)) {
                    $("#categories").append(
                      $("<option selected></option>")
                      .attr("value", optionValue)
                      .text(data[key])
                    );
                  } else {
                    $("#categories").append(
                      $("<option></option>")
                      .attr("value", optionValue)
                      .text(data[key])
                    );
                  }
                } else {
                  $("#categories").append(
                    $("<option></option>")
                    .attr("value", optionValue)
                    .text(data[key])
                  );
                }
              });
            },
          });

          if (gender == "woman") $("#radio-woman").prop('checked', true);
          else if (gender == "man") $("#radio-man").prop('checked', true);
          else if (gender == "other") $("#radio-other").prop('checked', true);

        },
      });
      initRegSelect2($(".reg-demographic-selected"));
      initRegSelect3($(".reg-lang-selected"));
    } else {
      window.open("/sign-in.html", "_self");
    }
  }

  if ($("section").hasClass("acc-pr")) {
    var attorneyId = Cookies.get("attorneyId");
    if (attorneyId) {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/" + attorneyId,
        success: function (res) {
          if (res["educationalInfo"] && res["professionalInfo"]) {
            var lawSchool = res["educationalInfo"]["lawSchool"];
            var college = res["educationalInfo"]["college"];
            var practiceArea = res["professionalInfo"]["practiceAreas"];
            var specialities = res["professionalInfo"]["legalIssues"];
            var other = res["educationalInfo"]["other"];
          } else {
            lawSchool = "";
            college = "";
            practiceArea = "";
            specialities = "";
            other = "";
          }
          var licenses = res["licenses"];
          var licensesCount = res["licenses"].length;

          for (var i = 0; i < licensesCount; i++) {
            $(".licensedstate")
              .eq(i)
              .val(licenses[i]["state"])
              .trigger("change");
            $(".licenseddate")
              .eq(i)
              .val(licenses[i]["date"].slice(0, -9))
              .trigger("change");
            $(".licensenumber").eq(i).val(licenses[i]["number"]);
            if (i < licensesCount - 1) $(".add-license").trigger("click");
          }

          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/LawSchools?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                if (data[key] === lawSchool) {
                  $("#lawschool").append(
                    $("<option selected></option>")
                    .attr("value", lawSchool)
                    .text(lawSchool)
                  );
                }
                $("#lawschool").append(
                  $("<option></option>")
                  .attr("value", data[key])
                  .text(data[key])
                );
              });
            },
          });
          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/Colleges?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                if (data[key] === college) {
                  $("#college").append(
                    $("<option selected></option>")
                    .attr("value", college)
                    .text(college)
                  );
                }
                $("#college").append(
                  $("<option></option>")
                  .attr("value", data[key])
                  .text(data[key])
                );
              });
            },
          });
          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/PracticeAreas?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                $.each(practiceArea, function (ckey, carr) {
                  if (data[key] === practiceArea[ckey]) {
                    $("#practiceareas").append(
                      $("<option selected></option>")
                      .attr("value", practiceArea[ckey])
                      .text(practiceArea[ckey])
                    );
                  } else {
                    $("#practiceareas").append(
                      $("<option></option>")
                      .attr("value", data[key])
                      .text(data[key])
                    );
                  }
                });
              });
            },
          });
          $.ajax({
            type: "GET",
            url: apiDomain + "/Lookup/Specialities?total=9999",
            success: function (data) {
              $.each(data, function (key, arr) {
                $.each(specialities, function (ckey, carr) {
                  if (data[key] === specialities[ckey]) {
                    $("#specialty").append(
                      $("<option selected></option>")
                      .attr("value", specialities[ckey])
                      .text(specialities[ckey])
                    );
                  } else {
                    $("#specialty").append(
                      $("<option></option>")
                      .attr("value", data[key])
                      .text(data[key])
                    );
                  }
                });
              });
            },
          });
          // $.ajax({
          //     type: "GET",
          //     url: apiDomain + '/Lookup/OtherEducations?total=9999',
          //     success: function (data) {
          //         $.each(data, function (key, arr) {
          //             if (data[key] === other) {
          //                 $("#othereducation").append($("<option selected></option>")
          //                     .attr("value", other)
          //                     .text(other));
          //             }
          //             $("#othereducation").append($("<option></option>")
          //                 .attr("value", data[key])
          //                 .text(data[key]));
          //         });
          //     }
          // });
        },
      });

      initSelect2($(".add-info-select"));
      initSelect3($(".three-select"));
      initSelect4($(".fifth-select"));
    } else {
      window.open("/sign-in.html", "_self");
    }
  }

  $(document).on("click", ".verify-email", function (e) {
    e.preventDefault();
    var attorneyId = Cookies.get("attorneyId");
    $.ajax({
      url: apiDomain + "/Attorney/" + attorneyId,
      type: "GET",
      dataType: "json",
      success: function (res) {
        var email = res["contactInfo"]["emailAddress"];
        $.ajax({
          type: "GET",
          url: apiDomain + "/SendEmailCode?EmailAddress=" + email,
          success: function () {
            $("#verification-email").attr("hidden", false);
            $("#verification-email .thank-you p span").text(email);
          },
        });
      },
    });
  });
  //Update professional info
  $(document).on("submit", ".acc-pr .from-step5", function (e) {
    e.preventDefault();

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
      success: function () {
        $("body").removeClass("loading");
        location.href = "account-main.html";
      },
    });
  });

  // Promo Code
  $(document).on('click', '#btn-apply-promocode', function(e) {
    var promoCode = $('#promoCode').val();
    if (promoCode != '') {
      $.ajax({
        type: "GET",
        url: apiDomain + "/Attorney/Coupon/" + promoCode,
        success: function (res) {
          console.log("!!!!!!!!!", res, attorneyId, planId, state);
          if(res != null && res.id) {
            $("#promoCode").removeClass("is-invalid");
            var promo_obj = res;
            var coupon_obj = promo_obj.coupon;
            coupon_id = coupon_obj.id;
            var attorneyId = Cookies.get("attorneyId");
            var state = Cookies.get("state");
            var planId = Cookies.get("planId");
            $.ajax({
              type: "GET",
              url: apiDomain + "/Attorney/GetSubscriptionCost?AttorneyId=" + attorneyId + "&PlanId=" + planId + "&State=" + state + "&Coupon=" + coupon_id,
              beforeSend: function () {
                $("body").addClass("loading");
              },
              success: function (res) {
                console.log("+++++", res);
                $("body").removeClass("loading");
                var subscriptionUpgradecost = Number.parseFloat(res['subscriptionCost'] - res['discountAmount']).toFixed(2);
                var subscriptionUpgradeCostHtml = res['discountAmount'] != 0 
                                                  ? `${subscriptionUpgradecost} <i><del>${res['subscriptionCost']}</del></i>`
                                                  : `${subscriptionUpgradecost}`;
                $(".cost-price span").html(subscriptionUpgradeCostHtml);
                $(".tax-price span").html(`${res['taxAmount']}`);
                $(".total-price span").html(`${res['totalAmount']}`);
              }
            });
          } else {
            $("#promoCode").addClass("is-invalid");
            setTimeout(() => {
              $("#promoCode").removeClass("is-invalid");
            }, 3000);
          }
        },
      });
    } else {
      $("#promoCode").addClass("is-invalid");
      setTimeout(() => {
        $("#promoCode").removeClass("is-invalid");
      }, 3000);
    }
  });
});