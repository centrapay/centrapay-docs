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
docker compose run script bash -c "cd server && yarn"
```
## Local Docker Usage

Run the servers:

```
docker compose up
```

Preview the site at http://0.0.0.0:3001.
