"use server";

import { ApiResponse } from "../types/Instance";

const getApiUrl = (region: string) => {
  return `https://api.${region}.kraft.cloud/v1/`;
};

export async function callKraftApi(
  region: string,
  endpoint: string,
  method: string = "GET",
  body?: string
) {
  try {
    const response = await fetch(`${getApiUrl(region)}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${process.env.KRAFT_TOKEN}`,
        ...(body && { "Content-Type": "application/json" }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (method === "DELETE") {
      return { success: true };
    }

    const data = (await response.json()) as ApiResponse;
    if (data.status === "error") {
      throw new Error(data.errors[0].status);
    }

    return data;
  } catch (err) {
    throw err instanceof Error ? err : new Error("API call failed");
  }
}
