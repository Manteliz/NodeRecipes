import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base'; 

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

/*Search Controller*/

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

elements.resultsPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if(button){
        searchView.clearResultsPageButtons();
        searchView.clearResultsList();
        searchView.displayResults(state.search.result, parseInt(button.dataset.goto));
    }

});

/* Recipe Controller */

const controlRecipe = async () => {

    const id = window.location.hash.replace('#' , '');

    if (id) {
        //Prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        //Render recipe
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        state.recipe.calcTime();
        state.recipe.calcServings();
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    }
    
}

['hashchange', 'load'].forEach(event => window.addEventListener(event , controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // decrease servings button has beem clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            //recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        // increase servings button has been clicked
        state.recipe.updateServings('inc');
        //recipeView.updateServingsIngredients(state.recipe);
    }
    recipeView.clearRecipe();
    recipeView.renderRecipe(state.recipe);
});