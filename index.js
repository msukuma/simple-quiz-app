function QuizApp () {
  /* Questions array start */
  const questions = [
    {
      question: 'Who wears the number 10 jersey?',
      choices: [
        'Ngolo Kante',
        'Jorginhio',
        'Eden Hazard',
        'Other'
      ],
      answer: 'Eden Hazard'
    },
    {
      question: "Who is Chelsea's current manager?",
      choices: [
        'Frank Lampard',
        'Antonio Conter',
        'Jose Mourinho',
        'Other'
      ],
      answer: 'Frank Lampard'
    }
  ]
  /* Questions array end */

  /* Initialize tracking variables start */
  let questionIndex = 0
  let score = 0
  /* Initialize tracking variables end*/

  /* Helper functions start */
  function incrementQuestionIndex () {
    questionIndex++
  }

  function incrementScore () {
    score++
  }

  function isQuizzOver () {
    return questionIndex >= questions.length
  }

  function getCurrentQuestionObject () {
    return questions[questionIndex]
  }

  function snakeCase (str) {
    return str.split(' ').join('_')
  }

  function getCurrentQuestionAnswer () {
    const questionObject = getCurrentQuestionObject()
    return snakeCase(questionObject.answer)
  }

  function getCurrentSelectedChoice () {
    return $('input[name=choice]:checked').val()
  }

  function isChoiceCorrect () {
    const answer = getCurrentQuestionObject()
    const selectedChoice = getCurrentSelectedChoice()
    return selectedChoice === answer
  }
  /* Helper functions end*/

  /* Render functions start */
  function hideProgress () {
    $('div.progress').hide()
  }

  function renderProgress () {
    $('div.progress').html(`Progres: ${questionIndex + 1}/${questions.length}`)
  }

  function renderScore () {
    $('div.score').html(`Score: ${score}`)
  }

  function renderQuestion () {
    const questionObject = getCurrentQuestionObject()
    const { question, choices } = questionObject
    renderProgress()
    renderScore()
    $('main').html(`
      <h4>${question}</h4>
      <form>
        <input type="radio" name="choice" value=${snakeCase(choices[0])}> ${choices[0]}<br>
        <input type="radio" name="choice" value=${snakeCase(choices[1])}> ${choices[1]}<br>
        <input type="radio" name="choice" value=${snakeCase(choices[2])}> ${choices[2]}<br>
        <input type="radio" name="choice" value=${snakeCase(choices[3])}> ${choices[3]}<br>
        <button type="submit" class="js-submit-button">Submit</button>
      </form>`)
  }

  function renderChoiceFeedback (isChoiceCorrect) {
    renderProgress()
    renderScore()
    $('main').html(`
      <div class="choice-feedback ${isChoiceCorrect ? 'correct' : 'wrong'}">
        <h4>${isChoiceCorrect ? 'correct' : 'wrong'}</h4>
        <button class="js-next-button">Next</button>
      </div>`
    )
  }

  function renderEndView () {
    hideProgress()
    renderScore()
    $('main').html(`<button class="js-restart-button">Restart</button>`)
  }
  /* Render functions end */


  /* Defining Event handlers start*/
  function handleStartButtonClick () {
    $('.js-start-button').click(function (event) {
      console.log('handleStartButtonClick')
      $('header').removeClass('hidden')
      renderQuestion()
    })
  }

  function handleSubmitButtonClick () {
    $('main').on('click', '.js-submit-button', function (event) {
      event.preventDefault();

      if (isChoiceCorrect()) {
        incrementScore()
        renderChoiceFeedback(true)
      }
      else {
        renderChoiceFeedback(false)
      }
    })
  }

  function handleNextButtonClick () {
    $('main').on('click', '.js-next-button', function (event) {
      incrementQuestionIndex()
      if (isQuizzOver()) {
        renderEndView()
      } else {
        renderQuestion()
      }
    })
  }

  function handleRestartButtonClick () {
    $('main').on('click', '.js-restart-button', function (event) {
      questionIndex = 0
      score = 0
      renderProgress()
      renderScore()
      renderQuestion()
    })
  }
  /* Defining Event handlers end */

  /* Calling event handlers start*/
  handleStartButtonClick()
  handleSubmitButtonClick()
  handleNextButtonClick()
  handleRestartButtonClick()
  /* Calling event handlers end*/
}

/* 
When the page is ready call our QuizApp function.
The code below is short hand for:

$(document).ready(QuizApp)
*/
$(QuizApp)
