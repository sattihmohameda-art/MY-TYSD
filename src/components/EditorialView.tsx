import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ArticleContent } from '../data/content';

interface EditorialViewProps {
  article: ArticleContent;
  onBack: () => void;
}

export function EditorialView({ article, onBack }: EditorialViewProps) {
  return (
    <div className="pt-6 pb-16 px-6 max-w-screen-xl mx-auto space-y-8 bg-surface min-h-screen text-on-surface">
      <div className="relative flex items-center justify-center mb-6 py-4">
        <div className="absolute left-0">
          <button 
              onClick={onBack}
              className="flex items-center gap-2 text-black font-bold uppercase tracking-widest text-[9px] hover:opacity-70 transition-opacity"
          >
              <ArrowLeft size={16} />
              Retour
          </button>
        </div>
      </div>

      {/* Hero Article */}
      <article className="group cursor-pointer bg-on-surface/5 rounded-xl p-6 md:p-8 border border-on-surface/10 hover:border-on-surface/20 transition-all">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          <div className="w-full md:w-3/5">
            <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-on-surface text-surface text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {article.tag}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 flex flex-col justify-center py-4">
            <span className="font-headline text-sm font-semibold tracking-wider text-on-surface/40 mb-4 uppercase">
              {article.category}
            </span>
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold leading-[1.1] text-on-surface tracking-tighter mb-6">
              {article.title}
            </h2>
            <p className="text-on-surface/60 text-lg leading-relaxed max-w-md font-medium">
              {article.description}
            </p>
          </div>
        </div>
      </article>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-on-surface/5 border border-on-surface/10 rounded-xl p-8 flex flex-col justify-between hover:bg-on-surface/10 transition-colors">
          <div>
            <TrendingUp className="text-on-surface" size={32} />
            <h3 className="font-headline text-2xl font-bold leading-tight mb-4">Tendances {article.ageGroup}</h3>
            <p className="text-on-surface/40 text-sm font-medium">
              Découvrez les dernières nouveautés sélectionnées pour votre profil.
            </p>
          </div>
          <button className="mt-8 text-xs font-black uppercase tracking-widest text-on-surface text-left hover:underline">
            Explorer
          </button>
        </div>

        <div className="md:col-span-2 relative h-[400px] rounded-xl overflow-hidden shadow-sm group">
          <img
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
            alt="Context"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent flex flex-col justify-end p-8">
            <h3 className="font-headline text-3xl font-bold text-on-surface mb-2">Focus : {article.category}</h3>
            <p className="text-on-surface/80 text-sm max-w-md">
              Une immersion profonde dans les sujets qui comptent pour vous aujourd'hui.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
