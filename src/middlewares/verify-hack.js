const IS_ADMIN = true;

const admin = (req, res, next) => {
    if (!IS_ADMIN) return res.send({ error: "Usuario no autorizado" });
  
    next();
  };
  
  export { admin };