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

Preview Centrapay Docs at http://0.0.0.0:3000.
Preview the Legacy Docs at http://0.0.0.0:4000.

To build and preview Centrapay Docs using the static files that are deployed to production (without hot-reloading):

```
docker compose run script yarn build
docker compose run script yarn preview
```
