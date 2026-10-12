/**
 * Standalone Blocks Interactive Script
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Calculator Logic
    const amountInput = document.getElementById('uas-calc-amount');
    const stageSelect = document.getElementById('uas-calc-stage');
    const complexitySelect = document.getElementById('uas-calc-complexity');
    const outputElem = document.getElementById('uas-calc-output');

    function calculateFee() {
      if (!amountInput || !outputElem) return;
      const amount = parseFloat(amountInput.value) || 0;
      const stage = parseFloat(stageSelect ? stageSelect.value : 1) || 1;
      const comp = parseFloat(complexitySelect ? complexitySelect.value : 1) || 1;

      // Base legal tariff estimate formula: ~7% with multipliers
      let fee = amount * 0.07 * stage * comp;
      if (fee < 5000000) fee = 5000000;

      outputElem.textContent = Math.round(fee).toLocaleString('fa-IR') + ' تومان';
    }

    if (amountInput) amountInput.addEventListener('input', calculateFee);
    if (stageSelect) stageSelect.addEventListener('change', calculateFee);
    if (complexitySelect) complexitySelect.addEventListener('change', calculateFee);
  });
})();
