if(!localStorage.getItem('logged')){
    window.location = "pages/login.html"
}else{
    document.getElementById('tweet').placeholder = `${JSON.parse(localStorage.getItem('user-data')).handle} let's tweet something!`
}

