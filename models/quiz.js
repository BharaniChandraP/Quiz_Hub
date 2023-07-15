// const mongoose = require('mongoose');

// const QuestionSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: true
//   },
//   options: [{
//     option: {
//       type: String,
//       required: true
//     }
//   }],
//   correctAnswer: {
//     type: String,
//     required: true
//   }
// });

// const QuizSchema = new mongoose.Schema({
//   quizName: {
//     type: String,
//     required: true
//   },
//   questions: [QuestionSchema]
// });

// const Quiz = mongoose.model('Quiz', QuizSchema);

// module.exports = Quiz;


const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      options: [{ option: String }],
      correctAnswer: String,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username:{
    type: String,
  //   required: true
  }
});
  

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
