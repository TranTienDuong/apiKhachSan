document.addEventListener("DOMContentLoaded", function () {
    fetch("html/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html);

    fetch("html/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html);

});
getAllPhong();

let phongData = [];

function renderCards(data) {
    const parentDiv = document.getElementById('carouselContainer');
    parentDiv.innerHTML = '';
    const uniqueRoomNames = new Set();

    data.forEach((item, index) => {

        if (uniqueRoomNames.has(item.TenPhong)) {
            return;
        }
        uniqueRoomNames.add(item.TenPhong);

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card col-5 border-bottom rounded-0 mb-4';

        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'carousel slide'
        carouselDiv.id = `roomCarousel-${index}`;

        const carouselIndicators = document.createElement('ol');
        carouselIndicators.className = 'carousel-indicators';
        carouselIndicators.style.listStyle = 'none';

        for (let i = 0; i < 5; i++) {
            const indicator = document.createElement('li');
            indicator.setAttribute('data-bs-target', '#roomCarousel');
            indicator.setAttribute('data-bs-slide-to', i);
            if (i == 0) {
                indicator.className = 'active';
            }
            carouselIndicators.appendChild(indicator);
        }

        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        for (let i = 0; i < 5; i++) {
            const carouselItem = document.createElement('div');
            carouselItem.className = i === 0 ? 'carousel-item active' : 'carousel-item';

            const img = document.createElement('img');
            img.src = item[`Anh${i + 1}`];
            img.className = 'd-block w-100';
            carouselItem.appendChild(img);

            carouselInner.appendChild(carouselItem)
        };
        const prevControl = document.createElement('a');
        prevControl.className = 'carousel-control-prev';
        prevControl.href = `#roomCarousel-${index}`;
        prevControl.setAttribute('role', 'button');
        prevControl.setAttribute('data-bs-slide', 'prev');
        prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

        const nextControl = document.createElement('a');
        nextControl.className = 'carousel-control-next';
        nextControl.href = `#roomCarousel-${index}`;
        nextControl.setAttribute('role', 'button');
        nextControl.setAttribute('data-bs-slide', 'next');
        nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

        carouselDiv.appendChild(carouselIndicators);
        carouselDiv.appendChild(carouselInner);
        carouselDiv.appendChild(prevControl);
        carouselDiv.appendChild(nextControl);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title_1 = document.createElement('h5');
        title_1.className = 'card-title';
        title_1.innerHTML = `${item.TenLoaiPhong}`;

        const title_2 = document.createElement('h2');
        title_2.className = 'card-title';
        title_2.innerHTML = `${item.TenPhong}`;

        const text_1 = document.createElement('p');
        text_1.className = 'card-text';
        text_1.innerHTML = `Loại giường: <span style="font-weight:bold">${item.LoaiGiuong}</span> |`

        const text_2 = document.createElement('p');
        text_2.className = 'card-text';
        text_2.innerHTML = `Hướng nhìn: <span style="font-weight:bold">${item.HuongNhin}</span> |`

        const text_3 = document.createElement('p');
        text_3.className = 'card-text';
        text_3.innerHTML = `Sức chứa: <span style="font-weight:bold">1~${item.SucChua} người</span> |`

        const text_4 = document.createElement('p');
        text_4.className = 'card-text';
        text_4.innerHTML = `Kích Thước: <span style="font-weight:bold">${item.DienTich} m²(bao gồm cả ban công)</span> |`

        const redirectLinks = document.createElement('a');
        redirectLinks.href = `/redirect/room/${item.MaPhong}.html`;
        redirectLinks.className = 'btn btn-secondary'
        redirectLinks.style = 'float: right; text-decoration: none';
        redirectLinks.innerText = 'Xem chi tiết >';

        cardBody.appendChild(title_1);
        cardBody.appendChild(title_2);
        cardBody.appendChild(text_1);
        cardBody.appendChild(text_2);
        cardBody.appendChild(text_3);
        cardBody.appendChild(text_4);
        cardBody.appendChild(redirectLinks);

        cardDiv.appendChild(carouselDiv);
        cardDiv.appendChild(cardBody);

        parentDiv.appendChild(cardDiv);
    });
};

function loadRoomCheckboxes() {
    const uniqueRoomNames = new Set(phongData.map(item => item.TenLoaiPhong));
    const roomCheckboxList = document.getElementById('roomCheckboxList');
    roomCheckboxList.innerHTML = '';

    uniqueRoomNames.forEach(roomTypeName => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'form-check';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.id = `roomCheckbox-${roomTypeName}`;
        checkbox.value = roomTypeName;

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = `roomCheckbox-${roomTypeName}`;
        label.innerHTML = roomTypeName;

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        roomCheckboxList.appendChild(checkboxDiv);
    });
}

function getAllPhong() {
    $.ajax({
        url: 'http://localhost:5000/phong/getall',
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data:", textStatus, errorThrown);
        },
        success: function (response) {
            phongData = response;
            renderCards(response)

            document.getElementById('openModalBtn').addEventListener('click', () => {
                $('#roomSelectModal').modal('show');
                loadRoomCheckboxes();
            });
            document.getElementById('applyRoomSelection').addEventListener('click', () => {
                const selectedRoomTypeName = [...document.querySelectorAll('#roomCheckboxList .form-check-input:checked')]
                    .map(checkbox => checkbox.value);
                const filteredData = phongData.filter(item => selectedRoomTypeName.includes(item.TenLoaiPhong));
                renderCards(filteredData);
                $('#roomSelectModal').modal('hide');
            })
        }
    });
};


