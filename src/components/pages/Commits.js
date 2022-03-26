import React from 'react'
import { useSelector } from 'react-redux'

export default function Commits({branch}) {
//state area
 const {commitDetails} = useSelector(state => state.data)

  return (
    <div className="container my-2 my-md-3 user_repo">
    <div className="info ">
        <div className="row bg-white shadow ">
            <div className="title text-center bg-white py-3 shadow-sm w-100">
                <h6 className='text-black w-100 m-0 text-uppercase'>COMMITS: {branch}</h6>
            </div>
            <div className="col-12 my-2 p-0 ">
               <div className="commits_list_box ">
                    {
                      commitDetails.map((data, index)=>{
                         const {name, date} = data.commit.author
                         var curr = new Date(date).toDateString().split(" ")
                       
                        return(
                          <div key={index} className="commit_list bg-white shadow-sm rounded p-4 py-3 my-3 border border-seconday ">
                            <div className="date_commit">
                            <span className='fs-6 fw-bold'>{`${curr[2]} ${curr[1]} ${curr[3]}`}</span>
                            <p className='fs-7'>{data.commit.message}</p>
                            </div>
                            <div className="author d-flex align-items-center">
                            <span className="material-icons-outlined ">account_circle</span>
                            <span className='text-uppercase fs-7 fw-bold'>{name}</span>
                            </div>
                          </div>
                        )
                      })
                    }
               </div>
            </div>
        </div>
    </div>
  </div>
  )
}
