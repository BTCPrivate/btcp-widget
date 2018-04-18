# BTCP Widgets
## Guide to setting up full node server

This guide enables you to setup and run your own full node server to verify and action your own widget button events. This is something you may want to do because you'd rather run your own full node for security and privacy reasons, or perhaps because you want your own custom events and functionality.

The purpose of this guide is to help you setup as efficiently as possible.

You can set up on a good Linux server you have root access to. For the purpose of illustrating all steps, we will walk you through the setup under an AWS (Amazon Web Services) account and you should have a competent technical sysops skillset or engage with a knowledgeable person/compaany to help in this regard.

## AWS setup
- Go to **EC2** control panel
- Switch to **Oregon** region
- Create new Instance from community AMI **btcp_store_demo (ami-97d7b7ef)**
  (The lowest free tier should be adequate, the of course the higher the spec the better it may perform)
- Set security group rule for **TCP 8001**
- Create instance
- Create **new SSH key pair**
 
## SSH setup & SSH in (when instance available)
- Full guides if you need them re SSH usage from Windows, Mac and Linux here:
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html

## Completing setup and running mongod
- Run functions in install_mongodb (commented out)
- `sudo chmod -R 777 /data`
- `sudo apt install mongodb-server`
- `sudo killall -15 mongod to clear port 27017`
- `mongod &`

## Sync'ing blockchain and starting Explorer (to see progress)
- Open 2nd SSH terminal instance
- `cd ~/btcp-explorer; nvm use v4; ./node_modules/bitcore-node-btcp/bin/bitcore-node start`

## Using BTCP Explorer:
- View explorer at **http://((server_ip)):8001**

## Notes
When synci'ing the blockchain, you wait until it has fully sync'd for anything to be usable. This will take a few hours and slow down at point of fork (blocks 272991 to 278457) due to exceptionally large blocks compared to others due to BTCP airdrop. This is perfectly normal and you will notice blocks take longer to process and the network hash rate appears to dropto near zero as a result (eg 2 Sol/s).
You can tell how far it is thru the process by visiting **https://explorer.btcprivate.org/** and noting the blockheight and where your setup currently is in your own sites webpage

Explorer and other public sites are found as NPM modules within btcp-explorer/node_modules eg btcp-explorer/node_modules/insight-ui-btcp is the Explorer

## Support
Should you have any issues regarding the setup as described above, please get in contact with us via your vendor account to ask for clarification on any of the above.
Please note however we can't assist managing your own custom setup or code, only advise on the above setup until you are up and running.
