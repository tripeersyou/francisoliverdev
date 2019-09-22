 document.addEventListener('turbolinks:load',themeChange)
 
 let shakeEvent = new Shake();
 shakeEvent.start(); 

 function themeChange(){
    let theme = document.querySelector('.theme-icon');

    let dark = new Audio('/assets/js/audio/dark.m4a');
    let light = new Audio('/assets/js/audio/light.m4a');
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

    window.addEventListener('shake', function(e){
        if(document.documentElement.getAttribute('data-theme') === 'light'){
            dark.play();
            trans();
            document.cookie = 'data-theme=dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.add('inverted');
            });
             document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.add('inverted');
            });
        } else {
            light.play();
            trans();
            document.cookie = 'data-theme=light';
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.remove('inverted');
            });
            document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.remove('inverted');
            });
        }
    });

    theme.addEventListener('click',function(e){
        if(document.documentElement.getAttribute('data-theme') === 'light'){
            trans();
            document.cookie = 'data-theme=dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.ui.button').forEach(function(button){
                button.classList.add('inverted');
            });
             document.querySelectorAll('.ui.table').forEach(function(table) {
                table.classList.add('inverted');
            });
        } else {
            trans();
            document.cookie = 'data-theme=light';
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