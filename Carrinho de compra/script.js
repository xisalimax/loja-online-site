const SHIPPING_DEFAULT = 15.00;

function parsePrice(text){
  if(!text) return 0;
  // remove "R$" e espaços, remover separador de milhares e trocar vírgula por ponto
  const cleaned = String(text).replace(/[R$\s]/g,'').replace(/\./g,'').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

function formatPrice(value){
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function updateTotals(){
  const items = Array.from(document.querySelectorAll('.cart-item'));
  let subtotal = 0;
  items.forEach(item => {
    const priceEl = item.querySelector('.item-price');
    const qtyInput = item.querySelector('input[type="number"]');
    const price = parsePrice(priceEl?.textContent || priceEl?.innerText);
    const qty = Math.max(1, Number(qtyInput?.value || 1));
    subtotal += price * qty;
  });

  const summaryLines = document.querySelectorAll('.summary .line');
  const shipping = subtotal > 0 ? SHIPPING_DEFAULT : 0;
  const total = subtotal + shipping;

  if(summaryLines[0]) summaryLines[0].querySelectorAll('span')[1].textContent = formatPrice(subtotal);
  if(summaryLines[1]) summaryLines[1].querySelectorAll('span')[1].textContent = formatPrice(shipping);
  const totalEl = document.querySelector('.summary .total span:nth-child(2)');
  if(totalEl) totalEl.textContent = formatPrice(total);

  const finishBtn = document.querySelector('.finish-btn');
  if(finishBtn) finishBtn.disabled = (items.length === 0);
}

function sanitizeQuantityInput(input){
  let v = Number(input.value) || 1;
  if(v < 1) v = 1;
  input.value = v;
}

function attachListeners(){
  // (+) e (-) buttons
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const container = e.target.closest('.cart-item');
      if(!container) return;
      const input = container.querySelector('input[type="number"]');
      const delta = (btn.textContent.trim() === '+') ? 1 : -1;
      const newVal = Math.max(1, Number(input.value || 1) + delta);
      input.value = newVal;
      updateTotals();
    });
  });

  // input number change
  document.querySelectorAll('.cart-item input[type="number"]').forEach(input => {
    input.addEventListener('change', (e) => {
      sanitizeQuantityInput(e.target);
      updateTotals();
    });
    input.addEventListener('input', () => {
      // opcional: validação em tempo real
    });
  });

  // remover item
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const container = e.target.closest('.cart-item');
      if(!container) return;
      container.remove();
      updateTotals();
    });
  });

  // botão finalizar (exemplo simples)
  const finishBtn = document.querySelector('.finish-btn');
  if(finishBtn){
    finishBtn.addEventListener('click', () => {
      const items = document.querySelectorAll('.cart-item');
      if(items.length === 0){
        alert('Seu carrinho está vazio.');
        return;
      }
      // aqui redireciona para checkout ou abre modal
      alert('Finalizando compra. Total: ' + document.querySelector('.summary .total span:nth-child(2)').textContent);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  attachListeners();
  updateTotals();
});
// ...existing code...