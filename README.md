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
docker compose run script bash -c "cd preview-nuxt && yarn"
```
## Local Docker Usage

For local development (with hot reloading):

```
docker compose up
```

Preview the Jekyll site at http://0.0.0.0:4000.
Preview the Nuxt site at http://0.0.0.0:3000.

In production we build and serve static files which is different to the Nuxt development server.
You can preview the static Nuxt site at http://0.0.0.0:5001.
Note this does not support hot reloading.

🙈
