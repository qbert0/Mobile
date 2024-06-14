'use client'
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DoctorDataType } from '@/contants/Type/DoctorType';

interface Props {
  doctor: DoctorDataType;
}

const ClinicForm = ({ doctor }: Props) => {
  const [clinicName, setClinicName] = useState('');
  const [major, setMajor] = useState('');
  const [price, setPrice] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const client = createClient(
    'https://snwjzonusggqqymhbluj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNud2p6b251c2dncXF5bWhibHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTU4MTEsImV4cCI6MjAyNzE5MTgxMX0.H-4glIFgFb31Gu3sl2X4nqFOnJw5MDKa0Yjf2SvW4A0'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
  
    try {
      // Fetch the maximum id from the Clinic table
      const { data: maxIdData, error: maxIdError } = await client
        .from('Clinic')
        .select('id', { count: 'exact' })
        .order('id', { ascending: false })
        .limit(1);
  
      if (maxIdError) {
        setError('Có lỗi xảy ra khi tạo phòng khám.');
        console.error('Error fetching max id:', maxIdError);
        return;
      }
  
      // Calculate the next id to use
      const nextId = maxIdData ? parseInt(maxIdData[0]?.id) + 1 || 1 : 1;

      // Insert new clinic with calculated id
      const { data, error } = await client
        .from('Clinic')
        .insert([
          { 
            id: nextId.toString(),
            doctor_id: doctor.id,
            name: clinicName,
            major: major,
            price: parseFloat(price),
            specialty_id: specialtyId
          }
        ]);
  
      if (error) {
        setError('Có lỗi xảy ra khi tạo phòng khám.');
        console.error('Error creating clinic:', error);
      } else {
        setSuccess('Phòng khám đã được tạo thành công!');
        setClinicName('');
        setMajor('');
        setPrice('');
        setSpecialtyId('');
        setShowForm(false);
        window.location.reload();
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo phòng khám.');
      console.error('Something went wrong:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 my-4 rounded" onClick={() => setShowForm(true)}>Tạo Phòng Khám Mới</button>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tạo Phòng Khám Mới</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="clinicName" className="block text-gray-700">Khoa Khám:</label>
                <input 
                  type="text" 
                  id="clinicName" 
                  value={clinicName} 
                  onChange={(e) => setClinicName(e.target.value)} 
                  required 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="major" className="block text-gray-700">Phòng Khám:</label>
                <input 
                  type="text" 
                  id="major" 
                  value={major} 
                  onChange={(e) => setMajor(e.target.value)} 
                  required 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">Giá tiền:</label>
                <input 
                  type="number" 
                  id="price" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialtyId" className="block text-gray-700">Mã Chuyên Khoa:</label>
                <input 
                  type="text" 
                  id="specialtyId" 
                  value={specialtyId} 
                  onChange={(e) => setSpecialtyId(e.target.value)} 
                  required 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
                  {isSubmitting ? 'Đang tạo...' : 'Tạo Phòng Khám'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicForm;
