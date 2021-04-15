'use strict';

{
  const titleClickHandler = function(event) {
    event.preventDefault();

    const clickedElement = this;

    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';


  const generateTitleLinks = function() {
    console.log(generateTitleLinks);


    /* remove content of links in left column */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //let html = '';
    console.log(`titleList: `, titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(`articles: `, articles);

    for(let article of articles) {
      /* get id of the article */
      const articleId = article.getAttribute('id');
      console.log(`articleId: `, articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(`articleTitle: `, articleTitle);

      /* get the title from the title element */
      /*articleTitle.innerHTML;
      console.log(`articleTitle.innerHTML: `, articleTitle.innerHTML);*/

      /* create HTML of the link */
      const linkHTML = `<li><a href='#${articleId}'><span>${articleTitle}</span></a></li>`;
      console.log(`linkHTML: `, linkHTML);

      /* insert HTML into list of links*/
      titleList.insertAdjacentHTML('beforeend', linkHTML); // with positions: beforebegin, afterbegin & afterend the list is styled by deafult for ul
      //html = html + linkHTML;
      //console.log(`let html: `, html);
    }

    //titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(`links: `, links);

    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();




  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles) {

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log(`tagsList: `, tagsList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */


      /* split tags into array */


      /* START LOOP: for each tag */


        /* generate HTML of the link */


        /* add generated code to html variable */


      /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */


    /* END LOOP: for every article: */
    }

  }

  generateTags();

}
