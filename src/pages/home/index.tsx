import { useState } from 'react';

import { useRecentSearches } from '@/hooks/useRecentSearches';
import { BestSpotsDrawer } from '@/pages/home/components/BestSpotsDrawer';
import SearchBar from '@/pages/home/components/SearchBar';
import SearchScreen from '@/pages/home/components/SearchScreen';
import { useKakaoMap } from '@/pages/home/hooks/useKakaoMap';
import { useSearch } from '@/pages/home/hooks/useSearch';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { mapContainerRef, mapRef } = useKakaoMap();
  const { results, search, focusPlace } = useSearch(mapRef);
  const { recentSearches, save, remove } = useRecentSearches();

  const handleSearch = (keyword: string) => {
    save(keyword);
    search(keyword);
  };

  return (
    <>
      <div id="map" ref={mapContainerRef} />

      <div id="main-overlay">
        <SearchBar onOpen={() => setIsSearchOpen(true)} />
      </div>

      <BestSpotsDrawer />

      {isSearchOpen && (
        <SearchScreen
          results={results}
          recentSearches={recentSearches}
          onSearch={handleSearch}
          onFocusPlace={(i) => {
            focusPlace(i);
            setIsSearchOpen(false);
          }}
          onClose={() => setIsSearchOpen(false)}
          onDeleteRecent={remove}
        />
      )}
    </>
  );
}
