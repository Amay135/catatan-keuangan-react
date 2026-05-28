import { useMemo } from 'react';

function MonthlySummary({ transactions, formatRupiah }) {
  
  const summary = useMemo(() => {
    const monthlyData = {};
    
    transactions.forEach(t => {
      const month = t.date.substring(0, 7); // 'YYYY-MM'
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expense += t.amount;
      }
    });

    return monthlyData;
  }, [transactions]);

  const sortedMonths = Object.keys(summary).sort().reverse();

  const formatMonth = (monthString) => {
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
  }

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-secondary text-white">
        <h5>Ringkasan Bulanan</h5>
      </div>
      <div className="card-body">
        {sortedMonths.length === 0 ? (
           <p className="text-center text-muted">Data belum cukup untuk ringkasan bulanan.</p>
        ) : (
          sortedMonths.map(month => (
            <div key={month} className="mb-3">
              <strong>{formatMonth(month)}</strong>
              <div className="text-success">+ Pemasukan: {formatRupiah(summary[month].income)}</div>
              <div className="text-danger">- Pengeluaran: {formatRupiah(summary[month].expense)}</div>
              <hr/>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MonthlySummary;