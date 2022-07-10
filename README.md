# Youtube downloader in React/NodeJS

This is a [React](https://reactjs.org/)/[NodeJS](https://nodejs.org/) app for downloading video and audio files from Youtube. 
On the back-end I've used [ExpressJS framework](http://expressjs.com/) for simple code design, and [ytdl-core module](https://github.com/fent/node-ytdl-core) to retrieve video data I need.
Front-end consists of a couple of inputs, which are divided into React components.

## Demo 
Here is a demo on [Heroku](https://www.heroku.com/): [YouTube Downloader](https://youtube-downloader-8854.herokuapp.com/)

## Try it yourself
- Clone the repository and open root folder
- Install back-end dependencies: `npm install`
- Go to Client folder and install front-end dependencies: `cd Client && npm install`
- While you're in Client folder, build the front-end: `npm run build`
- Come back to the root folder and start the server: `cd .. && npm start`
And that's it. To use the app go to http://localhost:3500 
> **Note**
> Every time you make any changes to front-end (Client folder) you should build it with npm run build. Otherwise changes won't apply.

