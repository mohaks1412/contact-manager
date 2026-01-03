'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from "react-hot-toast";
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import contactService from './services/contactService';

export default function App() {
  const [state, setState] = useState({
    all: [],
    filtered: [],
    loading: true
  });

  const syncContacts = useCallback(async () => {
    try {
      const data = await contactService.getContacts();
      setState(prev => ({ 
        ...prev, 
        all: data, 
        filtered: data, 
        loading: false 
      }));
    } catch (err) {
      console.error('Data sync failed:', err);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    syncContacts();
  }, [syncContacts]);

  const onSearch = (term) => {
    const query = term.toLowerCase().trim();
    if (!query) {
      setState(prev => ({ ...prev, filtered: prev.all }));
      return;
    }
    const matches = state.all.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phone.includes(query)
    );
    setState(prev => ({ ...prev, filtered: matches }));
  };

  const onAdd = (item) => {
    setState(prev => {
      const updated = [item, ...prev.all];
      return { ...prev, all: updated, filtered: updated };
    });
  };

  const onRemove = (id) => {
    setState(prev => {
      const updated = prev.all.filter(c => c._id !== id);
      return { ...prev, all: updated, filtered: updated };
    });
  };

  return (
    /* Main Background: Paper White (#FAF9F6) */
    <div className="min-h-screen bg-[#FAF9F6] text-[#3E2723] selection:bg-[#D2B48C]/40 selection:text-[#3E2723] transition-colors duration-500">
      
      {/* 🍂 Warm Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] rounded-full bg-[#FFE4C4] blur-[140px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#DEB887]/30 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-[#3E2723]">
            Contact <span className="text-[#8B5E3C]">Manager.</span>
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
       
          <section className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-[#F5F5DC] border border-[#D2B48C] p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(62,39,35,0.08)] transition-all">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#3E2723]">
                <span className="w-2 h-6 bg-[#8B5E3C] rounded-full" />
                Register Entry
              </h3>
              <ContactForm onContactAdded={onAdd} />
            </div>
          </section>

  
          <section className="lg:col-span-7 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#FDF5E6]/50 p-6 rounded-3xl border border-[#D2B48C]/30">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#3E2723]">Records</h2>
                <p className="text-sm text-[#A68A64] font-bold uppercase tracking-wider">
                  {state.filtered.length} Entries found
                </p>
              </div>
              <div className="w-full md:w-80">
                <SearchBar onSearch={onSearch} />
              </div>
            </div>

            <div className="min-h-[400px]">
              {state.loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-10 h-10 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <ContactList 
                  contacts={state.filtered} 
                  onDelete={onRemove} 
                />
              )}
            </div>
          </section>
        </main>
      </div>

      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#F5F5DC',
            color: '#3E2723',
            border: '1px solid #D2B48C',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '700',
            padding: '16px 28px',
            boxShadow: '0 10px 30px rgba(62,39,35,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#8B5E3C',
              secondary: '#F5F5DC',
            },
          },
        }}
      />
    </div>
  );
}