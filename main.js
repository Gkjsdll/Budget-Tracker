$(document).ready(function(){
  var $balance = $('#balance');
  var balance = 1000.00;
  var $addTransaction = $('#transactionSubmit');

  $addTransaction.click(function(e){
    e.preventDefault();
  });

  function writeBalance(){
    $balance.text("Current Balance: $"+balance);
  }

});
