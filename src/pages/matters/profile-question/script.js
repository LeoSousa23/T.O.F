function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
  return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}

var QuizUI = {
  displayNext: function() {
    if (quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();

      // Verifica se é a primeira pergunta e torna o h1 invisível se não for
      if (quiz.currentQuestionIndex > 0) {
        var h1Element = document.querySelector("h1");
        h1Element.style.visibility = "hidden";
      }
    }
  },

  displayQuestion: function() {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },

  displayChoices: function() {
    var choices = quiz.getCurrentQuestion().choices;

    for (var i = 0; i < 4; i++) {
      var choiceElement = document.getElementById("guess" + i);
      var guessElement = document.getElementById("guess" + i);

      if (i < choices.length) {
        choiceElement.textContent = choices[i];
        guessElement.style.display = "block";
        this.guessHandler("guess" + i, choices[i]);
      } else {
        guessElement.style.display = "none";
        choiceElement.textContent = ""; // Limpa o conteúdo do botão
      }
    }
  },

  displayScore: function() {
    var gameOverHTML = "<h1>Fim de teste</h1>";
    gameOverHTML += "<h2> Sua pontuação é: " + quiz.score + " / 10 </h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
  },

  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  guessHandler: function(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
      QuizUI.displayNext();
    };
  },

  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress", "Questão " + currentQuestionNumber + " de " + quiz.questions.length);
  },

  displayScore: function() {
    var gameOverHTML = "<h1>Fim de teste</h1>";
    gameOverHTML += "<h2> Sua pontuação é: " + quiz.score + " / 10 </h2>";

    // Verifique a pontuação e exiba a mensagem apropriada
    if (quiz.score >= 8) {
      gameOverHTML += "<p>Parabéns! Você tem o perfil para enfermeiro.</p>";
    } else {
      gameOverHTML += "<p>Você não tem o perfil para enfermeiro, mas pode tentar novamente.</p>";
    }

    this.populateIdWithHTML("quiz", gameOverHTML);
  },
};

// criar perguntas
var questions = [
  new Question("<strong>1</strong> - Seu interesse em se tornar um profissional da saúde, é por qual destes motivos?", ["Dinheiro", "Amor ao ser humano", "Trabalhar meio período"], "Amor ao ser humano"),

  new Question("<strong>2</strong> - Você considera que tem um raciocínio humanizado?", ["Sim", "Não"], "Sim"),

  new Question("<strong>3</strong> - Trabalha bem em equipe?", ["Sim", "Não"], "Sim"),

  new Question("<strong>4</strong> - Sabe trabalhar sobre pressão?", ["Sim", "Não"], "Sim"),

  new Question("<strong>5</strong> - É proativo?", ["Sim", "Não"], "Sim"),

  new Question("<strong>6</strong> - A profissão na área da saúde é importante pra você?", ["Sim", "Não"], "Sim"),

  new Question("<strong>7</strong> - Você respeita a DIGNIDADE do ser humano?", ["Sim", "Não"], "Sim"),

  new Question("<strong>8</strong> - Você se considera capaz de dar suporte no cuidado com a VIDA das pessoas ?", ["Sim", "Não"], "Sim"),

  new Question("<strong>9</strong> - Pra você, o que significa a vida de uma pessoa desconhecida?", ["Só mais uma vida existente na terra.", "A vida de alguém que é amado por seus familiares.", "Nasceu porque quis."], "A vida de alguém que é amado por seus familiares."),

  new Question("<strong>10</strong> - Além do auxiliar de Enfermagem, pretende crescer como profissional para poder fazer mais pelos pacientes?", ["Sim", "Não"], "Sim")
];

// Criar Quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayNext();