# Learning PostgreSQL 10

## Chapter 1

### CAP theorem
states that it is impossible for a distributed system to provide all three of the following guarantees

1. Consistency: All clients immediately see the latest data
- Availability: All clients can find a replica of data, even in the case of a failure
- Partition Tolerance: The system continues to work, regardless of arbitrary message loss or failure of part the system

Relational databases enforce ACID (atomicity, consistency, isolation, durability)
NoSQL adopts a model of **basically available soft-state, eventual consistency**
