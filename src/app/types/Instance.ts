export type ServiceGroup = {
  uuid: string;
  name: string;
  domains: { fqdn: string }[];
};

export type Instance = {
  uuid: string;
  name: string;
  state:
    | "stopped"
    | "starting"
    | "running"
    | "draining"
    | "stopping"
    | "standby";
  created_at: string;
  memory_mb: number;
  image: string;
  stop_reason?: number;
  boot_time_us: number;
  service_group?: ServiceGroup;
};

export type ApiResponseSuccess = {
  status: "success";
  data: {
    instances: Instance[];
  };
};
export type ApiResponseError = {
  status: "error";
  errors: { status: string }[];
};

export type ApiResponse = ApiResponseSuccess | ApiResponseError;
