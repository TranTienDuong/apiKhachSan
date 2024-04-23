document.addEventListener("DOMContentLoaded", function () {
    fetch("html/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html);

    fetch("html/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html);

    initializeFlatpickr();
    getRoomBookingInfo();
    getRoomBookingJOINEDInfo();

    const form = document.querySelector("form");
    if(form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById('hovaten').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('sodienthoai').value;
            const address = document.getElementById('diachi').value;

            const roomType = document.getElementById('roomTypeSelect').value;
            const roomName = document.getElementById('roomSelect').value;
            const roomNumber = document.getElementById('roomNumberSelect').value;

            const bookingDates = document.getElementById('ngayNhanTra').value;
            const totalMoney = parseFloat(document.getElementById('TotalMoney').value);

            const bookingData = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                roomName: roomName,
                roomType: roomType,
                roomNumber: roomNumber,
                dates: bookingDates,
                totalMoney: totalMoney,
            };

            fetch('http://localhost:5000/submit_booking', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(bookingData),
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    alert('Đăng kí phòng thành công');
                    window.location.href = "http://127.0.0.1:5500/index.html";
                } else {
                    console.error(data.message);
                    alert('An error occured during booking submission. ');
                }
            })
            .catch(error => {
                console.error('Error submitting booking: ', error);
                alert('An error occurred during booking submission');
            });
        });
    }
});
 


function getRoomType(data) {
    const selectRoomType = document.getElementById('roomTypeSelect');
    const uniqueRoomType = new Set();

    const option = document.createElement('option');
    option.value = -1;
    option.textContent = "- Chọn loại phòng -";

    selectRoomType.appendChild(option);
    data.forEach((item, index) => {

        if (uniqueRoomType.has(item.TenLoaiPhong)) {
            return;
        }
        uniqueRoomType.add(item.TenLoaiPhong);

        const option = document.createElement('option');
        option.value = item.TenLoaiPhong;
        option.textContent = item.TenLoaiPhong;

        selectRoomType.appendChild(option);
    });
}

function filterRoomNamesByType(roomType, data) {
    const selectRoomName = document.getElementById('roomSelect');
    selectRoomName.innerHTML = '';
    const option = document.createElement('option');
    option.value = -1;
    option.textContent = "- Chọn phòng -";

    selectRoomName.appendChild(option);
    const uniqueRoomName = new Set();
    data.forEach((item) => {
        if (item.TenLoaiPhong === roomType) {
            if (!uniqueRoomName.has(item.TenPhong)) {
                uniqueRoomName.add(item.TenPhong);

                const option = document.createElement('option');
                option.value = item.TenPhong;
                option.textContent = item.TenPhong;
                selectRoomName.appendChild(option);
            }
        }
    });
}
function getInfoByRoomName(roomName, data) {
    const roomInfo = document.getElementById('roomInfo');
    const roomInfoSet = new Set();
    roomInfo.innerHTML = '';
    data.forEach((item) => {
        if (roomInfoSet.has(item.TenPhong)) {
            return;
        }
        roomInfoSet.add(item.TenPhong);
        if (item.TenPhong == roomName) {
            const liRoomType = document.createElement('li');
            liRoomType.innerHTML = `<p>Loại giường: <span style="font-weight:bold">${item.LoaiGiuong}</span> |<p>`;
            roomInfo.appendChild(liRoomType);

            const liRoomView = document.createElement('li');
            liRoomView.innerHTML = `<p>Hướng nhìn: <span style="font-weight:bold">${item.HuongNhin}</span> |<p>`;
            roomInfo.appendChild(liRoomView);

            const liRoomCapacity = document.createElement('li');
            liRoomCapacity.innerHTML = `<p>Sức chứa: <span style="font-weight:bold">1~${item.SucChua} người</span> |<p>`;
            roomInfo.appendChild(liRoomCapacity);

            const liRoomSize = document.createElement('li');
            liRoomSize.innerHTML = `<p>Kích Thước: <span style="font-weight:bold">${item.DienTich} m²(bao gồm cả ban công)</span> |<p>`;
            roomInfo.appendChild(liRoomSize);

            let numericGiaPhong = parseFloat(item.GiaPhong);
            let formattedGiaPhong = numericGiaPhong.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

            const liRoomMoney = document.createElement('li');
            liRoomMoney.innerHTML = `<p>Giá Phòng: <span style="font-weight:bold">${formattedGiaPhong}</span> |<p>`;
            roomInfo.appendChild(liRoomMoney);
        }
    });
}

function filterRoomNumbersByName(roomName, data) {
    const roomNumberSelect = document.getElementById('roomNumberSelect');
    roomNumberSelect.innerHTML = '';
    const option = document.createElement('option');
    option.value = -1;
    option.textContent = "- Chọn số phòng -";

    roomNumberSelect.appendChild(option);
    data.forEach((item) => {
        if (item.TenPhong === roomName) {
            const option = document.createElement('option');
            option.value = item.SoPhong;
            option.textContent = item.SoPhong;
            roomNumberSelect.appendChild(option);
        }
    });
};
function filterDatetimepickr(roomNumber, data) {
    const element = document.querySelector("#ngayNhanTra");
    if (element) {
        const existingFlatpickr = element._flatpickr;
        if (existingFlatpickr) {
            existingFlatpickr.destroy(); // Un-comment this line to ensure existing Flatpickr is destroyed.
        }
    }

    const roomBookings = data.filter((item) => item.SoPhong === roomNumber);

    if(roomBookings.length === 0) {
        console.log(`No bookings found for rooms number: ${roomNumber}` );
    }
    const firstRoomBooking = roomBookings[0];
    let roomPrice = parseFloat(firstRoomBooking.GiaPhong);
    
    if(isNaN(roomPrice)) {
        console.error(`Invalid room price for room: ${roomNumber}`);
    }

    const disabledDates = roomBookings
    .map((item) => {
        const from = new Date(item.NgayNhanPhong);
        const to = new Date(item.NgayTraPhong);
        
        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
            console.error("Invalid date range:", item);
            return null; // Return null for invalid dates
        }

        return { from: from.toISOString(), to: to.toISOString() };
    })
    .filter(Boolean); // Remove null values
        console.log(disabledDates);



    if(disabledDates.length > 0) {
        flatpickr("#ngayNhanTra", {
            enableTime: true,
            mode: 'range',
            dateFormat: 'd-m-Y H:i',
            disable: disabledDates,
            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    const startDate = selectedDates[0];
                    const endDate = selectedDates[1];
            
                    const diffInMs = endDate - startDate;
                    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

                    const totalMoney = diffInDays * roomPrice;
                    const formattedTotalMoney = totalMoney.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    });
            
                    document.getElementById("total_money").innerText = `Tổng: ${formattedTotalMoney}`;
                    document.getElementById('TotalMoney').value = totalMoney;
            }
        }
    });
  } else {
    flatpickr("#ngayNhanTra", {
        enableTime: true,
        mode: 'range',
        dateFormat: 'd-m-Y H:i',
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                const startDate = selectedDates[0];
                const endDate = selectedDates[1];
        
                const diffInMs = endDate - startDate;
                const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

                const totalMoney = diffInDays * roomPrice;
                const formattedTotalMoney = totalMoney.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });
        
                document.getElementById("total_money").innerText = `Tổng: ${formattedTotalMoney}`;
                document.getElementById('TotalMoney').value = totalMoney;
        }
    }
});
  }
}

function setupRoomTypeChange(data) {
    const selectRoomType = document.getElementById('roomTypeSelect');
    selectRoomType.addEventListener('change', function () {
        const selectedRoomType = this.options[this.selectedIndex].textContent;
        filterRoomNamesByType(selectedRoomType, data);
    });
}

function setupRoomNameChange(data) {
    const selectRoomName = document.getElementById('roomSelect');
    selectRoomName.addEventListener('change', function () {
        const selectedRoomName = this.options[this.selectedIndex].textContent;
        getInfoByRoomName(selectedRoomName, data);
        filterRoomNumbersByName(selectedRoomName, data);
    })
}



function setupRoomNumberChange(data) {
    const selectRoomNumber = document.getElementById('roomNumberSelect');
    if (selectRoomNumber) {
        selectRoomNumber.addEventListener('change', function () {
            const selectedRoomNumber = this.options[this.selectedIndex].textContent;
            filterDatetimepickr(selectedRoomNumber, data);
        });
    }
}

function getRoomBookingInfo() {
    $.ajax({
        url: 'http://localhost:5000/phong/getall',
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data:", textStatus, errorThrown);
        },
        success: function (response) {
            getRoomType(response);
            setupRoomTypeChange(response);
            setupRoomNameChange(response);
        }
    });
}

function getRoomBookingJOINEDInfo() {
    $.ajax({
        url: 'http://localhost:5000/datphong/getallJOINPhong',
        method: 'GET',
        dataType: 'json',
        error: function (jqXHR, textStatus, errorThrown) {
        },
        success: function (response) {
            setupRoomNumberChange(response);
        }
    });
}

function initializeFlatpickr() {
    const flatpickrElement = document.getElementById('ngayNhanTra');
    if (flatpickrElement) {
        flatpickr(flatpickrElement, {
            enableTime: true,
            mode: 'range',
            dateFormat: 'd-m-Y H:i',
            disable: [],
        });
       }
}

function getRoomPrice(roomNumber, data) {
    // Find the room with the specified room number
    const room = data.find((item) => item.SoPhong === roomNumber);
    
    if (room) {
        const roomPrice = parseFloat(room.GiaPhong);
        if (isNaN(roomPrice)) {
            console.error(`Invalid GiaPhong for room number ${roomNumber}`);
            return null;
        }
        return roomPrice; // Return the room price as a number
    } else {
        console.error(`Room with number ${roomNumber} not found.`);
        return null; // Room not found
    }
}

    