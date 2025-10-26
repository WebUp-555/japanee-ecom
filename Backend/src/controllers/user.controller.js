import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import e from "express";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async(userId) => {
  try{
       const user = await User.findById(userId)
      const accessToken= user.generateAccessToken()
      const refreshToken= user.generateRefreshToken()
      user.refreshToken=refreshToken
      await user.save({validateBeforeSave:false})
      return {accessToken,refreshToken}



  }catch(error){
     throw new ApiError(500,"Something went wrong while generating refresh and access tokens")
     
  }

}

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if(
    [username,email,password].some((field)=>field?.trim()=="")
  ){
    throw new ApiError(400,"All fields are required")

  }
  const existeduser=await User.findOne({
    $or:[{username},{email}]
  })
  if(existeduser){
    throw new ApiError(409,"User already exists with is username/email");

  }

  const user=await User.create({
    username:username.toLowerCase(),
    email,
    password
  })
  
  const createdUser=await User.findById(user._id).select("-password -refreshToken -__v")

 if(!createdUser){
  throw new ApiError(500,"User registration failed")
 }
 return res
 .status(201)
 .json(new ApiResponse(201,createdUser,"User registered successfully",createdUser))

})

const login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required");
    }

    const query = { $or: [] };
    if (username) query.$or.push({ username: username.toLowerCase() });
    if (email) query.$or.push({ email: email.toLowerCase() });

    const user = await User.findOne(query);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
})
  const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{
          refreshToken:1 //this removes the refresh token from the document
        }
      },{
        new:true
      })
      const options ={
      httpOnly:true,
       secure: true
  }
      return res
      .status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(
        new ApiResponse(200, {}, "User logged out successfully")
      )
  })
  
  const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
      throw new ApiError(400,"unauthorized request")
    }


  try {
    const decodedToken=jwt.verify(incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET)
  
    const user= await User.findById(decodedToken?._id)
      if(!user){
        throw new ApiError(401,"Invalid refresh token") 
      }
       if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,"Refresh token is expired or used")
  
  }
  
  const options ={
      httpOnly:true,
      secure: true
  }
   const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user._id)
   return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken: newRefreshToken
        },
        "Access token refreshed successfully"
      )
    )
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid refresh token"
    )
  }


  })

  const changeCurrentPassword=asyncHandler(async(req,res)=>{
    const{oldPassword,newPassword}=req.body
    const user=await User.findById(req.user?._id)
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
      throw new ApiError(400,"Invalid old password")
    }
     user.password = newPassword
     await user.save({validateBeforeSave:false})

     return res
     .status(200)
     .json(new ApiResponse(200,{},"Password changed Sucessfully "))

  })

  const getCurrentUser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(200,req.user,"current user fetched successfully")
  })


const updateAccountDetails=asyncHandler(async(req,res)=>{
  const{username,email}=req.body

  if(!username || !email){
    throw new ApiError(400,"All fields are required")
  }
   const user= User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        username:username,
        email:email
      }
    },
    {new:true}
  
  ).select("-password")
  return res
  .status(200)
  .json(new ApiResponse (200,user,"Account details updated successfully"))

})
    




export{
    generateAccessTokenAndRefreshToken,
    register,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails

}