
<img src='img/preview.gif' />

<img src='app/icon.png' align='right' width='150' height='150' />

# Portfolio &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [![Build status](https://travis-ci.org/william-taylor/portfolio.svg?branch=master)](https://travis-ci.org/william-taylor/portfolio) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This is my personal portfolio website which just advertises myself and my skills for future employment should it be needed. The website is also a technical exercise that shows how small a website can be if planned and bundled properly. The build of my portfolio website is smaller than the JQuery minified library, something most websites include by default. However this was accomplished without sacrificing the website's aesthetics looks which are stylishly minimal.

## Overview

Rather than immediately grabbing bootstrap and using only the grid and a few form features I decided to use Skeleton and lightweight bare minimum css framework which had what I needed. From there the major functionality of the website was accomplished in CSS or raw JavaScript with no help from extensive libraries to keep both the minified CSS and JS small. Grunt is used as a task runner and uses the uncss package to ensure no CSS is included if it is not used, ensuring a small website bundle. Images are hard coded as data URI strings so that they can be directly read from memory instead of piling an additional web request to the server. The result is a lightweight website that is smaller than minified JavaScript libraries yet you wouldn't think so at first glance.

## Technology

* Grunt
* Skeleton
* Normalize
* Gallery CSS
* CSS Percentage Circle

## License

Apache 2.0
