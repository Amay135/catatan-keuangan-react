import { useState, useEffect } from 'react';

function TransactionForm({ onSave, transactionToEdit, setEditingTransaction }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); 
  const [type, setType] = useState('expense'); 

  useEffect(() => {
    if (transactionToEdit) {
      setAmount(transactionToEdit.amount);
      setDescription(transactionToEdit.description);
      setDate(transactionToEdit.date);
      setType(transactionToEdit.type);
    } else {
      handleClear();
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !date) {
      alert('Harap isi semua kolom!');
      return;
    }
    
    onSave({
      id: transactionToEdit ? transactionToEdit.id : null,
      date,
      description,
      amount: parseInt(amount, 10),
      type,
    });

    handleClear();
  };
  
  const handleClear = () => {
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().slice(0, 10));
    setType('expense');
    if (transactionToEdit) {
      setEditingTransaction(null); 
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5>{transactionToEdit ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Tanggal</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Deskripsi</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="e.g., Bayar tagihan listrik"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Jumlah (Rp)</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="e.g., 50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min = '0'
              step = '1000'
              required
            />
          </div>
          <div className="mb-3">
             <label className="form-label">Tipe Transaksi</label>
            <div className="d-flex">
              <div className="form-check me-3">
                <input className="form-check-input" type="radio" name="type" id="income" value="income" checked={type === 'income'} onChange={(e) => setType(e.target.value)} />
                <label className="form-check-label" htmlFor="income">Pemasukan</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="type" id="expense" value="expense" checked={type === 'expense'} onChange={(e) => setType(e.target.value)} />
                <label className="form-check-label" htmlFor="expense">Pengeluaran</label>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">{transactionToEdit ? 'Update Data' : 'Simpan Data'}</button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              {transactionToEdit ? 'Batal Edit' : 'Bersihkan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;