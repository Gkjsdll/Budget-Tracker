$(document).ready(function(){
  var $balance = $('#balanceRight');
  var balance = 1000.00;
  var $addTransaction = $('#transactionSubmit');
  var $transactionTemplate = $('tr#template').clone().attr('id', '').removeClass("hidden-data");
  var $description = $('#transactionDesc');
  var $date = $('#transactionDate');
  var $amount = $('#transactionAmount');
  var $mainTable = $('#mainTable');
  var $body = $('body');
  var $filterDeposits = $('#filterDeposits');
  var $filterWithdrawls = $('#filterWithdrawls');
  var $filterReset = $('#filterReset');
  var filtering = false;
  var cades = 0;
  var autoClick = false;

  $filterDeposits.click(function(){
    var $deposit = $('.deposit');
    var $withdrawl = $('.withdrawl');
    $withdrawl.removeClass("visible-data");
    $deposit.addClass("visible-data");
    filtering = true;
  });

  $filterWithdrawls.click(function(){
    var $deposit = $('.deposit');
    var $withdrawl = $('.withdrawl');
    $deposit.removeClass("visible-data");
    $withdrawl.addClass("visible-data");
    filtering = true;
  });

  $filterReset.click(resetFitler);

  $body.on('dragstart', "img", function(e) {
    e.preventDefault();
  });

  $mainTable.on("click", "button", function(e){
    var $target = $(this).closest('tr');
    writeBalance(-1*$target.data('value'));
    $target.remove();
  })

  $body.on("click", "img", function(){
    $description.val('Cade clicked');
    $date.val(moment().format("MM-DD-YYYY"));
    $amount.val("1.00");
    autoClick = true;
    $addTransaction.click();
    $(this).remove();
    cades--;
    autoClick = false;
  });

  function resetFitler(){
    var $deposit = $('.deposit');
    var $withdrawl = $('.withdrawl');
    $withdrawl.addClass("visible-data");
    $deposit.addClass("visible-data");
    filtering = false;
  };

  function checkRowColors(){

  }

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
    console.log(moment().format("MM-DD-YYYY"));
    console.log(date.format("MM-DD-YYYY"));
    if (canProceed) {
      if(!date.isValid() && !autoClick){
        swal("Date is invalid","","error");
        canProceed = false;
      }
      else if(moment().diff(date) > 0 && !autoClick){
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
        $transaction.find('.formDeposit').css("color", "#00B100");
        $transaction.addClass('deposit visible-data');
      }
      else{
        $transaction.find('.formWithdrawl').html("$"+amount);
        $transaction.find('.formWithdrawl').css("color", "red");
        $transaction.addClass('withdrawl visible-data');
      }
      $transaction.data('value', Number(amount));
      if(filtering) resetFitler();
      writeBalance(amount);
      $mainTable.append($transaction);
    }
  });

  $('#formToday').text(moment().format("MM-DD-YYYY"));

  function writeBalance(diff){
    balance += Number(diff) //I couldn't use Number(), parseInt(), or +|number| to convert back from .toFixed()
    $balance.text("$"+balance.toFixed(2));
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
                              .css("z-index", "2")
                              .addClass("no-select");
      newCade.attr('src', "talkingHeadCade.gif");
      cades.push(newCade);
    }
    $body.append(cades);
    cades += 100;
  }

});
