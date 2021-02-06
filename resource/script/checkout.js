let btnup = document.getElementsByClassName('up')
let btndown = document.getElementsByClassName('down')
let product_price = document.getElementsByClassName('product_price')
let product_name = document.getElementsByClassName('product_name')
let price = document.getElementsByClassName('price')
let quant = document.getElementsByClassName('quantity')
let totalprice = document.getElementById('totalprice')
let submitbtn = document.getElementById('submitbtn')


const newquantity = [0]
const newprice = []
const newname = []
const datatoSent = [newname, newquantity]



for(let i = 0; i<btndown.length;i++){
    newquantity.push(0)
    newprice.push(parseInt(product_price[i].textContent))
    newname.push(product_name[i].textContent)
    btnup[i].addEventListener('click',()=>{
        newquantity[i+1] += 1
        quant[i].textContent = newquantity[i+1]
        price[i].textContent = newprice[i]*newquantity[i+1]
        newquantity[0] += newprice[i]
        totalprice.textContent = newquantity[0]
    })

    btndown[i].addEventListener('click',()=>{
        if(newquantity[i+1]!==0){
            newquantity[i+1] -= 1
            quant[i].textContent = newquantity[i+1]
            price[i].textContent = newprice[i]*newquantity[i+1]
            newquantity[0] -= newprice[i]
            totalprice.textContent = newquantity[0]
        }
    })
    
}


function submitForm(){
    document.ckform.ckinput.value = datatoSent;
}



