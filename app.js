const API_KEY = "91976ec44a2d4f9ba6028edc8a037637";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const cardNewsTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = cardNewsTemplate.content.cloneNode(true);
        fillDataInCard(article,cardClone);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(article,cardClone) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-src');
    const newsDesc = cardClone.querySelector('#news-docs');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "Asia/Jakarta"
    })

    newsSrc.innerHTML = `${article.source.name}. ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_black");
    })
}

let curSelectedNav = null;
function navItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

    searchText.value = "";
}

const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})