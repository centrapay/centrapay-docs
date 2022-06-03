# Centrapay Documentation

## Dependencies

Install Ruby:

```
brew install rbenv  # install Ruby version manager
cd path-to/centrapay-docs # cd into centrapay-docs directory
rbenv install $(cat .ruby-version)  # install version of Ruby defined in .ruby-version
```

Install Bundler:

```
sudo gem install bundler
```

Install Ruby gems:

```
bundle install
```

## Local Dev

Run the Jekyll server:

```
bundle exec jekyll serve --livereload
```

Preview the site at http://127.0.0.1:4000


## Local Docker Usage

Install Dependencies:

```
docker compose run script bundle install
```


Run the Jekyll server:

```
docker compose up
```
