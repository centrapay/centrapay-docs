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

Install Ruby gems:

```
cd legacy && bundle install
```

## Local Dev

Run the Jekyll server:

```
cd legacy && bundle exec jekyll serve --livereload
```

Preview the site at http://127.0.0.1:4000.


## Local Docker Usage

Install Dependencies:

```
docker compose run script bash -c 'cd legacy && bundle install'
```


Run the Jekyll server:

```
docker compose up
```
