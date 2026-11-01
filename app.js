
function calc() {
  const l = parseFloat(document.getElementById('bedLength').value) || 0;
  const w = parseFloat(document.getElementById('bedWidth').value) || 0;
  const d = parseFloat(document.getElementById('depthIn').value) || 3;

  const sqFt = l * w;
  // Volume in cu ft: sqFt * (d / 12)
  const cuFt = sqFt * (d / 12);
  const cuYds = cuFt / 27;

  const b2 = Math.ceil(cuFt / 2.0);
  const b15 = Math.ceil(cuFt / 1.5);

  document.getElementById('cuYards').innerText = cuYds.toFixed(2) + ' yd³';
  document.getElementById('bags2cu').innerText = b2 + ' bags';
  document.getElementById('bags15cu').innerText = b15 + ' bags';
  document.getElementById('bedSqFt').innerText = sqFt.toLocaleString() + ' sq ft';

  let verdict = '';
  if (cuYds >= 3.0) {
    const estBagCost = b2 * 4.50; // ~$4.50/bag
    const estBulkCost = (cuYds * 35) + 50; // ~$35/yd + $50 delivery
    verdict = `💡 <strong>Bulk Delivery Recommended:</strong> At <strong>${cuYds.toFixed(2)} cubic yards</strong> (${b2} bags), hauling bags in a car trunk requires multiple trips (~${b2 * 40} lbs). Buying bulk mulch delivered from a local landscape supply yard typically costs ~$${Math.round(estBulkCost)} vs ~$${Math.round(estBagCost)} for retail store bags.`;
  } else {
    verdict = `✅ <strong>Retail Bags Convenient:</strong> At <strong>${cuYds.toFixed(2)} cubic yards</strong>, grabbing <strong>${b2} bags of 2 cu ft mulch</strong> from Home Depot or Lowe's easily fits into an SUV or pickup truck bed in a single trip.`;
  }
  document.getElementById('bulkVerdict').innerHTML = verdict;
}

['bedLength', 'bedWidth', 'depthIn'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    if (document.getElementById(id + 'Range')) {
      document.getElementById(id + 'Range').value = document.getElementById(id).value;
    }
    calc();
  });
});

['bedLengthRange', 'bedWidthRange'].forEach(id => {
  const target = id.replace('Range', '');
  document.getElementById(id).addEventListener('input', (e) => {
    document.getElementById(target).value = e.target.value;
    calc();
  });
});

calc();
