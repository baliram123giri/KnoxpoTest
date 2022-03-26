import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import {getRepoDetails, showBox, getIssuesDetails, getCommitDetails, deleteRepo} from '../../redux/Actions'
import AddRepo from "./AddRepo"
import Commits from './Commits'

export default function Users() {
//state area
  const [showDetails, setShowDetails] = useState(false)
  const [issue, setIssue] = useState(false)
  const [branchData, setBranchData] = useState({user:"", repo:""})
  const [commitBoxShow, setCommitBoxShow] = useState(false)
  const [branch, setBranch] = useState("")
  const dispatch = useDispatch()
  const {repo,  repoDetails, repoIssues} = useSelector(state => state.data)


//function area
  const repoDetailsHandler = (user, repo)=>{
    setIssue(false)
    setBranch("BRANCHES")
    dispatch(getRepoDetails(user, repo))
    dispatch(getIssuesDetails(user, repo))
    setBranchData({...branchData, user:user, repo:repo})
    setShowDetails(true)
    setCommitBoxShow(false)
  }

  //issue showHandler
  const issueShow = ()=>{
    setIssue(true)
    setCommitBoxShow(false)
  }

  //branchHandler
  const branchHandler = (e)=>{
    setBranch(e.target.value)
    if( e.target.value!==""){
      const {user, repo} = branchData
      dispatch(getCommitDetails(user,repo, e.target.value))
      setCommitBoxShow(true)
    }else{
      setCommitBoxShow(false)
    }
  }
 
  //removeBranchHandler
  const removeBranchHandler = () =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Repository file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRepo(branchData.repo))
        setShowDetails(false)
        swal("Repository has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Repository file is safe!");
      }
    });
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
                {/* repo list box */}
                <div className="col-12 col-md-5 px-0  border-end position-relative">
                    <div className="list position-relative">
                        <ul className="nav flex-column">
                            {repo && repo.map((data, index)=>{
                              return(
                                <li onClick={()=> repoDetailsHandler(data.owner.login, data.name) } className="nav-item  border-bottom pb-2 repoList"  key={index}>
                                   <span className="nav-link text-black fs-6 fw-bold py-0 " href="#">{data.name}</span>
                                   <span className='fs-8 px-3'>{data.description || "No Description"}</span>
                                </li>
                              )
                            })}
                        </ul>
                    </div>
                    <div onClick={()=>dispatch(showBox())} className="add_repo rounded-pill d-flex justify-content-center align-items-center position-absolute">
                         <span className="material-icons-outlined text-white">add</span>
                    </div>
                </div>

                {/* repoDetails Show Box  */}
                <div className="col-12 col-md-7 my-2">
                   {showDetails && (
                   <>
                    <div className="text-end">
                         <button className='btn btn-danger btn-sm ' onClick={removeBranchHandler}> Delete</button>  
                   </div>
                   <div className="repo_details_box">
                      <div className="buttons d-flex">
                      <select selected value={branch} onClick={()=>setIssue(false)} onChange={branchHandler} className="form-select w-25 btn-outline-secondary text-start btn" >
                        <option  value={""}> BRANCHES</option>
                        {repoDetails && repoDetails.map((data, index)=>{
                                return(
                                  <option key={index} value={data.name}>{data.name}</option>
                                )
                              })}
                       </select>
                        <button className="btn btn-outline-secondary ms-1" type="button" onClick={issueShow} > ISSUES</button>
                      </div>
                      {commitBoxShow ? <Commits/> : <>
                      {issue && 
                        <div className="repo_issuse dono pe-3">
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

                      {/* if nor repository  */}
                      {repoIssues.length===0 && (
                      <>
                        <div className="text-center text-success">
                          <h6>No issues found!</h6>
                        </div>
                      </>
                      )}
                      </div>
                       }
                      </>}
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
