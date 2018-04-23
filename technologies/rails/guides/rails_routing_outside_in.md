# [Rails Routing From the Outside In](http://guides.rubyonrails.org/routing.html)

## [The Purpose of the Rails Router](http://guides.rubyonrails.org/routing.html#the-purpose-of-the-rails-router)

The Rails router recognizes URLs and dispatches them to a controllers action. It can also generate paths and URLs.

When the router receives a request for `GET /patients/17`

It asks the router to match it to a controller action. If the first matching route is `get '/patients/:id, to: 'patients#show`

The request is dispatched to the patient controllers show action **with the params `{ id: '17' }`**.

### [Generating Paths and URLs from Code](http://guides.rubyonrails.org/routing.html#generating-paths-and-urls-from-code)

### [Configuring the Rails Router](http://guides.rubyonrails.org/routing.html#configuring-the-rails-router)

The routes for your application or engine live in the file `config/routes.rb`

```ruby
Rails.application.routes.draw do
  resources :brands, only: [:index, :show] do
    resources :products, only: [:index, :show]
  end

  resource :basket, only: [:show, :update, :destroy]

  resolve('Basket') { route_for(:basket) }
end
```

The `Rails.application.routes.draw do` block is required to establish the scope for the router DSL.

## [Resource Routing: the Rails Default](http://guides.rubyonrails.org/routing.html#resource-routing-the-rails-default)

A resourceful route declares all the common routes for a given controller with a single line of code.

When your app recieves a incoming request for  `DELETE /photos/17`.
If the first matching route is `resources :photos`, Rails will dispatch that request to the `destroy` action on the photos controller with `{ id: '17' }` in params.

### [CRUD, Verbs and Actions](http://guides.rubyonrails.org/routing.html#crud-verbs-and-actions)

A resourceful route provides a mapping between HTTP verbs and URLs to controller actions.
Each action also maps to a specific CRUD operation in a database.

A single resourceful route – `resources :photos`

creates seven different routes, all mapping to the `Photos` controller.

| HTTP Verb | Path | Controller#Action | Used for |
|---|---|---|---|
| GET | /photos | photos#index | display a list of all photos |
| GET | /photos/new | photos#new | return HTML form for creating a new photo |
| POST | /photos |   |   |
| GET | /photos/:id |   |   |
| GET | /photos/:id/edit |   |   |
| PATCH/PUT | /photos/:id |   |   |
| DELETE | /photos/:id |   |   |

### [Path and URL Helpers](http://guides.rubyonrails.org/routing.html#path-and-url-helpers)

resourceful routes expose a number of helpers in the controller

- `photos_path` return `/photos`
- `new_photo_path` return `/photos/new`
- `edit_photo_path(:id)` return `/photos/:id/edit`
- `photo_path(:id)` return `/photos/:id`

Each helper has a corresponding `_url` helper, for example `photos_path_url` which returns the same path prefixed with the current host, port, and path prefix.

### [Defining Multiple Resources at the Same Time](http://guides.rubyonrails.org/routing.html#defining-multiple-resources-at-the-same-time)

Define multiple resources in one line `resources :photos, :books, :videos`

### [Singular Resources](http://guides.rubyonrails.org/routing.html#singular-resources)

If you need a path to route to a different controller, you can define a singular resource `get 'profile', to: 'users#show'`

passing a string to `to:` will expect the format `controller#action`
If using a symbol the `to: ` option should be replaced with `action: `.
When using a String without a `#` the `to: ` option should be replaced with `controller: `.

```ruby
get 'profile', action: :show, controller: 'users'
```

You may want to use the same controller for a singular route `/account` and a plural route `/accounts/45`, singular resources map to plural controllers.
For example, `resource :photo` and `resource :photos` creates both singular and plural routes which map to the same controller `PhotosController`.

### [Controller Namespaces and Routing](http://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing)

You can organize groups of controllers under a namespace.
You might want to group a number of controllers under a `Admin::` namespace.
These controllers would live in the `app/controllers/admin` directory.
In your router these could be grouped like this –
```ruby
namespace :admin do
  resources :articles, :comments
end
```

For the `Admin::ArticlesController`, rails will create:

| HTTP Verb | Path | Controller#Action | named helper |
|---|---|---|---|
| GET | /admin/articles | admin/articles#index | admin_articles_path |
| GET | /admin/articles/new | admin/articles#new | new_admin_articles_path |
| POST | /admin/articles | admin/articles#create | admin_articles_path |
| GET | /admin/articles/:id | admin/articles#show | admin_article_path(:id) |
| GET | /admin/articles/:id/edit | admin/articles#edit | edit_admin_article_path(:id) |
etc, etc

If you want to route `/articles` without the `/admin` prefix to `Admin::ArticlesController`, you could use:

```ruby
scope module: 'admin' do
  resources :articles, :comments
end
```

or for a single resource

```ruby
resources :articles, module: 'admin'
```

Route `/admin/articles` to the `ArticlesContoroller` without the `Admin::` module prefix, you could use:

```ruby
scope '/admin' do
  resources :articles, :comments
end
```

or `resources :articles, path '/admin/articles'`

[2.7 Nested Resources](http://guides.rubyonrails.org/routing.html#nested-resources)
