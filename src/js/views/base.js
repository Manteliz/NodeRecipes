export const elements = {
    searchForm: document.querySelector('.search'),
    searchField: document.querySelector('.search__field'),
    resultsList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    resultsPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

export const renderLoader = parent => {
    const markup = `
        <div class ="loader"> 
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg> 
        </div>
    `

    parent.insertAdjacentHTML('afterbegin', markup);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}

