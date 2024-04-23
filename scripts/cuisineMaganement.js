
$(document).ready(function () {
    GetAllCui();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        cuiIdToUpdate = id;
        InFormationCui(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa nhà ăn có mã  "+ id +" không?")) {
            deleteCui(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});

function GetAllCui() {
    $.ajax({
        url: 'http://127.0.0.1:5000/nhaan/getall',
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
                table = table + '<td>' + response[i].MaNhaAn + '</td>';
                table = table + '<td>' + response[i].TenNhaAn + '</td>';
                table = table + '<td>' + response[i].LoaiNhaAn + '</td>';
                table = table + '<td>' + response[i].DiaDiem + '</td>';
                table = table + '<td>' + response[i].ChoNgoi + '</td>';
                table = table + '<td>' + response[i].GioSuDung + '</td>';
                table = table + '<td>' + response[i].ChiTiet + '</td>';
                table = table + '<td>' + response[i].Anh + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaNhaAn + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaNhaAn + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenNhaAn = document.getElementById("TenNhaAn").value;
    var LoaiNhaAn = document.getElementById("LoaiNhaAn").value;
    var DiaDiem = document.getElementById("DiaDiem").value;
    var ChoNgoi = document.getElementById("ChoNgoi").value;
    var GioSuDung = document.getElementById("GioSuDung").value;
    var Anh = document.getElementById("Anh").value;
    var ChiTiet = document.getElementById("ChiTiet").value;
    var sendInfor = {
        "TenNhaAn" : TenNhaAn,
        "LoaiNhaAn" : LoaiNhaAn,
        "DiaDiem" : DiaDiem,
        "ChoNgoi" : ChoNgoi,
        "GioSuDung" : GioSuDung,
        "Anh" : Anh,
        "ChiTiet" : ChiTiet
    };
    $.ajax({
        url: "http://127.0.0.1:5000/nhaan/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenNhaAn").value = "";
            document.getElementById("LoaiNhaAn").value = "";
            document.getElementById("DiaDiem").value = "";
            document.getElementById("ChoNgoi").value = "";
            document.getElementById("GioSuDung").value = "";
            document.getElementById("Anh").value = "";
            document.getElementById("ChiTiet").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllCui();
        }
    });
}

function deleteCui(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/nhaan/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllCui();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationCui(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/nhaan/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var cuiData = response; // Kiểm tra cấu trúc dữ liệu
            if (cuiData && cuiData.length > 0) {
                var cui = cuiData[0]; // Lấy phòng đầu tiên (nếu có)

                document.getElementById("TenNhaAn").value = cui.TenNhaAn;
                document.getElementById("LoaiNhaAn").value = cui.LoaiNhaAn;
                document.getElementById("DiaDiem").value = cui.DiaDiem;
                document.getElementById("ChoNgoi").value = cui.ChoNgoi;
                document.getElementById("GioSuDung").value = cui.GioSuDung;
                document.getElementById("ChiTiet").value = cui.ChiTiet;
                document.getElementById("Anh").value = cui.Anh;              

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                alert("Không tìm thấy thông tin nha an");
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin nha an");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var cuiIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã nhà ăn "+ cuiIdToUpdate +" không?")){
        var TenNhaAn = document.getElementById("TenNhaAn").value;
        var LoaiNhaAn = document.getElementById("LoaiNhaAn").value;
        var DiaDiem = document.getElementById("DiaDiem").value;
        var ChoNgoi = document.getElementById("ChoNgoi").value;
        var GioSuDung = document.getElementById("GioSuDung").value;
        var Anh = document.getElementById("Anh").value;
        var ChiTiet = document.getElementById("ChiTiet").value;
        var sendInfor = {
            "TenNhaAn" : TenNhaAn,
            "LoaiNhaAn" : LoaiNhaAn,
            "DiaDiem" : DiaDiem,
            "ChoNgoi" : ChoNgoi,
            "GioSuDung" : GioSuDung,
            "Anh" : Anh,
            "ChiTiet" : ChiTiet
        };
            $.ajax({
            url: "http://127.0.0.1:5000/nhaan/update/" + cuiIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật ưu đãi thành công");

                document.getElementById("TenNhaAn").value = "";
                document.getElementById("LoaiNhaAn").value = "";
                document.getElementById("DiaDiem").value = "";
                document.getElementById("ChoNgoi").value = "";
                document.getElementById("GioSuDung").value = "";
                document.getElementById("Anh").value = "";
                document.getElementById("ChiTiet").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllCui();
            },
            error: function (response) {
                alert("Cập nhật ưu đãi không thành công");
                console.log(response);
            }
        });
    }
};

function searchRoomByName(name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/nhaan/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaNhaAn + '</td>';
                table = table + '<td>' + response[i].TenNhaAn + '</td>';
                table = table + '<td>' + response[i].LoaiNhaAn + '</td>';
                table = table + '<td>' + response[i].DiaDiem + '</td>';
                table = table + '<td>' + response[i].ChoNgoi + '</td>';
                table = table + '<td>' + response[i].GioSuDung + '</td>';
                table = table + '<td>' + response[i].ChiTiet + '</td>';
                table = table + '<td>' + response[i].Anh + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaNhaAn + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaNhaAn + '"><i class="fa fa-trash"></i></button> </td>';
                table = table + '</tr>';
            }
            document.getElementById('allRoom').innerHTML = table;
            document.getElementById("roomName").value = "";
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi tìm kiếm nha an");
        }
    });
}
