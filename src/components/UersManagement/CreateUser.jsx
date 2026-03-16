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
    <div className="user-modal-backdrop" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-headers">
          <h2>Architect New User</h2>
          <button className="btn-close" onClick={closeModal}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="form-grids">
            <div className="input-row">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Security Password</label>
                <input
                  type="password"
                  placeholder="Enter strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>System Role</label>
                <div className="select-container">
                  <select
                    className="actual-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>
                      Select access level...
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
              <div className="status-info">
                <span>Account Status</span>
                <b>Current State: {isActive ? "ACTIVE" : "INACTIVE"}</b>
              </div>
              <div
                className={`toggle-switch ${isActive ? "active" : ""}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-cancel" onClick={closeModal}>
              Discard Changes
            </button>
            <button className="btn-create" onClick={handleCreate}>
              Initialize User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
