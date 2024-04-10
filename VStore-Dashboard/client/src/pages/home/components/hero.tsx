import ReactWrapBalancer from 'react-wrap-balancer';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParticlesBackground } from '@/components/particlesBackground';

export default function Hero() {
  return (
    <>
      <section className="relative max-w-6xl px-4 mx-auto text-white sm:px-6">
        <ParticlesBackground className="absolute inset-0 -z-10" />
        <div className="relative flex items-center justify-center max-w-6xl px-4 mx-auto md:pt-32 md:pb-52 sm:px-6">
          <div className="pt-32 pb-16 text-center font-roboto ">
            {/* Hero content */}
            <h1
              className="pb-4 font-extrabold tracking-tight text-transparent text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60"
              data-aos="fade-down"
            >
              <ReactWrapBalancer>centralized control</ReactWrapBalancer>
            </h1>
            <p
              className="mb-8 text-lg font-semibold"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Empower Your Data: Seamlessly Create, Manage, and Consume Store
              Instances with Ease!
            </p>

            <div
              className="flex flex-col items-center max-w-xs gap-4 mx-auto text-xl sm:max-w-none sm:justify-center sm:flex-row "
              data-aos="fade-down"
              data-aos-delay="400"
            >
              <Link
                className="w-full md:w-auto justify-center flex items-center whitespace-nowrap transition  ease-in-out font-medium rounded px-6 py-1.5  text-white  border border-transparent bg-neutral-900 hover:border-white hover:bg-transparent group duration-500"
                to="/dashboard"
              >
                Get Started
                <ArrowRight className="w-3 h-3 tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-all duration-400 ease-in-out ml-1" />
              </Link>

              <Link
                className="flex items-center justify-center w-full p-2 transition duration-500 ease-in-out border border-transparent md:w-auto bg-neutral-900 hover:border-white hover:bg-transparent group"
                to="https://github.com/MedtheVorg/V-Store"
                target="_blank"
              >
                <Github />
                Star on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
