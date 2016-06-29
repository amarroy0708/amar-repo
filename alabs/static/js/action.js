//Only nymeric allowed validation
$(document).ready(function(){
    jQuery('.numbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g,'');
    });
});

//For survey form validation error message
var message;
function commonPnotify(type,message) {
    var opts = {
        shadow: false
    };
    switch (type) {
        case 'selectBoxValidationError':
            opts.title ="Error :)";
            opts.text = "Please select any of the option from choice for all questions.";
            opts.type = "error";
            break;
        case 'userDetailsValidationError':
            opts.title ="Error :)";
            opts.text = "Please fill all details properly in Your details section";
            opts.type = "error";
            break;
        case 'employeeExistError':
            opts.title ="Error :)";
            opts.text = message;
            opts.type = "error";
            break;
     }
     new PNotify(opts);
  }

var form = $("#surveyForm");

//For survey validation
function checkSurveyValidation(currentIndex){
    isError='0';
    if(currentIndex == 0){
    formValidation=form.valid();
    if(formValidation == false){
         isError='1';
        commonPnotify('userDetailsValidationError');
        }
       else{
           var count_down_start_required = $("#count_down_start_required").val();
           if (parseInt(count_down_start_required) == 1){
           start_count_down();
           }
           $("#count_down_start_required").val("0")
      }
   }
   else{
   // if(isError == 0){
    //Check all select dropdown any of the option selected
    $(".questionSelectBox_"+currentIndex).each(function() {
         selectBoxValue = $(this).val();
         if(selectBoxValue == ""){
              isError='1';
              commonPnotify('selectBoxValidationError');
              return false;
          }
      });
 //  }
}

  return isError;
}

//To check employee already exist or not
function checkEmployeeExist(){
$.ajax({
    url : "check-employee-exist/", 
    type : "POST", 
    data : { employeeId : $("#employeeId").val() }, 
    success : function(data) {
        if (parseInt(data["existStatus"]) == 1){
            message = data["message"];
            commonPnotify('employeeExistError',message);
            $(".actions").hide();
           }else{
              $(".actions").show();
            }
        },
    error : function(xhr,errmsg,err) {
         console.log(xhr.status + ": " + xhr.responseText);
    }
});
}


$(document).ready(function(){
    $("#employeeId").focusout(function(){
       employeeId=$("#employeeId").val();
      if (employeeId !=""){
         checkEmployeeExist();
        }
    });
   //Pretent cut,copy,paste employee id 
   $('#employeeId').bind("cut copy paste",function(e){
        e.preventDefault();
    });
})

form.validate({
       rules: {
            teamName: "required",
            unitName: "required",
            teamSize: {
                      required:true,
                      number:true
                     },
            employeeName: "required",
            employeeId:{
                       required: true,
                       number:true
                      },
            employeeEmail: {
                required: true,
                email: true
            },
           employeeLocation:"required",
      },
        messages: {
            teamName: "Please enter your team name",
            unitName: "Please select your team name",
            teamSize: {
                      required: "Please enter your team size",
                      number: "Enter only numeric value",
                    },
            employeeName: "Please enter your  name",
            employeeId: {
                      required: "Please enter your employee id",
                      number: "Enter only numeric value",
                    },
            employeeEmail: {
                      required : "Please enter your email",
                      email: "Please enter a valid email address",
                    },
            employeeLocation: "Please enter your location name",
           },
});

$("#survey-vertical").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    stepsOrientation: "vertical",
    onStepChanging: function (event, currentIndex,newIndex)
    {
        //start_count_down();
        if (currentIndex > newIndex)
        {
            return true;
        }
        
             selectValidation = checkSurveyValidation(currentIndex,newIndex);
             if(parseInt(selectValidation) == 1){
                 return false;
              }else{
                return true;
             }
        return true;
    },
    onFinishing: function (event, currentIndex,newIndex)
    {
         form.validate().settings.ignore = ":disabled";
         selectValidation = checkSurveyValidation();
         if(parseInt(selectValidation) == 1){
             return false;
          }else{
             return true;
         }
    },
    onFinished: function (event, currentIndex,newIndex)
    {
     stop_count_down();
     $("#surveyForm").hide();
     $("#surveyLoadingSpinner").show();
     $(".actions").hide();
     $("#surveyForm").submit();
    },
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

var total_time=900;
var clock = $('.your-clock').FlipClock(total_time, {
                countdown: true,
                clockFace: 'MinuteCounter'
        });
clock.stop(function() {
// this (optional) callback will fire after the clock stops
});

//Countdown function
function start_count_down(){
console.log("hhh");
clock.start(function() {
// this (optional) callback will fire each time the clock flips
});
}


//Stop countdown
function stop_count_down(){
clock.stop(function() {
// this (optional) callback will fire each time the clock flips
});

}
