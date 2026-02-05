let questions = [];

fetch('data/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log("Questions loaded", questions.length);
  });
