$(document).ready(function () {
    GetAllBooking();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        bookingIdToUpdate = id;
        InFormationBooking(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa booking có mã  "+ id +" không?")) {
            deleteBooking(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});
GetAllMaKhach(function() {
    GetAllMaPhong(function() {
        // Sau khi cả hai hàm GetAllMaKhach và GetAllMaPhong được thực hiện xong, tiếp tục thực hiện các hàm khác ở đây
    });
});
function GetAllBooking() {
    $.ajax({
        url: 'http://127.0.0.1:5000/datphong/getall',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
        },
        success: function (response) {
            const len = response.length;
            console.log(response);
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaDatPhong + '</td>';
                table = table + '<td>' + response[i].NgayDat + '</td>';
                table = table + '<td>' + response[i].NgayNhanPhong + '</td>';
                table = table + '<td>' + response[i].NgayTraPhong + '</td>';
                table = table + '<td>' + response[i].MaKhach + '</td>';
                table = table + '<td>' + response[i].MaPhong + '</td>';
                table = table + '<td>' + response[i].TongTien + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaDatPhong + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaDatPhong + '"><i class="fa fa-trash"></i></button> </td>';
                table = table + '</tr>';
            }
            document.getElementById('allRoom').innerHTML = table;
        },
        fail: function (response) {
        }
    });
}

var addBtn = document.querySelector("#add-btn");
addBtn.onclick =  function() {
    var NgayDat = document.getElementById("NgayDat").value;
    var NgayNhanPhong = document.getElementById("NgayNhanPhong").value;
    var NgayTraPhong = document.getElementById("NgayTraPhong").value;
    var MaKhach = document.getElementById("MaKhach").value;
    var MaPhong = document.getElementById("MaPhong").value;
    var TongTien = document.getElementById("TongTien").value;
    var sendInfor = {
        "NgayDat" : NgayDat,
        "NgayNhanPhong" : NgayNhanPhong,
        "NgayTraPhong" : NgayTraPhong,
        "MaKhach" : MaKhach,
        "MaPhong" : MaPhong,
        "TongTien" :TongTien
    };
    $.ajax({
        url: "http://127.0.0.1:5000/datphong/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("NgayDat").value = "";
            document.getElementById("NgayNhanPhong").value = "";
            document.getElementById("NgayTraPhong").value = "";
            document.getElementById("MaKhach").value = "";
            document.getElementById("MaPhong").value = "";
            document.getElementById("TongTien").value = "";


            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllBooking();
        }
    });
}

function deleteBooking(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/datphong/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllBooking();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationBooking(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/datphong/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var bookingData = response; // Kiểm tra cấu trúc dữ liệu
            if (bookingData && bookingData.length > 0) {
                var booking = bookingData[0]; // Lấy phòng đầu tiên (nếu có)

                // Chuyển đổi định dạng ngày
                var NgayDat = new Date(booking.NgayDat);
                var NgayNhanPhong = new Date(booking.NgayNhanPhong);
                var NgayTraPhong = new Date(booking.NgayTraPhong);
                
                // Format lại ngày theo yyyy-MM-dd
                var formattedNgayDat = NgayDat.toISOString().split('T')[0];
                var formattedNgayNhanPhong = NgayNhanPhong.toISOString().split('T')[0];
                var formattedNgayTraPhong = NgayTraPhong.toISOString().split('T')[0];

                document.getElementById("NgayDat").value = formattedNgayDat;
                document.getElementById("NgayNhanPhong").value = formattedNgayNhanPhong;
                document.getElementById("NgayTraPhong").value = formattedNgayTraPhong;
                document.getElementById("MaKhach").value = booking.MaKhach;
                document.getElementById("MaPhong").value = booking.MaPhong;
                document.getElementById("TongTien").value = booking.TongTien;

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                alert("Không tìm thấy thông tin booking");
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin booking");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var bookingIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã booking "+ bookingIdToUpdate +" không?")){
        var NgayDat = document.getElementById("NgayDat").value;
        var NgayNhanPhong = document.getElementById("NgayNhanPhong").value;
        var NgayTraPhong = document.getElementById("NgayTraPhong").value;
        var MaKhach = document.getElementById("MaKhach").value;
        var MaPhong = document.getElementById("MaPhong").value;
        var TongTien = document.getElementById("TongTien").value;
        var sendInfor = {
            "NgayDat" : NgayDat,
            "NgayNhanPhong" : NgayNhanPhong,
            "NgayTraPhong" : NgayTraPhong,
            "MaKhach" : MaKhach,
            "MaPhong" : MaPhong,
            "TongTien" :TongTien
        };
        $.ajax({
            url: "http://127.0.0.1:5000/datphong/update/" + bookingIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật khách thành công");

                document.getElementById("NgayDat").value = "";
                document.getElementById("NgayNhanPhong").value = "";
                document.getElementById("NgayTraPhong").value = "";
                document.getElementById("MaKhach").value = "";
                document.getElementById("MaPhong").value = "";
                document.getElementById("TongTien").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllBooking();
            },
            error: function (response) {
                alert("Cập nhật khách không thành công");
                console.log(response);
            }
        });
    }
};

function searchRoomByName(name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/datphong/getbydate/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaDatPhong + '</td>';
                table = table + '<td>' + response[i].NgayDat + '</td>';
                table = table + '<td>' + response[i].NgayNhanPhong + '</td>';
                table = table + '<td>' + response[i].NgayTraPhong + '</td>';
                table = table + '<td>' + response[i].MaKhach + '</td>';
                table = table + '<td>' + response[i].MaPhong + '</td>';
                table = table + '<td>' + response[i].TongTien + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaDatPhong + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaDatPhong + '"><i class="fa fa-trash"></i></button> </td>';
                table = table + '</tr>';
            }
            document.getElementById('allRoom').innerHTML = table;
            document.getElementById("roomName").value = "";
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi tìm kiếm khách");
        }
    });
}

function GetAllMaPhong(callback) {
    $.ajax({
        url: 'http://127.0.0.1:5000/phong/getall',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
        },
        success: function (response) {
            const len = response.length;
            console.log(response);
            let table = '';
            var selectElement = document.getElementById("MaPhong");
            selectElement.innerHTML = ""; 
            const optionDefault = document.createElement("option");
            optionDefault.value = '';
            optionDefault.text = "- Chọn mã phòng -";
            selectElement.appendChild(optionDefault);
            for (var i = 0; i < len; ++i) {

                var option = document.createElement("option");
                option.text = response[i].MaPhong;
                option.value = response[i].MaPhong;
                selectElement.appendChild(option);               
            }
            if (typeof callback === 'function') {
                callback();
            }
        },
        fail: function (response) {
        }
    });
}
function GetAllMaKhach(callback) {
    $.ajax({
        url: 'http://127.0.0.1:5000/khach/getall',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
        },
        success: function (response) {
            const len = response.length;
            console.log(response);
            let table = '';
            var selectElement3 = document.getElementById("MaKhach");
            selectElement3.innerHTML = ""; 
            const optionDefault = document.createElement("option");
            optionDefault.value = '';
            optionDefault.text = "- Chọn mã khách -";           
            selectElement3.appendChild(optionDefault);
            
            for (var i = 0; i < len; ++i) {
                var option = document.createElement("option");
                option.text = response[i].MaKhach;
                option.value = response[i].MaKhach;
                selectElement3.appendChild(option);               
            }
            if (typeof callback === 'function') {
                callback();
            }
        },
        fail: function (response) {
        }
    });
}

