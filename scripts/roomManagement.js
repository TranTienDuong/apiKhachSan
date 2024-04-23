$(document).ready(function () {
    GetAllRoom();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        roomIdToUpdate = id;
        InFormationRoom(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa phòng có mã  "+ id +" không?")) {
            deleteRoom(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});
GetAllMaLoaiPhong();
function GetAllRoom() {
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
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaPhong + '</td>';
                table = table + '<td>' + response[i].TenPhong + '</td>';
                table = table + '<td>' + response[i].Tang + '</td>';
                table = table + '<td>' + response[i].SoPhong + '</td>';
                table = table + '<td>' + response[i].DienTich + '</td>';
                table = table + '<td>' + response[i].GiaPhong + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaPhong + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaPhong + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenPhong = document.getElementById("TenPhong").value;
    var MoTa = document.getElementById("MoTa").value;
    var Tang = document.getElementById("Tang").value;
    var SoPhong = document.getElementById("SoPhong").value;
    var DienTich = document.getElementById("DienTich").value;
    var GiaPhong = document.getElementById("GiaPhong").value;
    var SucChua = document.getElementById("SucChua").value;
    var ThoiGianNhan_Tra = document.getElementById("Time").value;
    var HuongNhin = document.getElementById("HuongNhin").value;
    var LoaiGiuong = document.getElementById("LoaiGiuong").value;
    var Anh1 = document.getElementById("Anh1").value;
    var Anh2 = document.getElementById("Anh2").value;
    var Anh3 = document.getElementById("Anh3").value;
    var Anh4 = document.getElementById("Anh4").value;
    var Anh5 = document.getElementById("Anh5").value;
    var MaLoaiPhong = document.getElementById("MaLoaiPhong").value;
    var sendInfor = {
        "TenPhong" : TenPhong,
        "MoTa" : MoTa,
        "Tang" : Tang,
        "SoPhong" : SoPhong,
        "DienTich" : DienTich,
        "GiaPhong" : GiaPhong,
        "SucChua" : SucChua,
        "ThoiGianNhan_Tra" : ThoiGianNhan_Tra,
        "HuongNhin" : HuongNhin,
        "LoaiGiuong" : LoaiGiuong,
        "Anh1" : Anh1,
        "Anh2" : Anh2,
        "Anh3" : Anh3,
        "Anh4" : Anh4,
        "Anh5" : Anh5,
        "MaLoaiPhong" : MaLoaiPhong
    };
    $.ajax({
        url: "http://127.0.0.1:5000/phong/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenPhong").value = "";
            document.getElementById("MoTa").value = "";
            document.getElementById("Tang").value = "";
            document.getElementById("SoPhong").value = "";
            document.getElementById("DienTich").value = "";
            document.getElementById("GiaPhong").value = "";
            document.getElementById("SucChua").value = "";
            document.getElementById("Time").value = "";
            document.getElementById("HuongNhin").value = "";
            document.getElementById("LoaiGiuong").value = "";
            document.getElementById("Anh1").value = "";
            document.getElementById("Anh2").value = "";
            document.getElementById("Anh3").value = "";
            document.getElementById("Anh4").value = "";
            document.getElementById("Anh5").value = "";
            document.getElementById("MaLoaiPhong").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllRoom();
        }
    });
}

function deleteRoom(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/phong/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllRoom();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationRoom(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/phong/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var roomData = response; // Kiểm tra cấu trúc dữ liệu
            if (roomData && roomData.length > 0) {
                var room = roomData[0]; // Lấy phòng đầu tiên (nếu có)
                document.getElementById("TenPhong").value = room.TenPhong;
                document.getElementById("MoTa").value = room.MoTa;
                document.getElementById("Tang").value = room.Tang;
                document.getElementById("SoPhong").value = room.SoPhong;
                document.getElementById("DienTich").value = room.DienTich;
                document.getElementById("GiaPhong").value = room.GiaPhong;
                document.getElementById("SucChua").value = room.SucChua;
                document.getElementById("Time").value = room.ThoiGianNhan_Tra;
                document.getElementById("HuongNhin").value = room.HuongNhin;
                document.getElementById("LoaiGiuong").value = room.LoaiGiuong;
                document.getElementById("Anh1").value = room.Anh1;
                document.getElementById("Anh2").value = room.Anh2;
                document.getElementById("Anh3").value = room.Anh3;
                document.getElementById("Anh4").value = room.Anh4;
                document.getElementById("Anh5").value = room.Anh5;
                document.getElementById("MaLoaiPhong").value = room.MaLoaiPhong;

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
var roomIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã phòng "+ roomIdToUpdate +" không?")){
        var TenPhong = document.getElementById("TenPhong").value;
        var MoTa = document.getElementById("MoTa").value;
        var Tang = document.getElementById("Tang").value;
        var SoPhong = document.getElementById("SoPhong").value;
        var DienTich = document.getElementById("DienTich").value;
        var GiaPhong = document.getElementById("GiaPhong").value;
        var SucChua = document.getElementById("SucChua").value;
        var ThoiGianNhan_Tra = document.getElementById("Time").value;
        var HuongNhin = document.getElementById("HuongNhin").value;
        var LoaiGiuong = document.getElementById("LoaiGiuong").value;
        var Anh1 = document.getElementById("Anh1").value;
        var Anh2 = document.getElementById("Anh2").value;
        var Anh3 = document.getElementById("Anh3").value;
        var Anh4 = document.getElementById("Anh4").value;
        var Anh5 = document.getElementById("Anh5").value;
        var MaLoaiPhong = document.getElementById("MaLoaiPhong").value;
        var sendInfor = {
            "TenPhong" : TenPhong,
            "MoTa" : MoTa,
            "Tang" : Tang,
            "SoPhong" : SoPhong,
            "DienTich" : DienTich,
            "GiaPhong" : GiaPhong,
            "SucChua" : SucChua,
            "ThoiGianNhan_Tra" : ThoiGianNhan_Tra,
            "HuongNhin" : HuongNhin,
            "LoaiGiuong" : LoaiGiuong,
            "Anh1" : Anh1,
            "Anh2" : Anh2,
            "Anh3" : Anh3,
            "Anh4" : Anh4,
            "Anh5" : Anh5,
            "MaLoaiPhong" : MaLoaiPhong
        };
        $.ajax({
            url: "http://127.0.0.1:5000/phong/update/" + roomIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật phòng thành công");

                document.getElementById("TenPhong").value = "";
                document.getElementById("MoTa").value = "";
                document.getElementById("Tang").value = "";
                document.getElementById("SoPhong").value = "";
                document.getElementById("DienTich").value = "";
                document.getElementById("GiaPhong").value = "";
                document.getElementById("SucChua").value = "";
                document.getElementById("Time").value = "";
                document.getElementById("HuongNhin").value = "";
                document.getElementById("LoaiGiuong").value = "";
                document.getElementById("Anh1").value = "";
                document.getElementById("Anh2").value = "";
                document.getElementById("Anh3").value = "";
                document.getElementById("Anh4").value = "";
                document.getElementById("Anh5").value = "";
                document.getElementById("MaLoaiPhong").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllRoom();
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
        url: 'http://127.0.0.1:5000/phong/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaPhong + '</td>';
                table = table + '<td>' + response[i].TenPhong + '</td>';
                table = table + '<td>' + response[i].Tang + '</td>';
                table = table + '<td>' + response[i].SoPhong + '</td>';
                table = table + '<td>' + response[i].DienTich + '</td>';
                table = table + '<td>' + response[i].GiaPhong + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaPhong + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaPhong + '"><i class="fa fa-trash"></i></button> </td>';
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
function GetAllMaLoaiPhong() {
    $.ajax({
        url: 'http://127.0.0.1:5000/loaiphong/getall',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
        },
        success: function (response) {
            const len = response.length;
            console.log(response);
            let table = '';
            var selectElement = document.getElementById("MaLoaiPhong");
            const optionDefault = document.createElement("option");
            optionDefault.value = '';
            optionDefault.text = "- Chọn mã loại phòng -";
            selectElement.appendChild(optionDefault);
            for (var i = 0; i < len; ++i) {   
                var option = document.createElement("option");
                option.text = response[i].MaLoaiPhong;
                option.value = response[i].MaLoaiPhong;
                selectElement.appendChild(option);               
            }
        },
        fail: function (response) {
        }
    });
}
