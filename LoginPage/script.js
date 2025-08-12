let passwordValue = document.getElementById('password')
let emailValue = document.getElementById('email')
let form = document.getElementById('form-login')
let massagePass = document.getElementById('massage-wrong-pass')
let massageMail = document.getElementById('massage-wrong-mail')
let passwordValid = false;
let emailValid = false;
console.log(emailValue.value)
let patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
let patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function validPass(){
    let testRej = patternPassword.test(passwordValue.value)
    if(testRej === true ){
        passwordValid = true;
        massagePass.classList.remove('active')
    }else {
        passwordValid = false;
        massagePass.classList.add('active')
    }
}
passwordValue.addEventListener('keyup',validPass)
function validMail(){
    let testRej = patternEmail.test(emailValue.value)
    if(testRej === true){
        emailValid = true;
        massageMail.classList.remove('active')
    }else {
        emailValid = false;
        massageMail.classList.add('active')
    }
}
emailValue.addEventListener('keyup',validMail)
form.addEventListener('submit',(e)=>{
    validMail()
    validPass()
    if(passwordValid === false || emailValid === false){
        e.preventDefault()
    }else{
        alert('Login Success')
    }
})