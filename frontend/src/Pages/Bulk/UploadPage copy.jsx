import React, { useContext, useState } from 'react';
import { BsCheckSquareFill } from "react-icons/bs";
import { FiClipboard } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import excel from '../../assets/excel.png';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';

const UploadPage = () => {
  const [user, token] = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  console.log('..ccc..', user)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension !== 'xlsx') {
        setError('Please upload a valid .xlsx file');
        return;
      }

      setError('');
      setLoading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet);

        // Send data to backend API
        apiClient.post('/api/consignment', sheetData)
          .then((response) => {
            console.log('Consignment data uploaded successfully', response.data);
            setLoading(false);
            navigate('/userboard/imported', { state: { sheetData } });
          })
          .catch((error) => {
            console.error('Error uploading consignment data', error);
            setError('Error uploading data. Please try again.');
            setLoading(false);
          });
      };
      reader.readAsBinaryString(file);
    } else {
      setError('Please upload a file before submitting.');
    }
  };

  return (
    <>
    <Navbar></Navbar>
  <div className="flex">
  <Sidebar></Sidebar>

  <div className="bg-gray-100 p-10">
    <h1 className='text-black font-semibold text-2xl'>Import File (XLSX)</h1>
    <div className="block bg-white mt-8 shadow-sm ">
    <div className="flex items-center gap-2 ml-8 pt-8">
          <h1 className='font-bold text-xl'>Format:</h1>
          <button className='border px-4 py-1 rounded-md border-green-400'><span className='flex items-center text-green-400 gap-1 justify-center '><FiClipboard />xlsx</span></button>
        </div>
        <div className="p-8 flex items-start justify-between gap-8">
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="p-2 border rounded "
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Submit'}
              </button>
          </form>
        </div>

          <div className="mt-8 text-start">
            <h2>N:B:</h2>
            <ul className="list-disc list-inside text-left">
              <ul className='flex items-center gap-2'><BsCheckSquareFill style={{color:'green'}} />Uploaded file type must be .xlsx format.</ul>
              <ul className='flex items-center gap-2'><BsCheckSquareFill style={{color:'green'}}  />Amount must include delivery charge.</ul>
              <ul className='flex items-center gap-2'><BsCheckSquareFill style={{color:'green'}}  />Only first sheet's data will be imported.</ul>
            </ul>
            <div>
            <ul className='flex items-center gap-2'><BsCheckSquareFill style={{color:'green'}}  />Demo Picture:</ul>
              <img src={excel} alt="demo" className='ml-6' />
            </div>
            <div className="">
              <ul  className='flex items-center gap-2'><BsCheckSquareFill style={{color:'green'}}  />Download Demo Import File:</ul>
              <a href="../../../public/import-demo.xlsx" download="import-demo.xlsx"  className="text-blue-500 underline ml-6">import-demo.xlsx</a>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
    </>
  );
};

export default UploadPage;
