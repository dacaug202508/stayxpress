import React, { useEffect, useMemo, useState } from "react";
import Button from "../../reusable/Button";
import {
  getPendingOwnerRequests,
  updateOwnerRequestStatus,
} from "../../../services/adminOwnerRequestService";

function HotelOwnerRequest() {
  const [filter, setFilter] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [editedRequests, setEditedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await getPendingOwnerRequests();

      const formatted = res.data.map((r) => ({
        id: r.requestId,
        userId: r.userId,
        name: `User ${r.userId}`,
        status: r.status || "PENDING",
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
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
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
    }
  };

  const handleResetChanges = () => {
    setEditedRequests(requests);
  };

  const filteredRequests = useMemo(() => {
    if (filter === "ALL") return editedRequests;
    return editedRequests.filter((r) => r.status === filter);
  }, [filter, editedRequests]);

  if (loading) return <div className="p-6">Loading requests...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 font-semibold">
          <span>Filter Requests:</span>
          <div className="tabs tabs-box bg-base-200">
            {["PENDING", "APPROVED", "REJECTED", "ALL"].map((tab) => (
              <button
                key={tab}
                className={`tab ${filter === tab && "tab-active"}`}
                onClick={() => setFilter(tab)}
              >
                {tab === "ALL"
                  ? "All"
                  : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {hasChanges && (
            <span className="text-sm text-orange-500 font-medium">
              Unsaved changes
            </span>
          )}
          <Button
            text="Reset"
            css="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={handleResetChanges}
          />
          <Button
            text="Save Changes"
            css="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90"
            onClick={handleSaveChanges}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="font-medium">{req.name}</td>

                  <td>
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req.id, e.target.value)
                      }
                      className="select select-bordered"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>

                  <td>
                    <Button
                      css="btn btn-ghost btn-xs"
                      text="Details"
                      onClick={() =>
                        console.log("View owner request details:", req)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HotelOwnerRequest;
