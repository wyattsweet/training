# FEM: Testing JavaScript Applications

## Testing Javascript Applications

How to prevent bugs

1. Static Types: Flow/TypeScript
2. Linting: ESLint
3. Testing

### Types of Tests

Unit test - Testing a function or small piece of code

Integration Test - Testing multiple units all together. Not making a call to a server, you would mock that out. 

End to End testing - No mocking, test the entire processing. Also called flow based testing. Testing a flow in your application. Such as testing login, signing up for an account, etc.


![](/Users/wyattsweet/Desktop/Screen Shot 2017-07-18 at 9.27.58 PM.png)

### Code coverage
With Jest you can run `just --coverage` to get a code coverage report with your tests.

--

Jest implements JSDom environment for you. JSDom is the browser APIs implemented in Node.

--

Jest configurations in `package.json`

```json
"jest": {
	"testEnvironment": "jest-environment-node", // This will make your tests faster by not loading in JSDom
	"collectCoverageFrom: [
		"*.js" // Tells Jest to test all JS files
	],
	"coverageThreshold": { // will throw an error if coverage drops below these thresholds
		"global": {
			"statements": 50,
			"branches": 50,
			"functions": 50,
			"lines": 100
		}
	}
}

```
--

### Feature setting

Running `jest --watch` puts you in a immersive testing environment

You can add `test.skip` to ignore a test while you're working on it.

`test.only` to only run a test.

Mocha you can do `it.only` and `it.skip`

--

Jest automatically detects babel configuration and transpiles your code.

`yarn add --dev babel-core babel-preset-env`

Create a `.babelrc` file with 

```json
{
  "presets": ["env"]
}
```

After a `git commit` Jest test:watch will only run tests on files changed since the last commit. This makes TTD incredibly easy.

## Writing Unit Test Introduction

### Intro

**Think in terms of use cases not implementation details**

In testing you want to be as DRY as possible



```js
// 3.1
test('returns null if the sandwich does not exist', () => {
  const req = getReq();
  const result = makeMeASandwich(req);
  expect(result).toBeNull();
})

test('returns my sandwich', () => {
  const sando = 'ppj';
  const req = getReq(sando);
  const result = makeMeASandwich(req)
  expect(result).toBe(sando)
})

function getReq(sandwich) {
  return {query: {sandwich}}
}
```
3.1 is an example of the mother object pattern. It's used to make it easier to tell the difference between tests.

## Test-driven Development

**Jest vs Mocha**

Jest has a lot of useful features that Mocha doesn't. It's also very fast because it paralelyzes your tests. The configuration is also much easier than other testing frameworks. Ships with an assertion library. Also comes with a mocking API.

## Integration Tests

A higher level test than a unit test. You will actually make requests to your server. Testing the integration between our API and the server.

### Setting up the Server

Path to integration test `api/demo/integration/__tests__/users.js`
run tests with `npm start ap.dem.int`

### Async/Await

If you have a function that you want to return a promise such as 

```js
function returnPromise() {
	return 'hi';
}

```

You can add async to it

```js
async function returnPromise() {
	return 'hi';
}

```

and now it will return a promise

You can wait for the promise to resolve using the await keyword

```js
async function returnPromise() {
	return 'hi';
}

async function iCallAPromise() {
	const result = await returnPromise();
	console.log(result); // 'hi'
}
```
await will stop the code from executing until the promise returns.

#### Takeaways

Try to keep setup, do the action and teardown in one test and avoid `beforeAll` and `afterAll` unless you can help it.

## Unit Integration For Client and Server

### Simulate Event Testing
Examples in `client/demo/unit/__tests__/toggle.js`

Use `data-test` attribute on element so you can always find it no matter where it gets moved to.

In example `ToggleButton` has this attribute. Then you can find by going `const button = wrapper.find(`data-test["button"]`)`

### Testing Routes

