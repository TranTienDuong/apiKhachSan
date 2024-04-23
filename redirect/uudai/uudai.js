function getFileName() {
    const path = window.location.pathname; // Get the full path
    const fileName = path.substring(path.lastIndexOf('/') + 1); // Extract file name from path
    return fileName;
}

function fetchUuDaiData() {
    const fileName = getFileName(); // Get the current file name
    const uudaiID = fileName.match(/\d+/)[0]; // Extract the numeric ID from the file name

    // Fetch the corresponding data using the extracted ID
    return $.ajax({
        url: `http://localhost:5000/uudai/getbyid/${uudaiID}`, // Use the room ID in the URL
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching room data:", textStatus, errorThrown);
        },
        success: function (response) {
            renderUuDaiInfo(response); // Render the fetched data
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchUuDaiData(); // Fetch the data based on the current file name
});


function renderUuDaiInfo(data) {
    const uudaiContainer = document.getElementById('uudaiContainer');
    data.forEach((item) => {
        const name = document.getElementById('redirectName');
        name.innerHTML = `<span style="font-weight: bold">${item.TenUuDai}</span>`
    
        const upperDiv = document.createElement('div');
        upperDiv.className = 'row shadow p-5'
        upperDiv.style = 'width: 100%; height: ';
    
        const upperRightDiv = document.createElement('div');
        upperRightDiv.className = 'col-5';
        upperRightDiv.style = 'margin-left: 250px';

        const upperLeftDiv = document.createElement('div');
        upperLeftDiv.className = 'col-5';

        const h2 = document.createElement('h2');
        h2.innerHTML = `${item.TenUuDai}`;


        const p = document.createElement('p');
        p.className = 'mt-5 mb-5';
        p.innerHTML = `${item.MoTa}`;

        upperRightDiv.appendChild(h2);
        upperRightDiv.appendChild(p);

        const lienhe = document.createElement('p');
        lienhe.innerHTML = '<span style="font-weight: bold;">Liên hệ chúng tôi</span>&nbsp;&nbsp;&nbsp;&nbsp; +84-24-3333-9000'
        lienhe.style = 'color:rgb(173,158,135); font-size: 18px;'

        const thoigianluutru = document.createElement('p');
        thoigianluutru.innerHTML = `<span style="font-weight: bold">Thời gian lưu trú</span>&nbsp;&nbsp;&nbsp;&nbsp; ${item.NgayKetThuc}`
        thoigianluutru.style = 'color:rgb(173,158,135); font-size: 18px;'

        const thoigiandatphong = document.createElement('p');
        thoigiandatphong.innerHTML = `<span style="font-weight: bold">Thời gian đặt phòng</span>&nbsp;&nbsp;&nbsp;&nbsp; ${item.NgayBatDau}`
        thoigiandatphong.style = 'color:rgb(173,158,135); font-size: 18px;'

        upperRightDiv.appendChild(lienhe);
        upperRightDiv.appendChild(thoigianluutru);
        upperRightDiv.appendChild(thoigiandatphong);

        const img = document.createElement('img');
        img.src = `${item.Anh}`;
        img.style = 'height: 300px';

        upperLeftDiv.appendChild(img);

        upperDiv.appendChild(upperRightDiv);
        upperDiv.appendChild(upperLeftDiv);

        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'container p-5';
        bottomDiv.style = 'color: rgb(150,150,150)';

        const title = document.createElement('h2');
        title.className = 'border-bottom mt-5';
        title.innerHTML = 'Thông tin chi tiết';


        const chiTietText = `${item.ChiTiet}`
        const chiTietItems = chiTietText.split('/');

        const ul = document.createElement('ul');
        chiTietItems.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.trim(); // Trim to remove any extra spaces
            li.className = 'mt-3'
            ul.appendChild(li);
        });

        const luuy = document.createElement('h2');
        luuy.className = 'mt-5 mb-4';
        luuy.innerHTML = 'Lưu ý'
        luuy.style = 'border-bottom: 1px solid black; color: black';

        const ul1 = document.createElement('ul');

        const chiTietText1 = `Vui lòng đặt phòng 24 giờ trước ngày lưu trú/
        Tất cả các mức giá chưa bao gồm 5% phí dịch vụ và 8% thuế (Tổng 13,4%)./
        Vui lòng trả trước, không hoàn tiền, không thay đổi/
        Ưu đãi áp dụng cho TỐI ĐA 02 người lớn./
        Chương trình không thể sử dụng kèm với bất kỳ ưu đãi nào khác/`;
        const chiTietItems1 = chiTietText1.split('/')
            .map(item => item.trim()) // Remove extra spaces
            .filter(item => item.length > 0); // Remove empty items

        chiTietItems1.forEach((item) => {
            const li1 = document.createElement('li');
            li1.textContent = item.trim(); // Trim to remove any extra spaces
            li1.className = 'mt-3'
            ul1.appendChild(li1);
        });

        bottomDiv.appendChild(title);
        bottomDiv.appendChild(ul);
        bottomDiv.appendChild(luuy);
        bottomDiv.appendChild(ul1);

        uudaiContainer.appendChild(upperDiv);
        uudaiContainer.appendChild(bottomDiv);
    })
   
}
