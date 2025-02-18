import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdoteById(state, action) {
      const updatedAnecdote = action.payload
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const upvoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    const newAnecdote = await anecdoteService.modifyById(id, updatedAnecdote)
    dispatch(setAnecdoteById(newAnecdote))
  }
}

export const { setAnecdotes, setAnecdoteById, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer