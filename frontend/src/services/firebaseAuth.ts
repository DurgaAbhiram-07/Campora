import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from '../config/firebase';
import { User } from '../types/user';
import toast from 'react-hot-toast';

export const firebaseAuthService = {
  // Sign in with Google
  async signInWithGoogle(): Promise<Partial<User> | null> {
    if (isFirebaseConfigured) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        
        const userPartial: Partial<User> = {
          id: `fb_${fbUser.uid}`,
          name: fbUser.displayName || 'Campus Student',
          email: fbUser.email || 'student@gmail.com',
          profilePhoto: fbUser.photoURL || undefined,
          verified: true,
          role: 'STUDENT',
          createdAt: new Date().toISOString(),
          collegeName: 'Chaitanya Engineering College',
          collegeId: `2026CS${Math.floor(1000 + Math.random() * 9000)}`,
          department: 'Computer Science',
          year: '2nd Year',
          hosteller: true,
        };

        // Try syncing to Firestore doc
        try {
          const userRef = doc(db, 'users', fbUser.uid);
          const existingSnap = await getDoc(userRef);
          if (!existingSnap.exists()) {
            await setDoc(userRef, userPartial);
          }
        } catch (e) {
          console.warn('Firestore sync optional warning:', e);
        }

        toast.success(`Signed in as ${userPartial.name} via Google!`);
        return userPartial;
      } catch (err: any) {
        console.error('Google Sign-In Error:', err);
        toast.error(err.message || 'Google Sign-In failed');
        return null;
      }
    } else {
      // Demo / Local simulated Google OAuth modal
      const demoEmail = prompt('Enter your Google Account email for fast sign in:', 'student.cec@gmail.com');
      if (!demoEmail) return null;

      const userName = demoEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase());
      const demoGoogleUser: Partial<User> = {
        id: `google_user_${Date.now()}`,
        name: userName || 'Alex Rivera',
        email: demoEmail,
        profilePhoto: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400`,
        verified: true,
        role: 'STUDENT',
        createdAt: new Date().toISOString(),
        collegeName: 'Chaitanya Engineering College',
        collegeId: `2026CS${Math.floor(1000 + Math.random() * 9000)}`,
        department: 'Computer Science',
        year: '3rd Year',
        hosteller: true,
      };

      toast.success(`Google Auth Successful! Signed in as ${demoGoogleUser.name}`);
      return demoGoogleUser;
    }
  },

  // Email Sign In
  async signInWithEmail(email: string, pass: string): Promise<Partial<User> | null> {
    if (isFirebaseConfigured) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        const fbUser = res.user;
        
        return {
          id: `fb_${fbUser.uid}`,
          name: fbUser.displayName || email.split('@')[0],
          email: fbUser.email || email,
          verified: true,
        };
      } catch (e: any) {
        toast.error(e.message || 'Email authentication failed');
        return null;
      }
    }
    return null;
  },

  // Email Sign Up
  async signUpWithEmail(email: string, pass: string, name: string): Promise<Partial<User> | null> {
    if (isFirebaseConfigured) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        const fbUser = res.user;
        const newUser: Partial<User> = {
          id: `fb_${fbUser.uid}`,
          name,
          email,
          verified: true,
          createdAt: new Date().toISOString(),
        };

        try {
          await setDoc(doc(db, 'users', fbUser.uid), newUser);
        } catch (e) {}

        return newUser;
      } catch (e: any) {
        toast.error(e.message || 'Signup failed');
        return null;
      }
    }
    return null;
  },

  async logout() {
    if (isFirebaseConfigured) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {}
    }
  }
};
