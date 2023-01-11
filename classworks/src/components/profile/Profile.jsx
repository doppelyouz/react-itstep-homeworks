import React from 'react';

import './profile.scss'
import photo from './photo.png';
import twitter from './twitter.png';
import insta from './insta.png';
import facebook from './facebook.png';
import github from './github.png';
import linkedinImg from './linkedin.png';

const Profile = (props) => {
  const {white, linkedin, name, position, website, about, interests, instaLink, facebookLink, twitterLink, githubLink, linkedinLink, emailLink} = props;

  let classesBio = "bio ";
  let classesNetworks = "networks ";

  if(white) {
    classesBio += "white";
    classesNetworks += "white";
  }

  return (
    <div className="profile">
        <div className="profile_container">
            <div className="profile_info">
                <div className="profile_image">
                    <img src={photo} alt="profileImage"/>
                </div>
                <div className={classesBio}>
                    <div className="name">{name}</div>
                    <div className="position">{position}</div>
                    <div className="website">{website}</div>
                    <div className="social_medias">
                        <button type='button' className='email'><a href={emailLink}>Email</a></button>
                        {linkedin ? <button type='button' className='linkedin'><a href={linkedinLink}>Linkedin</a></button> : null}
                    </div>
                    <div className="about">
                        <div className="about_title">About</div>
                        <div className="about_info">
                        {about}
                        </div>
                    </div>
                    <div className="interests">
                        <div className="interests_title">Interests</div>
                        <div className="interests_info">
                        {interests}
                        </div>
                    </div>
                </div>
                <div className={classesNetworks}>
                    <button type='button'><a href={twitterLink}><img src={twitter} alt="twitter" /></a></button>
                    <button type='button'><a href={githubLink}><img src={github} alt="github" /></a></button>
                    <button type='button'><a href={instaLink}><img src={insta} alt="instagram" /></a></button>
                    <button type='button'><a href={facebookLink}><img src={facebook} alt="facebook" /></a></button>
                    {linkedin ? <button type='button'><a href={linkedinLink}><img src={linkedinImg} alt="linkedin" /></a></button>: null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile