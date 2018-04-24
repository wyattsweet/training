# [Ch 1 Rails Configuration and Environments](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/cover-page/cover_xhtml#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZjaDAxX2h0bWwmcXVlcnk9)

Rails apps are preconfigured with 3 standard modes of operation: Dev, test and production. It's possible to add new modes.
`RAILS_ENV` specifies the current environment.

Due to ongoing trend to decouple the FE into its own app, Rails 5 introduced API Mode for bootstrapping new apps that will not be used for serving traditional HTML-based browser apps..

## [1.1 Bundler](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/cover-page/cover_xhtml#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMxXzFfaHRtbCZxdWVyeT0=)

Preferred way to manage your App's Ruby Gem dependencies.
One of the most important things Bundler does is dependency resolution on the full list of gems specified in your configuration, all at once. 

#### Gemfile

`Gemfile` is a Ruby-based gem manifest file, which specifies all dependencies of your Rails app, including the version of Rails being used.

To place a Gem only in a specific environment place it in the group block

```ruby
group :development do
  gem 'byebug'
end
```

You can load a gem from its repo using the `:git` option
`gem 'carrierwave', git: 'git@github.com:carrierwaveuploader/carrierwave.git'`
If the gem is on GitHub you can use the `github:` shorthand
`gem 'carrierwave', github: 'carrierwaveuploader/carrierwave'`

`.gemspec` must be at the root of the gem's git repo. If it's not there you must tell bundler which version to use

`gem 'deep_merge', '1.0', git: 'git://github.com/peritor/deep_merge.git'`

To load gems from your filesystem `gem 'nokogiri', path: '~/code/nokogiri'`

#### Gem Locking

Everytime you run `bundle install` or `bundle update`, bundler will re-calculate the dependency tree of your application and stores the result in a `Gemfile.lock`

#### Binstubs

New React apps get binstubs located in the `bin` folder. A binstub is a script which runs in the context on the bundle, which means you don't have to prefix `bundle exec` each time you run a rails executable command.

## [Startup Scripts](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/cover-page/cover_xhtml#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMxXzJfaHRtbCZxdWVyeT0=)
