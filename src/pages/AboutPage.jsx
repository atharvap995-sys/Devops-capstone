import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowRight, FaLocationDot } from 'react-icons/fa6';
import dummyData from '../data/dummyData.json';

const AboutPage = () => {
  const location = useLocation();
  const { passengerFields, bookingStatus, support } = dummyData.checkout;
  const reservation = location.state?.reservation;
  const [isPaying, setIsPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [formData, setFormData] = useState({
    Fullname: '',
    'Email Address': '',
    Phone: '',
    'Alternative Phone': '',
  });

  const checkoutData = useMemo(() => {
    if (!reservation) {
      return {
        from: bookingStatus.from,
        to: bookingStatus.to,
        departAt: bookingStatus.departAt,
        arriveAt: bookingStatus.arriveAt,
        totalSeats: bookingStatus.totalSeats,
        totalAmount: bookingStatus.totalAmount,
        currency: bookingStatus.currency,
        seatNumbers: [],
        busName: 'Luxury Bus',
      };
    }

    return {
      from: reservation.from,
      to: reservation.to,
      departAt: reservation.departAt,
      arriveAt: bookingStatus.arriveAt,
      totalSeats: reservation.totalSeats,
      totalAmount: reservation.amount,
      currency: reservation.currency,
      seatNumbers: reservation.seatNumbers,
      busName: reservation.busName,
    };
  }, [reservation, bookingStatus]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleDummyPay = () => {
    setIsPaying(true);
    setTimeout(() => {
      const id = `PAY-${Date.now()}`;
      setPaymentId(id);
      setPaid(true);
      setIsPaying(false);
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    const lines = [
      'GBUS - BUS TICKET RECEIPT',
      '------------------------------------',
      `Payment ID: ${paymentId}`,
      `Passenger: ${formData.Fullname || 'N/A'}`,
      `Email: ${formData['Email Address'] || 'N/A'}`,
      `Phone: ${formData.Phone || 'N/A'}`,
      `Bus: ${checkoutData.busName}`,
      `From: ${checkoutData.from}`,
      `To: ${checkoutData.to}`,
      `Depart At: ${checkoutData.departAt}`,
      `Arrive At: ${checkoutData.arriveAt}`,
      `Seats: ${checkoutData.seatNumbers.length ? checkoutData.seatNumbers.join(', ') : 'N/A'}`,
      `Total Seats: ${checkoutData.totalSeats}`,
      `Total Amount: ${checkoutData.currency} ${checkoutData.totalAmount}`,
      `Paid On: ${new Date().toLocaleString()}`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gbus-receipt-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-8'>
        <div className='grid lg:grid-cols-2 gap-6'>
          <div className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-5'>
            <h3 className='text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100'>Passenger Information</h3>
            <div className='space-y-3'>
              {passengerFields.map((field) => (
                <label key={field.name} className='block'>
                  <span className='text-xs text-neutral-600 dark:text-neutral-400'>{field.name}</span>
                  <input
                    value={formData[field.name] ?? ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className='mt-1 w-full px-3 py-2 rounded bg-neutral-200/70 dark:bg-neutral-800 text-sm outline-none border border-transparent focus:border-violet-500'
                  />
                  {field.hint && <p className='mt-1 text-[10px] text-neutral-500'>{field.hint}</p>}
                </label>
              ))}
            </div>
          </div>

          <div className='bg-neutral-100 dark:bg-neutral-900 rounded-lg p-5'>
            <h3 className='text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100'>{bookingStatus.title}</h3>
            <div className='space-y-3 text-sm text-neutral-600 dark:text-neutral-400'>
              <div className='flex items-center justify-between'><span>{bookingStatus.destinationLabel}</span><span>To: {checkoutData.to}</span></div>
              <div className='flex items-center justify-between'><span>From: {checkoutData.from}</span><span>Depart at: {checkoutData.departAt}</span></div>
              <div className='flex items-center justify-between'><span>Arrive at: {checkoutData.arriveAt}</span><span>Total No. of Seat: {checkoutData.totalSeats}</span></div>
              <div className='flex items-center justify-between'><span>Seat Numbers</span><span>{checkoutData.seatNumbers.length ? checkoutData.seatNumbers.join(', ') : `${checkoutData.totalSeats} (${bookingStatus.driverSide})`}</span></div>
              <div className='flex items-center justify-between font-semibold text-neutral-900 dark:text-neutral-100'><span>Total Amount</span><span>{checkoutData.currency} {checkoutData.totalAmount}</span></div>
            </div>
            <button
              onClick={handleDummyPay}
              disabled={isPaying || paid}
              className='mt-5 w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm px-4 py-2 rounded'
            >
              {isPaying ? 'Processing Dummy Payment...' : paid ? 'Payment Successful' : 'Proceed to Pay'} <FaArrowRight className='inline ml-1' />
            </button>
            {paid && (
              <div className='mt-3 space-y-2'>
                <p className='text-xs text-emerald-600 dark:text-emerald-400'>Dummy payment done. Payment ID: {paymentId}</p>
                <button
                  onClick={handleDownloadReceipt}
                  className='w-full bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-sm px-4 py-2 rounded'
                >
                  Download Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-14'>
        <div className='max-w-4xl space-y-4'>
          <h1 className='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100'>{support.title}</h1>
          <p className='text-base sm:text-lg text-neutral-600 dark:text-neutral-400'>{support.description}</p>
          <div className='flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300'>
            <FaLocationDot className='text-violet-600' />
            <span>{support.address}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
