
"use client";

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BookOpen, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/components/providers/i18n-provider';

interface JournalSectionProps {
  dailyVerse: string;
}

export function JournalSection({ dailyVerse }: JournalSectionProps) {
  const { t } = useI18n();
  const [entry, setEntry] = React.useState(t('journal.defaultEntry'));
  const { toast } = useToast();

  React.useEffect(() => {
    setEntry(t('journal.defaultEntry'));
  }, [t]);

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
              {t('journal.title')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('journal.subtitle')}</p>
          </div>
          
          <div className="space-y-6">
            <Textarea 
              placeholder={t('journal.placeholder')} 
              className="min-h-[400px] text-xl leading-relaxed resize-none p-8 rounded-[2rem] shadow-xl bg-card border-border text-foreground focus:ring-primary/20"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              disabled
            />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground italic">
                {t('journal.private')}
              </p>
              <Button 
                onClick={handleSave} 
                disabled
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 h-auto text-lg font-bold shadow-lg transition-all hover:scale-105"
              >
                <Save className="w-5 h-5 mr-2" /> {t('journal.save')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
