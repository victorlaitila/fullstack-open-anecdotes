import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, resetNotificationMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    const toastMessage = `You created: ${content}`
    dispatch(setNotificationMessage(toastMessage))
    setTimeout(() => {
      dispatch(resetNotificationMessage())
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} >
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm