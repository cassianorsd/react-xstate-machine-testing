import React,{useContext,useEffect} from 'react'
import { MachineContext} from 'state'

function Home(){
  const [ machine, sendToMachine] = useContext(MachineContext)
  const { error } = machine.context;
  useEffect(()=>{
    sendToMachine('LOAD_STORIES');
  },[sendToMachine])

  return (
    <div>
      <h1>Home</h1>
      {machine.matches('list.loading') && <h2>Loading...</h2>}
      {machine.matches('list.fail') && <div style={{color:'red'}}>Error loading data: {error.toString()}</div>}
      {machine.matches('list.success') && (
        <Stories stories={stories}/>
      )}
    </div>
  )
}

export default Home;