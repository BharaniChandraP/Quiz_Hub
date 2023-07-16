


// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const User = require('./models/user')
// const Quiz = require('./models/quiz');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


// // Session middleware
// app.use(session({
//   secret: 'secret-key',
//   resave: false,
//   saveUninitialized: false
// }));

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Configure passport-local strategy
// passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//   User.findOne({ email })
//     .then(user => {
//       if (!user) {
//         return done(null, false, { message: 'User with this email does not exist' });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: 'Incorrect password' });
//       }
//       return done(null, user);
//     })
//     .catch(err => done(err));
// }));

// // Serialize and deserialize user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(user => done(null, user))
//     .catch(err => done(err));
// });


// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// app.set('view-engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));




// app.get('/', (req, res) => {
//   res.render('login.ejs');
// });

// app.get('/login', (req, res) => {
//   res.render('login.ejs');
// });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: true
// }));
// app.get('/home', ensureAuthenticated, (req, res) => {
//   res.render('home.ejs');
// });

// app.get('/register', (req, res) => {
//   // Handle register page logic
//   res.render('register.ejs');
// });
//   app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
  
//     // Perform validation on the received data
//     if (!name || !email || !password) {
//       return res.status(400).send('Please fill in all fields');
//     }
  
//     // Check if the user with the given email already exists in the database
//     User.findOne({ email })
//       .then(user => {
//         if (user) {
//           return res.status(400).send('User with this email already exists');
//         }
  
//         // Create a new user
//         const newUser = new User({ name, email, password });
  
//         // Save the new user to the database
//         newUser.save()
//           .then(() => {
//             // Registration successful
//             res.redirect('/login'); // Redirect to the login page
//           })
//           .catch(err => {
//             console.error('Failed to register user:', err);
//             res.status(500).send('Internal Server Error');
//           });
//       })
//       .catch(err => {
//         console.error('Error during user lookup:', err);
//         res.status(500).send('Internal Server Error');
//       });
      
//   });
  
// app.get('/createquiz',ensureAuthenticated,(req,res)=>{
//     res.render('createquiz.ejs')
// })


// app.post('/createquiz', async (req, res) => {
//   try {
//     // Extract the quiz data from the request body
//     const createQuiz = {
//       quizName: req.body.quizName,
//       questions: []
//     };

//     for (let i = 1; i <= 5; i++) {
//       const question = req.body['question' + i];
//       const options = [];
//       for (let j = 1; j <= 4; j++) {
//         options.push({ option: req.body['option' + i + j] });
//       }
//       const correctAnswer = req.body['correctAnswer' + i];

//       createQuiz.questions.push({ question, options, correctAnswer });
//     }

//     // Create a new Quiz object with the extracted data
//     const quiz = new Quiz(createQuiz);
//     const savedQuiz = await quiz.save();

//     // Update the user's quizzes array with the saved quiz ID
//     const user = await User.findById(req.user._id);
//     user.quizzes.push(savedQuiz._id);
//     await user.save();

//     res.redirect('/profile');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/attemptquiz/:quizId', async (req, res) => {
// try {
//   const quizId = req.params.quizId;
//   const quiz= await Quiz.findById(quizId);
//   if (!quiz) {
//     return res.status(404).send('Quiz not found');
//   }
//   res.render('attemptquiz.ejs', { quiz });
// } catch (error) {
//   console.error('Error fetching quiz:', error);
//   res.status(500).send('Internal Server Error');
// }
// });
// app.use(express.json());

// app.post('/submitquiz/:quizId', async (req, res) => {
//   try {
//     const quizId = req.params.quizId;
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).send('Quiz not found');
//     }
//     // Extract the answers from the request body
//     const answers = req.body.answers;
//     console.log(answers);
//     res.send("Quiz submitted successfully")
//   } catch (error) {
//     console.error('Error fetching quiz:', error);
//     res.status(500).send('Internal Server Error');  
//   }
// });



// app.get('/profile',(req,res)=>{
//   const quizTitle = "My Quiz Title";
//   res.render('profile.ejs',{quizTitle})
  
// });
// //   // ...
//   app.get('/search',(req,res)=>{
//     res.render('search.ejs')
//   })

//  app.use(bodyParser.urlencoded({ extended: true }));



// app.post('/search', (req, res) => {
//   // Search for users with a username
//   const { name } = req.body;

//   // Perform validation on the received data
//   if (!name) {
//     return res.status(400).send('Please fill in all fields');
//   }

//   // Check if the user with the given username already exists in the database
//   User.findOne({ name })
//     .populate('quizzes', 'quizName') // Populate the 'quizzes' field in the user model with the associated quizzes
//     .exec()
//     .then(user => {
//       if (!user) {
//         return res.status(400).send('User with this username does not exist');
//       }

//       // Render the other user's profile with the name and quizzes
//       res.render('otherusersprofile.ejs', { name: user.name, quizzes: user.quizzes });
//     })
//     .catch(error => {
//       console.error('Error fetching user and quizzes:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });


// app.get('/otherusersprofile', async (req, res) => {
//   try {
//     const userId = req.query.userId; // Retrieve the user ID from the query parameter
//     const name = req.query.name; // Retrieve the name from the query parameter

//     console.log('userId:', userId);
//     console.log('name:', name);

//     const user = await User.findOne({ name }).exec(); // Find the user by name and execute the query

//     console.log('user:', user);

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const quizzes = await Quiz.find({ createdBy: user._id }, 'quizName').exec(); // Find quizzes by createdBy user's ID and execute the query

//     console.log('quizzes:', quizzes);

//     // Render the user's profile page with the quiz titles
//     res.render('otherusersprofile.ejs', { name: user.name, quizzes });
//   } catch (error) {
//     console.error('Error fetching user and quiz titles:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/quizzes', async (req, res) => {
//   try {
//     const quizzes = await Quiz.find();
//     res.render('quizzes.ejs', { quizzes });
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

  

// // // // Connect to MongoDB Atlas
// function connectDB() {
//   const dbURI = 'mongodb+srv://bharanichandraprabhu:YdWd193HfywLgILu@quizhub.sweh1vr.mongodb.net/';

//   mongoose.connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log('MongoDB Connected...');
//     startServer();
//   })
//   .catch(err => {
//     console.error('Failed to connect to MongoDB:', err);
//   });
// }
// // Check if already connected to MongoDB Atlas
// if (mongoose.connection.readyState === 1) {
//     // Already connected, start the server
//     startServer();
//   } else {
//     // Not connected, establish connection and then start the server
//     connectDB();
//   }
  
// // Start the server
// function startServer() {
//   app.listen(3000, () => {
//     console.log('Server started on port 3000');
//   });
// }



const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user')
const Quiz = require('./models/quiz');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require('config');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

// Session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Configure passport-local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'User with this email does not exist' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    })
    .catch(err => done(err));
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.render('login.ejs');
});

// app.get('/login', (req, res) => {
//   res.render('login.ejs');
// });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/register',
//   failureFlash: true
// }));

// app.get('/register', (req, res) => {
//   // Handle register page logic
//   res.render('register.ejs');
// });
app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/register',
  failureFlash: true
}), (req, res) => {
  // Custom callback after authentication
  if (!req.user) {
    req.flash('error', 'User does not exist. Please register.');
  }
});

app.get('/register', (req, res) => {
  const errorMessage = req.flash('error');
  res.render('register.ejs', { errorMessage });
});


app.get('/home', ensureAuthenticated, (req, res) => {
  res.render('home.ejs');
});
app.get('/logout', (req, res) => {
  
    res.redirect('/login'); // Redirect to the login page after logout
  
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

  app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    // Perform validation on the received data
    if (!name || !email || !password) {
      return res.status(400).send('Please fill in all fields');
    }
  
    // Check if the user with the given email already exists in the database
    User.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(400).send('User with this email already exists');
        }
  
        // Create a new user
        const newUser = new User({ name, email, password });
  
        // Save the new user to the database
        newUser.save()
          .then(() => {
            // Registration successful
            res.redirect('/login'); // Redirect to the login page
          })
          .catch(err => {
            console.error('Failed to register user:', err);
            res.status(500).send('Internal Server Error');
          });
      })
      .catch(err => {
        console.error('Error during user lookup:', err);
        res.status(500).send('Internal Server Error');
      });
      
  });
  
app.get('/createquiz',ensureAuthenticated,(req,res)=>{
    res.render('createquiz.ejs')
})


app.post('/createquiz', async (req, res) => {
  try {
    // Extract the quiz data from the request body
    const createQuiz = {
      quizName: req.body.quizName,
      questions: []
    };

    for (let i = 1; i <= 5; i++) {
      const question = req.body['question' + i];
      const options = [];
      for (let j = 1; j <= 4; j++) {
        options.push({ option: req.body['option' + i + j] });
      }
      const correctAnswer = req.body['correctAnswer' + i];
      console.log(question, options, correctAnswer);
      createQuiz.questions.push({ question, options, correctAnswer });
    }

    // Create a new Quiz object with the extracted data
    const quiz = new Quiz(createQuiz);
    const savedQuiz = await quiz.save();

    // Update the user's quizzes array with the saved quiz ID
    const user = await User.findById(req.user._id);
    user.quizzes.push(savedQuiz._id);
    await user.save();

    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/submitquiz/:quizId', ensureAuthenticated,async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const submittedQuiz = await Quiz.findById(quizId);
    if (!submittedQuiz) {
      return res.status(404).send('Quiz not found');
    }

    const userAnswers = req.body;
    let score = 0;
    console.log(req.body)
    for (let i = 0; i < submittedQuiz.questions.length; i++) {
      const question = submittedQuiz.questions[i];
      const userAnswer = userAnswers[`answer${i}`];
      //console.log(userAnswer);  // Debugging
      if (userAnswer === question.correctAnswer) {
        score++;
      }
    }

    // Update the user's score for the submitted quiz
   
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const existingScore = user.quizScores.find(
      (quizScore) => quizScore.quiz.toString() === quizId
    );
    if (existingScore) {
      existingScore.score = score;
    } else {
      user.quizScores.push({ quiz: quizId, score });
    }

    await user.save();

    res.redirect('/profile');
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/attemptquiz/:quizId', async (req, res) => {
try {
  const quizId = req.params.quizId;
  const quiz= await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).send('Quiz not found');
  }
  res.render('attemptquiz.ejs', { quiz });
} catch (error) {
  console.error('Error fetching quiz:', error);
  res.status(500).send('Internal Server Error');
}
});
app.use(express.json());






app.get('/profile',ensureAuthenticated, async (req, res) => {
  try {
    // Retrieve the user's quiz scores
    const user = await User.findOne(req.user._id).populate('quizScores.quiz');
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Render the profile view with the user's quiz scores
    res.render('profile.ejs', { user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
});


//   // ...
  app.get('/search',(req,res)=>{
    res.render('search.ejs')
  })

 app.use(bodyParser.urlencoded({ extended: true }));



app.post('/search', (req, res) => {
  // Search for users with a username
  const { name } = req.body;

  // Perform validation on the received data
  if (!name) {
    return res.status(400).send('Please fill in all fields');
  }

  // Check if the user with the given username already exists in the database
  User.findOne({ name })
    .populate('quizzes', 'quizName') // Populate the 'quizzes' field in the user model with the associated quizzes
    .exec()
    .then(user => {
      if (!user) {
        return res.status(400).send('User with this username does not exist');
      }

      // Render the other user's profile with the name and quizzes
      res.render('otherusersprofile.ejs', { name: user.name, quizzes: user.quizzes });
    })
    .catch(error => {
      console.error('Error fetching user and quizzes:', error);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/otherusersprofile', async (req, res) => {
  try {
    const userId = req.query.userId; // Retrieve the user ID from the query parameter
    const name = req.query.name; // Retrieve the name from the query parameter

    console.log('userId:', userId);
    console.log('name:', name);

    const user = await User.findOne({ name }).exec(); // Find the user by name and execute the query

    console.log('user:', user);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const quizzes = await Quiz.find({ createdBy: user._id }, 'quizName').exec(); // Find quizzes by createdBy user's ID and execute the query

    console.log('quizzes:', quizzes);

    // Render the user's profile page with the quiz titles
    res.render('otherusersprofile.ejs', { name: user.name, quizzes });
  } catch (error) {
    console.error('Error fetching user and quiz titles:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.render('quizzes.ejs', { quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).send('Internal Server Error');
  }
});

  

// // // Connect to MongoDB Atlas
function connectDB() {
  const dbURI = 'mongodb+srv://bharanichandraprabhu:YdWd193HfywLgILu@quizhub.sweh1vr.mongodb.net/';

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected...');
    startServer();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
}
// Check if already connected to MongoDB Atlas
if (mongoose.connection.readyState === 1) {
    // Already connected, start the server
    startServer();
  } else {
    // Not connected, establish connection and then start the server
    connectDB();
  }
  
// Start the server

const PORT=process.env.PORT || 5000;
function startServer() {
  app.listen(PORT,"0.0.0.0", () => {
    console.log('Server started on port 3000');
  });
}