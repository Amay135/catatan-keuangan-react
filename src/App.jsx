import { useState, useMemo } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlySummary from "./components/MonthlySummary";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-06-25", description: "Gaji Bulanan", amount: 5000000, type: "income" },
    { id: 2, date: "2025-06-25", description: "Beli Kopi", amount: 25000, type: "expense" },
    { id: 3, date: "2025-06-26", description: "Makan Siang", amount: 30000, type: "expense" },
  ]);

  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleSaveTransaction = (transactionData) => {
    if (transactionData.id) {
      setTransactions(transactions.map((t) => (t.id === transactionData.id ? transactionData : t)));
    } else {
      const newTransaction = {
        ...transactionData,
        id: Date.now(),
      };
      setTransactions([...transactions, newTransaction]);
    }
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const currentBalance = useMemo(() => {
    return transactions.reduce((balance, transaction) => {
      if (transaction.type === "income") {
        return balance + transaction.amount;
      }
      return balance - transaction.amount;
    }, 0);
  }, [transactions]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1> Catatan Keuangan Harian</h1>
        <p className="lead">Kelola pemasukan dan pengeluaran Anda dengan mudah.</p>
      </header>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-secondary text-white">
              <h4>Saldo Terkini</h4>
            </div>
            <div className="card-body text-center">
              <h2 className={`fw-bold ${currentBalance >= 0 ? "text-success" : "text-danger"}`}>{formatRupiah(currentBalance)}</h2>
            </div>
          </div>

          <TransactionForm onSave={handleSaveTransaction} transactionToEdit={editingTransaction} setEditingTransaction={setEditingTransaction} />
          <MonthlySummary transactions={transactions} formatRupiah={formatRupiah} />
        </div>

        <div className="col-lg-8">
          <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} formatRupiah={formatRupiah} />
        </div>
      </div>

      <footer className="text-center mt-5 mb-3 text-muted">
        <p>Prototype by Pro Programmer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
