
document.addEventListener("DOMContentLoaded", function() {
    fetch("html/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html);

    fetch("html/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html);

});


function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);                  
    if (response.status === 'connected') {  
        testAPI();
    } else {                              
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}


function checkLoginState() {            
    FB.getLoginStatus(function (response) {  
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '1474926826708826',
        cookie: true,                    
        xfbml: true,                    
        version: 'v19.0'          
    });


    FB.getLoginStatus(function (response) {  
        statusChangeCallback(response);
    });
};

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api(
        '/me',
        'GET',
        { "fields": "id,name,email,birthday" },
        function (response) {
            console.log("test");
            console.log('Successfullllll login for: ' + response.name);
            console.log('Email: ' + response.email);
            console.log('Birthday: ' + response.birthday);
            document.getElementById('status').innerHTML = "Xin chào" + response.name;
        }
    );
}

function logout() {
    FB.logout(function (response) {
        console.log('User logged out');
        document.getElementById('status').innerHTML = 'You are now logged out';
    });
}

  
