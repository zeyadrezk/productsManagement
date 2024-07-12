//get total
//create product
//save to local storage
//clear inputs

//read
//count products
//delete product or products
//update
//search
//validation // clean data

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

//get total
function getTotal() {
    if (price.value != '') {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//create
let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: +total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(title.value != '' && price.value != '' && category.value != '' && count.value <= 100){
        if (mood == 'create') {
            if (newPro.count > 1) {
                for (i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else if (mood == 'update') {
            dataPro[temp] = newPro;
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            mood = 'create';

        }
        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    showData()
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = '#a00d02';
}


//read

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                        <tr>
                    <td>${i + 1}</td>
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
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()" >Delete All (${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
    getTotal();
}

showData();

//delete row
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//delete all
function deleteAll() {
    localStorage.removeItem('product');
    dataPro.splice(0);
    showData();
}

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    total.style.background = '#040';
    submit.innerHTML = 'Update';
    count.style.display = 'none';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}


//search
let searchMood = 'title';
let search = document.getElementById('search');

function getSearchMood(value) {
    searchMood = value;
    search.placeholder = 'search by ' + value;
    search.focus();
    search.value = '';
}

function searchData(value) {
    let oldData = dataPro ;
    if (searchMood == 'title') {

        let searchData = dataPro.filter(function (item) {
            return item.title.toLowerCase().includes(value.toLowerCase());
        });
        dataPro=searchData;
        showData();
        dataPro=oldData;

    } else {
        let searchData = dataPro.filter(function (item) {
            return item.category.toLowerCase().includes(value.toLowerCase());
        });
        dataPro=searchData;
        showData();
        dataPro=oldData;
    }
}
