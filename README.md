# meteor-react-bp
This is a simple starting point for a meteor react application, using jest and enzyme for testing. [WORK IN PROGRESS]

## Sources
The following resources were referenced when building this app.
* [The Meteor To Do app, react tutorial](https://www.meteor.com/tutorials/react/creating-an-app)
* [The Meteor Guide, for react](https://guide.meteor.com/react.html)
* [The Meteor Guide, for testing (to understand file types and loading)](https://guide.meteor.com/testing.html)
* [React documentation](https://facebook.github.io/react/)
* [React Router documentation](https://github.com/ReactTraining/react-router)
* [Jest documentation and tutorial](http://facebook.github.io/jest/)
* [Flow documentation](https://flowtype.org/)
* [Yarn documentation](https://yarnpkg.com/en/)
* [React Storybook documentation](https://getstorybook.io/)
* [Enzyme documentation](https://github.com/airbnb/enzyme)
* [Meteor eslint configuration](https://github.com/eatdrinkhealthy/eslint-meteor)
* [Glamor documentation, for style - NOTE: may be removed](https://github.com/threepointone/glamor)

## Notes
* ...

## Testing

### Notes
* The intention is to be able to use...
    + 'jest / enzyme' for unit testing
    + 'meteor test' for complex integration testing
    + 'chimp' for end to end testing
    
### Test Runner File Naming Conventions

#### Default test file names / locations for Jest, Meteor, and Chimp
* [jest](http://facebook.github.io/jest/docs/configuration.html#testregex-string):
  - loads all test files: `(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$)`
* ['meteor test'](https://guide.meteor.com/testing.html#test-modes):
  - loads all test files: `"*.test[s].js[x]"` or `"*.spec[s].js[x]"`
      + ignores any files in any `tests/` directory
  - DOES NOT eagerly load application code, only modules imported by tests
* ['meteor test --full-app'](https://guide.meteor.com/testing.html#test-modes): 
  - loads all test files: `"*.app-test[s].js"` or `"*.app-spec[s].js"`
      + ignores any files in any `tests/` directory
  - DOES eagerly load application code, as meteor build normally would
* [chimp](https://chimp.readme.io/docs/command-line-options):
  - loads cucumber tests from: `./features`

#### Project test file location and naming convention
 * The following convention allows you to colocate test files in the same or sub directory of the system under test, without the test runners picking up the incorrect test file
    + place all meteor test files in the same directory as the module / system under test
    + place all jest unit tests in 'tests' sub directory of the module / system under test
        - set [jest test filenames (testRegex)](http://facebook.github.io/jest/docs/configuration.html#testregex-string) to `/tests/.*\\.jest\\.jsx?$`
        - jest file name convention `filename.jest.js[x]`
    + place all chimp tests in 'tests' sub directory of the project root
        - set npm script for chimp to `chimp  --path=tests/end-to-end`
        - NOTE: create additional sub directories in this directory to organize tests
 * example:
    + `<project-root>/.../system-under-test/tests/AppContainer.jest.jsx` (tests run by __jest__ only)
    + `<project-root>/.../system-under-test/AppContainer.tests.jsx` (tests run by __'meteor test'__ only)
    + `<project-root>/.../system-under-test/calledMethods.app-tests.js` (tests run by __'meteor test --full-app'__ only)
    + `<project-root>/tests/end-to-end/.../featureName.feature or .js` (tests to be run by __'chimp'__)
    
  NOTE: placing all 'non meteor application' code, such as tests and storybook stories, in `tests/` directories prevents meteor server from restarting when in development mode

### Jest
#### Mocking Meteor packages
* Many commonly used meteor packages were mocked, by creating mock modules, and using the moduleNameMapper configuration setting
    + some details and light examples can be seen on this [meteor forum discussion](https://forums.meteor.com/t/mocking-meteor-package-imports-in-jest/27780/9)
* Other helpful meteor mocking resources
    + [jest configuration docs, moduleNameMapper](http://facebook.github.io/jest/docs/configuration.html#modulenamemapper-object-string-string)
    + [example jest meteor mocks (some usable examples)](https://github.com/Astrocoders/jest-meteor-mocks)
* One specific, complex example, was mocking SimpleSchema. It took some effort, and trial and error, to mimic being able to reference a returned function from an inline instantiated object
    + eg  `const myValidator = new SimpleSchema({...}).validator();`
    + see the aldeed:simple-schema.js mock for validator() 
#### Snapshots
* when initially creating, or even updating, __be sure to examine the contents of the snapshot file__
    - it is possible to capture incorrect code or even 'undefined' in cases
* snapshot files are to be kept in the default location, a `__snapshots__` subdirectory

## Storybook
* Story file location and naming convention
    - story file names are to follow the convetion `filename.stories.js`
    - story files are to be placed in a `tests/__stories__/` subdirectory of the module / component          

## Flow
* flow package installed
    - place 3rd party and custom created libdefs in `.types/`  (see setting in .flowconfig file)
* list notable flowtype conventions here
* installed [eslint package for flowtype](https://github.com/gajus/eslint-plugin-flowtype)
    - this generates flow type errors simply by linting (may make flow less or unnecessary?)
* Use flow-typed package to download community created libdefs and create generic libdefs for installed pacakges
    - flow-typed libdefs reside in `flow-typed/`, which is git ignored
    - copy or move libdefs from there to `.types/` and edit as needed
    - they can be checked in to the repo from `.types/`
* NOTE, anytime you download libdefs in to `flow-typed/`, you need to nuke or hide that directory, else Meteor will see it and try to load it
