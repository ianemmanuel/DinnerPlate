import { SignupForm } from './components/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup - Restaurant & Kitchen Dashboard',
  description: 'Create your restaurant or commercial kitchen account',
};

export default function SignupPage() {
  return (
   <SignupForm/>
  )
}