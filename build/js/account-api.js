$(document).ready(function () {
    checkCookie();
    var apiDomain = 'https://diversepro.api.creativeteam.io';

    //Account Main
    if($("section").hasClass("acc-m")) {
        var attorneyId = Cookies.get('attorneyId');
        var emailConfirmed = Cookies.get('emailConfirmed');
        if(emailConfirmed === 'true'){
            $(".verify-email").remove();
        }
        if(attorneyId) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    var firstName = res['firstName'];
                    var attorneyType = res['attorneyType'];

                    if (attorneyType === "Pro") {
                        var profilePage = "account-update-pro.html";
                    } else if (attorneyType === "ProPlus") {
                        var profilePage = "account-update-plus.html";
                    } else if (attorneyType === "Premium") {
                        var profilePage = "account-update-premium.html";
                    }
                    $("#profile").attr("href", profilePage);
                    $("#preview").attr("href", "account-preview.html?id=" + attorneyId);
                    $(".account-main-wrapper h2 span").text(firstName);
                }
            });
        }
        else{
            window.open("/sign-in.html", "_self")
        }
    }

    //Account Plans
    if($("section").hasClass("acc-pl")) {
        var attorneyId = Cookies.get('attorneyId');
        if(attorneyId) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    var attorneyType = res['attorneyType'];
                    if(attorneyType === "Pro"){
                        $(".plan__item.pro .btn").attr("data-sub", "current").text("Current");
                        $(".cancel-subscription .popup-opener").hide();
                    }
                    else if(attorneyType === "ProPlus"){
                        $(".plan__item.pro").hide();
                        $(".plan__item.pro-plus .btn").attr("data-sub", "current").text("Current");
                        $(".plan__item.pro-plus .btn").removeAttr("data-link");
                    }
                    else if(attorneyType === "Premium"){
                        $(".plan__item.pro, .plan__item.pro-plus").hide();
                        $(".plan__item.premium .btn").attr("data-sub", "current").text("Current");
                        $(".plan__item.premium .btn").removeAttr("data-link");
                    }
                }
            });
        }
        else{
            window.open("/sign-in.html", "_self")
        }
    }

    $(document).on("click", ".acc-pl .plan__item-bottom button, .acc-up .plan__item-bottom button", function (e) {
        e.preventDefault();
        var link = $(this).attr("data-link");
        var plan = $(this).attr("data-plan");
        var token = Cookies.get('token');
        if(link) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Lookup/Plans',
                beforeSend: function () {
                    $("body").addClass("loading")
                },
                success: function (data) {
                    if (plan === 'premium') {
                        var planId = data[0]['id'];
                        var planName = data[0]['name'];
                        var productId = data[0]['product']['id'];
                    } else if (plan === 'pro-plus') {
                        planId = data[1]['id'];
                        planName = data[1]['name'];
                        productId = data[1]['product']['id'];
                    } else if (plan === 'pro') {
                        planId = data[2]['id'];
                        planName = data[2]['name'];
                        productId = data[2]['product']['id'];
                    }
                    Cookies.set("planId", planId);
                    Cookies.set("planName", planName);
                    Cookies.set("productId", productId);
                    $("body").removeClass("loading");
                    location.href = link;
                    // $.ajax({
                    //     type: "PUT",
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json',
                    //         'Authorization': 'Bearer ' + token
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
                }
            });
        }
        else{

        }
    })

    //Account image
    if($("header").hasClass("header-logged")) {
        var attorneyId = Cookies.get('attorneyId');
        if(attorneyId) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    if(res['profile']){
                        if(res['profile']['pictureUrl']){
                            $(".btn-logged img").attr("src", res['profile']['pictureUrl']);
                        }
                    }
                }
            });
        }
    }
    //Account update profile
    if($("section").hasClass("acc-up")) {
        var attorneyId = Cookies.get('attorneyId');
        if(attorneyId) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    if(res['profile']) {
                        var about = res['profile']['about'];
                        if(res['profile']['headline'] && res['profile']['headline']!== 'undefined'){
                            var headline = res['profile']['headline']
                        }
                        else{
                            headline = "";
                        }
                        if(res['profile']['pictureUrl']) {
                            var pictureUrl = res['profile']['pictureUrl'];
                        }
                        else{
                            pictureUrl = "images/user.png";
                        }
                    }
                    var keywords = [];

                    if(res['keywords']) {
                        $.each(res['keywords'], function (pkey, parr) {
                            keywords.push(res['keywords'][pkey]);
                        });

                        $.each(keywords, function (key, arr) {

                            $(".keywords-selected").append($("<option selected></option>")
                                .attr("value", keywords[key])
                                .text(keywords[key]));
                        });
                    }
                    if(res['socialMediaLinks'].length) {
                        if(res['socialMediaLinks'][0] && res['socialMediaLinks'][0]['url']!== 'undefined' && res['socialMediaLinks'][0]['type'] === 'Facebook') {
                            var facebook = res['socialMediaLinks'][0]['url'];
                        }
                        else{
                            facebook = "";
                        }
                        if(res['socialMediaLinks'][1] && res['socialMediaLinks'][1]['url']!== 'undefined' && res['socialMediaLinks'][1]['type'] === 'LinkedIn') {
                            var linkedin = res['socialMediaLinks'][1]['url'];
                        }
                        else{
                            linkedin = "";
                        }
                        if(res['socialMediaLinks'][2] && res['socialMediaLinks'][2]['url']!== 'undefined' && res['socialMediaLinks'][2]['type'] === 'Twitter') {
                            var twitter = res['socialMediaLinks'][2]['url'];
                        }
                        else{
                            twitter = "";
                        }
                        if(res['socialMediaLinks'][3] && res['socialMediaLinks'][3]['url']!== 'undefined' && res['socialMediaLinks'][3]['type'] === 'Instagram') {
                            var instagram = res['socialMediaLinks'][3]['url'];
                        }
                        else{
                            instagram = "";
                        }
                    }


                    $("#about").val(about);
                    $("#headline").val(headline);
                    $("#facebook").val(facebook);
                    $("#linkedin").val(linkedin);
                    $("#twitter").val(twitter);
                    $("#instagram").val(instagram);
                    $(".upload-photo img").attr("src", pictureUrl);
                    $(".keywords-selected").val(keywords)
                    calculateSymbols();
                    keywordSelect2($('.keywords-selected'));
                }

            });
        }
        else{
            window.open("/sign-in.html", "_self")
        }
    }

    //Upload Image with crop
    var $uploadCrop;

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.upload-photo').addClass('ready');
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                }).then(function(){

                });
            };
            reader.readAsDataURL(input.files[0]);
        }
        else {
            swal("Sorry - you're browser doesn't support the FileReader API");
        }
    }

    $(document).on('change', '.file-inputs', function () {
        $uploadCrop = $('#upload-images').croppie({
            viewport: {
                width: 200,
                height: 200,
                type: 'circle'
            },
            boundary: {
                width: 200,
                height: 200
            },
            enableExif: true
        });

        readFile(this);
    });

    //Submit update profile
    $(document).on("submit", ".acc-up .from-step8", function (e) {
        e.preventDefault();
        var plan = $(".acc-up").attr("data-plan")
        var attorneyPlan = Cookies.get('attorneyPlan');
        var attorneyId = Cookies.get('attorneyId');
        var token = Cookies.get('token');
        if($("#about").length) {
            var about = $("#about").val();
        }
        if($("#headline").length) {
            var headline = $("#headline").val();
        }
        var pictureUrl = '';
        var profilePicture = '';

        if($("#facebook").length) {
            var facebook = $("#facebook").val()
        }
        if($("#linkedin").length) {
            var linkedin = $("#linkedin").val();
        }
        if($("#instagram").length) {
            var instagram = $("#instagram").val();
        }
        if($("#twitter").length) {
            var twitter = $("#twitter").val();
        }
        if($(".keywords-selected").length) {
            var keywords = $(".keywords-selected").val();
        }
        else{
            keywords = "";
        }
        if($(".file-inputs").val()) {
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport',
                format: 'jpeg'
            }).then(function (resp) {
                var formData = new FormData();
                formData.append('ProfilePicture', resp);
                formData.append('imageData', resp);
                formData.append('attorneyId', attorneyId);
                formData.append('about', about);
                formData.append('headline', headline);
                formData.append('facebookUrl', facebook);
                formData.append('linkedInUrl', linkedin);
                formData.append('instagramUrl', instagram);
                formData.append('twitterUrl', twitter);
                $.ajax({
                    type: "PUT",
                    enctype: 'multipart/form-data',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    url: apiDomain + '/Attorney/UpdateAttorneyProfile',
                    data: formData,
                    beforeSend: function () {
                        $("body").addClass("loading")
                    },
                    success: function () {
                        $("body").removeClass("loading")
                        if(plan!==attorneyPlan) {
                            if(attorneyPlan === 'Pro' && plan === 'ProPlus')
                                location.href = 'account-payment.html?plan=ProPlus';
                            else if((attorneyPlan === 'Pro' || attorneyPlan === 'ProPlus') && plan === 'Premium')
                                location.href = 'account-payment.html?plan=Premium';
                        }
                        else{
                            if(plan === 'Premium'){
                                if(keywords.length > 0) {
                                    $.ajax({
                                        type: "PUT",
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + token
                                        },
                                        url: apiDomain + '/Attorney/UpdateAttorneyKeywords',
                                        data: JSON.stringify({
                                            "attorneyId": attorneyId,
                                            "keywords": keywords
                                        }),
                                        success: function () {
                                            window.open('account-main.html', '_self');
                                        }
                                    });
                                }
                                else{
                                    window.open('account-main.html', '_self');
                                }
                            }
                            else{
                                window.open('account-main.html', '_self');
                            }
                        }
                    }
                });
            });
        }
        else{
            var image = $("#uploadedImage").attr("src");
            var formData = new FormData();
            // formData.append('ProfilePicture', image);
            formData.append('PictureUrl', image);
            formData.append('attorneyId', attorneyId);
            formData.append('about', about);
            formData.append('headline', headline);
            formData.append('facebookUrl', facebook);
            formData.append('linkedInUrl', linkedin);
            formData.append('instagramUrl', instagram);
            formData.append('twitterUrl', twitter);
            $.ajax({
                type: "PUT",
                enctype: 'multipart/form-data',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                processData: false,
                contentType: false,
                dataType: 'json',
                url: apiDomain + '/Attorney/UpdateAttorneyProfile',
                data: formData,
                beforeSend: function () {
                    $("body").addClass("loading")
                },
                success: function () {
                    $("body").removeClass("loading")
                    if(plan!==attorneyPlan) {
                        if(attorneyPlan === 'Pro' && plan === 'ProPlus')
                            location.href = 'account-payment.html?plan=ProPlus';
                        else if((attorneyPlan === 'Pro' || attorneyPlan === 'ProPlus') && plan === 'Premium')
                            location.href = 'account-payment.html?plan=Premium';
                    }
                    else{
                        if(plan === 'Premium'){
                            if(keywords.length > 0) {
                                $.ajax({
                                    type: "PUT",
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token
                                    },
                                    url: apiDomain + '/Attorney/UpdateAttorneyKeywords',
                                    data: JSON.stringify({
                                        "attorneyId": attorneyId,
                                        "keywords": keywords
                                    }),
                                    success: function () {
                                        window.open('account-main.html', '_self');
                                    }
                                });
                            }
                            else{
                                window.open('account-main.html', '_self');
                            }
                        }
                        else{
                            window.open('account-main.html', '_self');
                        }
                    }
                }
            });
        }
    });
//Account payment
    if($("section").hasClass("acc-pay")){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var query = urlParams.get('edit');
        var plan = urlParams.get('plan');
        var token = Cookies.get('token');
        if(plan === 'Premium'){
            var price = 49.99 * 12;
        }
        else if(plan === 'ProPlus'){
            price = 24.99 * 12;
        }
        else{
            $(".total-price, .cost-price, .tax-price").hide();
        }
        $.ajax({
            type: "GET",
            url: apiDomain + '/Attorney/GetSubscriptionCost?payload='+attorneyId,
            success: function (res) {
                var tax = res['taxAmount'];
                $(".cost-price span").html(price)
                $(".tax-price span").html(tax)
                $(".total-price span").html(parseFloat(tax) + parseFloat(price))
            }
        });

        if(query === 'true'){
            var attorneyId = Cookies.get('attorneyId');
            if(attorneyId) {
                $.ajax({
                    type: "GET",
                    url: apiDomain + '/Attorney/' + attorneyId,
                    success: function (res) {
                        var lastDigits = res['subscriptionInfo']['last4Digits'];
                        if(lastDigits){
                            $("#cardnumber").val("**** **** **** "+ lastDigits)
                        }
                        else{
                            $("#cardnumber").val("**** **** **** ****")
                        }
                    }
                });
            }
            else{
                window.open("/sign-in.html", "_self")
            }
        }
    }
    $(document).on('submit', '.account-contact .pci', function (e) {
        e.preventDefault();
        smoothScroll();


        var token = Cookies.get('token');
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var plan = urlParams.get('plan');
        var attorneyId = Cookies.get('attorneyId');
        var planId = Cookies.get("planId");
        var planName = Cookies.get("planName");
        var productId = Cookies.get("productId");
        if($("#visa").hasClass('active')){
            var cvc = $("#cvc").val();
            var number = $("#cardnumber").val();
            var exp = $("#expirationdate").val();
            var city = $("#bilcity").val();
            var states = $("#bilstate").val();
            var zips = $("#bilzip").val();
            var name = $("#cardholdername").val();
            var address = $("#biladdress").val();
            var suite = $("#bilsuite").val();
        }
        else if($("#paypal").hasClass('active')){
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            url: apiDomain + '/Attorney/UpdateAttorneySubscriptionWithPayment?AttorneyId='+attorneyId+'&PlanId='+planId+'&SubscriptionName='+planName+
                '&ProductId='+productId+'&cvc='+cvc+'&exp='+exp+'&number='+number+'&AddressLine1='+address+'&AddressLine2='+suite+
                '&City='+city+'&State='+states+'&Zip='+zips+'&Name='+name,
            beforeSend: function(){
                $("body").addClass("loading");
            },

            success: function () {
                var formData = new FormData();
                formData.append('AttorneyId', attorneyId);
                formData.append('SubscriptionName', planName);
                formData.append('PlanId', planId);
                formData.append('ProductId', productId);
                $.ajax({
                    type: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    url: apiDomain + '/Attorney/UpgradeAttorneySubscription?AttorneyId='+attorneyId+'&PlanId='+planId+'&SubscriptionName='+planName+
                        '&ProductId='+productId,
                    success: function () {
                        console.log('ok');
                        $("#success-payment").attr("hidden", false);
                        $("#success-payment").attr("data-plan", plan);
                        Cookies.set("attorneyPlan", plan);
                    },
                    complete: function () {
                        $("body").removeClass("loading");
                    }
                });
            }
        });
    });


    //Account credentials
    $(document).on("submit", ".acc-cr form", function (e) {
        e.preventDefault();
        location.href = 'account-main.html'
    });

    if($("section").hasClass("acc-cr")){
        $("#username").val(Cookies.get("userName"))
    }
    //Account update username
    $(document).on("click", ".change.username",  function (e) {
        e.preventDefault();
        var token = Cookies.get('token');
        var username = $("#username").val();
        if(username.length >= 8) {
            $.ajax({
                type: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                url: apiDomain + '/ChangeUsername?Username=' + username,
                success: function () {
                    $("#success-username").attr("hidden", false)

                },
                error: function () {
                    $("#username").addClass("busy");
                }
            });
        }
        else{
            $("#username + .tooltip-info p").addClass("active");
        }
    });

    $(document).on("submit", "#success-username .thank-you",  function (e) {
        e.preventDefault();
        alert("Now you will be redirected to the Login page");
        Cookies.remove('token');
        Cookies.remove('userName');
        Cookies.remove('attorneyId');
        Cookies.remove('attorneyPlan');
        Cookies.remove('emailConfirmed');
        window.open('/sign-in.html', "_self");
    });

    //Account update password
    $(document).on("click", ".change.password",  function (e) {
        e.preventDefault();
        var token = Cookies.get('token');
        var oldPassword = $("#old-password").val();
        var newPassword = $("#new-password").val();
        if(oldPassword.length >= 8 && newPassword.length >= 8) {
            $.ajax({
                type: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                url: apiDomain + '/ChangePassword?OldPassword=' + oldPassword + '&NewPassword=' + newPassword + '&CompareNewPassword=' + newPassword,
                success: function () {
                    $("#success-password").attr("hidden", false);
                },
                error: function () {
                    $("#password").addClass("busy");
                }
            });
        }
        else{
            $("#password + .tooltip-info p").addClass("active");
        }
    });

    // $(document).on("submit", "#success-password .thank-you",  function (e) {
    //     e.preventDefault();
    //     $("#success-password").attr("hidden", true)
    // });

    //Account contact
    if($("section").hasClass("acc-ct")){
        var attorneyId = Cookies.get('attorneyId');

        if(attorneyId) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    var firstName = res['firstName'];
                    var lastName = res['lastName'];
                    var middleName = res['middleName'];
                    var maidenName = res['maidenName'];
                    var company = res['professionalInfo']['company'];
                    var address = res['address']['address1'];
                    var suite = res['address']['address2'];
                    var city = res['address']['city'];
                    var states = res['address']['state'];
                    var zips = res['address']['zip'];
                    var workPhone = res['contactInfo']['workPhoneNumber'];
                    var mobilePhone = res['contactInfo']['mobilePhoneNumber'];
                    var homePhone = res['contactInfo']['homePhoneNumber'];
                    var fax = res['contactInfo']['faxNumber'];
                    var email = res['contactInfo']['emailAddress'];

                    firstName = (firstName != null) ? res['firstName'] : "";
                    lastName = (lastName !== null) ? res['lastName'] : "";
                    middleName = (middleName !== null) ? res['middleName'] : "";
                    maidenName = (maidenName !== null) ? res['maidenName'] : "";
                    company = (company !== null) ? res['professionalInfo']['company'] : "";
                    address = (address !== null) ? res['address']['address1'] : "";
                    suite = (suite !== null) ? res['address']['address2'] : "";
                    city = (city !== null) ? res['address']['city'] : "";
                    states = (states !== null) ? res['address']['state'] : "";
                    zips = (zips !== null) ? res['address']['zip'] : "";
                    workPhone = (workPhone !== null) ? res['contactInfo']['workPhoneNumber'] : "";
                    mobilePhone = (mobilePhone !== null) ? res['contactInfo']['mobilePhoneNumber'] : "";
                    homePhone = (homePhone !== null) ? res['contactInfo']['homePhoneNumber'] : "";
                    fax = (fax !== null) ? res['contactInfo']['faxNumber'] : "";
                    email = (email !== null) ? res['contactInfo']['emailAddress'] : "";

                    $("#firstname").val(firstName);
                    $("#lastname").val(lastName);
                    $("#middlename").val(middleName);
                    $("#maidenname").val(maidenName);
                    $("#company").val(company);
                    $("#address").val(address);
                    $("#suite").val(suite);
                    $("#city").val(city);
                    $("#states").val(states);
                    $("#zips").val(zips);
                    $("#fax").val(fax);
                    $("#workphone").val(workPhone);
                    $("#mobilephone").val(mobilePhone);
                    $("#homephone").val(homePhone);
                    $("#email").val(email);
                    var emailCookies = Cookies.set("email", email);
                    $('.phone-format').toArray().forEach(function(field){
                        new Cleave(field, {
                            numericOnly: true,
                            blocks: [0, 3, 0, 3, 4],
                            delimiters: ["(", ")", " ", "-"]
                        });
                    });
                }
            });

        }
        else{
            window.open("/sign-in.html", "_self")
        }
    }

    //Submit account contact
    $(document).on("submit", ".acc-ct .account-contact-form", function (e) {
        e.preventDefault();

        var token = Cookies.get("token");
        var attorneyId = Cookies.get('attorneyId');

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
        if(email!== Cookies.get("email")) {
            $.ajax({
                type: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                url: apiDomain + '/ChangeEmail?EmailAddress=' + email,
                success: function () {
                    $.ajax({
                        type: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        url: apiDomain + '/Attorney/UpdateAttorneyContactInfo',
                        data: JSON.stringify({
                            "attorneyId": attorneyId,
                            "firstName": firstName,
                            "middleName": middleName,
                            "maidenName": maidenName,
                            "lastName": lastName,
                            "company": company,
                            "addressLine1": address,
                            "addressLine2": suite,
                            "city": city,
                            "state": states,
                            "zip": zips,
                            "homePhone": homePhone,
                            "workPhone": wPhone,
                            "mobilePhone": mobilePhone,
                            "fax": fax,
                            "email": email
                        }),
                        success: function () {
                            location.href = 'account-main.html'
                        }
                    });
                },
                error: function () {
                    $("#email").addClass("busy")
                },
                complete: function () {
                    alert("Now you will be redirected to the Login page");
                    Cookies.remove('token');
                    Cookies.remove('userName');
                    Cookies.remove('attorneyId');
                    Cookies.remove('attorneyPlan');
                    Cookies.remove('emailConfirmed');
                    window.open('/sign-in.html', "_self");
                }
            });
        }
        else{
            $.ajax({
                type: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                url: apiDomain + '/Attorney/UpdateAttorneyContactInfo',
                data: JSON.stringify({
                    "attorneyId": attorneyId,
                    "firstName": firstName,
                    "middleName": middleName,
                    "maidenName": maidenName,
                    "lastName": lastName,
                    "company": company,
                    "addressLine1": address,
                    "addressLine2": suite,
                    "city": city,
                    "state": states,
                    "zip": zips,
                    "homePhone": homePhone,
                    "workPhone": wPhone,
                    "mobilePhone": mobilePhone,
                    "fax": fax,
                    "email": email
                }),
                success: function () {
                    location.href = 'account-main.html'
                }
            });
        }
    });

    //Submit account categories
    $(document).on("click", ".acc-cat .reg-demographic .btn-primary",  function (e) {
        e.preventDefault();
        if($("#styled-checkbox-3").is(':checked') && $("#categories option:selected").length !== 0) {
            var token = Cookies.get('token');
            var attorneyId = Cookies.get('attorneyId');
            var categories = $("#categories").val();
            var languages = $("#languages").val();
            $.ajax({
                type: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                url: apiDomain + '/Attorney/UpdateAttorneyBiographicalInfo',
                data: JSON.stringify({
                    "attorneyId": attorneyId,
                    "ethnicities": categories.join(),
                    "languages": languages.join()
                }),
                success: function () {
                    location.href = 'account-main.html'
                }
            });
        }
        else if($("#categories option:selected").length !== 0 && !$("#styled-checkbox-3").is(':checked')) {
            if (!$(".need-check").length) {
                $("#styled-checkbox-3").next().after('<p class="need-check">You must affirm that you meet DiversePro’s eligibility requirements.</p>')
            }
        }
        else if($("#styled-checkbox-3").is(':checked') && $("#categories option:selected").length===0){
            $("#categories + .select2 .reg-demographic-selected").addClass("empty-cat");
            setTimeout(function () {
                $("#categories + .select2 .reg-demographic-selected").removeClass("empty-cat");
            }, 4000)
        }
        else{
            if (!$(".need-check").length) {
                $("#styled-checkbox-3").next().after('<p class="need-check">You must affirm that you meet DiversePro’s eligibility requirements.</p>')
            }
            $("#categories + .select2 .reg-demographic-selected").addClass("empty-cat");
            setTimeout(function () {
                $("#categories + .select2 .reg-demographic-selected").removeClass("empty-cat");
            }, 4000)
        }
    });

    // Fill in dropdowns
    if($("section").hasClass("acc-cat")){
        var attorneyId = Cookies.get('attorneyId');
        if(attorneyId){
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    if(res['biographicalInfo']) {
                        var languages = res['biographicalInfo']['languages'];
                        var categories = res['biographicalInfo']['ethnicities'];
                    }
                    else{
                        languages = "";
                        categories = "";
                    }

                    $.ajax({
                        type: "GET",
                        url: apiDomain + '/Lookup/Languages?total=9999',
                        success: function (data) {
                            $.each(data, function (key, arr) {
                                $.each(languages, function (ckey, carr) {
                                    if (data[key] === languages[ckey]) {
                                        $("#languages").append($("<option selected></option>")
                                            .attr("value", languages[ckey])
                                            .text(languages[ckey]));
                                    }
                                });
                                $("#languages").append($("<option></option>")
                                    .attr("value",data[key])
                                    .text(data[key]));
                            });
                        }
                    });
                    $.ajax({
                        type: "GET",
                        url: apiDomain + '/Lookup/Demographics?total=9999',
                        success: function (data) {
                            $.each(data, function (key, arr) {
                                $.each(categories, function (ckey, carr) {
                                    if (data[key] === categories[ckey]) {
                                        $("#categories").append($("<option selected></option>")
                                            .attr("value", categories[ckey])
                                            .text(categories[ckey]));
                                    }
                                });

                                $("#categories").append($("<option></option>")
                                    .attr("value",data[key])
                                    .text(data[key]));
                            });
                        }
                    });
                    // $("#languages").val(languages);
                    // $("#categories").val(categories);
                    // console.log($("#languages").val())
                }
            });
            initRegSelect2($('.reg-demographic-selected'));
            initRegSelect3($('.reg-lang-selected'));
        }
        else{
            window.open("/sign-in.html", "_self")
        }
    }

    if($("section").hasClass("acc-pr")) {
        var attorneyId = Cookies.get('attorneyId');
        if(attorneyId) {
            $.ajax({
                type: "GET",
                url: apiDomain + '/Attorney/' + attorneyId,
                success: function (res) {
                    if(res['educationalInfo'] && res['professionalInfo']) {
                        var lawSchool = res['educationalInfo']['lawSchool'];
                        var college = res['educationalInfo']['college'];
                        var practiceArea = res['professionalInfo']['practiceAreas'];
                        var specialities = res['professionalInfo']['legalIssues'];
                        var other = res['educationalInfo']['other'];
                    }
                    else{
                        lawSchool = "";
                        college = "";
                        practiceArea = "";
                        specialities = "";
                        other = "";
                    }
                    var licenses = res['licenses'];
                    var licensesCount = res['licenses'].length;

                    for (var i = 0; i < licensesCount; i++) {
                        $('.licensedstate').eq(i).val(licenses[i]['state']).trigger('change');
                        $('.licenseddate').eq(i).val(licenses[i]['date'].slice(0, -9)).trigger('change');
                        $('.licensenumber').eq(i).val(licenses[i]['number']);
                        if(i<licensesCount - 1)
                            $(".add-license").trigger("click")
                    }

                    $.ajax({
                        type: "GET",
                        url: apiDomain + '/Lookup/LawSchools?total=9999',
                        success: function (data) {
                            $.each(data, function (key, arr) {
                                if (data[key] === lawSchool ) {
                                    $("#lawschool").append($("<option selected></option>")
                                        .attr("value", lawSchool)
                                        .text(lawSchool));
                                }
                                $("#lawschool").append($("<option></option>")
                                    .attr("value", data[key])
                                    .text(data[key]));
                            });
                        }
                    });
                    $.ajax({
                        type: "GET",
                        url: apiDomain + '/Lookup/Colleges?total=9999',
                        success: function (data) {
                            $.each(data, function (key, arr) {
                                if (data[key] === college) {
                                    $("#college").append($("<option selected></option>")
                                        .attr("value", college)
                                        .text(college));
                                }
                                $("#college").append($("<option></option>")
                                    .attr("value", data[key])
                                    .text(data[key]));
                            });
                        }
                    });
                    $.ajax({
                        type: "GET",
                        url: apiDomain + '/Lookup/PracticeAreas?total=9999',
                        success: function (data) {
                            $.each(data, function (key, arr) {
                                $.each(practiceArea, function (ckey, carr) {
                                    if (data[key] === practiceArea[ckey]) {
                                        $("#practiceareas").append($("<option selected></option>")
                                            .attr("value", practiceArea[ckey])
                                            .text(practiceArea[ckey]));
                                    }
                                });
                                $("#practiceareas").append($("<option></option>")
                                    .attr("value", data[key])
                                    .text(data[key]));
                            });
                        }
                    });
                    $.ajax({
                        type: "GET",
                        url: apiDomain + '/Lookup/Specialities?total=9999',
                        success: function (data) {
                            $.each(data, function (key, arr) {
                                $.each(specialities, function (ckey, carr) {
                                    if (data[key] === specialities[ckey]) {
                                        $("#specialty").append($("<option selected></option>")
                                            .attr("value", specialities[ckey])
                                            .text(specialities[ckey]));
                                    }
                                });
                                $("#specialty").append($("<option></option>")
                                    .attr("value", data[key])
                                    .text(data[key]));
                            });
                        }
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
                }
            });

            initSelect2($('.add-info-select'));
            initSelect3($('.three-select'));
            initSelect4($('.fifth-select'));
        }
        else{
            window.open("/sign-in.html", "_self")
        }
    }


    $(document).on('click', '.verify-email', function (e) {
        e.preventDefault();
        var attorneyId = Cookies.get('attorneyId');
        $.ajax({
            url: apiDomain + '/Attorney/' + attorneyId,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                var email = res['contactInfo']['emailAddress'];
                $.ajax({
                    type: "GET",
                    url: apiDomain + '/SendEmailCode?EmailAddress='+email,
                    success: function () {
                        $("#verification-email").attr("hidden", false);
                        $("#verification-email .thank-you p span").text(email)
                    }
                });
            }
        });

    });
    //Update professional info
    $(document).on('submit', '.acc-pr .from-step5', function (e) {
        e.preventDefault();

        var token = Cookies.get('token');
        var attorneyId = Cookies.get('attorneyId');
        var lawSchool = $("#lawschool option:selected").val();
        var college = $("#college option:selected").val();
        var otherEducation = $("#othereducation").val();
        var practiceAreas = $("#practiceareas").val();
        var legalIssues = $("#specialty").val();

        var states = [];
        var licenses = [];
        var count = 0;
        $('.licensedstate').each(function () {
            states.push($(this).val());
            count++;
        });
        var dates = [];
        $('.licenseddate').each(function () {
            dates.push($(this).val());
        });
        var numbers = [];
        $('.licensenumber').each(function () {
            numbers.push($(this).val());
        });
        for (var i = 0; i < count; i++) {
            licenses.push({'state': states[i], 'date': dates[i], 'number': numbers[i]});
        }
        $.ajax({
            type: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            url: apiDomain + '/Attorney/UpdateAttorneyProfessionalInfo',
            data: JSON.stringify({
                "attorneyId": attorneyId,
                "lawSchool": lawSchool,
                "college": college,
                "otherEducation": otherEducation,
                "practiceAreas": practiceAreas.join(),
                "legalIssues": legalIssues.join(),
                "licenses": licenses
            }),
            success: function () {
                $("body").removeClass("loading");
                location.href = 'account-main.html'
            }
        });

    });
});