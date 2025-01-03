// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json()

//     // Here you would typically:
//     // 1. Validate the email and password
//     // 2. Hash the password
//     // 3. Store in your database
//     // 4. Create a session or JWT token
//     // 5. Return the token or session cookie

//     // This is a simplified example
//     if (email && password) {
//       // Success response
//       return NextResponse.json({ 
//         success: true,
//         message: 'Account created successfully'
//       })
//     }

//     throw new Error('Invalid data')
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Failed to create account' },
//       { status: 400 }
//     )
//   }
// }

import { NextResponse } from 'next/server'
import { auth } from './config/firebase-admin'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Send verification email
      await sendEmailVerification(userCredential.user)

      return NextResponse.json({
        success: true,
        message: 'Account created successfully. Please check your email for verification.'
      })
    } catch (firebaseError: any) {
      // Handle specific Firebase errors
      let errorMessage = 'Failed to create account'

      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled'
          break
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters'
          break
      }

      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 400 }
      )
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error occurred' },
      { status: 500 }
    )
  }
}