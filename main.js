$(document).ready(function(){
  var $balance = $('#balance');
  var balance = 1000.00;
  var $addTransaction = $('#transactionSubmit');
  var $transactionTemplate = $('tr#template').clone().attr('id', '');
  var $description = $('#transactionDesc');
  var $date = $('#transactionDate');
  var $amount = $('#transactionAmount');
  var $mainTable = $('#mainTable')

  $addTransaction.click(function(e){
    console.log("cliky clicky");
    e.preventDefault();

    var canProceed = true;
    var $transaction  = $transactionTemplate.clone();
    var amount = +$amount.val();
    var date = moment($date.val());
    var description = $description.val();

    if(amount === 0){
      swal("Transaction amount is invalid","","error");
      canProceed = false;
    }
    else{
      amount = amount.toFixed(2);
    }
    if (canProceed) {
      console.log(date.format("x"));
      console.log(moment().format("x"));
      if(!date.isValid()){
        swal("Date is invalid","","error");
        canProceed = false;
      }
      else if(moment().format("x") > date.format("x")){
        swal("Date must not be in the past", "", "error");
        canProceed = false;
      }
      if(canProceed) {
        if(description.length <= 0){
          swal("Description is invalid","","error");
          canProceed = false;
        }
      }
    }

    if(canProceed){
      $amount.val('');
      $date.val('');
      $description.val('');
      $transaction.find('.formTransaction').html(description);
      $transaction.find('.formDate').html(date.format("MM-DD-YYYY"));
      if(amount > 1){
        $transaction.find('.formDeposit').html("$"+amount);
      }
      else{
        $transaction.find('.formWithdrawl').html("$"+amount);
      }
      writeBalance(amount);
      $mainTable.append($transaction);
    }


  });

  $('#formToday').text(moment().format("MM-DD-YYYY"));

  function writeBalance(diff){
    balance += diff;
    $balance.text("Current Balance: $"+balance);
  }


});
