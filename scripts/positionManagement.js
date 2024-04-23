
$(document).ready(function () {
    GetAllPosition();
    $(document).on("click", ".view-btn", function () {
        var id = $(this).data("id");
        positionIdToUpdate = id;
        InFormationPosition(id);
    });
    $(document).on("click", ".delete-button", function () {
        var id = $(this).data("id");
        if (confirm("Bạn có chắc muốn xóa chức vụ có mã  "+ id +" không?")) {
            deletePosition(id);
        }
    });
    $(".search-btn").click(function() {
        var roomName = $("#roomName").val(); // Lấy giá trị từ input tìm kiếm
        searchRoomByName(roomName); // Gọi hàm tìm kiếm với tên phòng vừa nhập
    });
});

function GetAllPosition() {
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
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaCV + '</td>';
                table = table + '<td>' + response[i].TenCV + '</td>';
                table = table + '<td>' + response[i].LuongThang + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaCV + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaCV + '"><i class="fa fa-trash"></i></button> </td>';
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
    var TenCV = document.getElementById("TenCV").value;
    var LuongThang = document.getElementById("LuongThang").value;
    var sendInfor = {
        "TenCV" : TenCV,
        "LuongThang" : LuongThang
    };
    $.ajax({
        url: "http://127.0.0.1:5000/chucvu/add",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(sendInfor),
        error: function (response) {
            alert("Thêm mới không thành công");
        },
        complete: function (data) {
            alert("Thêm mới thành công");

            document.getElementById("TenCV").value = "";
            document.getElementById("LuongThang").value = "";

            // Disabled nút update và enabled nút add
            document.getElementById("update-btn").disabled = true;
            document.getElementById("add-btn").disabled = false;

            GetAllPosition();
        }
    });
}

function deletePosition(id) {
    $.ajax({
        url: "http://127.0.0.1:5000/chucvu/delete/" + id,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            alert("Xóa thành công");
            GetAllPosition();
        },
        error: function (response) {
            alert("Xóa không thành công");
            console.log(response)
        }
    });
}

function InFormationPosition(id){
    $.ajax({
        url: 'http://127.0.0.1:5000/chucvu/getbyid/'+id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response); // Kiểm tra dữ liệu response trong console
            var positionData = response; // Kiểm tra cấu trúc dữ liệu
            if (positionData && positionData.length > 0) {
                var position = positionData[0]; // Lấy phòng đầu tiên (nếu có)
                document.getElementById("TenCV").value = position.TenCV;
                document.getElementById("LuongThang").value = position.LuongThang;

                document.getElementById("update-btn").disabled = false;
                document.getElementById("add-btn").disabled = true;
            } else {
                alert("Không tìm thấy thông tin khách");
            }                    
        },
        error: function (response) {
            console.log(response);
            alert("Đã xảy ra lỗi khi lấy thông tin khách");
        }
    });
}

var updateBtn = document.querySelector("#update-btn");
var positionIdToUpdate = null;
updateBtn.onclick =  function() {
    if (confirm("Bạn có chắc muốn cập nhật thông tin mã chức vụ "+ positionIdToUpdate +" không?")){
        var TenCV = document.getElementById("TenCV").value;
        var LuongThang = document.getElementById("LuongThang").value;
        var sendInfor = {
            "TenCV" : TenCV,
            "LuongThang" : LuongThang
        };
        $.ajax({
            url: "http://127.0.0.1:5000/chucvu/update/" + positionIdToUpdate,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(sendInfor),
            success: function (response) {
                alert("Cập nhật chức vụ thành công");

                document.getElementById("TenCV").value = "";
                document.getElementById("LuongThang").value = "";

                // Disabled nút update và enabled nút add
                document.getElementById("update-btn").disabled = true;
                document.getElementById("add-btn").disabled = false;

                GetAllPosition();
            },
            error: function (response) {
                alert("Cập nhật chức vụ không thành công");
                console.log(response);
            }
        });
    }
};

function searchRoomByName(name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/chucvu/getbyname/' + name, // URL của API tìm kiếm theo tên
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            const len = response.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<tr>';
                table = table + '<td>' + response[i].MaCV + '</td>';
                table = table + '<td>' + response[i].TenCV + '</td>';
                table = table + '<td>' + response[i].LuongThang + '</td>';
                table += '<td><button class="view-btn" data-id="'+ response[i].MaCV + '"><i class="fa fa-eye"></i></button>'+
                '<button class="delete-button" style="background-color: tomato;" data-id="' + response[i].MaCV + '"><i class="fa fa-trash"></i></button> </td>';
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
