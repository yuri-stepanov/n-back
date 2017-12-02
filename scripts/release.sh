#!/bin/bash
npm i;
npm run build;
rsync -a -e 'ssh -i ~/.ssh/google' --rsync-path="sudo rsync" ./dist/* advers191@advers.me:/var/www/n-back/html
