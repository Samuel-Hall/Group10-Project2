$(".homePage").hide();


// Hide login/Create account, show homePage

$("#login").on("click", function(event) {
    event.preventDefault();
    $(".landingPage").hide();
    $(".homePage").show();
})