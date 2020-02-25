import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base'; 

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
        searchView.clearSearchField();
        searchView.clearResultsList();
        searchView.clearResultsPageButtons();
        renderLoader(elements.searchResults);
        await state.search.getResults();
        clearLoader();
        //Render UI
        searchView.displayResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    //TODO pressing RETURN key throws error but everything works fine anyways
    e.preventDefault();
    controlSearch();
});