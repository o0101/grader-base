# This is Your Readme

You probably want to fill it out with useful information about your new cross-platform Desktop GUI app.

But for now, I'll just leave this information about the tool you're using here, to help you.

# Grader.JS

Grader.JS, or just **Grader**, is a tool to help you build cross-platform desktop apps in JavaScript, HTML and CSS, without the bloat of Electron.

# Get Started from the Command line

Use the Grader.JS tool, if you haven't already to get template this repo from the command line:

```sh
  mkdir my-app
  cd my-app
  # make it git
  git init
  # make it grader
  npm i graderjs
```

And we will automatically populate your repo.

# Get Started from GitHub

Click "Use This Template" and you will have a new repo, then clone it to your workspace and `cd` into it, and run:

```sh
npm i
```

# Start Building

Create binaries right away:

```sh
./scripts/compile.sh
```

You now have a GUI app in Node.JS and JavaScript/HTML/CSS.

And you will have cross-platform binaries available in `/bin`

and also for download from the computer you're on at port 8080.

# Start Coding

Put your own code into, `src/app.js`:

**E.g**:

```js
  import Grader from './index.js';

  start();

  async function start() {
    await Grader.go();
  }
```

And put your JS/HTML/CSS into, `src/public/index.html`:

```html
  <meta charset=utf-8>
  <title>Your Cross-Platform App</title>
  <style>
    :root {
      font-family: sans-serif;
      background: lavenderblush;
    }
    body {
      display: table;
      margin: 0 auto;
      background: silver;
      padding: 0.5em;
      box-shadow: 0 1px 1px purple;
    }
    h1 {
      margin: 0;
    }
    h2 {
      margin-top: 0;
    }
  </style>
  <h1>Hello World!</h1>
  <h2>Meet <i>Grader</i></h2>
  <p>
    <button onclick="grader.ui.minimize();">_</button>
    <button onclick="grader.ui.restore();">&#11036;</button>
    <button onclick="grader.ui.close();">x</button>
  <script>
      (async () => {
        await graderReady();

        const [title, favicon, startURL] = (await Promise.allSettled([
          grader.meta.getTitle(),
          grader.meta.getFavicon(),
          grader.meta.getStartURL()
        ])).map(({status, value, reason}) => {
          if ( status == 'fulfilled' ) return value;
          return reason;
        });

        console.log({title, favicon, startURL});

        document.title = title;
      })();
    </script>
```

# Then build it

```sh
./scripts/compile.sh
```

You now have a GUI app in Node.JS and JavaScript/HTML/CSS.

And you will have cross-platform binaries available in `/bin`

and also for download from the computer you're on at port 8080.

For more demos see the demos in `src/demos`.

# Configuration

You can configure some options:

`src/config.js`:
```js
module.exports = {
  name: "MyGraderApp",
  entry: "./app.js",
  author: {
    name: "my name",
    url: "https://github.com/my-github-username",
  },
  desiredPort: 49666,
  version: "0.0.1",
  description: "A Beautiful Demonstration of Just a Tiny Fraction of The Amazing Benevolence Which Grader Hath To Offer",
  source: "https://github.com/my-github-username/MyGraderApp",
  organization: {
    name: "My Org",
    url: "https://github.com/my-github-org-name"
  },
  apiOrigins: [],                   // exact origins allowed to call Service API via grader global,
  DEBUG: false                       // switch on debug output when you're ready to go *debug*
}
```


# More

See [the API docs](https://github.com/c9fe/graderjs) for more. You can also take a look at the API code in `src/index.js'.

# Related projects

See [this list of Electron alternatives](https://github.com/sudhakar3697/electron-alternatives) for more options for cross-platform desktop app developement using web technologies.

----------------------


# *Grader.JS*
