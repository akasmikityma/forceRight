import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteTracks } from "@/comps/UseInfiniteTracks"

const LastCompletedInfinite: React.FC = () => {
  const { tracks, loading, hasMore, error, loadMore } = useInfiniteTracks(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!sentinelRef.current) return;
    
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    }, { root: null, rootMargin: "200px", threshold: 0.1 });

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasMore, loadMore, loading]);

  return (
    <div className="space-y-4">
      {tracks.map(track => (
        <div 
          key={track.id} 
          className="border p-4 rounded bg-white hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => nav(`/track/${track.id}`)}
        >
          <div className="flex justify-between items-center">
            <div className="truncate flex-1">{track.problemLink}</div>
            <div className="text-sm text-gray-500 ml-4">
              {new Date(track.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}

      {error && (
        <div className="text-red-500 p-4 text-center">{error}</div>
      )}

      <div ref={sentinelRef} className="h-8" />

      {loading && (
        <div className="text-center py-4 text-gray-600">
          Loading more tracks...
        </div>
      )}
      
      {!hasMore && !loading && tracks.length > 0 && (
        <div className="text-center text-sm text-gray-500 py-4">
          You've reached the end of your tracks
        </div>
      )}
    </div>
  );
};

export default LastCompletedInfinite;