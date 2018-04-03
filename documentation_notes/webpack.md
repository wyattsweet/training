# Webpack
[Documentation/Concepts](https://webpack.js.org/concepts/)
v3.10.0

## [Concepts](https://webpack.js.org/concepts/)

Webpack at its core is a module bundler for JavaScript applications. When it processes your application it creates a dependency graph of all the modules your application depends on, then packages them up into one or more bundles.

To get started there are 4 core concepts –

- **Entry**: This tells Webpack where your core or root module is. Webpack will start building out its dependency graph here by figuring out which modules and libraries this module depends on. Dependencies are then processed and output as one or multiple bundle files.

You specify an entry point using the `entry` property in the Webpack configuration file.

```js
module.exports = {
  entry: './path/to/root/file.js'
}
```
The entry point can be [configured in various different ways](https://webpack.js.org/concepts/entry-points/)

- **Output**
Output tells Webpack where to emit the bundle files and how to name these files. This can be configured using the `output` property in your configuration file.

```js
const path = require('path');

module.exports = {
  entry: './path/to/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // creates a dist directory in your projects root
    filename: 'bundle.js'
  }
}
```
Output has many more [configurable features](https://webpack.js.org/configuration/output/)

- **Loaders**
By default Webpack only understands JavaScript. Loaders allow you to leverage Webpack's bundling capabilities for different types of files (such as `.css`), converting them to valid modules which Webpack can include in the dependency graph.

At a high level loaders have 2 purposes -

1. Indentify which files should be transformed by a specific loader, using the `test` property.
2. Define which loader will transform those files so they can be added to your dependency graph with the `use` property.

In the webpack config it would look something like this –

```js

const path = require('path');

const config = {
  entry: './path/to/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // creates a dist directory in your projects root
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]   
  }
}

module.exports = config;
```

The configuration above has declared `module.rules` and an object with the 2 required properties `test` and `use`. This tells the Webpack compiler the following

> "Hey Webpack compiler, when you come across a path that resolves to a .txt file inside of a require() or import statement, use the raw-loader to transform it before you add it to the bundle."

Loaders have more [nuanced configurations](https://webpack.js.org/concepts/loaders/)

- **Plugins**
Plugins can be used to accomplish a wide range of tasks, everything from bundle optimization and minification to defining environment like variables. In order to use use a plugin you need to `required()` it and add it to the `plugins` array. You must use the `new` keyword to create an instance of the plugin.

```js
const path = require('path');

const config = {
  entry: './path/to/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // creates a dist directory in your projects root
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]   
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};

module.exports = config;
```

Webpack comes with a [number of plugins out of the box](https://webpack.js.org/plugins/). Using plugins are pretty straight forward, but there are more usecases you could [explore further](https://webpack.js.org/concepts/plugins/).

## [Entry Points](https://webpack.js.org/concepts/entry-points/)

There are multiple ways you can define an entry based on your specific needs.

### Single Entry (shorthand) syntax

```js
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

This syntax is short for this

```js
const config = {
  entry: {
    main: './path/to/my/file.js'
  }
}
```
This syntax is great when you have a simple app or library and there is just one entry point.

### Object Syntax

```js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
}
```
This is more verbose but also a more scalable way of defining entries. This tells Webpack to create dependency graphs starting at both `app.js` and `vendor.js`. These graphs are completely seperate and independent of each other. This setup allows you to leverage `CommonsChunkPlugin` and extract any vendor references from your app bundle into your vendor bundle, but better vendor splitting can be achieved with [dllPlugin](https://webpack.js.org/plugins/dll-plugin/). The point of all this is to drastically improve build time performance.

> Scalable Webpack configurations are ones that can be reused and combined with other partial configurations. This is a popular technique used to seperate concerns by environment, build target and runtime. They can then be merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).

### Multi Page App

```js
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
}
```

This tells Webpack to create three seperate dependency graphs. In a multi page app, the server is going to fetch a new HTML document for you. This setup allows you to use `CommonsChunkPlugin` to create bundles of shared app code between each page. Multi page apps that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the amount of entry points increases. Each HTML document should have one entry point.

## [Output](https://webpack.js.org/concepts/output/)


