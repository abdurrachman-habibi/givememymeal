A simple website to test Azure continuous deployment with NodeJS and notification integration to Slack

Azure integration to Slack is explained more in http://www.abdurrachman-habibi.com/integrating-azure-deployment-to-azure/

This website is live on https://givememymeal.azurewebsites.net

How to setup and run on dev

1. Install NodeJS
       * https://nodejs.org/
1. Install Gulp & Bower from command line
       * npm install -g bower
       * npm install -g gulp
1. In the Repo Folder, run this from command line
       * npm install --save
       * bower install --save
1. To run on browser, run this from command line
       * gulp browser-sync
