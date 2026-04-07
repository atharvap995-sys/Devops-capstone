import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa6';
import Bus7 from '../assets/bus7.png';
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
  bus7: Bus7,
};

const statusClassMap = {
  available: 'bg-neutral-500/70 dark:bg-neutral-400/60 hover:bg-neutral-600/80 dark:hover:bg-neutral-300/80',
  booked: 'bg-neutral-700 dark:bg-neutral-500 cursor-not-allowed',
  selected: 'bg-violet-600 hover:bg-violet-700',
};

const dotClassMap = {
  available: 'text-violet-600',
  booked: 'text-neutral-500',
  selected: 'text-neutral-700',
};

const Seat = ({ seat, onSelect }) => (
  <button
    type='button'
    title={`Seat ${seat.number}`}
    onClick={() => onSelect(seat.number)}
    disabled={seat.status === 'booked'}
    className={`w-5 h-5 rounded text-[10px] leading-none text-white inline-flex items-center justify-center ${statusClassMap[seat.status]}`}
  >
    {seat.number}
  </button>
);

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBusId = location.state?.busId;
  const selectedBus = dummyData.busListing.buses.find((item) => item.id === selectedBusId);
  const { bus, seats, legend, pricingRules } = dummyData.seatSelection;
  const activeBus = {
    ...bus,
    ...(selectedBus
      ? {
          name: selectedBus.name,
          type: selectedBus.type,
          image: selectedBus.image,
        }
      : {}),
  };
  const [selectedSeats, setSelectedSeats] = useState(
    seats.filter((seat) => seat.status === 'selected').map((seat) => seat.number)
  );

  const perSeatPrice = pricingRules[activeBus.type] ?? pricingRules.default;

  const seatsWithSelectionState = useMemo(
    () =>
      seats.map((seat) => {
        if (seat.status === 'booked') {
          return seat;
        }

        return {
          ...seat,
          status: selectedSeats.includes(seat.number) ? 'selected' : 'available',
        };
      }),
    [seats, selectedSeats]
  );

  const seatRows = useMemo(
    () =>
      Array.from({ length: Math.ceil(seatsWithSelectionState.length / 4) }, (_, index) =>
        seatsWithSelectionState.slice(index * 4, index * 4 + 4)
      ),
    [seatsWithSelectionState]
  );

  const totalAmount = selectedSeats.length * perSeatPrice;

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((number) => number !== seatNumber) : [...prev, seatNumber]
    );
  };

  return (
    <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-8'>
      <div className='grid lg:grid-cols-2 gap-6'>
        <div className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-5'>
          <img src={imageMap[activeBus.image]} alt='luxury bus' className='w-full h-56 object-contain' fetchpriority='high' decoding='async' />
          <h2 className='mt-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100'>{activeBus.name}</h2>
          <p className='text-xs text-neutral-500'>{activeBus.plate}</p>
          <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
            {activeBus.description}
          </p>
        </div>

        <div className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-5'>
          <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>Your Destination</h3>
          <div className='flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-2'>
            <span>From : {activeBus.from}</span>
            <span>To : {activeBus.to}</span>
          </div>
          <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-4'>Bus Leaving At : {activeBus.leavingAt}</p>

          <h4 className='text-sm font-medium mb-3'>Choose a Seat</h4>
          <div className='space-y-2'>
            {seatRows.map((row, rowIndex) => (
              <div key={rowIndex} className='flex items-center gap-6'>
                <div className='flex gap-2'>
                  {row.slice(0, 2).map((seat) => (
                    <Seat key={seat.number} seat={seat} onSelect={handleSeatSelect} />
                  ))}
                </div>
                <div className='flex gap-2'>
                  {row.slice(2, 4).map((seat) => (
                    <Seat key={seat.number} seat={seat} onSelect={handleSeatSelect} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className='mt-4 flex items-center gap-5 text-xs'>
            {legend.map((item) => (
              <span key={item.label} className='flex items-center gap-1'>
                <FaCircle className={`${dotClassMap[item.status]} text-[10px]`} /> {item.label}
              </span>
            ))}
          </div>

          <div className='mt-4 grid grid-cols-3 gap-3 max-w-[260px]'>
            {selectedSeats.map((seatNo) => (
              <button key={seatNo} className='bg-violet-600 text-white rounded py-1 text-xs'>{seatNo}</button>
            ))}
          </div>

          <p className='mt-2 text-xs text-neutral-500'>Total No. of seat: {seats.length} (including all seat rows)</p>
          <p className='mt-2 text-xs text-neutral-500'>Per seat price: {activeBus.currency} {perSeatPrice}</p>
          <p className='mt-2 text-xs text-neutral-500'>Selected seats: {selectedSeats.length}</p>
          <p className='mt-3 text-sm font-medium'>Total Fair Price: {activeBus.currency} {totalAmount}</p>
          <button
            onClick={() =>
              navigate('/about', {
                state: {
                  reservation: {
                    busName: activeBus.name,
                    from: activeBus.from,
                    to: activeBus.to,
                    departAt: activeBus.leavingAt,
                    seatNumbers: selectedSeats,
                    totalSeats: selectedSeats.length,
                    amount: totalAmount,
                    currency: activeBus.currency,
                  },
                },
              })
            }
            disabled={!selectedSeats.length}
            className='mt-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm px-4 py-2 rounded'
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
