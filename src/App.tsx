import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Music,
  BookOpen,
  Guitar,
  Save,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Search,
  Maximize2,
  Minimize2,
  Trash2,
  Edit3,
  Check,
  X,
  FileText,
  Sparkles,
  ArrowDown,
  Columns,
  Square,
  HelpCircle,
  Copy,
  Layers,
  Wand2,
  Eye,
  Type,
  ListMusic,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown as ArrowDownIcon
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
            tab5: "G|-------------------------|\nD|-------------------------|\nA|-----------------3-3-2-0-|\nE|-0-0-x-7-7-0---x---------|\nB|-------------------------|"
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
            tab5: "G|---------------------------------|\nD|---------------------------------|\nA|-3-3-3-3-3-3-3-3-----------------|\nE|---------------------------------|\nB|-----------------8-8-8-8-8-8-8-8-|"
          }
        ]
      }
    ]
  }
];

// --- CONSTANTES MUSICAIS ---
const SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const STRING_NOTES = {
  G: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
  D: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'],
  A: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],
  E: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
  B: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D']
};

const COMMON_CHORD_BUTTONS = [
  'C', 'D', 'E', 'F', 'G', 'A', 'B',
  'Cm', 'Dm', 'Em', 'F#m', 'Gm', 'Am', 'Bm', 'C#m',
  'C/E', 'D/F#', 'G/B', 'A/C#', 'F#/A#',
  '7', 'maj7', 'm7', 'sus4', 'add9'
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
        text: line,
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
  const rootPart = parts[0];
  const bassPart = parts.length > 1 ? parts[1] : null;

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

const parseChordLine = (rawLine) => {
  const tokens = [];
  const regex = /\[([^\]]+)\]([^\[]*)/g;
  let match;
  const firstBracket = rawLine.indexOf('[');
  if (firstBracket > 0) {
    tokens.push({ chord: '', text: rawLine.substring(0, firstBracket) });
  } else if (firstBracket === -1) {
    return [{ chord: '', text: rawLine }];
  }

  regex.lastIndex = firstBracket >= 0 ? firstBracket : 0;
  while ((match = regex.exec(rawLine)) !== null) {
    tokens.push({ chord: match[1], text: match[2] });
  }
  return tokens;
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

export default function App() {
  const [songs, setSongs] = useState(() => {
    try {
      const saved = localStorage.getItem('bass_flow_songs_v1');
      return saved ? JSON.parse(saved) : INITIAL_SONGS;
    } catch {
      return INITIAL_SONGS;
    }
  });

  const [selectedSongId, setSelectedSongId] = useState(INITIAL_SONGS[0].id);
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
  const [stageMode, setStageMode] = useState(false);
  const [fontSize, setFontSize] = useState('text-xl');
  const [notesOpen, setNotesOpen] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState({});

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const sheetScrollRef = useRef(null);

  const [metronomeOn, setMetronomeOn] = useState(false);
  const [metronomeBpm, setMetronomeBpm] = useState(72);
  const [metronomeBeat, setMetronomeBeat] = useState(0);
  const [audioMuted, setAudioMuted] = useState(false);
  const audioCtxRef = useRef(null);

  const [editingTabState, setEditingTabState] = useState(null);
  const [isFullSongEditorOpen, setIsFullSongEditorOpen] = useState(false);
  const [editSongForm, setEditSongForm] = useState({
    title: '', artist: '', bpm: 72, originalKey: 'G', sections: []
  });
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [rawTextImportModal, setRawTextImportModal] = useState(false);
  const [rawCifraInput, setRawCifraInput] = useState('');
  const editLyricsTextareaRef = useRef(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongBpm, setNewSongBpm] = useState(70);
  const [newSongKey, setNewSongKey] = useState('G');
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
    return songs.find(s => s.id === selectedSongId) || songs[0] || INITIAL_SONGS[0];
  }, [songs, selectedSongId]);

  useEffect(() => {
    if (activeSong) {
      setMetronomeBpm(activeSong.bpm || 72);
      setTransposeSemitones(0);
      setExpandedTabs({});
    }
  }, [selectedSongId]);

  // Suporte a Pedal Bluetooth (AirTurn / PageFlip) e Teclado no Modo Live
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
  }, [isLiveMode, liveSongIndex, setlistSongIds]);

  const playClick = (isAccent) => {
    if (audioMuted) return;
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
    if (metronomeOn) {
      const intervalMs = (60 / metronomeBpm) * 1000;
      intervalId = setInterval(() => {
        setMetronomeBeat(prev => {
          const next = (prev % 4) + 1;
          playClick(next === 1);
          return next;
        });
      }, intervalMs);
    } else {
      setMetronomeBeat(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [metronomeOn, metronomeBpm, audioMuted]);

  useEffect(() => {
    let animationFrame;
    if (isAutoScrolling && sheetScrollRef.current) {
      const step = () => {
        if (sheetScrollRef.current) {
          sheetScrollRef.current.scrollTop += scrollSpeed * 0.4;
          const { scrollTop, scrollHeight, clientHeight } = sheetScrollRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 2) {
            setIsAutoScrolling(false);
            return;
          }
        }
        animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoScrolling, scrollSpeed]);

  const toggleLineTab = (secIdx, lineIdx) => {
    const key = `${secIdx}-${lineIdx}`;
    setExpandedTabs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateActiveSongNotes = (text) => {
    setSongs(prev => prev.map(s => s.id === activeSong.id ? { ...s, notes: text } : s));
  };

  const handleDeleteSong = (id) => {
    if (songs.length <= 1) return;
    const remaining = songs.filter(s => s.id !== id);
    setSongs(remaining);
    setSetlistSongIds(prev => prev.filter(sId => sId !== id));
    if (selectedSongId === id) {
      setSelectedSongId(remaining[0].id);
    }
  };

  const currentKey = useMemo(() => {
    return transposeFullChord(activeSong.originalKey, transposeSemitones, preferFlats);
  }, [activeSong.originalKey, transposeSemitones, preferFlats]);

  const filteredSongs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }, [songs, searchQuery]);

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
    if (!editingTabState) return;
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
    setEditSongForm({
      title: activeSong.title,
      artist: activeSong.artist,
      bpm: activeSong.bpm || 70,
      originalKey: activeSong.originalKey || 'G',
      sections: JSON.parse(JSON.stringify(activeSong.sections || []))
    });
    setActiveSectionIdx(0);
    setIsFullSongEditorOpen(true);
  };

  const handleSaveSongEdits = () => {
    setSongs(prev => prev.map(song => {
      if (song.id !== activeSong.id) return song;
      return {
        ...song,
        title: editSongForm.title.trim() || song.title,
        artist: editSongForm.artist.trim() || song.artist,
        bpm: parseInt(editSongForm.bpm, 10) || song.bpm,
        originalKey: editSongForm.originalKey,
        sections: editSongForm.sections
      };
    }));
    setIsFullSongEditorOpen(false);
  };

  const insertChordIntoActiveLine = (chordName, secIdx, lineIdx) => {
    const sections = [...editSongForm.sections];
    const targetLine = sections[secIdx].lines[lineIdx];
    const input = editLyricsTextareaRef.current;

    let newText = '';
    if (input && typeof input.selectionStart === 'number') {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const before = targetLine.text.substring(0, start);
      const after = targetLine.text.substring(end);
      newText = `${before}[${chordName}]${after}`;

      setTimeout(() => {
        if (editLyricsTextareaRef.current) {
          editLyricsTextareaRef.current.focus();
          const newPos = start + chordName.length + 2;
          editLyricsTextareaRef.current.setSelectionRange(newPos, newPos);
        }
      }, 50);
    } else {
      newText = `${targetLine.text} [${chordName}]`;
    }

    sections[secIdx].lines[lineIdx].text = newText;
    setEditSongForm({ ...editSongForm, sections });
  };

  const handleAddSection = () => {
    const newSec = {
      sectionName: "Nova Seção",
      lines: [
        {
          text: "[C]Nova linha de louvor",
          tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
          tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
        }
      ]
    };
    setEditSongForm(prev => ({
      ...prev,
      sections: [...prev.sections, newSec]
    }));
    setActiveSectionIdx(editSongForm.sections.length);
  };

  const handleAddLineToSection = (secIdx) => {
    const sections = [...editSongForm.sections];
    sections[secIdx].lines.push({
      text: "[C]Digite a cifra e letra aqui...",
      tab4: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|",
      tab5: "G|-----------------|\nD|-----------------|\nA|-----------------|\nE|-----------------|\nB|-----------------|"
    });
    setEditSongForm({ ...editSongForm, sections });
  };

  const handleRemoveLine = (secIdx, lineIdx) => {
    const sections = [...editSongForm.sections];
    if (sections[secIdx].lines.length <= 1) return;
    sections[secIdx].lines.splice(lineIdx, 1);
    setEditSongForm({ ...editSongForm, sections });
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
  };

  const insertTechnique = (symbol) => {
    if (!editingTabState) return;
    const is5 = editingTabState.activeTabType === 'tab5';
    const field = is5 ? 'content5' : 'content4';
    const curr = editingTabState[field];

    setEditingTabState({
      ...editingTabState,
      [field]: curr + symbol
    });
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

    let parsedSections = [];
    const parsedSectionsRaw = convertRawCifraToBracketed(newSongContent);
    parsedSections = parsedSectionsRaw;

    const newSong = {
      id: Date.now(),
      title: newSongTitle.trim(),
      artist: newSongArtist.trim() || 'Ministério de Louvor',
      bpm: parseInt(newSongBpm, 10) || 72,
      timeSig: "4/4",
      originalKey: newSongKey,
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
              onClick={() => setIsAddModalOpen(true)}
              title="Adicionar Nova Música"
              className="p-2 hover:bg-zinc-800 text-emerald-400 hover:text-emerald-300 rounded-lg border border-emerald-500/30 transition-all flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex border-b border-zinc-800 bg-zinc-950/60 p-1">
            <button
              onClick={() => setActiveTabMenu('library')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTabMenu === 'library'
                  ? 'bg-zinc-800 text-emerald-400 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen size={14} />
              <span>Repertório</span>
            </button>
            <button
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
                {filteredSongs.map(song => {
                  const isSelected = song.id === selectedSongId;
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
                          <span className="text-emerald-400 font-mono font-medium">{song.originalKey}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
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
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              <div className="p-2">
                <button
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
                    song.id === selectedSongId
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
                      onClick={() => moveSongInSetlist(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      onClick={() => moveSongInSetlist(idx, 1)}
                      disabled={idx === setlistSongs.length - 1}
                      className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDownIcon size={13} />
                    </button>
                    <button
                      onClick={() => toggleSongInSetlist(song.id)}
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
        {isLiveMode ? (
          <header className="bg-emerald-950 border-b border-emerald-800 px-4 py-2 flex items-center justify-between text-white shrink-0 z-30">
            <div className="flex items-center gap-3">
              <button
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
              <span className="text-emerald-400 font-mono text-xs">{activeSong.originalKey}</span>
              <span>•</span>
              <span className="truncate max-w-[200px] sm:max-w-xs">{activeSong.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevLiveSong}
                disabled={liveSongIndex === 0}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-zinc-700 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <button
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
          <header className={`border-b transition-colors px-4 py-2.5 shrink-0 flex flex-wrap items-center justify-between gap-2 md:gap-3 ${
            stageMode ? 'bg-zinc-950 border-amber-900/40 text-amber-100' : 'bg-zinc-900/90 border-zinc-800 backdrop-blur-md'
          }`}>
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors border border-zinc-700/50 shrink-0"
                title="Abrir/Fechar Setlist"
              >
                <BookOpen size={18} />
              </button>

              <div className="min-w-0">
                <h2 className="text-base md:text-lg font-bold truncate tracking-tight text-white flex items-center gap-2">
                  {activeSong.title}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {currentKey} {transposeSemitones !== 0 && (`${transposeSemitones > 0 ? '+' : ''}${transposeSemitones}`)}
                  </span>
                </h2>
                <p className="text-[11px] text-zinc-400 truncate">
                  {activeSong.artist} • Original: <span className="text-zinc-200 font-semibold">{activeSong.originalKey}</span> • {activeSong.bpm} BPM
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 shadow-inner">
                <button
                  onClick={() => setBassViewMode('4')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                    bassViewMode === '4' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  4 Cordas
                </button>
                <button
                  onClick={() => setBassViewMode('5')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                    bassViewMode === '5' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  5 Cordas
                </button>
                <button
                  onClick={() => setBassViewMode('both')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                    bassViewMode === 'both' ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Ambos
                </button>
              </div>

              <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                <button
                  onClick={() => setTransposeSemitones(t => t - 1)}
                  className="p-1 hover:bg-zinc-800 text-emerald-400 rounded-md"
                >
                  <Minus size={14} />
                </button>
                <div className="px-1.5 font-mono font-bold text-xs text-center min-w-[45px]">
                  {transposeSemitones === 0 ? 'TOM' : `${transposeSemitones > 0 ? '+' : ''}${transposeSemitones}st`}
                </div>
                <button
                  onClick={() => setTransposeSemitones(t => t + 1)}
                  className="p-1 hover:bg-zinc-800 text-emerald-400 rounded-md"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => setMetronomeOn(!metronomeOn)}
                className={`p-1.5 rounded-md flex items-center gap-1 font-mono text-xs font-bold transition-all ${
                  metronomeOn ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {metronomeOn ? <Pause size={13} /> : <Play size={13} />}
                <span>{metronomeBpm}</span>
              </button>

              <button
                onClick={() => setStageMode(!stageMode)}
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
          className={`flex-1 overflow-y-auto px-4 sm:px-8 md:px-14 lg:px-20 py-8 select-text transition-all scroll-smooth ${
            stageMode ? 'bg-zinc-950' : 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950'
          }`}
        >
          <div className="max-w-5xl mx-auto space-y-10 pb-40">
            <div className="border-b border-zinc-800/80 pb-4 flex flex-wrap items-end justify-between gap-3">
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
                  onClick={handleOpenSongEditor}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Edit3 size={14} />
                  <span>Editar Letras & Cifras</span>
                </button>
              </div>
            </div>

            {activeSong.sections && activeSong.sections.map((section, secIdx) => (
              <div key={secIdx} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${
                    section.sectionName.toLowerCase().includes('refrão') || section.sectionName.toLowerCase().includes('chorus')
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60'
                  }`}>
                    {section.sectionName}
                  </span>
                  <div className="h-px flex-1 bg-zinc-800/60" />
                </div>

                <div className="space-y-8 pl-1 md:pl-2">
                  {section.lines.map((line, lineIdx) => {
                    const parsedTokens = parseChordLine(line.text);
                    const tabKey = `${secIdx}-${lineIdx}`;
                    const isTabVisible = expandedTabs[tabKey];
                    const tab4Content = line.tab4 || line.tab || '';
                    const tab5Content = line.tab5 || (tab4Content ? convert4to5StringsTab(tab4Content) : '');

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
                                  stageMode ? 'text-amber-400 text-lg md:text-xl' : 'text-emerald-400 text-base md:text-lg'
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

                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => toggleLineTab(secIdx, lineIdx)}
                            className={`text-xs flex items-center gap-1.5 px-3 py-1 rounded-md font-mono transition-all border ${
                              isTabVisible
                                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                            }`}
                          >
                            <Guitar size={13} />
                            <span>{isTabVisible ? 'Ocultar Tab' : 'Ver Tablatura de Baixo'}</span>
                          </button>

                          <button
                            onClick={() => handleOpenTabEditor(secIdx, lineIdx)}
                            className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono bg-zinc-900/90 text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all"
                          >
                            <Edit3 size={13} />
                            <span>Editar Tab (4C / 5C)</span>
                          </button>
                        </div>

                        {isTabVisible && (
                          <div className="mt-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-4 shadow-xl">
                            <div className="grid grid-cols-1 gap-4">
                              {(bassViewMode === '4' || bassViewMode === 'both') && (
                                <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800/80">
                                  <span className="text-[11px] font-bold text-emerald-400 font-mono block mb-1">4 Cordas (E-A-D-G)</span>
                                  <pre className="font-mono text-xs text-emerald-300 overflow-x-auto p-2 bg-zinc-950 rounded custom-scrollbar">
                                    {tab4Content}
                                  </pre>
                                </div>
                              )}

                              {(bassViewMode === '5' || bassViewMode === 'both') && (
                                <div className="bg-zinc-900/90 p-3 rounded-lg border border-cyan-800/40">
                                  <span className="text-[11px] font-bold text-cyan-400 font-mono block mb-1">5 Cordas (B-E-A-D-G)</span>
                                  <pre className="font-mono text-xs text-cyan-300 overflow-x-auto p-2 bg-zinc-950 rounded custom-scrollbar">
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
        </div>

        {/* BOTÕES FLUTUANTES PARA NAVEGAÇÃO DE TOQUE NO MODO LIVE (TABLET) */}
        {isLiveMode && (
          <div className="absolute inset-y-0 inset-x-0 pointer-events-none flex justify-between items-center px-4 z-40">
            <button
              onClick={handlePrevLiveSong}
              disabled={liveSongIndex === 0}
              className="pointer-events-auto p-4 bg-zinc-900/80 hover:bg-emerald-600 text-white rounded-full border border-zinc-700/80 shadow-2xl backdrop-blur-md transition-all active:scale-95 disabled:opacity-0"
              title="Música Anterior (Seta Esquerda / Pedal)"
            >
              <ChevronLeft size={32} />
            </button>
            <button
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

      {/* MODAL DE EDIÇÃO DE TABLATURA & FRETBOARD */}
      {editingTabState && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Guitar className="text-emerald-400" size={20} />
                <h3 className="font-bold text-sm text-white">Editor de Tablatura (4 & 5 Cordas)</h3>
              </div>
              <button onClick={() => setEditingTabState(null)} className="p-1.5 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              <div className="flex gap-2 border-b border-zinc-800 pb-3">
                <button
                  onClick={() => setEditingTabState({...editingTabState, activeTabType: 'tab4'})}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${
                    editingTabState.activeTabType === 'tab4' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  4 Cordas (EADG)
                </button>
                <button
                  onClick={() => setEditingTabState({...editingTabState, activeTabType: 'tab5'})}
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
                    setEditingTabState({...editingTabState, content5: val});
                  } else {
                    setEditingTabState({...editingTabState, content4: val});
                  }
                }}
                rows={6}
                className="w-full bg-zinc-950 font-mono text-xs text-emerald-300 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setEditingTabState(null)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold">
                Cancelar
              </button>
              <button onClick={handleSaveTab} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
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
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[75vh] custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  placeholder="Título da Música *"
                  className="bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  placeholder="Artista / Ministério"
                  className="bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <textarea
                value={newSongContent}
                onChange={(e) => setNewSongContent(e.target.value)}
                rows={8}
                placeholder="Cole a cifra aqui... (com acordes em colchetes ou estilo Cifra Club)"
                className="w-full bg-zinc-950 font-mono text-xs text-emerald-300 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold">
                Cancelar
              </button>
              <button onClick={handleCreateSong} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
                Salvar Música
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
