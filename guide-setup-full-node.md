# BTCP Widgets
## Guide to setting up full node server

This guide enables you to setup and run your own full node server to verify and action your own widget button events. This is something you may want to do because you'd rather run your own full node for security and privacy reasons, or perhaps because you want your own custom events and functionality.

The purpose of this guide is to help you setup as efficiently as possible.

You can set up on a good Linux server you have root access to. For the purpose of illustrating all steps, we will walk you through the setup under an AWS (Amazon Web Services) account and you should have a competent technical sysops skillset or engage with a knowledgeable person/compaany to help in this regard.

## AWS setup
- Go to **EC2** control panel
- Switch to **Oregon** region
- Create new Instance from community AMI **BTCP-Store (ami-62e3881a)**
  (The lowest free tier should be adequate, but of course the higher the spec the better it may perform)
- Set security group rule for **TCP 8001**
- Create instance
- Create **new SSH key pair**
 
## SSH setup & SSH in (when instance available)
- Full guides if you need them re SSH usage from Windows, Mac and Linux here:
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html

## Sync'ing blockchain and starting Explorer (to see progress)
- The server comes with most of the blockchain ready downloaded for you, so just need to start the service to sync up to current blockheight and continually check for new transactions:
- `cd ~/btcp-explorer; nvm use v4; ./node_modules/bitcore-node-btcp/bin/bitcore-node start`

## Using BTCP Explorer:
- View explorer at **http://((server_ip)):8001**

## Setting up via other platforms (eg Digital Ocean, Google Cloud, own Linux server etc):
- https://github.com/BTCPrivate/bitcore-install contains shell scripts to setup everything you need and the AWS community AMI instance is an exact replica of what you'll get if you run btcp_store_demo.sh, ready made for speed and convinience. So you should be able to use this script to setup all you need on any other suitable provider, or your own server.


## Notes on running btcp_store_demo.sh
During the running of this, it will ask if you want a fast or slow setup. If you choose fast, it will obtain a reasonably up to to date blockchain data from our repo. If you'd rather rebuild from scratch, choose slow. If you choose slow, to sync the blockchain will likely take a few hours and slow down significantly around the point of fork (blocks 272991 to 278457) due to exceptionally large blocks compared to others due to BTCP airdrop. This is perfectly normal and you will notice that the blocks take longer to process and the network hash rate appears to dropto near zero as a result (eg 2 Sol/s).

## Dir structure
There will be a couple of dirs in your home dir, an explanation of each is as follows:

**BitcoinPrivate** - is a copy of our repo at https://github.com/BTCPrivate/BitcoinPrivate
**btcp_explorer** - is the BTCP Explorer that is installed and the store demo files within btcp-explorer/node_modules/store-demo

## Support
Should you have any issues regarding the setup as described above, please get in contact with us via your vendor account to ask for clarification on any of the above.
Please note however we can't assist managing your own custom setup or code, only advise on the above setup until you are up and running.

## Disclaimer
We provide any pre-made server setups via an AMI and shell scripts mentioned for your usage and convinience, free of charge. Whilst we encourage only our solutions rather than any 3rd party implementations, we cannot take any responsibility for the setup, running, ownership, cost or legal responsibility in any way. This information and anything we provide above is for your benefit and ultimately we cannot be held responsible for anything you run.
