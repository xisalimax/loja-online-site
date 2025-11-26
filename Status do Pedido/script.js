// Atualizar o status do pedido dinamicamente
const statusLabel = document.querySelector('.status-label');
const progressSteps = document.querySelectorAll('.progress-step');

function updateOrderStatus(status) {
  statusLabel.textContent = status;

  progressSteps.forEach((step, index) => {
    step.classList.remove('completed', 'active');
    if (index < status) {
      step.classList.add('completed');
    } else if (index === status) {
      step.classList.add('active');
    }
  });
}

// Exemplo: Atualizar para "Entregue"
updateOrderStatus(3);