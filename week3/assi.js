$(document).ready(function() {
    $(".main_form").hide();


    $("#Bookings").click(function (e){
        e.preventDefault();
        $(".main_form").slideDown("slow");
    });


    $("#submit").click(function(){
        $(".main_form").slideUp ("slow");
        alert("Your booking has been registered")
    })

});
