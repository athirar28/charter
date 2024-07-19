import React, { useEffect } from 'react';
import { transactionData } from './data';
import "./style.css";
const Transactions = () => {
    const [fromDate, setFromDate] = React.useState(new Date());
    const [toDate, setToDate] = React.useState(new Date());
    const [transactions, setTransactions] = React.useState([]);

    useEffect(() => {
        let d = new Date(fromDate)
        d.setMonth(d.getMonth() - 3);
        setToDate(d.toLocaleDateString());
    }, [fromDate])
    useEffect(() => {
        let data = transactionData?.data.map((customer) => {
            let test = { ...customer }
            test.transactions = customer?.transactions?.filter((transaction) => {
                let d = new Date(transaction.date);
                return d >= new Date(toDate) && d <= new Date(fromDate);
            })
            return test;
        })
        setTransactions(data);
    }, [fromDate, toDate])

    const calculateAmount = (transactionArray) => {
        let total = 0;
        transactionArray?.forEach((transaction) => {
            total += transaction.amount;
        })
        return total;
    }

    const calculatePoints = (transactionArray) => {
        let point = 0;
        transactionArray?.forEach((transaction) => {
            if (transaction.amount > 100) {
                point = point + ((transaction.amount - 100) * 2 + 50);
            }
            else if (transaction.amount > 50) {
                point = point + (transaction.amount - 50);
            }
        })
        return point;
    }


    return (
        <div className='bodyWrapper'>
            <h1 className='heading'>Transactions</h1>
            <div className='filterWrapper'>
                <label>Date: </label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder={'date'} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((customer, index) => {
                        return (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{calculateAmount(customer.transactions)}</td>
                                <td>{calculatePoints(customer.transactions)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
export default Transactions;