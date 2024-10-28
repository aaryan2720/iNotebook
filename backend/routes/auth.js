const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "WelcometoInotebook$$$$user";

// ROUTE1:Creating a user using the POST method at api/auth/createuser. Doesn't require auth
router.post(
  '/createuser',
  [
    body('name', 'Please enter a unique name').notEmpty(),
    body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    body(
      'password',
      'Please enter a password with 8 or more characters and at least one uppercase letter, one lowercase letter, one number, and one special character'
    ).isStrongPassword(),
  ],
  async (req, res) => {
    let succcess = false;
    try {
      console.log(req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
      }

      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.password, salt);

      // Create a new user instance with the request body
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      // Respond with a welcome message and the user ID
      succcess = true;

      res.json({ succcess,message: 'Welcome to iNotebook!', authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE2:Creating a user using the POST method at api/auth/login. Doesn't require login
router.post(
  '/login',
  [
    body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    body('password', 'Password can not be blank').exists(),
  ],
  async (req, res) => {
    let succcess = false;

    try {
      console.log(req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          succcess = false;

          return res.status(400).json({ succcess ,error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);

        if (!passwordCompare) {
          succcess = false;
          return res.status(400).json({ succcess,error: "Please try to login with correct credentials" });

        }

        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        // Respond with a welcome message and the user ID
        succcess = true;
        res.json({ succcess, message: 'Welcome to iNotebook!', authToken });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);
// ROUTE3:get logged in user details using the POST method at api/auth/getuser.  requires login
router.post('/getuser',fetchuser, async (req, res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}})

module.exports = router;
