const { active } = require("browser-sync");

const titleClickHandler = function(event){
      const clickedElement = this;
      console.log('Link was clicked!');
    
      /* [DONE] remove class 'active' from all article links  */
    
      const activeLinks = document.querySelectorAll('.titles a.active');
    
      for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
      }
    
      /* [IN PROGRESS] add class 'active' to the clicked link */
      clickedElement.classList.add('active');
      console.log('clickedElement:', clickedElement);
    
      /* [DONE] remove class 'active' from all articles */
    
      /* get 'href' attribute from the clicked link */
    
      /* find the correct article using the selector (value of 'href' attribute) */
    
      /* add class 'active' to the correct article */
    }
    
    const links = document.querySelectorAll('.titles a');
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }