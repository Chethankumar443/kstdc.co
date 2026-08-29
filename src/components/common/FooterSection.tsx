import React from 'react';
import { PhoneCall, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-[#060a12] text-slate-100 border-t border-slate-800 pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white shadow-xs">
                <img
                  src="/kstdc-logo.png"
                  alt="Official KSTDC Logo"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="p-1 px-2 rounded-xl bg-white shadow-xs">
                <img
                  src="/karnataka-tourism-logo.png"
                  alt="Karnataka Department of Tourism"
                  className="h-7 object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight">KSTDC</span>
                <span className="block text-[11px] text-slate-400">Karnataka State Tourism Development Corporation</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Official enterprise of the Government of Karnataka, providing trusted conducted tours, Hotel Mayura heritage stays, 24x7 prepaid airport taxi transfers, and Ambaari sightseeing experiences.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-semibold shadow-xs">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Toll-Free: <strong>1800 425 3333</strong> | 080-4334 4334</span>
              </div>
              <div className="flex items-center gap-2 px-1 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Email: <a href="mailto:info@kstdc.co" className="hover:underline text-white font-medium">info@kstdc.co</a></span>
              </div>
              <div className="flex items-start gap-2 px-1 text-slate-300 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Khanija Bhavan, West Wing, 49, Race Course Rd, Bengaluru 560001</span>
              </div>
            </div>
          </div>

          {/* Quick Circuits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official Circuits
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="/trips/coorg-mist-and-waterfalls" className="hover:text-white hover:underline transition-colors">Southern: Coorg Mist & Coffee</a></li>
              <li><a href="/trips/hampi-the-golden-empire" className="hover:text-white hover:underline transition-colors">Northern: Hampi UNESCO Heritage</a></li>
              <li><a href="/trips/mysuru-royal-heritage-express" className="hover:text-white hover:underline transition-colors">Royal: Mysuru Palace Express</a></li>
              <li><a href="/trips/gokarna-murudeshwar-coastal-escape" className="hover:text-white hover:underline transition-colors">Coastal: Gokarna & Murudeshwar</a></li>
              <li><a href="/trips/chikmagalur-mullayanagiri-trails" className="hover:text-white hover:underline transition-colors">Hill Trails: Chikmagalur Peak</a></li>
            </ul>
          </div>

          {/* Hotel Mayura */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hotel Mayura Stays
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="/stays" className="hover:text-white hover:underline transition-colors">Hotel Mayura Valley View (Coorg)</a></li>
              <li><a href="/stays" className="hover:text-white hover:underline transition-colors">Hotel Mayura Bhuvaneshwari (Hampi)</a></li>
              <li><a href="/stays" className="hover:text-white hover:underline transition-colors">Hotel Mayura Hoysala (Mysuru)</a></li>
              <li><a href="/stays" className="hover:text-white hover:underline transition-colors">Hotel Mayura Samudra (Gokarna)</a></li>
              <li><a href="/stays" className="hover:text-white hover:underline transition-colors">Hotel Mayura Gerusoppa (Jog Falls)</a></li>
            </ul>
          </div>

          {/* Citizen Charter & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Citizen Charter
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="/cabs" className="hover:text-white hover:underline transition-colors">24x7 Airport Prepaid Taxi</a></li>
              <li><a href="/activities" className="hover:text-white hover:underline transition-colors">Ambaari Open Deck Bus</a></li>
              <li><a href="/terms" className="hover:text-white hover:underline transition-colors">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
              <li className="flex items-center gap-1.5 text-emerald-400 pt-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Public Tariffs</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Disclosure */}
        <div className="pt-8 border-t border-slate-800 space-y-4 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span>© 2026 Karnataka State Tourism Development Corporation (KSTDC). </span>
              <span className="text-slate-300 font-medium">Citizen Tourism Portal.</span>
            </div>

            <div className="flex items-center gap-5 text-xs font-medium text-slate-300">
              <a href="/terms" className="hover:text-white hover:underline transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-white hover:underline transition-colors">Privacy</a>
              <a href="/trips" className="hover:text-white hover:underline transition-colors">Tours</a>
              <a href="/stays" className="hover:text-white hover:underline transition-colors">Hotels</a>
              <a href="/cabs" className="hover:text-white hover:underline transition-colors">Airport Taxi</a>
              <a href="/my-bookings" className="hover:text-white hover:underline transition-colors">My Bookings</a>
            </div>
          </div>

          {/* Prototype Notice */}
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase tracking-wider shrink-0">
                Official Portal
              </span>
              <span>
                Demonstration citizen portal for Karnataka tourism. Built with verified routes, transparent tariffs, and digital boarding passes.
              </span>
            </div>
            <span className="text-[10px] text-slate-500 shrink-0">
              Karnataka Tourism Initiative
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
