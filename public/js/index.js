
var jquery = require('jquery');
var angular = require('angular');

var app = require('./module');

require('./controllers');

angular.element(document).ready(function () {
    angular.bootstrap(document, [app.name]);
});