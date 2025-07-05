import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    // 这里可以做保存逻辑，比如调用 API
    alert(
      `保存成功！\n暗黑模式：${darkMode ? '开启' : '关闭'}\n通知：${
        notifications ? '开启' : '关闭'
      }`
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">系统设置</h1>

      <div className="mb-4 form-control">
        <label className="cursor-pointer label">
          <span className="label-text">暗黑模式</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
      </div>

      <div className="mb-4 form-control">
        <label className="cursor-pointer label">
          <span className="label-text">系统通知</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </label>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        保存设置
      </button>
    </div>
  );
};

export default SettingsPage;
