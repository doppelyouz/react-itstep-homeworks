import React, {useState} from 'react'
import ProfileRouter from '../../../components/homeworkReg/profileRouter';
import s from './createPostPage.module.scss';

const endpoint = 'http://localhost:3001/';

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    img: "",
    title: "",
    text: ""
  });

  const inputChangeHandler = (e) => {
    const {value, name} = e.target;

    setFormData((data) => {
        return {
            ...data,
            [name]: value
        }
    })
  };
  
  console.log('formData: ', formData);

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const createPost = () => {
    if(formData.img && formData.text && formData.title) {
      postData(endpoint + 'posts', formData) 
      .then((data) => {
        console.log(data);
      });
    } else {
      console.log('====================================');
      console.log("error");
      console.log('====================================');
    }
  }

  return (
    <>
      <ProfileRouter />
      <div className={s.create}>
        <div className={s.create__container}>
          <div className={s.create__title}>Post creation</div>
          <div className={s.create__create_post}>
            <form className={s.create__form}>
              <div className={s.create__info}>
                <label className={s.label}>
                  <div className={s.label__title}>Image url</div>
                    <input 
                        type="text" 
                        name="img"
                        value={formData.img}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label className={s.label}>
                  <div className={s.label__title}>Title</div>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label className={s.label}>
                    <div className={s.label__title}>Text</div>
                    <textarea 
                        name="text"
                        value={formData.text}
                        onChange={inputChangeHandler}
                    />
                </label>
              </div>
              <button type="submit" className={s.submit} onClick={createPost}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePostPage