# Introduction to Computer Networking

## Unit 1: The Internet and IP

### [A day in the life of an application](https://lagunita.stanford.edu/courses/Engineering/Networking-SP/SelfPaced/courseware/ac9d1eef5aaa4bb5bcfe4d42f51f0f5b/489652e64f114cda8b3e0a514ff7e498/)

connectivity - two computers can connect and exchange data

Networked applications
- read write data over network
- most common communication model used is a bidirectional stream of bytes
  - One side reads what another writes

#### Basic client server model
The web uses HTTP to communicate
In HTTP a client opens a connection to a server and sends commands to it, such as GET to request a page
Response has a number code associated with it, such as `200` ok.

#### BitTorrent Example
bittorrent breaks files up into something called "pieces".
collection of clients is called "swarms".
Download the torrent file, which has info on the file and who the tracker is
Tracker keeps track of who's a member of the swarm.
You have a dense graph of clients connected to each other

#### Skype
client a "caller" opens connection to client b.
Both are clients requesting data from each other.

This happens with something called a NAT
If you're behind a NAT you can open connections to the internet, but other nodes on the internet can't easily open connections to you.

Uses something called a rendezvous server.
Client B opens a connection to the rendezvous server and client A makes a call to the rendezvous server.
If client B accepts, it will open connection to client A.
Client A couldn't open the connection because B was behind the NAT, so the rendezvous server which B is connected to, tells B that A wants to make a connection. If they accept B opens a connection to client A. This is called a **reverse connection** because B is opening a connection to A.

![skype_1](./01-skype.png)

If client A and client B are behind a NAT they have to communicate through a relay.

#### overview: Application Communication

most common communication model of networked applications is bidirectional, reliable byte stream. Allows to communications to exchange data.

### [The 4 Layer Internet Model](https://lagunita.stanford.edu/courses/Engineering/Networking-SP/SelfPaced/courseware/ac9d1eef5aaa4bb5bcfe4d42f51f0f5b/09b18b9bd046403a93c85b82044ea603/)
