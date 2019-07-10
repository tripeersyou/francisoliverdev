 document.addEventListener('turbolinks:load',themeChange)

 function themeChange(){
    let theme = document.querySelector('.theme-icon');
    if(document.documentElement.getAttribute('data-theme') === "light"){
        document.querySelectorAll('.ui.button').forEach(function(button){
            button.classList.remove('inverted');
        });
    } else {
        document.querySelectorAll('.ui.button').forEach(function(button){
            button.classList.add('inverted');
        });
    }
    theme.addEventListener('click',function(e){
        if(document.documentElement.getAttribute('data-theme') === "light"){
            trans();
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.add('inverted');
            });
        } else {
            trans();
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.remove('inverted');
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