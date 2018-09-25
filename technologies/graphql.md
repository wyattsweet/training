# GraphQL
Notes from [the documentation.](https://graphql.org/learn/)

## Introduction

GraphQL is a query language for your API and a server side runtime for executing queries.

The backend GraphQL services is created by defining types and fields on those types.

```
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

A graphQL service is running, it can be sent graphQL queries. It will first validate the query for the proper field and types, then runs the function and returns the result.

The following query

```
{
  me {
    name 
  }
}
```

Could produce the following JSON result

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

## Queries & Mutations

How to query a GraphQL server

### Fields

GraphQL is about asking for specific fields on objects. The query has the same shape as the response, you always get back what you expect. Fields can refer to strings or you can make a sub-selection of fields which refers to an object

```
{
  hero {
    name
    friends {
      name
    }
  }
}
```

which would return –

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### Arguments

You can pass arguments to fields.

```
{
  human(id: '1000') {
    name
    height
  }
}
``` 

```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "heigth": 1.72 
    }
  }
}
```

Every field and nested set of arguments can get its own argument. You can pass arguments to do data transformations on the server, instead of on every client.

```
{
  human(id: '1000') {
    name
    height(unit: FOOT)
  }
}
``` 

```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "heigth": 5.876453 
    }
  }
}
```

Arguments can be many different types. This example uses a enumeration type, which represents one of a finite set of options. GraphQL comes with a default list of types, but a GraphQL server can declare its own types. 

### Aliases

When you write a graphQL query the response key value has the same name as query. If two fields in an object are going to conflict because they have the same name, you can use an alias to change the name of the field in the response object. This lets you fetch all the data with one request and not have to worry about conflicting fields.

*query with alias*
```
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

*JSON response*

```
{
  "data": {
    "empireHero": {
      "name": "Luke SKywalker"
    },
    "JediHero": {
      "name": "R2-D2"
    }
  }
}
```

### Fragments

Fragments let you set up groups of fields that can be reused across multiple queries. This let's you keep your queries DRY and saves you from having to re-write lists of fields.

*example query with fragments*

```
leftComparison: hero(episode: EMPIRE) {
  ...comparisonFields
}

rightComparison: hero(episode: JEDI) {
  ...comparisonFields
}

fragment comparisonFields on Character {
  name
  appearsIn
  frields {
    name
  }
} 
```

*JSON response*

```json
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
```

### Operation Name

Up until this point, the examples have used a shorthand syntax which leaves out the `query` keyword and the query name. In production apps, it's useful to use these to make code less ambiguous.

*example query with query keyword and query name*

```
query HeroNameAndFrields {
  hero {
    name
    frields {
      name
    }
  }
}
```

The **operation type** is either `query`, `mutation` or `subscription`. This is required when not using the query shorthand. 

**operation name** is similar to a function name and aids when trying to debug. It's much easier to debug a query that's failing if you get a name in your logs as opposed to trying to decipher based on the content.

### Variables

GraphQL has a first-class way to factor dynamic values out of the query and pass them in a separate dictionary. These values are called variables 

When working with variables
1. Replace the static files with `$variableName`
- Declare `$variableName`
- Pass `variableName: value` in the separate dictionary. This will be transport specific (usually JSON)

```
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

*variable*
```
{
  "episode": "JEDI"
}
```

You should never use string interpolation to construct queries

### Variable Definition

The variable definition is the `$episode: Episode` part in the query above. This is just like argument definitions for functions in a typed language. The variable is listed, `$episode`, followed by its type `Episode`.
Declared variables must be either `scalars`, `enums` or `input` object types. If you want to pass a complex object, you need to know which input type matches on the server.

Variables can be optional or required. In the example above a `!` would be used next to the `Episode` type to denote it's a required field.

### Default Variables

Default variables can be assigned to variables like so

```
query HeroNameAndFriends($episode: Episode = 'JEDI') { ... }
```

When variables are passed in, they will override the default

### Directives

Directives allow you to dynamically change the structure and shape of your queries. Example query where friends are conditionally added.

*query using directive*
```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

*variables, if withFriends is true, friends will be queried for*

```
{
  "episode": "JEDI",
  "withFriends": true
}
```

A directive can be included in a field or fragment inclusion. The core GraphQL spec includes exactly two directives, which must be supported by any GraphQL spec-compliant server –

1. `@include(if: Boolean)` Only include if the result of the argument is true
- `@skip(if: Boolean)` skip if argument is true

### Mutations

Any operation that could cause a data write, should be done in a mutation query.

*mutation query where nested fields are requested on return*

```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

*variable*

```json
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

*response*
```json
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

`createReview` returns the `stars` and `commentary` fields of the newly created review.
We pass in `review` which isn't a scalar data type but a input object type.

The main difference between queries and mutations is *while query fields run in parallel, mutation fields run one at a time, one after the other*

If you send two mutations in one request, the first is guaranteed to finish before the second.

### Inline Fragments

Sometimes your query will return data that could be of multiple types (union type) or query. Each of these types may have different fields

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }

    ... on Human {
      height
    }
  }
}
```

In the above query the `name` field is always present and `primaryFunction` if the return type from `hero` is `Droid` and `height` if the return type is `Human`. The return type will depend upon which episode is passed in.

### Meta Fields

Sometimes you don't know what type you'll get back from the GraphQL services. GraphQL allows you to request `__typename`, a meta field, at any point in the query to get the name of the object type at that point.

*request*

```
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
  }
```

*response*

```json
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}:
```

## Schemas and Types

### Type System

Schemas tell you what type of data you can ask for, what fields you can select, etc. Every GraphQL service defines a set of types, then when queries come in, they are validated and executed against the schema.

### Object types and fields

object types are the most basic element in a graphQL schema. They represent a type of object you can fetch from your service, the fields it has, and the type of each field.

```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

`Character` is a GraphQL object type
`name` and `appearsIn` are fields on the `Character type`
`String` is one of the built-in scalar types
`String!` means this is a required field and the API will always return a value for this field
`[Episode]!` represents an array of `Episode` objects. It is also `non-nullable`, so you can always expect a value

### Arguments

Each field on a GraphQL object can have arguments. The length field below takes a unit argument.

```
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

All arguments are named, unlike JS where they are ordered. 

### Query and Mutation Type

Every GraphQL service will have a query type and may have a mutation type. These define the entry point of every GraphQL query. A query like this –

*query*
```
query {
  hero {
    name 
  }
  droid(id: "2000") {
    name
  }
}
```

*response*
```
{
  "data": {
    "hero": {
      "name": "R2-D2"
    },
    "droid": {
      "name": "C-3PO"
    }
  }
}
```

The GraphQL service needs to have the following `Query` type

```
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

mutations work in a similar way. You define fields on a mutation type and those are available as the fields you can call in your query.

### Scalar types
