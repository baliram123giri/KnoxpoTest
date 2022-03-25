import axios from "axios"
import * as types from "./Action-Type"
import swal from 'sweetalert'
const config = require("../config.json")
//create the actions
 const userRepo = (repo)=>{
     return{
         type:types.USER_REPO,
         payload:repo
     }
 }
//addRepo show hide box
 export const showBox = ()=>{
     return{
         type:types.SHOW_BOX
     }
 }
 export const hideBox = ()=>{
     return{
         type:types.HIDE_BOX
     }
 }

//repoDetails
const repoDetails = (data)=>{
    return {
        type:types.REPO_DETAILS,
        payload:data
    }
}
//repoIssuesDetails
const repoIssuesDetails = (data)=>{
    return {
        type:types.REPO_ISSUES_DETAILS,
        payload:data,
    }
}
//creating function for calling api endpoints
 export const userRepoCall = (user, repo2)=>{
     return function (dispatch){
         axios.get(`${config.host_url}/repos/${user}/${repo2}`)
         .then(res=>{
             dispatch(userRepo(res.data))
             swal("Good Job", "Repository added successfully!", "success");
         })
         .catch((e)=>{
            if(e.response.status===404){
                swal("Opps!", "Repository not found!", "error");
            }
         })
     }
 }
//creating function for calling api endpoints
 export const getRepoDetails = (user, repoName)=>{
     return function (dispatch){
         axios.get(`${config.host_url}/repos/${user}/${repoName}/branches`)
         .then(res=>{
             dispatch(repoDetails(res.data))
         })
         .catch((e)=>{
            if(e.response.status===404){
                swal("Opps!", "Repository details found!", "error");
            }
         })
     }
 }
//creating function for calling api endpoints
 export const getIssuesDetails = (user, repoName)=>{
     return function (dispatch){
         axios.get(`${config.host_url}/repos/${user}/${repoName}/issues`)
         .then(res=>{
             dispatch(repoIssuesDetails(res.data))
         })
         .catch((e)=>{
            if(e.response.status===404){
                swal("Opps!", "Repository details found!", "error");
            }
         })
     }
 }