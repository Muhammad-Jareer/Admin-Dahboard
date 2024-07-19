import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportsTable = () => {
  const [reportType, setReportType] = useState('daily');

  const handleDownload = (format) => {
    if (format === 'pdf') {
      generatePDF();
    } else if (format === 'csv') {
      generateCSV();
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = prepareTableData();

    doc.autoTable({
      head: [['Date', 'Metric 1', 'Metric 2', 'Metric 3']],
      body: tableData,
    });

    doc.save(`${reportType}_report.pdf`);
  };

  const generateCSV = () => {
    const tableData = prepareTableData();
    const csvRows = [
      ['Date', 'Metric 1', 'Metric 2', 'Metric 3'],
      ...tableData
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + csvRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}_report.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const prepareTableData = () => {
    // Replace with actual data fetching or generation logic based on reportType
    return [
      ['2024-07-18', 'Value 1', 'Value 2', 'Value 3'],
      ['2024-07-18', 'Value 1', 'Value 2', 'Value 3'],
      ['2024-07-18', 'Value 1', 'Value 2', 'Value 3'],
      ['2024-07-18', 'Value 1', 'Value 2', 'Value 3'],
      // Add more rows as needed
    ];
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Reports</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className={`p-2 ${reportType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setReportType('daily')}
        >
          Daily Report
        </button>
        <button
          className={`p-2 ${reportType === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setReportType('weekly')}
        >
          Weekly Report
        </button>
        <button
          className={`p-2 ${reportType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setReportType('monthly')}
        >
          Monthly Report
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleDownload('csv')}
        >
          Download CSV
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleDownload('pdf')}
        >
          Download PDF
        </button>
      </div>

      <div>
        <h3 className="text-xl mb-2">
          {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
        </h3>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Metric 1</th>
              <th className="border border-gray-300 p-2">Metric 2</th>
              <th className="border border-gray-300 p-2">Metric 3</th>
            </tr>
          </thead>
          <tbody>
            {prepareTableData().map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{row[0]}</td>
                <td className="border border-gray-300 p-2">{row[1]}</td>
                <td className="border border-gray-300 p-2">{row[2]}</td>
                <td className="border border-gray-300 p-2">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;
