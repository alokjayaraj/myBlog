//filter js
$(document).ready(function(){
    $(".filter-item").click(function(){
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000");
        }
        // else{
        //     $(".post-box").not("."+ value).hide("1000");
        //     $(".post-box").filter('.'+ value).hide("1000");
        // }
        else {
            $(".post-box").hide("1000");
            $(".post-box." + value).show("1000");
        }
    });
    //Add acive to btn
    $(".filter-item").click(function(){
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});

//Header background change on scroll
let headers = document.querySelectorAll('header');
headers.forEach(header => {
window.addEventListener('scroll', () =>{
    header.classList.toggle('shadow', window.scrollY > 440);
});
});