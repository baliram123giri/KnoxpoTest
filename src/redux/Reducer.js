import * as types from "./Action-Type"

//initial state
   const initialSate = {
       repo:[],
       repoDetails:[],
       repoIssues:[],
       loading:false,
       showBox:true
   }
//creating the reducer 
    export const reducer = (state = initialSate, action)=>{
             
        switch(action.type){
            case types.USER_REPO:
                return{
                    ...state,
                    repo:state.repo.concat(action.payload),
                    loading:false
                }
            case types.SHOW_BOX:
                return{
                    ...state,
                    showBox:false
                }
            case types.REPO_ISSUES_DETAILS:
                return{
                    ...state,
                    repoIssues:action.payload,
                    loading:true
                }
            case types.REPO_DETAILS:
                return{
                    ...state,
                    repoDetails:action.payload,
                    loading:true
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