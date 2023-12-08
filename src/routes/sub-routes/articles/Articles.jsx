import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import instance from "../../../services/api"
import "./Articles.scss"
import { useParams, Link } from "react-router-dom"
import {useValue} from "../../../context/AppProvider"

const Articles = () => {
  // const [state] = useValue()
  const { id } = useParams()
  const [post, setPost] = useState([])
  const btnRef = useRef('')
  useEffect(() => {
    instance(`api/posts`)
    .then(res => setPost(res.data.data))
    .then(err => console.log(err))
  },[])
  
  const deletedProduct = (id) => {
    instance.delete(`api/posts/${id}`)
  }

  let userId = localStorage.getItem('user_id')

  return (
    <div className='articles'>
      {
        // post ? post?.map((product,i) => 
          // <div key={product._id} id={product._id} className="articles__card">
          //   <img src={product.image} alt="" />
          //   <h3>{product.title}</h3>
          //   <p>{product.description.slice(0,100)}</p>
          //   <div className='settings'>
          //     <button ref={btnRef} onClick={() => deletedProduct(product._id)} className='delete-btn'>delete</button>
          //     <button className='edit-btn'>edit</button>
          //   </div>
          // </div>
        // ): null
        post.filter(product => product.author === userId).map(produc => (
          <div key={produc._id} id={produc._id} className="articles__card">
          <img src={produc.image} alt="" />
          <h3>{produc.title}</h3>
          <p>{produc.description.slice(0,100)}</p>
          <div className='settings'>
            <button ref={btnRef} onClick={() => deletedProduct(produc._id)} className='delete-btn'>delete</button>
            <button className='edit-btn'>edit</button>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default Articles