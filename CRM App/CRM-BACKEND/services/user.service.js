import { client } from '../index.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export async function createUser(data) {
    return await client.db("CRM-App").collection("users").insertOne(data);
}
export async function addToken(data) {
    const ret = await client.db("CRM-App").collection("sessionTokens").insertOne(data);
        //    await client.db("CRM-App").collection("sessionTokens").createIndex({ "DateTime": 1} , {expireAfterSeconds :900})
           return ret
}

export async function checkString(data) {
    return client.db("CRM-App").collection("sessionTokens").findOne({randString:data});          
}

export async function deleteOneString(data) {
    return client.db("CRM-App").collection("sessionTokens").deleteOne({randString:data});          
}

export async function getProfilePic(data) {
    return client.db("CRM-App").collection("users").findOne({_id:new ObjectId(data)},{projection:{imageUrl:1,firstName:1}});          
}

export async function changePasswordInDB(data) {
    return await client.db("CRM-App").collection("users").updateOne({email:data.email},{$set:{password:data.password}});
}

export async function getUsers(data) {
    return await client.db("CRM-App").collection("users").findOne({email:data});
}
export async function updateVerification(data) {
    return await client.db("CRM-App").collection("users").updateOne({email:data},{$set:{emailVerified:"yes"}});
}

export async function getDataFromSessionCollection(data) {
    return await client.db("CRM-App").collection("sessionTokens").findOneAndDelete({token:data});
}

export async function generateHashedPassword(password){
    const NO_OF_ROUNDS = 10 ;
    const salt =await bcrypt.genSalt(NO_OF_ROUNDS)
    const hashedPassword =await bcrypt.hash(password , salt);
    return hashedPassword
  }