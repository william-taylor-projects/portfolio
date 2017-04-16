
const modules = {
  "header": {
    "title": "Video will be coming soon",
    "img": "images/university/header.jpg",
    "vid": "images/university/header.jpg"
  },

  "grades": [
    { "class": "success", "year": "Year 3", "grade": "A", "name": "Games Technology Project" },
    { "class": "success", "year": "Year 3", "grade": "A", "name": "Computer Games AI" },
    { "class": "success", "year": "Year 3", "grade": "A", "name": "Mobile Games Development" },
    { "class": "success", "year": "Year 3", "grade": "A", "name": "Advanced Games Programming" },
    { "class": "success", "year": "Year 3", "grade": "A", "name": "Algorithms & Collections" },
    { "class": "success", "year": "Year 3", "grade": "A", "name": "Game Design & Plan" },
    { "class": "success", "year": "Year 2", "grade": "A", "name": "Real Time 3D Graphics" },
    { "class": "success", "year": "Year 2", "grade": "A", "name": "Computing Project" },
    { "class": "warning", "year": "Year 2", "grade": "B1", "name": "Interactive Physics" },
    { "class": "success", "year": "Year 2", "grade": "A", "name": "Game Engine Design" },
    { "class": "success", "year": "Year 2", "grade": "A", "name": "Structure & Algorithms" },
    { "class": "success", "year": "Year 2", "grade": "A", "name": "Computer Games Design" },
    { "class": "success", "year": "Year 1", "grade": "A", "name": "Intro to Games Development" },
    { "class": "success", "year": "Year 1", "grade": "A", "name": "Mathematics of Space & Change" },
    { "class": "success", "year": "Year 1", "grade": "A", "name": "2D Graphics Programming" },
    { "class": "warning", "year": "Year 1", "grade": "B1", "name": "Introduction to Programming" },
    { "class": "warning", "year": "Year 1", "grade": "B1", "name": "Creative Computing Profession" },
    { "class": "warning", "year": "Year 1", "grade": "B1", "name": "Computing Systems" }
  ],

  "modules": [
    {
      "img": "images/university/agp1.jpg",
      "vid": "https://www.youtube.com/watch?v=5cJGLmhiGaI&amp;autoplay=1"
    },
    {
      "img": "images/university/agp2.jpg",
      "vid": "https://www.youtube.com/watch?v=gNpYTDbYrNY&amp;autoplay=1"
    },
    {
      "img": "images/university/mgd.jpg",
      "vid": "https://www.youtube.com/watch?v=I3MpAO1S404&amp;autoplay=1"
    },
    {
      "img": "images/university/gameEngineDesign.jpg",
      "vid": "https://www.youtube.com/watch?v=RgzjkQYBiLc&amp;autoplay=1"
    },
    {
      "img": "images/university/physics.jpg",
      "vid": "https://www.youtube.com/watch?v=QqrUzBNtuhg&amp;autoplay=1"
    },
    {
      "img": "images/university/graphics2D.jpg",
      "vid": "https://www.youtube.com/watch?v=t2nBbGCYOHQ&amp;autoplay=1"
    },
    {
      "img": "images/university/realtime3D.jpg",
      "vid": "https://www.youtube.com/watch?v=W81Bm0vSwzk&amp;autoplay=1"
    },
    {
      "img": "images/university/silence.jpg",
      "vid": "https://www.youtube.com/watch?v=i7Sdmwz8cEE&amp;autoplay=1"
    }
  ]
};

export default app => {
  app.controller("UniversityController", ["$scope", "$http", function ($scope, $http) {
    $scope.uni = modules;
  }]);
}
