var Student = /** @class */ (function () {
    function Student(firstName, middleInit, lastName) {
        this.firstName = firstName;
        this.middleInit = middleInit;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInit + " " + lastName;
    }
    return Student;
}());
var greeter = function (person) {
    return "Hello, " + person.firstName + " " + person.lastName;
};
var user = new Student('Jane', 'M.', 'Jackson');
document.body.innerHTML = greeter(user);
