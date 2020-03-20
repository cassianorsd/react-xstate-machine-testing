import React,{useContext,useEffect} from 'react'
import { MachineContext} from 'state'
import Stories from 'components/Stories';
import {  Switch, Route,Redirect,useLocation} from 'react-router-dom'
import Story from 'components/Story'

function Home(){
  const [ machine, sendToMachine] = useContext(MachineContext)
  const { error,stories,selectedStory } = machine.context;
  const { pathname } = useLocation();
  const storyUrl = `/story/${selectedStory?.machine?.context?.story?.id}`
  useEffect(()=>{
    sendToMachine('LOAD_STORIES');
  },[sendToMachine])
  return (
    <div>
      <h1>Home</h1>
      {machine.matches('list.loading') && <h2>Loading...</h2>}
      {machine.matches('list.fail') && <div style={{color:'red'}}>Error loading data: {error.toString()}</div>}
      <div style={{display:'flex'}}>
        <div style={{display:'flex',maxWidth:300}}>
          {stories && stories.length >0 && (
            <Stories stories={stories} sendToMachine={sendToMachine}/>
          )}
        </div>
        <div style={{display:'flex'}}>
          <Switch>
          <Route path="/story/:id">
            <Story selectedStory={selectedStory}/>
          </Route>
          </Switch>
        </div>
      </div>
      {machine.matches('stories.selected')  && pathname!==storyUrl &&
      <Redirect to={storyUrl}/>
      }
    </div>
  )
}

export default Home;