import React from 'react';
import { useService} from '@xstate/react'
// import { MachineContext} from 'state'
// import Stories from 'components/Stories';
// import {  Switch, Route,useParams} from 'react-router-dom'


export default function Story({selectedStory}) {
  const [storyService,] = useService(selectedStory)
  const {story,comments} = storyService.context;
  return (
    <div>
      <pre>
        <h2>{story.title}</h2>
        {storyService.matches('loading') && <div>Loading...</div>}
        {comments.map(comment=>(
          <div key={comment.id}>
            {comment.text} by {comment.by}
          </div>
        ))}
      </pre>
    </div>
  )
}