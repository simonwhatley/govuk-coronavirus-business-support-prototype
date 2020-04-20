const questions = require('../data/questions.json');

exports.findQuestionById = function(question_id) {
  let question = {};
  question = questions.filter( obj => obj.id === question_id );
  return question[0];
};

exports.question = function(question_id, answer_value) {
  
  if (!question_id)
    return null;
  
  let question = this.findQuestionById(question_id);
  
  if (answer_value !== undefined) {
  
    question.items.forEach((item) => {
      
      item.checked = false;
      
      if (question.type == 'single') {
        if (item.value == answer_value) {
          item.checked = true;
        }
      }
      
      if (question.type == 'multiple') {
        if (answer_value.indexOf(item.value) !== -1) {
          item.checked = true;
        }
      }
      
    });
    
  }
  
  return question;

}