# Models

## [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)

Rails will pluralize your class name to find the respective database table.
The class `Book` will become `Books`.
Class names of 2 or more words should use `CamelCase` while the table name must contain the words separated by underscores `camel_case`.

### 2.2 Schema Conventions

foreign keys should be snake cased `item_id` or `order_id`
primary keys. ActiveRecord will by default use a integer column named id as the tables primary key. When using Active Record Migrations to create tables, this column will be automagically generated.

### 3.3 Creating Active Record Models

To create Active Record models all you have to do is subclass the ApplicationRecord class

```ruby
class Product < ApplicationRecord

end
```

This will create a `product` model mapped to a `products` table in the database.

If you created a products table using the following SQL statement

```sql
CREATE TABLE products (
   id int(11) NOT NULL auto_increment,
   name varchar(255),
   PRIMARY KEY  (id)
);
```

Then you would be able to do the following

```ruby
p = Product.new
p.name = "Some product name"
puts p.name // => "Some product name"
```

### 4. Overriding the Naming Conventions

`ApplicationRecord` inherits from `ActiveRecord::Base` which defines some helpful methods, such as table_name which would let you change the database table name.

```
class Product < ApplicationRecord
  self.table_name = "my_products"
end
```

If you do, you will have to define manually the class name that is hosting the fixtures.

### 5. CRUD

### CRUD: Reading and Writing Data

#### Create

Active record automatically creates methods to allow an application to read and manipulate data stored within its tables.

some different ways to create

```ruby
user = User.create(name: "David", occupation: "Developer")
```

```ruby
user = User.new
user.name = "David"
user.occupation = "Developer"
```

Block version

```ruby
user = User.new do |u|
  u.name = "David"
  u.occupation = "Developer"
end
```

#### Read 

A few examples of reading data

```ruby
# returns a collection with all users
users = User.all
```

```ruby
User.first
```

```ruby
# first user with the name David
User.find_by(name: "David")
```

```ruby
# find all users name David who are developers and sort by created_at in reverse chronological order
User.where(name: "David", occupation: "Developer").order(created_at: :desc)
```

[More info on querying active record models](http://guides.rubyonrails.org/active_record_querying.html)

#### Update

Some different ways to update

```ruby
user = User.find_by(name: 'David')
user.name = 'Dave'
user.save

user = User.find_by(name: 'David')
user.update(name: 'Dave')

```

#### Delete

```ruby
user = User.find_by(name: 'David')
user.destroy

# find and delete all users named David
user = User.find_by(name: 'David')
user.destroy

# Delete all users
User.destroy_all
```

### Validations

Several methods that you can use to check your models and validate that an attribute value isn't empty, is unique, follows a specific format and many more.
The methods save and update take it into account when running and return false if validation fails and wont perform any operation on the database.
Save and update have a bang counterpart `save!` `update!` which is stricter and they raise the exception `ActiveRecord::RecordInvalid` if validation fails.

```ruby
user = User.new
user.save  # => false
user.save! # => ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
```

### Callbacks

Active Record callbacks allow you to attach code to certain events in the life-cycle of your models.
Allow you to execute code whenever a specific event occurs, such as creating, updating or destroying a record.

### Migrations

Rails provides a domain specific language for managing a database schema called migrations.
To create the table from a migration you'd run `rails db:migrate` and to roll it back you'd run `rails db:rollback`.


## Active Record Migrations


