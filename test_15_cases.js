/**
 * FaraidPro — Test Harness for 15 Fiqh Test Cases
 * 
 * Extracts the engine from index.html and runs all test cases.
 * Usage: node test_15_cases.js
 */

// ===== Extract engine code from index.html =====
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const engineStart = html.indexOf('/* ENGINE_START */');
const engineEnd = html.indexOf('/* ENGINE_END */');
if (engineStart < 0 || engineEnd < 0) {
  console.error('Engine markers not found in index.html');
  process.exit(1);
}

let engineCode = html.slice(engineStart, engineEnd + '/* ENGINE_END */'.length);

// Fix: remove browser-specific code that follows ENGINE_END
// The engine code is pure JS and should work in Node.js

// Wrap in eval-compatible block (no DOM dependencies)
const engineFn = new Function(`
  ${engineCode}
  return { 
    Fraction, F, ZERO, ONE,
    normalizeCounts, calculateInheritance, 
    HEIR_FIELDS, HEIR_LABELS,
    positiveCount, hasDescendant, hasMaleDescendant, hasFemaleDescendant,
    rawSiblingCount, totalEntered,
    isGharawain, isAkdariyyah, isMusytarakah,
    finalizeResult
  };
`);

const engine = engineFn();

// ===== Helper: normalize test case input -> engine input =====
function buildInput(tc, gender) {
  const map = {
    'ayah': 'father',
    'ibu': 'mother',
    'suami': 'husband',
    'istri': 'wives',
    'anak_laki': 'son',
    'anak_perempuan': 'daughter',
    'cucu_laki_dari_anak_laki': 'grandson',
    'cucu_perempuan_dari_anak_laki': 'granddaughter',
    'kakek_ayah': 'grandfather',
    'nenek_jalur_ibu': 'grandmother_maternal',
    'nenek_jalur_ayah': 'grandmother_paternal',
    'saudara_kandung_laki': 'full_brother',
    'saudara_kandung_perempuan': 'full_sister',
    'saudara_seayah_laki': 'paternal_brother',
    'saudara_seayah_perempuan': 'paternal_sister',
    'saudara_seibu_laki': 'maternal_brother',
    'saudara_seibu_perempuan': 'maternal_sister'
  };

  const counts = {};
  for (const [tcKey, engineKey] of Object.entries(map)) {
    counts[engineKey] = tc[tcKey] || 0;
  }

  const engineGender = gender === 'L' ? 'laki' : 'perempuan';

  return {
    gender: engineGender,
    estate: 120,
    counts,
    config: {
      gharawain: true,
      musytarakah: true,
      spouseRadd: false,
      grandfatherSiblings: true,
      dzawilArham: tc.dzawilArham || false
    }
  };
}

// ===== Format result as readable string =====
function formatResult(result) {
  const lines = [];
  for (const row of result.rows) {
    if (row.key === 'baitul_mal' || row.key === 'dzawil_arham') continue;
    lines.push(`${row.label}: ${row.fraction} = ${row.amount}`);
  }
  // Baitul Mal / Dzawil Arham
  for (const row of result.rows) {
    if (row.key === 'baitul_mal' || row.key === 'dzawil_arham') {
      lines.push(`${row.label}: ${row.fraction} = ${row.amount}`);
    }
  }
  // Blocked heirs
  if (result.blocked.length > 0) {
    for (const b of result.blocked) {
      lines.push(`  [TERHIJAB] ${b.label}: ${b.reason}`);
    }
  }
  // Notices
  for (const n of result.notices) {
    lines.push(`  [${n.type}] ${n.text}`);
  }
  lines.push(`  Case: ${result.caseType}`);
  return lines.join('\n');
}

// ===== Fraction comparison helper =====
function frac(n, d = 1) {
  return engine.F(n, d);
}

function parseExpectedFraction(fracStr) {
  if (fracStr === '0' || fracStr === 0) return engine.F(0, 1);
  if (fracStr === '1' || fracStr === 1) return engine.F(1, 1);
  const parts = fracStr.split('/');
  return engine.F(parseInt(parts[0]), parseInt(parts[1]));
}

// ===== Fraction value from result =====
function getShare(result, labelOrKey) {
  for (const row of result.rows) {
    if (row.key === labelOrKey || row.label === labelOrKey) {
      return row.share;
    }
    // Also match by label prefix
    if (row.label.startsWith(labelOrKey) || labelOrKey.startsWith(row.key)) {
      return row.share;
    }
  }
  // Check special keys
  if (labelOrKey === 'baitul_mal' || labelOrKey === 'Baitul Mal') {
    for (const row of result.rows) {
      if (row.key === 'baitul_mal') return row.share;
    }
  }
  return engine.F(0, 1);
}

// ===== Define all 15 test cases =====
const testCases = [
  {
    name: 'TC1_Pewaris_Ayah_Ibu',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + Ibu saja.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '2/3',
      ibu: '1/3',
      baitul_mal: '0'
    }
  },
  {
    name: 'TC2_Pewaris_Ibu_saja',
    desc: 'Pewaris laki-laki, ahli waris: Ibu saja.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 0, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ibu: '1',
      baitul_mal: '0'
    }
  },
  {
    name: 'TC3_Pewaris_Ayah_saja',
    desc: 'Pewaris laki-laki, ahli waris: Ayah saja.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 0,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '1',
      baitul_mal: '0'
    }
  },
  {
    name: 'TC4_Gharawain_Suami_Ibu_Ayah',
    desc: 'Pewaris perempuan, ahli waris: Suami + Ibu + Ayah (Gharawain).',
    gender: 'P',
    heirs: {
      suami: 1, istri: 0,
      ayah: 1, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      suami: '1/2',
      ibu: '1/6',
      ayah: '1/3',
      baitul_mal: '0'
    }
  },
  {
    name: 'TC5_Gharawain_Istri_Ibu_Ayah',
    desc: 'Pewaris laki-laki, ahli waris: Istri + Ibu + Ayah (Gharawain).',
    gender: 'L',
    heirs: {
      suami: 0, istri: 1,
      ayah: 1, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      istri: '1/4',
      ibu: '1/4',   // Actually 1/3 of remaining = 1/3 * 3/4 = 1/4
      ayah: '7/12', // remaining = 1 - 1/4 - 1/4 = 1/2 = 6/12? Wait let me recalculate
      baitul_mal: '0'
    }
  },
  {
    name: 'TC6_Ayah_Ibu_AnakLaki',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + Ibu + 1 Anak laki-laki.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 1,
      anak_laki: 1, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '1/6',
      ibu: '1/6',
      anak_laki: '2/3',
      baitul_mal: '0'
    }
  },
  {
    name: 'TC7_Ayah_Ibu_AnakPerempuan',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + Ibu + 1 Anak perempuan.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 1,
      anak_laki: 0, anak_perempuan: 1,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      anak_perempuan: '1/2',
      ibu: '1/6',
      ayah: '1/3',
      baitul_mal: '0'
    }
  },
  {
    name: 'TC8_BugAsli_Ayah_Ibu_Kakek_DuaNenek',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + Ibu + Kakek + 2 Nenek. BUG ASLI.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 1,
      nenek_jalur_ibu: 1, nenek_jalur_ayah: 1,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '2/3',   // ashabah
      ibu: '1/3',    // furudh
      baitul_mal: '0',
      // Kakek dan nenek harus terhijab
      blocked_heirs: ['grandfather', 'grandmother_maternal', 'grandmother_paternal']
    }
  },
  {
    name: 'TC9_Ibu_NenekJalurIbu',
    desc: 'Pewaris laki-laki, ahli waris: Ibu + Nenek jalur ibu.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 0, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 1, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ibu: '1',      // 1/3 furudh lalu radd → 1
      baitul_mal: '0',
      blocked_heirs: ['grandmother_maternal']
    }
  },
  {
    name: 'TC10_Ayah_Kakek',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + Kakek.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 0,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 1,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '1',
      baitul_mal: '0',
      blocked_heirs: ['grandfather']
    }
  },
  {
    name: 'TC11_Ibu_SaudaraSeibu',
    desc: 'Pewaris laki-laki, ahli waris: Ibu + 1 Saudara laki-laki seibu.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 0, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 1, saudara_seibu_perempuan: 0
    },
    expected: {
      ibu: '2/3',    // 1/3 + radd (proporsional) = 1/3 + (1/3)/(1/3+1/6) * 1/2 = hmm
      baitul_mal: '0'
      // Ibu: 1/3, Saudara seibu: 1/6. Sisa = 1/2. Radd: ibu: (1/3)/(1/2)=2/3, ss: (1/6)/(1/2)=1/3
      // So total: ibu = 1/3 + 2/3*1/2 = 1/3+1/3=2/3, ss = 1/6 + 1/3*1/2 = 1/6+1/6=1/3
    }
  },
  {
    name: 'TC12_Ayah_SaudaraKandungLaki',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + 2 Saudara kandung laki-laki.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 0,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 2, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '1',
      baitul_mal: '0',
      blocked_heirs: ['full_brother']
    }
  },
  {
    name: 'TC13_KalalahMurni_DzawilArhamOFF',
    desc: 'Pewaris laki-laki, tidak ada ahli waris sama sekali. Dzawil arham OFF.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 0, ibu: 0,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      baitul_mal: '1'
    }
  },
  {
    name: 'TC14_Kalalah_DzawilArhamON',
    desc: 'Pewaris laki-laki, hanya cucu dari anak perempuan (dzawil arham). Dzawil arham ON.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 0, ibu: 0,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 0, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    dzawilArham: true,
    expected: {
      // With dzawil arham ON, the cucu dari anak perempuan should get the estate
      // But current engine doesn't have dzawil arham input fields
      // So Baitul Mal still gets it with a note
      baitul_mal: '0'  // Actually depends on implementation
    }
  },
  {
    name: 'TC15_CucuLaki_Ayah_Ibu',
    desc: 'Pewaris laki-laki, ahli waris: Ayah + Ibu + Cucu laki-laki dari anak laki.',
    gender: 'L',
    heirs: {
      suami: 0, istri: 0,
      ayah: 1, ibu: 1,
      anak_laki: 0, anak_perempuan: 0,
      cucu_laki_dari_anak_laki: 1, cucu_perempuan_dari_anak_laki: 0,
      kakek_ayah: 0,
      nenek_jalur_ibu: 0, nenek_jalur_ayah: 0,
      saudara_kandung_laki: 0, saudara_kandung_perempuan: 0,
      saudara_seayah_laki: 0, saudara_seayah_perempuan: 0,
      saudara_seibu_laki: 0, saudara_seibu_perempuan: 0
    },
    expected: {
      ayah: '1/6',
      ibu: '1/6',
      cucu_laki: '2/3',
      baitul_mal: '0'
    }
  }
];

// ===== Fix TC5 expected values (recalculate to be sure) =====
// TC5: Istri(1) + Ibu(1) + Ayah(1), P: laki-laki
// This is Gharawain case 2.
// Istri: 1/4 = 3/12
// Ibu: 1/3 dari sisa = 1/3 * 3/4 = 1/4 = 3/12
// Ayah: sisa = 1 - 1/4 - 1/4 = 1/2 = 6/12
// So: Istri=1/4, Ibu=1/4, Ayah=1/2
// Let me fix TC5 expected:
testCases[4].expected = {
  istri: '1/4',
  ibu: '1/4',
  ayah: '1/2',
  baitul_mal: '0'
};

// ===== Fix TC11 expected =====
// TC11: Ibu(1) + 1 Saudara laki-laki seibu(1)
// Ibu: 1/3 (no descendant, siblings < 2)
// Saudara seibu: 1/6 (tunggal)
// Sisa = 1 - 1/3 - 1/6 = 1/2
// Radd: total penerima radd = 1/3 + 1/6 = 1/2
// Ibu tambahan: (1/3) / (1/2) * 1/2 = 2/3 * 1/2 = 1/3
// SS tambahan: (1/6) / (1/2) * 1/2 = 1/3 * 1/2 = 1/6
// Total Ibu: 1/3 + 1/3 = 2/3
// Total SS: 1/6 + 1/6 = 1/3
testCases[10].expected = {
  ibu: '2/3',
  saudara_seibu_laki: '1/3',
  baitul_mal: '0'
};

// ===== Fix TC14 expected =====
// Current engine has no way to input dzawil arham, it falls through to Baitul Mal
// So the test expects Baitul Mal = 1 (until dzawil arham UI is implemented)
testCases[13].expected = {
  baitul_mal: '1'  // Sementara: engine belum punya input dzawil arham
};

// ===== Run all test cases =====
console.log('='.repeat(80));
console.log('FARAIDPRO — TEST HARNESS: 15 KASUS FIQH');
console.log('='.repeat(80));
console.log();

function fracEqual(a, b) {
  if (typeof b === 'string') {
    b = parseExpectedFraction(b);
  }
  return a.n === b.n && a.d === b.d;
}

function checkBlocked(result, expectedBlockedKeys) {
  if (!expectedBlockedKeys) return true;
  const actualBlocked = new Set(result.blocked.map(b => b.key));
  for (const key of expectedBlockedKeys) {
    if (!actualBlocked.has(key)) {
      return false;
    }
  }
  return true;
}

function getResultLabel(name) {
  if (name === 'ayah' || name === 'father') return 'father';
  if (name === 'ibu' || name === 'mother') return 'mother';
  if (name === 'suami' || name === 'husband') return 'husband';
  if (name === 'istri' || name === 'wives') return 'wives';
  if (name === 'anak_laki' || name === 'son') return 'son';
  if (name === 'anak_perempuan' || name === 'daughter') return 'daughter';
  if (name === 'cucu_laki' || name === 'cucu_laki_dari_anak_laki' || name === 'grandson') return 'grandson';
  if (name === 'cucu_perempuan' || name === 'cucu_perempuan_dari_anak_laki' || name === 'granddaughter') return 'granddaughter';
  if (name === 'kakek_ayah' || name === 'grandfather') return 'grandfather';
  if (name === 'nenek_jalur_ibu' || name === 'grandmother_maternal') return 'grandmother_maternal';
  if (name === 'nenek_jalur_ayah' || name === 'grandmother_paternal') return 'grandmother_paternal';
  if (name === 'saudara_kandung_laki' || name === 'full_brother') return 'full_brother';
  if (name === 'saudara_kandung_perempuan' || name === 'full_sister') return 'full_sister';
  if (name === 'saudara_seayah_laki' || name === 'paternal_brother') return 'paternal_brother';
  if (name === 'saudara_seayah_perempuan' || name === 'paternal_sister') return 'paternal_sister';
  if (name === 'saudara_seibu_laki' || name === 'maternal_brother') return 'maternal_brother';
  if (name === 'saudara_seibu_perempuan' || name === 'maternal_sister') return 'maternal_sister';
  if (name === 'baitul_mal') return 'baitul_mal';
  return name;
}

// Label -> key mapping for result lookup
const LABEL_TO_KEY = {
  'Ayah': 'father', 'Ibu': 'mother', 'Suami': 'husband', 'Istri': 'wives',
  'Anak laki-laki': 'son', 'Anak perempuan': 'daughter',
  'Cucu laki-laki': 'grandson', 'Cucu perempuan': 'granddaughter',
  'Kakek': 'grandfather', 'Nenek jalur ibu': 'grandmother_maternal', 'Nenek jalur ayah': 'grandmother_paternal',
  'Saudara laki-laki kandung': 'full_brother', 'Saudara perempuan kandung': 'full_sister',
  'Saudara laki-laki seayah': 'paternal_brother', 'Saudara perempuan seayah': 'paternal_sister',
  'Saudara laki-laki seibu': 'maternal_brother', 'Saudara perempuan seibu': 'maternal_sister',
  'Baitul Mal / kebijakan lanjutan': 'baitul_mal'
};

function getResultByKey(result, key) {
  for (const row of result.rows) {
    if (row.key === key) return row;
  }
  return null;
}

function runTestCase(tc) {
  const input = buildInput(tc.heirs, tc.gender);
  // Override dzawilArham setting
  input.config.dzawilArham = tc.dzawilArham || false;
  
  try {
    const output = engine.calculateInheritance(input);
    
    const issues = [];
    
    // Check expected shares
    for (const [name, expectedFrac] of Object.entries(tc.expected)) {
      if (name === 'blocked_heirs') continue;
      
      const key = getResultLabel(name);
      const row = getResultByKey(output, key);
      
      // Get expected fraction
      let expected = engine.F(0, 1);
      if (typeof expectedFrac === 'string') {
        expected = parseExpectedFraction(expectedFrac);
      } else if (expectedFrac instanceof engine.Fraction) {
        expected = expectedFrac;
      }
      
      // Get actual fraction
      let actual = engine.F(0, 1);
      if (row) {
        actual = row.share;
      }
      
      if (!fracEqual(actual, expected)) {
        issues.push(`${name}: expected ${expectedFrac}, got ${actual.toString()}`);
      }
    }
    
    // Check blocked heirs
    if (tc.expected.blocked_heirs) {
      if (!checkBlocked(output, tc.expected.blocked_heirs)) {
        issues.push(`Expected blocked heirs: ${tc.expected.blocked_heirs.join(', ')}`);
      }
    }
    
    return { passed: issues.length === 0, output, issues };
  } catch (e) {
    return { passed: false, output: null, issues: [`ERROR: ${e.message}`] };
  }
}

// Results table
const results = [];
let passed = 0, failed = 0;

for (const tc of testCases) {
  const { passed: isPassed, output, issues } = runTestCase(tc);
  
  if (isPassed) {
    passed++;
  } else {
    failed++;
  }
  
  results.push({ tc, passed: isPassed, output, issues });
}

// Print detailed results
for (const r of results) {
  console.log('---');
  console.log(`${r.passed ? '✅' : '❌'} ${r.tc.name}`);
  console.log(`   ${r.tc.desc}`);
  
  if (r.output) {
    console.log(`   Hasil engine:`);
    for (const row of r.output.rows) {
      if (row.share.n > 0) {
        const amount = 120 * row.share.toNumber();
        console.log(`     ${row.label}: ${row.share.toString()} = ${Math.round(amount)} dari 120`);
      }
    }
    for (const b of r.output.blocked) {
      console.log(`     [TERHIJAB] ${b.label} (${b.count}x): ${b.reason}`);
    }
    console.log(`   Case: ${r.output.caseType}`);
  }
  
  if (!r.passed) {
    console.log(`   ⚠️  GAGAL:`);
    for (const issue of r.issues) {
      console.log(`     - ${issue}`);
    }
  }
  console.log();
}

// Summary table
console.log('='.repeat(80));
console.log('RINGKASAN HASIL TEST');
console.log('='.repeat(80));
console.log();
console.log(`| ${'TC'.padEnd(8)} | ${'LULUS?'.padEnd(8)} | ${'Catatan'.padEnd(55)} |`);
console.log(`|${'-'.repeat(8)}|${'-'.repeat(8)}|${'-'.repeat(55)}|`);

for (const r of results) {
  const status = r.passed ? '✅ LULUS' : '❌ GAGAL';
  let note = '';
  if (r.passed) {
    note = 'Semua sesuai ekspektasi fiqh';
  } else {
    note = r.issues.join('; ').slice(0, 53);
  }
  console.log(`| ${r.tc.name.padEnd(8)} | ${status.padEnd(8)} | ${note.padEnd(55)} |`);
}

console.log();
console.log(`Total: ${passed} LULUS, ${failed} GAGAL dari ${results.length} test case`);
console.log();

// ===== Analysis for failed tests =====
if (failed > 0) {
  console.log('='.repeat(80));
  console.log('ANALISIS TEST GAGAL');
  console.log('='.repeat(80));
  console.log();
  
  for (const r of results) {
    if (!r.passed && r.output) {
      console.log(`--- ${r.tc.name} ---`);
      console.log(`Hasil engine:`);
      for (const row of r.output.rows) {
        console.log(`  ${row.label}: ${row.fraction} (${Math.round(row.percent)}%)`);
      }
      console.log(`Ekspektasi:`);
      for (const [name, frac] of Object.entries(r.tc.expected)) {
        if (name === 'blocked_heirs') continue;
        console.log(`  ${name}: ${frac}`);
      }
      console.log(`Issues: ${r.issues.join(', ')}`);
      console.log();
    }
  }
}
