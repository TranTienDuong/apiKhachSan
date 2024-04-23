document.addEventListener('DOMContentLoaded', function() {
    const header_management = document.getElementById('header_management');
    const nav_management = document.getElementById('nav_management');

    fetch('/html/header_management.html')
        .then(response => response.text())
        .then(data => {
            // Chèn nội dung vào phần tử header 
            header_management.innerHTML = data;
            
            // Xác định trang hiện tại dựa trên URL
            const currentPage = window.location.pathname;

            // Loại bỏ lớp "active" từ tất cả các mục trong sidebar
            const headerItems = header_management.querySelectorAll('.list-group-item');
            headerItems.forEach(item => {
                item.classList.remove('active');
            });

            // Thêm lớp "active" cho mục tương ứng với trang hiện tại
            const currentHeaderItem = header_management.querySelector(`.list-group-item[href="${currentPage}"]`);
            if (currentHeaderItem) {
                currentHeaderItem.classList.add('active');
            }
        })
        .catch(error => console.error('Error fetching header_management:', error));

    // Tải nội dung từ tệp nav.html
    fetch('/html/nav_management.html')
        .then(response => response.text())
        .then(data => {
            // Chèn nội dung vào phần tử nav
            nav_management.innerHTML = data;

            // Lấy phần tử i có id "menu-toggle" trong phần tử nav
            const toggleButton = nav_management.querySelector("#menu-toggle");
            toggleButton.onclick = function () {
                // Toggle class "toggled" cho phần tử có id "wrapper"
                const el = document.getElementById("wrapper");
                el.classList.toggle("toggled");
            };
        })
        .catch(error => console.error('Error fetching nav_management:', error));
    
});
