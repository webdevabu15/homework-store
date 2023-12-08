import 'react-loading-skeleton/dist/skeleton.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../services/api';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Article.scss'
import {useValue} from "../../context/AppProvider"

const Article = () => {
  const params = useParams()
  const [state] = useValue()
  const [article, setArticle] = useState({})
  const [userdata, setUserdata] = useState([])
  const [commentValue, setCommentValue] = useState("")
  const [newComment, setNewComment] = useState(null)
  const [allComments, setAllComments] = useState([])

  useEffect(() => {
      instance(`api/posts/${params.id}`)
      .then(res => {
      setArticle(res.data)})

      instance(`api/users/${state.auth.user_id}`)
      .then(res => setUserdata(res.data.data))
      .catch(err => console.log(err))

  }, [])
  const handlePostComment = (e) => {
    e.preventDefault()

    instance.post(`/api/comments`,{
      description: commentValue,
      post: params.id
    })
    .then(res => setNewComment(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    instance(`/api/comments`)
    .then(res => setAllComments(res.data.data))
    .catch(err => console.log(err))
  },[newComment])

  return (
    <div className='wrapper'>
      <div className="img">
        <img src={article.image || <Skeleton/>} alt="" />
      </div>
      <div className="info">
        <h1>{article.title ||  <Skeleton count={10}/>}</h1>
        <p>{article.description || <Skeleton />}</p>
      </div>
      <form className='article__comment-form' onSubmit={handlePostComment}>
        <div className="article__comment-user">
          {userdata && <h2>{userdata.firstname?.slice(0,1)}</h2>}
        </div>
        <div className='article__comment-wrapper'>
        <textarea cols="30" rows="10" value={commentValue} className='article__comment' onChange={(e) => setCommentValue(e.target.value)}>
        </textarea>
        <button type='submit'>Comment</button>
        </div>
      </form>
      {
        allComments.length > 0 &&
         <div className="article__comments">
          {
            allComments.map(comment => <div className="article__comment-item" key={comment._id}>
                 <div className="article__comment-user">
                    <h2>{comment.description}</h2>
                 </div>
              </div>
            )
          }
         </div>
      }
    </div>
  )
}

export default Article