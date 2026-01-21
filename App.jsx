import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './assets/Todo'

function App() {
  const [list,setlist]=useState(()=>{
    const saved=localStorage.getItem("todos");
    return saved? JSON.parse(saved):[];
  })
  const [filter,setfilter]=useState("all")
  const filterlist=list.filter(item=>{
    if (filter==="active") return !item.done
    if (filter==="completed") return item.done
    return true
  })
  const [task,settask]=useState("")
  const [editindex,seteditindex]=useState(null)
  const [edittext,setedittext]=useState("")
  
  
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(list))
  },[list])
  function add(){
    if (task==="") return
    setlist([...list,{id:crypto.randomUUID(),text:task, done:false}])
    settask("")
  }
  function remove(id){
    const newlist=list.filter((item,i)=>item.id!==id)
    setlist(newlist)
  }
  function toggle(id){
    const newlist=list.map((item,i)=>item.id===id?{...item,done:!item.done}:item)
    setlist(newlist)
  }
  function edit(id,text){
    seteditindex(id)
    setedittext(text)
  }
  function edittodo(id,edittext){
    setlist(list.map((item,i)=>item.id===id?{...item,text:edittext}:item))
    seteditindex(null)
    setedittext("")
  }
  function cleardone(){
    setlist(list.filter((item)=>!item.done))
  }
  return (
    <>
    <div className='container'>
      <h1>TO-DO APP</h1>
      <input  type="text" style={{fontSize:20}} value={task} onChange={(e)=>settask(e.target.value)} />
      <button onClick={()=>add()}>ADD</button>
      <button onClick={cleardone}>Clear List</button>
      <div className='nav'>
        <button onClick={()=>setfilter("all")}>All</button>
        <button onClick={()=>setfilter("active")}>Active</button>
        <button onClick={()=>setfilter("completed")}>Completed</button>
      </div>
      <ul>
        {filterlist.map((item)=>(
        
          <Todo 
           key={item.id}
           remove={remove}
           toggle={toggle}
           item={item}
           editindex={editindex}
           setedittext={setedittext}
           edittext={edittext}
           edit={edit}
           edittodo={edittodo}
          ></Todo>
        
          ))}
      </ul>
    </div>
    </>
  )
}

export default App
