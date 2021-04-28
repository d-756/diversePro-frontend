(function($){
    $(document).ready(function () {

        $(".cr-image").attr("src", "images/user.png");
        if($(window).width() < 768) {
            setTimeout(function () {
                $('#preloader').hide();
                $('body').removeClass('no-scroll');
                new WOW().init();
            },2000);
        } else {
            setTimeout(function () {
                $('#preloader').hide();
                $('body').removeClass('no-scroll');
                new WOW().init();
            },2700);
        }
        $('.no-style-select').select2({
            containerCssClass: "no-style-select",
            dropdownCssClass: "no-style-dropdown",
            width: '100%'
        });
        $('.search-select').select2({
            minimumInputLength: 0,
            allowClear: true,
            placeholder: "Choose",
            containerCssClass: "search-page-select",
            dropdownCssClass: "search-page-dropdown",
            width: '100%'
        });

        $('.practices-search').select2({
            minimumInputLength: 0,
            placeholder: "Search a practice area or specialty",
            containerCssClass: "search-page-select",
            dropdownCssClass: "search-page-dropdown",
            width: '100%'
        });

        $('.add-info-select').select2({
            minimumInputLength: 0,
            placeholder: "Select",
            containerCssClass: "add-info-select",
            dropdownCssClass: "add-info-dropdown",
            width: '100%'
        });

        $('.three-select').select2({
            minimumInputLength: 0,
            multiple: true,
            maximumSelectionLength: 3,
            placeholder: "Select",
            containerCssClass: "add-info-select",
            dropdownCssClass: "add-info-dropdown",
            width: '100%'
        });

        $('.fifth-select').select2({
            minimumInputLength: 0,
            multiple: true,
            maximumSelectionLength: 5,
            placeholder: "Select",
            containerCssClass: "add-info-select",
            dropdownCssClass: "add-info-dropdown",
            width: '100%'
        });

        $('.reg-demographic-selected').select2({
            minimumInputLength: 0,
            maximumSelectionLength: 3,
            containerCssClass: "reg-demographic-selected",
            dropdownCssClass: "reg-demographic-selected-dropdown",
            width: '100%',
            placeholder: function(){
                $(this).data('placeholder');
            }
        });

        $('.keywords-selected').select2({
            minimumInputLength: 0,
            tags: true,
            maximumSelectionLength: 20,
            containerCssClass: "keywords-selected",
            dropdownCssClass: "keywords-selected-dropdown",
            width: '100%',
            "language":{
                "noResults" : function () { return ''; }
            },
            placeholder: function(){
                $(this).data('placeholder');
            }
        });

        window.initSelect2 = function (element){
            element.select2({
                minimumInputLength: 0,
                placeholder: "Select",
                containerCssClass: "add-info-select",
                dropdownCssClass: "add-info-dropdown",
                width: '100%'
            });
        };
        window.initSelect3 = function (element){
            element.select2({
                minimumInputLength: 0,
                maximumSelectionLength: 3,
                placeholder: "Select",
                containerCssClass: "add-info-select",
                dropdownCssClass: "add-info-dropdown",
                width: '100%'
            });
        };
        window.initSelect4 = function (element){
            element.select2({
                minimumInputLength: 0,
                maximumSelectionLength: 5,
                placeholder: "Select",
                containerCssClass: "add-info-select",
                dropdownCssClass: "add-info-dropdown",
                width: '100%'
            });
        };

        window.keywordSelect2 = function (element){
            element.select2({
                minimumInputLength: 0,
                tags: true,
                maximumSelectionLength: 20,
                containerCssClass: "keywords-selected",
                dropdownCssClass: "keywords-selected-dropdown",
                width: '100%',
                "language":{
                    "noResults" : function () { return ''; }
                },
                placeholder: function(){
                    $(this).data('placeholder');
                }
            });
        };

        window.initRegSelect2 = function (element){
            element.select2({
                minimumInputLength: 0,
                maximumSelectionLength: 3,
                containerCssClass: "reg-demographic-selected",
                dropdownCssClass: "reg-demographic-selected-dropdown",
                width: '100%',
                placeholder: function(){
                    $(this).data('placeholder');
                }
            });
        };
        window.initSearchSelect2 = function (element){
            element.select2({
                minimumInputLength: 0,
                allowClear: true,
                placeholder: "Type Here",
                containerCssClass: "search-page-select",
                dropdownCssClass: "search-page-dropdown",
                width: '100%'
            });
        };

        window.initRegSelect3 = function (element){
            element.select2({
                minimumInputLength: 0,
                maximumSelectionLength: 3,
                containerCssClass: "reg-demographic-selected",
                dropdownCssClass: "reg-demographic-selected-dropdown",
                width: '100%',
                language: {
                    maximumSelected: function (e) {
                        return "You can only add up to " + e.maximum + " languages.";
                    }
                },
                placeholder: function(){
                    $(this).data('placeholder');
                }
            });
        };

        $('.select2-search__field').css('width', '100%');

        $(".mobile-filter").on('click', function () {
            $(".results-filter").show();
            $("body").css('overflow', 'hidden');
        })
        $(".results-filter-top__back").on('click', function () {
            $(".results-filter").fadeOut(400);
            $("body").css('overflow', 'auto');
        })
        $('.search-page-select b[role="presentation"], .add-info-select b[role="presentation"]').hide();
        $('.search-page-select .select2-selection__arrow, .add-info-select .select2-selection__arrow').append('<span class="icon-arrow-down">');

        $('.review-slider').css({
            'padding-left' : ($(window).width() - $('.container').width()) / 2,
            //'max-width' : $(window).width() - (($(window).width() - $('.container').width()) / 2)
        });
        var swiper = new Swiper('.review-slider', {
            spaceBetween: 60,
            freeMode: true,
            slidesPerView: 'auto',
            // loop: true,
            autoHeight: false,
            setWrapperSize: true,
            navigation: {
                nextEl: '.review-next',
                prevEl: '.review-prev'
            }
        });

        // var heroSlider = new Swiper('.hero-slider-container', {
        //     slidesPerView: 'auto',
        //     spaceBetween: 0,
        //     loop: true,
        //     speed: 10000,
        //     autoplay: {
        //         delay: 0,
        //         disableOnInteraction: false
        //     }
        // });
        var premiumSlider = new Swiper('.premium-container', {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev'
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 480px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
        if($("body").hasClass("home-page")) {
            var catSlider = setTimeout(function () {
                var swiper1 = new Swiper('.category-image-1', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper1.slideToLoop(swiper1.realIndex + 1, 500);
                }, 3000)
            }, 500);

            var catSlider2 = setTimeout(function () {
                var swiper2 = new Swiper('.category-image-2', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper2.slideToLoop(swiper2.realIndex + 1, 500);
                }, 3000)
            }, 2500);

            var catSlider3 = setTimeout(function () {
                var swiper3 = new Swiper('.category-image-3', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper3.slideToLoop(swiper3.realIndex + 1, 500);
                }, 3000)
            }, 1500);

            var catSlider4 = setTimeout(function () {
                var swiper4 = new Swiper('.category-image-4', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper4.slideToLoop(swiper4.realIndex + 1, 500);
                }, 3000)
            }, 2000);

            var catSlider5 = setTimeout(function () {
                var swiper5 = new Swiper('.category-image-5', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper5.slideToLoop(swiper5.realIndex + 1, 500);
                }, 3000)
            }, 1000);

            var catSlider6 = setTimeout(function () {
                var swiper6 = new Swiper('.category-image-6', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper6.slideToLoop(swiper6.realIndex + 1, 500);
                }, 3000)
            }, 3000);

            var catSlider7 = setTimeout(function () {
                var swiper7 = new Swiper('.category-image-7', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper7.slideToLoop(swiper7.realIndex + 1, 500);
                }, 3000)
            }, 500);


            var catSlider8 = setTimeout(function () {
                var swiper8 = new Swiper('.category-image-8', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper8.slideToLoop(swiper8.realIndex + 1, 500);
                }, 3000)
            }, 2500);

            var catSlider9 = setTimeout(function () {
                var swiper9 = new Swiper('.category-image-9', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper9.slideToLoop(swiper9.realIndex + 1, 500);
                }, 3000)
            }, 1500);

            var catSlider10 = setTimeout(function () {
                var swiper10 = new Swiper('.category-image-10', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper10.slideToLoop(swiper10.realIndex + 1, 500);
                }, 3000)
            }, 2000);

            var catSlider11 = setTimeout(function () {
                var swiper11 = new Swiper('.category-image-11', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper11.slideToLoop(swiper11.realIndex + 1, 500);
                }, 3000)
            }, 1000);

            var catSlider12 = setTimeout(function () {
                var swiper12 = new Swiper('.category-image-12', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    effect: 'fade'
                });
                setInterval(function () {
                    swiper12.slideToLoop(swiper12.realIndex + 1, 500);
                }, 3000)
            }, 3000);

        }
        $(".ancor").on("click", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),

                top = $(id).offset().top;

            $('body,html').animate({scrollTop: top}, 1500);
        });
        $('.review-slider .swiper-slide').css({
            'height' : swiper.height
        });
        $(window).resize(function () {
            calcHeroOuterWidth();
            $('.review-slider').css({
                'margin-left' : ($(window).width() - $('.container').width()) / 2,
                'max-width' : $(window).width() - (($(window).width() - $('.container').width()) / 2)
            });
            $('.review-slider .swiper-slide').css({
                'height' : swiper.height
            });
        });
        $('.dropdown-trigger').on('click',function (e) {
            e.preventDefault();
            $(this).parents('.custom-dropdown').toggleClass('active-dropdown');
        });
        $(document).mouseup(function (e){
            var div = $(".custom-dropdown");
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                div.removeClass('active-dropdown');
            }
        });


        var reg = new Swiper('.reg-slider', {
            loop: true,
            navigation: {
                nextEl: '.reg-next',
                prevEl: '.reg-prev'
            }
        });


        // Change Header for Home page
        checkHeader();
        $(window).scroll(function () {
            checkHeader();

        });
        $('.main-category-image').on('click',function () {
            if($(window).width() < 1024) {
                $('.main-category-image').removeClass('active');
                $(this).addClass('active');
            }
        });
        $('.menu-trigger').on('click',function () {
            $('.mobile-menu').show().addClass('open-menu');
            $('body').addClass('no-scroll');
            return false;
        });
        $('.close-menu').on('click',function () {
            $('.mobile-menu').fadeOut(400);
            $('body').removeClass('no-scroll');
            setTimeout(function () {
                $('.mobile-menu').removeClass('open-menu');
            },400);
            return false;
        });


        $(document).on('click', ".file-delete", function () {
            $("#upload-images").empty();
            $("#upload-images").removeClass("croppie-container");
            $(".file-input").val("");
            $(".cr-image").attr("src","images/user.png");
            $(".cr-image").val("");
            $(".upload-photo").removeClass('ready');
            $("#uploadedImage").attr("src", "images/user.png")
        });

        calcHeroOuterWidth();

    });
    function calcHeroOuterWidth() {
        var countSlides = $('.hero-slider-inner').find('.hero-slider-item').length;
        var slideWidth = $('.hero-slider-item').width();
        $('.hero-slider-inner').css({
            'width' : countSlides * slideWidth - (countSlides * 50),
        });
    }

    function checkHeader() {
        if($('body').hasClass('has-hero-section')) {
            var topOffset = $(window).scrollTop();
            var headerHeigh = $('.header-1').height();
            var mobileHeaderHeigh = $('.mobile-header').height();
            var heroHeight = $('.hero-screen').height();
            if(topOffset >  (heroHeight - headerHeigh)) {
                $('.header-1').addClass('hide-header').removeClass('show-header');
                $('.header-2').addClass('show-header').removeClass('hide-header');
                $('.mobile-header').addClass('end-hero');
            } else {
                $('.header-2').addClass('hide-header').removeClass('show-header');
                $('.header-1').addClass('show-header').removeClass('hide-header');
                $('.mobile-header').removeClass('end-hero');
            }
        }
    }

    $(document).ready(function () {
        //Add license
        $(document).on('click', '.add-license', function () {
            var deleteBtn = '<button type="button" class="btn btn-primary delete-license">Delete</button>';
            $(".licenses:last").find('select.add-info-select').select2('destroy');
            var clone = $(".licenses:last").clone();
            $('.licenses:last').after(clone);
            $('.licenses:last').find("#licensenumber").val("");
            $('.licenses:last .form-group.last').html(deleteBtn);
            $(".form-group.last .add-license").slice(1).hide();
            initSelect2($('.licenses .add-info-select'));
        });
        $(document).on('click', '.delete-license', function () {
            $(this).parent().parent().remove();
        });

        if($("main").hasClass("main-content")){
            $.get("https://api.ipdata.co/?api-key=8cd77f2e5ccdc2c4039b7d40c6838a2d18f9d6d4ee7b2d3f1238e616", function(response) {
                var city = response.city;
                if(response.country_code === "US")
                    var state = ", "+response.region_code;
                else
                    state = "";
                if($("#city-state").length){
                    $("#city-state").val(city + state);
                }
                if($(".results-filter-form #location").length){
                    var queryString = window.location.search;
                    var urlParams = new URLSearchParams(queryString);
                    $(".results-filter-form #location").val(city + state);
                }
                Cookies.set("city", city + state);
                $('a[href*="search.html?"]').each(function() {
                    $(this).attr("href",$(this).attr("href").split("?").join('?location='+ Cookies.get("city")+'&'))
                });
            }, "jsonp");
        }
    });


    // Open previous step
    $(document).on('click', '.previous-step, .return-back', function () {
        var current = $(this).parent().parent().parent();
        current.fadeOut();
        current.prev().fadeIn();
        current.remove();
    });

    $(document).on('click', '.edit-info', function () {
        var current = $(this).parent().parent().parent().parent();
        current.fadeOut();
        current.prev().fadeIn();
        current.remove();
    });




    //Close these popups
    $('.thank-you button').on('click', function () {
        $("#email-success").attr('hidden', true);
        $("#verification-email").attr('hidden', true);
        $("#refer-success").attr('hidden', true);
        $("#share-success").attr('hidden', true);
        $("#cpaa-myself-not-resident").attr('hidden', true);
        $("#cpaa-not-resident").attr('hidden', true);
        $("body").css("overflow", "auto");
        $("#share-rec, #share-email, #share-message, #name, #phone, #your-email, #your-subject, #your-message, #recEmail, #email, #subject, #refer-message").val("");

    });
    $('#contact-success .thank-you button, #cpaa-success .thank-you button').on('click', function () {
        window.open("/", "_self");
    });

    //Click on profile
    $(document).on('click', '.results-people__item', function() {
        location.href=$(this).attr("data-link");
    }).on('click', '.contacts, .search-checkbox', function(e) {
        e.stopPropagation();
    });

    // Show passsword
    $(document).on('click', ".toggle-password", function() {
        var input = $(this).parent().find('input');
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // Tabs
    $(document).on('click', 'ul.payments-method li',function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.payments-method li').removeClass('active');
        $('.pci').removeClass('active');

        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
    });

    var value = $('#headline').val() || '';
    var initLength = Math.max((value ? (50 - value.length) : 50),0);
    $('.head-counter').html(initLength.toString()+ "/50");

    window.calculateSymbols = function () {
        var value = $("#headline").val() || '';
        var lengthToGo = Math.max((50 - value.length),0);
        $('.head-counter').html(lengthToGo.toString()+ "/50");
    };

    $(document).on('keyup', '#headline', function(){
        calculateSymbols();
    });

    $(document).on("click", "#reset-dropdown", function (e) {
        e.preventDefault();
        $(".keywords-selected").val('').trigger('change');
        // $("#location").val('');
        $(".search-select").val('').trigger('change');
        $(".results-filter-form .search-filter-btn").trigger("click");
        // var queryString = window.location.search;
        // var urlParams = new URLSearchParams(queryString);
        // urlParams.set('practiceArea', "");
        // urlParams.set('speciality', "");
        // urlParams.set('experience', "");
        // urlParams.set('keywords', "");
        // urlParams.set('language', "");
        // urlParams.set('ethnicity', "");
        // window.location.search = urlParams.toString();
    });

    //Open / Close all popups
    $(document).on('click', '.popup-opener', function () {
        var data = $(this).attr('data-popup');
        var name = $(this).attr('data-name');
        var image = $(this).attr('data-image');
        var id = $(this).attr('data-attorney');
        $("#"+data).attr('hidden', false);
        if($(".popup-content.refer .name").length){
            $(".popup-content.refer .name").find("span").text(name);
            $(".popup-content.refer .name").find("img").attr("src", image);
            $(".popup-content.refer").attr("data-attorney", id)
        }
        $("body").css("overflow", "hidden");

    });
    document.querySelectorAll('.popup-wrapper')
        .forEach(function ($wrap) {
            $wrap.addEventListener('click', function(){
                $wrap.hidden = true;
                $(".content").removeClass('open-popup');
                $("body").css("overflow", "auto")
            });

            var $popup = $wrap.querySelector('#popup');

            $popup.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            var $close = $popup
                .querySelector('.close');

            if (!$close) {
                return;
            }

            $close.addEventListener('click', function(e) {
                $close.closest('.popup-wrapper').hidden = true;
                $(".content").removeClass('open-popup');
                $("body").css("overflow", "auto")
            })
        });

    //Search get confirm
    $("#confirm .accept .btn-primary").on("click", function () {
        $("#confirm").attr("hidden", true);
        Cookies.set("confirm", true)
    });

    $(document).on("click", ".need-captcha", function (e) {
        e.preventDefault();
        var response = grecaptcha.getResponse(2);
        if(response.length !== 0) {
            location.href = $(this).attr('href');
        }
        else{
            if(!$('#recaptchaError-search').text()) {
                $('#recaptchaError-search').append('You must complete the verification in order to proceed.');
            }
        }
    });


    $(document).on("mouseenter", ".premium-container", function() {
        $(".premium-container a").fancybox();
    });

    //Smooth Scroll
    $(".to-bottom").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top - 50}, 500);
    });
    window.smoothScroll = function () {
        $("html, body").animate({ scrollTop: 0 });
        return false;
    };

    // Cookies
    window.checkCookie = function () {
        var token = Cookies.get('token');
        var plan = Cookies.get('attorneyPlan');
        var id = Cookies.get('attorneyId');
        if (typeof token !== "undefined" && typeof plan !== "undefined") {
            $(".btn-sign-in").text("My account");
            // $(".btn-sign-in").addClass("sign-out");
            $(".btn-sign-in").attr("href", "account-main.html");
        }
    }

    if($("#cardnumber").length)
        new Cleave('#cardnumber', {
            creditCard: true
        });

    if($("#expirationdate").length)
        new Cleave('#expirationdate', {
            date: true,
            datePattern: ['m', 'y']
        });

    $('.phone-format-single').toArray().forEach(function(field){
        new Cleave(field, {
            numericOnly: true,
            blocks: [0, 3, 0, 3, 4],
            delimiters: ["(", ")", " ", "-"]
        });
    });

    $(".language-menu li a").on("click", function () {
        var lang = $(this).attr("data-lang");
        Cookies.set("language", lang);
        location.reload();
    });


})(jQuery);