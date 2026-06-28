import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LEADS_URL = 'https://functions.poehali.dev/PLACEHOLDER';

interface Lead {
  id: number;
  name: string;
  phone: string;
  company: string | null;
  team_size: string | null;
  created_at: string | null;
}

const teamLabels: Record<string, string> = {
  '1-5': '1–5',
  '5-20': '5–20',
  '20+': '20+',
};

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(LEADS_URL);
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Заявки</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Всего заявок: {leads.length}
            </p>
          </div>
          <Button variant="secondary" onClick={load} disabled={loading}>
            <Icon name="RefreshCw" size={16} className="mr-1" />
            Обновить
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Загрузка...</div>
          ) : error ? (
            <div className="py-20 text-center text-muted-foreground">
              Не удалось загрузить заявки
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              Заявок пока нет
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Менеджеров</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.company || '—'}</TableCell>
                    <TableCell>
                      {lead.team_size ? teamLabels[lead.team_size] || lead.team_size : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
