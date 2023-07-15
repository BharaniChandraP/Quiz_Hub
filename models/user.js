// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//   quizName: {
//     type: String,
//     required: true,
//   },
//   questions: [
//     {
//       question: String,
//       options: [{ option: String }],
//       correctAnswer: String,
//     },
//   ],

//   createdBy: {
//     username:{
//       type: String,
//       required: true
//     },
//   },
//   user:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   }
// });

// const Quiz = mongoose.model('Quiz', quizSchema);

// module.exports = Quiz;



const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  quizScores: [{
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: {
      type: Number,
      required: true
    }
  }]
  
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;