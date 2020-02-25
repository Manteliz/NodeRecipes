import {elements} from './base';

export const getInput = () => elements.searchField.value;

const handleRecipe = recipe => {
    const title = shortenTitle(recipe.title);

    //TODO href
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
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

export const displayResults = (recipes, page = 1, resultsPerPage = 10 ) => {

    // 10 results per page = 0, 1, 2.... 9. Then 10, 11, 12 ... 19. Then 20, 21, 22.... 29 
    const start = (page - 1) * resultsPerPage;
    const finish =  page * resultsPerPage;   // until but not included in the Array.slice() method  ==> 10, 20, 30

    recipes.slice(start, finish).forEach(handleRecipe);
    renderButtons(page, resultsPerPage , recipes.length);
}

export const clearSearchField  = () => {
    elements.searchField.value = '';
}

export const clearResultsList = () => {
    elements.resultsList.innerHTML = '';
}

export const clearResultsPageButtons = () => {
    elements.resultsPages.innerHTML = '';
}

const renderButtons = (page, resultsPerPage, size) => {
    const totalPages = Math.ceil( size / resultsPerPage );

    let markup;
    if ( page === 1 && totalPages > 1){
        //only forward button
        markup = createButton('forward', page);

    } else if ( page === totalPages && totalPages > 1){
        //only the backwards button
        markup = createButton('backwards', page);

    } else if (totalPages > 1){
        //both backwards and forward button
        markup = `
            ${createButton('backwards', page)}
            ${createButton('forward', page)}
        `
    }

    elements.resultsPages.insertAdjacentHTML('afterbegin', markup);

}

const createButton = (type, page) => `
                <button class="btn-inline results__btn--${type === 'forward' ? 'next' : 'prev' }">
                    <span>Page ${type === 'forward' ? page + 1 : page -1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'forward' ? 'right' : 'left'}"></use>
                    </svg>                  
                </button>
`;

