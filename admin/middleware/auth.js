module.exports = {
    allowAdmin(req, res, next) {
        console.log(req.player);
        if (req.player.isAdmin) return next();
        
        next('Ты, не пройдёшь! Нужны права администратора!');
    }
};