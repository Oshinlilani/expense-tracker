import { useState } from "react"


export default function TransactionForm({ handleTransaction }) {

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "income"
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        const newTransaction = {
            id: Date.now(),
            ...formData,
            amount: Number(formData.amount)
            
        };

        handleTransaction(newTransaction);

        setFormData({
            title: "",
            amount: "",
            type: "income"
        });
        console.log(formData)

    }

    return (
        <div className="transaction-form">
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title : </label>
                    <input id="title" value={formData.title} type="text" name="title" placeholder="title" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" value={formData.amount} type="number" name="amount" placeholder="amount" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" onChange={handleChange}>
                        <option value={formData.type}>Income</option>
                        <option value={formData.type}>Expense</option>
                    </select>
                </div>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    )
}