 document.addEventListener('turbolinks:load',themeChange)

 function themeChange(){
    let theme = document.querySelector('.theme-icon');

    if(document.cookie.includes('data-theme')){
        if(document.cookie.includes('data-theme=light')){
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.remove('inverted');
            });
            document.querySelectorAll('.blog-image').forEach(function(img) {
                img.style.filter = "invert(0)" 
            });
        } else if(document.cookie.includes('data-theme=dark')){
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.add('inverted');
            }); 
            document.querySelectorAll('.blog-image').forEach(function(img) {
                img.style.filter = "invert(0.8)" 
            });
        }
    }

    theme.addEventListener('click',function(e){
        if(document.documentElement.getAttribute('data-theme') === "light"){
            trans();
            document.cookie = "data-theme=dark";
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.add('inverted');
            });
            document.querySelectorAll('.blog-image').forEach(function(img) {
                img.style.filter = "invert(0.8)" 
             });
        } else {
            trans();
            document.cookie = "data-theme=light";
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.remove('inverted');
            });
            document.querySelectorAll('.blog-image').forEach(function(img) {
               img.style.filter = "invert(0)" 
            });
        }
    });

    let trans = () => {
        document.documentElement.classList.add('transition');
        window.setTimeout(()=>{
            document.documentElement.classList.remove('transition');
        }, 1000);
    }
 }