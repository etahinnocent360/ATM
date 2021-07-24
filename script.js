var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {

  var cleanAccount = function() {
    var account = {
      name: 'Etah innocent',
      startingBalace: 100.00,
      runningBalance: 1000000
    }
    return account;
  };
  
   var cleanTransaction = function() {
    var transaction = {
      type: 'Withdraw',
      amount: 0.00,
      description: ''
    }

    return transaction;
  };

  var transactions = [
    ];

 

  $scope.transaction = cleanTransaction();
  $scope.account = cleanAccount();

  $scope.transactionList = transactions;

  $scope.saveTransaction = function() {
    var amount = parseFloat($scope.transaction.amount);
    var num = parseFloat($scope.account.runningBalance);
    var answer = 0;
    if ($scope.transaction.type === 'Deposit') {
      answer = num + amount
    } else {
      answer = num - amount
    }
    $scope.account.runningBalance = answer;

    $scope.transaction.amount = amount;
    transactions.push($scope.transaction);
    $scope.transaction = cleanTransaction();
  };

});


app.directive('moneywarn', function() {
  var staticWarningLevel = .2;

  return {
    restrict: 'A',
    scope: {
      val: '=moneywarn'
    },
    link: function(scope, element, attrs) {
      scope.$watch('val', function(newValue) {
        var startBalance = parseInt(attrs.startbalance);
        var warningLevel = startBalance * staticWarningLevel;
        if (newValue === warningLevel) {
          element.addClass('alert-warning');
           element.removeClass('alert-danger');
        } else if (newValue < warningLevel) {
          element.addClass('alert-danger');
        } else {
          element.removeClass('alert-warning');
          element.removeClass('alert-danger');
        }

      }, true);
    }
  }

});