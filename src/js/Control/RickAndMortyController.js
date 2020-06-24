import CharacterQuery from '../Model/CharacterQuery';

class RickAndMortyController {
    
    // Show all Characters that exist (or are last seen) in a given Dimension;
    async findAllCharactersByDimensionAsync(dimension){
        const characterQuery = new CharacterQuery();
        const result = await characterQuery.findAllAndLastSeenAsync(dimension);
        return result;
    };

    // Show all Characters that exist (or are last seen) at a given Location;
    async findAllCharactersByLocationAsync(location){
        const characterQuery = new CharacterQuery();
        const result = await characterQuery.findLastSeenByLocationAsync(location);
        return result;
    };

    // Show all Characters that partake in a given Episode;
    async findAllCharactersByEpisodeAsync(episode){
        const characterQuery = new CharacterQuery();
        const result = await characterQuery.findAllCharactersInEpisodeAsync(episode);
        return result;
    };

    async findCharacter(character){
        const characterQuery = new CharacterQuery();
        const result = await characterQuery.findByIdAsync(character.character);
        return result;
    }

}

export default RickAndMortyController;

