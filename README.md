# RSS-Video-Feed
Webapp showcasing the browsing and playback of a subset of the **CNN Video Podcast catalog**.

There are two main parts: a client feed reader and a proxy server (NodeJS) to fix the CORS issues.
The [proxy](https://github.com/davidgarsan/corsfeeder) is currently deployed in [Heroku](https://dashboard.heroku.com/).

### Web Client Architecture
Since this is a single page app, with no routing, no framework was necessary, and as well as for the sake of lightness, all the Javascript is just plain *vanilla* code.

### Deployment
Although the app can be deployed in any web server, can work just locally and standalone, just by unzipping the dist.

### Known Issues
- Firefox doesn't support the video format provided in the CNN feed. The app has been tested in latest Chrome version.
