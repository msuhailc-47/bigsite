import { mapData } from './src/components/keralaMapData.js';
import t from './src/i18n/translations.js';

const fullDistricts = mapData.map(d => {
  const cmsDistrict = (t.en.network.districts || []).find(cd => cd.name === d.name) || {};
  return { ...d, hubs: 0, outlets: 0, associates: 0, coverage: 0, ...cmsDistrict };
});

const totalHubs = fullDistricts.reduce((sum, d) => sum + (parseInt(d.hubs) || 0), 0);
console.log("Total Hubs: ", totalHubs);
