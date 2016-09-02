"use strict";angular.module("weatherForeYouApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","chart.js"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("weatherForeYouApp").controller("MainCtrl",["forecastService","cityService","config","$scope","$rootScope","photoService","chartService","locationService",function(a,b,c,d,e,f,g,h){function i(){f.getPhotoUrlById(o).then(function(a){var b=n("#weather-image");b.background("unload"),b.background("load",a),b.background({source:a})})}function j(){a.getForecast(m.forecastParams,m.numForecastDays).then(function(a){m.forecastDays=a,m.chart=g.getChartOptionsFromForecast(a),m.loadingState=!1})}function k(a){m.weather=a,m.loadingState=!1}function l(){m.loadingState=!0,m.clearSearch(),m.providers=c.FORECAST.PROVIDERS,m.forecastOptions=c.FORECAST.OPTIONS,m.weather=c.WEATHER.DEFAULTS,m.forecastDays=[],m.numForecastDays=m.forecastOptions[0].value,m.chart={},m.forecastParams=c.FORECAST.DEFAULTS,o=c.CITIES.DEFAULTS.locationId,m.searchQuery=c.CITIES.DEFAULTS.name,m.location=c.CITIES.DEFAULTS.name,m.forecastParams=c.FORECAST.DEFAULTS,a.getCurrentWeather(m.forecastParams).then(function(a){k(a)}),a.getForecast(m.forecastParams,m.numForecastDays).then(function(a){m.forecastDays=a}),i(),h.getLocation()&&(o=h.getLocation(),b.getAddressById(o).then(function(a){m.searchQuery=a,m.location=a}),b.getLatAndLongById(o).then(function(a){m.forecastParams.latitude=a.latitude,m.forecastParams.longitude=a.longitude}),i())}var m=this,n=window.jQuery;e.page="forecasts";var o="";m.updateSearchResults=function(){m.searchQuery&&b.getSearchResultsFor(m.searchQuery).then(function(a){m.searchResults=a})},m.clearSearch=function(){m.searchQuery="",m.searchResults=[]},m.updateCurrentWeatherByResult=function(a){m.location=a.name,m.searchResults=[],m.searchQuery=a.name,o=a.id,b.getLatAndLongById(a.id).then(function(a){m.forecastParams.latitude=a.latitude,m.forecastParams.longitude=a.longitude}),i()},d.$watch(function(a){return m.forecastParams},function(b,c){m.loadingState=!0,a.getCurrentWeather(m.forecastParams).then(function(a){k(a)}),j()},!0),d.$watch("vm.numForecastDays",function(a,b){return a===b?null:(m.loadingState=!0,void j())}),e.$on(c.EVENTS.SET_LOCATION,function(){h.setLocation(o)}),l()}]),angular.module("weatherForeYouApp").controller("AboutCtrl",["$rootScope",function(a){a.page="about"}]),angular.module("weatherForeYouApp").service("forecastService",["config","$http",function(a,b){function c(c){return b({method:"GET",url:a.FORECAST.API_URL,params:c}).then(function(a){return a.data})["catch"](function(a){return a.message})}var d=window._;this.getCurrentWeather=function(a){return c(a).then(function(a){return a.currently})},this.getForecast=function(a,b){return b>7&&(b=7),1>b&&(b=1),c(a).then(function(a){return d.slice(a.futureForecasts,0,b)})}}]),angular.module("weatherForeYouApp").constant("config",{FORECAST:{API_URL:"http://chathamweatherapi.azurewebsites.net/api/forecast",DEFAULTS:{latitude:40.7127837,longitude:-74.0059413,source:"FORECAST_IO"},PROVIDERS:[{name:"Forecast.io",code:"FORECAST_IO"},{name:"World Weather",code:"WORLD_WEATHER"}],OPTIONS:[{value:2,name:"2 Days"},{value:4,name:"4 Days"},{value:6,name:"6 Days"}]},CITIES:{SEARCH_API_URL:"http://chathamweatherapi.azurewebsites.net/api/cities/search",ID_API_URL:"http://chathamweatherapi.azurewebsites.net/api/cities/",PHOTOS:{API_KEY:"AIzaSyD077HUyCNAttrxo-QxGVlKXhG7G05QgGg"},DEFAULTS:{name:"New York, NY, United States",locationId:"ChIJOwg_06VPwokRYv534QaPC8g"}},HUMAN_CODES:{CLOUDS:{10:"Clear Skies",20:"Partly Cloudy",30:"Cloud Cover",40:"Dense Clouds"},ICONS:{NIGHT:{10:"C",20:"I",30:"5",40:"%"},DAY:{10:"B",20:"H",30:"N",40:"Y"}}},WEATHER:{DEFAULTS:{temperature:0,apparentTemperature:0,humidity:0,date:new Date,pressure:0,cloudCover:0}},EVENTS:{SET_LOCATION:"set_location_event",LOCATION_SET:"location_set_event"}}),angular.module("weatherForeYouApp").service("cityService",["$http","config","$log",function(a,b,c){function d(d){return a({method:"GET",url:b.CITIES.SEARCH_API_URL,params:{byName:d}}).then(function(a){return a.data.error_message?void c.warn(a.data.error_message):a.data.predictions})["catch"](function(a){return a.message})}function e(d){return a({method:"GET",url:b.CITIES.ID_API_URL+d}).then(function(a){return a.error_message?void c.warn(a.error_message):a.data.result})["catch"](function(a){return a.message})}var f=window._;this.getSearchResultsFor=function(a){return d(a).then(function(a){function b(a){return{name:a.description,id:a.place_id}}return f.map(a,b)})},this.getLatAndLongById=function(a){return e(a).then(function(a){var b=a.geometry.location;return{latitude:b.lat,longitude:b.lng}})},this.getPhotosById=function(a){return e(a).then(function(a){return a.photos})},this.getAddressById=function(a){return e(a).then(function(a){return a.formatted_address})}}]),angular.module("weatherForeYouApp").service("weatherCodeService",[function(){this.getCloudLevel=function(a){return.25>=a?"10":.5>=a?"20":.75>=a?"30":"40"}}]),angular.module("weatherForeYouApp").filter("weatherSourceFilter",["config",function(a){return function(b){var c=window._;return c.find(a.FORECAST.PROVIDERS,function(a){return a.code===b}).name}}]),angular.module("weatherForeYouApp").directive("forecastCard",function(){return{templateUrl:"views/forecast-card.html",restrict:"EA",scope:{vm:"=forecast"}}}),angular.module("weatherForeYouApp").filter("weatherIconFilter",["config","weatherCodeService",function(a,b){return function(c,d){d=d||!1;var e=b.getCloudLevel(c),f=(new Date).getHours();return d===!0?a.HUMAN_CODES.ICONS.DAY[e]:f>=7&&19>=f?a.HUMAN_CODES.ICONS.DAY[e]:a.HUMAN_CODES.ICONS.NIGHT[e]}}]),angular.module("weatherForeYouApp").filter("weatherCloudsFilter",["config","weatherCodeService",function(a,b){return function(c){return a.HUMAN_CODES.CLOUDS[b.getCloudLevel(c)]}}]),angular.module("weatherForeYouApp").filter("percentFilter",function(){return function(a){return 100*a}}),angular.module("weatherForeYouApp").service("photoService",["config","cityService",function(a,b){function c(a){return b.getPhotosById(a).then(function(a){return a?a[0].photo_reference:""})}this.getPhotoUrlById=function(b){return c(b).then(function(b){return b?"https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference="+b+"&key="+a.CITIES.PHOTOS.API_KEY:"https://hd.unsplash.com/photo-1462524500090-89443873e2b4"})}}]),angular.module("weatherForeYouApp").service("chartService",["$filter",function(a){this.getChartOptionsFromForecast=function(b){var c={labels:[],series:["Highs","Lows"],data:[[],[]]};return b.forEach(function(b){c.labels.push(a("date")(b.date,"EEEE")),c.data[0].push(b.temperatureMax),c.data[1].push(b.temperatureMin)}),c}}]),angular.module("weatherForeYouApp").controller("NavCtrl",["config","$scope","$rootScope","cityService","locationService",function(a,b,c,d,e){function f(){e.getLocation()&&d.getAddressById(e.getLocation()).then(function(a){g.currentLocation=a.substring(0,20)+"..."})}var g=this;g.currentLocation="Not Set",g.triggerSetLocationEvent=function(){c.$broadcast(a.EVENTS.SET_LOCATION)},f(),c.$on(a.EVENTS.LOCATION_SET,function(){g.currentLocation="Not Set",d.getAddressById(e.getLocation()).then(function(a){g.currentLocation=a.substring(0,20)+"..."})})}]),angular.module("weatherForeYouApp").service("locationService",["$rootScope","config",function(a,b){this.setLocation=function(c){return localStorage.getItem("locationId")!==c?(localStorage.setItem("locationId",c),void a.$broadcast(b.EVENTS.LOCATION_SET)):null},this.getLocation=function(){return localStorage.getItem("locationId")?localStorage.getItem("locationId"):null}}]),angular.module("weatherForeYouApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container"> <div class="row"> <div class="col-md-8 col-xs-12 col-md-push-2"> <br><br> <div class="row"> <div class="col-md-4 col-md-push-4 col-sm-8 col-sm-push-4 text-center"> <img src="images/profile.d23385d2.jpg" alt="" class="img-responsive img-circle"> </div> </div> <br> <p class="lead text-center"> <em>Weather Fore You</em> was built by a passionate, young, hard-working, aspiring professional full-stack web developer using AngularJS. </p> <p> Nick Taylor, the devloper of this application, is a mechanical engineering graduate from the University of Delaware who has pursued a self-teaching academic career in web development for almost 10 years. Now he is looking to turn pro. His long-term learning schedule has allowed him exposure to a number of different technologies and frameworks: Ruby, Ruby on Rails, PHP, Laravel, HTML5, CSS3, JavaScript, AngularJS, Node.js, Backbone.js, among others. </p> <p> After formalizing his training through an online web application development bootcamp called The Firehose Project, Nick began seeking a career in the web development industry. This application was developed to demonstrate competency in frontend technologies. Some highlights are below: </p> <ul> <li>Real-time data-driven applciation leveraging AngularJS two-way data binding.</li> <li>Bootstrap frontend development framework for rapid interface development.</li> <li>Yeoman, Grunt, Bower, and NPM to scaffold, build, and manage application dependencies.</li> <li>HTML5 LocalStorage to set a user\'s preferred forecast location.</li> <li>Real-time search results using Chatham\'s city API (built over Google places API).</li> <li>Automatic image detection by location using Google\'s places API.</li> </ul> <br><br> </div> </div> </div><!--.container-->'),a.put("views/current-weather.html",'<div class="panel panel-primary current-weather-panel above-background"> <header class="panel-heading"> Weather Right Now </header> <div class="panel-body"> <h4 class="text-center"><strong>{{ vm.location }}</strong></h4> <div class="row"> <div class="col-xs-6 text-center"> <span class="current-temp"><strong>{{ vm.weather.temperature | number:0 }}</strong><span class="meteocon" data-icon="+"></span></span><br> </div> <div class="col-xs-6 text-center"> <span class="icon-xl meteocon" data-icon="{{ vm.weather.cloudCover|weatherIconFilter }}"></span><br> </div> </div> <div class="row"> <div class="col-xs-6 text-center"> <span class="text-uppercase text-muted">real temp</span> </div> <div class="col-xs-6 text-center"> <span class="text-uppercase text-muted">{{ vm.weather.cloudCover|weatherCloudsFilter }}</span> </div> </div> <br> <p class="lead text-center text-uppercase"> <small>{{ vm.weather.date | date:\'MMM\' }}</small><br> <strong>{{ vm.weather.date | date:\'dd\' }}</strong> </p> </div><!--.panel-body--> <ul class="list-group"> <li class="list-group-item"> Feels Like <span class="pull-right"><strong>{{ vm.weather.apparentTemperature | number:0 }}<sup>o</sup></strong></span> </li> <li class="list-group-item"> Relative Humidity <span class="pull-right"><strong>{{ vm.weather.humidity | percentFilter }}%</strong></span> </li> <li class="list-group-item"> Pressure <span class="pull-right"><strong>{{ vm.weather.pressure | number:0 }} mbar</strong></span> </li> </ul> <div class="panel-footer"> <em>Weather served from {{ vm.forecastParams.source|weatherSourceFilter }}</em> </div> <div class="loader-overlay" ng-show="vm.loadingState"></div> </div><!--.panel-->'),a.put("views/forecast-card.html",'<div class="panel panel-default forecast-card animated fadeIn"> <div class="panel-body clearfix"> <div class="row"> <div class="col-xs-3"> <span> <strong>{{ vm.date | date:\'EEE\' }}</strong><br> <small>{{ vm.date | date:\'dd\' }} {{ vm.date | date:\'MMM\' }}</small> </span> </div><!--.col-xs-2--> <div class="col-xs-6 text-center"> <span class="meteocon icon-lg" data-icon="{{ vm.cloudCover | weatherIconFilter:true }}"></span> </div><!--.col-xs-10--> <div class="col-xs-3 text-right"> <span class="forecast-card--temp"> <strong>{{ vm.temperatureMax | number:0 }}</strong>/<strong>{{ vm.temperatureMin | number:0 }}</strong> <span class="meteocon" data-icon="+"></span> </span> </div><!--.col-xs-2--> </div><!--.row--> <button class="btn btn-primary btn-sm pull-right" data-toggle="collapse" data-target="#forecast{{ vm.date }}">Toggle Details</button> </div><!--.panel-body--> <ul class="collapse list-group" id="forecast{{ vm.date }}"> <li class="list-group-item"> <strong>Feels Like High/Low</strong> <span class="pull-right"> {{ vm.apparentTemperatureMax|number:0 }}/{{ vm.apparentTemperatureMin|number:0 }} <span class="meteocon" data-icon="+"></span> </span> </li> <li class="list-group-item"> <strong>Humidity</strong> <span class="pull-right"> {{ vm.humidity|percentFilter }}% </span> </li> <li class="list-group-item"> <strong>Pressure</strong> <span class="pull-right"> {{ vm.pressure|number:0 }} mbar </span> </li> <li class="list-group-item"> <strong>Cloud Cover</strong> <span class="pull-right"> {{ vm.cloudCover|weatherCloudsFilter }} </span> </li> </ul> </div><!--.forecast-card--> <!-- TODO: enable expansion of the panel to see details about the forecast for the given day -->'),a.put("views/main.html",'<div id="weather-image"> <div class="container"> <div class="row"> <div class="col-md-8 above-background"> <div class="jumbotron"> <h1 class="meteocon" data-icon="H"></h1> <h2>Weather Fore You</h2> <p>Hot \'n\' fresh weather forecasts served up daily.</p> <!-- Forecast search bar --> <div class="row" ng-include="\'views/search-field.html\'"></div> </div><!-- .jumbotron --> </div> <!-- Current Weather Block --> <div class="col-md-4" ng-include="\'views/current-weather.html\'"></div> </div> </div><!--.container--> </div><!--#weather-image--> <div class="container"> <div class="row second-row-content"> <div class="col-md-6 above-background"> <h3>{{ vm.numForecastDays }}-Day Forecast</h3> <forecast-card ng-repeat="day in vm.forecastDays" forecast="day"></forecast-card> </div><!--.forecast-cards--> <div class="col-md-6"> <h3>See the Temps</h3> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Forecast Hi\'s and Lo\'s</h3> </div> <div class="panel-body"> <canvas id="line" class="chart chart-line" chart-data="vm.chart.data" chart-labels="vm.chart.labels"></canvas> </div> </div> </div><!--.forecast-chart--> <div class="loader-overlay" ng-show="vm.loadingState"></div> </div><!--.row--> </div><!--.container-->'),a.put("views/nav.html",'<div class="navbar navbar-default navbar-static-top" role="navigation" ng-controller="NavCtrl as vm"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/">Weather Fore You</a> </div> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <ul class="nav navbar-nav"> <li ng-class="{\'active\' : page === \'forecasts\'}"><a ng-href="#/">Forecasts</a></li> <li ng-class="{\'active\' : page === \'about\'}"><a ng-href="#/about">About</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li ng-show="page === \'forecasts\'"> <a ng-href="#/" ng-click="vm.triggerSetLocationEvent()"> <span class="glyphicon glyphicon-pushpin"></span> Make This My Default Location (Currently {{ vm.currentLocation }}) </a> </li> </ul> </div> </div> </div><!-- .navbar -->'),a.put("views/search-field.html",'<!-- inherits from MainCtrl --> <form> <div class="col-md-10 col-md-push-1 text-left"> <div class="form-group city-search-bar"> <div class="input-group input-group-lg"> <div class="input-group-btn"> <button class="btn btn-success" ng-click="vm.updateSearchResults()"><span class="glyphicon glyphicon-search"></span></button> </div> <input type="text" class="form-control input-lg" placeholder="Enter your city" ng-model="vm.searchQuery" ng-change="vm.updateSearchResults()"> <div class="input-group-btn"> <button class="btn btn-default" ng-show="vm.searchQuery" ng-click="vm.clearSearch()">&times;</button> </div> </div> <div class="list-group city-search-results"> <a ng-repeat="result in vm.searchResults" ng-href="#/" ng-click="vm.updateCurrentWeatherByResult(result)" class="list-group-item">{{ result.name }}</a> </div><!--.list-group--> </div><!--.form-group--> <div class="form-group"> <div class="row"> <div class="col-xs-6 text-center text-uppercase"> <p><small>Forecast for</small></p> </div> <div class="col-xs-6 text-center text-uppercase"> <p><small>Forecast from</small></p> </div> <div class="col-xs-6"> <select class="form-control" ng-init="vm.numForecastDays = 2" ng-model="vm.numForecastDays"> <option ng-repeat="option in vm.forecastOptions" value="{{ option.value }}">{{ option.name }}</option> </select> </div> <div class="col-xs-6"> <select class="form-control" ng-model="vm.forecastParams.source"> <option ng-repeat="provider in vm.providers" value="{{ provider.code }}">{{ provider.name }}</option> </select> </div> </div> </div> </div><!--.push-10-col--> </form><!--.form-->')}]);