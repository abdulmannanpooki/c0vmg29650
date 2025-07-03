'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LayoutDashboard, Settings, User, Plus, Trash2, Edit3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const workflowsData = [
  {
    id: 1,
    title: 'Automated Email Campaign',
    description: 'Send personalized emails based on user behavior.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    steps: 5,
  },
  {
    id: 2,
    title: 'Social Media Scheduler',
    description: 'Plan and automate your social media posts.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    steps: 8,
  },
  {
    id: 3,
    title: 'Lead Qualification Bot',
    description: 'Automatically qualify leads with AI chatbots.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    steps: 6,
  },
];

export default function Home() {
  const [workflows, setWorkflows] = useState(workflowsData);
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    if (selectedWorkflow === id) setSelectedWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111827] border-r border-slate-700 flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-slate-700 font-extrabold text-2xl tracking-wide text-cyan-400">
          <Zap className="mr-2 h-8 w-8" /> FlowX
        </div>
        <nav className="flex flex-col flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-cyan-700 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5 text-cyan-400" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-cyan-700 transition-colors"
          >
            <Settings className="h-5 w-5 text-cyan-400" />
            Settings
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-cyan-700 transition-colors"
          >
            <User className="h-5 w-5 text-cyan-400" />
            Profile
          </a>
        </nav>
        <div className="p-4 border-t border-slate-700 flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=64&q=80" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Jane Doe</p>
            <p className="text-xs text-slate-400">jane.doe@example.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-cyan-400">
            Workflow Builder
          </h1>
          <Button variant="default" size="lg" className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> New Workflow
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflows.map((workflow) => (
            <Card
              key={workflow.id}
              onClick={() => setSelectedWorkflow(workflow.id)}
              className={`cursor-pointer border border-transparent hover:border-cyan-400 transition-colors shadow-lg ${
                selectedWorkflow === workflow.id ? 'border-cyan-400' : ''
              }`}
            >
              <CardHeader className="p-0 rounded-t-lg overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={workflow.image}
                    alt={workflow.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold">{workflow.title}</CardTitle>
                <CardDescription className="text-sm text-slate-300">
                  {workflow.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{workflow.steps} steps</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Edit workflow: ${workflow.title}`);
                    }}
                    aria-label={`Edit ${workflow.title}`}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete workflow "${workflow.title}"?`)) {
                        handleDelete(workflow.id);
                      }
                    }}
                    aria-label={`Delete ${workflow.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>

        {workflows.length === 0 && (
          <div className="mt-20 text-center text-slate-400">
            No workflows found. Create a new one to get started.
          </div>
        )}
      </main>
    </div>
  );
}
