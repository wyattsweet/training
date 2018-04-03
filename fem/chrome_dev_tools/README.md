# Mastering Chrome Developer Tools

## Introduction

### Things Dev Tools Can Do

- create files, write code, persist changes to disk, step through debuging, audit pages, emulate devices, simulate network conditions, find memory leaks, profile your code, analyze JS performance, spot page jank

- [Devtools Docs](developers.google.com/web/tools/chrome-devtools)

Chrome Canari - chrome bleeding edge browser

### Developer Tools Panels

- Elements panel: interpreted DOM markup on left, styles on right.
- Network panel: Shows a list of all HTTP requests
- Sources: used for authoring code
- performance (formerly timeline): Does a bunch of stuff, probably most powerful tab
- memory (previously profiles): find most expensive functions, where app is spending the most time, look at specific memory allocation
- console: interactive JS repl
- Audits: A high level view of performance. Good place to start to find low hanging fruit.
- Application: View allocated storage, support for service works, manifests (metadata for your app)
- Security: tells you whether you have https and do your assets have ssl enabled. 

You can click and drag tabs around

## Editing

### Elements Panel & Style Editor

- You can double click in to edit the classes
- Right click, edit as HTML to do more in depth editing
- Right click, inspect brings up element in elements tab
- Right click markup in elements tab, scroll into view, brings element into view
- `h` to show/hide elements
- computed styles show what styles are being applied to an element after all the selectors from different stylesheets are applied and where they're coming from.

### DOM Break Points, Color Formats and Code Specificity

If you want to see where in the JS an element is changing, you can right click the elements parent, break on, subtree modification. Pops you into the JS at the line where that change is happening. 

In sources you can click brackets in bottom left corner to pretty print the code.

shift click and color value and it will transition between it's hex, rgb, hsl formats.

Click on the color box and you can do a bunch of stuff: color picker, color palettes - you can let chrome pick a palette based on the colors being used, upload your own, or automatically use Google material UI colors.

Click and hold a color will show more shades.

- click on an element and you'll see a `$0`
- If you go to the console and type `$0` you'll have access to that element.
- Go back to the elements tab click a new element, now in the console `$0` will be the new element but `$1` will be the previous element. You can save 5 elements, `$0` - `$4`.


### Sources Panel & Workspaces

Edits made to files will be made in real-time

Workspaces allow you to persist changes to disk, can be used as your primary editor.

Drag and drop directory into the sources tab.

No support for babel/Webpack processes, most useful for when you're sending your raw assets down the wire. 

## Debugging

### Step-through debugging

watch section of right side let's you watch a variable or function.

### Black-boxing and the debugger API

In a production app the call-stack is going to show all the code your app is using including libraries and frameworks.

You can right click on a script and select "blackbox this script", it will not show them in the call stack or when stepping through in the debugger.
