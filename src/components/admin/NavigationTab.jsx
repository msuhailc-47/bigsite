import React from 'react';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

export default function NavigationTab({
  navItems,
  newNavItem,
  setNewNavItem,
  addNavItem,
  moveNavItem,
  deleteNavItem,
  isReadOnly
}) {
  return (
    <div className="admin-panel-card animate-fadeIn">
      <h3>Navigation Menu Items</h3>
      <p className="section-description">Manage main header items. Drag-and-drop hierarchy mock with ordering controls.</p>

      <div className="nav-builder-grid">
        <div className="nav-items-list">
          {navItems.map((item, idx) => (
            <div key={item.id} className="nav-item-row">
              <div className="nav-item-details">
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-path">{item.path}</span>
              </div>
              <div className="nav-item-actions">
                <button className="nav-order-btn" onClick={() => moveNavItem(idx, 'up')} disabled={idx === 0}><ArrowUp size={14} /></button>
                <button className="nav-order-btn" onClick={() => moveNavItem(idx, 'down')} disabled={idx === navItems.length - 1}><ArrowDown size={14} /></button>
                <button className="nav-delete-btn" onClick={() => deleteNavItem(item.id)} disabled={isReadOnly}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="nav-add-form">
          <h4>Add New Menu Item</h4>
          <div className="form-group">
            <label>Menu Label</label>
            <input
              type="text"
              value={newNavItem.label}
              onChange={(e) => setNewNavItem(prev => ({ ...prev, label: e.target.value }))}
              className="form-control"
              placeholder="e.g. Services"
            />
          </div>
          <div className="form-group">
            <label>Section Path / ID Anchor</label>
            <input
              type="text"
              value={newNavItem.path}
              onChange={(e) => setNewNavItem(prev => ({ ...prev, path: e.target.value }))}
              className="form-control"
              placeholder="e.g. #services"
            />
          </div>
          <button className="primary-action-btn" onClick={addNavItem} disabled={isReadOnly}>
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
