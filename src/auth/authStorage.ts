import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "mcj_access_token";
const USER_ID_KEY = "mcj_user_id";

export type AuthSession = {
  accessToken: string;
  userId: string;
};

export async function saveAuthSession(session: AuthSession): Promise<void> {
  // Expo SDK 54 uses Async Storage 2.x (v3’s native module is not wired for this SDK).
  await AsyncStorage.multiSet([
    [TOKEN_KEY, session.accessToken],
    [USER_ID_KEY, session.userId],
  ]);
}

export async function loadAuthSession(): Promise<AuthSession | null> {
  const entries = await AsyncStorage.multiGet([TOKEN_KEY, USER_ID_KEY]);
  const token = entries[0][1];
  const userId = entries[1][1];
  if (token && userId) {
    return { accessToken: token, userId };
  }
  return null;
}

export async function clearAuthSession(): Promise<void> {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_ID_KEY]);
}
