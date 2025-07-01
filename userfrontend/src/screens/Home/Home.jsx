import {useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import TimeSuggestionPopup from '../../components/SuggestionPopup/TimeSuggestionPopup'

const Home = () => {
  const [category,setCategory]=useState('All')
  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
        <TimeSuggestionPopup setCategory={setCategory}/>
    </div>
  )
}

export default Home