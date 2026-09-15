import { useCallback, useEffect, useRef, useState } from 'react';
import { GOOGLE_CLIENT_ID, loadGsi } from '@/features/auth/googleClient';
import type { GoogleTokenClient } from '@/features/auth/gsi';
import { useLocalStorage } from './useLocalStorage';

const FIT_SCOPE = 'https://www.googleapis.com/auth/fitness.activity.read';
const AGGREGATE_URL = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';

function startOfToday(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Sums today's step_count.delta buckets returned by the Fit REST API. */
async function fetchTodaySteps(accessToken: string): Promise<number> {
  const res = await fetch(AGGREGATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: startOfToday(),
      endTimeMillis: Date.now(),
    }),
  });
  if (!res.ok) throw new Error(`Fit API error ${res.status}`);
  const data = await res.json();
  let total = 0;
  for (const bucket of data.bucket ?? []) {
    for (const dataset of bucket.dataset ?? []) {
      for (const point of dataset.point ?? []) {
        for (const value of point.value ?? []) {
          total += value.intVal ?? 0;
        }
      }
    }
  }
  return total;
}

/**
 * Connects to Google Fit (implicit OAuth token, no backend needed — same
 * pattern as the site's Google sign-in) and pulls today's real step count.
 * The access token is short-lived and kept only in memory; the "connected"
 * flag and last-known step count persist in localStorage so the tile has
 * something to show immediately on reload while a fresh token is fetched.
 */
export function useGoogleFitSteps() {
  const [connected, setConnected] = useLocalStorage<boolean>('fs-googlefit-connected', false);
  const [steps, setSteps] = useLocalStorage<number>(`fs-googlefit-steps-${startOfToday()}`, 0);
  const [lastSynced, setLastSynced] = useLocalStorage<number | null>('fs-googlefit-last-synced', null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'syncing' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const tokenClientRef = useRef<GoogleTokenClient | null>(null);

  const sync = useCallback(
    async (accessToken: string) => {
      setStatus('syncing');
      try {
        const total = await fetchTodaySteps(accessToken);
        setSteps(total);
        setLastSynced(Date.now());
        setStatus('idle');
        setError(null);
      } catch {
        setStatus('error');
        setError("Couldn't reach Google Fit — try syncing again.");
      }
    },
    [setSteps, setLastSynced],
  );

  const ensureTokenClient = useCallback(async () => {
    await loadGsi();
    if (!window.google?.accounts?.oauth2) throw new Error('Google Identity Services unavailable');
    if (!tokenClientRef.current) {
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: FIT_SCOPE,
        callback: (res) => {
          if (res.error || !res.access_token) {
            setStatus('error');
            setError('Google Fit access was not granted.');
            return;
          }
          setConnected(true);
          void sync(res.access_token);
        },
      });
    }
    return tokenClientRef.current;
  }, [setConnected, sync]);

  const connect = useCallback(async () => {
    setStatus('connecting');
    setError(null);
    try {
      const client = await ensureTokenClient();
      client.requestAccessToken({ prompt: 'consent' });
    } catch {
      setStatus('error');
      setError("Couldn't load Google Sign-In — check your connection and try again.");
    }
  }, [ensureTokenClient]);

  const refresh = useCallback(async () => {
    setStatus('connecting');
    setError(null);
    try {
      const client = await ensureTokenClient();
      // Silent re-auth: the browser already trusts this origin+scope from a
      // prior consent, so this usually returns a token with no UI at all.
      client.requestAccessToken({ prompt: '' });
    } catch {
      setStatus('error');
      setError("Couldn't reach Google Fit — try syncing again.");
    }
  }, [ensureTokenClient]);

  const disconnect = useCallback(() => {
    setConnected(false);
    setSteps(0);
    setLastSynced(null);
    setStatus('idle');
    setError(null);
  }, [setConnected, setSteps, setLastSynced]);

  // On mount, if a previous session connected Google Fit, silently refresh
  // today's count (new token, no consent prompt) instead of showing stale data.
  useEffect(() => {
    if (connected) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    connected,
    steps,
    lastSynced,
    status,
    error,
    connect,
    refresh,
    disconnect,
  };
}
