import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils/Utils'
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState(0)
  const [incomeAmount, setIncomeAmount] = useState(0)
  const naviagte = useNavigate();

 



  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, []);

  useEffect(()=>{
    const amounts = expenses.map((item)=> item.amount);

    const income = amounts.filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0);

      const exp = amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;
      setIncomeAmount(income)
      setExpenseAmount(exp)
  },[expenses])

  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out.')
    setTimeout(() => {
      naviagte('/login');
    }, 1000);
  }
  const fetchExpenses = async()=>{
    try {
      const url = backendUrl + '/expenses';
      const headers = {
        headers:{
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      if(response.status === 400){
        naviagte('/login');
        return;
      }
      const result = await response.json();
      
      setExpenses(result.data)
    } catch (error) {
      handleError(error)
    }
  }

  const addExpenses = async(data)=>{
    try {
      const url = backendUrl + '/expenses';
      const headers = {
        headers:{
          'Authorization' : localStorage.getItem('token'),
          'Content-Type': 'Application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      }
      const response = await fetch(url, headers);
      if(response.status === 400){
        naviagte('/login');
        return;
      }
      const result = await response.json();
      console.log(result);
      setExpenses(result.data);
      handleSuccess('Expenses Added SuccessFully.');
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(()=>{
   fetchExpenses();
  },[])

    const hanldeDeleteExpense = async(expenseId)=>{
      try {
        const url = backendUrl + `/expenses/${expenseId}`;
        const headers = {
          headers:{
            'Authorization' : localStorage.getItem('token'),
            'Content-Type': 'Application/json'
          },
          method: "DELETE",
        }
        const response = await fetch(url, headers);
        if(response.status === 400){
          naviagte('/login');
          return;
        }
        const result = await response.json();
        setExpenses(result.data);
        handleSuccess('Expenses deleted SuccessFully.')
      } catch (error) {
        handleError(error)
      }
    }
  
  return (
    <div className='max-h-[100vh] mt-9'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-lg '>Welcome! <span className='text-purple-600'>{loggedInUser}</span></h1>
      <button onClick={handleLogout} className='bg-purple-800 border-none text-sm text-white rounded-md p-2 my-2.5 cursor-pointer'>Log Out</button>
      </div>
      <ExpenseDetails  incomeAmount= {incomeAmount} expenseAmount={expenseAmount}/>
      <ExpenseTrackerForm addExpenses={addExpenses}/>
      <ExpensesTable expenses={expenses} hanldeDeleteExpense={hanldeDeleteExpense}/>
    </div>
  )
}

export default Home
