import React from 'react';

const ClientMessages = () => {
  const messages = [
    { name: 'David', text: 'Hey, how’s the project?', date: '10:45 AM' },
    { name: 'Stephanie', text: 'I got your first assignment!', date: '10:02 AM' },
    { name: 'William', text: 'I want changes in the design', date: '5:01 AM' },
    { name: 'Deepanshi', text: 'Thik hai...', date: 'Yesterday' },
  ];

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-3 hover:bg-gray-700 cursor-pointer"
        >
          {/* Left side - user icon placeholder and message */}
          <div className="flex items-center">
            {/* Placeholder for profile icon */}
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
              <span className="text-white text-lg font-semibold">{msg.name[0]}</span>
            </div>
            {/* Message details */}
            <div>
              <h3 className="font-semibold text-white">{msg.name}</h3>
              <p className="text-gray-400 text-sm">{msg.text}</p>
            </div>
          </div>
          {/* Right side - date or time */}
          <div className="text-gray-400 text-sm">{msg.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ClientMessages;
