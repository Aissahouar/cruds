let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let title = document.getElementById('title');
let text = document.getElementById('text');
let mod = 'create';
let tmp = 0;

// get total
function getTotal(){
if(price.value != '')
{
    let result = (+price.value + +taxes.value + +ads.value )- +discount.value;
    total.innerHTML = result;
    total.style.background = 'green';
}else{
    total.innerHTML = '';
    total.style.background = 'rgb(137, 0, 0)';
}
}

//create product
let dataPro ;
if(localStorage.product != null){
   dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

 submit.onclick = function(){
   // total.style.background = 'rgb(137, 0, 0)';
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    // count
    if(title.value != '' && category.value != '' && price.value != '' && newPro.count<120){
        if(mod === 'create'){
            if(newPro.count >1 ){
                for(let i = 0 ;i<newPro.count;i++){
                    dataPro.push(newPro);
                    clearData();
                }
            }else{
                dataPro.push(newPro);
                clearData();
            }
        }else{
            dataPro[tmp] = newPro;
            mod = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        } 
    }
   
    // save data on localstorge
    localStorage.setItem('product',JSON.stringify(dataPro));
    
    showData();
 }
 

 // clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i< dataPro.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    if(dataPro.length>0){
        document.getElementById('deleteAll').classList.remove('display');
        document.getElementById('numP').innerHTML = `(${dataPro.length})`;
    }else{
        document.getElementById('deleteAll').classList.add('display');
    }
}
showData();
//delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


// delete all

function deleteAll(){
 dataPro.splice(0,dataPro.length);
   localStorage.product = JSON.stringify(dataPro);
  // localStorage.clear();
  // dataPro = localStorage.product;
    showData();
}
// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mod = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
// search

let search = 'Title';
function getSearchMod(id){
         text.placeholder = 'Search By Title';
        if(id == 'btnByTitle'){
            search = 'title';
           // text.placeholder = 'Search By Title';
            //text.style.transform = 'scale(1.1)';
        }else{
            search = 'Gategory';
          //  text.placeholder = 'Search By Gategory';
            //text.style.transform = 'scale(1.1)';
        }
        text.placeholder = "Search By " + search;
         text.focus();
         text.value = '';
         showData();
}

function SearchData(value){
    let table ='';
  
    for(let i = 0 ; i<dataPro.length;i++){
        if(search == 'title'){
        if(dataPro[i].title.includes(value.toLowerCase())){

            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
            `
        }
    }
    
  else{
        if(dataPro[i].category.includes(value.toLowerCase())){

            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
            `
        }
  }
}
document.getElementById('tbody').innerHTML = table;
}
// clean data


