import styles from './page.module.scss'
import Container from "@/components/ui/container/container";
import InputField from "@/components/input-field/input-field";
import { signInFields } from '@/constants/sign-in-fields';
import Button from '@/components/ui/button/button';
import Title from '@/components/ui/title/title';
import Link from 'next/link';
import Logo from '@/components/ui/logo/logo';

export default function SignIn() {
  return (
    <main className={styles['sign-in']}>
      <Container>
        <div className={styles['sign-in__wrapper']}>
          <Link href="/" className={styles['sign-in__logo-link']}>
            <Logo />
          </Link>
          <Title className={styles['sign-in__form-title']}>Sign In</Title>
          <p className={styles['sign-in__form-text']}>
            Enter your email below to login to your account
          </p>
          <form className={styles['sign-in__form']}>
            {signInFields.map((field, index) => (
              <InputField
                key={index}
                labelProps={field.labelProps}
                textInputProps={field.textInputProps}
              />
            ))}
            <Button>Sign In</Button>
            <Button variant='white'>Login with Google</Button>
            <p className={styles['sign-in__form-text2']}>
              Don&apos;t have an account?
              <Link href='/sign-up' className={styles['sign-in__form-link']}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </main>
  )
};
