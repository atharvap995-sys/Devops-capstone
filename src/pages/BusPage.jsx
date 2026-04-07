import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bus1 from '../assets/bus1.png';
import Bus2 from '../assets/bus2.png';
import Bus3 from '../assets/bus3.png';
import Bus4 from '../assets/bus4.png';
import Bus5 from '../assets/bus5.png';
import Bus6 from '../assets/bus6.png';
import dummyData from '../data/dummyData.json';

const imageMap = {
  bus1: Bus1,
  bus2: Bus2,
  bus3: Bus3,
  bus4: Bus4,
  bus5: Bus5,
  bus6: Bus6,
};

const BusPage = () => {
  const navigate = useNavigate();
  const { buses } = dummyData.busListing;

  const [formValid, setFormValid] = useState(false);

  const checkForm = () => {
    const inputs = document.querySelectorAll("input, select");
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value) valid = false;
    });

    setFormValid(valid);
  };

  return (
    <>
      
      {/* 🔽 YOUR SEARCH FORM (REPLACED OLD ONE) */}
      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 pb-8'>
        <div className='rounded-lg bg-neutral-100 dark:bg-neutral-900 p-5 md:p-6 shadow-sm'>
          <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-4'>

            {/* FROM */}
            <label className='space-y-1'>
              <span className='text-xs'>From</span>
              <select onChange={checkForm} className='w-full px-3 py-2 bg-neutral-200 rounded text-sm'>
                <option value="">Select City</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Chennai</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
              </select>
            </label>

            {/* TO */}
            <label className='space-y-1'>
              <span className='text-xs'>To</span>
              <select onChange={checkForm} className='w-full px-3 py-2 bg-neutral-200 rounded text-sm'>
                <option value="">Select City</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Chennai</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
              </select>
            </label>

            {/* DATE */}
            <label className='space-y-1'>
              <span className='text-xs'>Choose Date</span>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={checkForm}
                className='w-full px-3 py-2 bg-neutral-200 rounded text-sm'
              />
            </label>

            {/* TIME */}
            <label className='space-y-1'>
              <span className='text-xs'>Choose Time</span>
              <select onChange={checkForm} className='w-full px-3 py-2 bg-neutral-200 rounded text-sm'>
                <option value="">Select Time</option>
                <option>06:00 AM</option>
                <option>09:00 AM</option>
                <option>12:00 PM</option>
                <option>03:00 PM</option>
                <option>06:00 PM</option>
                <option>09:00 PM</option>
              </select>
            </label>

            {/* SEATS */}
            <label className='space-y-1'>
              <span className='text-xs'>Total Seat</span>
              <input
                type="number"
                min="1"
                max="10"
                onChange={checkForm}
                className='w-full px-3 py-2 bg-neutral-200 rounded text-sm'
              />
            </label>

          </div>
        </div>
      </section>

      {/* 🔽 BUS LIST (UNCHANGED) */}
      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 pb-10'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {buses.map((bus) => (
            <article key={bus.id} className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4'>
              <img src={imageMap[bus.image]} alt={bus.name} className='h-32 w-full object-contain' />
              <div className='mt-3 flex items-center justify-between'>
                <h3 className='text-sm font-semibold'>{bus.name}</h3>
                <span className='text-xs'>{bus.seats} Passengers</span>
              </div>

              <button
                disabled={!formValid}
                onClick={() => navigate('/services', { state: { busId: bus.id } })}
                className={`mt-3 w-full text-white text-xs px-3 py-2 rounded ${
                  formValid
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                View Bus Details & Reserve
              </button>

            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default BusPage;