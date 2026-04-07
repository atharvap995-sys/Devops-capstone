import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import BgImage from '../assets/bg1.jpg';
import HeroBus from '../assets/bus.png';
import Bus1 from '../assets/bus1.png';
import Bus2 from '../assets/bus2.png';
import Bus3 from '../assets/bus3.png';
import Save from '../assets/save.png';
import dummyData from '../data/dummyData.json';

const imageMap = {
  bg1: BgImage,
  bus: HeroBus,
  bus1: Bus1,
  bus2: Bus2,
  bus3: Bus3,
};

const HomePage = () => {
  const navigate = useNavigate();
  const { hero, searchForm, categories, offers } = dummyData.home;

  return (
    <>
      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-6'>
        <div className='rounded-lg overflow-hidden relative min-h-[45vh] md:min-h-[58vh] flex items-center'>
          <img
            src={imageMap[hero.backgroundImage]}
            alt='city view'
            className='absolute inset-0 w-full h-full object-cover'
            fetchpriority='high'
            decoding='async'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent' />
          <div className='relative z-10 w-full p-6 md:p-10 grid md:grid-cols-2 items-center gap-8'>
            <div className='space-y-5'>
              <h1 className='text-4xl sm:text-5xl font-bold leading-tight text-white'>
                {hero.titleStart}
                <span className='text-violet-400 block'>{hero.titleHighlight}</span>
                {hero.titleEnd}
              </h1>
              <p className='text-sm sm:text-base max-w-md text-neutral-200'>
                {hero.description}
              </p>
              <button
                onClick={() => navigate('/bus')}
                className='bg-violet-600 hover:bg-violet-700 text-white text-sm px-5 py-2 rounded transition-colors'
              >
                {hero.ctaText}
              </button>
            </div>
            <div className='hidden md:flex justify-end'>
              <img
                src={imageMap[hero.heroBusImage]}
                alt='bus'
                className='w-[540px] max-w-full object-contain'
                fetchpriority='high'
                decoding='async'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 pb-8'>
        <div className='rounded-lg bg-neutral-100 dark:bg-neutral-900 p-5 md:p-6 shadow-sm'>
          <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-4'>
{searchForm.map((field) => (
  <label key={field.label} className='space-y-1'>
    <span className='text-xs text-neutral-700 dark:text-neutral-300'>{field.label}</span>

    {field.label === "From" || field.label === "To" ? (
      <select
        defaultValue=""
        onChange={(e) => {
          const selected = e.target.value;
          const other = document.querySelector(
            `select[name="${field.label === "From" ? "To" : "From"}"]`
          );
          if (other && other.value === selected) {
            alert("From and To cannot be same!");
            e.target.value = "";
          }
        }}
        name={field.label}
        className='w-full px-3 py-2 bg-neutral-200/70 dark:bg-neutral-800 rounded text-sm outline-none border border-transparent focus:border-violet-500'
      >
        <option value="">Select City</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
    ) : field.label === "Choose Time" ? (
  <select
    defaultValue=""
    required
    className='w-full px-3 py-2 bg-neutral-200/70 dark:bg-neutral-800 rounded text-sm outline-none border border-transparent focus:border-violet-500'
  >
    <option value="" disabled>Select Time</option>
    <option value="06:00">06:00 AM</option>
    <option value="09:00">09:00 AM</option>
    <option value="12:00">12:00 PM</option>
    <option value="15:00">03:00 PM</option>
    <option value="18:00">06:00 PM</option>
    <option value="21:00">09:00 PM</option>
  </select>
) : field.label === "Total Seat" ? (
  <input
    type="number"
    min="1"
    max="10"
    required
    placeholder="Enter seats"
    defaultValue=""
    onInput={(e) => {
      if (e.target.value < 1) e.target.value = 1;
      if (e.target.value > 10) e.target.value = 10;
    }}
    className='w-full px-3 py-2 bg-neutral-200/70 dark:bg-neutral-800 rounded text-sm outline-none border border-transparent focus:border-violet-500'
  />
) : (
      <input
        type={field.label === "Choose Date" ? "date" : "text"}
        defaultValue=""
        placeholder={field.placeholder}
        min={
          field.label === "Choose Date"
            ? new Date().toISOString().split("T")[0]
            : undefined
        }
        className='w-full px-3 py-2 bg-neutral-200/70 dark:bg-neutral-800 rounded text-sm outline-none border border-transparent focus:border-violet-500'
      />
    )}
  </label>
))}            <div className='flex items-end'>
  <button
    onClick={(e) => {
      const inputs = document.querySelectorAll("input, select");
      let valid = true;

      inputs.forEach((input) => {
        if (!input.value) {
          valid = false;
        }
      });

      if (!valid) {
        alert("Please fill all fields!");
        return;
      }

      navigate('/services');
    }}
    className='w-full bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded transition-colors'
  >
    Check Availability
  </button>
</div>
          </div>
        </div>
      </section>

      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-4'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>Category</h2>
          <button className='text-xs text-violet-600 dark:text-violet-400'>View all</button>
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
          {categories.map((category) => (
            <article key={category.id} className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4'>
              <img src={imageMap[category.image]} alt={category.name} className='h-28 w-full object-contain' loading='lazy' decoding='async' />
            </article>
          ))}
        </div>
      </section>

      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 pt-4 pb-10'>
        <h2 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>Special Offers</h2>
        <div className='grid md:grid-cols-2 gap-4'>
          {offers.map((offer) => (
            <article key={offer.id} className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-5 flex items-center justify-between'>
              <img src={Save} alt='offer icon' className='w-11 h-11 object-contain' loading='lazy' decoding='async' />
              <div className='flex-1 ml-4'>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>{offer.title}</p>
                <p className='text-xs mt-2 text-violet-600 dark:text-violet-400'>{offer.coupon}</p>
                <p className='text-xs text-neutral-500'>{offer.validity}</p>
              </div>
              <FaArrowRight className='text-violet-500' />
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
