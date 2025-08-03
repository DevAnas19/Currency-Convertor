let baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(select of dropDowns){
    for(curCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === "from" && curCode === "USD"){
            newOption.selected=true;
        }else if(select.name === "to" && curCode === "INR"){
            newOption.selected=true;
        }
        select.append(newOption); 
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let curCode=element.value;
    let countryCode = countryList[curCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if(amtVal<1 || amtVal===""){
        amtVal=1;
        amount.value="1";
    }

    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
})