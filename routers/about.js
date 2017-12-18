const { Router } = require('express');
const router = Router();

const fortunes = [
    "Победи свои страхи или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждёт приятный сюрприз.",
    "Будь проще везде, где только можно.",
];

// GET /about
router.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune});
});

module.exports = router;