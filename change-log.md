# Change Log

- +proxy in `next.config.js` need for test

- +`"plugin:import/recommended"`ready to change env/files

`npm install eslint-plugin-import eslint-import-resolver-alias --save-dev`

```json
"settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "."],
          ["@/components/*", "./components/*"],
          ["@/assets/*", "./assets/*"],
          ["@/pages/*", "./pages/*"],
          ["@/styles/*", "./styles/*"]
        ],
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"]
      }
    }
  },

"extends": [  
    "plugin:import/errors",
  ],
```

- add `baseUrl` into `jsconfig.json` to enable vscode auto-suggestion for absoule import as `import '@/styles/globals.css`

```json
 "baseUrl": ".",
```

- !!eslint rule errors will break build
