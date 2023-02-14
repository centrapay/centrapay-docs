# Centrapay Documentation

## Dependencies

Install Ruby:

```
brew install rbenv  # install Ruby version manager
cd path-to/centrapay-docs # cd into centrapay-docs directory
rbenv install $(cat ./legacy/.ruby-version)  # install version of Ruby defined in ./legacy/.ruby-version
```

Install Bundler:

```
sudo gem install bundler
```

Install app dependencies:

```
docker compose run ruby-script bundle install
docker compose run script yarn
```
## Local Docker Usage

For local development (with hot reloading):

```
docker compose up
```

Preview the Jekyll site at http://0.0.0.0:4000.
Preview the Astro site at http://0.0.0.0:3000.

You can build and preview the static site without hot reloading to mimic our production build:
```
docker compose run script yarn build
docker compose run script yarn preview
```
