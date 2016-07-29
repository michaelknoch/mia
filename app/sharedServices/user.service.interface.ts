
export interface IUserService {
    login(mail: String, password: String)
    logout();
    register(mail: String, password: String, name: String, surname: String);
    getLocalMe();
    setUser(user: any);
    setSystem(system: any);
}
