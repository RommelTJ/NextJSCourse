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
