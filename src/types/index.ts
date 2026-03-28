export interface Student {
  id: string;
  name: string;
  photo_url: string | null;
  grade: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
  projects?: Project[];
  project_count?: number;
}

export interface Project {
  id: string;
  student_id: string;
  title: string;
  description: string | null;
  url: string | null;
  thumbnail_url: string | null;
  custom_screenshot_url: string | null;
  tech_stack: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  name: string;
  grade: string;
  bio: string;
}

export interface ProjectFormData {
  student_id: string;
  title: string;
  description: string;
  url: string;
  tech_stack: string[];
}
