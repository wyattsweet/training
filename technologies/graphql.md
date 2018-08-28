# GraphQL
Notes from [the documentation.](https://graphql.org/learn/)

## Introduction

Graphql is a query language for your API and a server side runtime for executing queries.

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


