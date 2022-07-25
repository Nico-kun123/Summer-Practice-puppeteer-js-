"use strict"; // Строгий режим

// Прокручивание страницы наверх при нажатии на кнопку
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100)
        $('#back2Top').fadeIn();
        else $('#back2Top').fadeOut();
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});

// Загружает файл "ParsedData.json"
function myFunction(){
    // На кнопку "Показать" можно нажать только 1 раз
    document.getElementById("start").disabled = true;

    $( document ).ready(function() {
        $.ajax ({ 
            dataType: "json",
            url: "/ParsedData.json",
            success: function(data)
            {
                console.log("Данные из файла ParsedData.json были успешно получены!");
                
                for(let i = 0; i < data.Emali.length; i++){
                    $(".data_text_1").append('<div class="product_field">' +
                                                '<div class="product_img">' +
                                                    `<a href="${data.Emali[i].url}" target="_blank">` +
                                                        '<svg width="100%" height="100%"' +
                                                            'xmlns="http://www.w3.org/2000/svg">' +
                                                            `<image href="${data.Emali[i].image}"` +
                                                            'width="100%" height="100%"/>' +
                                                        '</svg>' +
                                                    '</a>' +
                                                '</div>' +
                                                `<div class="product_name" style="font-size: larger; margin: 8px"> <a href="${data.Emali[i].url}" target="_blank"> <strong>${data.Emali[i].name}</strong> </a> </div>` +
                                                `<p><div class="product_price" align="middle" style="font-size: larger"> <strong> ${data.Emali[i].price} ₽/шт.</strong> </div></p>` +
                                            '</div>');
                };

                for(let i = 0; i < data.Paint_for_inside_work.length; i++){
                    $(".data_text_2").append('<div class="product_field">' +
                                                '<div class="product_img">' +
                                                    `<a href="${data.Paint_for_inside_work[i].url}" target="_blank">` +
                                                        '<svg width="100%" height="100%"' +
                                                            'xmlns="http://www.w3.org/2000/svg">' +
                                                            `<image href="${data.Paint_for_inside_work[i].image}"` +
                                                            'width="100%" height="100%"/>' +
                                                        '</svg>' +
                                                    '</a>' +
                                                '</div>' +
                                                `<div class="product_name" style="font-size: larger; margin: 8px"> <a href="${data.Paint_for_inside_work[i].url}" target="_blank"> <strong>${data.Paint_for_inside_work[i].name}</strong> </a> </div>` +
                                                `<p><div class="product_price" align="middle" style="font-size: larger"> <strong>${data.Paint_for_inside_work[i].price} ₽/шт.</strong> </div></p>` +
                                            '</div>');
                };

                for(let i = 0; i < data.Paint_for_outside_work.length; i++){
                    $(".data_text_3").append('<div class="product_field">' +
                                                '<div class="product_img">' +
                                                    `<a href="${data.Paint_for_outside_work[i].url}" target="_blank">` +
                                                        '<svg width="100%" height="100%"' +
                                                            'xmlns="http://www.w3.org/2000/svg">' +
                                                            `<image href="${data.Paint_for_outside_work[i].image}"` +
                                                            'width="100%" height="100%"/>' +
                                                        '</svg>' +
                                                    '</a>' +
                                                '</div>' +
                                                `<div class="product_name" style="font-size: larger; margin: 8px"> <a href="${data.Paint_for_outside_work[i].url}" target="_blank"> <strong>${data.Paint_for_outside_work[i].name}</strong> </a> </div>` +
                                                `<p><div class="product_price" align="middle" style="font-size: larger"> <strong>${data.Paint_for_outside_work[i].price} ₽/шт.</strong> </div></p>` +
                                            '</div>');
                };

                for(let i = 0; i < data.Wood_paint.length; i++){
                    $(".data_text_4").append('<div class="product_field">' +
                                                '<div class="product_img">' +
                                                    `<a href="${data.Wood_paint[i].url}" target="_blank">` +
                                                        '<svg width="100%" height="100%"' +
                                                            'xmlns="http://www.w3.org/2000/svg">' +
                                                            `<image href="${data.Wood_paint[i].image}"` +
                                                            'width="100%" height="100%"/>' +
                                                        '</svg>' +
                                                    '</a>' +
                                                '</div>' +
                                                `<div class="product_name" style="font-size: larger; margin: 8px"> <a href="${data.Wood_paint[i].url}" target="_blank"> <strong>${data.Wood_paint[i].name}</strong> </a> </div>` +
                                                `<p><div class="product_price" align="middle" style="font-size: larger"> <strong>${data.Wood_paint[i].price} ₽/шт.</strong> </div></p>` +
                                            '</div>');
                };

                for(let i = 0; i < data.Preparing_for_painting.length; i++){
                    $(".data_text_5").append('<div class="product_field">' +
                                                '<div class="product_img">' +
                                                    `<a href="${data.Preparing_for_painting[i].url}" target="_blank">` +
                                                        '<svg width="100%" height="100%"' +
                                                            'xmlns="http://www.w3.org/2000/svg">' +
                                                            `<image href="${data.Preparing_for_painting[i].image}"` +
                                                            'width="100%" height="100%"/>' +
                                                        '</svg>' +
                                                    '</a>' +
                                                '</div>' +
                                                `<div class="product_name" style="font-size: larger; margin: 8px"> <a href="${data.Preparing_for_painting[i].url}" target="_blank"> <strong>${data.Preparing_for_painting[i].name}</strong> </a> </div>` +
                                                `<p><div class="product_price" align="middle" style="font-size: larger"> <strong>${data.Preparing_for_painting[i].price} ₽/шт.</strong> </div></p>` +
                                            '</div>');
                };
            } 
        });
    });
};

// Анимированный фон сайта
$.getScript("https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js", function(){
    particlesJS('particles-js',
        {
            "particles": {
                "number": {"value": 120, "density": {"enable": true, "value_area": 1000} },
                "color": {"value": "#b1c900"},
                "shape": {
                    "type": "circle",
                    "stroke": {"width": 0, "color": "red"},
                    "polygon": {"nb_sides": 5},
                    "image": {"width": 10, "height": 10} },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false} },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {"enable": false, "speed": 1, "size_min": 0.1, "sync": false} },
                "line_linked": {"enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {"enable": false, "rotateX": 600, "rotateY": 1200} }
            },
            "config_demo": {
                "hide_card": false,
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }
    );
});