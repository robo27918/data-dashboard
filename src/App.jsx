import { useEffect, useState } from 'react'
import Allinfo from './Components/Allinfo'
import './App.css'
const renderListItems = (responseArr)=>{
  let tempListItems = responseArr.map((obj, index) => (
       
    <Allinfo key={index} stateName={obj['State']} year={obj['Year']} avg_wage={obj['Average Wage']}/>
 
));
    return tempListItems;
}
function App() {
  const [responseList, setResponseList] = useState(null)
  // state hooks to be able to sort the table by particular column
  const [shoList, setShoList] = useState(null)
  const[sortByState, setSortByState] = useState(false);
  const[sortByYear, setSortByYear] = useState(false);
  const[sortByWage,setSortByWage] = useState(false);

  const onClickStateColumn = ()=>{
    console.log("fromOnClickStateColumn");
    let tempListToRender = null;
    if (sortByState){
      setSortByState(false);
      //return to default state
      tempListToRender = renderListItems(responseList)
      setShoList(tempListToRender)
    }
    else{
      setSortByState(true);
      // get the queryList and sort it by State name
      let tempArr = [...responseList];
      
      tempArr.sort((a,b) => a.State.localeCompare(b.State));
      tempListToRender = renderListItems(tempArr)
      setShoList(tempListToRender)
    }

  }

  const onClickYearColumn = ()=>{
    console.log("fromOnClickYearColumn");
    let tempListToRender = null;
    if (sortByYear){
      setSortByYear(false);
      //return to default state
      tempListToRender = renderListItems(responseList)
      setShoList(tempListToRender)
    }
    else{
      setSortByYear(true);
      // get the queryList and sort it by State name
      let tempArr = [...responseList];
      
      tempArr.sort((a,b) => a.Year - b.Year);
      tempListToRender = renderListItems(tempArr)
      setShoList(tempListToRender)
    }

  }
  const onClickWageColumn = ()=>{
    ///this function sorts wage by either greatest or smallest so no reason to use default 
    console.log("fromOnClickWageColumn");
    let tempListToRender = null;
    if (sortByWage){ //
      setSortByWage(false);
      //return to default state
      let tempArr = [...responseList];
      tempArr.sort((a,b) => b['Average Wage'] - a['Average Wage']);
      tempListToRender = renderListItems(tempArr)
      setShoList(tempListToRender)
    }
    else{ //sort by the smallest average wage first
      setSortByWage(true);
      // get the queryList and sort it by State name
      let tempArr = [...responseList];
      
      tempArr.sort((a,b) => a['Average Wage'] - b['Average Wage']);
      tempListToRender = renderListItems(tempArr)
      setShoList(tempListToRender)
    }

  }
 
  var listItems = null;
  useEffect ( ()=> {
    const fetchDeveloperData = async() =>{
      const response = await fetch(
        `https://zircon.datausa.io/api/data?drilldowns=Year,State&measures=Average Wage,Average Wage Appx MOE&Record Count>=5&Workforce Status=true&Detailed Occupation=15113X`
      );
      const json = await response.json();
      
      setResponseList(json.data)
    
        if(json){
      
          const newArr = json.data
        
          let tempListItems = renderListItems(newArr)
        setShoList(tempListItems)
          
        }
    }
    fetchDeveloperData().catch(console.error)

  }, [])
  //console.log("data to console log" ,queryList.data)
 
  

 
  
  return (
    <div className='whole-page'>
      <h2> Software Developer Employment Data Dashboard</h2>

          

          
        

      <ul className='main-list'>
        <div className='list-header'>
          <div className="column"> <button className='state-col-button' onClick={onClickStateColumn}>State</button></div>
          <div className="column"><button className='year-col-button' onClick={onClickYearColumn}>Year</button></div>
          <div className="column"><button className='wage-col-button' onClick={onClickWageColumn}>Avg Wage ($)</button></div>
        </div>
        {shoList}
      </ul>
    </div>
  )
}

export default App
