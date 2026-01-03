'use client';

import React from 'react';
import { Trash2, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import contactService from '../services/contactService';
import toast from 'react-hot-toast';

const ContactCard = ({ contact, onDelete }) => {
  const handleDelete = async () => {
    try {
      await contactService.deleteContact(contact._id);
      onDelete(contact._id);
      toast.success('Record removed');
    } catch (err) {
      toast.error('Could not delete record');
    }
  };

  return (
    <div className="group relative bg-[#F5F5DC] border border-[#D2B48C] rounded-[2.5rem] p-7 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(62,39,35,0.12)] hover:-translate-y-2 overflow-hidden w-full">
      
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8B5E3C] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-5 pr-12 w-full min-w-0">
          <div className="flex-none w-16 h-16 rounded-2xl bg-[#3E2723] flex items-center justify-center text-[#DEB887] font-black text-2xl border border-[#8B5E3C]/20 shadow-inner">
            {contact.name?.charAt(0).toUpperCase() || '?'}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#3E2723] text-xl leading-tight mb-1.5 truncate block w-full">
              {contact.name || "Unknown Identity"}
            </h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-[10px] font-black uppercase tracking-[0.15em] border border-[#8B5E3C]/20">
              Contact
            </span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="flex-none p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete contact"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 mb-7">
        {contact.email && (
          <div className="flex items-center gap-4 text-[#6D4C41]">
            <div className="flex-none p-2 rounded-xl bg-[#FAF9F6] border border-[#D2B48C]/50 shadow-sm">
              <Mail className="w-4 h-4 text-[#8B5E3C]" />
            </div>
            <span className="text-sm font-semibold truncate tracking-tight min-w-0">{contact.email}</span>
          </div>
        )}

        {contact.phone && (
          <div className="flex items-center gap-4 text-[#6D4C41]">
            <div className="flex-none p-2 rounded-xl bg-[#FAF9F6] border border-[#D2B48C]/50 shadow-sm">
              <Phone className="w-4 h-4 text-[#8B5E3C]" />
            </div>
            <span className="text-sm font-semibold truncate min-w-0">{contact.phone}</span>
          </div>
        )}
      </div>

      {contact.message?.trim() && (
        <div className="bg-[#FAF9F6] p-5 rounded-[2rem] mb-7 border border-[#D2B48C]/30 relative">
          <MessageSquare className="w-4 h-4 text-[#8B5E3C]/20 absolute top-4 right-4" />
          <p className="text-xs text-[#6D4C41] italic font-medium leading-relaxed line-clamp-2 overflow-hidden text-ellipsis">
            "{contact.message}"
          </p>
        </div>
      )}

      {/* Footer Area */}
      <div className="flex items-center justify-between pt-5 border-t border-[#D2B48C]/40">
        <div className="flex items-center gap-2 text-[#A68A64] min-w-0">
          <Calendar className="flex-none w-4 h-4" />
          <span className="text-[11px] font-black uppercase tracking-wider truncate">
            {new Date(contact.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default ContactCard;