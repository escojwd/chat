import bcrypt from "bcryptjs";
import database from "./firebase";

const modalWrap = document.querySelector(".modal"); // modal
const closeBtn = document.querySelector(".close"); // modal closer
const openBtn = document.querySelector(".oops-btn"); // back to modal
const registMenu = document.querySelector(".regist-menu"); // registr form btn
const registForm = document.querySelector(".regist-form"); // registr btn
const registerBtn = document.querySelector(".register-btn"); //register btn
const loginMenu = document.querySelector(".login-menu"); // login form btn
const loginForm = document.querySelector(".login-form"); // login btn
const headerTitle = document.querySelector(".title"); // title
const registUsername = document.querySelector(".regist-username");
const registEmail = document.querySelector(".regist-email");
const registPsw = document.querySelector(".regist-psw");
const repeatPsw = document.querySelector(".repeat-psw");

const loginUsername = document.querySelector(".login-username");
const loginPwd = document.querySelector(".login-pwd");
const loginBtn = document.querySelector(".login-btn");

let users = [];
window.users = users;

database
  .ref()
  .child("users")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      users = snapshot.val();
      window.users = users;
    }
  });

const generateId = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

let loginedUser = false;

registerBtn.addEventListener("click", creatAccount);
loginBtn.addEventListener("click", userLogin);

registMenu.addEventListener("click", () => {
  if (registForm.style.display === "block") {
    registForm.style.display = "none";
    return;
  }
  registForm.style.display = "block";
  loginForm.style.display = "none";
});

loginMenu.addEventListener("click", () => {
  if (loginForm.style.display === "block") {
    loginForm.style.display = "none";
    return;
  }
  loginForm.style.display = "block";
  registForm.style.display = "none";
});

openBtn.addEventListener("click", () => {
  modalWrap.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modalWrap.style.display = "none";
  headerTitle.style.display = "block";
});

// why it's not working??
// function changeDisplay(el, stl) {
//   el.style.display = stl;
// }

function RegistredUser(username, email, password) {
  this.id = generateId();
  this.username = username;
  this.email = email;
  this.password = password;
}

function creatAccount() {
  if (
    registUsername.value === "" ||
    registEmail.value === "" ||
    registPsw.value === "" ||
    repeatPsw.value === "" ||
    registPsw.value !== repeatPsw.value
  ) {
    alert("Something went wrong");
    return;
  }
  bcrypt.hash(registPsw.value, 12).then((hashPassword) => {
    const newUser = new RegistredUser(
      registUsername.value,
      registEmail.value,
      hashPassword
    );
    users.push(newUser);
    saveToFirebase(newUser);
    alert("You have an account... please Log In");
    emptyInputs();
    loginForm.style.display = "block";
    registForm.style.display = "none";
  });
  //   console.log("we save your info");
}

function userLogin() {
  if (loginUsername.value === "" || loginPwd.value === "") {
    alert("fill the fields");
    loginUsername.value = "";
    loginPwd.value = "";
  }

  let currentUser;

  for (const key in users) {
    if (users[key].username === loginUsername.value) {
      currentUser = users[key];
      break;
    }
  }

  // console.log(users);

  if (!currentUser) {
    alert("No such user");
    loginUsername.value = "";
    loginPwd.value = "";
    return;
  }

  bcrypt.compare(loginPwd.value, currentUser.password).then((res) => {
    if (res) {
      sessionStorage.setItem("logged", loginedUser);
      window.location.href = "./index.html";
    } else {
      alert("something is wrong");
    }
  });
}

// function checkValidation() {}

// function logUsers(array) {
//   console.log(array);
// }

function saveToFirebase(el) {
  database.ref("users/" + el.id).set(el);
  // localStorage.setItem("users", JSON.stringify(el));
}

function emptyInputs() {
  console.log("asdas");
  registUsername.value = "";
  registEmail.value = "";
  registPsw.value = "";
  repeatPsw.value = "";
  registPsw.value = "";
  repeatPsw.value = "";
}
