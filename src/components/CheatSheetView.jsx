import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  BookOpen, 
  Scale, 
  Globe2, 
  Shield, 
  Sparkles,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

export default function CheatSheetView({ cheatSheet }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const sections = cheatSheet?.sections || [
    {
      heading: "1. Ghana 1992 Constitution: Foreign Affairs Anchors",
      points: [
        "Article 40: Directive Principles of State Policy on Foreign Relations - Ghana promotes African unity, respects international law and treaty obligations, adheres to UN, AU, and ECOWAS Charters, and supports peaceful settlement of international disputes.",
        "Article 73: The Government of Ghana shall conduct its international affairs in consonance with the accepted principles of public international law.",
        "Article 75: Execution of Treaties - The President may execute treaties, but they MUST be ratified by an Act of Parliament or parliamentary resolution backed by >50% of MPs (Dualist system).",
        "Article 83 & 84: National Security Council - Coordinates foreign and defense policies to preserve state territorial integrity.",
        "Article 181(5): International Economic Transactions - Any international commercial agreement to which the Government is a party must be laid before and approved by Parliament."
      ]
    },
    {
      heading: "2. Pillars of International Diplomatic Law",
      points: [
        "Vienna Convention on Diplomatic Relations (1961): Inviolability of mission premises (Art. 22), diplomatic pouch protection (Art. 27), immunity from criminal jurisdiction (Art. 31), non-interference in domestic affairs (Art. 41), Persona Non Grata declarations (Art. 9).",
        "Vienna Convention on Consular Relations (1963): Consular assistance, citizen protection, right of arrested foreigners to consular notification (Art. 36).",
        "Vienna Convention on the Law of Treaties (1969): Pacta sunt servanda (Art. 26 - treaties must be observed in good faith), Jus Cogens (Art. 53 - peremptory norms), Clausula Rebus Sic Stantibus (fundamental change of circumstances)."
      ]
    },
    {
      heading: "3. Regional & Continental Integration Instruments",
      points: [
        "AfCFTA (African Continental Free Trade Area): Secretariat in Accra; launched under AU Agenda 2063; eliminates tariffs on 90% of goods to create a single continental market.",
        "ECOWAS 1999 Mechanism & 2001 Supplementary Protocol: Zero tolerance for unconstitutional changes of government, democratic conditionality, collective peace enforcement.",
        "Accra Initiative (2017): Homegrown, intelligence-sharing security alliance of Gulf of Guinea and Sahel nations combating violent extremism.",
        "AU Constitutive Act Article 4(h): Principle of Non-Indifference; the Union's right to intervene in grave circumstances (genocide, war crimes, crimes against humanity).",
        "Yaoundé Architecture (2013): Inter-regional maritime safety framework uniting ECOWAS, ECCAS, and the Gulf of Guinea Commission."
      ]
    },
    {
      heading: "4. Essential Diplomatic Glossary & Latin Concepts",
      points: [
        "Persona Non Grata (PNG): An unwelcome diplomatic agent who must be recalled by the sending state under Article 9 of the 1961 Vienna Convention.",
        "Agrément: The formal diplomatic consent given by a receiving state to accept a proposed ambassador.",
        "Démarche: An official diplomatic representation or protest presented by an ambassador to a foreign ministry.",
        "Exequatur: Formal authorization issued by the host government permitting a consul to exercise their functions.",
        "Chancery vs Residence: Chancery is the diplomatic office premises; Residence is the ambassador's official living quarters.",
        "Dualism vs Monism: Dualism requires domestic legislative transformation for treaties to have internal legal effect (Ghana); Monism treats international and municipal law as one.",
        "Pacta Sunt Servanda: Agreements must be kept; fundamental principle of treaty compliance.",
        "Jus Cogens: Peremptory norms of general international law from which no derogation is permitted (e.g. prohibition of aggression, slavery, genocide)."
      ]
    }
  ];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const filteredSections = sections.map(sec => {
    const matchingPoints = sec.points.filter(pt => 
      !searchTerm || pt.toLowerCase().includes(searchTerm.toLowerCase()) || sec.heading.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...sec, points: matchingPoints };
  }).filter(sec => sec.points.length > 0);

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', margin: '2rem auto', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        paddingBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
            border: '1.5px solid var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Scale size={22} color="#fae498" />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-crest)', fontSize: '1.35rem', color: '#f8fafc' }}>
              Foreign Affairs & Governance Master Cheat-Sheet
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
              High-yield constitutional articles, Vienna Conventions, treaties, and diplomatic vocabulary
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="#d4af37" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Article 40, Vienna, AfCFTA..."
            style={{
              width: '100%',
              background: 'rgba(15, 32, 56, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '9999px',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              color: '#f8fafc',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Sections List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {filteredSections.map((sec, sIdx) => (
          <div key={sIdx} style={{
            background: 'rgba(6, 14, 26, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '14px',
            padding: '1.4rem'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-crest)',
              fontSize: '1.05rem',
              color: '#fae498',
              letterSpacing: '0.04em',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BookOpen size={17} color="var(--gold-primary)" />
              <span>{sec.heading}</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sec.points.map((pt, pIdx) => {
                const uniqueKey = `${sIdx}-${pIdx}`;
                const [titlePart, ...rest] = pt.split(' - ');
                const hasDivider = rest.length > 0;

                return (
                  <div key={pIdx} style={{
                    background: 'rgba(15, 32, 56, 0.65)',
                    borderLeft: '3px solid var(--gold-primary)',
                    borderRadius: '0 8px 8px 0',
                    padding: '0.85rem 1rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}>
                    <div>
                      {hasDivider ? (
                        <>
                          <strong style={{ color: '#fae498' }}>{titlePart}</strong>
                          <span style={{ color: '#cbd5e1' }}> — {rest.join(' - ')}</span>
                        </>
                      ) : (
                        <span>{pt}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleCopy(pt, uniqueKey)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedIndex === uniqueKey ? '#10b981' : '#94a3b8',
                        cursor: 'pointer',
                        padding: '0.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.15s ease'
                      }}
                      title="Copy note to clipboard"
                    >
                      {copiedIndex === uniqueKey ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
