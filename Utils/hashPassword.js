const bcrypt = require('bcrypt');

const hashPassword = async(plainPassword)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt)
}


const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

module.exports = {hashPassword, comparePassword
    
}