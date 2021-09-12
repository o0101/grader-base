module.exports = {
  name: "My App Name",
  entry: "./app.js",
  author: {
    name: "My Name",
    url: "https://github.com/my-github",
  },
  desiredPort: 49666,
  version: "0.0.1",
  description: "A cross-platform app",
  source: "https://github.com/my-github/my-open-source",
  organization: {
    name: "My org",
    url: "https://github.com/my-org"
  },
  apiOrigins: [],                   // exact origins allowed to call Service API via grader global,
  DEBUG: (process.env.GR_DEBUG && (process.env.GR_DEBUG === "false" ? false : true)) || false
};
