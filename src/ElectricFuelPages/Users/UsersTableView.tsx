import React from 'react';

const UsersTableView = ({ userData }: { userData: any }) => {
  const nameFunction = (row: any) => {
    switch (row.active_status) {
      case 5:
        return <span className="has-text-success">Active</span>;
      case 0:
        return <span className="has-text-danger">Inactive</span>;
  
    }
  };

  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {/* <tr>
            <th>User ID</th>
            <td>{userData?.euserid}</td>
          </tr> */}
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
            <th>Role</th>
            <td>{userData?.roles?.map((data:any)=>(
              
              <>
              {data.label}, 
              </>
            ))}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{nameFunction(userData)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersTableView;
