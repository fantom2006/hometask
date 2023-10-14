const titleInp = document.querySelector("#title");
      const searchInput = document.getElementById("searchInput");
      const descriptionInp = document.querySelector("#description");
      const priceInp = document.querySelector("#price");
      const form = document.querySelector(".form");
      const updateBtn = document.querySelector("#update");
      const products = document.querySelector(".products");

      let allProducts = [];

      async function getData() {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        allProducts = data;
        displayData(data);
      }

      async function displayFilteredData(filteredData) {
        products.innerHTML = "";
        filteredData.forEach((item, i) => {
            products.innerHTML += `
                <div class="product">
                    <img src='${item.image}' />
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <b>${item.price}</b>
                    <button id="${item.id}" class="btn">Edit</button>
                </div>
            `;
        });
      }

      function displayData(data) {
        data.forEach((item, i) => {
          products.innerHTML += `
            <div class="product">
              <img src='${item.image}' />
              <h2>${item.title}</h2>
              <p>${item.description}</p>
              <b>${item.price}</b>
              <button id="${item.id}" class="btn">Edit</button>
            </div>
          `;
        });
        const btns = document.querySelectorAll(".btn");
        btns.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(button.id);
            const existingItem = data?.find((item) => +item.id === +button.id);
            editProduct(existingItem);
          });
        });
        console.log(btns);
      }
      getData();

      searchInput.addEventListener("input", function(event) {
        const searchString = event.target.value.trim().toLowerCase();
        const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchString));
        displayFilteredData(filteredProducts);
      });

      function editProduct(item) {
        console.log(item);
        titleInp.value = item?.title;
        descriptionInp.value = item?.description;
        priceInp.value = item?.price;

        updateBtn.addEventListener("click", (e) => {
          e.preventDefault();
          updateProduct(item.id);
        });
      }

      function updateProduct(id) {
        const obj = {
          id: id,
          title: titleInp.value,
          price: priceInp.value,
          description: descriptionInp.value,
        };
        fetch(`http://localhost:3000/products/${id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => res.json())
          .then((json) => console.log(json));
        getData();
      }
 

