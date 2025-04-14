import { AdaptorRes } from '..';
import { ImpactData } from './index.types';

export const getImpactAdaptor = async (): Promise<AdaptorRes<ImpactData>> => {
  try {
    const data = {
      accounts: [
        {
          id: '1',
          name: 'Heather Jenks',
          username: 'heatherj',
          img: 'https://www.researchgate.net/profile/Heather-Jenks/publication/305777043/figure/fig3/AS:1004774900133892@1616568412580/Sample-badge-designs-provided-by-ANU-Marketing.jpg',
          type: 'user',
        },
        {
          id: '2',
          name: 'Heather Jenks',
          username: 'heatherj',
          img: 'https://www.researchgate.net/profile/Heather-Jenks/publication/305777043/figure/fig3/AS:1004774900133892@1616568412580/Sample-badge-designs-provided-by-ANU-Marketing.jpg',
          type: 'user',
        },
        {
          id: '3',
          name: 'Heather Jenks',
          username: 'heatherj',
          img: 'https://www.researchgate.net/profile/Heather-Jenks/publication/305777043/figure/fig3/AS:1004774900133892@1616568412580/Sample-badge-designs-provided-by-ANU-Marketing.jpg',
          type: 'user',
        },
      ],
      stats: {
        hoursContributed: 324,
        hoursWorked: 300,
        projectsSupported: 24,
        totalDonated: 10000.0,
      },
      points: {
        value: 50,
        tier: 1,
      },
    };

    return { data, error: null };
  } catch (error) {
    console.error('Error in getting impact data', error);
    return { data: null, error: 'Error in getting impact data' };
  }
};
