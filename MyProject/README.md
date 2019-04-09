# Project - 2

## Summary
Background:
- The main focus of this project will be on improving the accessability and performance of the following sites:
    * --> Main Focus: https://www.cmd-amsterdam.nl/studentenwerk/
    * Optional: https://www.cmd-amsterdam.nl/nieuws/

Core Features of this project:
- This project is an enhanced version of the mentioned url-endpoints. It improves on it's predecessor by increasing performance and accessibility features.

The following images represent the audits of the original site, followed by the audit of the project:

![Metrics of the original site](https://github.com/Stanargy/project-2-1819/blob/master/myProject/public/assets/metrics1.JPG "Metrics of the original site")

![Metrics of the project](https://github.com/Stanargy/project-2-1819/blob/master/myProject/public/assets/metrics2.JPG "Metrics of the project")



## Table of contents
1. [Live demo](#1-Live-demo)
2. [Install](#2-Install)
3. [Features](#3-Features)
4. [DATA](#4-DATA)
5. [Performance Enhancement Plan](#5-Performance-Enhancement-Plan)
6. [Progressive Enhancement Plan](#6-Progressive-Enhancement-Plan)
7. [To-do](#7-To-do)

## 1. Live Demo
At this moment the live demo is unavailable.

## 2. Install
To install this project clone the repository to the local storage on your device. Make sure node.js is installed and open a CLI. Go to the folder which locates the cloned repository and use the command: "npm install". To start a local development service use the command: "npm run dev".

## 3. Features
This project shows how performance increase is achieved by calling an Wordpress API, taking it's HTML data, reformatting it and displaying it to the user. Since the project uses the data displayed on the original site it is possible to use add content to the Original Wordpress site and use this project alongside. 

## 4. Data

The code example below shows how the wordpress html data is retrieved:
```js 
function API(){
    request('https://www.cmd-amsterdam.nl/wp-json/wp/v2/pages/7', { json: true }, (err, res, body) => {
        if (err) { return console.log('Error during Data Retrievement: '+ err); }
       else {
        //console.log(body)
        data = data.concat(body.content.rendered)
        data = data.replace(reg, "")
        return data
        }
    })
};
```

The data is then send to the router and placed in a <%ejs%> script tag for rendering to the DOM.


## 5. Performance Enhancement Plan
Topics that I wish to improve.
- Minify CSS
- Minify JS
- Lazy loading: When viewed on a mobile device (smaller vw) the site becomes very tall. Lazy loading will ensure a smooth rendering time for mobile devices.


## 6. Progressive Enhancement Plan
- Implement support for all (older) browsers
- Implement feature detection
- Implement layer enhancement

    * Define layers:
        *   Functional: This site's main focus is to inform users about recent CMD students projects.
        *   Usable: 
        *   Pleasureable:

## 7. To-do
- [X] Setup Directories
- [X] Define Improvement Plan
    * [X] Define Performance Enhancement Plan
    * [X] Define Progressive Enhancement Plan

- [ ] Define Core Functionality
    * [X] Define Core Features
    * [X] Setup Core Features

- [ ] Add Styles
    * [X] Core styles
    * [ ] Old browser support


- [X] Add Summary
- [X] Track progress in readme!

