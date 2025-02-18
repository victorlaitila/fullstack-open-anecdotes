import { useDispatch, useSelector } from "react-redux"
import { upvoteAnecdoteById } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (filter) {
      const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return filteredAnecdotes.sort((a,b) => b.votes - a.votes)
    } else {
      return [...anecdotes].sort((a,b) => b.votes - a.votes)
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvoteAnecdoteById(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList