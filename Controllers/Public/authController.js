const Auth = require('../../Models/authModel')
const {hashPassword, comparePassword} = require('../../Utils/hashPassword');
const {signToken} = require('../../Utils/JWTGenerator');
const catchAsync = require('../../Utils/catchAsync')

const registerUser = catchAsync(async(req, res)=>{
    const {name, email, password, role} = req.body;
    const existing = await Auth.findOne({email})
    if(existing){
        return res.status(400).json({
            message: 'Email Already Registered'
        })
    }

    const hashedPassword = await hashPassword(password)

    const user = await Auth.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    const token = signToken({id: user._id, role: user.role})

     res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
})


const loginUser = catchAsync(async(req, res)=>{
const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user._id, role: user.role });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
})

module.exports = {registerUser, loginUser}