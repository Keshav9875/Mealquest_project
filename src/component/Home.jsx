import React, { useEffect, useState } from 'react';
import { fetchdata } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';


export const Home = () => {
  
  const buttonarr=["Chicken","Egg","Pancake","Veg"];
  const [meals,setmeals]=useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]= useState("");
  const [inputtxt,setinputtxt]=useState("");
  const [clickbtn,setclickbtn]=useState(false);



  const changehandler=(event)=>{
    setinputtxt(event.target.value);
  }

  const searchbtn=(event)=>{ // This is the recommended way to fetch data when you want to fetch data on user interactions.Because react does not enforce to use useEffect.
    
    setclickbtn(true);
  
   if(inputtxt.trim()!==""){
      fetchdata(inputtxt)
      .then((data)=> {
          
        
        console.log(data.meals);
        if (data && Array.isArray(data.meals)) {
          setmeals(data.meals); // Set meals only if it's an array
          setloading(false);
        } else {
          setmeals([]); // Set to an empty array if data.meals is not valid
          setloading(false)
          
        }
                     
     })
     .catch((err)=>{seterror(err)
      console.log("Error in fetching: ",error);
      setloading(false);
     }) 
     
    }
    else{
      setmeals([]);
      setloading(false)
    } 
    
  }
  // useEffect( ()=>{  // This is the another way to fetch data by useEffect.
  //   if(inputtxt!==""){
  //     fetchdata(inputtxt)
  //     .then((data)=> {setmeals(data)
  //                    setloading("false");
  //                    console.log(data);
                     
  //    })
  //    .catch((err)=>{seterror(err)}) 
     
  //   } 
    
   
  // },[clickbtn]);

  const handlefilterclick=(value)=>{
    setclickbtn(true);
    if(value.trim()!==""){
      fetchdata(value)
      .then((data)=> {
          
   
        console.log(data.meals);
        if (data && Array.isArray(data.meals)) {
         
          setmeals(data.meals); // Set meals only if it's an array
          
          setloading(false);
        } else {
          setmeals([]); // Set to an empty array if data.meals is not valid
        }
                     
     })
     .catch((err)=>{
      seterror(err)
      console.log("Error in fetching: ",error);
      setloading(false);
    }) 
     
    }
    else{
      setmeals([]);
      setloading(false);
    } 
  }
  

  
  return (
    <>
        <header className="w-[100%] h-[150px] bg-[#302f2f]  flex-col p-5 hsm:h-auto">
             <div className="flex justify-between mb-3 headercontent w-[100%] px-14 hsm:flex-col hsm:justify-center hsm:items-center">
             <img src="/foodyzone_favicon.jpg" alt="recipefinderlogo" className='w-14 h-14 hsm:mb-5' />
             <div className="flex h-10 searchbar">
                <input type="text" placeholder="Search Recipe by name..." value={inputtxt} onChange={changehandler} className="text-white bg-transparent border-2 border-red-500 focus:border-red-600 focus:outline-none px-[10px] h-9 hsm:ml-2"  />
                <button onClick={searchbtn}>
                   <FontAwesomeIcon icon={faMagnifyingGlass} className='h-8 text-white bg-red-400 w-[35px] p-[2px] ' />
                </button>
             </div>
             
             </div>
             
             
            
            <div className="flex button w-[100%] justify-center gap-4 text-white items-end h-[50px]">
             {buttonarr.map((val)=>  (<button key={val} className='p-1 bg-red-500 border-none rounded-md'onClick={()=>{handlefilterclick(val)}}>{val}</button>) )}
            </div>
            
        
        </header> 
 
        <main className='w-[100%] bg-[url("/recipe-bg.png")] h-auto bg-no-repeat bg-cover bg-center min-h-[calc(100vh-150px)]'>
             
          { ( (meals.length===0 && clickbtn===false))?
          <h1 className='flex items-center justify-center w-full min-h-[50vh] text-3xl text-red-950 px-auto hsm:font-sm hsm:text-sm'>Please Enter Something to Search...</h1>

            :loading?<h1 className="text-black text-3xl w-[100vw] text-center">Loading...</h1>:meals.length>0 ?
             <div key={meals.length} className="grid gap-5 p-3 justify-items-center gsc:grid-cols-1 lg:grid-cols-2" >
                 {meals.slice(0,10).map((value)=>{
                  return(
                   
                  <div key={`${value.idMeal}`} className='flex text-gray-900 min-h-[200px] w-[500px] border-2 border-solid border-white rounded-sm shadow-gray-600 shadow-md bg-slate-300 bg-opacity-60 h-auto hsm:flex-col hsm:w-[90vw] '>
                   
                    <div className="w-[150px] h-full image hsm:w-[90vw]" >
                      <img src={value.strMealThumb} alt="Meal Image" className='w-[300px] h-[100%] object-cover object-center hsm:w-[100%] ' />
                    </div>
                   
                    <div className="mealcontent w-[250px] p-3 ">
                      {/* dishname */}
                      <h1 className='text-3xl text-red-600 '>{value.strMeal|| "Null"}</h1>
                   
                       {/* description */}
                       <p className='pl-1'>Discover this delicious meal, made with the finest ingredients!</p>
                   
                    {/* desertname */}
                    <p className='text-sm font-bold'>{`Area: ${value.strArea || "unknown area"}, Category: ${value.strCategory ||     "unknown category"}`}</p>
                    </div>
                   
                    <div className="recipebtn w-[100px] text-sm  my-1 flex justify-center">
                       {/* button */}
                     <NavLink to={`/${value.idMeal}`}>
                     <button className='h-6 text-white bg-red-600 border border-black p-[2px]'>View Recipe</button>
                      </NavLink> 
                    </div>
                    
                     
                 

                  </div>
              
              )
           })}
          </div>
            :(<h1 className='flex items-center justify-center w-full min-h-[50vh] text-3xl text-red-900  px-auto '>Sorry,Data not found...</h1>)
           
          }
          
        </main>
    </>
    
  )
}
