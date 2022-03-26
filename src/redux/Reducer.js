import * as types from "./Action-Type"

//initial state
   const initialSate = {
       repo:[],
       repoDetails:[],
       repoIssues:[],
       commitDetails:[],
       showBox:true
   }
//creating the reducer 
    export const reducer = (state = initialSate, action)=>{
             
        switch(action.type){
            case types.USER_REPO:
                return{
                    ...state,
                    repo:state.repo.concat(action.payload)
                }
            case types.SHOW_BOX:
                return{
                    ...state,
                    showBox:false
                }
            case types.REPO_ISSUES_DETAILS:
                return{
                    ...state,
                    repoIssues:action.payload
                }
            case types.REPO_DETAILS:
                return{
                    ...state,
                    repoDetails:action.payload
                }
            case types.COMMITS_DETAILS:
                return{
                    ...state,
                    commitDetails:action.payload
                }
            case types.DELETE_REPO:
                return{
                    ...state,
                    repo:state.repo.filter((items)=>items.name!==action.payload)
                }
            case types.HIDE_BOX:
                return{
                    ...state,
                    showBox:true

                }
            default :
                return state
        }
    }