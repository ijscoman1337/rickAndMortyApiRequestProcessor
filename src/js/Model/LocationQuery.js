import Query from './Query';

class LocationQuery extends Query {
    
    constructor(entityName = 'location'){
        super(entityName);
    }

    async getResidentIdsFromLocationsByDimension(dimension){
        const locations = await this.findAllByDimensionAsync(dimension);
        let residentIds = [];
        locations.forEach(location => {
            if(location.hasOwnProperty('residents') && location.residents.length){
                location.residents.forEach(url => {
                    residentIds.push(this.toolbox.splitElementFromUrlByPosition(url, 'last'));
                });
            }        
        });
        return residentIds;
    }

    async getResidentIdsFromLocation(location){
        let residentIds = [];

        if(location.hasOwnProperty('residents') && location.residents.length){
            location.residents.forEach(url => {
                residentIds.push(this.toolbox.splitElementFromUrlByPosition(url, 'last'));
            });
        }
        return residentIds;
    }

}

export default LocationQuery;