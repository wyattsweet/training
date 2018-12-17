# Gatsby

### Install the Gatsby CLI
`npm install -g gatsby-cli`

### Create a new Gatsby project
`gatsby new [SITE_DIR_NAME] [URL_OF_STARTER_GITHUB_REPO]`

### Pages Directory

Any component inside of `src/pages/*.js` will automatically become a page with a route on your site. The home page will be at `src/pages/index.js`. If you create a component at `src/pages/about.js` This component will be loaded when you visit `/about`

The component name isn't particularly important, something like this would work for the about page –

```js
import React from 'react'

export default () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>Sample about page</p>
    </div>  
  )
}
```

### Linking between pages

To create a link between pages, you can import and use the `Link` component.

`import { Link } from 'gatsby'`

To use the component –

```js
<Link to="/contact/">Contact</Link>
```

This would link to `/contact` and load up your `Contact` component. When linking to external pages use the html `a` tag

### Deploying your site

`gatsby build` will build your static files within the `/public` directory. You can then deploy it using any static site host.

