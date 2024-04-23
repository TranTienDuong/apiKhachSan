$(document).ready(function () {
    GetAllStaff();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        staffIdToUpdate = id;
        InFormationStaff(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa nhân viên có mã  "+ id +" không?")) {
            deleteStaff(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});
GetAllMaCV();
function GetAllStaff() {
    $.ajax({
        url: 'http://127.0.0.1:5000/nhanvien/getall',
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
                table = table + '<td>' + response[i].MaNhanVien + '</td>';
                table = table + '<td>' + response[i].TenNhanVien + '</td>';
                table = table + '<td>' + response[i].MaCV + '</td>';
                table = table + '<td>' + response[i].NgaySinh + '</td>';
                table = table + '<td>' + response[i].GioiTinh + '</td>';
                table = table + '<td>' + response[i].DiaChi + '</td>';
                table = table + '<td>' + response[i].DienThoai + '</td>';
                table = table + '<td>' + response[i].Email + '</td>';
                table = table + '<td>' + response[i].TenDangNhap + '</td>';
                table = table + '<td>' + response[i].MatKhau + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaNhanVien + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaNhanVien + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenNhanVien = document.getElementById("TenNhanVien").value;
    var MaCV = document.getElementById("MaCV").value;
    var NgaySinh = document.getElementById("NgaySinh").value;
    var GioiTinh = document.getElementById("GioiTinh").value;
    var DiaChi = document.getElementById("DiaChi").value;
    var DienThoai = document.getElementById("DienThoai").value;
    var Email = document.getElementById("Email").value;
    var TenDangNhap = document.getElementById("TenDangNhap").value;
    var MatKhau = document.getElementById("MatKhau").value;
   
    var sendInfor = {
        "TenNhanVien" : TenNhanVien,
        "MaCV" : MaCV,
        "NgaySinh" : NgaySinh,
        "GioiTinh" : GioiTinh,
        "DiaChi" : DiaChi,
        "DienThoai" : DienThoai,
        "Email" : Email,
        "TenDangNhap" : TenDangNhap,
        "MatKhau" : MatKhau
    };
    $.ajax({
        url: "http://127.0.0.1:5000/nhanvien/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenNhanVien").value = "";
            document.getElementById("MaCV").value = "";
            document.getElementById("NgaySinh").value = "";
            document.getElementById("GioiTinh").value = "";
            document.getElementById("DiaChi").value = "";
            document.getElementById("DienThoai").value = "";
            document.getElementById("Email").value = "";
            document.getElementById("TenDangNhap").value = "";
            document.getElementById("MatKhau").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllStaff();
        }
    });
}

function deleteStaff(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/nhanvien/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllStaff();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationStaff(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/nhanvien/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var staffData = response; // Kiểm tra cấu trúc dữ liệu
            if (staffData && staffData.length > 0) {
                var staff = staffData[0]; // Lấy phòng đầu tiên (nếu có)

                var NgaySinh = new Date(staff.NgaySinh);
                
                // Format lại ngày theo yyyy-MM-dd
                var formattedNgaySinh = NgaySinh.toISOString().split('T')[0];

                document.getElementById("TenNhanVien").value = staff.TenNhanVien;
                document.getElementById("MaCV").value = staff.MaCV;
                document.getElementById("NgaySinh").value = formattedNgaySinh;
                document.getElementById("GioiTinh").value = staff.GioiTinh;
                document.getElementById("DiaChi").value = staff.DiaChi;
                document.getElementById("DienThoai").value = staff.DienThoai;
                document.getElementById("Email").value = staff.Email;
                document.getElementById("TenDangNhap").value = staff.TenDangNhap;
                document.getElementById("MatKhau").value = staff.MatKhau;

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                alert("Không tìm thấy thông tin phòng");
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin phòng");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var staffIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin nhân viên có mã "+ staffIdToUpdate +" không?")){
        var TenNhanVien = document.getElementById("TenNhanVien").value;
    var MaCV = document.getElementById("MaCV").value;
    var NgaySinh = document.getElementById("NgaySinh").value;
    var GioiTinh = document.getElementById("GioiTinh").value;
    var DiaChi = document.getElementById("DiaChi").value;
    var DienThoai = document.getElementById("DienThoai").value;
    var Email = document.getElementById("Email").value;
    var TenDangNhap = document.getElementById("TenDangNhap").value;
    var MatKhau = document.getElementById("MatKhau").value;
   
    var sendInfor = {
        "TenNhanVien" : TenNhanVien,
        "MaCV" : MaCV,
        "NgaySinh" : NgaySinh,
        "GioiTinh" : GioiTinh,
        "DiaChi" : DiaChi,
        "DienThoai" : DienThoai,
        "Email" : Email,
        "TenDangNhap" : TenDangNhap,
        "MatKhau" : MatKhau
    };
        $.ajax({
            url: "http://127.0.0.1:5000/nhanvien/update/" + staffIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật nhân viên thành công");

                document.getElementById("TenNhanVien").value = "";
                document.getElementById("MaCV").value = "";
                document.getElementById("NgaySinh").value = "";
                document.getElementById("GioiTinh").value = "";
                document.getElementById("DiaChi").value = "";
                document.getElementById("DienThoai").value = "";
                document.getElementById("Email").value = "";
                document.getElementById("TenDangNhap").value = "";
                document.getElementById("MatKhau").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllStaff();
            },
            error: function (response) {
                alert("Cập nhật phòng không thành công");
                console.log(response);
            }
        });
    }
};

function searchRoomByName(name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/nhanvien/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaNhanVien + '</td>';
                table = table + '<td>' + response[i].TenNhanVien + '</td>';
                table = table + '<td>' + response[i].MaCV + '</td>';
                table = table + '<td>' + response[i].NgaySinh + '</td>';
                table = table + '<td>' + response[i].GioiTinh + '</td>';
                table = table + '<td>' + response[i].DiaChi + '</td>';
                table = table + '<td>' + response[i].DienThoai + '</td>';
                table = table + '<td>' + response[i].Email + '</td>';
                table = table + '<td>' + response[i].TenDangNhap + '</td>';
                table = table + '<td>' + response[i].MatKhau + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaNhanVien + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaNhanVien + '"><i class="fa fa-trash"></i></button> </td>';
                table = table + '</tr>';
            }
            document.getElementById('allRoom').innerHTML = table;
            document.getElementById("roomName").value = "";
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi tìm kiếm phòng");
        }
    });
}
function GetAllMaCV() {
        $.ajax({
            url: 'http://127.0.0.1:5000/chucvu/getall',
            method: 'GET',
            contentType: 'json',
            dataType: 'json',
            error: function (response) {
            },
            success: function (response) {
                const len = response.length;
                console.log(response);
                let table = '';
                var selectElement = document.getElementById("MaCV");
                const optionDefault = document.createElement("option");
                optionDefault.value = '';
                optionDefault.text = "- Chọn mã chức vụ -";
                selectElement.appendChild(optionDefault);
                for (var i = 0; i < len; ++i) {   
                    var option = document.createElement("option");
                    option.text = response[i].MaCV;
                    option.value = response[i].MaCV;
                    selectElement.appendChild(option);               
                }
            },
            fail: function (response) {
            }
        });
    }
