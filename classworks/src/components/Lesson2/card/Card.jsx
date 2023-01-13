import React from 'react';
import { useState } from 'react';

import Profile from '../profile/Profile';
import './card.scss';

let about = `I am a frontend developer with a particular interest in making 
              things simple and automating daily tasks. 
              I try to keep up with security and best practices, 
              and am always looking for new things to learn.`;

let interests = `Food expert. Music scholar. Reader. 
                  Internet fanatic. Bacon buff. Entrepreneur. 
                  Travel geek. Pop culture ninja. Coffee fanatic.`;

let profilesArray = [
  {
    id: 101,
    name: "11111 111111",
    position: "111111111",
    website: "111@mail.ru",
    about,
    interests,
    linkedin: true,
    white: true,
    networks: {
      instaLink: "https://www.instagram.com/",
      emailLink: "https://www.google.com/intl/ru/gmail/about/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://ru-ru.facebook.com/",
      linkedinLink: "https://ru.linkedin.com/",
      githubLink: "https://github.com/doppelyouz"
    }
  },
  {
    id: 102,
    name: "22222 222222",
    position: "22222222222",
    website: "2222@mail.ru",
    about,
    interests,
    networks: {
      instaLink: "https://www.instagram.com/",
      emailLink: "https://www.google.com/intl/ru/gmail/about/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://ru-ru.facebook.com/",
      githubLink: "https://github.com/doppelyouz"
    }
  },
  {
    id: 103,
    name: "33333333 33333333",
    position: "333333333333",
    website: "33333@mail.ru",
    about,
    interests,
    linkedin: true,
    white: true,
    networks: {
      instaLink: "https://www.instagram.com/",
      emailLink: "https://www.google.com/intl/ru/gmail/about/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://ru-ru.facebook.com/",
      linkedinLink: "https://ru.linkedin.com/",
      githubLink: "https://github.com/doppelyouz"
    }
  },
  {
    id: 104,
    name: "44444 44444444",
    position: "4444444",
    website: "44444@mail.ru",
    about,
    interests,
    linkedin: true,
    networks: {
      instaLink: "https://www.instagram.com/",
      emailLink: "https://www.google.com/intl/ru/gmail/about/",
      twitterLink: "https://twitter.com/",
      facebookLink: "https://ru-ru.facebook.com/",
      linkedinLink: "https://ru.linkedin.com/",
      githubLink: "https://github.com/doppelyouz"
    }
  },
]

const Card = () => {
  
  const [profiles, setProfiles] = useState(profilesArray);
  const [active, setActive] = useState(null);

  return (
    <div className="profiles">
      {
        profiles.map(p => {
            return <Profile
                      key={p.id}
                      name={p.name} 
                      position={p.position} 
                      website={p.website} 
                      about={p.about} 
                      interests={p.interests} 
                      linkedin={p.linkedin}
                      white={p.white}
                      instaLink={p.networks.instaLink}
                      emailLink={p.networks.emailLink}
                      twitterLink={p.networks.twitterLink}
                      facebookLink={p.networks.facebookLink}
                      linkedinLink={p.networks.linkedinLink}
                      githubLink={p.networks.githubLink}
                      active={active === p.id ? true : false}
                      onClick={() => {
                          setActive(p.id)
                      }}
                    />
        })
      }
    </div>
  )
}

export default Card;