import React, { createContext, useContext, useState, useEffect } from 'react';

export const CAMPUS_HUBS = [
  'All Campuses',
  'Chaitanya Engineering College',
  'Andhra University College of Engineering (AUCE)',
  'Gayatri Vidya Parishad College of Engineering (GVPCE)',
  'Anil Neerukonda Institute of Technology & Sciences (ANITS)',
  "Vignan's Institute of Information Technology (VIIT)",
  'Raghu Engineering College (REC)',
  'GITAM School of Technology, Visakhapatnam',
  'MVGR College of Engineering',
  'Sanketika Vidya Parishad Engineering College',
  'Baba Institute of Technology and Sciences (BITS Vizag)',
  'Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)',
  'Visakha Institute of Engineering & Technology (VIET)',
  'Wellfare Institute of Science, Technology and Management (WISTM)',
] as const;

export type CampusHub = typeof CAMPUS_HUBS[number];

export const DEFAULT_CAMPUS: CampusHub = 'Chaitanya Engineering College';

interface CampusContextType {
  selectedCampusHub: CampusHub;
  setSelectedCampusHub: (hub: CampusHub) => void;
  campusHubsList: readonly string[];
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCampusHub, setSelectedCampusHubState] = useState<CampusHub>(() => {
    const saved = localStorage.getItem('campora_campus_hub');
    if (saved && CAMPUS_HUBS.includes(saved as CampusHub) && saved !== 'All Campuses') {
      return saved as CampusHub;
    }
    return DEFAULT_CAMPUS;
  });

  useEffect(() => {
    localStorage.setItem('campora_campus_hub', selectedCampusHub);
  }, [selectedCampusHub]);

  const setSelectedCampusHub = (hub: CampusHub) => {
    setSelectedCampusHubState(hub);
  };

  return (
    <CampusContext.Provider
      value={{
        selectedCampusHub,
        setSelectedCampusHub,
        campusHubsList: CAMPUS_HUBS,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
