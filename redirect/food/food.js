function getFileName() {
    const path = window.location.pathname; // Get the full path
    const fileName = path.substring(path.lastIndexOf('/') + 1); // Extract file name from path
    return fileName;
}

function fetchFoodData() {
    const fileName = getFileName(); // Get the current file name
    const foodID = fileName.match(/\d+/)[0]; // Extract the numeric ID from the file name

    // Fetch the corresponding data using the extracted ID
    return $.ajax({
        url: `http://localhost:5000/nhaan/getbyid/${foodID}`, // Use the room ID in the URL
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching room data:", textStatus, errorThrown);
        },
        success: function (response) {
            console.log("AJAX response:", response);
            try {
                renderFoodInfo(response);
            } catch (e) {
                console.error("Error rendering food info:", e);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchFoodData(); // Fetch the data based on the current file name
});



function renderFoodInfo(data) {
    const foodContainer = document.getElementById('foodContainer');
    data.forEach((item) => {
        const name = document.getElementById('redirectName');
        name.innerHTML = `${item.TenNhaAn}`

        const restaurantType = document.createElement('h5');
        restaurantType.className = 'text-center mb-3';
        restaurantType.innerHTML = `${item.LoaiNhaAn}`;

        const restaurantName = document.createElement('h1');
        restaurantName.className = 'text-center mb-3';
        restaurantName.innerHTML = `${item.TenNhaAn}`;

        const restaurantIMG = document.createElement('img');
        restaurantIMG.src = `${item.Anh}`;
        restaurantIMG.style = 'width: 100%; height: 800px';

        const infoTongQuanDiv = document.createElement('div');
        infoTongQuanDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoTongQuanDiv.style = 'font-size: 18px';

        const tongquanveanuong_title = document.createElement('div');
        tongquanveanuong_title.className = 'col-3';
        tongquanveanuong_title.innerHTML = '<h2>Tổng quan về ăn uống</h2>';

        const tongquanveanuong_title_info = document.createElement('div');
        tongquanveanuong_title_info.className = 'd-flex row col-9 '

        const Loai = document.createElement('div')
        Loai.className = 'col-4';
        Loai.innerHTML = `<p><span style="font-weight: bold">Loại: </span> ${item.LoaiNhaAn}</p>`

        const DiaDiem = document.createElement('div')
        DiaDiem.className = 'col-4';
        DiaDiem.innerHTML = `<p><span style="font-weight: bold">Địa điểm: </span>${item.DiaDiem}</p>`

        const ChoNgoi = document.createElement('div')
        ChoNgoi.className = 'col-4';
        ChoNgoi.innerHTML = `<p><span style="font-weight: bold">Chỗ ngồi: </span> ${item.ChoNgoi}</p>`

        tongquanveanuong_title_info.appendChild(Loai);
        tongquanveanuong_title_info.appendChild(DiaDiem);
        tongquanveanuong_title_info.appendChild(ChoNgoi);

        infoTongQuanDiv.appendChild(tongquanveanuong_title);
        infoTongQuanDiv.appendChild(tongquanveanuong_title_info);

        const infoGioSuDungDiv = document.createElement('div');
        infoGioSuDungDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoGioSuDungDiv.style = 'font-size: 18px';

        const giosudung_title = document.createElement('div');
        giosudung_title.className = 'col-3';
        giosudung_title.innerHTML = '<h2>Giờ sử dụng</h2>';

        const giosudung_title_info = document.createElement('div');
        giosudung_title_info.className = 'd-flex row col-9 '

        const gioSuDung = document.createElement('div')
        gioSuDung.className = 'col-9';
        
        const chiTietText1 = `${item.GioSuDung}`
        const chiTietItems1 = chiTietText1.split('/');
        const ul2 = document.createElement('ul');
        ul2.className = 'col-9';
        chiTietItems1.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.trim(); // Trim to remove any extra spaces
            li.className = 'mt-3'
            ul2.appendChild(li);
        });

        giosudung_title_info.appendChild(ul2);

        infoGioSuDungDiv.appendChild(giosudung_title);
        infoGioSuDungDiv.appendChild(giosudung_title_info);

        const infoChiTietDiv = document.createElement('div');
        infoChiTietDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoChiTietDiv.style = 'font-size: 18px';

        const chitiet_title = document.createElement('div');
        chitiet_title.className = 'col-3';
        chitiet_title.innerHTML = '<h2>Chi tiết</h2>';

        const chitiet_title_info = document.createElement('div');
        chitiet_title_info.className = 'd-flex row col-9 '

        chiTietText = `${item.ChiTiet}`;
        const chiTietItems = chiTietText.split('/');
        const ul = document.createElement('ul');
        ul.className = 'col-9';
        chiTietItems.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.trim(); // Trim to remove any extra spaces
            li.className = 'mt-3'
            ul.appendChild(li);
        });

        chitiet_title_info.appendChild(ul);

        infoChiTietDiv.appendChild(chitiet_title);
        infoChiTietDiv.appendChild(chitiet_title_info);

        const infoLienHeDiv = document.createElement('div');
        infoLienHeDiv.className = 'container row mx-auto mt-5 mb-5 border bg-secondary text-white'
        infoLienHeDiv.style = 'font-size: 18px';

        const lienhe_title = document.createElement('div');
        lienhe_title.className = 'col-3 p-2';
        lienhe_title.innerHTML = '<h2>Liên Hệ</h2>';

        const lienhe_title_info = document.createElement('div');
        lienhe_title_info.className = 'col-9 p-2'

        const ul1 = document.createElement('ul')
        ul1.style = 'list-style: none'
        const li1 = document.createElement('li');
        li1.innerHTML = '<p><span style="font-weight:bold">TEL</span> +84-24-3333-9000</p>';
        const li2 = document.createElement('li');
        li2.innerHTML = '<p><span style="font-weight:bold">E-Mail</span>rsv.L7westlake@lottehotel.com</p>';;

        ul1.appendChild(li1);
        ul1.appendChild(li2);

        lienhe_title_info.appendChild(ul1);

        infoLienHeDiv.appendChild(lienhe_title);
        infoLienHeDiv.appendChild(lienhe_title_info);

        foodContainer.appendChild(restaurantType);
        foodContainer.appendChild(restaurantName);
        foodContainer.appendChild(restaurantIMG);
        foodContainer.append(infoTongQuanDiv);
        foodContainer.append(infoGioSuDungDiv);
        foodContainer.append(infoChiTietDiv);
        foodContainer.append(infoLienHeDiv);
    });
}