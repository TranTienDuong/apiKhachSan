
$(document).ready(function () {
    GetAllCustomer();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        customerIdToUpdate = id;
        InFormationCustomer(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa khách có mã  "+ id +" không?")) {
            deleteCustomer(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});

function GetAllCustomer() {
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
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaKhach + '</td>';
                table = table + '<td>' + response[i].TenKhach + '</td>';
                table = table + '<td>' + response[i].Email + '</td>';
                table = table + '<td>' + response[i].DienThoai + '</td>';
                table = table + '<td>' + response[i].DiaChi + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaKhach + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaKhach + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenKhach = document.getElementById("TenKhach").value;
    var Email = document.getElementById("Email").value;
    var DienThoai = document.getElementById("DienThoai").value;
    var DiaChi = document.getElementById("DiaChi").value;
    var sendInfor = {
        "TenKhach" : TenKhach,
        "Email" : Email,
        "DienThoai" : DienThoai,
        "DiaChi" : DiaChi
    };
    $.ajax({
        url: "http://127.0.0.1:5000/khach/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenKhach").value = "";
            document.getElementById("Email").value = "";
            document.getElementById("DienThoai").value = "";
            document.getElementById("DiaChi").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllCustomer();
        }
    });
}

function deleteCustomer(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/khach/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllCustomer();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationCustomer(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/khach/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var customerData = response; // Kiểm tra cấu trúc dữ liệu
            if (customerData && customerData.length > 0) {
                var customer = customerData[0]; // Lấy phòng đầu tiên (nếu có)
                document.getElementById("TenKhach").value = customer.TenKhach;
                document.getElementById("Email").value = customer.Email;
                document.getElementById("DienThoai").value = customer.DienThoai;
                document.getElementById("DiaChi").value = customer.DiaChi;

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                if(customerData && customerData.length == 0){alert("Không tìm thấy thông tin khách");}
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin khách");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var customerIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã khách "+ customerIdToUpdate +" không?")){
        var TenKhach = document.getElementById("TenKhach").value;
        var Email = document.getElementById("Email").value;
        var DienThoai = document.getElementById("DienThoai").value;
        var DiaChi = document.getElementById("DiaChi").value;
        var sendInfor = {
            "TenKhach" : TenKhach,
            "Email" : Email,
            "DienThoai" : DienThoai,
            "DiaChi" : DiaChi
        };
        $.ajax({
            url: "http://127.0.0.1:5000/khach/update/" + customerIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật khách thành công");

                document.getElementById("TenKhach").value = "";
                document.getElementById("Email").value = "";
                document.getElementById("DienThoai").value = "";
                document.getElementById("DiaChi").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllCustomer();
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
        url: 'http://127.0.0.1:5000/khach/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaKhach + '</td>';
                table = table + '<td>' + response[i].TenKhach + '</td>';
                table = table + '<td>' + response[i].Email + '</td>';
                table = table + '<td>' + response[i].DienThoai + '</td>';
                table = table + '<td>' + response[i].DiaChi + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaKhach + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaKhach + '"><i class="fa fa-trash"></i></button> </td>';
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
