const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    /* Recipe.create(data[0]);
    console.log(data[0].title); */
    Recipe.insertMany(data)
    .then(() => {
      data.forEach(recipe => {
        console.log(recipe.title)
      });
    })
    .catch(error => {
      console.error('Error getting your Recipes', error)
    })
    .then(() => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
      .then((recipe) => {console.log(`Recipe updated with ${recipe.duration}`)})
      .catch((error) => {console.error('Error updating'), error})
    })
    .then(() => {
      Recipe.deleteOne({ title: /carrot cake/i})
      .then((recipe) => console.log(`${recipe.deletedCount} Deleted successfully.`))
      .then(() => {
        mongoose.connection.close();
      })
      .catch((error => console.log('Error disconnecting.'), error))
    })
    .catch((error) => {console.error('Error deleting.'), error})
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
  
  

