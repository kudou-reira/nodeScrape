# nodeScrape

demo here 

http://rent-japan.herokuapp.com/


Tokyo Rent Finder (Potential Issues)

I've found out that heroku automatically times out after a set time (30s). Since the backend (node.js) takes a while to scrape the data across all sites, I'll be looking into this error further.

I've implemented node.js clustering for the sake of improving the processing speed, but there may be incidents of time-outs if the job in question takes over 30 seconds. It is also dependent on the amount of cores your PC has.

For current demo purposes, please select only GaijinPot as a search parameter if you receive a timeout error (503). The current research I've come across has recommended background processing requests or false redirects, but this error might be unresolved due to the limitations of heroku's free model.

If you would like to see the full app, please clone it from the source code linked above and run it locally with 'npm run dev' from the root file.

Update: I've found out that the scraping aspect of this project may have been bottlenecked by Heroku itself. From this link (https://devcenter.heroku.com/articles/request-timeout), I see that even if I were to refresh the backend with long polling, there's a chance that the request may not be fulfilled within 55 seconds...

In order to display the functionalities of this app, I have limited the amount of data to be scraped from the Apaman portion. There should be no time out problems now.

