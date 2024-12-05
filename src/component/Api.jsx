
import axios from 'axios';

const api=axios.create({
    baseURL:"https://www.themealdb.com/api/json/v1/1/",
})



export const fetchdata_id=async (id)=>{
    try{
        const res= await api.get(`lookup.php?i=${id}`)
        return res.data;
    
    }
    catch(err){
        console.log("Fetching error:",err);
    }
}



export const fetchdata = async (mealname) => {
    try{
        const res= await api.get(`search.php?s=${mealname}`)
        return res.data;
    
    }
    catch(err){
        console.log("Fetching error:",err);
    }
   
}


