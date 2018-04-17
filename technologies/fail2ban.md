# fail2ban

The default config file can be found in `/etc/fail2ban/fail2ban.conf`.

fail2ban-client has 2 commands for internal use:

- `fail2ban-client start` – The client sends ping requests to the server to start up
- `fail2ban-client reload` - Client will stop all jails, parse the config filfes again and send the commands to the server. Useful for loading a new config without shutting down the server.


`sudo apt-get update`
`sudo apt-get install fail2ban`

copy config file with settings commented out `awk '{ printf "# "; print; }' /etc/fail2ban/jail.conf | sudo tee /etc/fail2ban/jail.local`.

Settings you wish to override should go in this file `./etc/fail2ban/fail2ban.conf`.
