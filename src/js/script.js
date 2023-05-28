
$(document).ready(function() {
    $(".menuBurger").click(function(event){
        $(".menuBurger, .conteiner nav").toggleClass("active");
        $("body").toggleClass("lock");
    })
})
$(document).ready(function() {
    $(".conteiner nav li a").click(function(event){
        $(".menuBurger, .conteiner nav").removeClass("active");
    })
})