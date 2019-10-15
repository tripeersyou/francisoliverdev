---
layout: post
title: "Side Projects: Telegram Food Bot using the Zomato API"
date: 2019-10-19
author: Francis Avanceña
tags: javascript, showdev, api, chatbot
cover_image:
---
In work, we use Telegram as a main communication platform and being in a central business district, there are many food places to choose from that will end up in endless discussions on where to go out to eat for lunch outs and dinner catch-ups. When looking at fun APIs to use in a project I stumbled across Zomato’s API, so, as a side project, I decided to make a Telegram bot that narrows restaurant options and stop groups from being indecisive in choosing where to eat.


### What is Zomato?

[Zomato ](https://www.zomato.com/)is a restaurant aggregator and food delivery service startup company founded in India. It is now known today for its Zomato Gold product which allows for discounts and buy-1 take-1 deals in certain restaurants. The company localized into many countries, including here in the Philippines.


### What is Telegram and Telegram Bots?

Telegram is a cross-platform instant messaging app similar to WhatsApp and Viber, it is very popular due to its feature of end-to-end encryption in all conversations, customer stickers and chatbots (particularly the Werewolf, Uno and Quizarium chatbots) to name a few. In the industry, we mainly focus on Facebook’s Messenger Platform as a way for us to showcase services and improve a brand’s social presence but in the Telegram environment, anyone can make their own chatbot without creating a Facebook page and having the trouble of applying for a Facebook API Key. Telegram allows for developer creativity, in which developers can have a bot for every occasion and problems they deem they need to solve or another ‘side project’ that will never get pushed to production.


### How will the chatbot work?

Looking at the given endpoints of Zomato (check it out [here](https://developers.zomato.com/api) for the full documentation), I planned to make it interactive as possible, here are the available endpoints from the documentation.


<table class="ui table">
  <tr>
   <td><strong>Request</strong>
   </td>
   <td><strong>Endpoint</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td colspan="3" ><strong>Common</strong>
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/categories</code>
   </td>
   <td>Get the list of Categories
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/cities</code>
   </td>
   <td>Get city details
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/collections</code>
   </td>
   <td>Get Zomato collections in a city
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/cuisines</code>
   </td>
   <td>Get the list of all cuisines in a city
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/establishments</code>
   </td>
   <td>Get a list of restaurant types in a city
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/geocode</code>
   </td>
   <td>Get location details based on coordinates
   </td>
  </tr>
  <tr>
   <td colspan="3" ><strong>Location</strong>
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/location_details</code>
   </td>
   <td>Get Zomato location details
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/locations</code>
   </td>
   <td>Search for Locations
   </td>
  </tr>
  <tr>
   <td colspan="3" ><strong>Restaurant</strong>
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/dailymenu</code>
   </td>
   <td>Get the daily menu of a restaurant
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/restaurant</code>
   </td>
   <td>Get restaurant details
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/reviews</code>
   </td>
   <td>Get restaurant reviews
   </td>
  </tr>
  <tr>
   <td>GET
   </td>
   <td><code>/search</code>
   </td>
   <td>Search for restaurants
   </td>
  </tr>
</table>


In order for an accurate search through the bot, we need to get three crucial points of information from the user first. First, where are they located (/location), next is the type of establishment they want to eat at (/establishments) and lastly the type of cuisine they would like to eat (/cuisines). After that, we search for the relevant restaurants through the search endpoint (/search) and display them to the user.

< INSERT FLOW CHART >


### Implementation and Technology Used

For this project, I used Node.js and NPM packages [Telebot](https://www.npmjs.com/package/telebot) and [zomato.js](https://www.npmjs.com/package/zomato.js), a little RegEx knowledge is also useful here. These API wrappers make it easier for us to develop and abstracts the complexity making us focus on the experience of the chatbot and its implementation. I heavily used Telegram’s `inlineKeyboard` feature which allows for buttons to be pressed by the user which triggers the next part of the flow. Essentially, we call Zomato’s API based on different event handlers in the bot.

For the implementation, I created three different telegram commands as access to the bot’s services.


<table class="ui very simple table">
  <tr>
   <td><strong>Command</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td><code>/start</code>
   </td>
   <td>Start a conversation with the bot.
   </td>
  </tr>
  <tr>
   <td><code>/location</code>
   </td>
   <td>Tell the bot your location. Usage <code>/location &lt;keyword&gt;.</code>
   </td>
  </tr>
  <tr>
   <td><code>/search</code>
   </td>
   <td>A quick search for a restaurant. Usage <code>/search &lt;keyword&gt;</code>, works best if you have already set a location with the <code>/location</code> command.
   </td>
  </tr>
</table>


The bot’s flow is heavily reliant on the ‘`callbackQuery`’ event and parsing of that data to store for later usage in a case syntax. The bot does not use a database but instead uses a 2D array to store data unique per chat or conversation using Telegram’s chat_id as a unique identifier. As another kicker, I deployed the chatbot to Heroku in a free dyno, sending an HTTP request to the main URL every five minutes to avoid the chatbot from sleeping.


### The chatbot in action


1. Going through the main flow

<!-- < MAIN FLOW SCREENSHOTS > -->

2. Doing a quick search

<!-- < QUICK SEARCH SCREENSHOTS > -->


### Possible Improvements

The possible improvements and features that can be added to the bot are as follows: 


1. Having the user control to control to sort via the cost and rating.
2. Having the user control how many restaurants in the search the bot will display as the results.
3. Having the user choose what payment method they want and displaying restaurants that only have that payment method.
4. Have suggested restaurants to try based on the user’s location via the /location_details endpoint.
5. Have a proper database to store the chat data.
6. Make the chatbot less reliant on inlineKeyboards but on a ReplyKeyboardMarkup to have a real conversation experience with the bot and to show which user did what if the chatbot is in the group chat.
7. And other general performance updates (having a database instead of an array to store data).


### Conclusion

Telegram is one of the best channels for developers starting out with chatbots. It has a low barrier to entry and its usage can go to very simple to incredibly complex. It can be used for implementing games, implementing services through APIs such as a bot like this, a weather bot and even a bot that just sends jokes, web scraping to even handling payments with its integration with Stripe and other payment methods. It allows developers to have fun and just do that side project that you always wanted to do as a break from the usual jobs. Zomato’s API is just begging to be integrated into other apps, its huge repository of restaurant information across the globe can be used in not only chatbots but in websites and can be integrated with other services as well.

Making this chatbot was fun, doing something for ourselves once in a while that we can use in real life (me and my Management Trainee friends use this chatbot) without any pressure from deadlines is the ultimate goal of any side project. Sometimes we need that as developers, our own creation, a safe programming space, where we can just goof off and do what we want and where we have total control and learn new technologies at the same time.~