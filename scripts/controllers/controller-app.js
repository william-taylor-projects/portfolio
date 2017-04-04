
import GitHubActivity from '../github/github-activity.js';

export default app => {
  app.controller("AppController", ["$scope", "$http", "$location", "$rootScope", function ($scope, $http, $location, $rootScope) {
      var controller = this;

      this.showLauncher = false;
      this.popupTitle = "title";
      this.popupText = "text";
      this.showNav = true;

      $scope.$on('showPopup', function (event, args) {
          controller.popupTitle = args.title;
          controller.popupText = args.body;

          $("#myModal").modal("show");
      });

      this.setTab = function (tab, $event) {
          window.scrollTo(0, 0);
          $(".collapse").collapse("hide");
          this.showLauncher = false;
          this.activeTab = tab;

          switch (tab) {
              case 0: $location.path("/"); this.loadGithubFeed(); break;
              case 1: $location.path("projects"); this.show = false; break;
              case 2: $location.path("portfolio"); this.show = false; break;
              case 3: $location.path("university"); this.show = false; break;
              case 4: $location.path("contact"); this.show = false; break;

              default: break;
          }

          if ($event) $event.preventDefault();
          return false;
      };

      this.logout = function ($event) {
          $rootScope.login = null;
          $event.preventDefault();
          $location.path("/");

          this.showLauncher = false;
          this.showNav = true;
          this.activeTab = 0;
      }

      this.notDone = function () {
          controller.popupTitle = "Under Construction";
          controller.popupText = "This project has been marked as not yet complete. ";
          controller.popupText += "Meaning it is still a work in progress. ";
          controller.popupText += "Please check back in the coming weeks.";

          $("#myModal").modal("show");
      }

      this.toggleHub = function ($event) {
          $event.preventDefault();
          if (this.showLauncher === true) {
              this.showLauncher = false;
          } else {
              this.showLauncher = true;
          }
      }

      this.open = function (page) { $location.path(page); window.scrollTo(0, 0); }
      this.handle = function ($event) { $event.preventDefault(); }
      this.collapse = function () { $(".collapse").collapse("show"); }
      this.openGithubPage = function (link) { window.open("https://github.com/william-taylor/" + link); }
      this.loadGithubFeed = function() {
          this.hasLoaded = true;
          GitHubActivity.feed({
              eventsUrl: `${window.server_url}/github-events/`,
              userUrl: `${window.server_url}/github-user/`,
              username: "william-taylor",
              selector: "#feed",
              limit: 12,
              callback: x => x
          });
      }
  }]);
}
