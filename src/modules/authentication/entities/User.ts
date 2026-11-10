// export class User { 
//     id: string;
//     name: string;
//     email: string;
//     password: string;

//     constructor(id: string, name: string, email: string, password: string) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.password = password;
//     }
// }

export class User {
    constructor(
        public name: string,
        public email: string,
        public password_hash: string
    ) {}
}

