const user = require('./user');
const post = require('./post');
const comment = require('./comment');

post.hasMany(comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

post.belongsTo(user, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

comment.belongsTo(user, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});




module.exports = { user, post, comment };