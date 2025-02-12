"use client"

import styles from './sign-in.module.scss'
import Container from "@/components/ui/container/container";
import InputField from "@/components/input-field/input-field";
import { signInFields } from '@/constants/sign-in-fields';
import Button from '@/components/ui/button/button';
import Title from '@/components/ui/title/title';
import Link from 'next/link';
import Logo from '@/components/ui/logo/logo';
import { FormEvent, useState } from 'react';
import { URL } from '@/constants/url';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { useRouter } from 'next/navigation';

export default function UserSignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${URL}${API_ENDPOINTS.USER_LOGIN}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if(!response.ok) {
        const errorData = await response.json();
        if(response.status === 401) {
          throw new Error("Invalid email or password")
        }
        throw new Error(errorData.message || "Something went wrong")
      }

      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; max-age=3600;`

      router.push("/profile/user")
    } catch(err) {
      setError(err instanceof Error ? err.message : "An error occurred during user login")
    } finally {
      setLoading(false);
    }
  }

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
          <form className={styles['sign-in__form']} onSubmit={handleSubmit}>
            {signInFields.map((field, index) => (
              <InputField
                key={index}
                labelProps={field.labelProps}
                // textInputProps={field.textInputProps}
                textInputProps={{
                  ...field.textInputProps,
                  value: field.textInputProps.name === "email" 
                    ? email 
                    : field.textInputProps.name === "password"
                    ? password
                    : "",
                    onChange: (e) => {
                      if(field.textInputProps.name === "email") setEmail(e.target.value);
                      if(field.textInputProps.name === "password") setPassword(e.target.value);
                    }
                }}
              />
            ))}
            <Button type='submit' disabled={loading}>{loading ? "Singing in" : "Sign In"}</Button>
            <Button variant='white'>Login with Google</Button>
            <p className={styles['sign-in__form-text2']}>
              Don&apos;t have an account?
              <Link href='/user/sign-up' className={styles['sign-in__form-link']}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </main>
  )
};
