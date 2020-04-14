import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base'; 

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

/**
 * Search Controller
*/

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

/**
 *  Recipe Controller
*/

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
        likesView.toggleLikeBtn(state.likes.isLiked(id));
    }
    
}

['hashchange', 'load'].forEach(event => window.addEventListener(event , controlRecipe));

/**
 * LIST CONTROLLER
*/

const controlList = () => {
    if(!state.list) state.list = new List();
    state.recipe.ingredients.forEach( el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
    
};

// Handle delete and update list item events
elements.list.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/**
 * LIKES CONTROLLER
 */

 const controlLikes = () => {
    const id = window.location.hash.replace('#' , '');
    if (!state.likes.isLiked(id)) {
        state.likes.addItem(id, state.recipe.img, state.recipe.title, state.recipe.author);
        const like = {
            id,
            img : state.recipe.img,
            title : searchView.shortenTitle(state.recipe.title),
            publisher : state.recipe.author
        };
        likesView.renderLike(like);
    } else {
        state.likes.deleteItem(id);
        likesView.deleteLike(id);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    likesView.toggleLikeBtn(state.likes.isLiked(id));
 };

 // Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.items.forEach(like => likesView.renderLike(like));
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // decrease servings button has beem clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        // increase servings button has been clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //Add to shopping list button has been clicked
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        // Like button clicked
        controlLikes();
    }
});