module.exports = {
    allowAdmin(req, res, next) {
        console.log(req.user);
        if (req.user.isAdmin) return next();
        
        next('Ты, не пройдёшь!');
    }
};