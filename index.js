$(function(){
    //declare variables
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency=200;
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();

    // click on start reading
    $("#start").click(function(){
        // get text and splite it to words inside an array
        //\s matches spaces,tabs,new lines.etc and means one or more
       myArray = $("#userInput").val().split(/\s+/);
       inputLength=myArray.length;
       if(inputLength > 1){
        //there is enough input
        //move to reading mode
        reading =true;
        //hide start/error/userinput,showNew/pause/resume/contrls
        $("#start").hide();
        $("#error").hide();
        $("#userInput").hide();
        $("#new").show();
        $("#pause").show();
        $("#controls").show();
        //set progress slider max

        $("#progressslider").attr("max",inputLength-1);
        // start the counter at input
        counter=0;
        //show reading box with the first word
        $("#result").show();    
        $("result").text(myArray[counter]);

        //start reading box with the word
        action =setInterval(read,frequency);
       }
       else{
        //not enough text input
        $("#error").show();
       }
    });

    // click on new 
     $("#new").click(function(){
       // reload page
       location .reload();
     });

     // click on Pause
     $("#pause").click(function(){
        // stop reading and switch to none reading mode
        clearInterval(action);
        reading=false;

        // hide pause and show resume
        $("#pause").hide();
        $("#resume").show();
      });

      // click on resume
      $("#resume").click(function(){
        // start reading
        action =setInterval(read,frequency); 
        // go back to reading mode
        reading=true;
         

        // hide resume and show pause
        $("#resume").hide();
        $("#pause").show();
      });

      // change fontsize
      $("#fontsizeslider").on("slidestop",function(event,ui){
      // refresh the slider
      $("#fontsizeslider").slider("refresh");
      // get the value of slider
      var slidervalue=parseInt($("#fontsizeslider").val());
      $("#result").css("fontSize",slidervalue);
      $("#fontsize").text(slidervalue);
      });

      // change speed
      $("#speedslider").on("slidestop",function(event,ui){
        // refresh the slider
        $("#speedslider").slider("refresh");
        // get the value of slider
        var slidervalue=parseInt($("#speedslider").val());
        
        $("#speed").text(slidervalue);
        // stop reading 
        clearInterval(action);

        // change frequency
        frequency=60000/slidervalue;

        // resume reading if we are in reading mode
        if(reading){
            action =setInterval(read,frequency);  
        }

        });

        //progress slider
        $("#progressslider").on("slidestop",function(event,ui){
            // refresh the slider
            $("#progressslider").slider("refresh");
            // get the value of slider
            var slidervalue=parseInt($("#progressslider").val());
            
            
            // stop reading 
            clearInterval(action);
    
           // change counter
           counter=slidervalue;

           //change word
           $("#result").text(myArray[counter]);

           // change value of progress
           $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
    
            // resume reading if we are in reading mode
            if(reading){
                action =setInterval(read,frequency);  
            }
    
            });


    function read(){
       if(counter == inputLength-1){//last word
        clearInterval(action);
        reading = false;//move to more reading

        $("#pause").hide();

       } 
       else{
        //counter goes up by one
        counter++;

        //get word
        $("#result").text(myArray[counter]);

        //change progress slider value and refresh
        $("#progressslider").val(counter).slider('refresh');

        // change text of percentage
        $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
       }
    }
    
    // Add this code to your Index.js file

    document.getElementById("voiceInput").addEventListener("click", startVoiceRecognition);

    function startVoiceRecognition() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            var recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
    
            recognition.onresult = function (event) {
                var transcript = event.results[0][0].transcript;
                document.getElementById("userInput").value = transcript;
            };
    
            recognition.start();
        } else {
            alert("SpeechRecognition API is not supported in this browser.");
        }
    }

//     const axios = require('axios');

// const encodedParams = new URLSearchParams();
// encodedParams.set('src', 'Hello, world!');
// encodedParams.set('hl', 'en-us');
// encodedParams.set('r', '0');
// encodedParams.set('c', 'mp3');
// encodedParams.set('f', '8khz_8bit_mono');

// const options = {
//   method: 'POST',
//   url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
//   params: { key: '<YOUR_API_KEY>' }, // Replace <YOUR_API_KEY> with your actual API key
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace YOUR_RAPIDAPI_KEY with your actual RapidAPI key
//     'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
//   },
//   data: encodedParams,
// };

// try {
//     const response = await axios.request(options);
//     console.log(response.data);
// } catch (error) {
//     console.error('Error:', error.response.data);
// }

    
});
