import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, ArrowRight, MapPin, Calendar, Plane, CheckCircle2, Ticket
} from 'lucide-react';
import { CABS_DATA } from '../../data/cabsData';
import { saveBooking } from '../../lib/bookingStore';
import { CustomSelect } from '../common/CustomSelect';
import type { BookingRecord } from '../../types/travel';

export const CabsBookingEngine: React.FC = () => {
  const [tripType, setTripType] = useState<'airport' | 'outstation'>('airport');
  const [pickup, setPickup] = useState('Kempegowda International Airport (BLR Terminal 2)');
  const [dropoff, setDropoff] = useState('Indiranagar / MG Road (Central Bengaluru)');
  const [selectedCabId, setSelectedCabId] = useState(CABS_DATA[0].id);
  const [pickupDate, setPickupDate] = useState('2026-08-30');
  const [pickupTime, setPickupTime] = useState('08:30 PM');
  const [flightNumber, setFlightNumber] = useState('6E-452');
  
  const [passengerName, setPassengerName] = useState('Vikram Somanna');
  const [passengerPhone, setPassengerPhone] = useState('+91 94801 88990');
  const [passengerEmail, setPassengerEmail] = useState('vikram.somanna@gmail.com');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const pickupOptions = [
    { value: 'Kempegowda International Airport (BLR Terminal 2)', label: 'BLR Airport (Terminal 2 Arrivals)' },
    { value: 'Kempegowda International Airport (BLR Terminal 1)', label: 'BLR Airport (Terminal 1 Arrivals)' },
    { value: 'Indiranagar / MG Road (Central Bengaluru)', label: 'Central Bengaluru (MG Road / Indiranagar)' },
    { value: 'Whitefield / ITPL (East Bengaluru)', label: 'Whitefield / ITPL / Marathahalli' },
    { value: 'Electronic City / Silk Board (South Bengaluru)', label: 'Electronic City / Silk Board' },
    { value: 'Koramangala / HSR Layout', label: 'Koramangala / HSR Layout' },
    { value: 'Majestic KSR Railway Station', label: 'Majestic Railway Station / City Centre' },
    { value: 'Mysuru City Centre', label: 'Mysuru City (Outstation)' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('pickup');
      const d = params.get('drop');
      if (p) setPickup(p);
      if (d) setDropoff(d);
    }
  }, []);

  const selectedCab = CABS_DATA.find((c) => c.id === selectedCabId) || CABS_DATA[0];

  const baseFare = tripType === 'airport' ? selectedCab.airportDropPrice : selectedCab.outstationRatePerKm * selectedCab.minKmPerDay;
  const gst = Math.round(baseFare * 0.05);
  const totalTariff = baseFare + gst;

  const handleBookCab = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const bookingId = `KSTDC-TAXI-BLR-${Math.floor(1000 + Math.random() * 9000)}`;

    const cabBooking: BookingRecord = {
      bookingId,
      createdAt: new Date().toISOString(),
      serviceType: 'cab',
      tripId: selectedCab.id,
      tripTitle: `Prepaid Airport Taxi (${selectedCab.name})`,
      tripSlug: 'cabs',
      destination: dropoff,
      departureDate: pickupDate,
      pickupPoint: pickup,
      pickupTime,
      vehicleType: `${selectedCab.name} (${selectedCab.type})`,
      hotelName: 'Official KSTDC 24x7 Airport Fleet',
      travellers: { adults: 2, children: 0, seniors: 0 },
      passengers: [
        { id: 'tax-p1', name: passengerName, age: 32, gender: 'Male', type: 'Adult', seatNumber: 'Passenger 1 (Lead)' },
        { id: 'tax-p2', name: 'Co-Passenger', age: 30, gender: 'Female', type: 'Adult', seatNumber: 'Passenger 2' },
      ],
      contact: {
        name: passengerName,
        email: passengerEmail,
        phone: passengerPhone,
        specialAssistance: false,
      },
      roomType: 'Official Government Computerised Prepaid Slip',
      pricing: {
        basePrice: baseFare,
        seniorDiscount: 0,
        gstAmount: gst,
        totalAmount: totalTariff,
      },
      status: 'Confirmed',
      paymentMethod: 'Prepaid FastTag / Counter Pay',
      extraDetails: {
        flightNumber,
        driverName: 'Government Certified Airport Chauffeur (Assigned on arrival)',
        vehicleNo: 'KA-04-KSTDC-XXXX',
        emergencyHelpline: '080-4334 4334',
      },
    };

    saveBooking(cabBooking);

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedBookingId(bookingId);
      setIsModalOpen(true);
    }, 700);
  };

  return (
    <div className="space-y-12">
      
      {/* Interactive Fare Calculator & Instant Booking Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-lg p-6 sm:p-8 lg:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
              Direct Citizen Prepaid Counter
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Calculate Official Fare & Reserve Taxi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Fixed government computerised tariff · Zero surge · Airport expressway toll included.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTripType('airport')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                tripType === 'airport' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Airport Transfer (BLR)
            </button>
            <button
              type="button"
              onClick={() => setTripType('outstation')}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                tripType === 'outstation' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Outstation Chauffeur
            </button>
          </div>
        </div>

        <form onSubmit={handleBookCab} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pickup Location with CustomSelect */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Pickup Location
              </label>
              <CustomSelect
                value={pickup}
                onChange={setPickup}
                options={pickupOptions}
                placeholder="Select Pickup"
              />
            </div>

            {/* Drop Destination */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Destination Dropoff
              </label>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter hotel or neighborhood"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Pickup Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  placeholder="08:30 PM"
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Flight Number */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                Flight Number (Optional)
              </label>
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="e.g. 6E-452 / AI-508"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Vehicle Fleet Selector */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Select Vehicle Class
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CABS_DATA.map((cab) => {
                const isSelected = cab.id === selectedCabId;
                const fare = tripType === 'airport' ? cab.airportDropPrice : cab.outstationRatePerKm * cab.minKmPerDay;
                return (
                  <div
                    key={cab.id}
                    onClick={() => setSelectedCabId(cab.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-slate-950 dark:border-white bg-slate-50 dark:bg-slate-800 shadow-md'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{cab.type}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </div>
                    <div className="text-lg font-bold text-slate-950 dark:text-white">{cab.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cab.seating} · {cab.luggage} Luggage · AC Multi-Airbag</div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-baseline justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Fixed Rate</span>
                      <span className="text-xl font-bold text-slate-950 dark:text-white">₹{fare.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Passenger Details & Booking Trigger */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Passenger & Boarding Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Full Name"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-semibold"
                required
              />
              <input
                type="text"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                placeholder="Mobile Number"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-semibold"
                required
              />
              <input
                type="email"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
                placeholder="Email Address"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-semibold"
                required
              />
            </div>
          </div>

          {/* Submit Action Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Government Computerised Receipt · Zero Surcharge · 100% Tolls Included</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Generating Boarding Slip...</span>
              ) : (
                <>
                  <span>Confirm Prepaid Airport Cab (₹{totalTariff.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && confirmedBookingId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white animate-fade-in text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Prepaid Slip Confirmed
              </span>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                Booking Reference
              </h3>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-bold text-base text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                {confirmedBookingId}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Pickup:</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Destination:</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{dropoff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Vehicle:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedCab.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total Tariff:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{totalTariff.toLocaleString('en-IN')} (Tolls Included)</span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="/my-bookings"
                className="w-full py-3 px-4 rounded-full bg-slate-950 dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-blue-700 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>View in Citizen Wallet</span>
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
