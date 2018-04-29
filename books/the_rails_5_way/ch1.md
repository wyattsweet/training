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

## [1.2 Startup Scripts](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/cover-page/cover_xhtml#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMxXzJfaHRtbCZxdWVyeT0=)

## [1.3 Default Initializers](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/cover-page/cover_xhtml#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMxXzNfaHRtbCZxdWVyeT0=)

`config/initializers` contains a set a default initializer scripts
Your own configuration Ruby scripts should be added here

There are 10 default initializers included in all Rails applications

1. `application_controller_renderer.rb`
    - Rails 5 introduces the `ActionController::Renderer` utility class for rendering arbitrary templates' absent controller actions
- `assets.rb`
    - customizations for the asset pipeline
- `backtrace_silencers.rb`
    - built-in mechanism for reducing the size of exception backtraces by eliminating insignificant lines
- `cookies_serializer.rb`
    - Controls how Rails handles the serialization of cookies.
- `filter_parameter_logging.rb`
    - Let's you specify what request params should be filtered from your log files. If Rails receives a request param included in the `filter_parameters` collection, it will mark it as filtered in the logs.
- `inflections.rb`
    - Rails' ability to transform singular words to plural is done via a class called `Inflector`.
    - In the rails console you can test out the pluralization
        ```ruby
        ActiveSupport::Inflector.pluralize "project"
        => "projects"
        ```
    - You can teach `Inflector` how to pluralize certain words it can't, or to make certain words unpluralizable. This should be done within this file.
- `mime_types.rb`
    - Rails supports a standard set of MIME types, but if your application needs to support more, they can be added into this file.
- `new_framework_defaults.rb`
    - migration options for making migration to Rails 5 from earlier versions easier.
- `session_store.rb`
    - configures the session store of the application. The session cookies are signed using the `secret_key_base` set in `config/secrets.yml`. If needed, a new one can be generated by running `rake secrets`.
- `wrap_parameters.rb`
    - configures your app to work with many JS frameworks out of the box.

## [1.4 Other Common Initializers](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/cover-page/cover_xhtml#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMxXzRfaHRtbCZxdWVyeT0=)