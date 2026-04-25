export default class UserEntity {
    constructor({ id, email, password, role }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role || 'user';
    }
}
