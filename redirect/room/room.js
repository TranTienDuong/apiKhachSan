function getFileName() {
    const path = window.location.pathname; // Get the full path
    const fileName = path.substring(path.lastIndexOf('/') + 1); // Extract file name from path
    return fileName;
}

function fetchRoomData() {
    const fileName = getFileName(); // Get the current file name
    const roomID = fileName.match(/\d+/)[0]; // Extract the numeric ID from the file name

    // Fetch the corresponding data using the extracted ID
    return $.ajax({
        url: `http://localhost:5000/phong/getbymp/${roomID}`, // Use the room ID in the URL
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching room data:", textStatus, errorThrown);
        },
        success: function (response) {
            renderRoomInfo(response); // Render the fetched data
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchRoomData(); // Fetch the data based on the current file name
});


function renderRoomInfo(data) {
    const roomInfoContainer = document.getElementById('roomInfoContainer');
    
    data.forEach((item, index) => {
        const roomName = document.getElementById('roomName');
        roomName.innerHTML = `${item.TenPhong}`;

        const title_h1 = document.createElement('h1');
        title_h1.className = 'text-center mt-4 mb-5';
        title_h1.innerHTML = `${item.TenPhong}`;

        const descripton_p = document.createElement('p');
        descripton_p.className = 'text-center mt-4 mb-5 container';
        descripton_p.innerHTML = innerHTML = `${item.MoTa}`

        const hr = document.createElement('hr');
        hr.className = 'container';

        const infoTongQuanDiv = document.createElement('div');
        infoTongQuanDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoTongQuanDiv.style = 'font-size: 18px';

        const tongquanvephong_title = document.createElement('div');
        tongquanvephong_title.className = 'col-3';
        tongquanvephong_title.innerHTML = '<h2>Tổng quan về phòng</h2>';

        const tongquanvephong_title_info = document.createElement('div');
        tongquanvephong_title_info.className = 'd-flex row col-9 '

        const LoaiGiuong = document.createElement('div')
        LoaiGiuong.className = 'col-4';
        LoaiGiuong.innerHTML = `<p><span style="font-weight: bold">Loại giường: </span> ${item.LoaiGiuong}</p>`

        const SucChua = document.createElement('div')
        SucChua.className = 'col-4';
        SucChua.innerHTML = `<p><span style="font-weight: bold">Sức Chứa: </span> 1~${item.SucChua} người</p>`

        const HuongNhin = document.createElement('div')
        HuongNhin.className = 'col-4';
        HuongNhin.innerHTML = `<p><span style="font-weight: bold">Hướng nhìn: </span> ${item.HuongNhin}</p>`

        const DienTich = document.createElement('div')
        DienTich.className = 'col-4';
        DienTich.innerHTML = `<p><span style="font-weight: bold">Kích thước phòng: </span> ${item.DienTich} m²(bao gồm cả ban công)</p>`

        const NhanTraPhong = document.createElement('div')
        NhanTraPhong.className = 'col-4';
        NhanTraPhong.innerHTML = `<p><span style="font-weight: bold">Nhận phòng / Trả phòng: </span> ${item.ThoiGianNhan_Tra} </p>`

        tongquanvephong_title_info.appendChild(LoaiGiuong);
        tongquanvephong_title_info.appendChild(SucChua);
        tongquanvephong_title_info.appendChild(HuongNhin);
        tongquanvephong_title_info.appendChild(DienTich);
        tongquanvephong_title_info.appendChild(NhanTraPhong);

        infoTongQuanDiv.appendChild(tongquanvephong_title);
        infoTongQuanDiv.appendChild(tongquanvephong_title_info);

        const infoTinhNangDiv = document.createElement('div');
        infoTinhNangDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoTinhNangDiv.style = 'font-size: 18px';

        const tinhnangdacbiet_title = document.createElement('div');
        tinhnangdacbiet_title.className = 'col-3';
        tinhnangdacbiet_title.innerHTML = '<h2>Tính năng đặc biệt</h2>';

        const tinhnangdacbiet_title_info = document.createElement('div');
        tinhnangdacbiet_title_info.className = 'col-9'

        const ul = document.createElement('ul')
        ul.style = 'list-style: circle'
        const li1 = document.createElement('li');
        li1.innerHTML = 'Truy cập internet có dây và không dây miễn phí';
        const li2 = document.createElement('li');
        li2.innerHTML = 'Các lựa chọn gối để cá nhân hóa trải nghiệm';
        const li3 = document.createElement('li');
        li3.innerHTML = 'Sạc không dây';
        const li4 = document.createElement('li');
        li4.innerHTML = 'Đồng hồ điện tử';

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);

        tinhnangdacbiet_title_info.appendChild(ul);


        infoTinhNangDiv.appendChild(tinhnangdacbiet_title);
        infoTinhNangDiv.appendChild(tinhnangdacbiet_title_info);

        const infoTienNghiDiv = document.createElement('div');
        infoTienNghiDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoTienNghiDiv.style = 'font-size: 18px';

        const tiennghi_title = document.createElement('div');
        tiennghi_title.className = 'col-3'
        tiennghi_title.innerHTML = '<h2>Tiện nghi</h2>'

        const tiennghi_title_info = document.createElement('div');
        tiennghi_title_info.className = 'col-9'

        const ul1 = document.createElement('ul')
        ul1.className = 'd-flex'
        ul1.style = 'list-style: none'

        const tiennghi_chung = document.createElement('li');
        tiennghi_chung.className ='col-3'
        tiennghi_chung.style = 'margin-right: 50px';
        tiennghi_chung.innerHTML = `${item.TienNghi_Chung}`;
        const tiennghi_phongtam = document.createElement('li');
        tiennghi_phongtam.className ='col-3'
        tiennghi_phongtam.style = 'margin-right: 50px';
        tiennghi_phongtam.innerHTML = `${item.TienNghi_NhaTam}`;
        const tiennghi_khac = document.createElement('li');
        tiennghi_khac.className ='col-3'
        tiennghi_khac.innerHTML = `${item.TienNghi_Khac}`;

        ul1.append(tiennghi_chung);
        ul1.append(tiennghi_phongtam);
        ul1.append(tiennghi_khac);

        tiennghi_title_info.appendChild(ul1);

        infoTienNghiDiv.appendChild(tiennghi_title);
        infoTienNghiDiv.appendChild(tiennghi_title_info);

        
        const infoChiTietDiv = document.createElement('div');
        infoChiTietDiv.className = 'container row mx-auto mt-5 mb-5 border-bottom p-5'
        infoChiTietDiv.style = 'font-size: 18px';

        const chitiet_title = document.createElement('div');
        chitiet_title.className = 'col-3';
        chitiet_title.innerHTML = '<h2>Chi tiết</h2>';

        const chitiet_title_info = document.createElement('div');
        chitiet_title_info.className = 'col-9'

        const ul2 = document.createElement('ul')
        ul2.style = 'list-style: circle'
        const li2_1 = document.createElement('li');
        li2_1.innerHTML = 'Tất cả các phòng đều cấm hút thuốc';
        const li2_2 = document.createElement('li');
        li2_2.innerHTML = 'Bố cục phòng và nội thất có thể khác với hình ảnh, tùy theo vị trí phòng.';
        const li2_3 = document.createElement('li');
        li2_3.innerHTML = 'Vui lòng liên hệ với Bộ phận Lễ tân nếu có bất kỳ thắc mắc nào liên quan đến đồ trang trí trong phòng.';
        const li2_4 = document.createElement('li');
        li2_4.innerHTML = 'Cấm thắp nến do nguy cơ cháy nổ.';

        ul2.appendChild(li2_1);
        ul2.appendChild(li2_2);
        ul2.appendChild(li2_3);
        ul2.appendChild(li2_4);

        chitiet_title_info.appendChild(ul2);

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

        const ul3 = document.createElement('ul')
        ul3.style = 'list-style: circle'
        const li3_1 = document.createElement('li');
        li3_1.innerHTML = '<p><span style="font-weight:bold">TEL</span> +84-24-3333-9000</p>';
        const li3_2 = document.createElement('li');
        li3_2.innerHTML = '<p><span style="font-weight:bold">E-Mail</span>rsv.L7westlake@lottehotel.com</p>';;

        ul3.appendChild(li3_1);
        ul3.appendChild(li3_2);

        lienhe_title_info.appendChild(ul3);

        infoLienHeDiv.appendChild(lienhe_title);
        infoLienHeDiv.appendChild(lienhe_title_info);

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

        roomInfoContainer.appendChild(title_h1);
        roomInfoContainer.appendChild(carouselDiv);
        roomInfoContainer.appendChild(descripton_p);
        roomInfoContainer.appendChild(hr);
        roomInfoContainer.appendChild(infoTongQuanDiv);
        roomInfoContainer.appendChild(infoTinhNangDiv);
        roomInfoContainer.appendChild(infoTienNghiDiv);
        roomInfoContainer.appendChild(infoChiTietDiv);
        roomInfoContainer.appendChild(infoLienHeDiv);
    });
}