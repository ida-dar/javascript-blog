'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  };

  /*const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorListSelector = '.list.authors';*/

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      title: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
      links: '.titles a'
    },
  };


  const titleClickHandler = function(event){
    event.preventDefault();

    const clickedElement = this;

    //console.log('Link was clicked!');
    //console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(select.listOf.links);

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    //console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(select.all.articles);

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };


  const generateTitleLinks = function(customSelector = ''){
    //console.log(generateTitleLinks);
    //console.log(customSelector);

    /* remove content of links in left column */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';
    let html = '';
    //console.log(`titleList: `, titleList);

    /* for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    //console.log(`articles: `, articles);

    for(let article of articles){
      /* get id of the article */
      const articleId = article.getAttribute('id');
      //console.log(`articleId: `, articleId);

      /* find the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;
      //console.log(`articleTitle: `, articleTitle);

      /* get the title from the title element */
      /*articleTitle.innerHTML;
      //console.log(`articleTitle.innerHTML: `, articleTitle.innerHTML);*/

      /* create HTML of the link */
      //const linkHTML = `<li><a href='#${articleId}'><span>${articleTitle}</span></a></li>`; // unnecessary with Handlebras
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      //console.log(`linkHTML: `, linkHTML);

      /* insert HTML into list of links*/
      //titleList.insertAdjacentHTML('beforeend', linkHTML); // with positions: beforebegin, afterbegin & afterend the list is styled by deafult for ul
      html = html + linkHTML;
      //console.log(`let html: `, html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log(`links: `, links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();


  const calculateParams = function(items){
    const params = {max: 0, min: 999999};
    for(let item in items){
      //console.log(`${item} is used ${items[item]} times`);

      if(items[item] > params.max){
        params.max = Math.max(items[item], params.max);
      } else if(items[item] < params.min){
        params.min = Math.min(items[item], params.min);
      }

      // Other options:

      /*if(items[item] > params.max){
      params.max = items[item];
      } else if(items[item] < params.min){
        params.min = items[item];
      }*/

      /* Syntax: condition ? valueIfTrue : valueIfFalse
      params.max = items[item] > params.max ? items[item] : params.max;
      params.min = items[item] < params.min ? items[item] : params.min;*/
    }

    return params;
  };

  calculateParams();


  const calculateClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

    // Another option:
    //const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.tagSizes.count + 1 );

    return opts.tagSizes.classPrefix + classNumber;
  };

  const generateTags = function(){
    /*create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    //console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagsList = article.querySelector(select.article.tags);
      //console.log(`tagsList: `, tagsList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log(`articleTagsArray: `, articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */
        //const linkHTML = ` <li><a href='#tag-${tag}'><span>${tag}</span></a></li>`;
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.articleTag(linkHTMLData);
        //console.log(`linkHTML: `, linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        //console.log(`html: `, html);

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
      //console.log(tagsList);

    /* END LOOP: for every article: */
    }
    /* find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateParams(allTags);
    //console.log('tagsParams:', tagsParams);
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* generate code of a link and add it to allTagsHTML */
      //allTagsHTML += `<li><a href=#tag-${tag} class="${calculateClass(allTags[tag], tagsParams)}">${tag}</a></li>`;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateClass(allTags[tag], tagsParams)
      });
    }
    /* END LOOP: for each tag in allTags: */

    /* add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    //console.log(`allTagsData: `, allTagsData);
  };

  generateTags();

  $(document).ready(function() {
    if(!$('#myCanvas').tagcanvas({
      //textColour: '#ff0000',
      outlineMethod: 'size',
      //outlineColour: '#e6ecff',
      outlineIncrease: 4,
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.05,
      textFont: null,
      textColour: null,
      minBrightness: 0.2,
      // weightMode:'size',
      // weight: false,
      // weightGradient: {
      //   0: '#f00', // red
      //   //0.33: '#ff0', // yellow
      //   //0.66: '#0f0', // green
      //   1: '#00f'  // blue
      // }
    },'tags')) {
      // something went wrong, hide the canvas container
      $('#meCanvasContainer').hide();
    }
  });

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log(`clickedElement: `, clickedElement);

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
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const allLinks = document.querySelectorAll(select.all.linksTo.tags);

    /* START LOOP: for each link */
    for(let link of allLinks) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();


  const generateAuthor = function(){
    /*create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    //console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector(select.article.author);
      //console.log(`authorWrapper: `, authorWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      //console.log(`articleAuthor: `, articleAuthor);

      /* generate HTML of the link */
      //const linkHTML = '<a href="#author-' + articleAuthor + '">by <span>' + articleAuthor + '</span></a>';
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.articleAuthor(linkHTMLData);
      //console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /*check if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]){

        /*add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
    /* find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    /* [NEW] create variable for all links HTML code */
    const authorsParams = calculateParams(allAuthors);
    //console.log('authorsParams:', authorsParams);
    //let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};

    for(let author in allAuthors){
      /* generate code of a link and add it to allAuthorsHTML */
      //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '('+ allAuthors[author]+')</a></li>';
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateClass(allAuthors[author], authorsParams)
      });

    /* END LOOP: for each author in allAuthors: */
    }
    /* add HTML from allAuthorsHTML to authorList */
    //authorList.innerHTML = allAuthorsHTML;
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    //console.log(`allAuthorsData: `, allAuthorsData);
  };

  generateAuthor();


  const authorClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log(`clickedElement: `, clickedElement);

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
  };

  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const allLinks = document.querySelectorAll(select.all.linksTo.authors);

    /* START LOOP: for each link */
    for(let link of allLinks) {

      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}
