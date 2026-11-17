export type UserRole = "participante" | "voluntario" | "entidad";

export interface SkillItem {
  id: string;
  text: string;
  completed?: boolean;
}

export interface AulaModule {
  id: number;
  title: string;
  duration: string;
  level: string;
  summary: string;
  details: string;
  skills: SkillItem[];
  tips: string[];
}

export interface Workshop {
  id: number;
  num: string;
  title: string;
  description: string;
  schedule: string;
  location: string;
  spotsAvailable: number;
  objectives: string[];
}

export interface PodcastEpisode {
  id: number;
  title: string;
  guest: string;
  durationStr: string;
  durationSec: number;
  description: string;
}

export interface RegistrationLead {
  id: number;
  role: UserRole;
  name: string;
  contact: string;
  message?: string;
  createdAt: string;
}
