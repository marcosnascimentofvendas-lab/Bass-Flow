import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen,
  Guitar,
  Plus,
  Minus,
  Play,
  Pause,
  Search,
  Maximize2,
  Minimize2,
  Edit3,
  Trash2,
  X,
  ListMusic,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown as ArrowDownIcon,
  Eye,
  EyeOff,
  Layers
} from 'lucide-react';

// --- BANCO DE DADOS DE MÚSICAS PRÉ-CARREGADAS COM 4 E 5 CORDAS ---
const INITIAL_SONGS = [
  {
    id: 1,
    title: "Todavia Me Alegrarei",
    artist: "Leandro Soares / Monte Sião",
    bpm: 72,
    timeSig: "4/4",
    originalKey: "G",
    scaleMode: "major",
    notes: "• Verso: Toque apenas na cabeça dos tempos (fundamentais limpas).\n• Pré-Refrão: Crescendo dinâmico com subida cromática em D.\n• Refrão: Groove em semicolcheias com ghost notes. Na versão de 5 cordas, explore o Ré grave (Corda B casa 3) para dar sustentação pesada no 'alegrarei no Senhor'.",
    sections: [
      {
        sectionName: "Verso 1",
        lines: [
          {
            text: "Mesmo sem [G]flores no [D/F#]jardim",
            tab4: "G|-----------------|\nD|-----------------|\nA|---------5-------|\nE|-3---------------|",
            tab5: "G|-----------------|\nD|-----------------|\nA|---------5-------|\nE|-3---------------|\nB|---------7-------|"
          },
          {
            text: "Mesmo sem [Em]frutos na [Bm]videira",
            tab4: "G|-----------------|\nD|-----------------|\nA|---------2-------|\nE|-0---------------|",
            tab5: "G|-----------------|\nD|-----------------|\nA|---------2-------|\nE|-0---------------|\nB|-----------------|"
          },
          {
            text: "Mesmo que os [C]campos não [G/B]produzam man[Am]timento",
            tab4: "G|-----------------|\nD|-----------------|\nA|-3-------2-------|\nE|-----------------5|",
            tab5: "G|-----------------|\nD|-----------------|\nA|-3-------2-------|\nE|-----------------5|\nB|-----------------|"
          }
        ]
      },
      {
        sectionName: "Refrão",
        lines: [
          {
            text: "Todavia me a[G]legrarei no [D]Senhor",
            tab4: "G|-------------------------|\nD|-------5-5---------7-7---|\nA|-----------------5-----5-|\nE|-3-3-x-----3---x---------|",
            tab5: "G|-------------------------|\nD|-------5-5---------------|\nA|-------------------------|\nE|-3-3-x-----3---x---------|\nB|-----------------3-3-x-3-|"
          },
          {
            text: "Exulta[Em]rei no Deus da minha sal[C]vação",
            tab4: "G|-------------------------|\nD|-------------------------|\nA|-------7-7-------3-3-2-0-|\nE|-0-0-x-----0---x---------|",
            tab5: "G|-------------------------|\nD|-------------------------|\nA|-----------------3-3-2-0-|\nE|-0-0-x-7-7-0---x---------|\nB|-----------------|"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Caminho no Deserto (Way Maker)",
    artist: "Soraya Moraes / Sinach",
    bpm: 68,
    timeSig: "4/4",
    originalKey: "E",
    scaleMode: "major",
    notes: "• Na versão 5 cordas, aproveite a corda B para o B fundamental (corda B casa 0 ou 12) e C# (casa 2). Som encorpado com compressão média.",
    sections: [
      {
        sectionName: "Verso",
        lines: [
          {
            text: "Estás a[A]qui movendo entre [E]nós, te ado[B]rarei, te ado[C#m]rarei",
            tab4: "G|-----------------------|\nD|-----------------------|\nA|-0-------/7------------|\nE|-----------------7-----|",
            tab5: "G|-----------------------|\nD|-----------------------|\nA|-0-------/7------------|\nE|-----------------------|\nB|-----------------0---2-|"
          },
          {
            text: "Estás a[A]qui mudando cora[E]ções, te ado[B]rarei, te ado[C#m]rarei",
            tab4: "G|-----------------------|\nD|-----------------------|\nA|-0--------7------------|\nE|-----------------7-----|",
            tab5: "G|-----------------------|\nD|-----------------------|\nA|-0--------7------------|\nE|-----------------------|\nB|-----------------0---2-|"
          }
        ]
      },
      {
        sectionName: "Refrão",
        lines: [
          {
            text: "[A]Milagroso, abre caminho, pro[E]messas cumpre, luz na escuridão",
            tab4: "G|---------------------------------|\nD|---------------------------------|\nA|---------------------------------|\nE|-5-5-5-5---------0-0-0-0---------|",
            tab5: "G|---------------------------------|\nD|---------------------------------|\nA|---------------------------------|\nE|-5-5-5-5---------0-0-0-0---------|\nB|---------------------------------|"
          },
          {
            text: "Esse é quem [B]Tu és, esse é quem [C#m]Tu és",
            tab4: "G|---------------------------------|\nD|---------------------------------|\nA|-2-2-2-2---------4-4-4-4---------|\nE|---------------------------------|",
            tab5: "G|---------------------------------|\nD|---------------------------------|\nA|---------------------------------|\nE|---------------------------------|\nB|-0-0-0-0---------2-2-2-2---------|"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "A Casa É Sua",
    artist: "Casa Worship",
    bpm: 70,
    timeSig: "4/4",
    originalKey: "C",
    scaleMode: "major",
    notes: "• Condução rítmica reta de colcheias. Atenção ao abafamento (palm mute) com a mão direita na ponte.",
    sections: [
      {
        sectionName: "Verso",
        lines: [
          {
            text: "Essa [C]casa é Sua casa, nós deixamos [G]ela pra Você",
            tab4: "G|-----------------|\nD|-----------------|\nA|-3-3-3-3---------|\nE|---------3-3-3-3-|",
            tab5: "G|-----------------|\nD|-----------------|\nA|-3-3-3-3---------|\nE|-----------------|\nB|---------8-8-8-8-|"
          },
          {
            text: "Jesus, essa [Am]casa é Sua casa, nós deixamos [F]ela pra Você",
            tab4: "G|-----------------|\nD|-----------------|\nA|---------x-------|\nE|-5-5-5-5---1-1-1-|",
            tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-5-5-5-5---------|\nB|-----------6-6-6-|"
          }
        ]
      },
      {
        sectionName: "Refrão",
        lines: [
          {
            text: "A[C]pareça, que o Teu nome cresça, [G]enche este lugar",
            tab4: "G|---------------------------------|\nD|---------------------------------|\nA|-3-3-3-3-3-3-3-3-----------------|\nE|-----------------3-3-3-3-3-3-3-3-|",
            tab5: "G|---------------------------------|\nD|---------------------------------|\nA|-3-3-3-3-3-3-3-3-----------------|\nE|-----------------3-3-3-3-3-3-3-3-|\nB|-----------------8-8-8-8-8-8-8-8-|"
          }
        ]
      }
    ]
  }
];

// --- CONSTANTES MUSICAIS ---
const SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const COMMON_CHORD_BUTTONS = [
  'C', 'D', 'E', 'F', 'G', 'A', 'B',
  'Cm', 'Dm', 'Em', 'F#m', 'Gm', 'Am', 'Bm', 'C#m',
  'C/E', 'D/F#', 'G/B', 'A/C#', 'F#/A#',
  '7', 'maj7', 'm7', 'sus4', 'add9'
];

const PRESET_SECTIONS = [
  'Introdução',
  'Pré-refrão',
  'Ponte',
  'Solo/Interlúdio',
  'Final'
];

const NASHVILLE_MAJOR_STEPS = [
  { degree: '1', semitones: 0, suffix7: 'maj7', triadSuffix: '' },
  { degree: '2m', semitones: 2, suffix7: 'm7', triadSuffix: 'm' },
  { degree: '3m', semitones: 4, suffix7: 'm7', triadSuffix: 'm' },
  { degree: '4', semitones: 5, suffix7: 'maj7', triadSuffix: '' },
  { degree: '5', semitones: 7, suffix7: '7', triadSuffix: '' },
  { degree: '6m', semitones: 9, suffix7: 'm7', triadSuffix: 'm' },
  { degree: '7°', semitones: 11, suffix7: 'm7(b5)', triadSuffix: 'dim' }
];

const NASHVILLE_MINOR_STEPS = [
  { degree: '1m', semitones: 0, suffix7: 'm7', triadSuffix: 'm' },
  { degree: '2°', semitones: 2, suffix7: 'm7(b5)', triadSuffix: 'dim' },
  { degree: 'b3', semitones: 3, suffix7: 'maj7', triadSuffix: '' },
  { degree: '4m', semitones: 5, suffix7: 'm7', triadSuffix: 'm' },
  { degree: '5m', semitones: 7, suffix7: 'm7', triadSuffix: 'm' },
  { degree: 'b6', semitones: 8, suffix7: 'maj7', triadSuffix: '' },
  { degree: 'b7', semitones: 10, suffix7: '7', triadSuffix: '' }
];

const isLikelyChordLine = (line) => {
  const trimmed = line.trim();
  if (!trimmed) return false;
  const words = trimmed.split(/\s+/);
  if (words.length === 0) return false;

  const chordPattern = /^[A-G][b#]?(m|maj|min|dim|aug|sus|add)?[0-9]*(?:\/[A-G][b#]?)?$/;
  let chordMatches = 0;

  for (const word of words) {
    const cleanWord = word.replace(/[(),.]/g, '');
    if (chordPattern.test(cleanWord)) {
      chordMatches++;
    }
  }
  return (chordMatches / words.length) >= 0.55;
};

const normalizeEditedLineChords = (text) => {
  if (!text) return '';
  let normalized = text.replace(/\[\s*([^\]]+?)\s*\]/g, '[$1]');
  if (!normalized.includes('[') && isLikelyChordLine(normalized)) {
    normalized = normalized.replace(/\S+/g, (token) => `[${token}]`);
  }
  return normalized;
};

const convertRawCifraToBracketed = (rawText) => {
  const rawLines = rawText.split('\n');
  const sections = [];
  let currentSection = { sectionName: "Geral", lines: [] };

  let i = 0;
  while (i < rawLines.length) {
    const line = rawLines[i];
    const trimmed = line.trim();

    const sectionMatch = trimmed.match(/^\[?(Verso|Refrão|Refrao|Chorus|Ponte|Bridge|Intro|Introdução|Solo|Interlúdio|Final|Outro)[^\]:]*\]?:?$/i);
    if (sectionMatch) {
      if (currentSection.lines.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { sectionName: trimmed.replace(/[\[\]:]/g, '').trim(), lines: [] };
      i++;
      continue;
    }

    if (line.includes('[') && line.includes(']')) {
      currentSection.lines.push({
        text: normalizeEditedLineChords(line),
        tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
        tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
      });
      i++;
      continue;
    }

    if (isLikelyChordLine(line)) {
      const chordLine = line;
      const nextLine = (i + 1 < rawLines.length) ? rawLines[i + 1] : '';

      if (nextLine && !isLikelyChordLine(nextLine) && !nextLine.trim().match(/^\[?(Verso|Refrão|Chorus|Ponte|Intro)/i)) {
        let merged = '';
        let lIdx = 0;
        const chordRegex = /\S+/g;
        let cMatch;
        const chordEntries = [];

        while ((cMatch = chordRegex.exec(chordLine)) !== null) {
          chordEntries.push({ chord: cMatch[0], index: cMatch.index });
        }

        for (const entry of chordEntries) {
          if (entry.index > lIdx) {
            merged += nextLine.slice(lIdx, entry.index);
            lIdx = entry.index;
          }
          merged += `[${entry.chord}]`;
        }
        if (lIdx < nextLine.length) {
          merged += nextLine.slice(lIdx);
        }

        currentSection.lines.push({
          text: merged || chordLine,
          tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
          tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
        });
        i += 2;
        continue;
      } else {
        const bracketedOnly = chordLine.replace(/(\S+)/g, '[$1]');
        currentSection.lines.push({
          text: bracketedOnly,
          tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
          tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
        });
        i++;
        continue;
      }
    } else {
      if (trimmed) {
        currentSection.lines.push({
          text: line,
          tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
          tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
        });
      }
      i++;
    }
  }

  if (currentSection.lines.length > 0) {
    sections.push(currentSection);
  }

  return sections.length > 0 ? sections : [
    {
      sectionName: "Geral",
      lines: [{
        text: "[G]Nova cifra [D]pronta",
        tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
        tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
      }]
    }
  ];
};

const ENHARMONIC_MAP = {
  'B#': 'C', 'E#': 'F', 'Cb': 'B', 'Fb': 'E',
  'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
};

const transposeSingleNote = (note, semitones, preferFlats = false) => {
  let clean = note.trim();
  if (ENHARMONIC_MAP[clean] && !SHARPS.includes(clean) && !FLATS.includes(clean)) {
    clean = ENHARMONIC_MAP[clean];
  }
  let idx = SHARPS.indexOf(clean);
  if (idx === -1) idx = FLATS.indexOf(clean);
  if (idx === -1) return note;

  let newIdx = (idx + semitones) % 12;
  if (newIdx < 0) newIdx += 12;
  return preferFlats ? FLATS[newIdx] : SHARPS[newIdx];
};

const transposeFullChord = (chordStr, semitones, preferFlats = false) => {
  if (!chordStr || semitones === 0) return chordStr;
  const parts = chordStr.split('/');
  const rootPart = parts[0].trim();
  const bassPart = parts.length > 1 ? parts[1].trim() : null;

  const match = rootPart.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chordStr;

  const rootNote = match[1];
  const suffix = match[2];
  const newRoot = transposeSingleNote(rootNote, semitones, preferFlats);
  let result = newRoot + suffix;

  if (bassPart) {
    const bassMatch = bassPart.match(/^([A-G][#b]?)(.*)$/);
    if (bassMatch) {
      result += '/' + transposeSingleNote(bassMatch[1], semitones, preferFlats) + bassMatch[2];
    } else {
      result += '/' + bassPart;
    }
  }
  return result;
};

const extractRootNote = (keyStr = 'C') => {
  const match = keyStr.trim().match(/^([A-G][#b]?)/);
  return match ? match[1] : 'C';
};

const getNashvilleHarmonicField = (keyStr, mode = 'major', preferFlats = false) => {
  const rootNote = extractRootNote(keyStr);
  const steps = mode === 'minor' ? NASHVILLE_MINOR_STEPS : NASHVILLE_MAJOR_STEPS;
  return steps.map(step => {
    const note = transposeSingleNote(rootNote, step.semitones, preferFlats);
    return {
      degree: step.degree,
      note,
      chord7: `${note}${step.suffix7}`,
      triad: `${note}${step.triadSuffix}`
    };
  });
};

const parseChordLine = (rawLine) => {
  const cleanedLine = normalizeEditedLineChords(rawLine);
  const tokens = [];
  const regex = /\[([^\]]+)\]([^\[]*)/g;
  let match;
  const firstBracket = cleanedLine.indexOf('[');
  if (firstBracket > 0) {
    tokens.push({ chord: '', text: cleanedLine.substring(0, firstBracket) });
  } else if (firstBracket === -1) {
    return [{ chord: '', text: cleanedLine }];
  }

  regex.lastIndex = firstBracket >= 0 ? firstBracket : 0;
  while ((match = regex.exec(cleanedLine)) !== null) {
    tokens.push({ chord: match[1].trim(), text: match[2] });
  }
  return tokens;
};

const splitTextIntoSyllableParts = (text) => {
  if (!text) return [];
  return text.match(/[^aeiouáéíóúâêôãõü\s]+[aeiouáéíóúâêôãõü]*|[aeiouáéíóúâêôãõü]+|\s+|[^a-zA-Z0-9áéíóúâêôãõü\s]+/gi) || [text];
};

const getSyllableSlots = (rawLine) => {
  const cleaned = normalizeEditedLineChords(rawLine || '');
  const tokens = parseChordLine(cleaned);
  const slots = [];

  tokens.forEach((token, tIdx) => {
    const text = token.text || '';
    const parts = splitTextIntoSyllableParts(text);
    if (parts.length === 0) {
      slots.push({
        id: `${tIdx}-0`,
        label: '',
        chord: token.chord || ''
      });
      return;
    }

    parts.forEach((part, pIdx) => {
      if (part === '') return;
      slots.push({
        id: `${tIdx}-${pIdx}`,
        label: part,
        chord: pIdx === 0 ? token.chord : ''
      });
    });
  });

  if (slots.length === 0) {
    slots.push({ id: '0-0', label: ' ', chord: '' });
  }

  return slots;
};

const attachChordToSlot = (rawLine, slotIndex, chordName) => {
  const cleaned = normalizeEditedLineChords(rawLine || '');
  const tokens = parseChordLine(cleaned);

  let currentSlot = 0;
  let result = '';
  let applied = false;

  for (const token of tokens) {
    const text = token.text || '';
    const parts = splitTextIntoSyllableParts(text);

    if (parts.length === 0) {
      if (currentSlot === slotIndex) {
        result += chordName ? `[${chordName}]` : '';
        applied = true;
      } else if (token.chord) {
        result += `[${token.chord}]`;
      }
      currentSlot++;
      continue;
    }

    for (let pIdx = 0; pIdx < parts.length; pIdx++) {
      const part = parts[pIdx];
      if (part === '') continue;

      if (currentSlot === slotIndex) {
        result += chordName ? `[${chordName}]${part}` : part;
        applied = true;
      } else {
        const existingChord = (pIdx === 0 && token.chord) ? `[${token.chord}]` : '';
        result += `${existingChord}${part}`;
      }
      currentSlot++;
    }
  }

  if (!applied && chordName) {
    result += `[${chordName}]`;
  }

  return result;
};

const convert4to5StringsTab = (tab4) => {
  if (!tab4) return "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|";

  const lines = tab4.split('\n');
  let bLine = "B|";
  let gLine = "G|";
  let dLine = "D|";
  let aLine = "A|";
  let eLine = "E|";

  lines.forEach(l => {
    const trimmed = l.trim();
    if (trimmed.startsWith('G|')) gLine = trimmed;
    if (trimmed.startsWith('D|')) dLine = trimmed;
    if (trimmed.startsWith('A|')) aLine = trimmed;
    if (trimmed.startsWith('E|')) eLine = trimmed;
  });

  const len = Math.max(gLine.length, dLine.length, aLine.length, eLine.length);
  bLine = "B|" + "-".repeat(Math.max(0, len - 3)) + "|";

  return `${gLine}\n${dLine}\n${aLine}\n${eLine}\n${bLine}`;
};

const hasMeaningfulTab = (line) => {
  const raw = `${line.tab4 || ''} ${line.tab5 || ''} ${line.tab || ''}`;
  return /[0-9x/hpb~]/i.test(raw);
};

const getSectionBadgeStyle = (sectionName = '') => {
  const lower = sectionName.toLowerCase();
  if (lower.includes('refrão') || lower.includes('refrao') || lower.includes('chorus')) {
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  }
  if (lower.includes('solo') || lower.includes('interlúdio') || lower.includes('interludio') || lower.includes('ponte')) {
    return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/35';
  }
  if (lower.includes('intro') || lower.includes('pré-refrão') || lower.includes('pre-refrao') || lower.includes('final')) {
    return 'bg-amber-500/15 text-amber-300 border-amber-500/35';
  }
  return 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60';
};

export default function App() {
  const [songs, setSongs] = useState(() => {
    try {
      const saved = localStorage.getItem('bass_flow_songs_v1');
      return saved ? JSON.parse(saved) : INITIAL_SONGS;
    } catch {
      return INITIAL_SONGS;
    }
  });

  const [selectedSongId, setSelectedSongId] = useState(() => {
    try {
      const saved = localStorage.getItem('bass_flow_songs_v1');
      const parsed = saved ? JSON.parse(saved) : INITIAL_SONGS;
      return parsed.length > 0 ? parsed[0].id : null;
    } catch {
      return INITIAL_SONGS[0].id;
    }
  });

  const [activeTabMenu, setActiveTabMenu] = useState('library');
  const [setlistSongIds, setSetlistSongIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bass_flow_setlist_v1');
      return saved ? JSON.parse(saved) : [1, 2, 3];
    } catch {
      return [1, 2, 3];
    }
  });
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveSongIndex, setLiveSongIndex] = useState(0);

  const [transposeSemitones, setTransposeSemitones] = useState(0);
  const [preferFlats, setPreferFlats] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bassViewMode, setBassViewMode] = useState('both');
  const [tabDisplayMode, setTabDisplayMode] = useState('chips');
  const [stageMode, setStageMode] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState({});

  const sheetScrollRef = useRef(null);

  const [metronomeOn, setMetronomeOn] = useState(false);
  const [metronomeBpm, setMetronomeBpm] = useState(72);
  const audioCtxRef = useRef(null);

  const [editingTabState, setEditingTabState] = useState(null);
  const [isFullSongEditorOpen, setIsFullSongEditorOpen] = useState(false);
  const [editSongForm, setEditSongForm] = useState({
    title: '', artist: '', bpm: 72, originalKey: 'G', scaleMode: 'major', notes: '', sections: []
  });
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const [rawTextImportModal, setRawTextImportModal] = useState(false);
  const [rawCifraInput, setRawCifraInput] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongBpm, setNewSongBpm] = useState(70);
  const [newSongKey, setNewSongKey] = useState('C');
  const [newSongScaleMode, setNewSongScaleMode] = useState('major');
  const [newSongContent, setNewSongContent] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('bass_flow_songs_v1', JSON.stringify(songs));
    } catch (e) {
      console.error("Erro ao salvar dados de músicas", e);
    }
  }, [songs]);

  useEffect(() => {
    try {
      localStorage.setItem('bass_flow_setlist_v1', JSON.stringify(setlistSongIds));
    } catch (e) {
      console.error("Erro ao salvar setlist", e);
    }
  }, [setlistSongIds]);

  const activeSong = useMemo(() => {
    if (songs.length === 0) return null;
    return songs.find(s => s.id === selectedSongId) || songs[0];
  }, [songs, selectedSongId]);

  useEffect(() => {
    if (activeSong) {
      setMetronomeBpm(activeSong.bpm || 72);
    } else {
      setMetronomeOn(false);
    }
  }, [activeSong?.id, activeSong?.bpm]);

  useEffect(() => {
    setTransposeSemitones(0);
    setExpandedTabs({});
  }, [selectedSongId]);

  const activeScaleMode = activeSong?.scaleMode || (activeSong?.originalKey?.endsWith('m') ? 'minor' : 'major');

  const handleToggleSongScaleMode = (mode) => {
    if (!activeSong) return;
    setSongs(prev => prev.map(s => (s.id === activeSong.id ? { ...s, scaleMode: mode } : s)));
  };

  const setlistSongs = useMemo(() => {
    return setlistSongIds
      .map(id => songs.find(s => s.id === id))
      .filter(Boolean);
  }, [setlistSongIds, songs]);

  const handleStartLiveMode = () => {
    if (setlistSongs.length === 0) return;
    setLiveSongIndex(0);
    setSelectedSongId(setlistSongs[0].id);
    setIsLiveMode(true);
    setStageMode(true);
    setSidebarOpen(false);
    setTabDisplayMode('clean');
    setExpandedTabs({});
  };

  const handleNextLiveSong = () => {
    if (liveSongIndex < setlistSongs.length - 1) {
      const nextIdx = liveSongIndex + 1;
      setLiveSongIndex(nextIdx);
      setSelectedSongId(setlistSongs[nextIdx].id);
      if (sheetScrollRef.current) sheetScrollRef.current.scrollTop = 0;
    }
  };

  const handlePrevLiveSong = () => {
    if (liveSongIndex > 0) {
      const prevIdx = liveSongIndex - 1;
      setLiveSongIndex(prevIdx);
      setSelectedSongId(setlistSongs[prevIdx].id);
      if (sheetScrollRef.current) sheetScrollRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLiveMode) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNextLiveSong();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevLiveSong();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLiveMode, liveSongIndex, setlistSongs]);

  const playClick = (isAccent) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isAccent ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(isAccent ? 1200 : 750, ctx.currentTime);

      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {
      console.warn("Áudio não disponível", e);
    }
  };

  useEffect(() => {
    let intervalId;
    if (metronomeOn && metronomeBpm > 0) {
      const intervalMs = (60 / metronomeBpm) * 1000;
      let beatCount = 0;
      intervalId = setInterval(() => {
        beatCount = (beatCount % 4) + 1;
        playClick(beatCount === 1);
      }, intervalMs);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [metronomeOn, metronomeBpm]);

  const handleToggleMetronome = () => {
    if (!metronomeOn) {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        playClick(true);
      } catch (e) {
        console.warn("Áudio não disponível", e);
      }
    }
    setMetronomeOn(prev => !prev);
  };

  const handleDeleteSong = (id) => {
    const remaining = songs.filter(s => s.id !== id);
    setSongs(remaining);
    setSetlistSongIds(prev => prev.filter(sId => sId !== id));

    if (selectedSongId === id) {
      setSelectedSongId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleRestoreInitialSongs = () => {
    setSongs(INITIAL_SONGS);
    setSelectedSongId(INITIAL_SONGS[0].id);
    setSetlistSongIds([1, 2, 3]);
  };

  const toggleLineTab = (secIdx, lineIdx) => {
    const key = `${secIdx}-${lineIdx}`;
    setExpandedTabs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const cycleTabDisplayMode = () => {
    setTabDisplayMode(prev => {
      if (prev === 'chips') return 'all';
      if (prev === 'all') return 'clean';
      return 'chips';
    });
  };

  const currentKey = useMemo(() => {
    if (!activeSong) return 'C';
    return transposeFullChord(activeSong.originalKey, transposeSemitones, preferFlats);
  }, [activeSong, transposeSemitones, preferFlats]);

  const harmonicField = useMemo(() => {
    return getNashvilleHarmonicField(currentKey, activeScaleMode, preferFlats);
  }, [currentKey, activeScaleMode, preferFlats]);

  const filteredSongs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }, [songs, searchQuery]);

  const toggleSongInSetlist = (id) => {
    setSetlistSongIds(prev =>
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const moveSongInSetlist = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= setlistSongIds.length) return;
    const newList = [...setlistSongIds];
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    setSetlistSongIds(newList);
  };

  const handleOpenTabEditor = (secIdx, lineIdx) => {
    if (!activeSong) return;
    const line = activeSong.sections[secIdx].lines[lineIdx];
    const initialTab4 = line.tab4 || (line.tab ? line.tab : "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|");
    const initialTab5 = line.tab5 || convert4to5StringsTab(initialTab4);

    setEditingTabState({
      secIdx,
      lineIdx,
      activeTabType: bassViewMode === '5' ? 'tab5' : 'tab4',
      content4: initialTab4,
      content5: initialTab5,
      selectedString: 'E',
      selectedFret: 3
    });
  };

  const handleSaveTab = () => {
    if (!editingTabState || !activeSong) return;
    const { secIdx, lineIdx, content4, content5 } = editingTabState;

    setSongs(prev => prev.map(song => {
      if (song.id !== activeSong.id) return song;
      const newSections = [...song.sections];
      const newLines = [...newSections[secIdx].lines];
      newLines[lineIdx] = {
        ...newLines[lineIdx],
        tab4: content4,
        tab5: content5,
        tab: content4
      };
      newSections[secIdx] = {
        ...newSections[secIdx],
        lines: newLines
      };
      return { ...song, sections: newSections };
    }));

    setExpandedTabs(prev => ({ ...prev, [`${secIdx}-${lineIdx}`]: true }));
    setEditingTabState(null);
  };

  const handleOpenSongEditor = () => {
    if (!activeSong) return;
    const clonedSections = (activeSong.sections && activeSong.sections.length > 0)
      ? JSON.parse(JSON.stringify(activeSong.sections))
      : [{ sectionName: "Introdução", lines: [{ text: "", tab4: "", tab5: "" }] }];

    setEditSongForm({
      title: activeSong.title || '',
      artist: activeSong.artist || '',
      bpm: activeSong.bpm || 72,
      originalKey: activeSong.originalKey || 'C',
      scaleMode: activeSong.scaleMode || 'major',
      notes: activeSong.notes || '',
      sections: clonedSections
    });
    setActiveSectionIdx(0);
    setActiveLineIdx(0);
    setSelectedSlotIdx(0);
    setIsFullSongEditorOpen(true);
  };

  const handleSaveSongEdits = () => {
    if (!activeSong) return;
    const parsedBpm = parseInt(editSongForm.bpm, 10) || activeSong.bpm || 72;
    const normalizedSections = editSongForm.sections.map(sec => ({
      ...sec,
      lines: sec.lines.map(line => ({
        ...line,
        text: normalizeEditedLineChords(line.text)
      }))
    }));

    setSongs(prev => prev.map(song => {
      if (song.id !== activeSong.id) return song;
      return {
        ...song,
        title: editSongForm.title.trim() || song.title,
        artist: editSongForm.artist.trim() || song.artist,
        bpm: parsedBpm,
        originalKey: editSongForm.originalKey.trim() || song.originalKey,
        scaleMode: editSongForm.scaleMode || 'major',
        notes: editSongForm.notes,
        sections: normalizedSections
      };
    }));

    setMetronomeBpm(parsedBpm);
    setIsFullSongEditorOpen(false);
  };

  const updateLineTextInEditor = (secIdx, lineIdx, newText) => {
    setEditSongForm(prev => {
      const nextSections = [...prev.sections];
      const nextLines = [...nextSections[secIdx].lines];
      nextLines[lineIdx] = { ...nextLines[lineIdx], text: newText };
      nextSections[secIdx] = { ...nextSections[secIdx], lines: nextLines };
      return { ...prev, sections: nextSections };
    });
  };

  const updateSectionNameInEditor = (secIdx, newName) => {
    setEditSongForm(prev => {
      const nextSections = [...prev.sections];
      nextSections[secIdx] = { ...nextSections[secIdx], sectionName: newName };
      return { ...prev, sections: nextSections };
    });
  };

  const insertChordIntoActiveSyllable = (chordName) => {
    const secIdx = activeSectionIdx;
    const lineIdx = activeLineIdx;
    const targetLine = editSongForm.sections[secIdx]?.lines[lineIdx];
    if (!targetLine) return;

    const updatedText = attachChordToSlot(targetLine.text, selectedSlotIdx, chordName);
    updateLineTextInEditor(secIdx, lineIdx, updatedText);
  };

  const handleAddSection = (presetName = "Nova Seção") => {
    const newSec = {
      sectionName: presetName,
      lines: [
        {
          text: "[C]Nova linha de louvor",
          tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
          tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
        }
      ]
    };
    setEditSongForm(prev => {
      const nextLen = prev.sections.length;
      setActiveSectionIdx(nextLen);
      setActiveLineIdx(0);
      setSelectedSlotIdx(0);
      return {
        ...prev,
        sections: [...prev.sections, newSec]
      };
    });
  };

  const handleAddLineToSection = (secIdx) => {
    setEditSongForm(prev => {
      const nextSections = [...prev.sections];
      const newLineIdx = nextSections[secIdx].lines.length;
      nextSections[secIdx] = {
        ...nextSections[secIdx],
        lines: [
          ...nextSections[secIdx].lines,
          {
            text: "Digite a letra aqui e clique na sílaba para cifrar",
            tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
            tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
          }
        ]
      };
      setActiveLineIdx(newLineIdx);
      setSelectedSlotIdx(0);
      return { ...prev, sections: nextSections };
    });
  };

  const handleRemoveLine = (secIdx, lineIdx) => {
    setEditSongForm(prev => {
      const nextSections = [...prev.sections];
      if (nextSections[secIdx].lines.length <= 1) return prev;
      nextSections[secIdx] = {
        ...nextSections[secIdx],
        lines: nextSections[secIdx].lines.filter((_, idx) => idx !== lineIdx)
      };
      setActiveLineIdx(0);
      setSelectedSlotIdx(0);
      return { ...prev, sections: nextSections };
    });
  };

  const handleApplyRawCifraToEditSong = () => {
    if (!rawCifraInput.trim()) return;
    const parsedSections = convertRawCifraToBracketed(rawCifraInput);
    setEditSongForm(prev => ({
      ...prev,
      sections: parsedSections
    }));
    setRawTextImportModal(false);
    setRawCifraInput('');
    setActiveSectionIdx(0);
    setActiveLineIdx(0);
    setSelectedSlotIdx(0);
  };

  const insertFretFromBoard = (stringName, fretNum) => {
    if (!editingTabState) return;
    const is5 = editingTabState.activeTabType === 'tab5';
    const field = is5 ? 'content5' : 'content4';
    const currentText = editingTabState[field];

    const lines = currentText.split('\n');
    const prefix = `${stringName}|`;
    let modified = false;

    const newLines = lines.map(line => {
      if (line.trim().startsWith(prefix)) {
        modified = true;
        let trimmed = line.trim();
        if (trimmed.endsWith('|')) {
          trimmed = trimmed.slice(0, -1);
        }
        return `${trimmed}${fretNum}-|`;
      }
      return line;
    });

    if (!modified) {
      newLines.push(`${stringName}|-${fretNum}-|`);
    }

    setEditingTabState({
      ...editingTabState,
      selectedString: stringName,
      selectedFret: fretNum,
      [field]: newLines.join('\n')
    });
  };

  const handleCreateSong = () => {
    if (!newSongTitle.trim()) return;

    const parsedSections = convertRawCifraToBracketed(newSongContent);
    const parsedBpm = parseInt(newSongBpm, 10) || 72;

    const newSong = {
      id: Date.now(),
      title: newSongTitle.trim(),
      artist: newSongArtist.trim() || 'Ministério de Louvor',
      bpm: parsedBpm,
      timeSig: "4/4",
      originalKey: newSongKey.trim() || 'C',
      scaleMode: newSongScaleMode,
      notes: "Anotações e condução do baixo para " + newSongTitle,
      sections: parsedSections
    };

    setSongs([...songs, newSong]);
    setSelectedSongId(newSong.id);
    setIsAddModalOpen(false);
    setNewSongTitle('');
    setNewSongArtist('');
    setNewSongContent('');
  };

  const currentEditSection = editSongForm.sections[activeSectionIdx] || { sectionName: '', lines: [] };

  return (
    <div className={`flex h-screen w-full select-none overflow-hidden font-sans transition-colors duration-300 ${stageMode ? 'bg-black text-amber-100' : 'bg-zinc-950 text-zinc-100'}`}>

      {/* PAINEL LATERAL (BIBLIOTECA & MONTADOR DE SETLIST) */}
      {sidebarOpen && !isLiveMode && (
        <aside className="w-72 md:w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col z-20 shrink-0 select-text">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Guitar size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-wide flex items-center gap-1 text-zinc-100">
                  BASS FLOW <span className="text-[10px] bg-emerald-500 text-zinc-950 font-black px-1.5 py-0.5 rounded uppercase">PRO</span>
                </h1>
                <p className="text-[11px] text-zinc-400">Tabs de 4 e 5 Cordas & Louvor</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              title="Adicionar Nova Música"
              className="p-2 hover:bg-zinc-800 text-emerald-400 hover:text-emerald-300 rounded-lg border border-emerald-500/30 transition-all flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex border-b border-zinc-800 bg-zinc-950/60 p-1">
            <button
              type="button"
              onClick={() => setActiveTabMenu('library')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTabMenu === 'library'
                  ? 'bg-zinc-800 text-emerald-400 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen size={14} />
              <span>Repertório ({songs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTabMenu('setlist')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTabMenu === 'setlist'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ListMusic size={14} />
              <span>Setlist ({setlistSongIds.length})</span>
            </button>
          </div>

          {activeTabMenu === 'library' ? (
            <>
              <div className="p-3 border-b border-zinc-800/60">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Buscar no repertório..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-950/80 border border-zinc-800 text-xs rounded-lg pl-9 pr-3 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                {filteredSongs.length === 0 ? (
                  <div className="p-4 text-center space-y-2 text-xs text-zinc-400">
                    <p>Nenhuma cifra no repertório.</p>
                    <button
                      type="button"
                      onClick={handleRestoreInitialSongs}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-semibold"
                    >
                      Restaurar músicas iniciais
                    </button>
                  </div>
                ) : (
                  filteredSongs.map(song => {
                    const isSelected = activeSong?.id === song.id;
                    const isInSetlist = setlistSongIds.includes(song.id);
                    return (
                      <div
                        key={song.id}
                        onClick={() => setSelectedSongId(song.id)}
                        className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-lg shadow-emerald-950/20'
                            : 'border-transparent hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold text-sm truncate flex items-center gap-1.5">
                            {song.title}
                          </div>
                          <div className="text-xs text-zinc-400 truncate flex items-center gap-2 mt-0.5">
                            <span>{song.artist}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-mono font-medium">
                              {song.originalKey} {song.scaleMode === 'minor' ? 'm' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSongInSetlist(song.id);
                            }}
                            className={`p-1.5 rounded-md text-xs transition-all ${
                              isInSetlist
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'text-zinc-500 hover:text-white hover:bg-zinc-800'
                            }`}
                            title={isInSetlist ? "Remover do Setlist" : "Adicionar ao Setlist"}
                          >
                            <Plus size={14} className={isInSetlist ? 'rotate-45 transition-transform' : ''} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Excluir "${song.title}" do repertório?`)) {
                                handleDeleteSong(song.id);
                              }
                            }}
                            className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Excluir cifra do repertório"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              <div className="p-2">
                <button
                  type="button"
                  onClick={handleStartLiveMode}
                  disabled={setlistSongs.length === 0}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50"
                >
                  <Play size={15} fill="currentColor" />
                  <span>Iniciar Modo Live / Palco</span>
                </button>
              </div>

              <div className="px-2 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                Ordem do Culto / Show ({setlistSongs.length})
              </div>

              {setlistSongs.map((song, idx) => (
                <div
                  key={song.id}
                  onClick={() => setSelectedSongId(song.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    activeSong?.id === song.id
                      ? 'bg-emerald-950/50 border-emerald-500/50 text-white'
                      : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{song.title}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{song.originalKey} • {song.bpm} BPM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSongInSetlist(idx, -1);
                      }}
                      disabled={idx === 0}
                      className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSongInSetlist(idx, 1);
                      }}
                      disabled={idx === setlistSongs.length - 1}
                      className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDownIcon size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSongInSetlist(song.id);
                      }}
                      className="p-1 text-zinc-500 hover:text-red-400"
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      )}

      {/* ÁREA PRINCIPAL DA CIFRA & PALCO */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">

        {/* BARRA SUPERIOR DO MODO LIVE */}
        {isLiveMode && activeSong ? (
          <header className="bg-emerald-950 border-b border-emerald-800 px-4 py-2 flex items-center justify-between text-white shrink-0 z-30">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsLiveMode(false)}
                className="px-3 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg text-xs font-bold border border-emerald-700 flex items-center gap-1"
              >
                <X size={14} />
                <span>Sair do Live</span>
              </button>

              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-700/50">
                MÚSICA {liveSongIndex + 1} DE {setlistSongs.length}
              </span>
            </div>

            <div className="text-center font-bold text-sm text-emerald-100 flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">{currentKey}</span>
              <span>•</span>
              <span className="truncate max-w-[200px] sm:max-w-xs">{activeSong.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevLiveSong}
                disabled={liveSongIndex === 0}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-zinc-700 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <button
                type="button"
                onClick={handleNextLiveSong}
                disabled={liveSongIndex === setlistSongs.length - 1}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-lg text-xs font-black flex items-center gap-1 shadow-lg shadow-emerald-950/50 disabled:opacity-40"
              >
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </header>
        ) : (
          <header className={`border-b transition-colors px-3 py-2 shrink-0 flex flex-wrap items-center justify-between gap-2 ${
            stageMode ? 'bg-zinc-950 border-amber-900/40 text-amber-100' : 'bg-zinc-900/90 border-zinc-800 backdrop-blur-md'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors border border-zinc-700/50 shrink-0"
                title="Abrir/Fechar Repertório & Setlist"
              >
                <BookOpen size={18} />
              </button>

              {activeSong ? (
                <div className="min-w-0">
                  <h2 className="text-sm md:text-base font-bold truncate tracking-tight text-white flex items-center gap-2">
                    {activeSong.title}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      {currentKey} {transposeSemitones !== 0 && (`${transposeSemitones > 0 ? '+' : ''}${transposeSemitones}`)}
                    </span>
                  </h2>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {activeSong.artist} • Original: <span className="text-zinc-200 font-semibold">{activeSong.originalKey}</span> • {metronomeBpm} BPM
                  </p>
                </div>
              ) : (
                <span className="text-xs text-zinc-400">Sem música selecionada</span>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-1.5">
              <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => setBassViewMode('4')}
                  className={`px-2 py-1 text-xs rounded-lg font-bold transition-all ${
                    bassViewMode === '4' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  4C
                </button>
                <button
                  type="button"
                  onClick={() => setBassViewMode('5')}
                  className={`px-2 py-1 text-xs rounded-lg font-bold transition-all ${
                    bassViewMode === '5' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  5C
                </button>
                <button
                  type="button"
                  onClick={() => setBassViewMode('both')}
                  className={`px-2 py-1 text-xs rounded-lg font-bold transition-all ${
                    bassViewMode === 'both' ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  4C+5C
                </button>
              </div>

              <button
                type="button"
                onClick={cycleTabDisplayMode}
                title="Alternar modo das tablaturas na cifra"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                  tabDisplayMode === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : tabDisplayMode === 'chips'
                      ? 'bg-zinc-900 text-zinc-200 border-zinc-700'
                      : 'bg-zinc-950 text-zinc-500 border-zinc-800'
                }`}
              >
                {tabDisplayMode === 'clean' ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>
                  {tabDisplayMode === 'clean' ? 'Tabs Off' : tabDisplayMode === 'chips' ? 'Tabs Chip' : 'Tabs All'}
                </span>
              </button>

              <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setTransposeSemitones(t => t - 1)}
                  className="p-1 hover:bg-zinc-800 text-emerald-400 rounded-md"
                  title="Descer meio tom"
                >
                  <Minus size={14} />
                </button>
                <div className="px-1.5 font-mono font-bold text-xs text-center min-w-[45px]">
                  {transposeSemitones === 0 ? 'TOM' : `${transposeSemitones > 0 ? '+' : ''}${transposeSemitones}st`}
                </div>
                <button
                  type="button"
                  onClick={() => setTransposeSemitones(t => t + 1)}
                  className="p-1 hover:bg-zinc-800 text-emerald-400 rounded-md"
                  title="Subir meio tom"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setMetronomeBpm(b => Math.max(40, b - 2))}
                  className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md"
                  title="Diminuir BPM"
                >
                  <Minus size={13} />
                </button>
                <button
                  type="button"
                  onClick={handleToggleMetronome}
                  className={`px-2 py-1 rounded-md flex items-center gap-1 font-mono text-xs font-bold transition-all ${
                    metronomeOn ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                  title="Ligar/Desligar Metrônomo"
                >
                  {metronomeOn ? <Pause size={12} /> : <Play size={12} />}
                  <span>{metronomeBpm}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMetronomeBpm(b => Math.min(240, b + 2))}
                  className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md"
                  title="Aumentar BPM"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStageMode(prev => {
                    const next = !prev;
                    if (next) setSidebarOpen(false);
                    return next;
                  });
                }}
                title="Modo Palco"
                className={`p-1.5 rounded-lg border transition-all ${
                  stageMode ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold' : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                }`}
              >
                {stageMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </header>
        )}

        {/* VISUALIZADOR DA CIFRA */}
        <div
          ref={sheetScrollRef}
          className={`flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-6 select-text transition-all scroll-smooth ${
            stageMode ? 'bg-zinc-950' : 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950'
          }`}
        >
          {!activeSong ? (
            <div className="max-w-xl mx-auto mt-16 p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-center space-y-4">
              <h2 className="text-lg font-bold text-white">Nenhuma cifra disponível</h2>
              <p className="text-xs text-zinc-400">
                Adicione uma nova música pelo botão + ou restaure o repertório inicial.
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Nova Música
                </button>
                <button
                  type="button"
                  onClick={handleRestoreInitialSongs}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
                >
                  Restaurar Padrão
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-7 pb-40">
              <div className="border-b border-zinc-800/80 pb-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className={`font-black tracking-tight ${stageMode ? 'text-amber-300' : 'text-white'} text-2xl md:text-4xl`}>
                    {activeSong.title}
                  </h1>
                  <p className="text-zinc-400 font-medium text-sm md:text-base mt-1">
                    {activeSong.artist}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleOpenSongEditor}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
                  >
                    <Edit3 size={14} />
                    <span>Editar Cifra & Tabs</span>
                  </button>
                </div>
              </div>

              {/* MODELO LIMPO ANTES DA INTRO: TOM + SEMITONAR + CAMPO HARMÔNICO */}
              <div className="space-y-2 pb-2 border-b border-zinc-800/70">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-bold text-sm md:text-base text-amber-400">
                      Tom: {extractRootNote(currentKey)} {activeScaleMode === 'minor' ? '(Menor)' : '(Maior)'}
                    </span>

                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => setTransposeSemitones(t => t - 1)}
                        className="px-2 py-0.5 hover:bg-zinc-800 text-emerald-400 font-mono text-xs font-bold rounded"
                        title="Descer meio tom"
                      >
                        -0.5
                      </button>
                      <span className="px-2 font-mono text-[11px] text-zinc-300">
                        {transposeSemitones === 0 ? 'Original' : `${transposeSemitones > 0 ? '+' : ''}${transposeSemitones} st`}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTransposeSemitones(t => t + 1)}
                        className="px-2 py-0.5 hover:bg-zinc-800 text-emerald-400 font-mono text-xs font-bold rounded"
                        title="Subir meio tom"
                      >
                        +0.5
                      </button>
                      {transposeSemitones !== 0 && (
                        <button
                          type="button"
                          onClick={() => setTransposeSemitones(0)}
                          className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 hover:text-white"
                          title="Voltar ao tom original"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => handleToggleSongScaleMode('major')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                        activeScaleMode === 'major' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Maior
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleSongScaleMode('minor')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                        activeScaleMode === 'minor' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Menor
                    </button>
                  </div>
                </div>

                {/* Campo Harmônico compacto em linha (Sistema Nashville) */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  <span className="text-[11px] text-zinc-400 mr-1">Campo harmônico:</span>
                  {harmonicField.map((item, idx) => (
                    <span
                      key={item.degree}
                      className="inline-flex items-baseline gap-1 px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800/90"
                    >
                      <span className="text-[10px] text-amber-400/90">{item.degree}</span>
                      <span className="font-bold text-emerald-400">{item.triad}</span>
                      {idx < harmonicField.length - 1 && (
                        <span className="sr-only">,</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {activeSong.sections && activeSong.sections.map((section, secIdx) => (
                <div key={secIdx} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getSectionBadgeStyle(section.sectionName)}`}>
                      [{section.sectionName}]
                    </span>
                    <div className="h-px flex-1 bg-zinc-800/60" />
                  </div>

                  <div className="space-y-7 pl-1 md:pl-2">
                    {section.lines.map((line, lineIdx) => {
                      const parsedTokens = parseChordLine(line.text);
                      const tabKey = `${secIdx}-${lineIdx}`;
                      const hasTab = hasMeaningfulTab(line);
                      const isTabVisible = tabDisplayMode === 'all' || Boolean(expandedTabs[tabKey]);
                      const tab4Content = line.tab4 || line.tab || '';
                      const tab5Content = line.tab5 || (tab4Content ? convert4to5StringsTab(tab4Content) : '');
                      const showChip = tabDisplayMode === 'chips' && (hasTab || isTabVisible);

                      return (
                        <div key={lineIdx} className="relative group transition-all">
                          <div className="flex flex-wrap items-baseline leading-none">
                            {parsedTokens.map((token, tIdx) => {
                              const transposedChord = token.chord
                                ? transposeFullChord(token.chord, transposeSemitones, preferFlats)
                                : '';

                              return (
                                <span key={tIdx} className="inline-flex flex-col mr-1.5 md:mr-2">
                                  <span className={`font-mono font-bold leading-tight select-none ${
                                    stageMode ? 'text-amber-400 text-lg md:text-xl' : 'text-amber-400 text-base md:text-lg'
                                  } min-h-[1.5rem]`}>
                                    {transposedChord || '\u00A0'}
                                  </span>
                                  <span className={`font-medium tracking-normal select-text ${
                                    stageMode ? 'text-zinc-100 font-semibold' : 'text-zinc-200'
                                  }`}>
                                    {token.text || '\u00A0'}
                                  </span>
                                </span>
                              );
                            })}
                          </div>

                          {showChip && (
                            <div className="mt-1.5 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleLineTab(secIdx, lineIdx)}
                                className={`text-[11px] flex items-center gap-1 px-2 py-0.5 rounded font-mono transition-all border ${
                                  isTabVisible
                                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                    : 'bg-zinc-900/70 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
                                }`}
                              >
                                <Guitar size={11} />
                                <span>{isTabVisible ? 'Ocultar Tab' : 'Tab'}</span>
                              </button>

                              {isTabVisible && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenTabEditor(secIdx, lineIdx)}
                                  className="text-[11px] flex items-center gap-1 px-2 py-0.5 rounded font-mono bg-zinc-900/80 text-amber-400/90 border border-amber-500/25 hover:bg-amber-500/10"
                                >
                                  <Edit3 size={11} />
                                  <span>Editar Tab</span>
                                </button>
                              )}
                            </div>
                          )}

                          {isTabVisible && (
                            <div className="mt-2.5 p-3 bg-zinc-950/95 rounded-xl border border-zinc-800 space-y-3 shadow-lg">
                              <div className="grid grid-cols-1 gap-3">
                                {(bassViewMode === '4' || bassViewMode === 'both') && (
                                  <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                                    <span className="text-[10px] font-bold text-emerald-400 font-mono block mb-1">4 Cordas (E-A-D-G)</span>
                                    <pre className="font-mono text-[11px] leading-snug text-emerald-300 overflow-x-auto p-1.5 bg-zinc-950 rounded custom-scrollbar">
                                      {tab4Content}
                                    </pre>
                                  </div>
                                )}

                                {(bassViewMode === '5' || bassViewMode === 'both') && (
                                  <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-cyan-800/40">
                                    <span className="text-[10px] font-bold text-cyan-400 font-mono block mb-1">5 Cordas (B-E-A-D-G)</span>
                                    <pre className="font-mono text-[11px] leading-snug text-cyan-300 overflow-x-auto p-1.5 bg-zinc-950 rounded custom-scrollbar">
                                      {tab5Content}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTÕES FLUTUANTES PARA NAVEGAÇÃO DE TOQUE NO MODO LIVE (TABLET) */}
        {isLiveMode && (
          <div className="absolute inset-y-0 inset-x-0 pointer-events-none flex justify-between items-center px-4 z-40">
            <button
              type="button"
              onClick={handlePrevLiveSong}
              disabled={liveSongIndex === 0}
              className="pointer-events-auto p-4 bg-zinc-900/80 hover:bg-emerald-600 text-white rounded-full border border-zinc-700/80 shadow-2xl backdrop-blur-md transition-all active:scale-95 disabled:opacity-0"
              title="Música Anterior (Seta Esquerda / Pedal)"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              onClick={handleNextLiveSong}
              disabled={liveSongIndex === setlistSongs.length - 1}
              className="pointer-events-auto p-4 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-full border border-emerald-400 shadow-2xl backdrop-blur-md transition-all active:scale-95 disabled:opacity-0"
              title="Próxima Música (Seta Direita / Pedal)"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </main>

      {/* MODAL COMPLETO DE EDIÇÃO DE CIFRA, SEÇÕES E TABLATURAS */}
      {isFullSongEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-text">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Edit3 className="text-emerald-400" size={18} />
                <h3 className="font-bold text-sm text-white">Editar Cifra & Estrutura</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRawTextImportModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Layers size={13} />
                  <span>Colar Cifra Bruta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullSongEditorOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Título</label>
                  <input
                    type="text"
                    value={editSongForm.title}
                    onChange={(e) => setEditSongForm({ ...editSongForm, title: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Tom Original</label>
                  <input
                    type="text"
                    value={editSongForm.originalKey}
                    onChange={(e) => setEditSongForm({ ...editSongForm, originalKey: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs font-mono rounded-xl px-3 py-2 text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Escala</label>
                  <select
                    value={editSongForm.scaleMode}
                    onChange={(e) => setEditSongForm({ ...editSongForm, scaleMode: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="major">Maior</option>
                    <option value="minor">Menor</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">BPM</label>
                  <input
                    type="number"
                    value={editSongForm.bpm}
                    onChange={(e) => setEditSongForm({ ...editSongForm, bpm: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs font-mono rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Abas de Seções */}
              <div className="flex items-center gap-2 flex-wrap border-b border-zinc-800 pb-3">
                {editSongForm.sections.map((sec, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveSectionIdx(idx);
                      setActiveLineIdx(0);
                      setSelectedSlotIdx(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeSectionIdx === idx
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {sec.sectionName || `Seção ${idx + 1}`}
                  </button>
                ))}
              </div>

              {/* Botões rápidos para adicionar seções */}
              <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800/80 space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">
                  Adicionar Seção
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleAddSection('Nova Seção')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-900 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Seção</span>
                  </button>

                  {PRESET_SECTIONS.map(secLabel => (
                    <button
                      key={secLabel}
                      type="button"
                      onClick={() => handleAddSection(secLabel)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/70 transition-colors"
                    >
                      + {secLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nome da seção ativa */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase shrink-0">Nome da Seção:</span>
                <input
                  type="text"
                  value={currentEditSection.sectionName || ''}
                  onChange={(e) => updateSectionNameInEditor(activeSectionIdx, e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 text-xs rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Atalhos rápidos de acordes para a sílaba selecionada */}
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase block">
                  1. Clique na sílaba/palavra abaixo • 2. Clique na nota para colocar em cima dela
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_CHORD_BUTTONS.map(chord => (
                    <button
                      key={chord}
                      type="button"
                      onClick={() => insertChordIntoActiveSyllable(chord)}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-zinc-800 text-xs font-mono font-bold transition-colors"
                    >
                      {chord}
                    </button>
                  ))}
                </div>
              </div>

              {/* Linhas da seção com clique por sílaba/palavra */}
              <div className="space-y-3">
                {currentEditSection.lines.map((line, lIdx) => {
                  const isFocusedLine = activeLineIdx === lIdx;
                  const slots = getSyllableSlots(line.text);
                  const currentTargetSlot = slots[selectedSlotIdx];

                  return (
                    <div
                      key={lIdx}
                      onClick={() => setActiveLineIdx(lIdx)}
                      className={`p-3 rounded-xl border transition-all space-y-2 ${
                        isFocusedLine
                          ? 'bg-zinc-950 border-emerald-500/60'
                          : 'bg-zinc-950/60 border-zinc-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-zinc-500">Linha {lIdx + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFullSongEditorOpen(false);
                              handleOpenTabEditor(activeSectionIdx, lIdx);
                            }}
                            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <Guitar size={12} />
                            <span>Editar Tab desta linha</span>
                          </button>
                          {currentEditSection.lines.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveLine(activeSectionIdx, lIdx);
                              }}
                              className="text-[11px] text-red-400 hover:text-red-300"
                            >
                              Remover
                            </button>
                          )}
                        </div>
                      </div>

                      <input
                        type="text"
                        value={line.text}
                        onFocus={() => setActiveLineIdx(lIdx)}
                        onChange={(e) => updateLineTextInEditor(activeSectionIdx, lIdx, e.target.value)}
                        placeholder="Digite a letra da linha..."
                        className="w-full bg-zinc-900 border border-zinc-800 text-xs font-mono rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:border-emerald-500"
                      />

                      <div className="pt-2 border-t border-zinc-800/70">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-zinc-400">
                            Toque na sílaba para colocar nota (toque na nota para remover):
                          </span>
                          {isFocusedLine && (
                            <span className="text-[10px] font-mono text-emerald-400">
                              Sílaba alvo: "{currentTargetSlot?.label?.trim() || 'espaço'}"
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-end gap-y-2 px-2 py-2 bg-zinc-900/70 rounded-lg border border-zinc-800/80">
                          {slots.map((slot, sIdx) => {
                            const isSelectedSlot = isFocusedLine && selectedSlotIdx === sIdx;
                            return (
                              <div
                                key={slot.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveLineIdx(lIdx);
                                  setSelectedSlotIdx(sIdx);
                                }}
                                className={`inline-flex flex-col items-start cursor-pointer rounded px-0.5 transition-colors ${
                                  isSelectedSlot ? 'bg-emerald-500/20 ring-1 ring-emerald-500/60' : 'hover:bg-zinc-800/80'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveLineIdx(lIdx);
                                    setSelectedSlotIdx(sIdx);
                                    if (slot.chord) {
                                      updateLineTextInEditor(
                                        activeSectionIdx,
                                        lIdx,
                                        attachChordToSlot(line.text, sIdx, '')
                                      );
                                    }
                                  }}
                                  title={slot.chord ? `Clique para remover ${slot.chord}` : 'Clique na nota acima para aplicar aqui'}
                                  className={`font-mono font-bold text-[11px] leading-none min-h-[15px] px-1 rounded ${
                                    slot.chord
                                      ? 'text-amber-300 bg-amber-500/20 hover:bg-red-500/20 hover:text-red-300'
                                      : 'text-transparent'
                                  }`}
                                >
                                  {slot.chord || '·'}
                                </button>
                                <span className="text-xs text-zinc-100 leading-tight whitespace-pre">
                                  {slot.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handleAddLineToSection(activeSectionIdx)}
                  className="w-full py-2 rounded-xl border border-dashed border-zinc-700 hover:border-emerald-500/60 text-xs font-semibold text-zinc-300 hover:text-emerald-300 flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Adicionar linha à seção</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsFullSongEditorOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveSongEdits}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMODAL PARA COLAR CIFRA BRUTA */}
      {rawTextImportModal && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 select-text">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">Converter Cifra Colada</h4>
              <button
                type="button"
                onClick={() => setRawTextImportModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-zinc-400">
                Cole a cifra com acordes em cima da letra ou entre colchetes. O editor organiza em seções automaticamente.
              </p>
              <textarea
                value={rawCifraInput}
                onChange={(e) => setRawCifraInput(e.target.value)}
                rows={10}
                placeholder={"[Verso]\n G D/F#\nMesmo sem flores no jardim"}
                className="w-full bg-zinc-950 font-mono text-xs text-emerald-300 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRawTextImportModal(false)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleApplyRawCifraToEditSong}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Aplicar Cifra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDIÇÃO DE TABLATURA & FRETBOARD */}
      {editingTabState && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Guitar className="text-emerald-400" size={20} />
                <h3 className="font-bold text-sm text-white">Editor de Tablatura (4 & 5 Cordas)</h3>
              </div>
              <button type="button" onClick={() => setEditingTabState(null)} className="p-1.5 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              <div className="flex gap-2 border-b border-zinc-800 pb-3">
                <button
                  type="button"
                  onClick={() => setEditingTabState({ ...editingTabState, activeTabType: 'tab4' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${
                    editingTabState.activeTabType === 'tab4' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  4 Cordas (EADG)
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTabState({ ...editingTabState, activeTabType: 'tab5' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${
                    editingTabState.activeTabType === 'tab5' ? 'bg-cyan-600 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  5 Cordas (BEADG)
                </button>
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-zinc-300 uppercase block">Fretboard Interativo</span>
                <div className="space-y-1.5 overflow-x-auto py-2">
                  {['G', 'D', 'A', 'E', ...(editingTabState.activeTabType === 'tab5' ? ['B'] : [])].map(strName => (
                    <div key={strName} className="flex items-center gap-1 min-w-[500px]">
                      <span className="w-6 font-mono text-xs font-bold text-emerald-400 text-center">{strName}</span>
                      <div className="flex gap-1 flex-1">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(fret => (
                          <button
                            key={fret}
                            type="button"
                            onClick={() => insertFretFromBoard(strName, fret)}
                            className="flex-1 h-8 rounded text-[10px] font-mono font-bold bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800 flex flex-col items-center justify-center"
                          >
                            <span>{fret}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <textarea
                value={editingTabState.activeTabType === 'tab5' ? editingTabState.content5 : editingTabState.content4}
                onChange={(e) => {
                  const val = e.target.value;
                  if (editingTabState.activeTabType === 'tab5') {
                    setEditingTabState({ ...editingTabState, content5: val });
                  } else {
                    setEditingTabState({ ...editingTabState, content4: val });
                  }
                }}
                rows={6}
                className="w-full bg-zinc-950 font-mono text-xs text-emerald-300 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button type="button" onClick={() => setEditingTabState(null)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold">
                Cancelar
              </button>
              <button type="button" onClick={handleSaveTab} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
                Salvar Tablatura
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ADICIONAR MÚSICA */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">Adicionar Nova Música</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[75vh] custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <input
                  type="text"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  placeholder="Título da Música *"
                  className="sm:col-span-2 bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={newSongKey}
                  onChange={(e) => setNewSongKey(e.target.value)}
                  placeholder="Tom (ex: C)"
                  className="bg-zinc-950 border border-zinc-800 text-xs font-mono rounded-xl px-3 py-2 text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={newSongScaleMode}
                  onChange={(e) => setNewSongScaleMode(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="major">Maior</option>
                  <option value="minor">Menor</option>
                </select>
                <input
                  type="number"
                  value={newSongBpm}
                  onChange={(e) => setNewSongBpm(e.target.value)}
                  placeholder="BPM"
                  className="bg-zinc-950 border border-zinc-800 text-xs font-mono rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <input
                type="text"
                value={newSongArtist}
                onChange={(e) => setNewSongArtist(e.target.value)}
                placeholder="Artista / Ministério"
                className="w-full bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />

              <textarea
                value={newSongContent}
                onChange={(e) => setNewSongContent(e.target.value)}
                rows={8}
                placeholder="Cole a cifra aqui... (com acordes em colchetes ou estilo Cifra Club)"
                className="w-full bg-zinc-950 font-mono text-xs text-emerald-300 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold">
                Cancelar
              </button>
              <button type="button" onClick={handleCreateSong} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
                Salvar Música
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}