export const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">登录</h2>
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="username"
            >
              用户名
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="请输入用户名"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="password"
            >
              密码
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};
