import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  MapPin, 
  MessageSquare, 
  Package, 
  Star, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const PeoplePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCampusHub, setSelectedCampusHub, campusHubsList } = useCampus();
  const { products } = useProducts();
  const { startOrGetChat } = useChat();
  const { user: currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Registered students database (from real signups + current user)
  const realStudents = useMemo(() => {
    const list: any[] = [];
    try {
      const saved = localStorage.getItem('campora_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach((u: any) => {
            if (u.id && !u.id.startsWith('user_priya') && !u.id.startsWith('user_rohan') && !u.id.startsWith('user_ananya') && !u.id.startsWith('user_devansh') && !u.id.startsWith('user_sana') && !u.id.startsWith('user_ishaan')) {
              list.push({
                id: u.id,
                name: u.name,
                collegeId: u.collegeId,
                department: u.department || 'Engineering',
                year: u.year || 'Student',
                campusHub: u.collegeName || 'Chaitanya Engineering College',
                hosteller: u.hosteller ?? true,
                verified: u.verified ?? true,
                avatar: u.profilePhoto,
                bio: `${u.department || 'Engineering'} student at ${u.collegeName || 'Chaitanya Engineering College'}.`,
              });
            }
          });
        }
      }
    } catch (e) {}

    // Add current user if not already in list
    if (currentUser && !list.some(s => s.id === currentUser.id)) {
      list.push({
        id: currentUser.id,
        name: currentUser.name,
        collegeId: currentUser.collegeId,
        department: currentUser.department || 'Engineering',
        year: currentUser.year || 'Student',
        campusHub: currentUser.collegeName || 'Chaitanya Engineering College',
        hosteller: currentUser.hosteller ?? true,
        verified: currentUser.verified ?? true,
        avatar: currentUser.profilePhoto,
        bio: `${currentUser.department || 'Engineering'} student at ${currentUser.collegeName || 'Chaitanya Engineering College'}.`,
      });
    }

    return list;
  }, [currentUser]);

  // Filter students based on campus hub, search query, and department
  const filteredStudents = useMemo(() => {
    return realStudents.filter(student => {
      // Campus Hub match
      if (selectedCampusHub !== 'All Campuses' && student.campusHub !== selectedCampusHub) {
        return false;
      }
      // Search match
      if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase()) && !student.department.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Department match
      if (selectedDepartment !== 'All' && student.department !== selectedDepartment) {
        return false;
      }
      return true;
    });
  }, [realStudents, selectedCampusHub, searchQuery, selectedDepartment]);

  const handleMessageUser = (student: any) => {
    const studentListings = products.filter(p => p.sellerId === student.id);
    if (studentListings.length > 0) {
      startOrGetChat(studentListings[0]);
    } else {
      toast.success(`Chat initiated with ${student.name}`);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-[#E8E1D5] dark:bg-black text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
              <Users className="w-4 h-4 inline" /> Verified Campus Directory
            </div>
            <h1 className="text-3xl font-black text-stone-900 dark:text-white">Campus Peer Network</h1>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">Discover and message verified students across campus hubs</p>
          </div>

          {/* Campus Hub Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400">Campus Hub:</span>
            <select
              value={selectedCampusHub}
              onChange={(e) => setSelectedCampusHub(e.target.value as any)}
              className="px-3.5 py-2 rounded-lg bg-[#F5EFE6] dark:bg-stone-900 border border-[#CFC4B3] dark:border-stone-800 text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {campusHubsList.map((hub) => (
                <option key={hub} value={hub}>{hub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search students by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-semibold focus:outline-none text-stone-700 dark:text-stone-300"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics & Comm.">Electronics & Comm.</option>
              <option value="Mechanical Eng.">Mechanical Eng.</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electrical Eng.">Electrical Eng.</option>
              <option value="Information Tech.">Information Tech.</option>
            </select>
          </div>
        </div>

        {/* Students Cards Grid or Empty State */}
        {filteredStudents.length === 0 ? (
          <div className="py-16 text-center rounded-xl border border-dashed border-stone-200 dark:border-stone-800 p-8 space-y-3">
            <Users className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">No registered students yet in this campus hub</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Create an account with your college credentials to appear in the campus peer directory and connect with classmates.
            </p>
            {!currentUser && (
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors mt-2"
              >
                Join Campus Directory
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => {
              const studentListingCount = products.filter(p => p.sellerId === student.id).length;
              return (
                <div
                  key={student.id}
                  className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top info */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-16 h-16 rounded-lg object-cover ring-2 ring-emerald-500/20"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-lg font-black text-emerald-600">
                            {student.name.charAt(0)}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white dark:ring-stone-900" title="Verified Student">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 
                            onClick={() => navigate(`/profile/${student.id}`)}
                            className="font-black text-stone-900 dark:text-white text-base truncate hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                          >
                            {student.name}
                          </h3>
                        </div>

                        <p className="text-xs text-stone-500 font-medium mt-0.5 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-stone-400" />
                          {student.department} • {student.year}
                        </p>

                        <p className="text-[11px] text-stone-400 mt-1 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-stone-400" /> {student.campusHub}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-4 leading-relaxed line-clamp-2">
                      "{student.bio}"
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-emerald-500" />
                      {studentListingCount} active listing{studentListingCount !== 1 ? 's' : ''}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/profile/${student.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
                      >
                        Profile
                      </button>
                      
                      <button
                        onClick={() => handleMessageUser(student)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Message
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
