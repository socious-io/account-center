import { AdaptorRes, ContributionsRes, ContributionType, Impact } from '..';

export const getImpactAdaptor = async (): Promise<AdaptorRes<Impact>> => {
  try {
    //FIXME: later with BE API
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
        hoursVolunteered: 24,
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

export const getContributionsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ContributionsRes>> => {
  try {
    //FIXME: later with BE API
    const results = [
      {
        id: '1',
        identity: {
          id: '1',
          name: 'Ocean Protection',
          username: 'Product Designer',
          type: 'organizations',
        },
        date: new Date(),
        type: 'Job' as ContributionType,
        points: 35,
      },
      {
        id: '2',
        identity: {
          id: '1',
          name: 'Ocean Protection2',
          username: 'Product Designer2',
          type: 'users',
        },
        date: new Date(),
        type: 'Service' as ContributionType,
        points: 35,
      },
    ];

    return {
      data: {
        results,
        total: 2,
        limit,
        page,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Contributions List', error);
    return { data: null, error: 'Error in getting Contributions List' };
  }
};
