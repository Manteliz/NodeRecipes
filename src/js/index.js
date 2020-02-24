import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base'; 

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

const controlSearch = async () => {

    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);
        await state.search.getResults();

        //Render UI
        searchView.clearSearchField();
        searchView.clearResultsList();
        searchView.displayResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    //TODO pressing RETURN key throws error but everything works anyways
    e.preventDefault();
    //TODO loading spinner
    controlSearch();
});