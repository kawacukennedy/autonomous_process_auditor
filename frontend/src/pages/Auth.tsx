// Auth page for user login
import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'demo' | 'team'>('demo');

  const handleLogin = () => {
    // Mock login with account type
    alert(`Logged in as ${accountType} account!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 enterprise-bg">
      <div className="card w-full max-w-md border-0">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to APA</h1>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Enter your email"
          />
        </div>
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Enter your password"
          />
        </div>
        {/* Account Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Account Type</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="demo"
                checked={accountType === 'demo'}
                onChange={(e) => setAccountType(e.target.value as 'demo' | 'team')}
                className="mr-2"
              />
              Demo Account
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="team"
                checked={accountType === 'team'}
                onChange={(e) => setAccountType(e.target.value as 'demo' | 'team')}
                className="mr-2"
              />
              Team Account
            </label>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="btn-primary w-full"
        >
          🔐 Login
        </button>
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;