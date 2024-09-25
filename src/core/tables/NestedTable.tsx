import React, { useState } from "react";

// Define types for data structure
interface Child {
  id: number;
  project_name: string;
  task: string;
}

interface Parent {
  id: number;
  name: string;
  age: number;
  address: string;
  children?: Child[]; // Optional as some parents may not have children
}

const NestedTable: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Array of expanded row IDs
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // Track selected row
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term

  // Data array
  const data: Parent[] = [
    {
      id: 1,
      name: "John",
      age: 28,
      address: "1234 Elm Street",
      children: [
        { id: 11, project_name: "CROP", task: "Testing" },
        { id: 12, project_name: "IGCDOC", task: "Testing" },
      ]
    },
    {
      id: 2,
      name: "Mary",
      age: 32,
      address: "5678 Oak Street",
      children: [
        { id: 13, project_name: "IGCDOC", task: "Testing" }
      ]
    },
    {
      id: 3,
      name: "Raj",
      age: 32,
      address: "5678 Oak Street"
    }
  ];

  // Function to toggle the visibility of children
  const toggleRow = (id: number): void => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }

    setSelectedRow(id === selectedRow ? null : id);
  };

  // Global search function
  const filterData = (): Parent[] => {
    if (!searchTerm) return data;

    return data.filter((parent) => {
      // Check if parent data matches the search term
      const parentMatch =
        parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.age.toString().includes(searchTerm) ||
        parent.address.toLowerCase().includes(searchTerm);

      // Check if any child data matches the search term
      const childMatch = parent.children?.some(
        (child) =>
          child.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.task.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return parentMatch || childMatch;
    });
  };

  const filteredData = filterData();

  return (
    <div>
      <h1>Nested Table with Global Search</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Age, Address, Project, Task..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((parent) => (
              <React.Fragment key={parent.id}>
                <tr>
                  <td>{parent.name}</td>
                  <td>{parent.age}</td>
                  <td>{parent.address}</td>
                  <td>
                    {parent.children ? (
                      <span onClick={() => toggleRow(parent.id)}>
                        {expandedRows.includes(parent.id) ? (
                          <i
                            className="fa fa-minus-circle"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        )}
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>

                {expandedRows.includes(parent.id) && parent.children && (
                  <tr>
                    <td colSpan={4}>
                      <table
                        style={{
                          width: "50%",
                          borderCollapse: "collapse",
                          textAlign: "center",
                          marginTop: "1rem",
                          marginBottom: "1rem"
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Project Name</th>
                            <th>Task</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parent.children.map((child) => (
                            <tr key={child.id}>
                              <td>{child.project_name}</td>
                              <td>{child.task}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NestedTable;
