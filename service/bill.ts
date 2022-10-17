import axios from "axios";
import { AxiosInstance } from "axios";

export type Billionairies = {
  id: string;
  squareImage: string;
};

export type Billionaire = {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: {
    exchange: string;
    ticker: string;
    companyName: string;
    numberOfShares: number;
    currencyCode: string;
    exchangeRate: number;
    interactive: boolean;
    currentPrice: number;
  }[];
  thumbnail: string;
  squreImage: string;
  bio: string;
  about: string;
  netWorth: string;
};

class BillAPI {
  private svc: AxiosInstance;

  constructor() {
    this.svc = axios.create({
      baseURL: "https://billions-api.nomadcoders.workers.dev/",
      timeout: 10000,
    });
  }

  async GetBillionairesList(): Promise<Billionairies[]> {
    try {
      const resp = await this.svc.get<Billionairies[]>("");
      if (resp.status !== 200) {
        throw Error(`fail to get billionaires list. status:${resp.status}`);
      }
      return resp.data;
    } catch (e) {
      throw Error(`fail to request get billionaires list. error:${e}`);
    }
  }

  async GetBillionaire(id: string): Promise<Billionaire> {
    try {
      const resp = await this.svc.get<Billionaire>(`/person/${id}`);
      if (resp.status !== 200) {
        throw Error(`fail to get billionaires. status:${resp.status}`);
      }
      return resp.data;
    } catch (e) {
      throw Error(`fail to request get billionaires. status:${e}`);
    }
  }
}

const BillSvc = new BillAPI();

export default BillSvc;
