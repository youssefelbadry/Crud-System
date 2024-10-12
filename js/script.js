let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let discount = document.querySelector("#discount");
let search = document.querySelector("#search");
let deleteALL = document.querySelector("#deleteALL");
let bytitle = document.querySelector("#bytitle");
let bycategory = document.querySelector("#bycategory");
let total = document.querySelector("#total");
let create = document.querySelector("#create");
let update = document.querySelector("#category");
let deletee = document.querySelector("#delete");
let ads = document.querySelector("#ads");
let tmp;
mood = 'create'
//=================================================================
//get total
function getTotal() {
  if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value )- discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(159, 6, 6)";

  }
}

//=================================================================

//CREATE
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
create.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    ads: ads.value,
    discount: discount.value,
    taxes: taxes.value,
    category: category.value,
    count: count.value,
    total: total.innerHTML,
  };
if(mood === 'create'){
  if(newPro.count > 1){
    for(let i = 0 ; i < newPro.count ;i++){
        dataPro.push(newPro)
    }
  }else{
    dataPro.push(newPro);
  }

}else{
    dataPro[tmp] = newPro
    mood = 'create'
    create.innerHTML = "Create"
    count.style.display = "block"

}
localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  readData();
}
//=================================================================

//Clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  ads.value = '';
  discount.value = '';
  taxes.value = '';
  count.value ='';
  category.value = '';
  category.value = '';
  total.innerHTML = '';
}
//=================================================================
//READ

function readData(){
  getTotal()
let table = ""
for(let i = 0 ; i < dataPro.length ; i++){
    table +=
    `
     <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].category}</td>
       <td><button onclick=updatepro(${i}) id="update">UPDATE</button></td>
        <td><button onclick=deletepro(${i}) id="delete">DELETE</button></td>
    </tr>
    `
}
let btndeleteALL = document.querySelector(".deletediv")
document.querySelector("#tbody").innerHTML = table
if(dataPro.length > 0){
    btndeleteALL.innerHTML =
    `
    <button onclick="deleteeAll()" id="deleteALL">Delete All (${dataPro.length})</button>
    `
    }else{
        btndeleteALL.innerHTML =""
    }
}

readData()
//=================================================================
//Delete
function deletepro(i){
   dataPro.splice(i,1)
   localStorage.product = JSON.stringify(dataPro)
readData()
}
//=================================================================
//DeleteAll
function deleteeAll(){
localStorage.clear()
dataPro.splice(0)
readData()
}

//=================================================================
 //Update

function updatepro(i){
title.value = dataPro[i].title
taxes.value = dataPro[i].taxes
ads.value = dataPro[i].ads
price.value = dataPro[i].price
discount.value = dataPro[i].discount
category.value = dataPro[i].category
count.style.display = "none"
create.innerHTML = "Update"
getTotal()
mood = "update"
tmp = i
scroll({
    top : 0,
    behavior : "smooth"
}
)
}
//=================================================================
//Search
let SearchMood = 'title'
function getSearchMood(id){
    if(id == 'bytitle'){
     SearchMood = 'title'
     search.placeholder = "Search By Title"
    }else{
     SearchMood = 'category'
     search.placeholder = "Search By Category"
    }
    search.focus()
    search.value = ''
    readData()
}

function searchData(value) {
  let table = '';
  if (SearchMood == "title") {
      for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].title.includes(value.toLowerCase())) {
              table += `
              <tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updatepro(${i})" id="update">UPDATE</button></td>
                  <td><button onclick="deletepro(${i})" id="delete">DELETE</button></td>
              </tr>
              `;
          }
      }
  } else {
      for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].category.includes(value.toLowerCase())) {
              table += `
              <tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updatepro(${i})" id="update">UPDATE</button></td>
                  <td><button onclick="deletepro(${i})" id="delete">DELETE</button></td>
              </tr>
              `;
          }
      }
  }
  document.querySelector("#tbody").innerHTML = table;
}

// let title = document.getElementById("title");
// let Price = document.getElementById("Price");
// let taxes = document.getElementById("taxes");
// let ads = document.getElementById("ads");
// let discount = document.getElementById("discount");
// let Total = document.getElementById("Total");
// let count = document.getElementById("count");
// let category = document.getElementById("category");
// let submit = document.getElementById("submit");
// let search = document.getElementById("search");
// let mood = create;
// let temp;

// function getTotal() {
//   if (Price.value != "") {
//     let result = +Price.value + +taxes.value + +ads.value - +discount.value;
//     Total.innerHTML = result;
//     Total.style.background = "#040";
//   } else {
//     Total.innerHTML = "";
//     Total.style.background = "#9c0606";
//   }
// }

// Price.addEventListener("keyup", getTotal);
// taxes.addEventListener("keyup", getTotal);
// ads.addEventListener("keyup", getTotal);
// discount.addEventListener("keyup", getTotal);

// // creat product

// let dataPro;
// if (localStorage.product != null) {
//   dataPro = JSON.parse(localStorage.product);
// } else {
//   dataPro = [];
// }

// submit.onclick = function () {
//   let newPro = {
//     title: title.value.toLowerCase(),
//     Price: Price.value,
//     taxes: taxes.value,
//     ads: ads.value,
//     discount: discount.value,
//     Total: Total.innerHTML,
//     count: count.value,
//     category: category.value.toLowerCase(),
//   };

//   if (
//     Total.value != "" &&
//     Price.value != "" &&
//     category.value != "" &&
//     newPro.count < 100
//   ) {
//     if (mood === create) {
//       if (newPro.count > 1) {
//         for (let i = 0; i < newPro.count; i++) {
//           dataPro.push(newPro);
//         }
//       } else {
//         dataPro.push(newPro);
//       }
//       clearData();
//     } else {
//       dataPro[temp] = newPro;
//       mood = create;
//       submit.innerHTML = create;
//       count.style.display = block;
//     }
//   }

//   localStorage.setItem("product", JSON.stringify(dataPro));

//   clearData();

//   showData();
// };

// // clear input

// function clearData() {
//   title.value = "";
//   Price.value = "";
//   taxes.value = "";
//   ads.value = "";
//   discount.value = "";
//   Total.innerHTML = "";
//   count.value = "";
//   category.value = "";
// }

// let DataPro = JSON.parse(localStorage.getItem("product"));

// function showData() {
//   getTotal();

//   let table = "";
//   for (let i = 0; i < dataPro.length; i++) {
//     table += `
//                 <tr>
//                     <td>${i + 1}</td>
//                     <td>${dataPro[i].title}</td>
//                     <td>${dataPro[i].Price}</td>
//                     <td>${dataPro[i].taxes}</td>
//                     <td>${dataPro[i].ads}</td>
//                     <td>${dataPro[i].discount}</td>
//                     <td>${dataPro[i].Total}</td>
//                     <td>${dataPro[i].category}</td>
//                     <td><button onclick="updateData(${i})">UPDATE</button></td>
//                     <td><button onclick="deleteData(${i})">DELETE</button></td>
//                 </tr>`;
//   }

//   document.getElementById("tbody").innerHTML = table;
//   let btnDelete = document.getElementById("deleteAll");
//   if (dataPro.length > 0) {
//     btnDelete.innerHTML = (
//       <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
//     );
//   } else {
//     btnDelete.innerHTML = "";
//   }
// }

// showData();

// function deleteData(index) {
//   dataPro.splice(index, 1);
//   localStorage.setItem("product", JSON.stringify(dataPro));
//   showData();
// }

// function deleteAll() {
//   localStorage.removeItem("product");
//   dataPro = [];
//   showData();
// }

// function updateData(index) {
//   alert("Update item at index ${index}");
// }

// // update
// function updateData(i) {
//   title.value = dataPro[i].title;
//   Price.value = dataPro[i].Price;
//   taxes.value = dataPro[i].taxes;
//   ads.value = dataPro[i].ads;
//   discount.value = dataPro[i].discount;
//   count.style.display = none;
//   category.value = dataPro[i].category;
//   submit.innerHTML = `UPDATE `;
//   mood = update;
//   temp = i;
//   scroll({
//     top: 0,
//     behavior: "smooth",
//   });
//   getTotal();
// }

// //  search

// let searchMood = title;

// function getSearchMood(id) {
//   if (id == searchTitle) {
//     searchMood = title;
//   } else {
//     searchMood = category;
//   }
//   search.placeholder = `Search By ` + searchMood;
//   search.focus();
//   search.value = "";
//   showData();
// }
// function searchData(value) {
//   let table = "";

//   for (let i = 0; i < dataPro.length; i++) {
//     if (searchMood == title) {
//       if (dataPro[i].title.includes(value.toLowerCase())) {
//         table += ` 
//                 <tr>
//                 <td>${i + 1}</td>
//                 <td>${dataPro[i].title}</td>
//                 <td>${dataPro[i].Price}</td>
//                 <td>${dataPro[i].taxes}</td>
//                 <td>${dataPro[i].ads}</td>
//                 <td>${dataPro[i].discount}</td>
//                 <td>${dataPro[i].Total}</td>
//                 <td>${dataPro[i].category}</td>
//                 <td><button onclick="updateData(${i})">UPDATE</button></td>
//                 <td><button onclick="deleteData(${i})">DELETE</button></td>
//             </tr>`;
//       }
//     } else {
//       if (dataPro[i].category.includes(value.toLowerCase())) {
//         table += ` 
//             <tr>
//             <td>${i + 1}</td>
//             <td>${dataPro[i].title}</td>
//             <td>${dataPro[i].Price}</td>
//             <td>${dataPro[i].taxes}</td>
//             <td>${dataPro[i].ads}</td>
//             <td>${dataPro[i].discount}</td>
//             <td>${dataPro[i].Total}</td>
//             <td>${dataPro[i].category}</td>
//             <td><button onclick="updateData(${i})">UPDATE</button></td>
//             <td><button onclick="deleteData(${i})">DELETE</button></td>
//         </tr>`;
//       }
//     }
//     document.getElementById("tbody").innerHTML = table;
//   }
// }

// // clean data
