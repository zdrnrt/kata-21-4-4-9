
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
                sendQuery();
            },
            700
        )
    }
}
const searchListener = search();

function sendQuery(){
    console.log('sendQuery');

    let value = document.querySelector('.js-search').value.trim();
    if (!!value == false)
        return

    try {
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(value)}+in:topics&per_page=5`)
        .then( 
            (response) => response.json(),
            (error) => {
                console.error('sendQuery ERROR', new Error(error))
            }
        )
        .then(
            (data) => {
                let list = document.querySelector('.js-search-list');
                if (data.items.length > 0){
                    data.items.forEach(element => {
                        console.log(element)
                        list.insertAdjacentHTML(
                            'beforeend',
                            `
                                <div class="search__preview" onclick="addItem(this);" data-params='${JSON.stringify(element)}'>
                                    ${element.name}
                                </div>
                            `
                        )
                    });
                } else {
                    list.insertAdjacentHTML(
                        'beforeend',
                        `
                            <div class="search__preview search__preview--empty">
                                Ничего не найдено
                            </div>
                        `
                    )
                }
            }
        )
        .catch (
            (error) => {
                console.error('sendQuery ERROR', new Error(error))
            }
        )
    } catch{
        (error) => {
            console.error('sendQuery ERROR', new Error(error))
        }
    }
}

function addItem(element){
    let result = document.querySelector('.js-result-list');
    let data = JSON.parse(element.dataset.params);
    result.insertAdjacentHTML(
        'beforeend',
        `
            <div class="result__item js-result-item">
                <div class="result__info">
                    <div>Name: ${data.name}</div>
                    <div>Owner: ${data.owner.login}</div>
                    <div>Stars: ${data.stargazers_count}</div>
                </div>
                <button class="result__close" onclick="this.closest('.js-result-item').remove();">
                    <svg viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 40.5L44 2" stroke-width="4"/>
                        <path d="M44 40.5L2 2" stroke-width="4"/>
                    </svg>
                                        
                </button>
            </div>
        `
    )
    document.querySelector('.js-search-list').innerHTML = '';
    document.querySelector('.js-search').value = '';

}

let searchField = document.querySelector('.js-search');

// searchField.addEventListener('input', search);
searchField.addEventListener('input', searchListener);