'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleAttribute = clickedElement.getAttribute('href');
  console.log('articleSelector');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleAttribute);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorListSelector='.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  function clearTitleLinks(){
    titleList.innerHTML = '';
  }
  clearTitleLinks();

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = ' ';

  for(let article of articles){
    article.addEventListener('click', generateTitleLinks);
    console.log(article);


    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* create HTML of the link */

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle}; //dodanie szablonów handlebars
    const linkHTML = templates.articleLink(linkHTMLData); //dodanie szablonów handlebars
    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

//Moduł 6

function calculateTagsParams(tags){

  const params = {
    max: 0,
    min: 999999,
  };
  
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  } 
  
  return params;
}

function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;

}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){
    // article.addEventListener('click', generateTags);
    console.log(article);

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log('Tags list: ', tagsList);

    /* make html variable with empty string */

    let html = ' ';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray:',articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */

      // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      const linkHTMLData = { id: tag, title: tag}; //dodanie Handlebars
      const linkHTML = templates.tagLink(linkHTMLData); //dodanie Handlebars

      console.log(linkHTML);

      /* add generated code to html variable */

      html += linkHTML + ' ';
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags[tag]) {

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
  
      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */

  let allTagsHTML = '';  

  /* [NEW] START LOOP: for each tag in allTags: */
  
  for(let tag in allTags){
  
    /* [NEW] generate code of a link and add it to allTagsHTML */
  
    /* allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' ' + '(' + allTags[tag] + ')  </a></li>';
    console.log('allTagsHTML:',allTagsHTML); */

    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>'; 
    
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;
    
  }
 
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  
  tagList.innerHTML = allTagsHTML;

}

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
 
  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for(let activeTag of activeTags){

    /* remove class active */

    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let tagLink of tagLinks){

    /* add class active */

    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);
    
    /* END LOOP: for each link */
  }
}

generateTags();

addClickListenersToTags();


// Zadanie: Lista autorów

function calculateAuthorClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;

}

function generateAuthors(){
 
  /* create a new variable allTags with an empty object */

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */

  for(let article of articles){

    /* find author wrapper */

    const authorsList = article.querySelector(optArticleAuthorSelector);
    console.log('Authors list:',authorsList);

    /* make html variable with empty string */

    let html = ' ';

    /* get tags from author-tags attribute */

    const articleAuthor = article.getAttribute('data-author');

    /* split tags into array */

    const articleAuthorsArray = articleAuthor.split(' ');
    console.log('articleAuthorArray:',articleAuthorsArray);

    /* START LOOP: for each author */

    for(let author of articleAuthorsArray){
      console.log('Author:', author);

      /* generate HTML of the link */

      // const authorLink = '<li> by <a href="#author-' + author + '"><span>' + author + '</span></a></li>';

      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const authorLink = templates.authorLink(linkHTMLData);

      console.log('authorLink:',authorLink);

      /* add generated code to html variable */

      html += authorLink + ' ';
      console.log('authorLink:', authorLink);

      /* check if this link is NOT already in allAuthors */

      if(!allAuthors[author]) {

        /* add tag to allAuthors object */

        allAuthors[author]= 1;
      } else {
        allAuthors[author]++;
      }

      /* END LOOP: for each author */

    }

    /* insert HTML of all the links into the tags wrapper */

    authorsList.innerHTML = html;

    /* END LOOP: for every article: */

  }


  /* find list of tags in right column */

  const authorList = document.querySelector(optAuthorListSelector);

  const authorsParams  = calculateAuthorClass(allAuthors);

  console.log('autorsParams:', authorsParams);

  /* create variable for all links HTML code */

  let allAuthorsHTML = '';

  /* START LOOP: for each author in allAuthors: */

  for(let author in allAuthors){

    /* [NEW] generate code of a link and add it to allTagsHTML */

    const authorLink = '<li>by<a class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '" href="#tag-' + author + '">' + author + '</a></li>'; 
  
    console.log('authorLink:', authorLink);

    allAuthorsHTML += allAuthorsHTML;

    /*  END LOOP: for each tag in allAutors: */

  }
  
  /* add HTML from allAutorsHTML to authorList */

  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all authors links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let activeAuthor of activeAuthors) {

    /* remove class active */

    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let authorLink of authorLinks) {

    /* add class active */

    authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

  /* find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */

  for (let authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);
    
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
