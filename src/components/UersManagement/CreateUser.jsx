import React, { useState } from "react";
import "../../Style Css/CreateUser.css";

const CreateUser = ({ closeModal, onCreate }) => {
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleCreate = () => {
    if (!name || !email || !password || !role) {
      alert("Please fill in all required fields.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
      status: isActive ? "Active" : "Inactive",
    };

    onCreate(newUser);
    closeModal();
  };

  return (
    <div style={overlayStyle} onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-headers p-4">
          <h2>Add New User</h2>
        </div>

        <div className="modal-body">
          <div className="form-grids">
            <div className="input-groups mt-4">
              <label>Name *</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-groups mt-4">
              <label>Email *</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-groups">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-groups role-dropdown">
              <label className="role-label">Role *</label>
              <div className="select-container">
                <select
                  className="actual-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="test-api">Test api</option>
                  <option value="super-admin">super-admin</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>
          </div>

          <div className="status-sections">
            <div
              className={`toggle-switch ${isActive ? "active" : ""}`}
              onClick={() => setIsActive(!isActive)}
            >
              <div className="toggle-thumb"></div>
            </div>
            <span className="status-text">
              Status: <b>{isActive ? "Active" : "Inactive"}</b>
            </span>
          </div>

          <div className="modal-footer">
            <button className="btn-cancel" onClick={closeModal}>
              CANCEL
            </button>
            <button className="btn-create" onClick={handleCreate}>
              CREATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

export default CreateUser;
