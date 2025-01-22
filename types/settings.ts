export interface NotificationSettings {
    emailNotifications: boolean
    pushNotifications: boolean
    marketingEmails: boolean
    monthlyNewsletter: boolean
  }
  
  export interface SecuritySettings {
    twoFactorEnabled: boolean
    lastPasswordChange: Date
    activeSessions: number
  }
  
  export interface ThemeSettings {
    theme: 'light' | 'dark' | 'system'
    fontSize: 'small' | 'medium' | 'large'
    reducedMotion: boolean
  }
  