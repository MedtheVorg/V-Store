import Analytics from '@/public/images/analytics.png';
import {
  AlertTriangle,
  GitMerge,
  LayoutDashboard,
  Settings,
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: GitMerge,
      name: 'Efficient CMS Control:',
      description:
        "Easily handle CMS data for each store instance through intuitive CRUD operations accessible via the dashboard's user-friendly interface.",
    },
    {
      icon: AlertTriangle,
      name: 'Insightful Store Analytics',
      description:
        'Gain valuable insights into store sales performance with the overview page providing comprehensive statistics and summaries',
    },
    {
      icon: Settings,
      name: 'Streamlined Product Attributes',
      description:
        "Easily handle product attributes such as colors, sizes, and categories with dedicated CRUD functionality integrated into the dashboard's product management system",
    },
    {
      icon: LayoutDashboard,
      name: 'Clear Overview',
      description:
        "Get a clear overview of all your store's orders in one place",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-white bg-opacity-[0.02]">
      <div className="  px-4 mx-auto sm:px-6 max-w-7xl lg:max-w-[90vw] ">
        <div className="pt-16 pb-12 md:pt-24 md:pb-20">
          <div>
            {/* Section content */}
            <div className="grid lg:grid-cols-2 gap-y-12 place-items-center lg:gap-x-4">
              {/* Content */}
              <div
                className="order-1 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex pb-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-200">
                    Don't drown in alerts
                  </div>
                </div>
                <h3 className="pb-3 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60">
                  Centralize Store Management
                </h3>
                <p className="mb-8 text-lg text-zinc-400">
                  Streamline your store management by creating and managing
                  multiple store instances effortlessly within one dashboard.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:max-w-none">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="px-2 py-1 duration-500 rounded group hover:bg-zinc-100"
                    >
                      <div className="flex items-center mb-1 space-x-2 ">
                        <feature.icon className="w-4 h-4 duration-500 shrink-0 text-zinc-300 group-hover:text-zinc-950" />
                        <h4 className="font-medium duration-500 text-zinc-50 group-hover:text-zinc-950">
                          {feature.name}
                        </h4>
                      </div>
                      <p className="text-sm text-left duration-500 text-zinc-400 group-hover:text-zinc-950">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="z-10 flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                <img
                  src={Analytics}
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] z-10 rounded-xl border border-white/10"
                  data-aos="fade-down"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
