const sequelize = require('../config/connection');// import the sequelize connection from the config folder
const seedPosts = require('./postData');// import the seed data from the seedData folder

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });// Synchronize the database, dropping any existing tables and recreating them
        console.log('\n ===== DATABASE SYNCED =====\n');// Log a message to the console

        await seedPosts();// Seed the database with the "seedFood" array
        console.log('\n ===== POSTS SEEDED =====\n');// Log a message to the console

        process.exit(0);// Exit the process
    } catch (e) {
        console.error(e);// Log an error message to the console
        process.exit(1);// Exit the process
    }
};

seedAll();