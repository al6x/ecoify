# resourcify

browserify.require() for templates and other resources, made as a set of
[browserify](https://github.com/substack/node-browserify) plugins.

Usually You need it to **precompile client-side templates and use it in Browser**.

It allows to work with resources (templates) using standard `require('./my-template')` as if
it's an ordinary JavaScript file.

Note: You can use [fileify](https://github.com/substack/node-fileify) to require all
files (templates) in directory recursively.

## Available plugins

- eco - .eco
- ejs - .ejs
- handlebars - .hbs, .handlebars
- hogan - .hg, .hogan
- jade - .jade

It's also easy to add a new one. As a sample take a look
 at [eco](/alexeypetrushin/resourcify/blob/master/eco.js), it's about seven lines of code.

## Installation

Install resourcify and template engine You want.

``` shell
npm install resourcify jade
```

Plug resourcify into browserify

``` shell
browserify app.js -w -p resourcify/jade -o bundle.js
```

``` javascript
...
var jade = require('resourcify/jade')
bundle.use(jade)
...
```

Now You can use `require('/my-template')` for `.jade` templates.