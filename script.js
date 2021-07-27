var app = angular.module('plunker', []);

app.controller('MainCtrl', function ($scope) {

  var cleanAccount = function () {
    var account = {
      name: 'Etah innocent',
      startingBalace: 100.00,
      runningBalance: 1000000
    }
    return account;
  };

  var cleanTransaction = function () {
    var transaction = {
      type: 'Withdraw',
      amount: 0.00,
      description: ''
    }

    return transaction;
  };

  var transactions = [];



  $scope.transaction = cleanTransaction();
  $scope.account = cleanAccount();

  $scope.transactionList = transactions;

  $scope.saveTransaction = function () {
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


app.directive('moneywarn', function () {
  var staticWarningLevel = .2;

  return {
    restrict: 'A',
    scope: {
      val: '=moneywarn'
    },
    link: function (scope, element, attrs) {
      scope.$watch('val', function (newValue) {
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

document.querySelectorAll('.key')

window.pass = 1234;
window.redirectURL = './index.html';


$(document).ready(function() {
	start();
});


function start(){
	window.tries = 0;
	
	$(".key").click(function(){
		var n = $(this).html();
		$('.screen').append( n );
		window.tries++;
		updateFlasher();
		validate();
	});
}

function updateFlasher(){
	if (window.tries <=3){
		var dis = window.tries * 55;
		$('.flasher').css({
			'left' : dis + 'px'
		});
	}
	else{
		$('.flasher').css({
			'left' : '20px',
			'display' : 'none'
		});
	}
}

function validate(){
	if (window.tries >= 4){
		checkWin();
		$('.screen').html('');
		window.tries = 0;
		$('.flasher').css({
			'display' : 'block'
		});
	}
	else{
		
	}
}

function checkWin(){
	var w = $('.screen').html();
	if (w == window.pass){
		$('.success').show().delay(5000).queue(function(n) {
			$('.success').hide(); n();
		});
		var u = window.redirectURL;
		$(location).attr('href', u );
	}
	else{
		$('.error').show().delay(1000).queue(function(n) {
			$('.error').hide(); n();
		});
	}
}