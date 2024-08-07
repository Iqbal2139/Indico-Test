// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import Card from './Card';

const MainContent = () => {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">MovieRush</h1>
      <h2 className="text-2xl mb-6">Favourite Movie</h2>
      <button 
        onClick={toggleVisibility} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isVisible ? 'Hide' : 'Show'} Items
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {isVisible && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <Card key={item.id} title={item.title} description={item.description} imageUrl={item.imageUrl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
