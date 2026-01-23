import React from "react";
import Button from "../../reusable/Button";

function HotelOwnerRequest() {
  return (
    <>
      <div>
        <div className="flex items-center px-3 font-bold gap-4 my-4 h-16">
          <div>Filter: </div>
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-box">
            <input
              type="radio"
              name="status"
              className="tab"
              aria-label="Accept"
              value={"accept"}
            />
            <input
              type="radio"
              name="status"
              className="tab"
              aria-label="Pending"
              value={"pending"}
              defaultChecked
            />
            <input
              type="radio"
              name="status"
              className="tab"
              aria-label="Rejected"
              value={"rejected"}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Hotel Name</th>
                <th>Active</th>
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
                <td>
                  <select defaultValue="pending" className="select">
                    <option disabled={true}>Status</option>
                    <option>Accept</option>
                    <option>Pending</option>
                    <option>Rejected</option>
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
      </div>
    </>
  );
}

export default HotelOwnerRequest;
