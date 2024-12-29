import React, { useContext, useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { Link, useParams } from 'react-router-dom';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import logo from '../../assets/Tspeed.jpg';
import { AuthContext } from '../../contexts/AuthContext';
import BSidebar from '../../Delivary_Boy/Shared/Bsidebar';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
import './label.css';

import apiClient from '../../axiosInstance';
const Invoice = () => {
    const { user, token } = useContext(AuthContext);
    const { id } = useParams();
    const [parcelData, setParcelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('No Parcel ID provided');
            setLoading(false);
            return;
        }

        //const source = apiClient.CancelToken.source();

        const fetchParcelData = async () => {
            try {
                const response = await apiClient.get(`/api/consignment/${id}`, {
                    //cancelToken: source.token,
                });
                setParcelData(response.data);
            } catch (err) {
                if (apiClient.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else if (err.response) {
                    setError(`Error: ${err.response.data.message}`);
                } else if (err.request) {
                    setError('Error: No response from server.');
                } else {
                    setError(`Error: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchParcelData();

        return () => {
            //source.cancel('Operation canceled by the user.');
        };
    }, [id]);

    // const handlePrint = useCallback(() => {
    //     window.print();
    // }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div> {/* Replace with a spinner */}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (!parcelData) {
        return <div className="text-center mt-10">No parcel data found</div>;
    }

    const {
        _id,
        invoice,
        createdAt,
        sname,
        rname,
        sphone,
        rphone,
        saddress,
        raddress,
        note,
        codAmount,
    } = parcelData;

    return (
        <>
            <Navbar></Navbar>
            <div className="flex">
            {
                user ? (
                <>
                    {user?.role === "Admin" ? (
                    <ASidebar /> // Renders the Admin Sidebar
                    ) : user?.role === "Delivery Boy" ? (
                    <BSidebar /> // Renders the Delivery Boy Sidebar
                    ) : (
                    <Sidebar /> // Default Sidebar for other users
                    )}
                </>
                ) : (
                null // You can render something else here if no user is logged in
                )
            }
                <div className="w-screen flex flex-col items-center p-6 bg-gray-50">
                    <div className="w-full flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Parcel ID# {_id}</h2>
                        <div className="flex space-x-4 no-print">
                            <Link to={`/userboard/invoice/${id}`}>
                                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                                    Invoice
                                </button>
                            </Link>
                            <Link to={`/userboard/label/${id}`}>
                                <button className="bg-green-500 text-white px-4 py-2 rounded">
                                    Label
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className=" px-10 py-6 invoice-container bg-white w-full  printable-label">
                        {/* Header Section */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="space-y-1 items-start">
                                {/* Company Logo */}
                                <img src={logo} alt="Company Logo" className="h-16 w-40 object-cover" />
                                <div className="flex flex-col">
                                    <span className="text-xl"> Name: <strong>{sname}</strong></span>
                                    <span className="text-xl"> Name: <strong>{sphone}</strong></span>
                                    <span className="text-gray-500"><p>Address: <strong>{saddress}</strong></p></span>




                                </div>
                            </div>
                            {/* Right Part */}
                            <div className="space-y-2 text-right">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-green-500 text-white px-6 py-3 rounded no-print"
                                    aria-label="Print Invoice"
                                >
                                    Print
                                </button>
                                {/* Invoice Info */}
                                <div>
                                    <h2 className="text-2xl font-bold">Invoice</h2>
                                    <p className="text-lg">
                                        Invoice No: <strong>#{invoice}</strong>
                                    </p>
                                    <p className="text-lg">
                                        Date: {new Date(createdAt).toLocaleDateString('en-GB')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ship To and Parcel Info */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                            {/* Ship To Info */}
                            <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                <h3 className="text-xl font-semibold mb-4">Ship To</h3>

                                <p>
                                    Name: <strong>{rname}</strong>
                                </p>
                                <p>
                                    Phone: <strong>{rphone}</strong>
                                </p>
                                <p>
                                    Address: <strong>{raddress}</strong>
                                </p>
                                <p className="mt-28">
                                    Note: <strong>{note || 'N/A'}</strong>
                                </p>
                            </div>


                            {/* Parcel Info */}
                            <div className="w-full md:w-1/2">
                                <p className="ml-0 md:ml-8">Parcel ID: <strong>#{_id}</strong></p>
                                <div className="mt-2">
                                    <Barcode value={_id} width={1.3} height={40} />
                                </div>
                                <div className="mt-2 flex justify-start">
                                    <QRCode value={`Parcel: ${_id}`} size={64} />
                                </div>
                                <div className="mt-2 flex justify-start">
                                    <span className="bg-gray-200 border border-black text-gray-800 px-4 py-2 rounded font-semibold">
                                        COD: {codAmount} BDT
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invoice;
