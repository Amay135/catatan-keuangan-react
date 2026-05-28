import React from 'react';

function TransactionList({ transactions, onEdit, onDelete, formatRupiah }) {
  
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a));

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  return (
    <div className="card shadow-sm">
        <div className="card-header bg-info text-white">
            <h4>Riwayat Keuangan</h4>
        </div>
        <div className="card-body">
            {transactions.length === 0 ? (
                <p className="text-center text-muted">Belum ada data transaksi.</p>
            ) : (
                sortedDates.map(date => (
                    <div key={date} className="mb-4">
                        <h5 className="border-bottom pb-2 mb-3">{formatDate(date)}</h5>
                        <ul className="list-group">
                            {groupedTransactions[date].map(transaction => (
                                <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fw-bold">{transaction.description}</span>
                                        <br />
                                        <span className={`badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'}`}>
                                            {transaction.type === 'income' ? '+' : '-'} {formatRupiah(transaction.amount)}
                                        </span>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(transaction)}>
                                          Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(transaction.id)}>
                                          Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    </div>
  );
}

export default TransactionList;