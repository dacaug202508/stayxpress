import React, { useEffect, useState } from "react";

import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import { getHotelsByOwnerId } from "../../../services/hotelservice";

function OwnerHotelsStatus() {
    const ownerId = localStorage.getItem("user_id");
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const res = await getHotelsByOwnerId(ownerId);
            setHotels(res.data);
        } catch (err) {
            console.error("Error fetching owner hotels", err);
        } finally {
            setLoading(false);
        }
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case "APPROVED":
                return (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <FaCheckCircle /> Approved
                    </span>
                );
            case "REJECTED":
                return (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        <FaTimesCircle /> Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                        <FaHourglassHalf /> Pending
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    My Hotels Approval Status
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Track admin approval status of your hotels.
                </p>
            </div>

            {/* Hotels Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
                <table className="table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>#</th>
                            <th>Hotel Name</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {hotels.length > 0 ? (
                            hotels.map((hotel, index) => (
                                <tr key={hotel.id}>
                                    <td>{index + 1}</td>
                                    <td className="font-semibold">{hotel.name || hotel.hotelName}</td>
                                    <td>
                                        {hotel.city}, {hotel.country}
                                    </td>
                                    <td>{renderStatusBadge(hotel.status)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-400">
                                    You have not added any hotels yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
                <strong>Note:</strong> Only <b>APPROVED</b> hotels will be visible to users
                and allowed to accept bookings.
            </div>
        </div>
    );
}

export default OwnerHotelsStatus;
