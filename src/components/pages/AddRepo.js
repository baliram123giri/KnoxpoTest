import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideBox } from '../../redux/Actions'
import { userRepoCall } from '../../redux/Actions'
export default function AddRepo(props) {
//statte area 
const [repo, setRepo] = useState({})
const dispatch = useDispatch()
const {showBox} = useSelector(state => state.data)

//function area
 const repoHandler = (e)=>{
     const {name, value} = e.target
     setRepo({...repo, [name]:value})
 }
 const repoSubmit = (e)=>{
     e.preventDefault()
     dispatch(userRepoCall(repo.owner, repo.repos))
     dispatch(hideBox())
     setRepo({})
 }
  return (
    <div className={`add_repo_box ${showBox?"d-none":""}`}>
        <form onSubmit={repoSubmit} className='bg-white p-4 shadow w-25 mx-auto my_form ' >
            <div className="close ms-auto" onClick={()=>dispatch(hideBox())}>
                <span class="material-icons-outlined">close</span>
            </div>
            <div className="text-center mb-3">
                <h6>ADD NEW REPOSITORY</h6>
            </div>
            <div className="mb-3">
                <label htmlFor="owner" className="form-label text-start">Owner/Organization</label>
                <input required name="owner" value={repo.owner || ""} onChange={repoHandler} type="text" className="form-control"  />
            </div>
            <div className="mb-3">
                <label htmlFor="repos" className="form-label text-start">Repository Name</label>
                <input required name="repos" value={repo.repos || ""} onChange={repoHandler} type="text" className="form-control"  />
            </div>
            <div className="text-center">
            <button type="submit" className="btn btn-dark px-5 rounded-0">ADD</button>
            </div>
            
        </form>
    </div>
  )
}
