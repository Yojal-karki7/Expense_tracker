const UserModel = require("../Models/User");


const addExpenses = async(req, res) =>{
    const body = req.body;
    const {_id} = req.user;
    try {
       const userData =  await UserModel.findByIdAndUpdate(
            _id, //user_id
            {
                $push: {expenses: body}
            },
            {new: true}  //for returning updated doccuments
        )
        return res.status(200).json({
            message: "Expenses Added Successfully",
            success: true,
            data: userData?.expenses //added on expenses filed
        })
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong',
            error:error,
            success: false,
        })
    }
    }

const fetchExpenses = async(req, res) =>{
    const body = req.body;
    const {_id} = req.user;
    try {
       const userData =  await UserModel.findById(_id).select('expenses');
        return res.status(200).json({
            message: "Fetched Expenses Successfully",
            success: true,
            data: userData?.expenses //added on expenses filed
        })
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong',
            error:error,
            success: false,
        })
    }
}
const deleteExpenses = async(req, res) =>{
    const {_id} = req.user;
    const {expenseId} = req.params
    try {
       const userData =  await UserModel.findByIdAndUpdate(
            _id, //user_id
            {
                $pull: {expenses: {_id: expenseId}}
            },
            {new: true}  //for returning updated doccuments
        )
        return res.status(200).json({
            message: "Expenses Deleted Successfully",
            success: true,
            data: userData?.expenses //added on expenses filed
        })
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong',
            error:error,
            success: false,
        })
    }
}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses,
}