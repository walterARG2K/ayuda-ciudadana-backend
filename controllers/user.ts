import { User } from "../models/index";

interface propsUpdate {
  full_name: string;
}

export const getUserInfo = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    return user?.dataValues;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (newData: propsUpdate, userId: number) => {
  try {
    const { full_name } = newData;
    const userUpdated = await User.update({ full_name }, { where: { id: userId } });
    return userUpdated;
  } catch (error) {
    throw error;
  }
};
