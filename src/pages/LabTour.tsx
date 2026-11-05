import React, { useState } from 'react';
import {
  Laptop,
  CheckCircle2,
  Cpu,
  Monitor,
  Wifi,
  Zap,
  Maximize2,
  ArrowRight
} from 'lucide-react';
import { labTourData, type LabZone } from '../data/labTourData';
import { Heading, Text, Button, Badge, Card, Modal } from '../components/ui';
import { useNavigate } from 'react-router-dom';

interface LabTourProps {
  onNavigate?: (page: string, subSection?: string) => void;
}

export const LabTour: React.FC<LabTourProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLabModal, setActiveLabModal] = useState<LabZone | null>(null);

  const categories = ['All', 'Workstations', 'Accounting & Taxation', 'Typing & Speed Lab', 'Smart Classroom'];

  const filteredLabs = selectedCategory === 'All'
    ? labTourData
    : labTourData.filter((lab) => lab.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="blue" size="lg" leftIcon={<Laptop className="w-4 h-4" />}>
          Modern Infrastructure
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Virtual Computer Lab Tour
        </Heading>
        <Text size="lg" className="text-slate-300">
          Step inside our fully air-conditioned, gigabit-connected computer facility featuring 50+ dedicated workstations, live accounting servers, and precision typing setups.
        </Text>
      </div>

      {/* Lab Highlights Badges Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <Cpu className="w-6 h-6 text-apex-blue-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">Intel Core Powered</h4>
          <p className="text-xs text-slate-400">High speed 16GB RAM rigs</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <Monitor className="w-6 h-6 text-apex-yellow-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">1:1 Dedicated PC</h4>
          <p className="text-xs text-slate-400">Zero screen sharing</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <Zap className="w-6 h-6 text-emerald-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">10kVA Online UPS</h4>
          <p className="text-xs text-slate-400">100% power uninterrupted</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <Wifi className="w-6 h-6 text-cyan-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">Gigabit Fiber LAN</h4>
          <p className="text-xs text-slate-400">Instant portal access</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-apex-blue-600 text-white shadow-lg shadow-apex-blue-900/40'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lab Tour Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLabs.map((lab) => (
          <Card
            key={lab.id}
            variant="glass"
            className="p-0 overflow-hidden border border-slate-800 group hover:border-apex-blue-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Banner with overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={lab.imageUrl}
                  alt={lab.title}
                  className={`w-full h-full object-cover ${lab.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="blue" size="sm">
                    {lab.category}
                  </Badge>
                </div>
                <button
                  onClick={() => setActiveLabModal(lab)}
                  className="absolute bottom-4 right-4 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md transition-all cursor-pointer"
                  title="Expand Lab Photo & Specs"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Lab Content */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-apex-yellow-400 transition-colors">
                  {lab.title}
                </h3>
                <p className="text-xs text-apex-blue-300 font-medium">{lab.tagline}</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lab.description}
                </p>

                {/* Technical Specs List */}
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Hardware & Network Setup:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {lab.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="p-6 pt-0 flex items-center justify-between">
              <span className="text-xs text-slate-400">Visit in Person &bull; Open Mon-Sat</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (onNavigate) onNavigate('contact');
                  else navigate('/contact');
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Book Lab Visit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Expanded Lab Modal */}
      {activeLabModal && (
        <Modal
          isOpen={!!activeLabModal}
          onClose={() => setActiveLabModal(null)}
          title={activeLabModal.title}
          description={activeLabModal.tagline}
          size="lg"
        >
          <div className="space-y-4 text-slate-300">
            <div className="rounded-2xl overflow-hidden h-72 w-full">
              <img
                src={activeLabModal.imageUrl}
                alt={activeLabModal.title}
                className={`w-full h-full object-cover ${activeLabModal.imagePosition || 'object-center'}`}
              />
            </div>

            <p className="text-sm leading-relaxed">{activeLabModal.description}</p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-apex-yellow-400">
                Full Technical Specifications
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLabModal.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-800">
              <Button size="sm" variant="secondary" onClick={() => setActiveLabModal(null)}>
                Close
              </Button>
              <Button
                size="sm"
                variant="yellow"
                onClick={() => {
                  setActiveLabModal(null);
                  if (onNavigate) onNavigate('contact');
                  else navigate('/contact');
                }}
              >
                Schedule Free Demo
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
