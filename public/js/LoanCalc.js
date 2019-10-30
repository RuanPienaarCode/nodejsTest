
function resetcalc() {
    document.getElementById("loanInput").principal.value = "";
    document.getElementById("loanInput").deposit.value = "";
    document.getElementById("loanInput").term.value = "";
    document.getElementById("loanInput").rate.value = "";
    document.getElementById("loanInput").mrate.value = "";
    
    document.getElementById("cprincipal").value = "";
    document.getElementById("cdeposit").value = "";
    document.getElementById("cterm").value = "";
    document.getElementById("crate").value = "";
    document.getElementById("cmrate").value = "";
    document.getElementById("total").value = "";
    
    resetStat();

}

function resetStat() {
    document.getElementById("cprincipal").value = "";
     document.getElementById("cdeposit").value = "";
    document.getElementById("cterm").value = "";
    document.getElementById("crate").value = "";
    document.getElementById("cmrate").value = "";
    document.getElementById("total").value = "";
    document.getElementById("tableOut").innerHTML = "";
    
    

}

function validate() {
    var principal = document.getElementById('loanInput').principal.value;
    var deposit = document.getElementById("loanInput").deposit.value;
    var term = document.getElementById("loanInput").term.value;
    var rate = document.getElementById("loanInput").rate.value;
    

    if (principal <= 0 || isNaN(Number(principal))) {
        alert("Please enter valid Loan Amount");
        getElementById("loanInput").principal.value = "";
    }
    // } else if (deposit <= 0 || isNaN(Number(deposit))) {
    //     alert("Please enter valid deposit Amount");
    //     document.getElementById("loanInput").deposit.value = "";
    // } 
    else if (term <= 0 || parseInt(term) != term) {
        alert("Please enter valid term Amount");
        document.getElementById("loanInput").term.value = "";
    } else if (rate <= 0 || isNaN(Number(rate))) {
        alert("Please enter valid Interest Rate Amount");
        document.getElementById("loanInput").rate.value = "";
    }
    //  else if (mrate <= 0 || isNaN(Number(mrate))) {
    //     alert("Please enter valid Loan mrate");
    //     document.getElementById("outputTable").innerHTML = "";
// }
     else { //all inputs are valid
        alert("Validation Complete");
        console.log(principal, deposit, term, rate);
        calculate(parseFloat(principal), parseFloat(deposit), parseInt(term), parseFloat(rate));
        
    }
}

function calculate(principal, deposit, term, rate) {
    // i = rate/100;    
    var MonthlyPayble = ((rate / 100 / 12) * principal) / (1 - (Math.pow((1 + (rate / 100 / 12)), (-term * 12))));
    document.getElementById("loanInput").mrate.value = Math.round(MonthlyPayble * 100) / 100;
    var sMonthlyPayble = Math.round(MonthlyPayble * 100) / 100;
    
    
    document.getElementById("cprincipal").value = "R" + principal;
    document.getElementById("cdeposit").value = "R" + deposit;
    document.getElementById("cterm").value = "R" + term;
    document.getElementById("crate").value = "R" + rate;
    document.getElementById("cmrate").value = "R" + sMonthlyPayble;
    document.getElementById("total").value = "R" + sMonthlyPayble + deposit;


    var table = "";
    table += "<table cellpadding='21' border='2'>";
    table += "<tr>";
    table += "<td width='30'>0</td>";
    table += "<td width='60'>&nbsp;</td>";
    table += "<td width='60'>&nbsp;</td>";
    table += "<td width='60'>&nbsp;</td>";
    table += "<td width='85'>&nbsp;</td>";
    table += "<td width='70'>" + principal.toFixed(2) + "</td>";
    table += "</tr>";

    var currrent_balance = principal;
    
    var paymentCounter = 1;
    var total_interest = 0;
    sMonthlyPayble = sMonthlyPayble + deposit;

     while(currrent_balance > 0) {

        var towards_interest = ((rate / 12) * currrent_balance) / 100;
        
         //portion of monthly payment to interest
         if (sMonthlyPayble > currrent_balance){
             sMonthlyPayble = currrent_balance + towards_interest;
         }

        towards_balance = sMonthlyPayble - towards_interest;
        
        total_interest = total_interest + towards_interest;
        
        currrent_balance = currrent_balance - towards_balance;
        

        //display rows
        table += "<tr class='table_info'>";
            table += "<td>" + paymentCounter + "</td>";
            table += "<td>" + sMonthlyPayble.toFixed(2) + "</td>";
            table += "<td>" + towards_balance.toFixed(2) + "</td>";
            table += "<td>" + towards_interest.toFixed(2) + "</td>";
            table += "<td>" + total_interest.toFixed(2) + "</td>";
            table += "<td>" + currrent_balance.toFixed(2) + "</td>";
        table += "</tr>";

        paymentCounter++;
          }

    table += "</table>";
    document.getElementById("tableOut").innerHTML = table;
    
}

