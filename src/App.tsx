import { MoonLoader } from 'react-spinners'
import { useDeleteTodosMutation, useGetTodosQuery, useUpdateTodoStatusMutation } from './entities/todolist/model/api'
import type { ITodo } from './shared/types'

function App() {
  const {data, isLoading, isError}=useGetTodosQuery([])
  const [deleteCard, {isError: errorDelete, isLoading : deleteLoading}]=useDeleteTodosMutation()
  const [updateTodoStatus, {isError: errorCheck, isLoading : checkLoading}] = useUpdateTodoStatusMutation();

   const handleCheckboxChange = (todo:ITodo) => {
    updateTodoStatus({ id: todo.id, completed: !todo.completed });
  };


  if(isError){
    return  <div className='text-[50px] italic font-semibold flex items-center justify-center h-[100vh]'>
      <p> 404  Not Found, check ur internet connection</p>
      </div>
  }

  if(errorCheck || errorDelete ){
    return <div className='text-[50px] italic font-semibold flex items-center justify-center h-[100vh] text-center'>
      <p> Bad request or not found... <br />
      
      Try again  </p>
      </div>
  }

  if(isLoading || deleteLoading || checkLoading){
    return  <div className='flex items-center justify-center h-[100vh]'>
      <MoonLoader />
    </div> 
  }

  return (
    <>
    <div className='text-center py-[50px]'> 
      <p className='text-[40px] font-semibold italic tracking-[1px]'>Todo list for test </p>
    </div>
    
      <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5  gap-[30px] w-[85%] m-auto py-[50px] '>
        {
          data?.slice(0,10).map((item: ITodo)=>{
            return <div key={item.id} className='p-[15px] h-[150px] md:h-[150px] lg:h-[200px]  hover:shadow-lg flex flex-col justify-between  border-1 border-solid border-gray-400 rounded-[10px] transform hover:translate-y-[-10px] transition-all duration-200 ease-linear'>
              <div className='flex justify-between italic font-semibold tracking-[1px]'>
                 <p className={`${item.completed ? 'line-through' : ''} text-[16px] `} > {item.title}</p>
                 <input
             type="checkbox"
             checked={item.completed}
             onChange={() => handleCheckboxChange(item)} />
              </div>
               
                <button className='bg-red-700 text-white px-[20px] py-[5px] rounded-[10px]  hover:bg-black hover:text-white transition-all duration-200 ease-in' onClick={ () => deleteCard(item.id)}>Delete </button>
              </div>

          })
        }
      </div>
    </>
  )
}

export default App
