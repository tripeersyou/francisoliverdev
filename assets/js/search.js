document.addEventListener('turbolinks:load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    let queryInput = document.querySelector('#query');
    queryInput.value = query;

    const getPosts = async () => {
        let includedPosts = [];
        let response = await fetch('/api/posts.json');
        let posts = await response.json();
        for (let post of posts) {
            console.log(post.title.toLowerCase());
            if (post.title.toLowerCase().includes(query.toLowerCase())) {
                includedPosts.push(post);
            }
        }

        renderResults(includedPosts);
    }

    const renderResults = (posts) => {
        let resultContainer = document.querySelector('#search-results');
        if(posts.length > 0){ 
            let html = ``;
        for (let post of posts) {
            html = `<div class="ui raised segment wow slideInLeft">`;
            if (post.cover_image != "") {
                html += `<div class="ui stackable grid">
                <div class="four wide column ">
                    <img class="ui rounded centered image" alt="${post.title}'s Cover Image" src="${post.cover_image}">
                </div>
                <div class="twelve wide column">
                    <h3 class="header">${post.title}</h3>
                    <div class="meta">
                        <strong>Date:</strong> ${post.date}
                    </div>
                    <br>
                    <div class="description">
                        ${post.excerpt.replace(/&lt;/g, "<")
                                  .replace(/&gt;/g, ">")
                                  .replace(/&amp;/g, "&")
                                  .replace(/&quot;/g, '"')
                                  .replace(/&#39;/g, "'")
                                  .replace(/&#2xF;/g, "/")}
                    </div>
                    <br>`;
                if(document.documentElement.getAttribute('data-theme') === 'dark'){
                    html += `
                        <div class="extra">
                            <a href="${post.url}" class="ui basic inverted button">View Post</a>
                        </div>
                    </div>
                    </div>`;
                } else {
                    html += `
                        <div class="extra">
                            <a href="${post.url}" class="ui basic button">View Post</a>
                        </div>
                    </div>
                    </div>`;
                }
                resultContainer.innerHTML += html;
            } else {
                html += `<h3 class="header">${post.title}</h3>
                <div class="meta">
                    <strong>Date:</strong> ${post.date}
                </div>
                <br>
                <div class="description">
                    ${post.excerpt.replace(/&lt;/g, "<")
                                  .replace(/&gt;/g, ">")
                                  .replace(/&amp;/g, "&")
                                  .replace(/&quot;/g, '"')
                                  .replace(/&#39;/g, "'")
                                  .replace(/&#2xF;/g, "/")}
                </div>
                <br>`;
                if(document.documentElement.getAttribute('data-theme') === 'dark'){
                    html += `
                        <div class="extra">
                            <a href="${post.url}" class="ui basic inverted button">View Post</a>
                        </div>
                    </div>
                    </div>`;
                } else {
                    html += `
                        <div class="extra">
                            <a href="${post.url}" class="ui basic button">View Post</a>
                        </div>
                    </div>
                    </div>`;
                }
                resultContainer.innerHTML += html;
            }

            resultContainer.innerHTML += `</div>`;
        }
        } else {
            html = `<h1 class="wow fadeInDown" style="text-align: center;">Sorry there are no blog posts containing '${query}'.</h1>`;
            resultContainer.innerHTML += html;
        }
    }
    getPosts();
});