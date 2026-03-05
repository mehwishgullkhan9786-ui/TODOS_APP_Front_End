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
      roleName,
      description,
      status: isActive ? "Active" : "Inactive",
      permissions,
    };
    onSave(roleData);
  };

  return (
    <div className="role-modal-backdrop">
      <div className="modal-containers">
        <div className="modal-header">
          <h2>{initialData ? "Edit Role" : "Add New Role"}</h2>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="input-group">
              <label>Role Name *</label>
              <input
                type="text"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="status-section">
            <div
              className={`toggle-switch ${isActive ? "active" : ""}`}
              onClick={() => setIsActive(!isActive)}
            >
              <div className="toggle-thumb"></div>
            </div>
            <span style={{ fontWeight: 500, fontSize: "14px", color: "#333" }}>
              Status: <b>{isActive ? "Active" : "Inactive"}</b>
            </span>
          </div>

          <div className="mt-4">
            <h3 className="section-heading">Assign Permissions</h3>
            <div className="permissions-container">
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
          </div>

          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>
              CANCEL
            </button>
            <button className="btn-create" onClick={handleSave}>
              {initialData ? "UPDATE" : "CREATE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
