import './App.css'
import Search from './module/components/1-search/Search'
import List from './module/components/2-list/List'
import CartMovies from './module/components/3-cardMovies/CardMovies.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './Redux/store.tsx'
import { increment, incrementByAmount } from './Redux/counterSlice.tsx'
function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  console.log(count ,"count") ;
  const dispatch = useDispatch()
  return (
    <>
            <button className='bg-blue-500 text-white'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button className='bg-blue-500 text-white'
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(333))}
        >
          incrementByAmount
        </button>
    <Search/>
    <List/>
    <CartMovies/>
    </>

  )
}

export default App
