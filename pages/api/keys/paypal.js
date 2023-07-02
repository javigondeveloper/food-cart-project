import { getSession } from 'next-auth/react';

const getPaypalClient = async (req, rest) => {
  const session = await getSession({ req });

  if (!session) {
    return rest.status(401).send('signin required');
  }

  rest.json(process.env.PAYPAL_CLIENT_ID || 'sb');
};

export default getPaypalClient;
