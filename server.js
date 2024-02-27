const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public')); 

const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));


app.route('/login')
.get((req, res) => {
  res.sendFile(__dirname + '/public/login.html');
})
.post( (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email_id === email && user.password === password);
  if (user) {
    res.cookie('loggedInUser', user.email_id);
    res.status(200).send('Logged in successfully');
  } else {
    res.status(401).send('login failed');
  }
});

app.get('/home', (req, res) => {
  const loggedInUser = req.cookies.loggedInUser;
  if (loggedInUser) {
    res.status(200).sendFile(__dirname + '/public/home.html');
  } else {
    res.redirect('/login');
  }
});


app.get('/logout', (req, res) => {
  res.clearCookie('loggedInUser');
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
