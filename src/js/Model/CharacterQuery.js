import Query from './Query';
import LocationQuery from './LocationQuery';
import EpisodeQuery from './EpisodeQuery';

class CharacterQuery extends Query {
    
    constructor(entityName = 'character'){
        super(entityName);
    }

    async findAllAndLastSeenAsync(dimension){
        let allCharactersByDimension = [];
        let allResidents = [];
        // A. people that are in a given dimension
        allCharactersByDimension = await this.findAllByDimensionAsync(dimension); 
        // B. people that are last seen aka residents in a location in a given dimension
        allResidents = await new LocationQuery().getResidentIdsFromLocationsByDimension(dimension).then(idsArray => this.findAllCharactersByIdsArrayAsync(idsArray));
        return this.toolbox.removeDuplicatesFromArrayWithObjects([...new Set([...allCharactersByDimension, ...allResidents])], 'id');
    }

    async findLastSeenByLocationAsync(location){
        let allResidents = [];
        // A. to start, there are no people directly related to a location like they are with a dimension, 
        // there's only resident urls and therefore only the second request is applied

        // B. people that are last seen aka residents in a location
        const locationQuery = new LocationQuery();
        allResidents = await locationQuery.findByIdAsync(location.location)
        .then(location => locationQuery.getResidentIdsFromLocation(location))
        .then(residentIds => this.findAllCharactersByIdsArrayAsync(residentIds));
        return allResidents;
    }

    async findAllCharactersInEpisodeAsync(episode){
        let allCharacters = [];
        // A. to start, there are no people directly related to a episode like they are with a dimension, 
        // there's only character urls and therefore only the second request is applied

        // B. people that are last seen aka residents in a location
        const episodeQuery = new EpisodeQuery();
        allCharacters = await episodeQuery.findByIdAsync(episode.episode)
        .then(episode => episodeQuery.getCharacterIdsFromEpisode(episode))
        .then(characterIds => this.findAllCharactersByIdsArrayAsync(characterIds));
        return allCharacters;
    }

    async findAllCharactersByIdsArrayAsync(characterIds = []){
        // Yep, at some point the api started giving me shit, 
        // it stopped giving me errors when i limited my array to 37, good luck figuring that one out. 
        // Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://rickandmortyapi.com/api/character/%20%20%20%20% etc...
        // this is how i found outconst array = characterIds.slice(Math.max(characterIdsTwo.length - 37, 1));
        // For now just believe me that this works
        const url = this.requestBuilder.newUrl();
        for (const prop in this.entity) {
            url.newEntity(prop, characterIds);
        }
        const data = await url.createUrl().fetchAsync();
        return data;
    }

}

export default CharacterQuery;