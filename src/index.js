var employeeList = [];

function createEmployee(){
    if(!validateForm()) return;
// DOM từng thuộc tính
    var id = document.getElementById("tknv").value.trim();
    var fullName =  document.getElementById("name").value.trim();
    var email =  document.getElementById("email").value.trim();
    var passWord =  document.getElementById("password").value.trim();
    var datepicker =  document.getElementById("datepicker").value.trim();
    var salary =  +document.getElementById("luongCB").value.trim();
    var classEmployee =  document.getElementById("chucvu").value;
    var hourWork =  +document.getElementById("gioLam").value.trim();

  // 2. check trùng id
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].employeeId === id) {
      alert("Id đã tồn tại");
      return;
    }
  }

// Tạo mảng đối tượng nhân viên
    var employee = new Employee(
    id, 
    fullName,
    email,
    passWord,
    datepicker,
    salary,
    classEmployee,
    hourWork);
// Thêm nhân viên vào danh sách
    employeeList.push(employee);
    console.log(employeeList);

// In thông tin ra màn hình
    renderEmployee();

// Lưu danh sách sinh viên hiện tại xuống local
    saveEmployeeList();
} 

function renderEmployee(data){
    data = data || employeeList;
    var html = "";
    for ( var i = 0; i < data.length; i++){
        html += `<tr>
            <td>${data[i].employeeId}</td>
            <td>${data[i].fullName}</td>
            <td>${data[i].email}</td>
            <td>${data[i].datepicker}</td>
            <td>${data[i].classEmployee}</td>
            <td>${data[i].calcSalary()}</td>
            <td>${data[i].rankEmployee()}</td>
            <td>
                  <button 
                    onclick="deleteEmployee('${data[i].employeeId}')" 
                    class="btn btn-danger">Xoá</button>
            <td>
                 </tr>`
    }
    document.getElementById("tableDanhSach").innerHTML = html;
}

function saveEmployeeList(){
    var employeeListJson = JSON.stringify(employeeList);
    localStorage.setItem("SL",employeeListJson);
}

function getEmployeeList(){
    var employeeListJson = localStorage.getItem("SL");
    if(!employeeListJson) return [];
    return JSON.parse(employeeListJson);
}

window.onload = function(){
   var employeeListFromLocal = getEmployeeList();
   employeeList = mapEmployeeList(employeeListFromLocal);
   renderEmployee();
}

function mapEmployeeList(local){
    var result = [];
    for ( var i= 0; i < local.length; i++){
        var oldEmployee = local[i];
        var newEmployee = new Employee(
            oldEmployee.employeeId,
            oldEmployee.fullName,
            oldEmployee.email,
            oldEmployee.passWord,
            oldEmployee.datepicker,
            oldEmployee.salary,
            oldEmployee.classEmployee,
            oldEmployee.hourWork
        );
        result.push(newEmployee);
    }
    return result;
}

function deleteEmployee(id){
    var index = findById(id);
    if(index === -1){
        return alert("Id không tồn tại");
    }
    employeeList.splice(index,1);

    renderEmployee();

    saveEmployeeList();
}

function findById(id){
    for( var i = 0; i < employeeList.length; i++){
        if(employeeList[i].employeeId === id){
            return i;
        }
    }
    return -1;
}

function getUpdateEmployee(){
    var id =  document.getElementById("tknv").value;
    var index =  findById(id);
    if(index === -1){
        return alert("Id không tồn tại");
    }

    var employee = employeeList[index];

    // document.getElementById("tknv").value = employee.employeeId;
    document.getElementById("name").value = employee.fullName;
    document.getElementById("email").value = employee.email;
    document.getElementById("password").value = employee.passWord;
    document.getElementById("datepicker").value = employee.datepicker;
    document.getElementById("luongCB").value = employee.salary;
    document.getElementById("chucvu").value = employee.classEmployee;
    document.getElementById("gioLam").value = employee.hourWork;
}

function resetForm(){
    document.getElementById("form").reset();
}


function updateEmployee(){
    var id = document.getElementById("tknv").value.trim();
    var fullName =  document.getElementById("name").value.trim();
    var email =  document.getElementById("email").value.trim();
    var passWord =  document.getElementById("password").value.trim();
    var datepicker =  document.getElementById("datepicker").value.trim();
    var salary =  +document.getElementById("luongCB").value.trim();
    var classEmployee =  document.getElementById("chucvu").value;
    var hourWork =  +document.getElementById("gioLam").value.trim();

    var index = findById(id);
    var employee = employeeList[index];

    employee.fullName = fullName;
    employee.email = email;
    employee.passWord = passWord;
    employee.datepicker = datepicker;
    employee.salary = salary;
    employee.classEmployee = classEmployee;
    employee.hourWork = hourWork;

    renderEmployee();
    saveEmployeeList();


    resetForm();
}

// Hàm đã chạy

function searchEmployee(e){
    var keyWord = e.target.value.toLowerCase().trim();
    var result = [];
    console.log(keyWord);
    for( var i = 0; i < employeeList.length; i++){
        if(employeeList[i].rankEmployee().includes(keyWord)){
            result.push(employeeList[i]);
        }
    }
    console.log(result);

    renderEmployee(result);
}


// ---------------- VALIDATION -----------------//

function validateForm(){
    var formValid = validateId() && validateName() && 
                    validEmail() && validatePass() &&
                    validateDate() && validateSalary() && 
                    validatePosition() && validateHour();
    return formValid;
}
function validateId(){
    // in lỗi
    var employeeId = document.getElementById("tknv").value;
    var alert = document.getElementById("tbTKNV");
    alert.style.display = "block";

    // Check rỗng
    if (!employeeId) {
        alert.innerHTML = "Tài khoản không được để trống";
        return false;
    }
    
    if (employeeId.length < 4 || employeeId.length > 6) {
        alert.innerHTML = "Tài khoản phải từ 4 - 6 ký tự";
        return false;
    }
    alert.innerHTML = "";
    return true;
}
function validateName(){
    // in lỗi
    var fullName = document.getElementById("name").value;
    var alert = document.getElementById("tbTen");
    alert.style.display = "block";
    // Kiểm tra rỗng
    if (!fullName) {
        alert.innerHTML = "Tên không được để trống";
        return false;
    }

    // Kiểm tra định dạng
    let regex = /^[1-9]{2,}/;
    if (regex.test(fullName)) {
        alert.innerHTML = "Tên không được có ký tự số";
        return false;
    }
    alert.innerHTML = "";
    return true;
}
function validEmail(){
    // in lỗi
    var email = document.getElementById("email").value;
    var alert = document.getElementById("tbEmail");
    alert.style.display = "block";

    // Kiểm tra rỗng
    if (!email) {
        alert.innerHTML = "Email không được để trống"
        return false;
    }

    // Kiểm tra định dạng 
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    if (!regex.test(email)) {
        alert.innerHTML = "Email không đúng định dạng"
        return false;
    }

    alert.innerHTML = "";
    return true;
}
function validatePass(){
    // in lỗi
    var passWord = document.getElementById("password").value;
    var alert = document.getElementById("tbMatKhau");
    alert.style.display = "block";

    // Kiểm tra rỗng
    if (!passWord) {
        alert.innerHTML = "Mật khẩu không được để trống"
        return false;
    }

    // Kiểm tra đinh dạng mật khẩu
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(passWord)) {
        alert.innerHTML = "Mật khẩu từ 6-10 ký tự (chứa ký tự số, ký tự in hoa, ký tự đặc biệt)"
        return false;
    }
    alert.innerHTML = "";
    return true;
}
function validateDate(){
    // in lỗi
    var datepicker = document.getElementById("datepicker").value;
    var alert = document.getElementById("tbNgay");
    alert.style.display = "block";

    // Kiểm tra rỗng
    if (!datepicker) {
        alert.innerHTML = "Ngày làm không để trống";
        return false;
    }

    // Kiểm tra định dạng ngày làm
    let regex = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
    if (!regex.test(datepicker)) {
        alert.innerHTML = "Ngày làm định dạng mm/dd/yyyy";
        return false;
    }
    alert.innerHTML = "";
    return true;
}
function validateSalary(){
    // in lỗi
    var salary = document.getElementById("luongCB").value;
    var alert = document.getElementById("tbLuongCB");
    alert.style.display = "block";

    // Kiểm tra rỗng
    if (!salary) {
        alert.innerHTML = "Lương không được để trống"
        return false;
    }

    // Kiểm tra số tiền nhập vào
    if (salary < 1000000 || salary > 20000000) {
        alert.innerHTML = "Lương từ 1 000 000 - 20 000 000"
        return false;
    }
    alert.innerHTML = "";
    return true;
}
function validatePosition(){
    // in lỗi
    var classEmployee = document.getElementById("chucvu").value;
    var alert = document.getElementById("tbChucVu");
    alert.style.display = "block";

    // Kiểm tra chức vụ
    if (classEmployee === "Chọn chức vụ") {
        alert.innerHTML = "Chọn chức vụ hợp lệ";
        return false;
    }
    alert.innerHTML = "";
    return true;
}
function validateHour(){
    // in lỗi
    var hourWork = document.getElementById("gioLam").value;
    var alert = document.getElementById("tbGiolam");
    alert.style.display = "block";

    // Kiểm tra rỗng
    if (!hourWork) {
        alert.innerHTML = "Giờ làm không để trống"
        return false;
    }

    // Kiểm tra số giờ làm
    if (hourWork < 80 || hourWork > 200) {
        alert.innerHTML = "Giờ làm hợp lệ 80 - 200"
        return false;
    }
    alert.innerHTML = "";
    return true;
}