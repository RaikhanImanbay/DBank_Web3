import {dbnak} from "../../declarations/dbnak";

window.addEventListener("load", async function() {
  // console.log("Finished loading");
  update();  
});

document.querySelector("form").addEventListener("submit", async function(event){
event.preventDefault();
  // console.log("Submitted");

  const button = document.getElementById("submit-btn");
  
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbnak.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0){
    await dbnak.topDown(outputAmount);
  }
  
  await dbnak.compound();

  update();
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
  // trigger.stopImmediatePropagation();

});

async function update() {
  const currentAmount = await dbnak.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
  
}
