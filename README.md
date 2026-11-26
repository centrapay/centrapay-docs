# Centrapay Documentation

## Dependencies

Install app dependencies:

```
docker compose run script yarn
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

## Images

Put images in `src/assets` and render them with `src/components/Image.astro`, so Astro resizes them and serves WebP. In Markdoc, use a relative path (`![Alt](../../assets/guide/screenshot.png)`), or a path inside `src/assets` for tags such as `imageGrid` (`image="/guide/screenshot.png"`). `yarn lint` fails on raw `<img>` tags, direct `astro:assets` imports and CSS background images.
