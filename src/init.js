$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");
    console.log(dancerMakerFunctionName);

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    console.log(dancerMakerFunction);

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    window.dancers.push(dancer);

    $('body').append(dancer.$node);

    $(".rotater").on("mouseenter", function(event) {
      $(this).animate({height:"30px", width:"30px"});
    });

    $(".rotater").on("mouseout", function(event) {
      $(this).animate({height:"0px", width:"0px"});
    });

    //add an event upon orbiter button push
    //will change the class of the last-added dancer
    //thereby, hopefully, making the new orbiter
    //track the last-added dancer



    $('body').on('DOMNodeInserted', '.orbiter', function(event){


        // Get coordinates of most recently inserted dancer
        var prevDancerTop = dancers[dancers.length-2]._top;
        var prevDancerLeft= dancers[dancers.length-2]._left;

        //make random sometime in the future
        var newDancerTop = prevDancerTop - 30;
        var newDancerLeft = prevDancerLeft - 30;

        // Place orbiter near previous dancer
        dancers[dancers.length-1].$node.css({top:newDancerTop, left:newDancerLeft});
        dancers[dancers.length-1]._left = newDancerLeft;
        dancers[dancers.length-1]._top = newDancerTop;


    })

  });

$(".lineUpButton").on("click", function(event){
    //proved button works
  // console.log("Lineup pressed!");

  var nextPos = 10;

  for (var i = 0; i < dancers.length; i++) {
    dancers[i].$node.css({top:50, left:nextPos});
    dancers[i]._left = nextPos;
    dancers[i]._top = 50;
    nextPos += 25;
  }

  });



});

