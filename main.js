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
  var $mainTBody = $('tbody');
  var filtering = false;

  $date.attr('min',moment().format("MM-DD-YYYY"));

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
    checkRemainingColors($target.index());
    $target.remove();
  })

  $body.on("click", "img", function(e){
    e.stopPropagation()
    $description.val('Cade clicked');
    $date.val(moment().format("YYYY-MM-DD"));
    $amount.val("1.00");
    $addTransaction.click();
    $(this).remove();
  });

  function resetFitler(){
    var $deposit = $('.deposit');
    var $withdrawl = $('.withdrawl');
    $withdrawl.addClass("visible-data");
    $deposit.addClass("visible-data");
    filtering = false;
  };

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
      else if(moment().diff(date) > 0 && date.format("MM-DD-YYYY") !== moment().format("MM-DD-YYYY")){
          swal("Date cannot be the past", "", "error");
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
      if(description.toLowerCase().includes("100") && description.toLowerCase().includes("cade")) hundredCades();
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
      $transaction.css("background-color", checkLastColor());
      if(filtering) resetFitler();
      writeBalance(amount);
      $mainTable.append($transaction);
    }
  });

  function checkLastColor(){
    if($mainTBody.children().filter('.visible-data').last().css("background-color") === "rgb(196, 214, 255)"){
      return "white";
    }
    else{
      return "rgb(196, 214, 255)";
    }
  }

  function checkRemainingColors(index){
    var $targets = $mainTBody.children();
    for(var i = index; i < $targets.length; i++){
      if(i === index){ //set next row's color to be different from previous row's for when current row is removed
        console.log("First iteration");
        if(index === 2){ //first visible data
          $targets.eq(i+1).css("background-color", "rgb(196, 214, 255)");
        }
        else{
          debugger;
          $targets.eq(i+1).css("background-color", $targets.eq(i).css("background-color"));
          debugger;
        }
        debugger;
        i++; //prevents recoloring the next element
        debugger;
      }
      else{
        debugger;
        if($targets.eq(i-1).css("background-color") === "rgb(196, 214, 255)"){
          $targets.eq(i).css("background-color", "white");
        }
        else{
          $targets.eq(i).css("background-color", "rgb(196, 214, 255)");
        }
      }
    }
  };

  $('#formToday').text(moment().format("MM-DD-YYYY"));

  function writeBalance(diff){
    balance += Number(diff) //I couldn't use Number(), parseInt(), or +|number| to convert back from .toFixed()
    $balance.text("$"+balance.toFixed(2));
  }

  function hundredCades(){
    var cades = [];
    swal("You found the hidden cades!","","success");
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
  }

});
