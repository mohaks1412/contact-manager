'use client';

import React from 'react';
import ContactCard from './ContactCard';
import { Inbox } from 'lucide-react';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <div className="relative">
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {contacts.map((contact) => (
            <ContactCard 
              key={contact._id} 
              contact={contact} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 rounded-[3rem] border-2 border-dashed border-[#D2B48C] bg-[#F5F5DC]/40 transition-colors">
          <div className="w-24 h-24 rounded-full bg-[#FAF9F6] border border-[#D2B48C] flex items-center justify-center mb-6 shadow-inner">
            <Inbox className="w-10 h-10 text-[#A68A64] opacity-50" />
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-black text-[#3E2723] tracking-tight">
              Empty!
            </h3>
            <p className="text-sm text-[#6D4C41] max-w-[280px] leading-relaxed mx-auto font-semibold opacity-80">
              No contacts found. Use the entry panel to register a new contact.
            </p>
          </div>

          <div className="mt-8 flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]/40" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;