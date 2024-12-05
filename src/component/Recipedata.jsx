import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchdata_id } from './Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong,faMoon,faSun} from '@fortawesome/free-solid-svg-icons';


export const Recipedata = () => {
    const [Mealdata,setMealdata]=useState([]);
    const {mealid}=useParams();
    const navigate=useNavigate();
    const [mode,setmode]=useState(false);
    const [loading,setloading]=useState(true);


    const togglemode=()=>{
      
      if(mode===false){
        document.documentElement.classList.add('dark');
        setmode(true);
      }
      else{
        document.documentElement.classList.remove('dark');
        setmode(false);  
     }
  }

  
   
    useEffect(()=>{
        fetchdata_id(mealid).then(
            (data)=> {
            setMealdata(data.meals);
            setloading(false);
            console.log(data.meals);
            }
          
        )
        .catch((err)=>{
          setloading(false);
          console.log(err)})
    },[]);
    
    const handlevideo=()=>{
      if(Mealdata[0].strYoutube===""){
        alert("video not found");
      }
      else{
        alert("you are being redirected to the video");
      }
    }

    const handledownload=()=>{
      window.print();
    }

    const navigateback=()=>{
        navigate(-1);   
    }
    
  return (
    <>

    {   loading ? (
        <h1 className="text-black text-3xl w-[100vw] text-center m-14">Loading...</h1>
      ) : Mealdata.length>0?(<div className="flex items-center  maincontainer w-[100vw] h-[100%] bg-slate-400 dark:bg-slate-600 rmd:min-h-[100vh] rmd:min-w-[100vw]">
  
          <div className="backbtn h-[100vh] w-[4vw] flex items-start justify-end pl-[1px] rmd:ml-1  "> 
           <button className='p-[1px] m-1 text-[8px] text-white border-none rounded-md bg-red-500 h-5 w-[40px] print:hidden rmd:text-[12px] rmd:h-4 rmd:w-[30px] rmd:rounded-sm' onClick={navigateback}><FontAwesomeIcon icon={faArrowLeftLong} /></button>
         </div>
         
         <div className='w-[90vw] h-[90vh]  bg-red-500 flex ml-2  dark:bg-slate-500 rmd:flex-col rmd:mt-7 cmd:mt-10'>
               <div className="image  h-[90vh] w-[40vw] rmd:h-[40vh] rmd:w-[100%]" >
               <img src={Mealdata[0].strMealThumb} alt="mealImg" className='object-cover object-center w-full h-full rmd:min-w-[90vw] rmd:min-h-[40vh]' /> 
               </div>
               
               <div className="recipecontent h-[90vh] w-[50vw] overflow-scroll text-white flex overflow-x-hidden print:overflow-visible print:h-auto rmd:w-[100%] " >
                   <div className="text-sm instruction w-[45vw] p-2 rmd:min-w-[85%] ">
                        <div className="Main_heading_darkmode w-[40vw] flex justify-between rmd:min-w-[100%] ">
                             <h1 className='mb-3 text-4xl text-gray-700 dark:text-red-700'>{Mealdata[0].strMeal}</h1>
                              <div className="darklighticon print:hidden">
                                <button onClick={togglemode}>
                                  <FontAwesomeIcon icon={mode===false?faMoon:faSun} className="my-auto text-lg" />
                               </button>   
                              </div>
                    </div>
                     
               
                       <p>{Mealdata[0].strInstructions}</p>
                       <p className='text-lg font-bold py-7 text-slate-800 dark:text-red-600'>{`Area: ${Mealdata[0].strArea} category: ${Mealdata[0].strCategory}`}</p>
               
                   </div>
                   
                   <a href={Mealdata[0].strYoutube} target='_blank'>
                   <button onClick={handlevideo} className='p-[2px] m-1 text-sm text-white border-none rounded-md bg-slate-500 h-11 w-[5vw] print:hidden dark:bg-red-600 rmd:min-h-[44px] rmd:min-w-[39px]'>see video</button>
                   </a>
             
               </div>
            
              
         </div>
         <div className="downloadbtn h-[100vh] w-[9vw] flex items-start justify-end pl-[2px] "> 
           <button className='p-[2px] m-1 text-[10px] text-white border-none rounded-md bg-slate-500 h-8 w-[50px] print:hidden dark:bg-red-600 rmd:mr-7 cmd:mr-10' onClick={handledownload}>Download</button>
         </div>
        
   </div>):<h1 className='text-black text-3xl w-[100vw] text-center m-14' >Data Not found!</h1>}
    </>
  
  
  )
}
