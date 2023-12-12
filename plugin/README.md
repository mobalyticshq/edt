# External Data Types

This strapi plugin allows to connect custom types from an external API.

## Installation

Install the plugin with the following command:

```bash
npm i external-data-types
```

Add configuration to your `./config/plugins.js` file:

```js
export default {
  'edt': {
    config: {
      url: "https://example.com/path/to/api",
      types: [
        "foo",
        "bar"
      ],
    },
  },
}
```


