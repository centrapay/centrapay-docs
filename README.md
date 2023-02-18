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

For local development:

```
docker compose up
```

+ Preview Centrapay Docs with hot-module replacement at http://localhost:3000.

+ Preview the production build of Centrapay Docs at http://localhost:5001.

  The production build does not support hot module replacement. To view changes to source files, you will need to rerun the build process and refresh the site.

  ```
  docker compose run script yarn build
  ```

+ Preview the Legacy Centrapay Docs at http://0.0.0.0:4000.
