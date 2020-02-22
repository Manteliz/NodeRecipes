import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            console.log(result);
            console.log(result.data);
            console.log(result.data.recipes[2].title);
        } catch (error) {
            console.log(error);
        }

    }

}
