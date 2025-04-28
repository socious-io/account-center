import { translate } from 'src/core/helpers/utils';

export type Badges = {
  label: string;
  iconName: string;
  color: string;
};

export const BADGES: Record<string, Badges> = {
  NO_POVERTY: {
    label: translate('NO_POVERTY'),
    iconName: 'no-poverty',
    color: '#EA1D2D',
  },
  ZERO_HUNGER: {
    label: translate('ZERO_HUNGER'),
    iconName: 'zero-hunger',
    color: '#D19F2A',
  },
  HEALTH: {
    label: translate('HEALTH'),
    iconName: 'health',
    color: '#2D9A47',
  },
  EDUCATION_QUALITY: {
    label: translate('EDUCATION_QUALITY'),
    iconName: 'education-quality',
    color: '#C22033',
  },
  GENDER_EQUALITY: {
    label: translate('GENDER_EQUALITY'),
    iconName: 'gender-equality',
    color: '#EF412A',
  },
  CLEAN_WATER_SANITATION: {
    label: translate('CLEAN_WATER_SANITATION'),
    iconName: 'clean-water-sanitation',
    color: '#00ADD8',
  },
  ENERGY: {
    label: translate('ENERGY'),
    iconName: 'energy',
    color: '#FDB714',
  },
  ECONOMIC_GROWTH: {
    label: translate('ECONOMIC_GROWTH'),
    iconName: 'economic-growth',
    color: '#8F1838',
  },
  INDUSTRY_INNOVATION_INFRASTRUCTURE: {
    label: translate('INDUSTRY_INNOVATION_INFRASTRUCTURE'),
    iconName: 'industry-innovation-infrastructure',
    color: '#F36E24',
  },
  REDUCED_INEQUALITIES: {
    label: translate('REDUCED_INEQUALITIES'),
    iconName: 'reduced-inequalities',
    color: '#E01A83',
  },
  SUSTAINABLE_CITIES_COMMUNITIES: {
    label: translate('SUSTAINABLE_CITIES_COMMUNITIES'),
    iconName: 'sustainable-cities-communities',
    color: '#F99D25',
  },
  RESPONSIBLE_CONSUMPTION_PRODUCTION: {
    label: translate('RESPONSIBLE_CONSUMPTION_PRODUCTION'),
    iconName: 'responsible-consumption-production',
    color: '#CD8B2A',
  },
  CLIMATE_ACTION: {
    label: translate('CLIMATE_ACTION'),
    iconName: 'climate-action',
    color: '#48773C',
  },
  LIFE_BELOW_WATER: {
    label: translate('LIFE_BELOW_WATER'),
    iconName: 'life-below-water',
    color: '#007DBB',
  },
  LIFE: {
    label: translate('LIFE'),
    iconName: 'life',
    color: '#40AE49',
  },
  PEACE_JUSTICE: {
    label: translate('PEACE_JUSTICE'),
    iconName: 'peace-justice',
    color: '#00558A',
  },
  GOALS_PARTNERSHIPS: {
    label: translate('GOALS_PARTNERSHIPS'),
    iconName: 'goals-partnerships',
    color: '#1A3668',
  },
};
