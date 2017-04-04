
import { endpoint } from '../constants/constants.js';

export default app => {
  app.controller("ContactController", ["$scope", "$http", function ($scope, $http) {
    this.clear = function () {
      $("#form_message").val("");
      $("#form_email").val("");
      $("#form_name").val("");
    }

    this.send = function () {
      var controller = this;
      var message = $("#form_message").val();
      var email = $("#form_email").val();
      var name = $("#form_name").val();

      if (email.length > 0 && name.length > 0 && message.length > 0) {
        const jsonData = JSON.stringify({
          subject: "Question From Website",
          message: message,
          email: email,
          name: name
        });

        $http.post(`${endpoint}/send/`, jsonData).success(function (data) {
          console.log(data);
          if (data.sent === true) {
            $scope.$emit("showPopup", { title: "Email Success", body: data.msg.toString() });
            controller.clear();
          } else {
            $scope.$emit("showPopup", { title: "Email Error", body: data.msg.toString() });
          }
        }).error(function () {
          $scope.$emit("showPopup", {  title: "Sorry!",  body: "Please try again later :'(."});
        });
      } else {
        $scope.$emit("showPopup", { title: "Form Error!", body: "Please fill out all form items."});
      }
    }
  }]);
}
