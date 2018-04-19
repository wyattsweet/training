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

Migrations are a convenient and consistent way to alter your database schema over time.
Active record knows how to update your schema along the timeline, bringing it to whatever point it is in the history to the latest version.
The migration can add tables and also rollback

### Create a standalone migration

Migrations are stored as files in the `db/migrate` directory, one for each migration class.
The name of the file is in the form `YYYYMMDDHHMMSS_create_products.rb`. This would define the `CreateProducts` class.

Active Record provides a generator for creating this for you `rails generate migration CreateProducts`, this would create a empty migration.

If the migration name is in the form of `AddXXXtoYYY` or `RemoveXXXFromYYY` and is followed by a list of column names and types then the migration will create the appropriate add and remove column statements.

`rails generate migration AddPartNumberToProducts part_number:string` – This will add the column `part_number` to the `Products` table.

You can add a index with the following `rails generate migration AddPartNumberToProducts part_number:string:index`

To remove a column from the table – `bin/rails generate migration RemovePartNumberFromProducts part_number:string`

You can add multiple columns – `$ bin/rails generate migration AddDetailsToProducts part_number:string price:decimal`. Here we are adding the columns `part_number` and `price`.

If the migration is in the form of `CreateXXX` and is followed by a list of column names and types, then the migration will create the table XXX with the columns listed.

`bin/rails generate migration CreateProducts name:string part_number:string`.

You can always add to the migration by editing the `db/migrate/YYYYMMDDHHMMSS_add_details_to_products.rb` file.

There is a generator which will produce join tables.

`bin/rails g migration CreateJoinTableCustomerProduct customer product`.

### 2.2 Model Generators

The model and scaffold generators will create the appropriate migrations for the new model.
The following statement - `bin/rails g model Product name:string description:text`

will create the following migration

```ruby
class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```

You can append as many name/column pairs as you want.

### 2.3 Passing Modifiers

## Writing a Migration

The `create_table` method is one of the most fundamental. Most of the time it will be generated for you using a model or scaffold generator.

```ruby
create_table :products do |t|
  t.string :name
end
```
This creates a products table with a column called name.
By default `create_table` will create a primary key called `id`. You can change the name of the primary key with the `:primary_key` option. If you don't want a primary key, you can pass the option `id: false`.
If you need to pass db specific options, you can placee a SQL fragement in the `:options` option

```ruby
create_table :products, options: "ENGINE=BLACKHOLE" do |t|
  t.string :name, null: false
end
```

### 3.2 Creating a Join Table

The migration method `create_join_table` creates a "has and belongs to many" join table – `create_join_table :products, :categories`.
This creates a `categories_products` table with two columns called `category_id` and `product_id`.

`create_join_table` also accepts a block which can be used to add indicies or additional columns.

### 3.3 Changing Tables


