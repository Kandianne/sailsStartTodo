'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap'])
todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/todo.html',
      controller: 'TodoCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }])

todoApp.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
  $scope.formData = {};
  $scope.todos = [];
  $scope.todosAmount = "";
  
  var gettingTodos = function() {
      TodoService.getTodos().then(function(response) {
      console.log(response);
      $scope.todos = response;
      $scope.todosAmount = response.length;
    })
  }
  gettingTodos();

  $scope.addTodo = function() {
    console.log($scope.formData);
    TodoService.addTodo($scope.formData).then(function(response) {
      console.log(response);
      $scope.todos.push($scope.formData)
      $scope.formData = {};
    })
    gettingTodos();
  }

  $scope.removeTodo = function(todo) {
    console.log(todo);
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1)
      console.log(response);
    })
    gettingTodos();
  }

  $scope.deleteAll = function() {
    TodoService.removeAll().then(function(response) {
      console.log(response)
      gettingTodos();
    })
  }

}])
