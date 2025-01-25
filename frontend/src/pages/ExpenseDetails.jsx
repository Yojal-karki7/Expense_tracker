import React from 'react'

const ExpenseDetails = ({incomeAmount, expenseAmount}) => {
  return (
    <div>
        <div>
            Your Balance is: {incomeAmount - expenseAmount}
        </div>
        <div className='flex items-center my-5 font-ariel text-lg'>
            <div className='pr-2'>
            Income:
            </div>
            <span className='text-green-600 font-bold'>{incomeAmount}</span>
            <div className='pr-2 ml-9'>
            Expense:
            </div>
            <span className='text-red-600 font-bold'>{expenseAmount}</span>

        </div>
    </div>
  )
}

export default ExpenseDetails
