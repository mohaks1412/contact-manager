'use client';

import React, { useState } from 'react';
import contactService from '../services/contactService';
import toast from 'react-hot-toast';
import { User, Mail, Phone, MessageSquare, Send, AlertCircle } from 'lucide-react';

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);


  const validate = () => {
    const nextErrors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!formData.email || !emailPattern.test(formData.email)) nextErrors.email = 'Valid email required';
    if (!formData.phone.trim()) nextErrors.phone = 'Phone required';
    
    setErrors(nextErrors);
    const valid = Object.keys(nextErrors).length === 0;
    setIsValid(valid);
    return valid;
  };

  const handleInputChange = (field) => (e) => {
    const newFormData = { ...formData, [field]: e.target.value };
    setFormData(newFormData);
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    validate();
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await contactService.createContact(formData);
      toast.success('Directory updated');
      onContactAdded(result);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (err) {
      toast.error('Sync failed');
      setErrors({ submit: 'Service unavailable' });
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = ()=>{

    return loading || !isValid;
  }
  const getInputClasses = (fieldName) => `
    w-full pl-11 pr-4 py-3 bg-[#FAF9F6] rounded-2xl outline-none transition-all duration-200 text-sm font-semibold
    ${errors[fieldName] 
      ? 'border-2 border-red-500 bg-red-50/30 text-red-900 placeholder:text-red-300' 
      : 'border border-[#D2B48C] text-[#3E2723] focus:border-[#8B5E3C] focus:ring-4 focus:ring-[#8B5E3C]/10 placeholder:text-[#A68A64]'
    }
  `;

  return (
    <form onSubmit={handleSubmission} className="space-y-6">
      <div className="relative group">
        <User className={`absolute left-4 top-3.5 w-4 h-4 transition-colors ${errors.name ? 'text-red-500' : 'text-[#A68A64] group-focus-within:text-[#8B5E3C]'}`} />
        <input
          className={getInputClasses('name')}
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleInputChange('name')}
        />
        {errors.name && (
          <div className="flex items-center gap-1 mt-1 ml-2 text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{errors.name}</span>
          </div>
        )}
      </div>

      <div className="relative group">
        <Mail className={`absolute left-4 top-3.5 w-4 h-4 transition-colors ${errors.email ? 'text-red-500' : 'text-[#A68A64] group-focus-within:text-[#8B5E3C]'}`} />
        <input
          className={getInputClasses('email')}
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleInputChange('email')}
        />
        {errors.email && (
          <div className="flex items-center gap-1 mt-1 ml-2 text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{errors.email}</span>
          </div>
        )}
      </div>

      <div className="relative group">
        <Phone className={`absolute left-4 top-3.5 w-4 h-4 transition-colors ${errors.phone ? 'text-red-500' : 'text-[#A68A64] group-focus-within:text-[#8B5E3C]'}`} />
        <input
          className={getInputClasses('phone')}
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={handleInputChange('phone')}
        />
        {errors.phone && (
          <div className="flex items-center gap-1 mt-1 ml-2 text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{errors.phone}</span>
          </div>
        )}
      </div>

      <div className="relative group">
        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-[#A68A64] group-focus-within:text-[#8B5E3C]" />
        <textarea
          className={`${getInputClasses('message')} h-32 resize-none`}
          placeholder="Notes (optional)..."
          value={formData.message}
          onChange={handleInputChange('message')}
        />
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled()}
        className={`
          w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-200 shadow-xl
          ${isButtonDisabled() 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none opacity-60 hover:bg-gray-300 active:scale-100' 
            : 'bg-[#8B5E3C] text-[#F5F5DC] hover:bg-[#3E2723] active:scale-[0.98] shadow-[#8B5E3C]/20'
          }
        `}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span className="uppercase tracking-widest text-xs">Register Entry</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
