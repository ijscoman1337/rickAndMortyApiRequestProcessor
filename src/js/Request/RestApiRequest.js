import UrlBuilder from './UrlBuilder';

class RestApiRequest {
    
    constructor(baseUrlString = "https://rickandmortyapi.com/api"){ 
        this.url = "";
        this.baseUrlString = baseUrlString;
        this.urlString = this.baseUrlString;    
    }

    newUrl(){
        this.url = new UrlBuilder(this);
        return this.url;   
    }

    async fetchAsync() {
        const response = await fetch(this.url.urlString);
        return await response.json();
    }

};


export default RestApiRequest;
