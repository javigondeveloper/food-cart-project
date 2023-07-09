import User from '@/models/User';
import db from '@/utils/db';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';

async function updateProfile(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getToken({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const user = { ...session };
  const { name, email, password } = req.body;
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i;

  if (
    !name ||
    !emailRegExp.test(email) ||
    (password && password.trim().length < 5)
  ) {
    return res.status(422).json({ message: 'Validation error' });
  }

  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;
  if (password) {
    toUpdateUser.password = bcrypt.hashSync(password);
  }
  await toUpdateUser.save();
  await db.disconnect();
  res.send({ message: 'User updated' });
}

export default updateProfile;
