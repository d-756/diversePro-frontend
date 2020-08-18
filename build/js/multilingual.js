$(window).on("load",function () {
    checkCookie();
    var apiDomain = 'https://diversepro.api.creativeteam.io';
    var lang = Cookies.get("language");
    $("html").attr("lang", lang);
    //Privacy Policy
    if ($("section").hasClass("privacy-multilingual")) {
        $.ajax({
            url: apiDomain + '/PageContent/GetPageContents?pageName=privacy',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (lang === "EN" || lang === undefined)
                    var content = res[0]['content'];
                else {
                    if (lang === "AR") {
                        $("body").addClass("right-to-left")
                    }
                    content = res[0]['content_' + lang];
                }
                $(".terms-block p").append(content);
            }
        });
    }

    //Terms of Use
    if ($("section").hasClass("terms-multilingual")) {
        $.ajax({
            url: apiDomain + '/PageContent/GetPageContents?pageName=tou',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (lang === "EN" || lang === undefined)
                    var content = res[0]['content'];
                else {
                    if (lang === "AR") {
                        $("body").addClass("right-to-left")
                    }
                    content = res[0]['content_' + lang];
                }
                $(".terms-block p").append(content);
            }
        });
    }

    //Footer
    $.ajax({
        url: apiDomain + '/PageContent/GetPageContents?pageName=footer',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            $.each(res, function (key, arr) {
                if (lang === "EN" || lang === undefined)
                    var content = res[key]['content'];
                else {
                    if (lang === "AR") {
                        $("body").addClass("right-to-left")
                    }
                    content = res[key]['content_' + lang];
                }
                if(res[key]['elementName'] === 'link_1'){
                    $("#footerMenu li a").eq(0).html(content);
                }
                if(res[key]['elementName'] === 'link_7'){
                    $("#footerMenu li a").eq(1).html(content);
                }
                if(res[key]['elementName'] === 'link_2'){
                    $("#footerMenu li a").eq(2).html(content);
                }
                if(res[key]['elementName'] === 'link_3'){
                    $("#footerMenu li a").eq(3).html(content);
                }
                if(res[key]['elementName'] === 'link_4'){
                    $("#footerMenu li a").eq(4).html(content);
                }
                if(res[key]['elementName'] === 'link_5'){
                    $("#footerMenu li a").eq(5).html(content);
                }
                if(res[key]['elementName'] === 'link_6'){
                    $(".label-social").html(content);
                }
            });
        }
    });

    //Search
    if ($("section").hasClass("search-results")) {
        $.ajax({
            url: apiDomain + '/PageContent/GetPageContents?pageName=search',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                $.each(res, function (key, arr) {
                    if (res[key]['elementName'] === 'filter_button') {
                        if (lang === "EN" || lang === undefined)
                            var content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form .search-filter-btn").html(content);
                    }
                    if (res[key]['elementName'] === 'title-block_h2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".search-results-inner h2").html(content);
                    }
                    if (res[key]['elementName'] === 'broaden_your_search') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".no-results p").html(content);
                    }
                    if (res[key]['elementName'] === 'filters') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-top__name").html(content);
                    }
                    // if (res[key]['elementName'] === 'query') {
                    //     if (lang === "EN" || lang === undefined)
                    //         content = res[key]['content'];
                    //     else {
                    //         if (lang === "AR") {
                    //             $("body").addClass("right-to-left")
                    //         }
                    //         content = res[key]['content_' + lang];
                    //     }
                    //     $(".search-results-inner .left-side p span.rf").html(content);
                    // }
                    if (res[key]['elementName'] === 'filter_culture_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'filter_language_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'filter_practice-area_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'filter_speciality_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'filter_location_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'filter_years_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(5).html(content);
                    }
                    if (res[key]['elementName'] === 'filter_keyword_label') {
                        if (lang === "EN" || lang === undefined)
                            content = 'Keyword (type and press "enter")';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-form label").eq(6).html(content);
                    }
                    if (res[key]['elementName'] === 'reset-filters') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".results-filter-top__reset").html(content);
                    }
                    if (res[key]['elementName'] === 'share-results_button') {
                        if (lang === "EN" || lang === undefined)
                            content = '<span class="icon-link"></span>'+res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = '<span class="icon-link"></span>'+res[key]['content_' + lang];
                        }
                        $(".share-search.popup-opener").html(content);
                    }
                    if (res[key]['elementName'] === 'message') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts .column a[data-popup='message']").html(content);
                    }
                    if (res[key]['elementName'] === 'share') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts .column a[data-popup='refer']").html(content);
                    }
                    if (res[key]['elementName'] === 'pro_plus') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        if($(".item-image .status").text() === "Pro Plus")
                            $(".item-image .status").html(content);
                    }
                    if (res[key]['elementName'] === 'pro') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        if($(".item-image .status").text() === "Pro")
                            $(".item-image .status").html(content);
                    }
                    if (res[key]['elementName'] === 'premium') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        if($(".item-image .status").text() === "Premium")
                            $(".item-image .status").html(content);
                    }
                    if (res[key]['elementName'] === 'compare') {
                        if (lang === "EN" || lang === undefined) {
                            content = '<span class="icon-checked-white">\n' +
                                '                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13">\n' +
                                '                            <path fill="#FFF" d="M139.755 25.09L128.074 36.879 122 30.747 123.082 29.657 128.074 34.698 138.673 24z" transform="translate(-122 -24)"/>\n' +
                                '                        </svg>\n' +
                                '                    </span>' + res[key]['content'];
                            var checkbox = res[key]['content'];
                        }
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = '<span class="icon-checked-white">\n' +
                                '                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13">\n' +
                                '                            <path fill="#FFF" d="M139.755 25.09L128.074 36.879 122 30.747 123.082 29.657 128.074 34.698 138.673 24z" transform="translate(-122 -24)"/>\n' +
                                '                        </svg>\n' +
                                '                    </span>'+res[key]['content_' + lang];
                            checkbox = res[key]['content_' + lang];
                        }
                        $(".share-search.compare").html(content);
                        // $(".search-checkbox").html(checkbox);
                    }
                });
            }
        });
    }


    //Contact
    if ($("body").hasClass("contacts-page")) {
        $.ajax({
            url: apiDomain + '/PageContent/GetPageContents?pageName=contact',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                $.each(res, function (key, arr) {
                    if (res[key]['elementName'] === 'title-block_h2') {
                        if (lang === "EN" || lang === undefined)
                            var content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page h2").html(content);
                    }
                    if (res[key]['elementName'] === 'submit_button') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contact-submit").html(content);
                    }
                    if (res[key]['elementName'] === 'verification_title') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page .form-bold").html(content);
                    }
                    if (res[key]['elementName'] === 'verification_content') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page .description").html(content);
                    }
                    if (res[key]['elementName'] === 'name_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page .name-label").html(content);
                    }
                    if (res[key]['elementName'] === 'email_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page .email-label").html(content);
                    }
                    if (res[key]['elementName'] === 'subject_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page .subject-label").html(content);
                    }
                    if (res[key]['elementName'] === 'message_label') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".contacts-page .message-label").html(content);
                    }
                    if (res[key]['elementName'] === 'thank_you') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $("#contact-success .thank-you h2").html(content);
                    }
                    if (res[key]['elementName'] === 'message_sent') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $("#contact-success .thank-you p").html(content);
                    }
                    if (res[key]['elementName'] === 'subject_placeholder') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".form-group input, .form-group textarea").attr("placeholder", content);
                    }
                });
            }
        });
    }

    //Homepage
    if ($("body").hasClass("home-page")) {
        $.ajax({
            url: apiDomain + '/PageContent/GetPageContents?pageName=homepage',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                $.each(res, function (key, arr) {
                    if (res[key]['elementName'] === 'hero-search-form-wrapper_input') {
                        if (lang === "EN" || lang === undefined)
                            var content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".hero-search-form .main-input").attr("placeholder", content);
                    }
                    if (res[key]['elementName'] === 'Location') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".hero-search-form #city-state").attr("placeholder", content);
                    }
                    if (res[key]['elementName'] === 'hero-search-form-wrapper_button') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".hero-search-form .btn-primary").text(content);
                    }
                    if (res[key]['elementName'] === 'hero-search-form-wrapper_h1') {
                        if (lang === "EN" || lang === undefined)
                            content = 'The Lawyer for <span>You</span>.';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".hero-search-form-wrapper h1").html(content);
                    }
                    if (res[key]['elementName'] === 'form-notification_p') {
                        if (lang === "EN" || lang === undefined)
                            content = 'Are you a diverse lawyer? <a href="registration.html">Claim your profile</a>';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = '<a href="registration.html">'+res[key]['content_' + lang]+'</a>';
                        }
                        $(".hero-search-form-wrapper .form-notification").html(content);
                    }
                    if (res[key]['elementName'] === 'hero-search-form-wrapper_p') {
                        if (lang === "EN" || lang === undefined)
                            content = 'Find top lawyers who share your culture, heritage, language, or experience.';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".hero-search-form-wrapper p.subtitle").html(content);
                    }
                    // if (res[key]['elementName'] === 'sign-in_button') {
                    //     if (lang === "EN" || lang === undefined)
                    //         content = res[key]['content'];
                    //     else {
                    //         if (lang === "AR") {
                    //             $("body").addClass("right-to-left")
                    //         }
                    //         content = res[key]['content_' + lang];
                    //     }
                    //     $(".header .btn-sign-in, .mobile-header .btn-sign-in").text(content);
                    // }
                    if (res[key]['elementName'] === 'title-block_lawyers_h2') {
                        if (lang === "EN" || lang === undefined)
                            content = 'Find a Lawyer <br> who understands <span>You</span>.';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".section-search-law .title-block .h1").html(content);
                    }
                    if (res[key]['elementName'] === 'title-block_lawyers_p') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".section-search-law .title-block .subtitle").html(content);
                    }
                    if (res[key]['elementName'] === 'find_lawyer') {
                        if (lang === "EN" || lang === undefined)
                            content = 'Find a Lawyer<br/> with the <span>Right Expertise</span>.';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".section-expertise .title-block .h1").html(content);
                    }
                    if (res[key]['elementName'] === 'over_practice_areas') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".section-expertise .title-block .subtitle").html(content);
                    }
                    if (res[key]['elementName'] === 'title-block_reviews_h2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".section-review .title-block .h1").html(content + ' <span class="icon-diversepro-text"></span>');
                    }
                    if (res[key]['elementName'] === 'more_practice_areas') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".section-expertise .see-more").html(content);
                    }
                    if (res[key]['elementName'] === 'hero-search-form-wrapper_h1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".footer .footer-col .little-subtitle").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_latino_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-latino a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_lgbtq_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-lgbtq a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_middle_eastern_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-middle-african a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_american_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-alaska a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_hawaiian_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-hawaii a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_veterans_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-veterans a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_women_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-women a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_disabilities_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-disa a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = 'Black & African American';
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-black a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_asian_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-asian a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_south_asian_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-south-asian a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_any_h3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".title-category-any a").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_latino_link_5') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-wrapper .more-link").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_lgbtq_content_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-inner p").html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_asian_link_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-asian li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_asian_link_2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-asian li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_asian_link_3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-asian li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_asian_link_4') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-asian li a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_asian_link_5') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-asian li a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_link_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-black li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_link_2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-black li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_link_3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-black li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_link_4') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-black li a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_link_5') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-black li a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_black_link_6') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-black li a").eq(5).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_south_asian_link_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-south-asian li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_south_asian_link_2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-south-asian li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_south_asian_link_3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-south-asian li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_south_asian_link_4') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-south-asian li a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_south_asian_link_5') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-south-asian li a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_american_link_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-alaska li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_american_link_2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-alaska li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_american_link_3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-alaska li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_american_link_4') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-alaska li a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_native_american_link_5') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-alaska li a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_middle_eastern_link_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-middle-african li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_middle_eastern_link_2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-middle-african li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_middle_eastern_link_3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-middle-african li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_middle_eastern_link_4') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-middle-african li a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_middle_eastern_link_5') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-middle-african li a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_latino_link_1') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-latino li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_latino_link_2') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-latino li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_latino_link_3') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-latino li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'lawyer-category-round_latino_link_4') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".subcategory-list-latino li a").eq(3).html(content);
                    }

                    if (res[key]['elementName'] === 'family') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'personal_injury') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'criminal_defense') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'employment_labor') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'wills_trusts_estates') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'business_transactions') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(5).html(content);
                    }
                    if (res[key]['elementName'] === 'real_estate_land') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(6).html(content);
                    }
                    if (res[key]['elementName'] === 'disability') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(7).html(content);
                    }
                    if (res[key]['elementName'] === 'immigration') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(8).html(content);
                    }
                    if (res[key]['elementName'] === 'bankruptcy_reorganization') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(9).html(content);
                    }
                    if (res[key]['elementName'] === 'intellectual_property') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(10).html(content);
                    }
                    if (res[key]['elementName'] === 'trial_litigation') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single h5 a").eq(11).html(content);
                    }
                    if (res[key]['elementName'] === 'divorce') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(0).html(content);
                    }
                    if (res[key]['elementName'] === 'child_custody') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(1).html(content);
                    }
                    if (res[key]['elementName'] === 'child_support') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(2).html(content);
                    }
                    if (res[key]['elementName'] === 'car_truck_accident') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(3).html(content);
                    }
                    if (res[key]['elementName'] === 'negligence') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(4).html(content);
                    }
                    if (res[key]['elementName'] === 'dui_dwi') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(5).html(content);
                    }
                    if (res[key]['elementName'] === 'traffic_tickets') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(6).html(content);
                    }
                    if (res[key]['elementName'] === 'discrimination') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(7).html(content);
                    }
                    if (res[key]['elementName'] === 'workers_compensation') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(8).html(content);
                    }
                    if (res[key]['elementName'] === 'wrongful_termination') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(9).html(content);
                    }
                    if (res[key]['elementName'] === 'residential_real_estate') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(10).html(content);
                    }
                    if (res[key]['elementName'] === 'commerical_real_estate') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(11).html(content);
                    }
                    if (res[key]['elementName'] === 'social_security_disability') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(12).html(content);
                    }
                    if (res[key]['elementName'] === 'accessibility') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(13).html(content);
                    }
                    if (res[key]['elementName'] === 'naturalization_citizenship') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(14).html(content);
                    }
                    if (res[key]['elementName'] === 'deportation') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(15).html(content);
                    }
                    if (res[key]['elementName'] === 'patents') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(16).html(content);
                    }
                    if (res[key]['elementName'] === 'copyrights') {
                        if (lang === "EN" || lang === undefined)
                            content = res[key]['content'];
                        else {
                            if (lang === "AR") {
                                $("body").addClass("right-to-left")
                            }
                            content = res[key]['content_' + lang];
                        }
                        $(".expertise-block .expertise-block__single ul li a").eq(17).html(content);
                    }
                });
            }
        });
    }
});