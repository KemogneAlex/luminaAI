import { Metadata } from 'next';
import PrivacyPolicyContent from './client-content';

export const metadata: Metadata = {
  title: 'Politique de confidentialité - LuminaAI',
  description: 'Découvrez comment nous protégeons vos données personnelles',
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyContent />;
}
