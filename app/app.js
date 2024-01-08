
  function openSidebar() {
    document.getElementById("sidebar").style.right = "0";
  }

  function closeSidebar() {
    document.getElementById("sidebar").style.right= "-300px";
  }


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
    showCart(parseproduct)
  }

  const showCart = (product)=>{
    const set = document.getElementById('cartproduct')
    const li = document.createElement('li');
      li.innerHTML=`
      <div class="d-flex singlecart me-2 justify-content-center align-items-center">
        <img src=${product.img} alt="">
        <div class="d-flex justify-content-center align-items-center">
          <button class="d-flex justify-content-around align-center" id="plus">+</button>
                <input type="text" name="" id="quantity" value="1" min="1">
          <button class="d-flex justify-center align-items-center" id="minus">-</button>
          </div>
          <p>69$</p>
            </div>`
      
    set.appendChild(li) 
    plusuantity() 
  }

  const plusuantity=()=>{
    const btn = document.getElementById('plus');
    btn.addEventListener('click', function(){
       let value = document.getElementById('quantity').value;
       value = value+1;
    })
  }