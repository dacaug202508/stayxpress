import React, { useEffect, useMemo, useState } from "react";
import Button from "../../reusable/Button";
import {
  getAllOwnerRequests,
  getPendingOwnerRequests,
  updateOwnerRequestStatus,
} from "../../../services/adminOwnerRequestService";
import { FaUserClock } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

function HotelOwnerRequest() {
  const [filter, setFilter] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [editedRequests, setEditedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res =
        filter === "PENDING"
          ? await getPendingOwnerRequests()
          : await getAllOwnerRequests();

      console.log(res.data);

      const formatted = res.data.map((r) => ({
        id: r.id,
        userId: r.userId,
        name: `User ${r.userId}`,
        status: r.requestStatus,
      }));

      setRequests(formatted);
      setEditedRequests(formatted);
    } catch (err) {
      console.error("Error loading owner requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const hasChanges =
    JSON.stringify(requests) !== JSON.stringify(editedRequests);

  const handleStatusChange = (id, newStatus) => {
    setEditedRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const handleSaveChanges = async () => {
    if (!adminId) {
      alert("Admin not logged in");
      return;
    }

    try {
      for (const req of editedRequests) {
        const original = requests.find((r) => r.id === req.id);
        if (original.status !== req.status) {
          await updateOwnerRequestStatus(req.id, req.status, adminId);
        }
      }

      setRequests(editedRequests);
      alert("Status updated successfully");
    } catch (err) {
      console.error("Error updating owner requests:", err);
      alert("Failed to update status");
    }
  };

  const handleResetChanges = () => {
    setEditedRequests(requests);
  };

  const filteredRequests = useMemo(() => {
    if (filter === "ALL") return editedRequests;
    return editedRequests.filter((r) => r.status === filter);
  }, [filter, editedRequests]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-blue-600"></span>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Owner Requests</h2>
          <p className="text-gray-500 text-sm mt-1">Review and manage hotel owner registration requests.</p>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Unsaved changes
            </span>
          )}
          <Button
            text="Discard"
            css="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            onClick={handleResetChanges}
            disabled={!hasChanges}
          />
          <Button
            text="Save Changes"
            css={`px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all ${hasChanges
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
              : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Filter Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            {["PENDING", "APPROVED", "REJECTED", "ALL"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`
                            px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
                            ${filter === tab
                    ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}
                        `}
              >
                {tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <button onClick={fetchRequests} className="text-gray-400 hover:text-blue-600 transition-colors">
            <BiRefresh size={22} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr className="text-xs uppercase text-gray-400 font-bold tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                          <FaUserClock />
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{req.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={req.status}
                        onChange={(e) =>
                          handleStatusChange(req.id, e.target.value)
                        }
                        className={`
                          select select-sm select-bordered w-full max-w-xs
                          ${req.status === 'APPROVED' ? 'text-green-600 font-bold' :
                            req.status === 'REJECTED' ? 'text-red-500 font-bold' :
                              'text-orange-500 font-bold'}
                        `}
                      >
                        <option value="PENDING" className="text-gray-700">Pending</option>
                        <option value="APPROVED" className="text-green-600">Approved</option>
                        <option value="REJECTED" className="text-red-500">Rejected</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Button
                        text="Details"
                        css="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={() => console.log(req)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-400">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HotelOwnerRequest;
