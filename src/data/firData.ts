export const HELPLINES = [
  { id: 'women', name: 'Women Helpline', number: '1091', desc: 'Domestic violence, harassment, distress', icon: '👩', color: 'rgba(239,68,68,0.15)', textColor: '#f87171', badge: '24×7' },
  { id: 'child', name: 'Childline India', number: '1098', desc: 'Child abuse, missing children, trafficking', icon: '👶', color: 'rgba(59,130,246,0.15)', textColor: '#60a5fa', badge: '24×7' },
  { id: 'cyber', name: 'Cyber Crime', number: '1930', desc: 'Online fraud, deepfakes, social media crimes', icon: '💻', color: 'rgba(245,158,11,0.15)', textColor: '#fbbf24', badge: '24×7' },
  { id: 'police', name: 'National Emergency', number: '112', desc: 'Police · Fire · Ambulance — unified number', icon: '🚨', color: 'rgba(16,185,129,0.15)', textColor: '#34d399', badge: '24×7' },
];

export const ONLINE_SERVICES = [
  { name: 'National Cyber Crime Portal', desc: 'File cyber crime complaints online — fraud, deepfakes, social media abuse', url: 'https://cybercrime.gov.in', icon: '🌐', iconBg: 'rgba(61,142,240,0.15)' },
  { name: 'e-FIR Portal', desc: 'Many states allow online FIR filing for select offences. Check your state portal.', url: '#', icon: '📝', iconBg: 'rgba(232,100,58,0.15)' },
  { name: 'National Commission for Women', desc: 'File complaints related to gender-based violence and harassment', url: 'https://ncwapps.nic.in', icon: '👩‍⚖️', iconBg: 'rgba(239,68,68,0.15)' },
  { name: 'POCSO e-Box', desc: 'Report child sexual abuse material online — anonymous reporting available', url: 'https://ncpcr.gov.in', icon: '🛡️', iconBg: 'rgba(43,191,164,0.15)' },
];

export const CITY_COORDS: Record<string, { lat: number; lng: number; state: string }> = {
  'ghaziabad':    { lat: 28.6692, lng: 77.4538, state: 'Uttar Pradesh' },
  'noida':        { lat: 28.5355, lng: 77.3910, state: 'Uttar Pradesh' },
  'lucknow':      { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
  'kanpur':       { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh' },
  'agra':         { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh' },
  'varanasi':     { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh' },
  'meerut':       { lat: 28.9845, lng: 77.7064, state: 'Uttar Pradesh' },
  'prayagraj':    { lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh' },
  'new delhi':    { lat: 28.6139, lng: 77.2090, state: 'Delhi' },
  'delhi':        { lat: 28.6139, lng: 77.2090, state: 'Delhi' },
  'mumbai':       { lat: 19.0760, lng: 72.8777, state: 'Maharashtra' },
  'pune':         { lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
  'bengaluru':    { lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
  'chennai':      { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
  'kolkata':      { lat: 22.5726, lng: 88.3639, state: 'West Bengal' },
  'hyderabad':    { lat: 17.3850, lng: 78.4867, state: 'Telangana' },
  'ahmedabad':    { lat: 23.0225, lng: 72.5714, state: 'Gujarat' },
  'jaipur':       { lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
  'chandigarh':   { lat: 30.7333, lng: 76.7794, state: 'Punjab' },
  'kochi':        { lat: 9.9312,  lng: 76.2673, state: 'Kerala' },
  'bhopal':       { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh' },
};

export const STATIONS_DB = [
  { id: 'DL-CP-001', name: 'Connaught Place PS', address: 'Barakhamba Road, New Delhi - 110001', lat: 28.6315, lng: 77.2167, phone: ['011-23415551', '100'], jurisdiction: 'Central Delhi', state: 'Delhi', online_fir: 'https://delhipolice.gov.in' },
  { id: 'UP-GZB-001', name: 'Kotwali PS Ghaziabad', address: 'Nehru Nagar, Ghaziabad - 201001', lat: 28.6692, lng: 77.4538, phone: ['0120-2824100', '100'], jurisdiction: 'Ghaziabad', state: 'Uttar Pradesh', online_fir: 'https://uppolice.gov.in' },
  { id: 'MH-BN-001', name: 'Bandra PS', address: 'Bandra (West), Mumbai - 400050', lat: 19.0596, lng: 72.8295, phone: ['022-26421855', '100'], jurisdiction: 'Mumbai Zone 9', state: 'Maharashtra', online_fir: 'https://mumbaipolice.gov.in' },
  { id: 'KA-KM-003', name: 'Koramangala PS', address: 'Koramangala 4th Block, Bengaluru - 560034', lat: 12.9352, lng: 77.6245, phone: ['080-25636100'], jurisdiction: 'Bengaluru South East', state: 'Karnataka', online_fir: 'https://ksp.karnataka.gov.in' },
  { id: 'TN-AN-001', name: 'Anna Nagar PS', address: 'Anna Nagar West, Chennai - 600040', lat: 13.0850, lng: 80.2101, phone: ['044-26208100', '100'], jurisdiction: 'Chennai North', state: 'Tamil Nadu', online_fir: 'https://eservices.tnpolice.gov.in' },
];

export const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];
