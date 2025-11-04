/* 
    # Rules:
    - minimum length of 8 characters
    - 1 upper, 1 lower, 1 number, 1 special ($, @, #)

    # Checks:
    - should not contain name ********
    - should not contain email 
    - should not comprise (user123, admin123, password123) 

    # Categories:
    1. strong
    2. medium 
    3. weak 
*/

// Pop-over requirements 
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

// Assigning IDs to variables
const form = document.querySelector('form');
const conditions = document.getElementById('conditions');
const pass = document.getElementById('password');
const msg = document.getElementById('pass-message');
const strength = document.getElementById('pass-strength');
const invalidPass = document.getElementById('invalid-pwd-alert');
const emailPass = document.getElementById('email-alert');
const easyPass = document.getElementById('easy-pwd-alert');
const namePass = document.getElementById('name-alert');
const length = document.getElementById('length-check');
const lower = document.getElementById('lower-check');
const lengthContainer = document.getElementById('length-check-container');
const lowerContainer = document.getElementById('lower-check-container');
const upper = document.getElementById('upper-check');
const upperContainer = document.getElementById('upper-check-container');
const number = document.getElementById('number-check');
const numberContainer = document.getElementById('number-check-container');
const special = document.getElementById('special-check');
const specialContainer = document.getElementById('special-check-container');
const emailAddress = ['.com', '.co.za', '@hotmail', '@yahoo', '@gmail', '@icloud']
const easyPasswords = ['user123', 'admin123', 'password', 'password123', 'test123', 'test']
const firstName = document.getElementById('firstNameInput');

// ------------- Dismissable Alerts: --------------/ 
function validatePassword(pass) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // length 
        if (pass.value.length === 0) {
            invalidPass.style.display = "block";
        } else {
            invalidPass.style.display = "none";
        }

        // email 
        var containsEmail = false;

        for (let i = 0; i < emailAddress.length; i++) {
            const em = emailAddress[i];
            if (pass.value.toLowerCase().includes(em)) {
                containsEmail = true;
                break;
            }


        }
        if (containsEmail) {
            emailPass.style.display = "block";
        } else {
            emailPass.style.display = "none";
        }

        // predictable password 
        var containsEasyPassword = false;

        for (let i = 0; i < easyPasswords.length; i++) {
            const pa = easyPasswords[i];
            if (pass.value.toLowerCase().includes(pa)) {
                containsEasyPassword = true;
                break;
            }


        }
        if (containsEasyPassword) {
            easyPass.style.display = "block";
        } else {
            easyPass.style.display = "none";
        }

        // name 
        var containsName = false;

            if (pass.value.toLowerCase().includes(firstName.value.toLowerCase())){
                containsName = true;
            } 

        if (containsName){
                namePass.style.display = "block";
        } else {
            namePass.style.display = "none";
        }

    });

    // ----------- List-group rules: -------------//
    pass.addEventListener("input", () => {

        let score = 0;
        let lowerCase = false;
        let upperCase = false;
        let containsNumber = false;
        let containsSpecialCharacter = false;

        // show/hide message
        msg.style.display = pass.value.length > 0 ? "block" : "none";

        // show/hide conditions
        conditions.style.display = pass.value.length > 0 ? "block" : "none";

        // reset class states
        [
            'length-check-container',
            'lower-check-container',
            'upper-check-container',
            'number-check-container',
            'special-check-container'
        ].forEach(id => {
            document.getElementById(id).classList.remove('list-group-item-success', 'list-group-item-warning');
        });

        // length check
        if (pass.value.length >= 8) {
            length.innerText = '✅';
            lengthContainer.classList.add('list-group-item-success');
            score++;
        } else {
            length.innerText = '⚠️';
            lengthContainer.classList.add('list-group-item-warning');
        }

        // character checks
        for (let i = 0; i < pass.value.length; i++) {
            const char = pass.value[i];
            if (char >= 'a' && char <= 'z') lowerCase = true;
            if (char >= 'A' && char <= 'Z') upperCase = true;
            if (char >= '0' && char <= '9') containsNumber = true;

            switch (pass.value[i]) {
                case '$':
                    containsSpecialCharacter = true;
                    break;
                case '@':
                    containsSpecialCharacter = true;
                    break;
                case '#':
                    containsSpecialCharacter = true;
                    break;
            }
        }

        // lowercase
        if (lowerCase) {
            lower.innerText = '✅';
            lowerContainer.classList.add('list-group-item-success');
            score++;
        } else {
            lower.innerText = '⚠️';
            lowerContainer.classList.add('list-group-item-warning');
        }

        // uppercase
        if (upperCase) {
            upper.innerText = '✅';
            upperContainer.classList.add('list-group-item-success');
            score++;
        } else {
            upper.innerText = '⚠️';
            upperContainer.classList.add('list-group-item-warning');
        }

        // number

        if (containsNumber) {
            number.innerText = '✅';
            numberContainer.classList.add('list-group-item-success');
            score++;
        } else {
            number.innerText = '⚠️';
            numberContainer.classList.add('list-group-item-warning');
        }

        // special

        if (containsSpecialCharacter) {
            special.innerText = '✅';
            specialContainer.classList.add('list-group-item-success');
            score++;
        } else {
            special.innerText = '⚠️';
            specialContainer.classList.add('list-group-item-warning');
        }

        // final strength

        if (score >= 5) {
            strength.innerHTML = " strong";
            strength.style.color = "#26d730";
            pass.style.borderColor = "#26d730";
        } else if (score >= 3) {
            strength.innerHTML = " moderate";
            strength.style.color = "orange";
            pass.style.borderColor = "orange";
        } else {
            strength.innerHTML = " weak";
            strength.style.color = "#ff5925";
            pass.style.borderColor = "#ff5925";
        }
    });
}

function toggle() {
    const password = document.getElementById("password");
    const eye = document.getElementById("toggle");

    if (password.getAttribute("type") === "password") {
        password.setAttribute("type", "text");
        eye.style.color = "#000000";
    } else {
        password.setAttribute("type", "password");
        eye.style.color = "#808080";
    }
}

validatePassword(pass);