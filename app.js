let questions = [];
let currentQuestion = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/questions.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
      loadTopics();
    });
});

function loadTopics() {
  const select = document.getElementById("topicSelect");
  select.innerHTML = '<option value="">Select Topic</option>';

  const topics = [...new Set(questions.map(q => q.topic))];

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    select.appendChild(option);
  });
}

document.getElementById("topicSelect").addEventListener("change", function () {
  const filtered = questions.filter(q => q.topic === this.value);
  if (filtered.length > 0) {
    showQuestion(filtered[0]);
  }
});

function showQuestion(q) {
  currentQuestion = q;
  document.getElementById("question").textContent = q.question;

  const options = document.getElementById("options");
  options.innerHTML = "";

  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => checkAnswer(index);
    options.appendChild(li);
  });
}

function checkAnswer(index) {
  const feedback = document.getElementById("feedback");
  if (index === currentQuestion.answerIndex) {
    feedback.textContent = "Correct! " + currentQuestion.explanation;
  } else {
    feedback.textContent = "Incorrect. " + currentQuestion.explanation;
  }
}
