import general from './general.json';
import impact from './impact.json';
import layout from './layout.json';
import password from './password.json';
import payments from './payments.json';
import profile from './profile.json';
import refer from './refer.json';
import settings from './settings.json';
import verification from './verification.json';

export function generateTranslationFile() {
  return Object.assign(general, layout, verification, profile, password, impact, settings, payments, refer, {});
}
