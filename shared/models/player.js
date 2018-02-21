const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Player = new Schema({
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }], // храню ObjectId команд из Team (_id: ObjectId(...))
    game: [{ type: Schema.Types.String, default: '' }],
    name: String,
    url: String,

    email: {
        type: String,
        required: [true, 'Поле Email обязательно для заполнения.'],
        unique: true,
        trim: true,
        minlength: [7, 'Адрес электронный почты слишком короткий.'],
        maxlength: [256, 'Адрес электронный почты слишком длинный.'],
        match: [/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/, 'Неверный формат адреса электронной почты.']
    },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, {
    timestamps: true
});

Player.virtual('isAdmin').get(function() {
    return this.role === 'admin';
});
Player.virtual('isPlayer').get(function() {
    return this.role === 'player' || this.role === 'admin';
});

Player.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(next);
});

Player.post('save', function(error, player, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Имя пользователя или адрес электронной почты заняты.'));
    } else {
        next(error);
    }
});

Player.statics.authenticate = function(email, password) {
    return this.findOne({ email })
        .then(player => {
            if (!player) {
                let error = new Error('Пользователь не найден');
                error.status = 401;
                throw error;
            }

            return bcrypt.compare(password, player.password)
                .then(isEqual => {
                    if (!isEqual) {
                        let error = new Error('Неверный пароль');
                        error.status = 401;
                        throw error;
                    }

                    return player;
                });
        });
};

module.exports = mongoose.model('Player', Player);