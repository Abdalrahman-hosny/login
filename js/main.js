var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}


function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}



function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function signUp() {
   
    if(validationName() == true && validationEmail() == true ){
        if (isEmpty() == false) {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
            return false
        }
        var signUp = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }
        if (signUpArray.length == 0) {
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
            return true
        }
        if (isEmailExist() == false) {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    
        } else {
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    
        }
    
    

    }

    
}


function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}

function logout() {
    localStorage.removeItem('sessionUsername')
}
function validationName(){
    var massageName = document.getElementById('massageName')
    var text = signupName.value
    var regexName =/^[A-Z][a-z]{2,8}$/
    if(regexName.test(text) == true ){
        signupName.classList.add('is-valid')
        signupName.classList.remove('is-invalid')
        massageName.classList.add('d-none')
        return true
    }
    else{
        signupName.classList.add('is-invalid') 
        signupName.classList.remove('is-valid')
        massageName.classList.remove('d-none')
        return false
    }
}

function validationEmail(){
    var massageEmail = document.getElementById('massageEmail')
    var text = signupEmail.value
    var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regexEmail.test(text) == true ){
        signupEmail.classList.add('is-valid')
        signupEmail.classList.remove('is-invalid')
        massageEmail.classList.add('d-none')
        return true
    }
    else{
        signupEmail.classList.add('is-invalid') 
        signupEmail.classList.remove('is-valid')
        massageEmail.classList.remove('d-none')
        return false
    }
}

function validationPassword(){
    var massagePassword = document.getElementById('massagePassword')
    var text = signupPassword.value
    var regexPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regexPassword.test(text) == true ){
        signupPassword.classList.add('is-valid')
        signupPassword.classList.remove('is-invalid')
        massagePassword.classList.add('d-none')
        return true
    }
    else{
        signupPassword.classList.add('is-invalid') 
        signupPassword.classList.remove('is-valid')
        massagePassword.classList.remove('d-none')
        return false
    }
}

