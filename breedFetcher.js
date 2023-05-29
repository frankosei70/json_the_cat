const request = require('request');

// Step 1: Search for a breed
const searchBreed = (breedName, callback) => {
  const searchUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  request.get(searchUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(`Search request failed with status code ${response.statusCode}`, null);
      return;
    }

    const breeds = JSON.parse(body);
    if (breeds.length === 0) {
      callback(`Breed '${breedName}' not found.`, null);
      return;
    }

    const breed = breeds[0];
    callback(null, breed);
  });
};

// Step 2: Fetch breed data
const fetchBreedData = (breedName) => {
  searchBreed(breedName, (error, breed) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(`Breed Data for '${breedName}':`);
    console.log(breed);
  });
};

// Get the breed name from command-line arguments
const breedName = process.argv[2];

if (!breedName) {
  console.error('Please provide a breed name as a command-line argument.');
} else {
  // Invoke the function to fetch breed data
  fetchBreedData(breedName);
}
