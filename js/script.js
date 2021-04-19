'use strict';

//const { active } = require('browser-sync');

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


  const generateTitleLinks = function(customSelector = '') {
    console.log(generateTitleLinks);
    console.log(customSelector)

    /* remove content of links in left column */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //let html = '';
    console.log(`titleList: `, titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(`articleTagsArray: `, articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */
        const linkHTML = ` <li><a href='#tag-${tag}'><span>${tag}</span></a></li>`;
        console.log(`linkHTML: `, linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(`html: `, html);

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;

    /* END LOOP: for every article: */
    }

  }

  generateTags();



  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(`clickedElement: `, clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = tag.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let tagLink of allTagLinks) {

      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */


    /* START LOOP: for each link */


      /* add tagClickHandler as event listener for that link */


    /* END LOOP: for each link */

  }

  addClickListenersToTags();


}
