import React from 'react'
import { ToastContainer } from 'react-toastify'

const ExpensesTable = ({ expenses, hanldeDeleteExpense }) => {
    
  return (
    <div className='font-[Arial,sans-serif] mt-8 '> 
       {
        expenses?.map((expense,index)=>(
            <div key={index} className='flex justify-between items-center border-b-[1px] border-b-[#ccc] mb-2'>
                <button className='bg-[#e74c3c] text-white border-none p-[4px] px-[7px] text-[15px] rounded-md cursor-pointer'
                onClick={()=>hanldeDeleteExpense(expense._id)}
                >X</button>
                <div className='font-bold p-4' >{expense.text}</div>
                <div className='font-medium' style={{
                    color: expense.amount > 0 ? '#27ee60' : '#e74c3c'
                }}>{expense.amount}</div>
            </div>
        ))
       }
       <ToastContainer/>
    </div>
  )
}

export default ExpensesTable
