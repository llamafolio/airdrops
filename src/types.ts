  export interface Airdrop {
    protocol: string;
    website: string;
    announcement: string;
    token: string;
    contract: string;
    eligibility: string;
    start: string;
    end: string;
  }

  type Airdrops = Array<Airdrop>;