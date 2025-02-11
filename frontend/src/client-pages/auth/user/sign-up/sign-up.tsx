"use client"

import Container from '@/components/ui/container/container'
import Link from 'next/link'
import Logo from '@/components/ui/logo/logo'
import Title from '@/components/ui/title/title'
import InputField from '@/components/input-field/input-field'
import { signUpFields } from '@/constants/sign-up-fields'
import Button from '@/components/ui/button/button'
import { FormEvent, useState } from 'react'
import { URL } from '@/constants/url'
import { API_ENDPOINTS } from '@/constants/api-endpoints'
import styles from './sign-up.module.scss'
import { useRouter } from 'next/navigation'

export default function UserSignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if(password !== passwordConfirm) {
      setError("Password does not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${URL}${API_ENDPOINTS.USER_REGISTRATION}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password }),
    });

    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed.");
    }

    alert("Registration successful!");

    router.push("/user/sign-in");
    } catch(err) {
      setError(err instanceof Error ? err.message : "An error occured during registration.")
    } finally {
      setLoading(false);
    }
  }

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
          <form className={styles['sign-up__form']} onSubmit={handleSubmit}>
            {signUpFields.map((field, index) => (
              <InputField
                key={index}
                labelProps={field.labelProps}
                textInputProps={{
                  ...field.textInputProps,
                  value: field.textInputProps.name === "username" 
                    ? username 
                    : field.textInputProps.name === "email" 
                    ? email 
                    : field.textInputProps.name === "password" 
                    ? password 
                    : passwordConfirm,
                  onChange: (e) => {
                    if(field.textInputProps.name === "username") setUsername(e.target.value);
                    if(field.textInputProps.name === "email") setEmail(e.target.value);
                    if(field.textInputProps.name === "password") setPassword(e.target.value);
                    if(field.textInputProps.name === "passwordConfirm") setPasswordConfirm(e.target.value);
                  }
                }} 
              />
            ))}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create an account"}
            </Button>
            <Button variant='white'>Sign Up with Google</Button>
            <p className={styles['sign-up__form-text2']}>
              Already have an account?
              <Link href='/user/sign-in' className={styles['sign-up__form-link']}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </main>
  )
};
