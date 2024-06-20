import { Router } from 'express';
import { Vonage } from '@vonage/server-sdk';

const router = Router();

const vonage = new Vonage({
  apiKey: '098c9df6',
  apiSecret: '0EJNaQyVjiSvDeXe',
});

router.post('/', (req, res) => {
  const { to, body } = req.body;

  vonage.sms.send({
    to,
    from: 'Vonage APIs',
    text: body,
  }, (err, responseData) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(200).json({ success: true, messageId: responseData.messages[0]['message-id'] });
    }
  });
});

export default router;
