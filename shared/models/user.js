const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
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
    versionKey: false, // You should be aware of the outcome after set to false (add field '__v' )
    timestamps: true
});

User.virtual('isAdmin').get(function() {
    return this.role === 'admin';
});

User.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(next);
});

User.post('save', function(error, user, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Имя пользователя или адрес электронной почты заняты.'));
    } else {
        next(error);
    }
});

User.statics.authenticate = function(email, password) {
    return this.findOne({ email })
        .then(user => {
            if (!user) {
                let error = new Error('Пользователь не найден');
                error.status = 401;
                throw error;
            }

            return bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        let error = new Error('Неверный пароль');
                        error.status = 401;
                        throw error;
                    }

                    return user;
                });
        });
};

module.exports = mongoose.model('User', User);