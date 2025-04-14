export interface ImpactData {
  accounts: any[];
  stats: {
    hoursContributed: number;
    hoursWorked: number;
    projectsSupported: number;
    totalDonated: number;
  };
  points: {
    value: number;
    tier: number;
  };
}
