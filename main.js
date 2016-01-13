$(document).ready(function(){
  var $balance = $('#balanceRight');
  var balance = 1000.00;
  var $addTransaction = $('#transactionSubmit');
  var $transactionTemplate = $('tr#template').clone().attr('id', '').removeClass("hidden-data");
  var $description = $('#transactionDesc');
  var $date = $('#transactionDate');
  var $amount = $('#transactionAmount');
  var $mainTable = $('#mainTable')
  var $body = $('body');
  var $filterDeposits = $('#filterDeposits');
  var $filterWithrawls = $('#filterWithrawls');
  var $filterReset = $('#filterReset');
  var filtering = null;

  $filterDeposits.click(function(){
    $('.deposit').removeClass("hidden-data");
    $('.withdrawl').addClass("hidden-data");
    filtering = "d";
  });

  $filterWithrawls.click(function(){
    $('.withdrawl').removeClass("hidden-data");
    $('.deposit').addClass("hidden-data");
    filtering = "w";
  });

  $filterReset.click(function(){
    $('.withdrawl').removeClass("hidden-data");
    $('.deposit').removeClass("hidden-data");
    filtering = null;
  })


  $addTransaction.click(function(e){
    e.preventDefault();

    var canProceed = true;
    var $transaction  = $transactionTemplate.clone();
    var amount = +$amount.val();
    var date = moment($date.val());
    var description = $description.val();

    if(!amount){
      swal("Transaction amount is invalid","","error");
      canProceed = false;
    }
    else{
      amount = amount.toFixed(2);
    }
    if (canProceed) {
      if(!date.isValid()){
        swal("Date is invalid","","error");
        canProceed = false;
      }
      else if(moment().format("x") > date.format("x")){
        swal("Date is invalid", "", "error");
        canProceed = false;
      }
      else if(+amount === 0.00){
        swal("Amount cannot be 0");
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
      if(description.toLowerCase() === "100 cades") hundredCades();
      $transaction.find('.formTransaction').html(description);
      $transaction.find('.formDate').html(date.format("MM-DD-YYYY"));
      if(amount > 0){
        $transaction.find('.formDeposit').html("$"+amount);
        $transaction.addClass('deposit');
      }
      else{
        $transaction.find('.formWithdrawl').html("$"+amount);
        $transaction.addClass('withdrawl');
      }
      writeBalance(amount);
      $mainTable.append($transaction);
    }


  });

  $('#formToday').text(moment().format("MM-DD-YYYY"));

  function writeBalance(diff){
    balance += +diff;
    $balance.text("$"+balance);
  }

  function hundredCades(){
    var cades = [];
    for(var i = 0; i < 100; i++){
      var x = Math.floor(Math.random()*window.innerWidth);
      var y = Math.floor(Math.random()*window.innerHeight);
      var rot = Math.floor(Math.random()*360);
      var newCade = $('<img>').css({position: "absolute", top: y, left: x,
                              transform: "rotate("+rot+"deg)"})
                              .css("-ms-transform", "rotate("+rot+"deg)")
                              .css("-webkit-transform", "rotate("+rot+"deg)")
                              .css("z-index", "2");
      newCade.attr('src', "talkingHeadCade.gif");
      cades.push(newCade);
    }
    $body.append(cades);
  }

});
