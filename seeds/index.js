const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6295b0e89cc4e4d0ef1a9420',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Most beautiful places, enjoy your life!',
            price,
            geometry:  { 
              type : "Point", 
              coordinates : [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dbdvhazo3/image/upload/v1654188915/YelpCamp/u9v2dlp7ykyfzy84oo5j.jpg',
                  filename: 'YelpCamp/u9v2dlp7ykyfzy84oo5j',
                },
                {
                  url: 'https://res.cloudinary.com/dbdvhazo3/image/upload/v1654188915/YelpCamp/vhwp68kxphbcepspbqoy.jpg',
                  filename: 'YelpCamp/vhwp68kxphbcepspbqoy',
                },
                {
                  url: 'https://res.cloudinary.com/dbdvhazo3/image/upload/v1654188915/YelpCamp/y7ycet695pcdimtdwwsl.jpg',
                  filename: 'YelpCamp/y7ycet695pcdimtdwwsl',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})