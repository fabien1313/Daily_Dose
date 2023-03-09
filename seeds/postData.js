const { post } = require('../models');

const postData = [
    {
        title: 'My first post',
        content: 'This is my first post',
    },
    {
        title: 'My second post',
        content: 'This is my second post',
    },
    {
        title: 'My third post',
        content: 'This is my third post',
    },
    {
        title: 'My fourth post',
        content: 'This is my fourth post',
    },
    {
        title: 'My fifth post',
        content: 'This is my fifth post',
    },
];

async function seedPosts() {// create a function to seed the foods table
	try {
		await post.bulkCreate(postData);// use the bulkCreate() method to insert the seed data into the foods table
		console.log('Seed data for posts table inserted successfully.');// log a success message to the console
	} catch (error) {
		console.error('Error seeding data for posts table:', error);// log an error message to the console
	}
}

module.exports = seedPosts;// export the seedFoods function to be used in other parts of the application