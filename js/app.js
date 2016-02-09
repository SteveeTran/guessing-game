$(document).ready(function(){
  function guess(){
    if(parseInt($("#guess").val()) === numberToGuess){
      win = true;
        swal("Good job!", "You guessed right!", "success");
        disableButtons();
    };
    difference = (userGuess - numberToGuess);
    absoluteDifference = Math.abs(difference);
    $("table").show();
    $("#guess").val("");
    $(".bro").hide(); //Hides hint after showing
  };

  function disableButtons(){
    $("#guess").attr("disabled", true);
    $(".btn-primary").attr("disabled", true);
    $(".btn-danger").attr("disabled", true);
    $(".btn-success").attr("disabled", true);
  }

  function guessEvent(){
    //Show hint if number selection is invalid
  if($(this).val() > 100 || $(this).val() < 0){
      swal("Error!", "Please enter a number from 1-100.", "error");
      $("#guess").val("");
    }
  };

  function gameOver(){
    if(guessesRemaining < 1){
      $("h1").text("GAME OVER!");
      $("h3").text("You suck.");
      $("h4").text("Please leave.");
    }
    else{
      $("h4").text(guessesRemaining + " chances left!");
    }
  }

  function hotOrCold(){
    if(validGuess && guessesRemaining > 0){
      if(absoluteDifference === 0){
        temperature = "Perfect";
      }
      else if(absoluteDifference <= 5){
        $("#scalding").show();
        temperature = "Scalding";
      }
      else if(absoluteDifference <= 10){
        $("#hot").show();
        temperature = "Hot";
      }
      else if(absoluteDifference <= 15){
        $("#warm").show();
        temperature = "Warm";
      }
      else if(absoluteDifference <= 20){
        $("#cold").show();
        temperature = "Cold";
      }
      else{
        $("#freezing").show();
        temperature = "Freezing";
      }
      if(difference < 0){
        $("#higher").show();
      }
      else{
        $("#lower").show();
      }
    }
    if(validGuess && guessesRemaining > -1){
      add = "<tr><td>" + userGuess + "<td>" + temperature + "</td>" + "</td></tr>"
      $(".next").after(add)
    }
  }

  function isGuessValid(){
    for(i in previousGuess){
      if(previousGuess[i] === userGuess){
        validGuess = false;
      }
    }
    if(!validGuess && guessesRemaining > 0){
      swal("Oops!", "You've already entered that number!", "warning");
    }
  }

  function submitEvent(event){
    event.preventDefault();
    if(guessesRemaining > -1 && !win){
      $("h1").text("Good luck.");
      $("h3").text("Enter your guess.");
      previousGuess.push(userGuess);
      userGuess = $("#guess").val();
      guess();
      isGuessValid();
      hotOrCold();
      if(win){
        $("h1").text("Way to go.");
        $("h3").text("You've won.");
        $("h4").text("Now LEAVE.");
        $(".bro").hide();
      }
      if(validGuess && !win){
        gameOver();
        guessesRemaining--;
      }
      validGuess = true;
    }
  }

  function resetEvent(event){
      if(guessesRemaining === 4){
        $(".jumbotron").hide().show("slow");
        $("h1").text("WTF.");
        $("h3").text("ENTER  YOUR GUESS.");
        $("h4").text("You still have 5 chances...GO ALREADY!");
        swal("WTF.", "The game hasn't even started, yet you want to restart it already? PRESS OK AND PICK A NUMBER.", "warning");
      }
      else{
        swal({
          title: "Are you sure you want to restart the game?",
          text: "Your old game data will be lost!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, restart it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm){
            swal("Restarted!", "Your new game has begun.", "success");
            guessesRemaining = 4;
            previousGuess = [];
            $(".jumbotron").hide().show("slow");
            $("h1").text("Game was restarted.");
            $("h4").text("You have 5 chances again. You may begin.");
          $(".bro").hide();
            $("table").hide();
            $("td").remove();
          }
        else{
          swal("Cancelled", "Ok, nevermind. :/", "error");
        }
      });
    }
  }

  function giveUpEvent(event){
    swal({
      title: "Wow.",
      text: "So you want to give up huh?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, I suck!",
      cancelButtonText: "Fine, I'll try harder...",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm){
      if (isConfirm){
        swal("As you wish. The answer was " + numberToGuess + ".", "You remind me of my sister...", "success");
        guessesRemaining = -1;
        gameOver();
        $(".bro").hide();
        disableButtons();
      }
      else{
        swal("Cancelled", "Good choice. Keep trying. :)", "error");
      }
    });
  }

  $(".jumbotron").hide().show("slow");
  $(".bro").hide();
  $("table").hide();
  var userGuess = null;
  var previousGuess = [];
  var validGuess = true;
  var guessesRemaining = 4;
  var numberToGuess = Math.floor(Math.random() * 100) + 1;
  var win = false;


  //Checks that guess is between 0 and 100 when it is typed
  $("#guess").keyup(guessEvent);
  //Decrements the remaining amount of guesses and checks if guess is correct
  $(".btn-primary").click(submitEvent);
  $(".btn-danger").click(resetEvent);
  $(".btn-success").click(giveUpEvent);

});
