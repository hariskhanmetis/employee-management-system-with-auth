export interface Job {
  id: string;
  date_posted: string;
  date_validthrough: string;
  title: string;
  organization: string;
  organization_url: string;
  source: string;
  organization_logo: string;
  linkedin_org_slogan: string;
  linkedin_org_description: string;
  linkedin_org_size: string;
  linkedin_org_industry: string;
  locations_derived: string[];
  employment_type: string[];
  url: string;
  linkedin_org_headquarters?: string;
  linkedin_org_foundeddate?: string;
  linkedin_org_followers?: number;
  linkedin_org_specialties?: string[];
  linkedin_org_type?: string;
}
