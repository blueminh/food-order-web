let addBtn = document.getElementsByClassName('add_btn')
let order_list = document.getElementsByClassName('orders')
let product_name = document.getElementsByClassName('product_name')
const datatoSent = []
localStorage.setItem('orderlist','')



for(let i = 0;i<addBtn.length;i++){
    addBtn[i].addEventListener('click', ()=>{
        let prdname = product_name[i].textContent
        let old = localStorage.getItem('orderlist');
        newOrder = ''
        if(addBtn[i].textContent==="Add to cart"){
            addBtn[i].textContent = "Remove "
            if(old===''){
                newOrder = old + prdname
            } else{
                newOrder = old + ', ' + prdname
            }
            datatoSent.push(i)
            console.log(datatoSent)
        } else{
            addBtn[i].textContent = "Add to cart"
            if(old===prdname){
                newOrder = old.replace(prdname,'')
            } else {
                newOrder = old.replace(', '+prdname,'')
            }
            let index = datatoSent.indexOf(i)
            datatoSent.splice(index,1)
            console.log(datatoSent)
        }
        order_list[0].textContent = newOrder
        localStorage.setItem('orderlist',newOrder)
    })
}

function submitForm(){

    document.ckform.ckinput.value = datatoSent;
    console.log(document.ckform.ckinput.value)
}

