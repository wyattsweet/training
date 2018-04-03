

### Domains

`frontendmasters.com` is a domain.
subdomain is `blog.frontendmasters.com`

domains are high level wrapper on an IP address. `127.0.0.1` is always home. Your local router has a specific one.

IP - internet protocol. An agreed upon way for networks to communicate. There's lots of different protocalls. We use something called TCPIP or transmission control protocal.

tcpip takes an ip and maps them to domains. "The Internet Phonebook"

It maps domains to IPs. 

Big hack that shut down the internet they hacked the dns provider so nobody could look up IPs, this is a failing of dns. The internet is fragile in this way.

There's lots of protocalls but we use TCPIP

### Ping

`ping` is useful for telling you if your website is up. You might think that your server is down but it could just be that the dns is down. You don't have to respond to ping, it's a good way to know if your server is up.

You have caches everywhere. if you goto google.com a lot you will have a local cache so don't have to look that up everytime, which is on your computer. On your router you have another cache. 

ISP has another cache, basically layers and layers of cache. A russian and chinese site takes a while because it's not on any of the caches. 

When you point your domain at a IP it's updating servers around the world.

### Security

We should always think about security, people are always trying to break into your computer.

It's a fact of like right now. You don't leave your front door or car unlocked.

DDOS utilized unsecure computers to slam a site with a bunch of traffic and take it offline. It's peoples bad security practice that cause ddos attacks.

problems with dns –

DNS cache poisining. When a domain points to a different ip address that looks just like your site but it's actually a different ip a completely different server. This is solved with HTTPS. HTTPS is a handshake between the browser and server which says you are who you say you are.

### Trace Route

You watch your request make hops around servers. Trace route tells you how you're getting to a url

`traceroute netflix.com`

trace routes saying here's how I get from one end to the other end.

It uses something called - Internet Control Message Packet

There's a TCP

ICMP is internet control mesage packet, through trace route you're sending `ICMP` packets.

### Vim

"The journey of a thousand miles begins with a few simple steps"

3 modes

- command mode
- insert mode
- last-line mode

**command mode** is basically normal mode

search mode is `/` 

`shift n` searches form the bottom 

by default search is case sensitive.

`/\cSearch term` is a case insensitive search

**last line mode** is anything after `:`

`:w someFileName` will save your file

open vi with `vi someFileName` will open and save your file.

Context switching is expensive.

vim is infinitely configurable

`^ is ctrl`

### ssh

secure socket shell. It's a way of connecting to remote devices. 2 ways of connecting: username, password and ssh key.

ssh key is more secure because people make passwords easy to remember.

Humans are bad a remembering things.

You can create an auth log which would show all the authentication requests people are making.

### Public Key Authentication

is the best way.

public key and private key. The public key goes on the server and the private key is required to decrypt it. Very secure server, as close to unbreakable as we can get. 

to make a key

`ssh-keygen -t rsa` rsa is a encryption strategy.

creates 2 files

```
some_key.pub
some_key 
``` 

`some_key.pub` is the public key
`some_key` is your private key

You can't loose the private key or you're locked out completely.

## Setting up a VPS

dedicated server is when  you own the entire machine
VPS is a dedicated server broken up into chunks
cloud computing is just a collection of VPSs


`top` is like activity monitor
`htop` is similar but cleaner
`apt-get` Linux package manager
`apt-get update` updates everything

Never run anything as root unless you absolutely have to

`sudo` stands for super user do

create a user with `adduser $USERNAME`

add user to sudo user group so user is able to run sudo command when needed

`usermod -aG sudo $USERNAME`

-aG is add group

`su $USERNAME` is switch user

if you see the `#` after directory on command line, that means you are logged in as the root user

To look at a log, you need sudo permission

`sudo cat /var/log/auth.log`

`sudo !!` will replay the last command as sudo


add an ssh key for a user `cat ~/.ssh/KEY.pub | ssh $USERNAME@$SERVER_IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"`

### disable root login

Never be able to login as root

in `/etc/ssh/sshd_confid`

switch `permitRootLogin yes` to `permitRootLogin no`

`sudo service ssh restart`

### Associating the DNS

![something](/Users/wyattsweet/code/training/fem/full_stack_1/Screen Shot 2017-12-22 at 10.04.33 PM.png)

the `www.tunetrakr.com` dns

`www` means www.domain.com will resolve to your ip

`@` means just domain.com will also resolve to your ip

An `A` record just maps a name to an IP address

`CNAME` record maps name to another name. For a subdomain like `blog.tunetrakr.com` you could do 

| Type  | Host   | Value   |
|---|---|---|---|
| CNAME Record   | blog   | tunetrakr.com   | 

In NGINX you would route blog to the correct route

## Setting up the server

![](/Users/wyattsweet/code/fem/full_stack_1/Screen Shot 2017-12-22 at 10.18.00 PM.png)

unix is the most ubiquitous

unlike JavaScript, unix commands/skills wont change.

Ubuntu has a GUI and command line

mac is a clean wrapper on a unix based system.

### Introducing Nginx

"A HTTP and reverse proxy server, a mail proxy server and a generic TCP/UDP proxy server"

- reverse proxy
- http server

A proxy takes a bunch of requests and routes them out to the web. Reverse proxy takes in a bunch of requests from the web and routes them to your app appropriately.

install nginx `sudo apt-get install nginx`

start nginx `sudo service nginx start`

When you visit your domain in the browser, you should see default niginx page.

### nginx config

`sudo cat /etc/nginx/sites-available/default`

`cat` dumps everything
`less` gives you page by page

Nginx is very fast and highly configurable.

default the server listens on port 80

SSL port is 443

**so far we know**

```
domain.com
|
v
23.23.185.23
|
v
Nginx/Apache
|
V
Node

```

`nslookup` shows where a domain is pointing

install git

then install node.js/npm

`apt-get install git nodejs npm`

### symbolic ln `nodejs` to `node`

make a web directory (if one doesn't already exist) `sudo mkdir -p /var/www`. This is where all web directories will be served from.

`sudo chown -R $USER:$USER /var/www` change ownership of the web directory to the current user


`rmdir` removes a directory

### Configure NGINX to point directly to your node server.

`sudo vi /etc/nginx/sites-available/default`

```
location / {
	proxy_pass http://127.0.0.1:3001/;
}
```

restart nginx

Now when you go to www.yourdomain.com, it will redirect to your node server running on port 3001

## Deploying Code

Build a system to automatically deploy and restart your code



fix NPM persmissions so you don't have to sudo install npm modules

`sudo mkdir -p /usr/local/lib/node_modules`

`sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

### How do we keep our app up and Running

Forever - a process manager that keeps a proccess running indefinitely, similar to pm2

```
$ pwd
/var/www/app
$ npm i -g forever
```

then `$ forever start app.js`

to stop your forever script `forever stop all`

### Log Files

create forever log

`sudo mkdir -p /var/log/forever`

change ownership of log directory

`sudo chown -R $USER /var/log/forever`

Start forever and log output

`$ forever start app.js >> /var/log/forever/forever.log`

### Tailing a log file

`sudo tail -f /var/log/auth.log` auth log is just people logging in and out of your server. `-f` is follow, follows everything that's happening.

Ubuntu automatically archcives your log files
