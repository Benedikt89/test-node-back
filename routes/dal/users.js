import User from "./User";

export const usersRepository = {
  async getUsers(search) {
    let result = await User.find();
    if (search) {
      result = await User.find({_id: new RegExp(search)});
    }
    return new Promise((resolve, reject) => {
      resolve(
        {
          count: +result.length,
          users: result.map((item) => {
            return {
              id: item.id,
              name: item.name,
              phone: item.phone,
              surname: item.surname,
            }
          })
        }
      )
    })
  },

  async getUser(search) {
    let user = await User.find({_id: search});
    if (user[0]?.id) {
      let found = user[0];
      return new Promise((resolve, reject) => {
        resolve(
          {
            id: found.id,
            name: found.name,
            phone: found.phone,
            surname: found.surname,
          }
        )
      })
    } else {
      throw new Error('Nothing Found.')
    }
  },

  async addUser(user) {
    const newUser = new User({
      name: user.name,
      phone: user.phone,
      surname: user.surname,
    });
    let result = await newUser.save();
    return new Promise(((resolve, reject) => resolve
    ({
      id: result.id,
      name: result.name,
      phone: result.phone,
      surname: result.surname,
    })))
  },

  async updateUser(newUser) {
    return await User.update({_id: newUser.id}, newUser)
  },

  async deleteUser(todoId) {
    return User.deleteOne({_id: todoId});
  },
};