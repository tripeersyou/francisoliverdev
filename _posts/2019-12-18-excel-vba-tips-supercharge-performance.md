---
layout: post
title: 'Excel VBA: Tips to Supercharge Performance'
date: 2020-12-18
author: Francis Avanceña
published: false
tags: excel, visualbasic, performance
cover_image:
---

In most of the corporate world, Microsoft Excel is still used by many companies today to store their data and make reports. It uses Visual Basic as a programming language to automate routines and actions in the spreadsheet called Visual Basic for Applications (VBA). This can be easily done by recording macros, not having to rely on typing the code for the program. However, if we do have to write our own code, VBA is extremely notorious for taking a long time to execute and having a syntax that may rival that of PHP.

During my internship, I was tasked to automate two reports that the employees we’re doing there. I made a program using the VBA forms that accepts CSV and Excel files as inputs and generates a new excel file with the report formatted to their specifications.

The first report is just a consolidation of data and simple mathematics from 5 small CSV files not more than 30 rows. However, the second report had more than 20 files which had more than 40 thousand rows each at the least. This where I had issues with VBA, I created a for-loop that iterates each Excel file and each row of the spreadsheet in the file to create an array of objects to generate the report easier, so I would run the program, the program would take up all of my work laptop’s resources, windows would freeze and the fans would work very very hard. I would come back, learning that I hit a StackOverflow error, so I dug deeper then I found out that VBA’s `Integer` is only a 16-bit data type and not the usual 32-bit that we’re accustomed too. That was the problem, I was hitting the limit of what the data type can accommodate, the variable value was going over 32,767 causing the program to crash. I had to move my variables into a 32-bit value which is the `Long` data-type that fixed the problem.

I had another problem which came up, not with the logic of the code but the performance, normally this report would be done in 4 hours due to the sheer volume and size of the files that they had to consolidate. The business reasoning of having it automated in the first place doesn’t matter anymore if it takes one hour and the laptop is unusable, so I needed to make it run faster. I did three simple steps to make my code run from almost an hour to 15-20 mins at the worst.

* Disable Screen Update
One of the first things that came up when you search to make your VBA code run faster is to disable screen updates. The default behavior of VBA is to display the changes happening on the spreadsheet as it executes the code line by line. This adds additional resources to make it happen, it may be fun to see your spreadsheet update in real-time but as far as performance goes 


* Remove the Window View


* Change the file type to .xlsb
