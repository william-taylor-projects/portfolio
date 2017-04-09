
import bootstrapControllers from './controllers/controllers.js';
import bootstrap from 'bootstrap';
import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularRoute from 'angular-route';

import '../css/github/github-activity.css'
import '../css/styles/custom_styles.css';
import '../css/animate/animate.css';

const app = angular.module("portfolio", ["ngAnimate", "ngRoute"]);

bootstrapControllers(app);

window.server_url = "http://williamsamtaylor.co.uk:3004";

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", { templateUrl: "/html/home.html" });
  $routeProvider.when("/university", { controller: "UniversityController", templateUrl: "/html/university.html" });
  $routeProvider.when("/project_list", { templateUrl: "/html/projects/template.html" });
  $routeProvider.when("/portfolio", { templateUrl: "/html/portfolio.html" });
  $routeProvider.when("/projects", {  templateUrl: "/html/projects.html" });
  $routeProvider.when("/contact", { templateUrl: "/html/contact.html" });
  $routeProvider.otherwise({ redirectTo: "/" });

  if (window.history && window.history.pushState) {
    $locationProvider.html5Mode(true);
  }
});

app.directive("videoList", function ($timeout) {
  return {
    restrict: "A",
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          $(".video").click(function () {
            $.fancybox({
              'padding': 0,
              'autoScale': false,
              'transitionIn': 'none',
              'transitionOut': 'none',
              'title': this.title,
              'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
              'type': 'swf',
              'swf': {
                'wmode': 'transparent',
                'allowfullscreen': 'true'
              }
            });

            return false;
          });
        });
      }
    }
  }
});

$(document).ready(function () {
  $(".fancybox").attr('rel', 'gallery').fancybox({
    openEffect: 'fade',
    closeEffect: 'fade',
    padding: '0',
    autoSize: true,
    arrows: true,
    type: 'image',
    overlayShow: true,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });
});
