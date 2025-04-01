'use client';

import { useState, useEffect } from 'react';

type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          setError('Failed to fetch contacts');
        }
      } catch (error) {
        setError('An error occurred while fetching contacts');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, []);
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/contacts?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      } else {
        setError('Failed to delete message');
      }
    } catch (error) {
      setError('An error occurred while deleting the message');
    }
  };
  
  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, read })
      });
      
      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, read } : contact
        ));
        
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, read });
        }
      } else {
        setError(`Failed to mark message as ${read ? 'read' : 'unread'}`);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {contacts.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {contacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-blue-50' : ''} ${!contact.read ? 'font-semibold' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                    <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                  </div>
                  <p className="text-sm mt-1 truncate">{contact.subject}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            {selectedContact ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{selectedContact.subject}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMarkAsRead(selectedContact.id, !selectedContact.read)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Mark as {selectedContact.read ? 'unread' : 'read'}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedContact.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-medium">{selectedContact.name}</p>
                      <p className="text-sm text-gray-600">{selectedContact.email}</p>
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <a 
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 h-full flex items-center justify-center">
                <p>Select a message to view its details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}