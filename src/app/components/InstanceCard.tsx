import { Instance } from '../types/Instance';

interface InstanceCardProps {
  instance: Instance;
  onRemove: (id: string) => void;
}

export function InstanceCard({ instance, onRemove }: InstanceCardProps) {
  const formatBootTime = (timeInMicroseconds: number) => {
    return (timeInMicroseconds / 1000).toFixed(1) + "ms"
  };

  const getStateColorClass = (state: string): string => {
    switch (state) {
      case 'running':
        return 'bg-green-500 text-white';
      case 'stopped':
        return 'bg-red-500 text-white';
      case 'starting':
        return 'bg-blue-500 text-white';
      case 'draining':
        return 'bg-purple-500 text-white';
      case 'stopping':
        return 'bg-red-300 text-white';
      case 'standby':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-orange-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border text-gray-800 border-gray-200 hover:shadow-lg transition-shadow duration-300 w-full">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">{instance.name}</h3>
        <div className="flex justify-end">
          <button
            onClick={() => onRemove(instance.uuid)}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-sm font-medium transition-colors duration-200 cursor-pointer"
            aria-label={`Remove ${instance.name}`}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-sm font-bold">
          State: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColorClass(instance.state)}`}>{instance.state}</span>
        </p>
        {instance.memory_mb && (
          <p className="text-sm text-gray-600 font-bold">Memory: {instance.memory_mb} MB</p>
        )}
        <p className="text-sm text-gray-600 font-bold">Boot Time: {formatBootTime(instance.boot_time_us || 0)}</p>
      </div>

      <a className="text-sm text-blue-600" href={`https://${instance.service_group?.domains[0]?.fqdn}/`} target="_blank" rel="noopener noreferrer">
        https://{instance.service_group?.domains[0]?.fqdn}/
      </a>
    </div>
  );
} 