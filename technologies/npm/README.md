# NPM
https://docs.npmjs.com/

## Getting Started

### Semantic Versioning

Communicates what kind of changes are in a release.
Let's users of package LOE to update to the latest version.

version should start with `1.0.0` once it's ready to be used

The numbers go `major release`.`minor release`.`patch release`

`patch release` – small bug fixes, no breaking changes
`minor release` – a new feature was added, but still backwards compatible
`major release` - changes that break backwards compatibility
 
#### as users of package

Decide which updates you want to accept in your `package.json` file.

If you only want to accept patch updates you can indicate that as `1.0.x` or `~1.0.4`

If you want to download new features but nothing that's backwards compatible you would define that as `1.x` or `^1.0.4`.


To increment the version number of your package you run `npm version patch` then `npm publish`.

`npm version minor` increases the minor release number
`npm version major` increases major release number
