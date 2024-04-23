
$(document).ready(function () {
    GetAllStyle();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        styleIdToUpdate = id;
        InFormationStyle(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa loại phòng có mã  "+ id +" không?")) {
            deleteStyle(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});

function GetAllStyle() {
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
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaLoaiPhong + '</td>';
                table = table + '<td>' + response[i].TenLoaiPhong + '</td>';
                table = table + '<td>' + response[i].DichVu + '</td>';
                table = table + '<td>' + response[i].TienNghi_Chung + '</td>';
                table = table + '<td>' + response[i].TienNghi_NhaTam + '</td>';
                table = table + '<td>' + response[i].TienNghi_Khac + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaLoaiPhong + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaLoaiPhong + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenLoaiPhong = document.getElementById("TenLoaiPhong").value;
    var DichVu = document.getElementById("DichVu").value;
    var Chung = document.getElementById("Chung").value;
    var NhaTam = document.getElementById("NhaTam").value;
    var Khac = document.getElementById("Khac").value;
    var sendInfor = {
        "TenLoaiPhong" : TenLoaiPhong,
        "DichVu" : DichVu,
        "TienNghi_Chung" : Chung,
        "TienNghi_NhaTam" : NhaTam,
        "TienNghi_Khac" : Khac
    };
    $.ajax({
        url: "http://127.0.0.1:5000/loaiphong/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenLoaiPhong").value = "";
            document.getElementById("DichVu").value = "";
            document.getElementById("Chung").value = "";
            document.getElementById("NhaTam").value = "";
            document.getElementById("Khac").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllStyle();
        }
    });
}

function deleteStyle(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/loaiphong/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllStyle();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationStyle(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/loaiphong/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var styleData = response; // Kiểm tra cấu trúc dữ liệu
            if (styleData && styleData.length > 0) {
                var style = styleData[0]; // Lấy phòng đầu tiên (nếu có)
                document.getElementById("TenLoaiPhong").value = style.TenLoaiPhong;
                document.getElementById("DichVu").value = style.DichVu;
                document.getElementById("Chung").value = style.TienNghi_Chung;
                document.getElementById("NhaTam").value = style.TienNghi_NhaTam;
                document.getElementById("Khac").value = style.TienNghi_Khac;

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                alert("Không tìm thấy thông tin loại phòng");
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin loại phòng");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var styleIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã loại phòng "+ styleIdToUpdate +" không?")){
        var TenLoaiPhong = document.getElementById("TenLoaiPhong").value;
        var DichVu = document.getElementById("DichVu").value;
        var Chung = document.getElementById("Chung").value;
        var NhaTam = document.getElementById("NhaTam").value;
        var Khac = document.getElementById("Khac").value;
        var sendInfor = {
            "TenLoaiPhong" : TenLoaiPhong,
            "DichVu" : DichVu,
            "TienNghi_Chung" : Chung,
            "TienNghi_NhaTam" : NhaTam,
            "TienNghi_Khac" : Khac
        };
        $.ajax({
            url: "http://127.0.0.1:5000/loaiphong/update/" + styleIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật loại phòng thành công");

                document.getElementById("TenLoaiPhong").value = "";
                document.getElementById("DichVu").value = "";
                document.getElementById("Chung").value = "";
                document.getElementById("NhaTam").value = "";
                document.getElementById("Khac").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllStyle();
            },
            error: function (response) {
                alert("Cập nhật loại phòng không thành công");
                console.log(response);
            }
        });
    }
};

function searchRoomByName(name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/loaiphong/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaLoaiPhong + '</td>';
                table = table + '<td>' + response[i].TenLoaiPhong + '</td>';
                table = table + '<td>' + response[i].DichVu + '</td>';
                table = table + '<td>' + response[i].TienNghi_Chung + '</td>';
                table = table + '<td>' + response[i].TienNghi_NhaTam + '</td>';
                table = table + '<td>' + response[i].TienNghi_Khac + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaLoaiPhong + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaLoaiPhong + '"><i class="fa fa-trash"></i></button> </td>';
                table = table + '</tr>';
            }
            document.getElementById('allRoom').innerHTML = table;
            document.getElementById("roomName").value = "";
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi tìm kiếm loại phòng");
        }
    });
}
