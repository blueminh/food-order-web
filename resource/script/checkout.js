let btnup = document.getElementsByClassName('up')
let btndown = document.getElementsByClassName('down')
let product_price = document.getElementsByClassName('product_price')
let product_name = document.getElementsByClassName('product_name')
let price = document.getElementsByClassName('price')
let quant = document.getElementsByClassName('quantity')
let totalprice = document.getElementById('totalprice')
let submitbtn = document.getElementById('submitbtn')
const datatoSent = []




for(let i = 0; i<btndown.length;i++){
    btnup[i].addEventListener('click',()=>{
        newquant = parseInt(quant[i].textContent) + 1
        quant[i].textContent = newquant
        product_price_int = parseInt(product_price[i].textContent) 
        newprice =  product_price_int * newquant
        price[i].textContent = newprice
        totalprice.textContent = parseInt(totalprice.textContent) + product_price_int
    })

    btndown[i].addEventListener('click',()=>{
        console.log('click')

        newquant = parseInt(quant[i].textContent) - 1
        if(newquant!==-1){
            quant[i].textContent = newquant

            product_price_int = parseInt(product_price[i].textContent) 
            newprice =  product_price_int * newquant
            price[i].textContent = newprice
            totalprice.textContent = parseInt(totalprice.textContent) - product_price_int
        }

    })
    
}


function submitForm(){
    for(i = 0; i<btndown.length;i++){
        q = quant[i].textContent
        if(q!=='0'){
            datatoSent.push([product_name[i].textContent,q])
        }
    }
    datatoSent.push(totalprice.textContent)
    document.ckform.ckinput.value = datatoSent;
    console.log(document.ckform.ckinput.value)
}



