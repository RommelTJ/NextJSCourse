# NextJS Fundamentals

## What is Next.JS?

* A framework built on top of React that gives you the flexibility of building scalable apps by allowing you to render 
content on the server.  
* In React, you always render content on the server. With NextJS, you can choose to do that on the client, 
on the server, or a mix of both.

## Benefits of NextJS

* Benefits of NextJS
  * Different Rendering Techniques
    * Static Site Generation
    * Server Side Rendering
    * Incremental Site Regeneration
  * Performance
    * Code splitting
      * Divide your web app in small chunks, so you only load the chunk that is used by the current page
    * Minifying files
      * NextJS does it for you
    * Image Optimization
      * NextImage will automatically optimize images
    * Pre-fetching assets
      * NextJS will only prefetch assets as you scroll down the page.
  * File-based routing
    * Every next.js app has a pages directory, and any file in the pages directory is route
    * You don't need to install additional packages to handle routes
  * SEO
    * Search engine optimization
    * NextJS allows you the ability to add SEO-friendly features to your site (ex NextHead)
  * Serverless functions
    * Everything under the API folder has a node server configured automatically
      * Ex: /api/hello.js, hello.js would be a serverless function
    * This allows you to execute code on the server, not on the client
    * When you call a serverless function, it does the following: 
      * Wake up the server
      * Execute the function
      * On completion, shutdowns automatically

## Why is NextJS Popular?

* Strong developer community
* Takes care of complexity for you
* With Create React App, you have to add many packages, grasp domain knowledge (like SEO), lots of configuration, etc
* With Create React App, you need to know how webpack works. Not so with NextJS.
* You can still learn the concepts later while reducing decision fatigue.
* Rendering techniques are easy to set up. You can pick and choose which rendering technique to do for which page.
* Create React App might be preferable for a very simple application. NextJS is very opinionated.
* NextJS requires you to know its opinionated choices.
* NextJS is a React framework for production.
