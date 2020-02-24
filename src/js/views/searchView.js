import {elements} from './base';

export const getInput = () => elements.searchField.value;

const handleRecipe = recipe => {
    const title = shortenTitle(recipe.title);

    //TODO href
    const markup = `
                <li>
                    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;

    elements.resultsList.insertAdjacentHTML('beforeend', markup);

}

const shortenTitle = (title, limit = 17) => {
    //there might be a better way to implement the algorithm using 'while'
    if(title.length > limit){
        const newTitle = [];
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        title = newTitle.join(' ')+' ...';
    }
    return title;
}

export const displayResults = recipes => {

    recipes.forEach(handleRecipe);
}

export const clearSearchField  = () => {
    elements.searchField.value = '';
}

export const clearResultsList = () => {
    elements.resultsList.innerHTML = '';
}