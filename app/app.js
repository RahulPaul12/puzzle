
// sidebar content


  function openSidebar() {
    document.getElementById("sidebar").style.right = "0";
  }

  function closeSidebar() {
    document.getElementById("sidebar").style.right= "-300px";
  }


  // page onload fetch data from api

  document.addEventListener('DOMContentLoaded', function()
  {
   

    fetch("api/products.json")
    .then(res=>res.json())
    .then(data=>setproducts(data));
     
    const setproducts= (products)=>{
    const row = document.getElementById('productslist');
    products.map(product=>{   
    const div = document.createElement('div');
    div.classList.add('col-lg-4');
    div.classList.add('col-xs-12');
    div.classList.add('col-sm-6');
    div.innerHTML=
                `<div class="card p-2 mx-2">
                     <img class="card-img-top" src=${product.img} alt="Card image cap">
                     <div class="card-body">
                         <h5 class="card-title">${product.name}</h5>
                         <p>${product.price}$</p>
                         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                     </div>
                     <div class="card-btn">
                         <button type="button" class="btn btn-danger w-100 mb-2" onClick="addtocart('${encodeURIComponent(JSON.stringify(product))}')" id="${product.id}">Add to Order</button>
                         <button type="button" class="btn btn-outline-danger w-100">Customize</button>
                     </div>
                </div> `;

      row.appendChild(div);
     } )}}  
  )
  const cart =[];
  let prices=[]

  //  product added to cart

  const addtocart =(product)=>{
     const cartTotal = document.getElementById('cartTotal');
     const parseproduct = JSON.parse(decodeURIComponent(product))
     cart.push(parseproduct);
     const existing =cart.find(item =>item.id === parseproduct.id)
     if(existing){
        document.getElementById(parseproduct.id).disabled = true;
     }
     cartTotal.innerText = cart.length;
     openSidebar()
    
    updateprice(parseproduct,1,parseproduct.id)
    //console.log(cart);
    showCart(parseproduct,cart)
    updatetotal(parseproduct.price)
    
  }


  let newproduct =[];

// show cart products in sidebar

  const showCart = (product,cart)=>{
      const set = document.getElementById('cartproduct')
      const li = document.createElement('li');
      li.innerHTML=`
              <div class="d-flex singlecart me-2 justify-content-center align-items-center">
                       <button class="btn text-white flex-shrink-1" onclick="deleteproduct(${product.id})">X</button>
                       <img src=${product.img} alt="">
                       <div class="d-flex justify-content-center align-items-center">
                            <button class="d-flex justify-content-around align-center"   onclick="decrement(${product.id})">-</button>
                            <input type="text" name="" id="quantity${product.id}"  value="1" min="1" readonly class="text-center " data="${encodeURIComponent(JSON.stringify(product))}">
                            <button class="d-flex justify-center align-items-center "  onclick="increment(${product.id})">+</button>
                       </div>
                       <span id="price${product.id}" id="${product.price}">${product.price}</span>$
             </div>`
      
    set.appendChild(li) 
     
  }


  

  let count=0;
  
// product uantity update

   const increment=(id)=>{
       let current = parseInt(document.getElementById(`quantity${id}`).attributes[3].textContent)
       let update = current+1
       document.getElementById(`quantity${id}`).attributes[3].textContent = update
       const parse=  document.getElementById(`quantity${id}`).attributes[7].nodeValue
       const updateparse = JSON.parse(decodeURIComponent(parse))
       updateparse.quantity = update
       document.getElementById(`price${id}`).innerText = updateprice(updateparse, update,id)
        updateprice(updateparse,update,id)
   }


  const decrement=(id)=>{
     let current = parseInt(document.getElementById(`quantity${id}`).attributes[3].textContent)
     console.log((document.getElementById(`quantity${id}`)));
     if(current>1){
        let update = current-1
        document.getElementById(`quantity${id}`).attributes[3].textContent = update
        const parse=  document.getElementById(`quantity${id}`).attributes[7].nodeValue
        const updateparse = JSON.parse(decodeURIComponent(parse))
        updateparse.quantity = update
        document.getElementById(`price${id}`).innerText = updateprice(updateparse, update, id)
         updateprice(updateparse, update, updateparse.id)
    }  
  }


//  update uantity price

  const updateprice=(data, count,id)=>{
     //let price = document.getElementById(`price${id}`).innerText
    
     const singleprice = count*(data.price)
     let total =0
     total+=singleprice
     updatetotal(data.price)
     prices[id]= singleprice
   
    return singleprice 
     
  }


  
  // update total price

const updatetotal = (price) => {
   let total = 0;
  
   prices.forEach((price) => {
    
     total += price;})
    console.log(total );
  document.getElementById('totalprice').innerText=total
  
  return total
};


// delete product and update price

  const deleteproduct=(id)=>{
     let productIndex = cart.findIndex(product => product.id == id);
     console.log(productIndex);
     if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        let productPrice = document.getElementById(`price${id}`);
        productPrice.parentElement.parentElement.remove();
        console.log(cart);
        console.log(productPrice.innerText);
        document.getElementById(id).disabled =false
        cartTotal.innerText = cart.length;
        let price = updatetotal()
        price-= parseInt(productPrice.innerText)
        document.getElementById('totalprice').innerText=price
        console.log(price);
      } 
    }

 
