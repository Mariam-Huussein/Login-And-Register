let formContainer = document.querySelector('.form-container');
//Function To Display Sign In Form
function displaySignInForm() {
    formContainer.innerHTML=`
                <h2 class="title text-center">Sign In</h2>
                <form class="d-flex flex-column" onsubmit="signFormChecked()">
                    <div class="mb-3">
                        <label for="email-for-sign" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email-for-sign" required>
                    </div>
                    <div class="mb-3">
                        <label for="password-for-sign" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password-for-sign" required>
                    </div>
                    <div class="d-flex justify-content-around">
                        <button type="submit" class="btn btn-primary px-5 py-2">Submit</button>
                        <button type="button" class="btn btn-secondary px-5 py-2" onclick="displaySignUpForm()">Sign Up</button>
                    </div>
                </form>
    `;
}

//Function To Display Sign Up Form
function displaySignUpForm() {
    formContainer.innerHTML=`
                    <h2 class="title text-center">Sign Up</h2>
                <form class="d-flex flex-column" onsubmit="registerForm(event)">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" id="phone" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <div class="mb-3">
                        <label for="submit-password" class="form-label">Submit Password</label>
                        <input type="password" class="form-control" id="submit-password" required>
                    </div>
                    <div class="d-flex justify-content-around">
                        <button type="submit" class="btn btn-primary px-5 py-2">Submit</button>
                        <button type="button" class="btn btn-secondary px-5 py-2" onclick="displaySignInForm()">Sign In</button>
                    </div>
                </form>
    `
}

//function to returns users from local Storage 
function getUsersFromLocalStorage() {
    return (localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []);
}

//Function To Display User Info When he Sign In successfully 
function displaySignInDone(user) {
    formContainer.innerHTML=`
                <h2 class="title text-center">Welcome ${user.userName}</h2>
                <h4 class="title text-center">Phone: <p>${user.userPhone}</p></h4>
                <h4 class="title text-center">Email: <p>${user.userEmail}</p></h4>
                <button type="button" class="btn btn-secondary px-5 py-2" onclick="displaySignInForm()">Sign Out</button>
    `;
}

//Function To check the sign up form
function registerForm(event) {
    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let submitPassword = document.querySelector('#submit-password');
    
    let arrUsres = getUsersFromLocalStorage();
    
    let emailExists = arrUsres.some(user => user.userEmail === email.value);
    if (emailExists) {
        email.style.borderColor= "red";
        event.preventDefault();
        alert("Email is exist");
        return;
    }

    if(!(password.value === submitPassword.value)){
        password.style.borderColor= "red"
        submitPassword.style.borderColor= "red"
        event.preventDefault();
        alert("Please Enter The Same Password");
        return;
    }
    else{
        const user={
            "userName": name.value,
            "userPhone": phone.value,
            "userEmail": email.value,
            "userPassword": password.value
        }
        arrUsres.push(user);
        localStorage.setItem("users",JSON.stringify(arrUsres));
        name.value="";
        phone.value="";
        email.value="";
        password.value="";
        submitPassword.value="";
        password.style.border= "var(--bs-border-width) solid var(--bs-border-color)"
        submitPassword.style.border= "var(--bs-border-width) solid var(--bs-border-color)"
        email.style.border= "var(--bs-border-width) solid var(--bs-border-color)";
    }
    event.preventDefault();
    alert("You Created Account Successfully");
}

//Function To Check Sign In Form 
function signFormChecked(event) {
    let email = document.querySelector('#email-for-sign');
    let password = document.querySelector('#password-for-sign');
    let arrUsres = getUsersFromLocalStorage();
    let userExists = arrUsres.find(user => user.userEmail === email.value);
    if (userExists) {
        if(userExists.userPassword !== password.value){
            password.style.borderColor = "red";
            alert("Password is not correct");
            event.preventDefault(event);
            return;
        }
        else{
            displaySignInDone(userExists);
        }
    }else{
        email.style.borderColor = "red";
        password.style.borderColor = "red";
        alert("Email is not correct");
        return;
    }
}