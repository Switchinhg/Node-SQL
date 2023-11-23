const url = 'http://localhost:3000/api/users/register'

let form = document.getElementById("form")
let error = document.getElementById("error")
let success = document.getElementById("success")

const register = async(e) =>{
    let user = {
        email: e.target[0].value,
        password: e.target[1].value,
        handle: e.target[2].value
    }
    const data = await fetch(url,{
        method:"POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
          },
    })
    console.log(await data)
    const response = await data.json()
    if(response.ok){
        success.innerText = "user registered!"
        error.innerText = ''
        localStorage.setItem('logged',true)
        localStorage.setItem('user-data' , JSON.stringify(response.data))
        setTimeout(() => {
                window.location = "../index.html"
        }, 2000);
    }else{
        success.innerText = ''
        error.innerText = response.msg
    }
    console.log(response)
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    register(e)
})