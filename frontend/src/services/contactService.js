import axios from 'axios';

class ContactService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
    });
  }

  async getContacts() {
    try {
      const response = await this.api.get('/contacts');
      return response.data;

    } catch (error) {
      console.error('Fetch failed:', error);
      return this.contacts;
    }
  }

  async createContact(contactData) {
    try {
      const response = await this.api.post('/contacts', contactData);
      
      const newContact = response.data;
      return newContact;
    } catch (error) {
      console.error('Create failed:', error);
      throw error;
    }
  }

  async deleteContact(id) {
    try {
      await this.api.delete(`/contacts/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  }

  async updateContact(id, contactData) {
    try {
      const response = await this.api.put(`/contacts/${id}`, contactData);
      const index = this._contacts.findIndex(c => c._id === id);
      if (index !== -1) {
        this._contacts[index] = response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  }
}

export default new ContactService();
