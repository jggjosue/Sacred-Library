
"use client";

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Save, BookOpen, Send } from 'lucide-react';
import { generateReflectionPrompts } from '@/ai/flows/generate-reflection-prompts';
import { useToast } from '@/hooks/use-toast';

interface JournalSectionProps {
  dailyVerse: string;
}

export function JournalSection({ dailyVerse }: JournalSectionProps) {
  const [entry, setEntry] = React.useState('');
  const [prompts, setPrompts] = React.useState<string[]>([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = React.useState(false);
  const { toast } = useToast();

  const handleGeneratePrompts = async () => {
    setIsLoadingPrompts(true);
    try {
      const result = await generateReflectionPrompts({ dailyVerse });
      setPrompts(result.prompts);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate reflection prompts. Please try again.',
      });
    } finally {
      setIsLoadingPrompts(false);
    }
  };

  const handleSave = () => {
    toast({
      title: 'Success',
      description: 'Your reflection has been saved to your library.',
    });
    setEntry('');
  };

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-2 text-foreground">
                <BookOpen className="w-8 h-8 text-primary" />
                Your Journal
              </h2>
              <p className="text-muted-foreground">Capture your thoughts, prayers, and reflections.</p>
            </div>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Write your reflection here..." 
                className="min-h-[300px] text-lg leading-relaxed resize-none p-6 shadow-sm bg-card border-border text-foreground"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground italic">
                  Entry will be saved to your private collection.
                </p>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Entry
                </Button>
              </div>
            </div>
          </div>

          <aside className="w-full md:w-80 space-y-6">
            <Card className="border-border shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI Guide
                </CardTitle>
                <CardDescription>Get personalized reflection prompts based on the daily verse.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {prompts.length > 0 ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    {prompts.map((prompt, i) => (
                      <div 
                        key={i} 
                        className="p-3 text-sm bg-background rounded-md border border-border cursor-pointer hover:border-primary/30 transition-colors text-foreground"
                        onClick={() => setEntry(prev => prev + (prev ? '\n\n' : '') + prompt + '\n')}
                      >
                        {prompt}
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleGeneratePrompts}
                      disabled={isLoadingPrompts}
                      className="w-full text-xs text-primary"
                    >
                      {isLoadingPrompts ? 'Generating...' : 'Regenerate Prompts'}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-white" 
                    onClick={handleGeneratePrompts}
                    disabled={isLoadingPrompts}
                  >
                    {isLoadingPrompts ? (
                      'Generating...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate Prompts
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            <div className="p-6 bg-card rounded-lg border border-dashed border-border text-center space-y-2">
              <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest">Community</h4>
              <p className="text-xs text-muted-foreground">Coming Soon: Connect with others in the Library.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
