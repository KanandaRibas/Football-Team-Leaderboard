import bcrypt = require('bcryptjs');
import User from '../database/models/UserModel';
import { IUser } from '../Interfaces/IUser';

class UserService {
  constructor(private userModel = User) { }

  public async login(email: string, password: string): Promise<Omit<IUser, 'password'> | null> {
    const userLoged = await this.userModel.findOne({ where: { email } });
    if (userLoged) {
      const verifypassword = bcrypt.compareSync(password, userLoged.password);
      if (verifypassword) return userLoged;
      return null;
    }
    return userLoged;
  }
}

export default UserService;
