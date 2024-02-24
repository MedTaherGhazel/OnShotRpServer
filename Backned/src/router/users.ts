import { deleteUser, getAllUsers, updateUser } from '../controllers/users'
import express from "express"
import { isAdmin, isAuthenticated, isOwner } from '../middlewares'


export default (router: express.Router)=>{
    router.get('/users',isAdmin, getAllUsers)
    router.delete('/user/:id',isAuthenticated, deleteUser)
    router.patch('/user/:id', isAuthenticated, updateUser)
}
