const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup');
});
// Register a new User
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      res.render('login');
      // return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.render('login');
    // res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
})
router.post('/login', async (req, res) => {
  console.log("ghus gya");
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log("Checking password");
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.redirect('/login');
    }
    console.log("Matched password");

    // Generate JWT
    const payload = {
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
      },
    };
    console.log("hello");
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });


    console.log("cookie set succesfully");
    res.render('../views/home' , {name : user.name , email:user.email});


  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example (e.g., student dashboard)
router.get('/home', authMiddleware, (req, res) => {
  res.render('home', { title: 'Home Page', user: req.user.name, showMessage: true });
});
router.get("/forgetPass", (req, res) => {
  res.render('forgetPass');
})
module.exports = router;