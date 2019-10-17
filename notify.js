
const fs = require("fs");
const axios = require("axios");

async function notify(){
    let response = await fetch('https://4000-ca70a92c-1eef-4309-8244-5f4279b6b8d2.ws-ap0.gitpod.io/api/new.json');
    console.dir(response)
}

notify();

    // const currentFirstPost = await response.json();
    // console.log("Current first post is ", currentFirstPost.id);

    // // read the locally built version of the data source
    // const newFirstPost = JSON.parse(fs.readFileSync("./_site/api/new.json", { encoding: "utf8" }));
    // console.log("New first post is ", newFirstPost.id);

    // // compare the two
    // if (currentFirstPost.id !== newFirstPost.id) {

    //     console.log("New post detected!");

    //     // do something for new posts
    // }