class UrlBuilder {

    constructor(request){
        this.baseUrlString = request.baseUrlString;
        this.urlString = request.baseUrlString;
        this.request = request;
        this.entityArray = [];
        this.filterArray = [];
    }
    
    newFilter(key, value = ""){

        if(
            (typeof key === 'string' || key instanceof String) && 
            (typeof value === 'string' || value instanceof String || typeof value === 'number' || Array.isArray(value))
        ){
            this.filterArray.push({key: key, value: value});
        }
        return this;
    }

    newEntity(key, value = ""){

        if (
            (typeof key === 'string' || key instanceof String) && 
            (typeof value === 'string' || value instanceof String || typeof value === 'number' || Array.isArray(value)) && 
            key !== "" 
        ) {
            this.entityArray.push({key: key, value: value});
        }
        return this;
    }

    createUrl(){
        this.addEntityArrayToUrl(this.entityArray);
        this.addFilterArrayToUrl(this.filterArray);
        return this.request;

    }

    addFilterArrayToUrl(filterArray) {
        if (this.urlString !== "" && typeof filterArray !== 'undefined' && filterArray.length > 0) {
            filterArray.forEach((filter, index) => {
                if (Array.isArray(filter.value)) {
                    this.convertValueToSequence(filter);
                }
                this.urlString = `${this.urlString}${index === 0 ? "?" : "&"}${filter.key}=${filter.value}`;
            });
        }
    }

    addEntityArrayToUrl(entityArray) {
        entityArray.forEach(entity => {
            if (Array.isArray(entity.value)) {
                this.convertValueToSequence(entity);
            }
            // example result: "https://rickandmortyapi.com/api/character"
            this.urlString = `${this.urlString}/${entity.key}`;

            if (entity.value !== "") {
                // example result: "https://rickandmortyapi.com/api/character/1"
                this.urlString = `${this.urlString}/${entity.value}`;
            }
        });
    }

    convertValueToSequence(keyValueObject, seperator = ',') {
        let string = "";
        keyValueObject.value.forEach(element => {
            string = `
                ${string}
                ${seperator}
                ${element}
                `;
        });
        keyValueObject.value = string;
    }
}

export default UrlBuilder;