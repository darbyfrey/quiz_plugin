$(document).ready(function(){
  var template = " <input type='radio' name='question-{{questionNumber}}' value='{{points}}' data-quiz-response data-quiz-category='{{questionType}}'> Yes <input type='radio' name='question-{{questionNumber}}' data-quiz-response data-quiz-category='{{questionType}}' value='0'> No ";

  jQuery.each(jQuery('[data-quiz]'), function(index, question){
    var questionEl = jQuery(question);
    var questionType = questionEl.data('quiz-type');
    var questionPoints = (Number(questionEl.data('quiz-points')) ? Number(questionEl.data('quiz-points')) : 1);
    var data = {
      "questionType": questionType,
      "questionNumber":index,
      "points": questionPoints
    };

    questionEl.append(Mustache.render(template, data));
  });

  jQuery('[data-quiz-calculate]').on("click", function(event){
    event.preventDefault();

    results = {}

    jQuery.each(jQuery('[data-quiz-category]:checked'), function(index, response){
      var responseEl = jQuery(response);
      var category = responseEl.data('quiz-category');
      var value = responseEl.val();

      results[category] = (results[category] || 0) + Number(value);
    });

    console.log(results);
    console.log(winnerIs(results));

    jQuery('.winner-' + winnerIs(results)).show();

  });

  function winnerIs(object){
    var values = [];
    var winner = '';
    jQuery.each(object, function(name, value){
      values.push(value);
    });


    if(values.length == 0){
      winner='none'
    } else if(values[0] == values[1]){
      winner='tie';
    } else {
      jQuery.each(object, function(name, value){
        if(value == values[0]){
          winner=name;
        }
      });
    }

    return winner;
  }
});
