
"use client";

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookOpen, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JournalSectionProps {
  dailyVerse: string;
}

export function JournalSection({ dailyVerse }: JournalSectionProps) {
  const [entry, setEntry] = React.useState('');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Success',
      description: 'Your reflection has been saved to your library.',
    });
    setEntry('');
  };

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-headline font-bold text-foreground">
              Your Journal
            </h2>
            <p className="text-muted-foreground text-lg">Capture your thoughts, prayers, and reflections.</p>
          </div>
          
          <div className="space-y-6">
            <Textarea 
              placeholder="Write your reflection here..." 
              className="min-h-[400px] text-xl leading-relaxed resize-none p-8 rounded-[2rem] shadow-xl bg-card border-border text-foreground focus:ring-primary/20"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground italic">
                Your entries are private and saved to your collection.
              </p>
              <Button 
                onClick={handleSave} 
                disabled
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 h-auto text-lg font-bold shadow-lg transition-all hover:scale-105"
              >
                <Save className="w-5 h-5 mr-2" /> Save Entry
              </Button>
            </div>
          </div>

          <div className="pt-12 text-center">
            <div className="inline-block p-6 bg-muted/30 rounded-2xl border border-dashed border-border">
              <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-[0.2em] mb-1">Community Circles</h4>
              <p className="text-xs text-muted-foreground">Coming Soon: Connect and share with others in the Library.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
