# Centrapay Documentation

## Dependencies

Install app dependencies:

```
docker compose run script yarn
```

Mermaid diagrams are rendered to SVG at build time in headless Chromium. The Docker image includes it. To build outside Docker, install it once:

```
yarn playwright install --only-shell chromium
```

## Local Docker Usage

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

## Integration Tests

```
yarn build
yarn integration
```
