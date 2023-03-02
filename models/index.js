const user = require('./user');
const post = require('./post');

user.hasMany(post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

post.belongsTo(user, {
    foreignKey: 'postId'
});

module.exports = { user, post };