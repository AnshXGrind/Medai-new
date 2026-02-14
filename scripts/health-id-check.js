function randomDigits(n) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
}

function gen() {
  const state = '01';
  const district = randomDigits(4);
  const unique = randomDigits(8);
  return `${state}-${district}-${unique.slice(0, 4)}-${unique.slice(4, 8)}`;
}

const set = new Set();
for (let i = 0; i < 100; i++) {
  const id = gen();
  if (set.has(id)) {
    throw new Error(`duplicate ${id}`);
  }
  set.add(id);
}

console.log('Generated', set.size, 'unique Health IDs. Sample:', Array.from(set).slice(0, 5));
