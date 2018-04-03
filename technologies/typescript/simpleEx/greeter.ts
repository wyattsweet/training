class Student {
  fullName: string
  constructor(
    public firstName: string,
    public middleInit: string,
    public lastName: string
  ) {
    this.fullName = `${firstName} ${middleInit} ${lastName}`
  }
}

interface Person {
  firstName: string
  lastName: string
}

const greeter = (person: Person) =>
  `Hello, ${person.firstName} ${person.lastName}`

let user = new Student('Jane', 'M.', 'Jackson')

document.body.innerHTML = greeter(user)
