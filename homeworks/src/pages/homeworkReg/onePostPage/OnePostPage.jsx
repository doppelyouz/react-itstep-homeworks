import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import devAvatar from '../../../images/defAvatar.jpg';
import ProfileRouter from '../../../components/homeworkReg/profileRouter';

import { useSnackbar } from 'notistack'

import s from './onePostPage.module.scss';
import { useSelector } from 'react-redux';

const endpoint = 'http://localhost:3001/';

const OnePostPage = () => {
  const  { id } = useParams();  
  const user = useSelector(state => state.user);
  const {enqueueSnackbar} = useSnackbar();
  
  const [post, setPost] = useState({});
  const [editing, setEditing] = useState(false);

  
  const [newTitle, setNewTitle] = useState(post.title);
  const [newText, setNewText] = useState(post.text);

  const titleInputChangeHandler = (e) => {
    setNewTitle(e.target.value)
  };
  
  const textInputChangeHandler = (e) => {
    setNewText(e.target.value)
  };

  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(endpoint + 'posts');
        console.log(result.data);
        const post = result.data.find(p => Number(p.id) === Number(id));
        setPost(post);
    };
    fetchData();
  }, [id]);
  

  const deletePost = () => {
      fetch(endpoint + 'posts/' + id, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(res => console.log(res))
      enqueueSnackbar('The post has been deleted!', { variant: `success` })
  }
  const editingSwitcher = () => {
    setEditing(editing => !editing);
  }
  const editPost = () => {
    if(newTitle && newText) {
      fetch(endpoint + 'posts/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          title: newTitle,
          text: newText
        })
      })
      .then(res => res.json())
      .then(res => console.log(res))
      enqueueSnackbar('The post has been edited!', { variant: `success` })
      setEditing(false);
    } else {
      enqueueSnackbar('Incomplete data!', { variant: `error` })
      setEditing(false);
    }
  }

  return (
    <>
      <ProfileRouter />
      <div className={s.onePost}>
        <div className={s.onePost__container}>
          <div className={s.onePost__title}>
            {editing ? 
                        <input 
                          type="text"
                          name="title"
                          value={newTitle}
                          onChange={titleInputChangeHandler} 
                          className={s.editPost}/> 
                        : post?.title}
          </div>
          <div className={s.onePost__info}>
            {post.img ? <img src={post.img} alt="postImage" className={s.onePost__image} /> : <img src={devAvatar} alt="postImage" className={s.onePost__image} /> }
            <div className={s.onePost__desc}>
              {editing ? <textarea 
                          type="text"
                          name="text"
                          value={newText}
                          onChange={textInputChangeHandler} 
                          className={s.editPost}/> 
              : post?.text}
            </div>
          </div>
          <div className={s.onePost__profile}>
            <img src={post?.user?.avatar} alt="userAvatar" className={s.onePost__profile_avatar}/>
            <div className={s.onePost__profile_name}>{post?.user?.email}</div>
          </div>
          { 
            user?.id === post.user?.id && 
            <div className={s.onePost__settings}>
              <button className={s.onePost__delete} onClick={deletePost}>Delete</button>
              { editing ? 
              <>
                <button className={s.onePost__edit} onClick={editPost} style={{background : "green"}}>Yes</button>
                <button className={s.onePost__edit} onClick={editingSwitcher} style={{background : "black"}}>No</button>
              </>
               :
              <button className={s.onePost__edit} onClick={editingSwitcher}>Edit</button>
              }
            </div> 
          }
        </div>
      </div>
    </>
  )
}

export default OnePostPage