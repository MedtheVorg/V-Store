import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { cn } from '@/lib/utils';
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export const ParticlesBackground = ({ className }: { className?: string }) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: RecursivePartial<IOptions> = useMemo(
    () => ({
      background: {
        color: {
          value: '#111827',
        },
      },
      fpsLimit: 120,

      particles: {
        color: {
          value: '#fff',
        },

        move: {
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: 1.0,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 2, max: 2 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      {init && (
        <Particles
          className={cn(className)}
          id="tsparticles"
          options={options}
        />
      )}
    </>
  );
};
