// const restrictTo = (role) => {
//   return (req, res, next) => {
//     if (!req.user || req.user.role !== role) {
//       return res.status(403).json({ message: 'Access denied!' });
//     }
//     next();
//   };
// };

// module.exports = restrictTo;


const restrictTo = (role) => {
  return (req, res, next) => {
    console.log('🔐 RestrictTo Middleware - User:', req.user); 
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied!' });
    }
    next();
  };
};

module.exports = restrictTo;
