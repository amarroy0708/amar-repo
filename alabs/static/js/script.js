/*
Author: Sourav Kumar Roy
Bootstrap Version 
Build: 1.0
http://www.amarlabs.in
*/

$(window).load(function() { 
	//Preloader 
	$('#status').delay(300).fadeOut(); 
	$('#preloader').delay(300).fadeOut('slow');
	$('body').delay(550).css({'overflow':'visible'});
})

$(document).ready(function() {
		//animated logo
		$(".navbar-brand").hover(function () {
			$(this).toggleClass("animated shake");
		});
		
		//animated scroll_arrow
		$(".img_scroll").hover(function () {
			$(this).toggleClass("animated infinite bounce");
		});
		
		//Wow Animation DISABLE FOR ANIMATION MOBILE/TABLET
		wow = new WOW(
		{
			mobile: false
		});
		wow.init();
		
		//MagnificPopup
		$('.image-link').magnificPopup({type:'image'});


		// OwlCarousel N1
		$("#owl-demo").owlCarousel({
			autoPlay: 3000,
			items : 3,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]
		});

		// OwlCarousel N2
		$("#owl-demo-1").owlCarousel({
			  navigation : false, // Show next and prev buttons
			  slideSpeed : 300,
			  paginationSpeed : 400,
			  singleItem:true
		});

		//SmothScroll
		$('a[href*=#]').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
					var $target = $(this.hash);
					$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
					if ($target.length) {
							var targetOffset = $target.offset().top;
							$('html,body').animate({scrollTop: targetOffset}, 600);
							return false;
					}
			}
		});
		
		//Subscribe
		// new UIMorphingButton( document.querySelector( '.morph-button' ) );
		// for demo purposes only
		// [].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) { 
		// 	bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
		// } );

/* Form Validations */
$.validate();
//Pretent cut,copy,paste employee id 
   $('.prevent_cut_copy_paste').bind("cut copy paste",function(e){
        e.preventDefault();
   });

jQuery('.numbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g,'');
    });

});

function commonPnotify(type,message) {
    var opts = {
        shadow: false
    }
    switch (type) {
        case 'contactSuccess':
            opts.title ="Success :)";
            opts.text = "Hey  "+message+" !!! Thanks for contact with us.Hope we will meet soon for coffee ";
            opts.type = "success";
            break;
        case 'contactError':
            opts.title ="Error :)";
            opts.text = "Hey  "+message+" !!! Sorry our robot is busy.We are working hard to connect  you.Please can you try once again after sometime" ;
            opts.type = "error";
            break;
        case 'contactEmptyError':
            opts.title ="Info :)";
            opts.text = "Hey  "+message+" !!! Enter all the field and then submit. " ;
            opts.type = "info";
            break;
     }
     new PNotify(opts);
  };

function saveContactForm(){
var customer_name =  $("#customer_name").val();
var mobile_no = $("#mobile_no").val();
var email_id = $("#email_id").val();
var customer_message = $("#customer_message").val();
$.ajax({
    url : "save-contactus/", 
    type : "POST", 
    data : { customer_name : customer_name,'mobile_no':mobile_no,'email_id':email_id,'customer_message':customer_message }, 
    success : function(data) {
    	     is_success = data["is_success"];
    	     if(is_success == parseInt(1)){
    	     $("#contactSubmit").val("Submitted");
		     $("#contactSubmit").attr("disabled",true);
              commonPnotify('contactSuccess',customer_name);
    	     }else{
             commonPnotify('contactError',customer_name);
    	     }
        },
    error : function(xhr,errmsg,err) {
         console.log(xhr.status + ": " + xhr.responseText);
    }
});
}

$('#contactSubmit').click(function(e) {
var customer_name =  $("#customer_name").val();
var mobile_no = $("#mobile_no").val();
var email_id = $("#email_id").val();
var customer_message = $("#customer_message").val();
if (customer_name !== "" && mobile_no !== "" && email_id !== "" && customer_message !== "") {
	saveContactForm()
	e.preventDefault();
	}else{
		commonPnotify('contactEmptyError',customer_name);
	}
});





  


