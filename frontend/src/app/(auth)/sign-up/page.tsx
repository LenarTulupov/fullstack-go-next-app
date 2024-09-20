import Container from '@/components/ui/container/container'
import styles from './page.module.scss'
import Link from 'next/link'
import Logo from '@/components/ui/logo/logo'
import Title from '@/components/ui/title/title'
import InputField from '@/components/input-field/input-field'
import { signUpFields } from '@/constants/sign-up-fields'
import Button from '@/components/ui/button/button'

export default function SignUp() {
  return (
    <main className={styles['sign-up']}>
      <Container>
        <div className={styles['sign-up__wrapper']}>
          <Link href="/" className={styles['sign-up__logo-link']}>
            <Logo />
          </Link>
          <Title className={styles['sign-up__form-title']}>Sign Up</Title>
          <p className={styles['sign-up__form-text']}>
            Enter your information to create an account
          </p>
          <form className={styles['sign-up__form']}>
            {signUpFields.map((field, index) => (
              <InputField
                key={index}
                labelProps={field.labelProps}
                textInputProps={field.textInputProps} />
            ))}
            <Button>Create an account</Button>
            <Button variant='white'>Sign Up with Google</Button>
            <p className={styles['sign-up__form-text2']}>
              Already have an account?
              <Link href='/sign-in' className={styles['sign-up__form-link']}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </main>
  )
};
