 document.addEventListener('turbolinks:load',themeChange)

 function themeChange(){
    let theme = document.querySelector('.theme-icon');

    if(document.cookie.includes('data-theme')){
        if(document.cookie.includes('data-theme=light')){
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.remove('inverted');
            });
            document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.remove('inverted');
            });
        } else if(document.cookie.includes('data-theme=dark')){
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.add('inverted');
            });
            document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.add('inverted');
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
             document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.add('inverted');
            });
        } else {
            trans();
            document.cookie = "data-theme=light";
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.remove('inverted');
            });
            document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.remove('inverted');
            });
        }
    });
    
    const zooming = new Zooming({
        bgOpacity: 0.3
    });
    
    zooming.listen('.blog-image');

    let trans = () => {
        document.documentElement.classList.add('transition');
        window.setTimeout(()=>{
            document.documentElement.classList.remove('transition');
        }, 1000);
    }
 }