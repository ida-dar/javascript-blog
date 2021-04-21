'use strict';

//const { active } = require('browser-sync');

{
  const titleClickHandler = function(event){
    event.preventDefault();

    const clickedElement = this;

    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-'


  const generateTitleLinks = function(customSelector = ''){
    console.log(generateTitleLinks);
    console.log(customSelector);

    /* remove content of links in left column */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //let html = '';
    console.log(`titleList: `, titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(`articles: `, articles);

    for(let article of articles){
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

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  function calculateTagsParams(tags){
    const params = {max: 0, min: 999999};
    for(let tag in tags){
      console.log(`${tag} is used ${tags[tag]} times`);

      if(tags[tag] > params.max){
      params.max = Math.max(tags[tag], params.max);
      } else if(tags[tag] < params.min){
        params.min = Math.min(tags[tag], params.min);
      }

      // Other options:

      /*if(tags[tag] > params.max){
      params.max = tags[tag];
      } else if(tags[tag] < params.min){
        params.min = tags[tag];
      }*/

      /* Syntax: condition ? valueIfTrue : valueIfFalse
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;*/
    }

    return params;
  }

  calculateTagsParams();


  function calculateTagClass(count, params){

  }

  function generateTags(){
    /*create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles){

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

        /*check if this link is NOT already in allTags */
        if(!allTags[tag]){

          /*add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      console.log(tagsList);

    /* END LOOP: for every article: */
    }
    /* find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    /* START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* generate code of a link and add it to allTagsHTML */
      allTagsHTML += `<li><a href=#tags-${tag} class="${calculateTagClass(allTags[tag], tagsParams)}">${tag} (${allTags[tag]})</a></li>`;
      console.log(`allTagsHTML: `, allTagsHTML);
    }
    /* END LOOP: for each tag in allTags: */

    /* add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let tagLink of allTagLinks){

      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const allLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for(let link of allLinks) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function generateAuthor(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(`authorWrapper: `, authorWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(`articleAuthor: `, articleAuthor);

      /* generate HTML of the link */
      const linkHTML = `<a href='#author-${articleAuthor}'>by <span>${articleAuthor}</span></a>`;
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
  }

  generateAuthor();


  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(`clickedElement: `, clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for(let authorLink of allAuthors){

      /* add class active */
      authorLink.classList.add('active');

    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const allLinks = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */
    for(let link of allLinks) {

      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();
}
