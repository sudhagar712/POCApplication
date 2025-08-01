import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { name, email, password} = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password});
  const jwt = generateToken(user._id, user.role,res);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token:jwt,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  res.json({
    _id: user._id,
    name: user.name,
    role: user.role,
    token: generateToken(user._id, user.role,res),
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


//getSingleUser
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

   
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};





//logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out successfully" });
};

