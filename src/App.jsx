import { useEffect, useState } from 'react'
import Allinfo from './Components/Allinfo'
import './App.css'

function App() {
  const [queryList, setQueryList] = useState(null)
  var listItems = null;
  useEffect ( ()=> {
    const fetchDeveloperData = async() =>{
      const response = await fetch(
        `https://zircon.datausa.io/api/data?drilldowns=Year,State&measures=Average Wage,Average Wage Appx MOE&Record Count>=5&Workforce Status=true&Detailed Occupation=15113X`
      );
      const json = await response.json();
      
      setQueryList(json)
    }
    fetchDeveloperData().catch(console.error)

  }, [])
  //console.log("data to console log" ,queryList.data)
  if(queryList){
    console.log(queryList.data)
    const newArr = queryList.data
    console.log("what is new arr..",newArr)
    listItems = newArr.map((obj, index) => (
      <li key={index}>
        <Allinfo stateName={obj['State']} year={obj['Year']} avg_wage={obj['Average Wage']}/>
      </li>
    ));
    
  

 
  }
  return (
    <div className='whole-page'>
      <h2> Software Developer Employment Data Dashboard</h2>
      <ul className='main-list'>
        <div className='list-header'>
          <div className="column"> State</div>
          <div className="column">Year</div>
          <div className="column">Yearly Wage in USD</div>
        </div>
        {listItems}
      </ul>
    </div>
  )
}

export default App
