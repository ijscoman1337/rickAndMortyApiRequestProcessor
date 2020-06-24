import Query from './Query';

class EpisodeQuery extends Query {
    
    constructor(entityName = 'episode'){
        super(entityName);
    }

    async getCharacterIdsFromEpisode(episode){
        let characterIds = [];

        if(episode.hasOwnProperty('characters') && episode.characters.length){
            episode.characters.forEach(url => {
                characterIds.push(this.toolbox.splitElementFromUrlByPosition(url, 'last'));
            });
        }
        return characterIds;
        
    }

}

export default EpisodeQuery;