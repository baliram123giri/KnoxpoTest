import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {getRepoDetails, showBox, getIssuesDetails} from '../../redux/Actions'
import AddRepo from "./AddRepo"
import Loader from './Loader'
export default function Users() {
//state area
  const {repo, loading, repoDetails, repoIssues} = useSelector(state => state.data)
  const [showDetails, setShowDetails] = useState(false)
  const [issue, setIssue] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  //useEffect Calling
//function area
  const repoDetailsHandler = (user, repo)=>{
    setIssue(false)
    dispatch(getRepoDetails(user, repo))
    dispatch(getIssuesDetails(user, repo))
    setShowDetails(true)
  }

  //issue showHandler
  const issueShow = ()=>{
    setIssue(true)
  }
  return (
    <>
    <AddRepo  />
  
      <div className="container my-3 my-md-5 user_repo">
        <div className="info ">
            <div className="row bg-white shadow border border-1 border-secondary">
                <div className="title text-center bg-black py-3 w-100">
                    <h5 className='text-white w-100 m-0 '>GITHUB BROWSER</h5>
                </div>
                <div className="col-12 col-md-5 px-0  border-end position-relative">
                    <div className="list position-relative">
                    {isLoading && <Loader/>}
                        <ul className="nav flex-column">
                            {repo && repo.map((data, index)=>{
                              console.log(repo)
                              return(
                                <li onClick={()=> repoDetailsHandler(data.owner.login, data.name) } className="nav-item  border-bottom" key={index}>
                                   <a className="nav-link text-black fs-6 fw-bold" href="#">{data.name}</a>
                                </li>
                              )
                            })}
                        </ul>
                    </div>
                    <div onClick={()=>dispatch(showBox())} className="add_repo rounded-pill d-flex justify-content-center align-items-center position-absolute">
                         <span class="material-icons-outlined text-white">add</span>
                    </div>
                </div>
                <div className="col-12 col-md-7 my-2">
                {isLoading && <Loader/>}
                   {showDetails && (
                   <>
                    <div className="text-end">
                         <button className='btn btn-danger btn-sm '> Delete</button>  
                   </div>
                   <div className="repo_details_box">
                      <div className="buttons d-flex">
                        <div class="dropdown me-1">
                          <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            BRANCHES
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {repoDetails && repoDetails.map((data, index)=>{
                              return(
                                <li key={index}><a class="dropdown-item" href="#">{data.name}</a></li>
                              )
                            })}
                          </ul>
                        </div>  
                        <button class="btn btn-outline-secondary ms-1" type="button" onClick={issueShow} > ISSUES</button>
                      </div>
                      {issue && 
                        <div className="repo_issuse pe-3">
                        {
                        repoIssues.map((data, index)=>{
                          return(
                              <div key={index} className="issuses_details border-bottom py-2 d-flex justify-content-between align-items-center">
                                <div className="titile my-">
                                  <h6 className='fs-7 fw-bold m-0'>{data.title}</h6>
                                </div>
                                <div className="author d-flex align-items-center ">
                                  <div className="avtar rounded-pill me-2"><img src={data.user.avatar_url} className='img-fluid  rounded-pill' alt="" /></div>
                                  <div className="name"><span className='fs-8'>{data.user.login}</span></div>
                                </div>
                            </div>
                          )
                        })
                      }
                      {repoIssues.length===0 && (
                      <>
                        <div className="text-center text-success">
                          <h6>No issues found!</h6>
                        </div>
                      </>
                      )}
                      </div>
                       }
                   </div>
                     </>
                   )}
                </div>
                
            </div>
        </div>
      </div>
    </>
  )
}
