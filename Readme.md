# Slides

Launch local `talk/index.html` or use the online [http://fayway.github.io/ComponentsTesting/](http://fayway.github.io/ComponentsTesting/)

# Demo

![](https://raw.githubusercontent.com/fayway/ComponentsTesting/master/talk/img/demo.png)

## Prerequisites

* Install Node >= 4
* Clone this repo
* Install dependencies

```
$ cd projectfolder
```

```
$ npm install
```

## Code Before and After Refactoring

### MVC/Template Based Design

    $ git checkout -b templates templates

### Components Based Design

    $ git checkout master

## Internal server (with LiveReload)

    $ npm run serve

Navigate to `http://localhost:8080/`


# Tests

Some tests need compiled RequireJS modules

    $ npm run compile

Running CLI test

    $ npm test

## Browser tests

Navigate to `http://localhost:8080/test`


