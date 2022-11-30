function Employee(id, fullName, email, passWord, datepicker, salary, classEmployee, hourWork) {
    this.employeeId = id;
    this.fullName = fullName;
    this.email = email;
    this.passWord = passWord;
    this.datepicker= datepicker;
    this.salary = salary;
    this.classEmployee = classEmployee;
    this.hourWork = hourWork;
    // Director, Manager, Employee

    this.calcSalary = function (){
        if(this.classEmployee === "Sếp"){
            return calcSalary = this.salary*3; 
        } if(this.classEmployee === "Trưởng Phòng"){
            return calcSalary = this.salary*2 ;
        } else {
            return calcSalary = this.salary ;
        }
    };

    this.rankEmployee = function(){
        if(this.hourWork < 160){
            rank = "nhân viên trung bình";
            return rank;
        } else if(this.hourWork < 176){
            rank = "nhân viên khá";
            return rank;
        }else if(this.hourWork < 192){
            rank = "nhân viên giỏi";
            return rank;
        } else{
            rank = "nhân viên xuất sắc";
            return rank;
        }
    }
}