import { signOut } from 'next-auth/react';

const buildParams = (data: any) => {
  if (!data) return '';
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      value.forEach(val => params.append(key, val.toString()));
    } else {
      params.append(key, value.toString());
    }
  });

  return params.toString();
};

interface Options {
  method: string;
  headers: {
    Accept: string;
    'Content-Type': string;
    Authorization?: string;
  };
  body?: string;
}

export interface GenericRequest {
  url: string;
  method: string;
  token: string;
  params?: any;
  data?: any;
  absolute?: boolean;
}

export const genericRequest = async ({
  url,
  method,
  token,
  params = {},
  data = {},
  absolute = false,
}: GenericRequest) => {
  const options: Options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const result = await fetch(
      absolute
        ? url
        : `${process.env.NEXT_PUBLIC_BACKENDURL}${url}?${buildParams(params)}`,
      options
    );

    if (result.status == 401) {
      signOut();
      /* if (window)
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTENDURL}/login`;
      goToLogin(); */
    }
    const jsonResponse = await result.json();

    if (!result.ok) {
      return { status: result.status, data: result };
    }

    return { status: result.status, data: jsonResponse };
  } catch (err: any) {
    return { status: 500, success: false, data: err.message };
  }
};

export interface GenericRequestNoAuth {
  url: string;
  method: string;
  params?: any;
  data?: any;
  absolute?: boolean;
}

export const genericRequestNoAuth = async ({
  url,
  method,
  params = {},
  data = {},
  absolute = false,
}: GenericRequestNoAuth) => {
  let options: Options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const result = await fetch(
      absolute
        ? url
        : `${process.env.NEXT_PUBLIC_BACKENDURL}${url}?${buildParams(params)}`,
      options
    );

    const jsonResponse = await result.json();

    if (!result.ok) {
      return { status: result.status, data: jsonResponse };
    }

    return { status: result.status, data: jsonResponse };
  } catch (err: any) {
    return { status: 500, success: false, data: err.message };
  }
};
