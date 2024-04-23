document.addEventListener("DOMContentLoaded", function () {
    fetch("html/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html);

    fetch("html/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html);

        getAllfood();
});


function renderCards(data) {
    console.log(data);
    const foodContent = document.getElementById('foodContainer');
    data.forEach((item) => {

        const cardContainer = document.createElement('div')
        cardContainer.className = 'card col-5 mb-5';

        const cardIMG = document.createElement('img');
        cardIMG.src = `${item.Anh}`

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title_5 = document.createElement('h5');
        title_5.className = 'card-title';
        title_5.innerHTML = `${item.LoaiNhaAn}`;

        const title_2 = document.createElement('h2');
        title_2.className = 'card-title mb-3';
        title_2.innerHTML = `${item.TenNhaAn}`;
        

        const text_1 = document.createElement('p');
        text_1.className = 'card-text'
        text_1.innerHTML = `<p>Loại <span style="font-weight: bold">${item.LoaiNhaAn}</span> | Địa điểm: <span style="font-weight: bold">${item.DiaDiem}</span></p>`

        const redirectLinks = document.createElement('a');
        redirectLinks.href = `/redirect/food/${item.MaNhaAn}.html`;
        redirectLinks.style = 'float: right; text-decoration: none';
        redirectLinks.innerText = 'Xem chi tiết >';


        cardBody.appendChild(title_5);
        cardBody.appendChild(title_2);
        cardBody.appendChild(text_1);
        cardBody.appendChild(redirectLinks);

        cardContainer.appendChild(cardIMG);
        cardContainer.appendChild(cardBody);

        foodContent.appendChild(cardContainer);
    });
};

function getAllfood() {
    $.ajax({
        url: 'http://localhost:5000/nhaan/getall',
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data:", textStatus, errorThrown);
        },
        success: function (response) {
            foodData = response;
            renderCards(response)
        }
    });
};
