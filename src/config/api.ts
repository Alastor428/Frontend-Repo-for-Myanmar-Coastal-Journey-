// Central place to configure backend URL for the mobile app.
// Update this if your backend is not running on the default host/port.
export const API_BASE_URL =
  // Expo supports EXPO_PUBLIC_* env vars at build time.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((process as any).env?.EXPO_PUBLIC_API_URL as string | undefined) ??
  // Android emulator default:
  "http://172.16.0.255:3000";
