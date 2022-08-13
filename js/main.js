let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  submit = document.getElementById("submit"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  searchInb = document.getElementById("search"),
  mood = "create",
  tmp;

// get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.textContent = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "#a00d02";
    total.innerHTML = "";
  }
}

// create product
let dataPro;
if (window.localStorage.info != null) {
  dataPro = JSON.parse(window.localStorage.info);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };
  if (
    newPro.title != "" &&
    newPro.price != "" &&
    newPro.category != "" &&
    newPro.count <= 100
  ) {
    if (mood == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      submit.innerHTML = "create";
      mood = "create";
      count.style.display = "block";
    }
    clearInput();
  }

  saveLocal();
  showData();
  getTotal();
};

// save to localStorage
function saveLocal() {
  window.localStorage.setItem("info", JSON.stringify(dataPro));
}
// clear inputs
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}
// read
function showData() {
  let table = "";
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
        <td><button onclick="upd(${i})" id="update">update</button></td>
        <td><button onclick="del(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  document.getElementById("table").innerHTML = table;
  // Delete All Data
  let delAllBtn = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    delAllBtn.innerHTML = `
    <button onclick='deleteAll()'>delete all (${dataPro.length})</button>
    `;
  } else {
    delAllBtn.innerHTML = "";
  }
}
showData();

// delete one element
function del(i) {
  dataPro.splice(i, 1);
  window.localStorage.info = JSON.stringify(dataPro);
  showData();
}

// Delete All Function
function deleteAll() {
  window.localStorage.clear();
  dataPro.splice(0);
  showData();
}
// update
function upd(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";
function getSearchMood(value) {
  if (value == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchInb.placeholder = "search by " + searchMood;
  searchInb.focus();
  searchInb.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="upd(${i})" id="update">update</button></td>
        <td><button onclick="del(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="upd(${i})" id="update">update</button></td>
        <td><button onclick="del(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  }
  document.getElementById("table").innerHTML = table;
}
