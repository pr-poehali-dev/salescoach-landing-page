import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const metrics = [
  { value: '+23%', label: 'рост конверсии', icon: 'TrendingUp' },
  { value: '-40%', label: 'время онбординга', icon: 'Timer' },
  { value: '100%', label: 'звонков под контролем', icon: 'ShieldCheck' },
];

const steps = [
  {
    icon: 'Upload',
    title: 'Загружаете запись',
    text: 'Просто добавьте аудио звонка менеджера в систему — поддерживаются все форматы.',
  },
  {
    icon: 'BrainCircuit',
    title: 'AI анализирует',
    text: 'Нейросеть разбирает разговор: структуру, возражения, ошибки и сильные стороны.',
  },
  {
    icon: 'FileBarChart',
    title: 'Получаете отчёт',
    text: 'Готовая оценка звонка с баллами и конкретными советами, что улучшить.',
  },
];

const pains = [
  {
    icon: 'EarOff',
    title: 'РОП не успевает слушать все звонки',
    text: 'Из сотен разговоров вручную проверяется лишь несколько — остальное вне контроля.',
  },
  {
    icon: 'RefreshCw',
    title: 'Менеджеры повторяют одни и те же ошибки',
    text: 'Без систематической обратной связи слабые места не закрываются месяцами.',
  },
  {
    icon: 'TrendingDown',
    title: 'Непонятно, почему падает конверсия',
    text: 'Цифры снижаются, а реальная причина прячется внутри разговоров с клиентами.',
  },
];

export default function Index() {
  const [team, setTeam] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[140px] animate-glow-pulse" />
        <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-[140px] animate-glow-pulse" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Icon name="AudioWaveform" size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">SalesCoach</span>
          </div>
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <a href="#demo">Получить демо</a>
          </Button>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pt-16 pb-24 text-center md:pt-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              AI-платформа для отделов продаж
            </span>
          </div>
          <h1 className="animate-fade-in mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Ваши менеджеры теряют сделки?{' '}
            <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
              AI покажет почему
            </span>
          </h1>
          <p className="animate-fade-in mx-auto mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Система анализирует каждый звонок ваших продавцов и даёт конкретные
            рекомендации — где теряется клиент и как закрывать больше сделок.
          </p>
          <div className="animate-fade-in mt-10 flex justify-center" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <Button asChild size="lg" className="h-13 px-8 text-base font-semibold">
              <a href="#demo">
                Получить демо
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </a>
            </Button>
          </div>
        </section>

        {/* Metrics */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-5 sm:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur transition-colors hover:border-primary/50"
              >
                <Icon name={m.icon} size={28} className="mx-auto mb-4 text-primary" />
                <div className="text-4xl font-extrabold tracking-tight">{m.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Как это работает</h2>
            <p className="mt-3 text-muted-foreground">Три простых шага от записи до результата</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-card/60 p-8 backdrop-blur">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <Icon name={s.icon} size={24} className="text-primary" />
                </div>
                <span className="absolute right-6 top-6 text-5xl font-extrabold text-secondary">
                  {i + 1}
                </span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pains */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Знакомые проблемы?</h2>
            <p className="mt-3 text-muted-foreground">SalesCoach решает их автоматически</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pains.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-secondary/30 p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/15">
                  <Icon name={p.icon} size={24} className="text-destructive" />
                </div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="demo" className="mx-auto max-w-2xl px-6 pb-24">
          <div className="rounded-3xl border border-border bg-card/70 p-8 backdrop-blur md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Получите демо SalesCoach</h2>
              <p className="mt-3 text-muted-foreground">
                Покажем платформу на ваших звонках за 30 минут
              </p>
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Как к вам обращаться" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Название компании</Label>
                <Input id="company" placeholder="ООО «Ваша компания»" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Количество менеджеров</Label>
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Выберите размер команды" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1–5</SelectItem>
                    <SelectItem value="5-20">5–20</SelectItem>
                    <SelectItem value="20+">20+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="h-13 w-full text-base font-semibold">
                Хочу демо
              </Button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Icon name="AudioWaveform" size={18} className="text-white" />
              </div>
              <span className="font-bold">SalesCoach</span>
            </div>
            <a href="mailto:hello@salescoach.ru" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <Icon name="Mail" size={16} />
              hello@salescoach.ru
            </a>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">Возможности</a>
              <a href="#" className="transition-colors hover:text-foreground">Тарифы</a>
              <a href="#" className="transition-colors hover:text-foreground">Контакты</a>
            </nav>
          </div>
          <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
            © 2026 SalesCoach. Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
}
