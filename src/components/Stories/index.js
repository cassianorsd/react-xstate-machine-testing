import React from 'react';
// import { Link } from 'react-router-dom'
export default function Stories({stories,sendToMachine}){
  const selectStory = (e,story) => {
    e.preventDefault();
    sendToMachine('SELECT_STORY',{story})
  }
  return (
    <div>
      {stories.map(story=>(
        <div key={story.id} >
        <a href="#" onClick={e => selectStory(e, story)}>
            {story.title}
          </a>
        </div>
      ))}
    </div>
  )
}