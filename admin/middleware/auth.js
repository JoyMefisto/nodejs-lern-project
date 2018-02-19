module.exports = {
    allowAdmin(req, res, next) {
        if (req.player.isAdmin) return next();
        
        next('Ты, не пройдёшь! Нужны права администратора!');
    }
};