# weather-app

## Project setup - Inside project folder (must have node installed)
```
npm install
```

### Compiles and hot-reloads for development - Run the app in local
```
npm run serve
```

### Compiles and minifies for production - Build Artifacts to be deployed
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### About the App
...
The website features a Signup / Login Option.
The Forms have basic validations. This allows users to save Locations with help of toggle button(shown only when logged in).
On toggling OFF, it deletes the location.
User can also delete from Locations page.
Search can be done from Home page and suggestions are given after typing 3 or more characters.
Selecting them will fetch the weather.
On top of search bar, is button to fetch current location of the device.
This is saved and will be shown in future when website is opened.
When current locaiton is shown, the button changed to update current location.
App uses Geolocation API to fetch current location, OpenWeather API to fetch the location's weather, Vuex for session management.
The app uses Responsive design which makes is compatible in mobile devices as well.
App is built using Visual Studio Code for mainly 2 reasons - It is User friendly & I have been using it for 2 years now developing simple HTML/CSS as well as Angular/Vue websites. It has easy options for integrating with plugins needed by me.
App source code is hoster in Github - https://github.com/akashmandal2/vue-weather-app


Note: I have a Client imaged latop, therefore, firebase apis seems to be blocked by our Client's firewall. I tried a simple firebase code in my personal laptop, and it was working fine there. I have used firebase before to make Angular apps, but from my personal laptop. 
For this, I have used "localStorage" instead for storing DB Data.
...
