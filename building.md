##Building Panel View for Keep yourself

###Getting started

I've tried to make this as streamlined as possible, but if you have something to contribute, please drop me a line! (There are multiple avenues to do so: raise an issue, fork the project, or send me a message -- @peiche on Github, @wavetree on Twitter.)

- [Sass](http://sass-lang.com)
- [Grunt](http://gruntjs.com)
- [Bower](http://bower.io)

If you're new to any of these projects, check out the sites for installation help.

Once you've got these installed, run the following command at the root of the project to install the required Grunt plugins.

```
$ npm install
```

_Windows users, please note that you will have to run the Command Prompt utility as a system administrator._

Run this next command to have Bower pull the third party projects in.

```
$ bower install
```

Panel View for Keep uses jQuery. Utilizing Bower this way prevents me from having to commit its code into my own, while at the same time allowing me to bundle it in a build.

Now that we've got everything pulled in, we can run Grunt commands to validate and build the extension.

Run the following command to validate the uncompiled .scss against scss-lint, and the unminified .js (only its own, not third party code) against jslint.

```
$ grunt validate
```

We haven't built anything yet, of course. This was just running the linters. Run the next command to compile the project's stylesheet and JavaScript.

```
$ grunt build
```

The build process copies files from external sources (in this case, js jQuery), compiles the .scss into a stylesheet, and minifies the JavaScript.

At this point, you have a working Chrome extension. You can load this unpacked extension in Chrome now, if you want. Follow the directions for [manual installation on the readme](README.md#manual-installation) for this. Continue on to the last section to see how the project can be built into a zip file, which can be uploaded to the Chrome Web Store.

```
$ grunt zip
```

This will bundle together all the files required for the theme into a nice little zip file. It will exclude all the things we don't need, like the Sass stylesheets and the unminified JavaScript, as well as unneeded files and directories (for example, .scss-lint.yml, package.json, node_modules, and bower_components, to name a few).
