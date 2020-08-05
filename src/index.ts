import { numberToCurrancyString } from "./utils";

const amountEl = document.getElementById('amount') as HTMLInputElement;
const billAmountEl = document.getElementById('billAmount') as HTMLSpanElement;
const tipPercentageEl = document.getElementById('tipPercentage') as HTMLSpanElement;
const tipAmountEl = document.getElementById('tipAmount') as HTMLSpanElement;
const totalEl = document.getElementById('total') as HTMLSpanElement;

const tipButtons = document.querySelectorAll('.tipButton') as NodeListOf<HTMLButtonElement>;
let currentTip = .20;

tipButtons.forEach(b => b.addEventListener('click', handleTipChange));
console.log({ amountEl, billAmountEl, tipPercentageEl, tipAmountEl, totalEl });

amountEl.addEventListener('keyup', handleBillAmountChange);


function handleBillAmountChange() {
    let billAmount = 0;
    let tipAmount = 0;
    let total = 0;
    if (!isNaN(amountEl.valueAsNumber)) {
        billAmount = amountEl.valueAsNumber
        tipAmount = amountEl.valueAsNumber * currentTip;
        total = billAmount + tipAmount;
    }
    billAmountEl.innerText = numberToCurrancyString(billAmount);
    tipPercentageEl.innerText = (currentTip * 100).toString();
    tipAmountEl.innerText = numberToCurrancyString(tipAmount)
    totalEl.innerText = numberToCurrancyString(total);


}
function handleTipChange() {
    const that = this as HTMLButtonElement;
    currentTip = parseFloat(that.dataset.tip);
    console.log(currentTip);
    (document.querySelector('.tipButton[disabled') as HTMLButtonElement).disabled = false;
    that.disabled = true;
    handleBillAmountChange();

}