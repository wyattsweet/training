#Build Cross-Platform Desktop Apps with Electron


## The Electron Big Picture
### Technology Benefits

Mix between Chrome Content Module and Node

Chrome gives us access to things like the window and the document which otherwise wouldn't be available in Node.

Then Node gives us access to the filesystem.

Combines everything we'd get in a server side app and client side app. Don't have to worry about browser because we ship them a browser with our app.

Pretty much no need for polyfills. 

SQLite is popular for local storage.

## Getting an Electron App Up and Running

### Structuring an Electron Application

Main Process is the initial process which spins up our application. Main process spins up other processes such as `renderer` which handles html/css/js.

App is offline first but gives you the ability to go fetch data off the internet. You can spin up multiple renderer processes. You could spin them up without windows.internet. You can spin up multiple renderer processes. You could spin them up without windows.ced 