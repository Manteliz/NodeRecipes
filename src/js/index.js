//Main App Controller

import Search from './models/Search';

const query = 'pizza';
const search = new Search(query);
search.getResults();