import { Timestamp } from 'firebase-admin/firestore';

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  companyId?: string;
  tags: string[];
  customFields: Record<string, any>;
  lifecycleStage: string;
  leadScore: number;
  ownerId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
