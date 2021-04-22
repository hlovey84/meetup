const user_meetup = require('./user_meetup');
const User = require('./user');
const Meetup = require('./meetup');

// Relacion NaN entre User y Meetup.
// foreignKey: UserId, MeetupId
User.belongsToMany(Meetup, {
    as:'meetup',
    through: user_meetup,
});

Meetup.belongsToMany(User, {
    as:'user',
    through: user_meetup,
});
//Fin relacion User MeetUp