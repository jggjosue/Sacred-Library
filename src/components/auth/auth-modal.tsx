
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Library } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-4 text-center">
          <div className="p-3 bg-primary/10 rounded-full">
            <Library className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-headline">{isSignUp ? 'Create an Account' : 'Welcome Back'}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isSignUp ? 'Join our community to save your journal entries.' : 'Sign in to access your personal sanctuary.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-col gap-2">
          <Button className="w-full" onClick={onClose}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
