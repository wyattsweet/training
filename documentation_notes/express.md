# Express

## Middleware

Middleware functions have access to the request and response objects plus a special `next` function. When `next` is invoked it simply calls the next middleware function.

If the current middleware function doesn't end the request/response cycle then you much call next otherwise the request will hang out forever and never leave.

The anatomy of a middleware function looks something like this

```js
app.get('/', (req, res, next) => {
  next();  
})
```

`.get()` is the HTTP method for which the middleware appliesx
`./` is the path for which the middleware applies
The function is thee middleware function with the `req`, `res` and `next` respectively.

---

A middleware function such as –

```js
const myLogger = (req, res, next) => {
  console.log('LOG')
  next()
}
```
can be loaded in using `app.use()` and specifying the middleware function.

```js
app.user(myLogger)
```
