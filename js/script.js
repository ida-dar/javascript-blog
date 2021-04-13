"use strict";

/*document.getElementById("test-button").addEventListener("click", function(){
    const links = document.querySelectorAll(".titles a");
    console.log("links:", links);
});*/

const titleClickHandler = function(event) {
    event.preventDefault();

    const clickedElement = this;
    
    console.log("Link was clicked!");
    console.log(event);
    
    /* [DONE] remove class "active" from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    
    for(let activeLink of activeLinks) {
        activeLink.classList.remove("active");
    }

    /* [DONE] add class "active" to the clicked link */
    console.log("clickedElement:", clickedElement);
    clickedElement.classList.add("active");

    /* [DONE] remove class "active" from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");
    
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove("active");
    }

    /* [DONE] get "href" attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);
    
    /* [DONE] find the correct article using the selector (value of "href" attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class "active" to the correct article */
    targetArticle.classList.add("active");

}
  
const links = document.querySelectorAll(".titles a");
  
for(let link of links) {
    link.addEventListener("click", titleClickHandler);
}

{   
    const optArticleSelector = ".post",
        optTitleSelector = ".post-title",
        optTitleListSelector = ".titles";
    
    
    const generateTitleLinks = function() {
        console.log(generateTitleLinks);
        

        /* remove content of links in left column */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = "";
        console.log(`titleList: `, titleList);

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(`articles: `, articles);

        for(let article of articles) {

            /* get id of the article */
            const articleId = article.getAttribute("id");
            console.log(`articleId: `, articleId);

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(`articleTitle: `, articleTitle);

            /* get the title from the title element */
            /*articleTitle.innerHTML;
            console.log(`articleTitle.innerHTML: `, articleTitle.innerHTML);*/    

            /* create HTML of the link */
            const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
            console.log(`linkHTML: `, linkHTML);

            /* insert HTML into list of links*/


        }

    }

    generateTitleLinks();
}