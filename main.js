$(document).ready(function(){
  var $balance = $('#balance');
  var balance = 1000.00;
  var $addTransaction = $('#transactionSubmit');
  var $transactionTemplate = $('tr#template').clone().attr('id', '');
  var $description = $('#transactionDesc');
  var $date = $('#transactionDate');
  var $amount = $('#transactionAmount');

  $addTransaction.click(function(e){
    e.preventDefault();

    var canProceed = true;
    var $transaction  = $transactionTemplate.clone();
    var amount = +$amount.val();
    var date = $date.val();
    var description = $description.val();

    if(amount === 0){
      swal("Transaction amount is invalid","","error");
      canProceed = false;
    }
    else{
      amount = amount.toFixed(2);
    }
    if (canProceed) {
      console.log(moment(date, "MM-DD-YYYY"));
      if(checkDateFormat(date)){
        swal("Date is invalid","","error");
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
      console.log($transaction.children());
    }


  });

  $('#formToday').text(moment("MM-DD-YYYY"));

  function writeBalance(){
    $balance.text("Current Balance: $"+balance);
  }

  function addTransaction(){

  }

});
