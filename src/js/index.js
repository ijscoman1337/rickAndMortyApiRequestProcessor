import RickAndMortyController from './Control/RickAndMortyController';

// not implemented jet but would be nice: 
// views
    // detailed html output
    // console output
// ways to provide input (values are currently hardcoded obviously)
// paramconverters
// means of data storage

(async () => {
    const restController = new RickAndMortyController();

    // Show all Characters that exist (or are last seen) in a given Dimension;
    // const allCharactersByDimension = await restController.findAllCharactersByDimensionAsync({dimension: 1});
    // console.log(allCharactersByDimension);
    // Show all Characters that exist (or are last seen) at a given Location;
    // const allCharactersByLocation = await restController.findAllCharactersByLocationAsync({location: 1});
    // console.log(allCharactersByLocation);

    // Show all Characters that partake in a given Episode;
    // const allCharactersByEpisode = await restController.findAllCharactersByEpisodeAsync({episode: 1});
    // console.log(allCharactersByEpisode);

    // Showing all information of a Character (Name, Species, Gender, Location, Dimension, etc).
    const character = await restController.findCharacter({character: 1});
    console.log(character);

})();




















