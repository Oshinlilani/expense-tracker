


export default function Summary({ expenses }) {

    // const totalIncome = () => {
    //     return expenses.reduce((total, expense) => {
    //         if(expense.type === "income") {
    //             return total + expense.amount;
    //         }
    //         return total;
    //     }, 0);
    // }


    const totalIncome = expenses
        .filter((expense) => expense.type === "income")
        .reduce((total, expense) => total + Number(expense.amount), 0);


    const totalExpense = expenses
        .filter((expense) => expense.type === "expense")
        .reduce((total, expense) => total + Number(expense.amount), 0);
    // const totalExpense = () => {
    //     return expenses.reduce((total, expense) => {
    //         if (expense.type === "expense") {
    //             return total + expense.amount;
    //         }
    //         return total;
    //     }, 0)
    // }


    return (
        <div className="summary">
            <h2 className="font-bold text-center border-b border-gray-600 pb-2">Summary</h2>
            <p>Total Income : ₹{totalIncome}</p>
            <p>Total Expenses : ₹{totalExpense}</p>
            <p>Available Balance : ₹{totalIncome - totalExpense}</p>
        </div>
    )
}