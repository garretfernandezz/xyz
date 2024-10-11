// Selecting all the necessary elements
const loginForm = document.querySelector('form.login');
const signupForm = document.querySelector('form.signup');
const loginBtn = document.querySelector('label.login');
const signupBtn = document.querySelector('label.signup');
const signupLink = document.querySelector('.signup-link a');
const loginRadio = document.getElementById('login');
const signupRadio = document.getElementById('signup');
const titleLogin = document.querySelector('.title.login');
const titleSignup = document.querySelector('.title.signup');

signupBtn.onclick = () => {
    signupRadio.checked = true;
    loginForm.style.marginLeft = '-50%';
    signupForm.style.marginLeft = '0%';
    titleLogin.style.display = 'none';
    titleSignup.style.display = 'block';
};

loginBtn.onclick = () => {
    loginRadio.checked = true;
    loginForm.style.marginLeft = '0%';
    signupForm.style.marginLeft = '100%';
    titleLogin.style.display = 'block';
    titleSignup.style.display = 'none';
};

// Make sure that clicking "Signup now" triggers the correct form switch
signupLink.onclick = (e) => {
    e.preventDefault();
    signupRadio.checked = true;
    loginForm.style.marginLeft = '-50%';
    signupForm.style.marginLeft = '0%';
    titleLogin.style.display = 'none';
    titleSignup.style.display = 'block';
};
