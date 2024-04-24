'use strict';
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

        const activeArticles = document.querySelectorAll('.post.active');

        for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
        } 
      
        /* get 'href' attribute from the clicked link */
      
        const articleSelector = clickedElement.getAttribute('href');
        console.log('articleSelector');

        /* find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);
      
        /* add class 'active' to the correct article */

        targetArticle.classList.add('active');

      }
      
      const links = document.querySelectorAll('.titles a');
      console.log(links)
      
      for(let link of links){
        link.addEventListener('click', titleClickHandler);
      }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
    
  function generateTitleLinks(){
    
      /* remove contents of titleList */

      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML = '';

      /* for each article */

      const articles = document.querySelectorAll(optArticleSelector);
      let html = '';
      for(let article of articles){
        
          /* get the article id */

        const articleId = article.getAttribute('id');
        console.log('articleId:', articleId);

          /* find the title element */

          /* get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log('articleTitle:', articleTitle);

          /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('linkHTML:', linkHTML);

          /* insert link into titleList */

        html = html + linkHTML;      
      }
      titleList.innerHTML = html;

      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
      for(let link of links){
        link.addEventListener('click', titleClickHandler);
      }
  }
  generateTitleLinks();

  // MODUŁ 6

  function generateTags(){

    /* find all articles */
    
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log(tag);

        /* generate HTML of the link */

        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(tagHTML);

        /* add generated code to html variable */

        html = html + tagHTML;
        console.log(html);

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
  }
  
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
  
    /* make new constant named "clickedElement" and give it the value of "this" */
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
  
    /* make a new constant "tag" and extract tag from the "href" constant */
  
    /* find all tag links with class active */
  
    /* START LOOP: for each active tag link */
  
      /* remove class active */
  
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
  
    /* START LOOP: for each found tag link */
  
      /* add class active */
  
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();
