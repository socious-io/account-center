export interface Impact {
  accounts: any[];
  stats: {
    hoursContributed: number;
    hoursWorked: number;
    hoursVolunteered: number;
    projectsSupported: number;
    totalDonated: number;
  };
  points: {
    value: number;
    tier: number;
  };
}
