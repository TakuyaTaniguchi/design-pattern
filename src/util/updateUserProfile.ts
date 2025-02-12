export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export function updateUserProfile(userProfile: UserProfile, updates: Partial<UserProfile>): UserProfile {
  return { ...userProfile, ...updates };
}
