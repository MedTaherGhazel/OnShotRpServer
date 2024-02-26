import { deleteUser, getAllUsers, getUserbyId, updateUser } from '../controllers/users'
import express from "express"
import { isAdmin, isAuthenticated, isOwner } from '../middlewares'
import { getUserById } from 'db/users'


export default (router: express.Router)=>{
    router.get('/users',isAuthenticated,isAdmin, getAllUsers)
    router.delete('/user/:id',isAuthenticated, isOwner, deleteUser)
    router.put('/users/:id', updateUser)
    router.get('/users/:id' ,getUserbyId)

}
