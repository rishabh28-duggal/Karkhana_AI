export function retrieve(text, incidents, asset){
 const q=String(text).toLowerCase();
 const tokens=q.match(/[a-z0-9]+/g)||[];
 return incidents.map(i=>{const h=(i.symptom+' '+i.cause+' '+i.pattern).toLowerCase();let score=asset===i.asset?5:0;for(const t of tokens)if(t.length>2&&h.includes(t))score+=1;if(/fluct|pressure|प्रेशर|दबाव/.test(q)&&/pressure|inlet/i.test(i.symptom))score+=3;return {...i,score}}).filter(i=>i.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
}
export function risk(text){return /\b(smoke|fire|injur\w*|sparks?|burst|severe vibration|chemical leak|leaking|bypass|override|burning|explosion)\b|धुआं|धुआँ|आग|चोट|रिसाव/i.test(text)}
export function parseReport(text){
 const a=text.match(/(?:pump|p[-\s]?|पंप|पम्प)\s*[-]?\s*(\d+)/i);const asset=a?'P-'+a[1]:null;
 const nums=text.match(/(\d+(?:\.\d+)?)\s*(?:se|to|से|–|-)\s*(\d+(?:\.\d+)?)\s*(?:bar|बार)/i);
 const fluct=/fluct|pressure|प्रेशर|दबाव/.test(text.toLowerCase());
 return {asset,symptom:fluct?'Pressure fluctuation':/vibrat|वाइब्रेशन/i.test(text)?'Unusual vibration':null,range:nums?nums[1]+'–'+nums[2]+' bar':null,severity:risk(text)?'High':'Unassessed'};
}
export function inletReading(text){const m=text.match(/(-?\d+(?:\.\d+)?)\s*(?:bar|बार)/i);return m?Number(m[1]):null}
