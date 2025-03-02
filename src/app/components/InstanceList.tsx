"use client";
import { useState, useEffect, useCallback } from 'react'
import { ApiResponseSuccess, Instance } from '../types/Instance';
import { InstanceCard } from './InstanceCard';
import { callKraftApi } from '../actions/kraft';

export function InstanceList({ region }: { region: "was1" | "fra0" }) {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstances = useCallback(async () => {
    try {
      const data = await callKraftApi(region, 'instances') as ApiResponseSuccess;
      setInstances(data.data.instances);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch instances');
    } finally {
      setLoading(false);
    }
  }, [region]);

  const handleRemove = async (uuid: string) => {
    try {
      await callKraftApi(region, `instances/${uuid}`, 'DELETE');
      // Only remove from state if the API call was successful
      setInstances(instances.filter(instance => instance.uuid !== uuid));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove instance');
    }
  };

  useEffect(() => {
    fetchInstances();
    // Set up polling every minute
    const interval = setInterval(fetchInstances, 60000);
    return () => clearInterval(interval);
  }, [fetchInstances]);

  if (loading) {
    return (
      <div className="instance-list">
        <div className="loading">Loading instances...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="instance-list">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchInstances} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl font-bold capitalize">
        {region === 'was1' ? '🇺🇸 ' : region === 'fra0' ? '🇩🇪 ' : ''}{region}
      </h2>
      {instances.length === 0 ? (
        <p className="no-instances">No instances available</p>
      ) : (
        instances.map(instance => (
          <InstanceCard
            key={instance.uuid}
            instance={instance}
            onRemove={handleRemove}
          />
        ))
      )}
    </div>
  );
} 