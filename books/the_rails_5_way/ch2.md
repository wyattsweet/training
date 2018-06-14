# [Ch 2 Routing](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/chapter-2-routing/ch02_html?uicode=califa)

The triggering of a controller action is the main event in the life cycle of a connection to a Rails app. The process of choosing which controller and which action to execute is embodied in the routing system.

The routing system maps URLs to actions.

## [2.1 The Two Purposes of Routing](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/chapter-2-routing/ch02_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMyXzFfaHRtbCZxdWVyeT0=)

1. It maps requests to controller action methods, and it enables the dynamic generation of URLs for you to use as arguments to methods like `link_to` and `redirect_to`.

example route
```
'recipes/:ingredient' => "recipes#index"
```
- static string (recipes)
- slash (/)
- segment key(:ingredient)
- controller action mapping ("recipes#index")
- HTTP verb constraining method (get)

## [2.2 The `routes.rb` File](http://proquest.safaribooksonline.com.ezproxy.sfpl.org/book/programming/rails/9780134657691/chapter-2-routing/ch02_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODAxMzQ2NTc2OTElMkZzZWMyXzJfaHRtbCZxdWVyeT0=)
