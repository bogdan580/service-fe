
export interface Client {
  name: string;
  phone: string;
  email: string;
}

export interface Order {
  id: null;
  client: Client;
  defect: string;
  device: string;
  deviceId: string;
  equipment: string;
  estimatedCost: number;
  finalCost: number;
  isExpress: boolean;
  model: string;
  performWork: string;
  realCost: number;
  receiptDate: Date;
  returnDate: Date;
  status: string;
}
