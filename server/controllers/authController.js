import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashed, role });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie('refreshToken', refreshToken, {
        path: '/refresh',
        httpOnly: true,
        secure: true, // when https - true, http - false
        sameSite: 'none',// strict - use in different domain/subdomain
      })
      .json({ accessToken, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REFRESH TOKEN
export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

    jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err || user._id.toString() !== decoded.id)
        return res.status(403).json({ message: 'Invalid token' });

      const { accessToken, refreshToken } = generateTokens(user);
      user.refreshToken = refreshToken;
      user.save();

      res
        .cookie('refreshToken', refreshToken, {
          path: '/refresh',
          httpOnly: true,
          secure: true, // when https - true, http - false
          sameSite: 'none',// strict - use in different domain/subdomain
        })
        .json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204);

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.sendStatus(204);

    user.refreshToken = null;
    await user.save();

    res.clearCookie('refreshToken', {
      path: '/refresh',
      httpOnly: true,
      secure: true, 
      sameSite: 'none',
    });
    
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
