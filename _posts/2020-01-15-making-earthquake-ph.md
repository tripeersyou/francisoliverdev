---
layout: post
title: 'Making Earthquake PH: Working with Tweets and Maps'
date: 2020-01-15
author: Francis Avanceña
tags: javascript, twitter, maps
cover_image: '/assets/img/blog/making-earthquake-ph/cover_image.png'
---

The recent disaster in Batangas becuase of the Taal Volcano caused a spew of scientific terms and overflow of science communication to the public. It got me thinking on how we inform the general public regarding these terms and especially during these times where many volcanic earthquakes occur.

<blockquote class="twitter-tweet tw-align-center">
    <p lang="en" dir="ltr">Looks like <a href="https://twitter.com/phivolcs_dost?ref_src=twsrc%5Etfw">@phivolcs_dost</a>
        needs a social media / digital comms manager to translate all of this info into human speak. <a
            href="https://twitter.com/hashtag/informationdissemination?src=hash&amp;ref_src=twsrc%5Etfw">#informationdissemination</a>
        <a href="https://t.co/9H2vqyleE7">https://t.co/9H2vqyleE7</a></p>&mdash; Gretchen Ho (@gretchenho) <a
        href="https://twitter.com/gretchenho/status/1216562934211416064?ref_src=twsrc%5Etfw">January 13, 2020</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

As per Gretchen Ho's tweet above how do we make PHIVOLCS' tweets into human speak. That's when I thought of making Earthquake PH.

### What is Earthquake PH?

Earthquake PH is a website that gives details about earthquakes in the Philippines in an understandable manner through,descriptions and map visualizations of where earthquakes are. This site was created to make the general public informed about details about earthquakes making information understandable to the normal citizen.

### How does Earthquake PH work?

The site uses the Twitter API to scrape the most recent tweets from the PHIVOLCS account every ten minutes. From the recent tweets, we filter them to get tweets specifically regarding earthquake information. Next, we parsed the information from the full text of the Tweet to get the following information using Regular Expressions:

* Date and Time
* Location
* Latitude
* Longitude
* Strength or Magnitude
* Depth of Focus

After this, we run the coordinates to a reverse Geocoder to give us an address of where the epicenter of the earthquake is and then save it to our MongoDB database.

#### Features of Earthquake PH

#### Earthquake Details

The first feature is a general overview of the details regarding the earthquake. I included the general details from the tweet, a Google Map of the epicenter based on the longitude and latitude given and descriptions about how strong the earthquake was from [thiswebsite.](https://www.gns.cri.nz/Home/Learning/Science-Topics/Earthquakes/Monitoring-Earthquakes/Other-earthquake-questions/What-is-the-Richter-Magnitude-Scale)

<table class="ui very simple table">
    <tr>
        <td> <b>Richter magnitude</b>
        </td>
        <td> <b>Description</b>
        </td>
        <td> <b>Earthquake effect</b>
        </td>
    </tr>
    <tr>
        <td> &lt; 2.0
        </td>
        <td> Micro
        </td>
        <td> Micro earthquakes, not felt.
        </td>
    </tr>
    <tr>
        <td> 2.0-2.9
        </td>
        <td rowspan="2"> Minor
        </td>
        <td> Generally not felt, but recorded.
        </td>
    </tr>
    <tr>
        <td> 3.0-3.9
        </td>
        <td> Often felt, but rarely causes damage.
        </td>
    </tr>
    <tr>
        <td> 4.0-4.9
        </td>
        <td> Light
        </td>
        <td> Noticeable shaking of indoor items, rattling noises. Significant
            damage unlikely.
        </td>
    </tr>
    <tr>
        <td> 5.0-5.9
        </td>
        <td> Moderate
        </td>
        <td> Can cause major damage to poorly constructed buildings over small
            regions. At most slight damage to well-designed buildings.
        </td>
    </tr>
    <tr>
        <td> 6.0-6.9
        </td>
        <td> Strong
        </td>
        <td> Can be destructive in areas up to about 160 kilometres (100 mi)
            across in populated areas.
        </td>
    </tr>
    <tr>
        <td> 7.0-7.9
        </td>
        <td> Major
        </td>
        <td> Can cause serious damage over larger areas.
        </td>
    </tr>
    <tr>
        <td> 8.0-8.9
        </td>
        <td rowspan="2"> Great
        </td>
        <td> Can cause serious damage in areas several hundred miles across.
        </td>
    </tr>
    <tr>
        <td> 9.0-9.9
        </td>
        <td> Devastating in areas several thousand miles across.
        </td>
    </tr>
    <tr>
        <td> 10.0+
        </td>
        <td> Epic
        </td>
        <td> Never recorded
        </td>
    </tr>
</table>

<div class="ui medium images" style="text-align:center;">
    <img class="ui image blog-image" src="/assets/img/blog/making-earthquake-ph/homescreen.jpg" alt="Home Screen">
    <img class="ui image blog-image" src="/assets/img/blog/making-earthquake-ph/detail-1.jpg" alt="Detail Page Part 1">
    <img class="ui image blog-image" src="/assets/img/blog/making-earthquake-ph/detail-2.jpg" alt="Detail Page Part 2">
</div>

#### Quake Map

I decided to add another feature which is called the *Quake Map* the Quake Map visualizes on the screen where the 10 latest earthquakes are, how strong they were and when and where exactly they took place.

<div class="ui medium images" style="text-align:center;">
    <img class="ui image blog-image" src="/assets/img/blog/making-earthquake-ph/quake-map.jpg" alt="Quake Map Page">
</div>

### Technology Used

Now for the technical details, the website is a monolith Express.js application, a MongoDB database from MongoDB Atlas, Several Map and Geocoding APIs and of course Twitter's Developer API.

In the detail pages of the earthquakes, I used Google's Map Embed API to visualize the location of the earthquake. On the other hand, I used Leaflet and OpenStreetMaps for the Quake Map since it's open-source and free unlike Google's API for multiple markers. Leaflet can also be used for more features down the line.

On updating the data on the site, I just do this by having a Node.js script that runs every 10 minutes and on this file, using the Twitter API, I get the 100 most recent tweets of PHIVOLCS not including RTs then get the information through RegEx, then I check the database if the Tweet ID is already included in the database if it's not I used LocationIQ's Reverse Geocoding API to get an address of where the earthquake occurred. Then insert it to the database.


### Using the site.

You can visit the site by going to [**https://earthquakeph.francisoliver.dev/**](https://earthquakeph.francisoliver.dev/) or by clicking [here.](https://earthquakeph.francisoliver.dev/) The site currently has more than 120 recorded earthquakes and counting.Feel free to suggest new features to the website and how I can improve it.