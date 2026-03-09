document.getElementById('login-btn').addEventListener('click',function(){

    const userName=document.getElementById('user-name');
    const username=userName.value;

    const Password=document.getElementById('password');
    const password=Password.value;

    if((username=='admin')&&(password=='admin123')){
        alert('login successfull');
        window.location.assign("home.html");
    }
    else{
        alert('login failed');
    }

})