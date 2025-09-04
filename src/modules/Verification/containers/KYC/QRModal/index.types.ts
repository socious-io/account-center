export interface QRModalProps {
  open: boolean;
  handleClose: () => void;
  connectUrl: string;
  qrCodeSize?: number;
}
