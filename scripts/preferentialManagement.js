
$(document).ready(function () {
    GetAllPre();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        preIdToUpdate = id;
        InFormationPre(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa ưu đãi có mã  "+ id +" không?")) {
            deletePre(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});

function GetAllPre() {
    $.ajax({
        url: 'http://127.0.0.1:5000/uudai/getall',
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
                table = table + '<td>' + response[i].MaUuDai + '</td>';
                table = table + '<td>' + response[i].TenUuDai + '</td>';
                table = table + '<td>' + response[i].MoTa + '</td>';
                table = table + '<td>' + response[i].ChiTiet + '</td>';
                table = table + '<td>' + response[i].NgayBatDau + '</td>';
                table = table + '<td>' + response[i].NgayKetThuc + '</td>';
                table = table + '<td>' + response[i].Anh + '</td>';
                table = table + '<td>' + response[i].Gia + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaUuDai + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaUuDai + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenUuDai = document.getElementById("TenUuDai").value;
    var MoTa = document.getElementById("MoTa").value;
    var ChiTiet = document.getElementById("ChiTiet").value;
    var NgayBatDau = document.getElementById("NgayBatDau").value;
    var NgayKetThuc = document.getElementById("NgayKetThuc").value;
    var Anh = document.getElementById("Anh").value;
    var Gia = document.getElementById("Gia").value;
    var sendInfor = {
        "TenUuDai" : TenUuDai,
        "MoTa" : MoTa,
        "ChiTiet" : ChiTiet,
        "NgayBatDau" : NgayBatDau,
        "NgayKetThuc" : NgayKetThuc,
        "Anh" : Anh,
        "Gia" : Gia
    };
    $.ajax({
        url: "http://127.0.0.1:5000/uudai/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenUuDai").value = "";
            document.getElementById("MoTa").value = "";
            document.getElementById("ChiTiet").value = "";
            document.getElementById("NgayBatDau").value = "";
            document.getElementById("NgayKetThuc").value = "";
            document.getElementById("Anh").value = "";
            document.getElementById("Gia").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllPre();
        }
    });
}

function deletePre(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/uudai/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllPre();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationPre(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/uudai/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var preData = response; // Kiểm tra cấu trúc dữ liệu
            if (preData && preData.length > 0) {
                var pre = preData[0]; // Lấy phòng đầu tiên (nếu có)

                var NgayBatDau = new Date(pre.NgayBatDau);
                var NgayKetThuc = new Date(pre.NgayKetThuc);
                
                // Format lại ngày theo yyyy-MM-dd
                var formattedNgayBatDau = NgayBatDau.toISOString().split('T')[0];
                var formattedNgayKetThuc = NgayKetThuc.toISOString().split('T')[0];


                document.getElementById("TenUuDai").value = pre.TenUuDai;
                document.getElementById("MoTa").value = pre.MoTa;
                document.getElementById("ChiTiet").value = pre.ChiTiet;
                document.getElementById("NgayBatDau").value = formattedNgayBatDau;
                document.getElementById("NgayKetThuc").value = formattedNgayKetThuc;
                document.getElementById("Anh").value = pre.Anh;
                document.getElementById("Gia").value = pre.Gia;

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                alert("Không tìm thấy thông tin ưu đãi");
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin ưu đãi");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var preIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã ưu đãi "+ preIdToUpdate +" không?")){
        var TenUuDai = document.getElementById("TenUuDai").value;
        var MoTa = document.getElementById("MoTa").value;
        var ChiTiet = document.getElementById("ChiTiet").value;
        var NgayBatDau = document.getElementById("NgayBatDau").value;
        var NgayKetThuc = document.getElementById("NgayKetThuc").value;
        var Anh = document.getElementById("Anh").value;
        var Gia = document.getElementById("Gia").value;
        var sendInfor = {
            "TenUuDai" : TenUuDai,
            "MoTa" : MoTa,
            "ChiTiet" : ChiTiet,
            "NgayBatDau" : NgayBatDau,
            "NgayKetThuc" : NgayKetThuc,
            "Anh" : Anh,
            "Gia" : Gia
        };
        $.ajax({
            url: "http://127.0.0.1:5000/uudai/update/" + preIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật ưu đãi thành công");

                document.getElementById("TenUuDai").value = "";
                document.getElementById("MoTa").value = "";
                document.getElementById("ChiTiet").value = "";
                document.getElementById("NgayBatDau").value = "";
                document.getElementById("NgayKetThuc").value = "";
                document.getElementById("Anh").value = "";
                document.getElementById("Gia").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllPre();
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
        url: 'http://127.0.0.1:5000/uudai/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaUuDai + '</td>';
                table = table + '<td>' + response[i].TenUuDai + '</td>';
                table = table + '<td>' + response[i].MoTa + '</td>';
                table = table + '<td>' + response[i].ChiTiet + '</td>';
                table = table + '<td>' + response[i].NgayBatDau + '</td>';
                table = table + '<td>' + response[i].NgayKetThuc + '</td>';
                table = table + '<td>' + response[i].Anh + '</td>';
                table = table + '<td>' + response[i].Gia + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaUuDai + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaUuDai + '"><i class="fa fa-trash"></i></button> </td>';
                table = table + '</tr>';
            }
            document.getElementById('allRoom').innerHTML = table;
            document.getElementById("roomName").value = "";
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi tìm kiếm ưu đãi");
        }
    });
}
