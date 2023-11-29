Centrapay Documentation

Dependencies

Install app dependencies:

```
docker compose run script yarn
```

Local Docker Usage

For local development (with hot reloading):

```
docker compose up
```

Preview Centrapay Docs at http://0.0.0.0:4321.

To build and preview Centrapay Docs using the static files that are deployed to production (without hot-reloading):

```
docker compose run script yarn build
docker compose run script yarn preview
```

Integration Tests

```
yarn integration
```
