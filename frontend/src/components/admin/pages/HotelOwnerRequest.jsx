import React, { useState, useMemo } from "react";
import Button from "../../reusable/Button";

function HotelOwnerRequest() {
  const [filter, setFilter] = useState("pending");

  // Original data (backend)
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Hart Hagerty",
      country: "United States",
      hotelName: "Sea View Resort",
      status: "pending",
      image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: 2,
      name: "Jane Cooper",
      country: "Canada",
      hotelName: "Mountain Stay",
      status: "accepted",
      image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      id: 3,
      name: "Robert Fox",
      country: "UK",
      hotelName: "City Lights Hotel",
      status: "rejected",
      image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    },
  ]);

  // Editable copy
  const [editedRequests, setEditedRequests] = useState(requests);

  // Detect unsaved changes
  const hasChanges =
    JSON.stringify(requests) !== JSON.stringify(editedRequests);

  // Change status only in edited state
  const handleStatusChange = (id, newStatus) => {
    setEditedRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  // Save changes
  const handleSaveChanges = () => {
    console.log("Saving updated requests:", editedRequests);
    setRequests(editedRequests);
  };

  // Reset changes
  const handleResetChanges = () => {
    setEditedRequests(requests);
  };

  // Filtered list (based on edited state)
  const filteredRequests = useMemo(() => {
    if (filter === "all") return editedRequests;
    return editedRequests.filter((r) => r.status === filter);
  }, [filter, editedRequests]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 font-semibold">
          <span>Filter Requests:</span>
          <div className="tabs tabs-box bg-base-200">
            {["pending", "accepted", "rejected", "all"].map((tab) => (
              <button
                key={tab}
                className={`tab ${filter === tab && "tab-active"}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              <th>Name</th>
              <th>Hotel Name</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={req.image} alt="Owner" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{req.name}</div>
                      <div className="text-sm opacity-50">{req.country}</div>
                    </div>
                  </div>
                </td>

                <td className="font-medium">{req.hotelName}</td>

                <td>
                  <select
                    value={req.status}
                    className="select select-bordered"
                    onChange={(e) =>
                      handleStatusChange(req.id, e.target.value)
                    }
                  >
                    <option value="accepted">Accept</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Reject</option>
                  </select>
                </td>

                <td>
                  <Button
                    css="btn btn-ghost btn-xs"
                    text="Details"
                    onClick={() => console.log("View request details:", req)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HotelOwnerRequest;
