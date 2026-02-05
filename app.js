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
  