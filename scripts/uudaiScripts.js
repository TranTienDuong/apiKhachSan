document.addEventListener("DOMContentLoaded", function () {
    fetch("html/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html);

    fetch("html/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html);

        getAllUuDai();
});


function renderCards(data) {
    console.log(data);
    const uudaiContent = document.getElementById('uudaiContainer');
    if (!uudaiContent) {
        console.error("Element with ID 'uudaiContent' not found.");
        return; // If the element doesn't exist, exit the function to avoid errors.
    }
    data.forEach((item) => {

        const cardContainer = document.createElement('div')
        cardContainer.className = 'card col-5';

        const cardIMG = document.createElement('img');
        cardIMG.src = `${item.Anh}`

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title_2 = document.createElement('h2');
        title_2.className = 'card-title';
        title_2.innerHTML = `${item.TenUuDai}`;

        const title_4 = document.createElement('p');
        title_4.className = 'card-title mb-4';
        title_4.innerHTML = `${item.MoTa}`;

        const text_1 = document.createElement('p');
        text_1.className = 'card-text'
        text_1.innerHTML = `<p><span style="font-weight: bold">Ở lại: </span>${item.NgayKetThuc}</p>`

        const text_2 = document.createElement('p');
        text_2.className = 'card-text'
        text_2.innerHTML = `<p><span style="font-weight: bold">Đặt phòng: </span>${item.NgayBatDau}</p>`
        
        const redirectLinks = document.createElement('a');
        redirectLinks.href = `/redirect/uudai/${item.MaUuDai}.html`;
        redirectLinks.className = 'btn btn-secondary'
        redirectLinks.style = 'text-decoration: none';
        redirectLinks.innerText = 'Xem chi tiết >';

        const hr = document.createElement('hr');

        const text_3 = document.createElement('p');
        text_3.className = 'card-text'
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0, // Vietnamese đồng typically does not use fractions
          });
          const formattedGia = formatter.format(item.Gia);
        text_3.innerHTML = `<p style="font-weight: bold; float: right">From <span style="font-size: 30px">${formattedGia}</span></p>`

        cardBody.appendChild(title_2);
        cardBody.appendChild(title_4);
        cardBody.appendChild(text_1);
        cardBody.appendChild(text_2);
        cardBody.appendChild(redirectLinks)
        cardBody.appendChild(hr);
        cardBody.appendChild(text_3);

        cardContainer.appendChild(cardIMG);
        cardContainer.appendChild(cardBody);

        uudaiContent.appendChild(cardContainer);
    });
};

function getAllUuDai() {
    $.ajax({
        url: 'http://localhost:5000/uudai/getall',
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data:", textStatus, errorThrown);
        },
        success: function (response) {
            uudaiData = response;
            renderCards(response)
        }
    });
};
