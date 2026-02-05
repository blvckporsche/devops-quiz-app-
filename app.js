let questions = [];

fetch('data/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log("Questions loaded", questions.length);
  });
function loadTopics() {
    const topics = [...new Set(questions.map(q => q.topic))];
    const select = document.getElementById('topicSelect');
  
    topics.forEach(topic => {
      const option = document.createElement('option');
      option.value = topic;
      option.textContent = topic;
      select.appendChild(option);
    });
  }
  
fetch('data/questions.json')
    .then(res => res.json())
    .then(data => {
      questions = data;
      loadTopics();
    });
let currentQuestion = null;

document.getElementById('topicSelect').addEventListener('change', function () {
    const filtered = questions.filter(q => q.topic === this.value);
    if (filtered.length > 0) {
    showQuestion(filtered[0]);
    }
});
    
function showQuestion(q) {
    currentQuestion = q;
    document.getElementById('question').textContent = q.question;
    
    const options = document.getElementById('options');
    options.innerHTML = '';
    
    q.options.forEach((opt, index) => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.onclick = () => checkAnswer(index);
    options.appendChild(li);
    });
}
    
  