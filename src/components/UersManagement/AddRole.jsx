import React, { useState, useEffect } from "react";
import "../../Style Css/Addrole.css";

const PermissionBox = ({ title, items, selectedPermissions, onToggle }) => (
  <div className="permission-group">
    <h4 className="perm-title">{title}</h4>
    <div className="perm-grid">
      {items.map((item) => (
        <div
          key={item}
          className={`perm-item ${selectedPermissions[title]?.includes(item) ? "active" : ""}`}
          onClick={() => onToggle(title, item)}
        >
          <span>{item}</span>
          <div className="mini-toggle-ui"></div>
        </div>
      ))}
    </div>
  </div>
);

const AddRole = ({ onClose, onSave, initialData }) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (initialData) {
      setRoleName(initialData.roleName || "");
      setDescription(initialData.description || "");
      setIsActive(initialData.status === "Active");
      setPermissions(initialData.permissions || {});
    }
  }, [initialData]);

  const handleToggle = (category, item) => {
    setPermissions((prev) => {
      const categoryPerms = prev[category] || [];
      if (categoryPerms.includes(item)) {
        return { ...prev, [category]: categoryPerms.filter((i) => i !== item) };
      } else {
        return { ...prev, [category]: [...categoryPerms, item] };
      }
    });
  };

  const handleSave = () => {
    if (!roleName.trim()) {
      alert("Role name is required!");
      return;
    }
    const roleData = {
      role: roleName,
      description,
      status: isActive ? "Active" : "Inactive",
      permissions,
    };
    onSave(roleData);
  };

  return (
    <div className="role-modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-headers">
          <h2>{initialData ? "Refine Role" : "Architect New Role"}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-grids">
            <div className="input-row">
              <div className="input-group">
                <label>Role Name</label>
                <input
                  type="text"
                  placeholder="e.g. Master Administrator"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Brief summary of responsibilities"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="status-sections">
              <div className="status-info">
                <span>Operational Status</span>
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

          <h3 className="section-heading">Permission Matrix</h3>
          <div className="permissions-container mt-4">
            <PermissionBox
              title="User Management"
              items={["View", "Create", "Edit", "Delete", "Logs"]}
              selectedPermissions={permissions}
              onToggle={handleToggle}
            />
            <PermissionBox
              title="Members"
              items={["View", "Manage", "Approve", "Reject", "Logs"]}
              selectedPermissions={permissions}
              onToggle={handleToggle}
            />
            <PermissionBox
              title="Requests"
              items={["View", "Approve", "Reject", "Delete"]}
              selectedPermissions={permissions}
              onToggle={handleToggle}
            />
            <PermissionBox
              title="System"
              items={["Settings", "Logs", "Backups"]}
              selectedPermissions={permissions}
              onToggle={handleToggle}
            />
          </div>

          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>
              Discard Changes
            </button>
            <button className="btn-create" onClick={handleSave}>
              {initialData ? "Apply Refinements" : "Initialize Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
