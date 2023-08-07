'use client'
import { useState } from 'react'
export default function Home() {

 const [data, setdata]= useState({
  name : "",
  email : "",
  phone_number : 0,
  age : 0,
 })

 const [getJson,setJsonData]= useState<any[]>([])

  const inputHandler=(e:any)=>{
    const {name,value}=e.target;
      setdata((prevState)=>({
        ...prevState,[name]:value
      }))
  }

  const GetData=async()=>{

    try{
      const {name,email,phone_number,age}=data;

      const submitdata= await fetch('http://127.0.0.1:3002/api/v1/users',{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: "include",
      });
      
      const response= await submitdata.json();

      if(submitdata.ok){
        setJsonData(response.userData)
      }

    }
    catch(err){
      window.alert(err);
    }

  }

  const Onclick=async()=>{

    try{
      const {name,email,phone_number,age}=data;

      const submitdata= await fetch('http://127.0.0.1:3002/api/v1/registration',{
        method:"POST",
        body:JSON.stringify({
          name,
          email,
          phone_number,
          age
        }),
        headers:{"Content-Type":"application/json"}, 
        credentials: "include",
      });
      
      const response= await submitdata.json();

      if(submitdata.ok){
        await GetData();
        console.log(response);
      }

    }
    catch(err){
      window.alert(err);
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form method='POST' className='flex flex-col justify-center items-start gap-1'>
        <label>Name</label>
        <input name="name" value={data.name} type="text" onChange={inputHandler} className='text-black'/>
        <label className='mt-2'>Email</label>
        <input name="email" value={data.email} type="text" onChange={inputHandler} className='text-black'/>
        <label className='mt-2'>Phone Number:</label>
        <input name="phone_number" value={data.phone_number} type="text" onChange={inputHandler} className='text-black'/>
        <label className='mt-2'>Age:</label>
        <input name="age" value={data.age} type="text" onChange={inputHandler} className='text-black'/>
        <input type="submit" className='w-full bg-black dark:bg-white text-white dark:text-black rounded-[12px] mt-4' onClick={Onclick} />
      </form>
    <br />
      <table>
      <thead>
        <tr>
          <th className='border-[1px] border-white'> Name </th>
          <th className='border-[1px] border-white'> Email</th>
          <th className='border-[1px] border-white'> Phone Number</th>
          <th className='border-[1px] border-white'> Age</th>
        </tr>

      </thead>
      <tbody>
        { getJson && Array.isArray(getJson) ?

        getJson.map((user,index)=>(
          <tr key={index}>
            <td className='border-[1px] border-black p-2 bg-white text-black'>{user.name}</td>
            <td className='border-[1px] border-white p-2'>{user.email}</td>
            <td className='border-[1px] border-white p-2'>{user.phone_number}</td>
            <td className='border-[1px] border-white p-2'>{user.age}</td>
          </tr>
        )):
          <p>no data!!!</p>

        }

      </tbody>
      </table>
      <a href="http://127.0.0.1:3002/" download className='bg-white p-2 text-black rounded-full hover:scale-95 transform transition ease-in-out delay-150 duration-300'> Download The Sheet</a>
    </main>
  )
}
