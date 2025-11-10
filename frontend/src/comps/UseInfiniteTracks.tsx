import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { CombinedTracks, TrackInterface } from "@/store/atoms";

// const dev_url = "http://localhost:8080";
const backEnd_url = "https://forceright-backend-1.onrender.com";
export function useInfiniteTracks(initialPageSize = 10) {
  const [combinedTracks, setCombinedTracks] = useRecoilState(CombinedTracks);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get<{ tracks: TrackInterface[]; hasMore: boolean }>(`${backEnd_url}/prtracks/mytracks`, {
        params: { page: p, pageSize },
        withCredentials: true,
      });
      const { tracks: fetched, hasMore: more } = resp.data;
      
      // Update combinedTracks atom instead of local state
      setCombinedTracks((prev: TrackInterface[]) => {
        const newTracks = p === 1 ? fetched : [...prev, ...fetched];
        // Remove duplicates by id
        const uniqueTracks = Array.from(
          new Map(newTracks.map(track => [track.id, track])).values()
        );
        return uniqueTracks;
      });
      
      setHasMore(Boolean(more));
    } catch (err: any) {
      setError(err?.message || "Failed to load tracks");
    } finally {
      setLoading(false);
    }
  }, [pageSize, setCombinedTracks]);

  useEffect(() => { 
    // Only fetch if combinedTracks is empty
    if (combinedTracks.length === 0) {
      fetchPage(1);
      setPage(1);
    }
  }, [fetchPage, combinedTracks.length]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }, [fetchPage, hasMore, loading, page]);

  return { 
    tracks: combinedTracks, 
    loading, 
    hasMore, 
    error, 
    loadMore 
  };
}