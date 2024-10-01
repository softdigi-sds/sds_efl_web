import React from 'react';

const UsersTableView = ({ userData }: { userData: any }) => {
  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {/* <tr>
            <th>S.NO</th>
            <td>{userData?.s_no}</td>
          </tr> */}
          <tr>
            <th>User ID</th>
            <td>{userData?.euserid}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{userData?.ename}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{userData?.emailid}</td>
          </tr>
          <tr>
            <th>Mobile Number</th>
            <td>{userData?.mobile_no}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{userData?.active_status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersTableView;
