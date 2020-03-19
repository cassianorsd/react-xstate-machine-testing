import { Machine,assign } from 'xstate';
import { createContext } from 'react'
import {auth} from './auth'
export const MachineContext = createContext()


const storiesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const getStoryDataUrl = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchStories = async () => {
  const storyIds = await fetch(storiesUrl).then(r=>r.json())
  const topTenStories = await Promise.all(
    storyIds.slice(0,10)
    .map(id=>getStoryDataUrl(id))
    .map(url=>
      fetch(url)
      .then(r=>r.json())
    )
  )
  return topTenStories;
}

export const appMachine = Machine({
  id: 'app',
  initial: 'init',
  context:{
    user: undefined,  
    error: undefined,
    stories: [],
  },
  states: {
    init: {},
    auth,
    list:{
      initial:'loading',
      states: {
        loading: {
          invoke:{
            id:'fetchStories',
            src: fetchStories,
            onDone:{
              target:'success',
              actions: assign({stories:(context,event)=>event.data})
            },
            onError:{
              target:'fail',
              actions: assign({error:(context,event)=>event.data})
            }
          }
        },
        success:{},
        fail:{}
      },
    }
  },
  on: {
    LOGIN: {
      target: 'auth.started'  
    },
    LOAD_STORIES:{
      target:'list.loading'
    }
  }
});
