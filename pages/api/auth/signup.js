const { default: User } = require('@/models/User');
const { default: db } = require('@/utils/db');
import bcrypt from 'bcryptjs';

async function signUp(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    return res.status(422).json({
      message: 'Validation error',
    });
  }

  await db.connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(422).json({
      message: 'User existis already',
    });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();

  db.disconnect();
  res.status(201).send({
    message: 'User Created',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default signUp;
