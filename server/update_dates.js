import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'data', 'news.json');

const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
data.lastUpdated = '2026-10-02T08:15:00Z';

// Wednesday Sept 30, 2026
data.days['2026-09-30'] = {
  date: '2026-09-30',
  dayName: 'Wednesday',
  displayDate: 'Wednesday, 30th September 2026',
  headlineCount: 12,
  summary: 'EOCO secures warrant for Manhyia South MP in SIC Life probe; US announces plans for third aircraft carrier strike group in Middle East.',
  ghanaNews: [
    {
      id: 'gh-2026-09-30-01',
      title: 'EOCO Secures High Court Arrest Warrant for Manhyia South MP Nana Agyei Baffour Awuah',
      source: 'Graphic Online / Citi Newsroom',
      time: '11:30 AM',
      category: 'Legal Governance & Parliamentary Affairs',
      summary: 'The Economic and Organised Crime Office (EOCO) secured an arrest warrant from the High Court in Accra for the Member of Parliament for Manhyia South, Nana Agyei Baffour Awuah. The investigation stems from forensic audits into financial transactions and contract awards involving state-backed insurer SIC Life. The MP announced he would voluntarily present himself to investigators.',
      keyPoints: [
        'Warrant issued following non-appearance at scheduled investigative hearings.',
        'Minority leadership questioned the timing and procedure of the warrant issuance.',
        'EOCO affirmed that investigations strictly comply with statutory anti-financial crime mandates.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-09-30-02',
      title: 'Bank of Ghana Monetary Policy Committee Holds Policy Benchmark Rate at 29%',
      source: 'Bank of Ghana / Bloomberg',
      time: '02:00 PM',
      category: 'Monetary Policy & Economy',
      summary: 'Bank of Ghana Governor Dr. Ernest Addison announced the Monetary Policy Committee decision to maintain the policy rate at 29.0%. The central bank cited steady deceleration in food inflation and strengthened gross international foreign reserves, while warning that geopolitical commodity shocks require sustained policy vigilance.',
      keyPoints: [
        'Headline inflation projected to remain within single-digit target corridors by mid-2027.',
        'Foreign exchange reserve buffers supported by robust gold and cocoa export earnings.',
        'Commercial banks urged to accelerate lower lending rates for manufacturing.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-09-30-03',
      title: 'Kumasi Prepares for NPP National Delegates Conference as Campaign Billboards Blanket City',
      source: 'MyJoyOnline',
      time: '04:45 PM',
      category: 'Party Politics & Elections',
      summary: 'Kumasi witnessed heavy political activity as aspirants for national executive offices made final campaign rounds ahead of the Saturday, October 3 National Delegates Conference at Baba Yara Stadium. Party elders called on aspirants and their supporters to preserve unity ahead of the 2028 election cycle.',
      keyPoints: [
        'Over 6,000 delegates across 275 constituencies expected in the Ashanti regional capital.',
        'Police administration deployed over 1,500 personnel to secure the stadium perimeter.',
        'Vetting committee certified clean delegate registers across all voting centers.'
      ],
      readTime: '2 min read'
    },
    {
      id: 'gh-2026-09-30-04',
      title: 'Teacher Unions Hold Crucial Conciliation Session with Fair Wages and Salaries Commission',
      source: 'Citi Newsroom',
      time: '06:15 PM',
      category: 'Labor & Public Education',
      summary: 'Representatives of GNAT, NAGRAT, and CCT engaged in protracted conciliation negotiations with the Fair Wages and Salaries Commission and the Ministry of Finance. While tentative understanding was reached on paying delayed promotional arrears, disagreements persisted regarding the implementation date for the Deprived Area Allowance.',
      keyPoints: [
        'Government proposed phased quarterly disbursement starting in November.',
        'Union executives scheduled national council meetings to determine strike continuation.',
        'National Labor Commission urged both parties to avert extended school closures.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-09-30-05',
      title: 'Organized Labor Finalizes Preparations for Jubilee House High-Level Dialogue on Mining Moratorium',
      source: 'Daily Graphic',
      time: '07:30 PM',
      category: 'Environmental Governance',
      summary: 'Leadership of Organized Labor, led by TUC Secretary General Joshua Ansah, convened a strategy conclave ahead of scheduled direct negotiations with President Akufo-Addo at Jubilee House regarding the total prohibition of mining in forest reserves and water bodies.',
      keyPoints: [
        'Labor insists on executive declaration of an environmental state of emergency.',
        'Ghana Water Company presented water treatment cost escalation data to labor leaders.',
        'Unions reiterated strike deadline of Monday, October 5 remains binding.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-09-30-06',
      title: 'Tema Port Container Scanning Digitalization Project Achieves Full Operational Milestone',
      source: 'Ghana News Agency',
      time: '08:40 PM',
      category: 'Trade & Customs Administration',
      summary: 'The Ghana Revenue Authority (GRA) announced that new high-throughput drive-through container scanners at Meridian Port Services (MPS) Terminal 3 are now fully operational, cutting average import cargo dwell times from 48 hours to under 4 hours.',
      keyPoints: [
        'Advanced artificial intelligence algorithms scan cargo manifests in real-time.',
        'System flags undeclared arms, narcotics, and misclassified commercial shipments.',
        'Trade Ministry noted the initiative enhances Ghana standing under AfCFTA corridors.'
      ],
      readTime: '2 min read'
    }
  ],
  internationalNews: [
    {
      id: 'intl-2026-09-30-01',
      title: 'United States Plans Deployment of Third Aircraft Carrier Strike Group to the Middle East',
      source: 'Reuters / AP',
      time: '01:15 PM',
      category: 'International Security & Military Affairs',
      summary: 'Pentagon officials confirmed plans to deploy the USS Theodore Roosevelt carrier strike group and an amphibious readiness group to the Middle East, reinforcing existing naval task forces. The deployment brings approximately 10,000 additional personnel into regional maritime waters amid ongoing deterrence operations against Iranian proxy networks.',
      keyPoints: [
        'Third carrier deployment intended to bolster defensive shields across commercial shipping routes.',
        'US Central Command reaffirmed commitment to maintaining open transit in the Red Sea and Gulf of Oman.',
        'Regional defense analysts view the buildup as preparation for potential post-midterm escalation.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-09-30-02',
      title: 'Flydubai Flight Diverted to Saudi Arabia After Cockpit Altercation Triggers Emergency Hijacking Code',
      source: 'Al Jazeera / BBC World',
      time: '03:45 PM',
      category: 'Aviation Safety & Regional Security',
      summary: 'A commercial Flydubai Boeing 737 passenger aircraft operating between Dubai and Tel Aviv safely diverted to a Saudi Arabian airfield after a physical dispute between flight crew members triggered an automated transponder hijacking alert. Aviation authorities confirmed all passengers landed unharmed as formal safety investigations began.',
      keyPoints: [
        'Saudi civil aviation authority granted immediate emergency landing clearance.',
        'Airline confirmed the incident was internal crew dispute with no terrorist nexus.',
        'International civil aviation inspectors deployed to review cockpit protocols.'
      ],
      readTime: '2 min read'
    },
    {
      id: 'intl-2026-09-30-03',
      title: 'Egyptian President El-Sissi Discloses $20 Billion in Cumulative Suez Canal Revenue Losses',
      source: 'Financial Times / Daily News Egypt',
      time: '05:30 PM',
      category: 'Global Trade & Maritime Economics',
      summary: 'Addressing an international economic forum in Cairo, Egyptian President Abdel-Fattah el-Sissi revealed that Houthi maritime drone attacks in the Bab al-Mandab strait have caused over $20 billion in lost Suez Canal transit fees over the past year as global container lines divert vessels around the Cape of Good Hope.',
      keyPoints: [
        'Canal traffic volumes down nearly 60% compared to historical baseline averages.',
        'Egypt called for international stabilization aid to offset sovereign balance of payments deficits.',
        'Cairo reaffirmed active diplomatic mediation with regional factions to restore maritime peace.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-09-30-04',
      title: 'United Nations Allocates $160 Million from Central Emergency Response Fund for Global Crises',
      source: 'UN News / ReliefWeb',
      time: '07:15 PM',
      category: 'UN & Humanitarian Diplomacy',
      summary: 'UN Emergency Relief Coordinator announced a $160 million release from the Central Emergency Response Fund (CERF) to address life-threatening funding deficits across 12 countries, including Sudan, South Sudan, Yemen, and the Occupied Palestinian Territory, where humanitarian operations face severe food pipeline breaks.',
      keyPoints: [
        'Sudan and neighboring refugee-hosting nations allocated the largest single tranche of $45M.',
        'Funding covers clean water infrastructure, child nutrition therapeutic feeding, and medical supplies.',
        'Donors urged to fulfill pledges made at the UN General Assembly.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-09-30-05',
      title: 'South Korea and Ukraine Hold Diplomatic Consultations Over Captured North Korean Combatants',
      source: 'Yonhap / Kyiv Post',
      time: '08:45 PM',
      category: 'East Asian Geopolitics & Defense',
      summary: 'Diplomats from South Korea and Ukraine met in Warsaw to address diplomatic friction surrounding two North Korean military personnel captured by Ukrainian forces and subsequently transferred for intelligence debriefing. Both sides agreed to establish a confidential working group on Pyongyang military assistance to Russia.',
      keyPoints: [
        'Kyiv clarified that no international confidentiality pact was violated.',
        'Seoul expressed satisfaction with technical intelligence sharing on North Korean weaponry.',
        'South Korean Defense Ministry pledged additional humanitarian assistance packages to Ukraine.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-09-30-06',
      title: 'European Union and Mercosur Negotiators Narrow Differences on Environmental Farm Standards',
      source: 'Euronews / Mercopress',
      time: '09:50 PM',
      category: 'International Trade Agreements',
      summary: 'Trade negotiators from the European Union and the Mercosur bloc (Brazil, Argentina, Uruguay, Paraguay) completed technical rounds in Montevideo. Officials reported significant progress on reciprocal deforestation verification protocols, clearing key obstacles toward ratifying the long-delayed free trade accord.',
      keyPoints: [
        'Compromise reached on satellite monitoring of agricultural grazing land.',
        'French and Irish agricultural lobbies continue to voice domestic market protection concerns.',
        'Final ministerial ratification session scheduled for November in Rio de Janeiro.'
      ],
      readTime: '2 min read'
    }
  ]
};

// Thursday Oct 1, 2026
data.days['2026-10-01'] = {
  date: '2026-10-01',
  dayName: 'Thursday',
  displayDate: 'Thursday, 1st October 2026',
  headlineCount: 12,
  summary: 'Constitution Review Implementation Committee launches nationwide consultations in Ghana; Ukraine tests new tactical ballistic missile.',
  ghanaNews: [
    {
      id: 'gh-2026-10-01-01',
      title: 'Constitution Review Implementation Committee (CRIC) Launches Nationwide Public Consultation Phase',
      source: 'Graphic Online',
      time: '10:00 AM',
      category: 'Constitutional Governance',
      summary: 'The Constitution Review Implementation Committee, chaired by former Attorney-General Marietta Brew Appiah-Oppong, officially commenced its nationwide stakeholder engagement roadmap. The committee mandate focuses on drafting constitutional amendment bills addressing executive appointments, the size of government, and strengthening parliamentary oversight.',
      keyPoints: [
        'Committee to hold town-hall sessions across all 16 administrative regions.',
        'Priorities include decoupling the Attorney-General office from the Ministry of Justice.',
        'Civil society coalitions submitted memoranda advocating election of District Chief Executives (DCEs).'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-01-02',
      title: 'High Court Rules in Favor of Tullow Ghana in Landmark Petroleum Tax Dispute Against GRA',
      source: 'Citi Newsroom / Business & Financial Times',
      time: '12:30 PM',
      category: 'Energy Governance & Fiscal Law',
      summary: 'The Commercial Division of the High Court in Accra delivered a landmark ruling setting aside a multi-million-dollar tax assessment issued by the Ghana Revenue Authority against Tullow Ghana Limited. The court upheld that contractual tax exemptions provided under the Jubilee and TEN Field Petroleum Agreements supersede retroactive statutory revisions.',
      keyPoints: [
        'Court ruled petroleum agreements ratified by Parliament have binding force of law under Article 75.',
        'GRA stated its legal team is reviewing the full text of the judgment to consider appellate options.',
        'Industry analysts praised the judgment for reinforcing international upstream investor confidence.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-01-03',
      title: 'Manhyia South MP Nana Agyei Baffour Awuah Reports to EOCO Headquarters for Interrogation',
      source: 'MyJoyOnline',
      time: '02:45 PM',
      category: 'Legal Governance',
      summary: 'Accompanied by senior legal counsel and parliamentary colleagues, MP Nana Agyei Baffour Awuah arrived at the Economic and Organised Crime Office headquarters in Accra. Investigators subjected the lawmaker to extensive questioning regarding financial disbursements and advisory contracts executed with SIC Life during his tenure.',
      keyPoints: [
        'Interrogation lasted over seven hours under caution.',
        'Legal team submitted documentation refuting allegations of financial misappropriation.',
        'Supporters from Manhyia South held peaceful vigils outside the EOCO premises.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-01-04',
      title: 'National Petroleum Authority Shuts Down 14 Retail Fuel Stations for Substandard Fuel Blending',
      source: 'Daily Graphic',
      time: '04:15 PM',
      category: 'Consumer Protection & Energy Regulation',
      summary: 'The National Petroleum Authority (NPA) regulatory taskforce revoked the operating permits and closed down 14 retail fuel service stations in the Greater Accra, Eastern, and Ashanti regions after laboratory fuel quality tests detected water contamination and illegal solvent blending.',
      keyPoints: [
        'NPA instituted nationwide random sampling across all oil marketing companies (OMCs).',
        'Station owners face heavy administrative fines and prosecution under the NPA Act.',
        'Motorists urged to report fuel performance issues to the authority consumer hotline.'
      ],
      readTime: '2 min read'
    },
    {
      id: 'gh-2026-10-01-05',
      title: 'NPP National Elections Committee Completes Final Vetting of Baba Yara Stadium Security Protocols',
      source: 'Graphic Online',
      time: '06:30 PM',
      category: 'Party Politics',
      summary: 'The NPP National Elections Committee, chaired by senior statesman Peter Mac Manu, concluded joint operational walkthroughs with the Ghana Police Service at Baba Yara Stadium in Kumasi. Over 6,700 delegates and accredited observers will participate in the national officer elections on Saturday.',
      keyPoints: [
        'Electoral Commission will supervise balloting and electronic counting across 20 designated booths.',
        'Strict ban placed on unauthorized vehicular access within 500 meters of the stadium.',
        'Aspirants signed a binding peace accord pledging acceptance of certified results.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-01-06',
      title: 'Ministry of Transport Receives Feasibility Study on Kumasi-Accra High-Speed Railway Corridor',
      source: 'Ghana News Agency',
      time: '08:00 PM',
      category: 'Infrastructure & Governance',
      summary: 'The Ministry of Transport officially received the bankable technical feasibility dossier for the proposed modern standard-gauge railway linking Accra and Kumasi. The rail network aims to reduce cargo haulage transit times to under 90 minutes and ease heavy freight pressure on the highway.',
      keyPoints: [
        'Project to be executed under a 30-year design-build-finance-operate concession.',
        'Environmental and social impact assessments submitted to the Environmental Protection Agency.',
        'Parliamentary select committee scheduled to review commercial concession terms in November.'
      ],
      readTime: '2 min read'
    }
  ],
  internationalNews: [
    {
      id: 'intl-2026-10-01-01',
      title: 'President Volodymyr Zelenskyy Confirms First Combat Deployment of Ukraine New FP-7 Ballistic Missile',
      source: 'Kyiv Independent / Reuters',
      time: '12:00 PM',
      category: 'Ukraine War & Military Technology',
      summary: 'In an evening televised address, Ukrainian President Volodymyr Zelenskyy confirmed that Ukrainian defense forces successfully carried out the first operational combat launch of the domestically designed FP-7 tactical ballistic missile, striking an advanced Russian Buk-M3 surface-to-air missile radar installation in occupied Luhansk.',
      keyPoints: [
        'FP-7 has an estimated operational range of 400 kilometers with precision satellite guidance.',
        'Zelenskyy hailed the achievement as proof of Ukraine growing indigenous defense industrial base.',
        'Western allies reaffirmed support for Ukraine deep-strike capabilities against military assets.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-01-02',
      title: 'United States Expands Sanctions on International Procurement Networks Supplying Iranian Drone Programs',
      source: 'US Treasury Dispatch / Bloomberg',
      time: '02:30 PM',
      category: 'Sanctions & Non-Proliferation',
      summary: 'The US Department of the Treasury Office of Foreign Assets Control (OFAC) designated 16 corporate entities and 8 individuals across Turkey, the UAE, and East Asia accused of facilitating the illicit procurement of microelectronics and guidance systems for Iran Shahed attack drone fleet.',
      keyPoints: [
        'Sanctions block all US property and prohibit international dollar financial transactions.',
        'Allied governments in Europe and Asia coordinated reciprocal export control enforcement.',
        'Tehran rejected the measures as unilateral economic coercion.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-01-03',
      title: 'Houthi Militias Sever Key Ground Transit Roads Linking Taiz and Aden in Southern Yemen',
      source: 'Al Jazeera / BBC Arabic',
      time: '04:15 PM',
      category: 'Middle East Conflict',
      summary: 'Houthi rebel military units detonated heavy explosives along major mountain transit bridges and established fortified checkpoints along the primary highway connecting the besieged city of Taiz with the provisional capital in Aden, stranding commercial food transport convoys.',
      keyPoints: [
        'Yemeni government forces launched counter-artillery barrages to protect alternative unpaved routes.',
        'UN Special Envoy Hans Grundberg condemned the disruption as an unacceptable violation of civilian rights.',
        'Humanitarian organizations warn medical supply stocks in Taiz are dangerously depleted.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-01-04',
      title: 'International Court of Justice Receives Memorials in Landmark Climate Sovereignty Case',
      source: 'ICJ Peace Palace / UN News',
      time: '06:00 PM',
      category: 'International Environmental Law',
      summary: 'The International Court of Justice (ICJ) in The Hague confirmed receipt of official legal briefs submitted by 91 sovereign states in the historic advisory proceedings on the legal obligations of countries regarding climate change and protection of vulnerable island nations.',
      keyPoints: [
        'Largest state participation in any single advisory proceeding in the Court history.',
        'Developing nations argue failure to reduce emissions breaches international human rights treaties.',
        'Public oral hearings scheduled to commence in early 2027 at the Peace Palace.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-01-05',
      title: 'Estonia Unveils Enhanced Joint Cyber Defense Center with Baltic and Nordic NATO Partners',
      source: 'ERR News / Defense News',
      time: '07:45 PM',
      category: 'Cybersecurity & Alliance Defense',
      summary: 'Following recent sabotage against military robotics manufacturers, Estonian defense leaders inaugurated an upgraded high-security threat intelligence facility in Tallinn in partnership with Sweden, Finland, and Poland, designed to coordinate real-time defense against hostile state cyber intrusion.',
      keyPoints: [
        'Facility connects military network security with civilian telecommunications and energy grids.',
        'NATO Cooperative Cyber Defence Centre of Excellence (CCDCOE) to oversee joint multinational drills.',
        'Baltic ministers warned that hybrid threats will be met with collective alliance countermeasures.'
      ],
      readTime: '2 min read'
    },
    {
      id: 'intl-2026-10-01-06',
      title: 'World Health Organization Approves New Low-Cost Heat-Stable Rotavirus Vaccine for West Africa',
      source: 'WHO Geneva / Reuters',
      time: '09:10 PM',
      category: 'Global Health & Development',
      summary: 'The World Health Organization granted prequalification to a breakthrough, heat-stable oral rotavirus vaccine developed for tropical climates, eliminating strict cold-chain refrigeration requirements and enabling rapid distribution to rural health centers across West and Central Africa.',
      keyPoints: [
        'Vaccine shown to reduce infant diarrheal hospitalizations by 72% in clinical trials.',
        'Gavi, the Vaccine Alliance, committed to subsidizing continental rollout starting early next year.',
        'African health ministers welcomed the milestone for rural healthcare delivery.'
      ],
      readTime: '2 min read'
    }
  ]
};

// Friday Oct 2, 2026 (Today!)
data.days['2026-10-02'] = {
  date: '2026-10-02',
  dayName: 'Friday',
  displayDate: 'Friday, 2nd October 2026 (Today)',
  headlineCount: 14,
  summary: 'Manhyia South MP granted GH¢50M bail by EOCO; NPP delegates converge in Kumasi for national conference as US reinforces Middle East deployment.',
  ghanaNews: [
    {
      id: 'gh-2026-10-02-01',
      title: 'Manhyia South MP Nana Agyei Baffour Awuah Granted GH¢50 Million Bail with Three Sureties by EOCO',
      source: 'Graphic Online / Citi Newsroom',
      time: '11:00 AM',
      category: 'Legal Affairs & Parliamentary Governance',
      summary: 'Following intensive interrogation regarding the SIC Life financial management probe, the Economic and Organised Crime Office granted administrative bail to Member of Parliament for Manhyia South, Nana Agyei Baffour Awuah, in the sum of GH¢50 million with three justified sureties, one of whom must be backed by landed property.',
      keyPoints: [
        'Lawmaker deposited passport and agreed to periodic investigative reporting schedules.',
        'Minority Leader Alexander Afenyo-Markin criticized what he termed punitive bail conditions for an active MP.',
        'EOCO affirmed that due process is being strictly observed and the case docket is nearing completion.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-02-02',
      title: 'NPP National Delegates Arrive in Kumasi Ahead of High-Stakes National Executive Elections',
      source: 'MyJoyOnline / Daily Graphic',
      time: '01:30 PM',
      category: 'National Politics & Party Elections',
      summary: 'Thousands of accredited New Patriotic Party delegates, Members of Parliament, and council of elders arrived in Kumasi ahead of Saturday National Delegates Conference at Baba Yara Sports Stadium. Campaign teams held energetic final rallies across hotel venues, emphasizing internal party unity to steer the party toward the 2028 general elections.',
      keyPoints: [
        'Over 6,700 delegates accredited to vote for National Chairman, General Secretary, and National Organizers.',
        'Electoral Commission set up 20 polling stations inside the main stadium bowl.',
        'General Secretary issued strict warnings against monetary inducements or campaign disruptions.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-02-03',
      title: 'Organized Labor Inspects Highly Turbid River Pra Treatment Plants Ahead of Monday Strike Deadline',
      source: 'Citi Newsroom',
      time: '03:15 PM',
      category: 'Environmental Governance & Civil Society',
      summary: 'Executive delegations from the Trades Union Congress (TUC) and Ghana Water Company Limited conducted physical inspections of major water treatment headworks along the Pra and Offin river basins in the Central and Western regions. Union leaders noted water turbidity levels remain 50 times above safety standards due to unchecked illegal mining (galamsey).',
      keyPoints: [
        'Ghana Water Company spending nearly quadruple historical budget amounts on treatment chemicals.',
        'Organized Labor reaffirmed that the nationwide strike begins Monday, October 5 unless the President acts.',
        'Presidency confirmed a final conciliation session will be held at Jubilee House over the weekend.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-02-04',
      title: 'Teacher Unions and Education Ministry Reach Tentative Framework to Suspend Nationwide Strike',
      source: 'Graphic Online',
      time: '05:00 PM',
      category: 'Labor & Public Education',
      summary: 'Following a grueling 10-hour negotiation session brokered by the National Labor Commission, the leadership of GNAT, NAGRAT, and CCT reached a tentative compromise memorandum with the Ministry of Education and Ministry of Finance regarding the phased disbursement of promotional arrears and the Deprived Area Allowance.',
      keyPoints: [
        'Government signed an escrow guarantee releasing the first payment batch by October 25.',
        'Union leadership scheduled emergency national executive meetings to officially vote on calling off the strike.',
        'Classrooms expected to resume normal academic operations on Monday pending final ratification.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'gh-2026-10-02-05',
      title: 'Ghana Extends Bilateral Trade and Customs Protocol with Côte d\'Ivoire on Cocoa Anti-Smuggling',
      source: 'Daily Graphic / COCOBOD',
      time: '06:45 PM',
      category: 'Bilateral Diplomacy & Economic Security',
      summary: 'Officials from the Ghana Cocoa Board (COCOBOD) and Le Conseil du Café-Cacao of Côte d\'Ivoire signed an enhanced operational protocol in Abidjan, establishing joint cross-border intelligence surveillance and harmonized pricing mechanisms to eliminate cross-border bean smuggling along the Western frontier.',
      keyPoints: [
        'Joint military-police border patrols authorized to operate within coordinated border corridors.',
        'Real-time digital dispatch tracking introduced for all licensed buying company haulage trucks.',
        'Both nations reaffirmed commitment to protecting the African cocoa farmer income premium.'
      ],
      readTime: '2 min read'
    },
    {
      id: 'gh-2026-10-02-06',
      title: 'Electoral Commission Releases Certified Timetable for Presidential and Parliamentary Balloting',
      source: 'Ghana News Agency',
      time: '08:15 PM',
      category: 'Electoral Governance',
      summary: 'The Electoral Commission formally published the definitive statutory calendar leading up to the December national polls, setting firm deadlines for printing certified final voter registers, dispatch of non-sensitive election materials, and accreditation of international observer missions.',
      keyPoints: [
        'Over 38,000 polling stations certified for voting operations.',
        'International observer delegations from AU, ECOWAS, Commonwealth, and EU confirmed accredited.',
        'EC Chairperson reiterated commitment to transparent electronic collation procedures.'
      ],
      readTime: '2 min read'
    },
    {
      id: 'gh-2026-10-02-07',
      title: 'Ministry of Communications and Digitalisation Launches National Cyber Threat Defense Operations Center',
      source: 'MyJoyOnline',
      time: '09:30 PM',
      category: 'Digital Governance & Cybersecurity',
      summary: 'Sector Minister Ursula Owusu-Ekuful inaugurated the state-of-the-art National Cyber Security Authority 24/7 Threat Response Centre in Accra, providing automated monitoring to defend national power grids, banking infrastructure, and government portals from foreign cyber intrusions.',
      keyPoints: [
        'Facility integrated with international cyber threat sharing platforms and INTERPOL.',
        'Mandatory reporting protocols enacted for all commercial banks and public corporations.',
        'Minister warned that electoral and state infrastructure will be guarded against hostile interference.'
      ],
      readTime: '2 min read'
    }
  ],
  internationalNews: [
    {
      id: 'intl-2026-10-02-01',
      title: 'US President Signals Potential Military Actions Against Iranian Assets Following Midterm Elections',
      source: 'The Washington Post / Reuters',
      time: '12:30 PM',
      category: 'US Foreign Policy & Middle East Geopolitics',
      summary: 'Speaking to reporters at the White House, President Donald Trump stated that current diplomatic efforts with Iran remain a stalemate and signaled that the United States is keeping military contingency options on the table, including possible targeted strikes against regional command networks if commercial transit through the Strait of Hormuz is obstructed.',
      keyPoints: [
        'Trump emphasized that deployment of three carrier strike groups provides maximum strategic leverage.',
        'White House reiterated insistence on comprehensive halt to regional proxy funding.',
        'European diplomatic partners urge de-escalation channels to avoid full-scale regional conflict.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-02-02',
      title: 'UN Security Council Prepares Consultations on Comprehensive Gaza Peace Roadmap and Transition Force',
      source: 'UN News / Al Jazeera',
      time: '02:45 PM',
      category: 'UN & Middle East Peace',
      summary: 'Diplomats at UN Headquarters in New York commenced informal consultations on a multilateral draft resolution establishing an international stabilization and reconstruction taskforce for Gaza, aimed at monitoring civilian protection corridors and coordinating humanitarian rebuilding under UN auspices.',
      keyPoints: [
        'Draft co-sponsored by Arab League members and European partners.',
        'Debates center on command architecture and disarmament verification mechanisms.',
        'UN Secretary-General urged permanent members to transcend geopolitical veto stalemates.'
      ],
      readTime: '4 min read'
    },
    {
      id: 'intl-2026-10-02-03',
      title: 'Ukraine and South Korea Resolve Diplomatic Disagreement Over Captured North Korean Military Personnel',
      source: 'Kyiv Independent / Yonhap',
      time: '04:30 PM',
      category: 'International Diplomacy & Intelligence',
      summary: 'Following high-level bilateral consultations between their foreign ministries in Seoul and Kyiv, Ukrainian and South Korean officials announced the complete resolution of diplomatic friction regarding captured North Korean combatants, agreeing on joint intelligence sharing regarding Pyongyang military assistance to Russia.',
      keyPoints: [
        'Both nations reaffirmed mutual respect for sovereignty and international legal standards.',
        'South Korea announced an expanded non-lethal military and humanitarian support tranche for Ukraine.',
        'Joint statement emphasized opposition to illegal military proliferation between Moscow and Pyongyang.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-02-04',
      title: 'International Monetary Fund Approves Extended Credit Tranche for Vulnerable African Economies',
      source: 'IMF Dispatch / Bloomberg',
      time: '06:15 PM',
      category: 'International Financial Architecture',
      summary: 'The Executive Board of the International Monetary Fund concluded reviews of several African structural adjustment programs, approving $2.4 billion in combined low-interest disbursements to help developing economies navigate currency volatility, high sovereign debt repayment burdens, and climate disruption.',
      keyPoints: [
        'IMF Managing Director praised fiscal consolidation efforts across West and East Africa.',
        'Board stressed that social safety nets must be protected during public expenditure reprioritization.',
        'African governors renewed calls for deeper reallocation of IMF Special Drawing Rights (SDRs).'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-02-05',
      title: 'Haiti Multinational Security Mission Secures Major Port Facilities as Fuel Shipments Resume',
      source: 'Miami Herald / AP',
      time: '07:50 PM',
      category: 'Caribbean Security & Peacekeeping',
      summary: 'Joint tactical operations by Kenyan police units and the Haitian National Police established permanent fortified perimeter cordons around the Varreux fuel terminal and Port-au-Prince shipping docks, allowing commercial container vessels and fuel tankers to dock for the first time in nearly a month.',
      keyPoints: [
        'Armed gang factions pushed back over 2 kilometers from maritime cargo terminals.',
        'Haitian transitional presidential council commended the multinational forces for disciplined courage.',
        'International donors pledged additional armored patrol transports to sustain territorial control.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-02-06',
      title: 'Sudan Civil War: African Union Peace and Security Council Mandates Emergency Envoy to Port Sudan',
      source: 'AU Commission / BBC Africa',
      time: '09:00 PM',
      category: 'African Geopolitics & Conflict Resolution',
      summary: 'The African Union Peace and Security Council convened an emergency session in Addis Ababa, appointing a high-level presidential envoy to travel to Port Sudan to demand an immediate humanitarian ceasefire from both the Sudanese Armed Forces and Rapid Support Forces to permit life-saving aid convoys into Darfur.',
      keyPoints: [
        'Council condemned targeted violence against civilians and deliberate destruction of food reserves.',
        'Regional states warned that continued failure to allow aid access will trigger multilateral sanctions.',
        'AU Chairperson emphasized that African solutions must lead the peace restoration process.'
      ],
      readTime: '3 min read'
    },
    {
      id: 'intl-2026-10-02-07',
      title: 'World Meteorological Organization Reports 2026 Sea Surface Temperatures Hit Record Milestones',
      source: 'WMO Geneva / The Guardian',
      time: '10:15 PM',
      category: 'Climate Diplomacy & Science',
      summary: 'The World Meteorological Organization released its definitive global climate report, revealing that ocean heat content and sea surface temperatures across the Atlantic and Pacific basins reached historic highs over the past quarter, driving intensified tropical storm intensity across the Caribbean and coastal Africa.',
      keyPoints: [
        'Report underscores the imperative for accelerated adaptation finance at upcoming COP negotiations.',
        'Small Island Developing States reiterate calls for direct grants under the UN Loss and Damage Fund.',
        'WMO urged global investments in early warning climate disaster systems for developing nations.'
      ],
      readTime: '2 min read'
    }
  ]
};

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
console.log('Successfully updated Sept 30, Oct 1, and Oct 2 news in news.json!');
