---
layout: post
title: "Implementing Dark Mode to Your Jekyll Site"
date: 2019-07-08
author: "Francis Avanceña"
tags: jekyll, ruby, css, javascript
cover_image:
---

<a href="https://jekyllrb.com" target="_blank">Jekyll</a> is a static site generator powered by Ruby, that can use both HTML and Markdown for Markup and Liquid as a template engine. It's the technology that powers this site! And with the prevalence in web development of now having both a light and a dark theme, we will implement having this functionality in Jekyll sites.

Using native CSS variables and JavaScript we are going to implement a full blown toggled dark mode or dark theme in our Jekyll websites. First we must first define our CSS variables for our light theme. In CSS we define a variable by having two dashes prefixing the variable name like in the code example below.


```css 
html {
    --bg: #fcfcfc;
    --bg-secondary: #fbfbfb;
    --headings: #0077ff;
    --text: #333333;
}
```

We can see that we have four CSS variables namely `--bg`, `--bg-secondary`, `--headings` and `--text`. Once we have all our CSS variables set up for the light theme we create another set for the dark theme retaining the variable names but appending it to the `html` element with the `data-theme='dark'` attribute like in the code below:

```css 
html[data-theme='dark'] {
    --bg: #333333;
    --bg-secondary: #434343;
    --headings: #3694ff;
    --text: #b5b5b5;
}
```

With those two steps out of the way we need only need to assign the CSS variables to the different HTML components.

```css 

body {
    background-color: var(--bg);
}

.container {
    background-color: var(--bg-secondary);
}

h1, h2, h3, h4, h5, h6 {
    color: var(--headings);
}

p, strong, b, em, span, code, small {
    color: var(--text);
}
```

Now in your **main HTML layout file** to check whether your dark mode works add the attribute `data-theme='dark'` to the `html` element.

```html 
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="/assets/js/application.js"></script>
    <link rel="stylesheet" href="/assets/css/application.css">
    <title>My Jekyll Site</title>
<head>
<body>
    <!-- Jekyll Template -->
</body>
</html>
```

For now we leave the site in it's light mode set the `data-theme` attribute back to `light`. Now we must create a button to toggle between both modes and it give the class `theme-toggle` to be able to select it using JavaScript.

```html 
<button class="theme-toggle">Toggle Dark Mode</button>
```

We will next write the JavaScript for the desired behavior of when clicking the button it must toggle between our two themes using native JavaScript we write.

```js 
document.addEventListener('DOMContentLoaded', themeChange);

function themeChange(){
    // Select our toggle button
    let button = document.querySelector('.theme-toggle');

    // Add an event listener for a click
    button.addEventListener('click', function(e){
        // Check the current data-theme value
        let currentTheme = document.documentElement.getAttribute('data-theme');
        if(currentTheme === 'light') {
            transition();
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            transition();
            document.documentElement.setAttribute('data-theme','light');
        }
    });

    // Adds the 'transition' class to <html> for CSS fun
    let transition = () =>{
        document.documentElement.classList.add('transition');
        window.setTimeout(()=>{
            document.documentElement.classList.remove('transition');
        }, 1000);
    }
}
```

Going back to our CSS file to add the CSS transition we add the following code below at the end of your CSS file.

```css 
html.transition,
html.transition *,
html.transition *:before,
html.transition *:after {
    transition: all 650ms !important;
    transition-delay: 0 !important;
}
```

If you are using a single page application like React.js, Angular or Vue. This implementation works fine as you navigate the web app but for Jekyll in which the files are built into the `_sites` folder and technically has multiple HTML pages and files when deployed, the dark mode is immediately lost when we move from one HTML file to another. To remedy this we go to one special library known to Ruby Developers: **turbolinks.js**. Known for being shipped with the Ruby on Rails Framework it's main implementation and the fundamentals of how turbolinks works is the solution on retaining the dark theme while navigating through our Jekyll site.

Turbolinks works by intercepting anchor tags or the `<a>` tags in your site and instead of doing the regular `GET` request for it, turbolinks intercepts the request and makes an `XMLHttpRequest` or more commonly known as an `AJAX` request instead and only replacing the contents of the `<body>` tag. So in technically it makes our Jekyll site like a single page application in a sense.

We only need to add the turbolinks js library via CDN or locally through `npm` and add it to our header in the default HTML layout.

```html 
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/turbolinks/5.2.0/turbolinks.js"></script>
    <script src="/assets/js/application.js"></script>
    <link rel="stylesheet" href="/assets/css/application.css">
    <title>My Jekyll Site</title>
<head>
<body>
    <!-- Jekyll Template -->
</body>
</html>
```

In adding turbolinks we have to edit our JavaScript file since we said that we want the code to run when `'DOMContentLoaded'` event has been triggered but due to turbolinks when we navigate our pages this event does not trigger thus leaving our code unable to execute. We must change the event handler to a turbolinks event namely the `'turbolinks:load'` event provided in the turbolinks documentation. Now our JavaScript file should look like the example below.
``` js
document.addEventListener('turbolinks:load', themeChange);

function themeChange(){
    // Select our toggle button
    let button = document.querySelector('.theme-toggle');

    // Add an event listener for a click
    button.addEventListener('click', function(e){
        // Check the current data-theme value
        let currentTheme = document.documentElement.getAttribute('data-theme');
        if(currentTheme === 'light') {
            transition();
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            transition();
            document.documentElement.setAttribute('data-theme','light');
        }
    });

    // Adds the 'transition' class to <html> for CSS fun
    let transition = () =>{
        document.documentElement.classList.add('transition');
        window.setTimeout(()=>{
            document.documentElement.classList.remove('transition');
        }, 1000);
    }
}
```

This enables our JavaScript files to execute when clicking our button toggler and to navigate without losing our chosen theme in the site. Remember that this only works in one session of navigating through the site, meaning that if another tab is created with the same site the default light theme will be shown, and if you visit the site again in the future it will revert back to the default theme.

Try using cookies to store some information on the browser to retain information on what theme the user prefers. It's another implementation for another time.