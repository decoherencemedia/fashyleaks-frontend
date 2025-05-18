# Decoherence Archive (decoherence-archive)

A Quasar Project

## TODO

Functionality

- get warnings working
- implement mobile
- change pagination such that
  - old batch isn't displayed
    loading bar displays when loading a new batch

Style

- remove scrolling on landing and about pages
- figure out warning loading icon for user-table
- make sure ContentInfo are consistent across collections
- make spacing in TextBox pages look better
- make search button not really wide
- make icons in Datasets tab responsive to which dataset is selected
- make text in Datasets tab bigger
- make box in datasets tab align left
- try svg in toolbar title

Performance

- consolidate config.json data
- improve Lighthouse score

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
