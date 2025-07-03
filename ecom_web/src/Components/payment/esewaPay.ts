// esewaPay.ts
import type { EsewaPaymentProps } from '../../types/EsewaProps';

const esewaPay = ({ amount, productId }: EsewaPaymentProps) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

  const params = {
    amt: amount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: amount,
    pid: productId,
    scd: 'EPAYTEST',
    su: 'http://localhost:5173/success',
    fu: 'http://localhost:5173/failure',
  };

for (const key in params) {
  if (Object.prototype.hasOwnProperty.call(params, key)) {
    const typedKey = key as keyof typeof params;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = typedKey;
    input.value = String(params[typedKey]); // no more error
    form.appendChild(input);
  }
}

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export default esewaPay;
