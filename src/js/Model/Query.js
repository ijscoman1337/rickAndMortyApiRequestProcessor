import Toolbox from '../Utility/Toolbox';
import RestApiRequest from '../Request/RestApiRequest';

// TODO: to do a for ... in loop every time seems repetitive and unnescessary. 
// make more reusable and optionally move to the request class, thereby making the query methods dumber and less bloated

class Query {
    constructor(entityName, identifier = ""){
        this.requestBuilder = new RestApiRequest();
        this.toolbox = new Toolbox();

        this.entityName = entityName;
        this.entity = {};
        if(typeof entityName === 'string' || entityName instanceof String){
            this.entity[`${entityName}`] = identifier;
        } else {
            this.entity = identifier;
        }
    }

    async findAllByDimensionAsync(dimension) {
        let totalResultsArray = [];
        // find all characters by dimension (limited 20)
        const url = this.requestBuilder.newUrl();

        for (const prop in this.entity) {
            url.newEntity(prop, this.entity[prop]);
        }

        for (const prop in dimension) {
            url.newFilter(prop, dimension[prop]);
        }

        const request = url.createUrl();
        const data = await request.fetchAsync();

        // if results are 20 or more it will be paginated, so if we want all characters, we need to do one new query per page (very tedious)
        if ((data.hasOwnProperty('results') && data.results.length === 20) &&
            (data.hasOwnProperty('info') && data.info.hasOwnProperty('pages') && data.info.pages >= 2)) {
            const pageCount = data.info.pages;

            for (let index = 0; index < pageCount; index++) {
                const url = this.requestBuilder.newUrl();
                // const page = {page: index + 1};
                for (const prop in this.entity) {
                    url.newEntity(prop, this.entity[prop]);
                }

                for (const prop in dimension) {
                    url.newFilter(prop, dimension[prop]);
                }

                url.newFilter('page', index + 1);

                const data = await url.createUrl().fetchAsync();
                totalResultsArray = [...new Set([...totalResultsArray, ...data.results])];
            }
        }
        else if (data.hasOwnProperty('results') && data.results.length) {
            totalResultsArray = data.results;
        }

        return totalResultsArray;
    }

    async findByIdAsync(id){
        this.entity[this.entityName] = id;
        const url = this.requestBuilder.newUrl();

        for (const prop in this.entity) {
            url.newEntity(prop, this.entity[prop]);

        }

        const data = await url.createUrl().fetchAsync();

        return data;
    }

}

export default Query;