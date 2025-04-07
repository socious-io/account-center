export type Attachment = {
  id: string;
  url: string;
};

export interface UploadMediaRes {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: string;
}
