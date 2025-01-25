import React, { useState } from 'react'
import { handleError } from '../utils/Utils';

const ExpenseTrackerForm = ({addExpenses}) => {
    const [expensesInfo, setExpensesInfo] = useState({text: '', amount:''})

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyExpenseInfo = {...expensesInfo}
        copyExpenseInfo[name] = value;
        setExpensesInfo(copyExpenseInfo)
    }
    const handleExpense = (e)=>{
        e.preventDefault();
        const {text, amount} = expensesInfo;
        if(!text || !amount){
            handleError('All field are required');
            return;
        }
        setTimeout(() => {
            setExpensesInfo({text: '', amount: ''})
        }, 1000);
        addExpenses(expensesInfo)
    }

  return (
    <div className='bg-[#fff] py-8 px-12 rounded-lg w-[100%] max-w-[400px] shadow-2xl'>
        <h1 className='text-3xl font-bold mb-5'>Expense Tracker</h1>
        <form className='flex flex-col gap-2' onSubmit={handleExpense}>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='text'>Expense</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic' 
                onChange={handleChange}
                type="text" 
                name='text'
                placeholder='Enter your Expense Description'
                value={expensesInfo.text}
                />
            </div>
            <div className='flex flex-col'>
                <label className='text-lg' htmlFor='amount'>Amount</label>
                <input className='w-[100%] text-lg p-2 border-b border-black outline-none placeholder:text-xs placeholder:italic'
                onChange={handleChange}
                type="number" 
                name='amount'
                placeholder='Enter your Amount'
                value={expensesInfo.amount}
                />
            </div>
            <button type='submit' className='bg-purple-800 border-none text-xl text-white rounded-md p-2 my-2.5 cursor-pointer'>Add Expense</button>
        </form>
    </div>
  )
}

export default ExpenseTrackerForm
