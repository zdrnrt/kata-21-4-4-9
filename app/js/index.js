
//https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
//https://api.github.com/search/repositories?q=name:react
//https://api.github.com/search/repositories?q=react+in:topics
//https://api.github.com/search/repositories?q=react+in:topics
//https://api.github.com/search/repositories?q=name:react

const search = (e) => {
    let state;
    return function() {
        clearTimeout(state);
        state = setTimeout(
            () => {
                sendQuery('attempt');
            },
            700
        )
    }
}
const searchListener = search();

function sendQuery(query){
    console.log('sendQuery', query)
}

let searchField = document.querySelector('.js-search');

searchField.addEventListener('input', searchListener);