# @itrulia/jest-schematic

> Replace Karma & Jasmine with ease

This is a plugin for the `@angular/cli` to replace the testing framework with [Jest](https://jestjs.io/).

## Features

-   Sets up Jest and removes Karma & Jasmine
-   Integrates Jest in to the Angular CLI

## Installing / Getting started

To install it you need to require it like this:

```shell
ng add @itrulia/jest-schematic
```

This will add the @itrulia/jest-schematic dependency in to your package.json, delete karma/jasmine and will setup Jest.

If you now execute the command `ng test <project_name>`, `@angular/cli` will execute Jest instead of Karma.

### Add Jest to an Angular library

To add it to a generated library, you can use the following command:

```shell
ng generate @itrulia/jest-schematic:jest --project=@itrulia/dates
```

This will setup Jest in that project.

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/Itrulia/jest-schematic
cd jest-schematic/
npm install
npm run build
```

This will download all dependencies & build the typescript.

If you want to test it in an Angular CLI project you can use [`npm link`](https://docs.npmjs.com/cli/link).

If you want to test the schematic without the Angular CLI you can do it via `schematics .:<schematic>`.

E.g. `schematics .:jest`.

### Deploying / Publishing

You will need to publish this to the github and npm repository.

To do this you will need to do the following steps:

-   As soon as you are done with development (don't forget the tests if necessary please ;) ) please commit your code
-   After that you will need to update the version number of the package.json, please do this via the [npm version](https://docs.npmjs.com/cli/version) tool. Don't forget to set the correct version number according to the [SEMVER](http://semver.org/) guidelines.
-   Please push your code to master now and set a tag (same version as you set earlier) with a `v` prefix (e.g. `v1.1.0`) and add release notes for what has changed so everyone knows what to do when there are breaking changes and what has changed for them.
-   Now you are ready to publish it to the npm repository. You can do this via `npm publish`. Further information can be founde on the official [npm documentation page](https://docs.npmjs.com/cli/publish).

## Contributing

When you publish something open source, one of the greatest motivations is that
anyone can just jump in and start contributing to your project.

To make it easier for everyone to contribute to this project and understand it,
please always update the documentation when you create or modify anything.

Also always try to improve atleast 1 small thing when you are already there so that over time
the project gets better and better, this is also known as [The Boy Scout Rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule).

## Links

-   Repository: https://github.com/Itrulia/jest-schematic
-   Issue tracker: https://github.com/Itrulia/jest-schematic/issues
    -   In case of sensitive bugs like security vulnerabilities, please contact
        karlmerkli@gmail.com directly instead of using issue tracker. We value your effort
        to improve the security and privacy of this project!
-   Related projects:
    -   Jest: https://jestjs.io/

## Licensing

Copyright (c) 2018 Karl Merkli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
