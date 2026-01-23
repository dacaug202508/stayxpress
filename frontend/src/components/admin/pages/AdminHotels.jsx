import React from "react";
import Button from "../../reusable/Button";

function AdminHotels() {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Owner</th>
            <th>Hotel Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Pune</td>
            <td>
              <select defaultValue="active" className="select">
                <option disabled={true}>Status</option>
                <option>Active</option>
                <option>In Active</option>
              </select>
            </td>
            <th>
              <Button css="btn btn-ghost" text={"details"} />
            </th>
          </tr>
          {/* row 1 */}
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Pune</td>
            <td>
              <select defaultValue="active" className="select">
                <option disabled={true}>Status</option>
                <option>Active</option>
                <option>In Active</option>
              </select>
            </td>
            <th>
              <Button css="btn btn-ghost" text={"details"} />
            </th>
          </tr>
        </tbody>
        {/* foot */}
        {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
      </table>
    </div>
  );
}

export default AdminHotels;
