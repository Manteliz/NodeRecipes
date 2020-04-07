import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults() {
        try {
            //API documentation at https://forkify-api.herokuapp.com/
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            console.log(error); //TODO
            alert('Something went wrong with the search...');
        }

    }

}
