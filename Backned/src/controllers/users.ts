import express from "express"
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users'

export const getUserbyId = async (req: express.Request, res: express.Response) => {
  try {
      const { id } = req.params;
      console.log(id)
      const user = await getUserById(id);
      console.log(user)
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
  }
}
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const deleteUser = await deleteUserById(id)

        return res.json(deleteUser)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { username ,  email , isAdmin} = req.body;

        if (!username) {
            return res.sendStatus(400)
        }
        const user = await getUserById(id)

        user.username = username
        await user.save();

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
