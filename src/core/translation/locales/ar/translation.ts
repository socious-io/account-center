import general from './general.json';
import impact from './impact.json';
import layout from './layout.json';
import password from './password.json';
import profile from './profile.json';
import settings from './settings.json';
import verification from './verification.json';

export function generateTranslationFile() {
  return Object.assign(general, layout, verification, profile, password, impact, settings, {});
}
