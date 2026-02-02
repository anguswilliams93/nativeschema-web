'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'
import NativeSchemaLogo from '@/components/native-schema-logo'

type AppIcon = {
  name: string
  icon: string
  bgColor: string
}

const apps: AppIcon[] = [
  {
    name: 'ActionStep',
    icon: 'https://avatars.githubusercontent.com/u/38897285?s=200&v=4',
    bgColor: 'bg-emerald-600/10 dark:bg-emerald-400/10'
  },
  {
    name: 'LawMaster',
    icon: 'https://www.lawmaster.com.au/favicon.ico',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10'
  },
  {
    name: 'HubSpot',
    icon: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    bgColor: 'bg-orange-600/10 dark:bg-orange-400/10'
  },
  {
    name: 'Salesforce',
    icon: 'https://www.salesforce.com/etc/designs/sfdc-www/en_us/favicon.ico',
    bgColor: 'bg-sky-600/10 dark:bg-sky-400/10'
  },
  {
    name: 'Microsoft',
    icon: 'https://img.icons8.com/color/48/microsoft.png',
    bgColor: 'bg-sky-600/10 dark:bg-sky-400/10'
  },
  {
    name: 'AWS',
    icon: 'https://img.icons8.com/color/48/amazon-web-services.png',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10'
  },
  {
    name: 'Google Cloud',
    icon: 'https://img.icons8.com/color/48/google-cloud.png',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10'
  },
  {
    name: 'Power BI',
    icon: 'https://img.icons8.com/color/48/power-bi.png',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10'
  }
]

export function AppIntegration() {
  return (
    <div className='relative flex h-90 w-full items-center justify-center max-lg:mx-auto max-lg:max-w-115 md:h-112'>
      {/* Central Native Schema Logo */}
      <MotionPreset
        fade
        zoom={{ initialScale: 0.8 }}
        delay={0.2}
        transition={{ duration: 0.6 }}
        className='bg-card relative z-10 flex size-20 md:size-24 items-center justify-center rounded-xl border-2 border-primary/30 shadow-[0_0_30px_color-mix(in_oklab,var(--primary)40%,transparent)]'
      >
        <NativeSchemaLogo className='size-14 md:size-18 text-primary' />
      </MotionPreset>

      {/* ActionStep - Top */}
      <MotionPreset
        fade
        slide={{ direction: 'down', offset: 30 }}
        delay={0.4}
        transition={{ duration: 0.5 }}
        className='absolute top-0 left-1/2 -translate-x-1/2'
      >
        <div className='relative flex flex-col items-center'>
          <Avatar className={`${apps[0].bgColor} border-background relative z-2 size-12 border-2 p-2.5`}>
            <AvatarImage src={apps[0].icon} alt={apps[0].name} />
            <AvatarFallback className='text-xs'>{apps[0].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -top-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-40 w-0.5'>
            <div className='border-border absolute inset-0 border-l-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 left-0 h-6 w-0.5 bg-gradient-to-b from-transparent'
              motionProps={{
                animate: { top: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>

      {/* Power BI - Top Left */}
      <MotionPreset
        fade
        slide={{ direction: 'down', offset: 30 }}
        delay={1.2}
        transition={{ duration: 0.5 }}
        className='absolute top-15 left-9 origin-top -rotate-47 lg:max-xl:top-14 lg:max-xl:left-0 lg:max-xl:-rotate-41'
      >
        <div className='relative flex flex-col items-center'>
          <Avatar
            className={`${apps[7].bgColor} border-background relative z-2 size-12 rotate-45 border-2 p-2.5`}
          >
            <AvatarImage src={apps[7].icon} alt={apps[7].name} />
            <AvatarFallback className='text-xs'>{apps[7].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -top-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-40 w-0.5'>
            <div className='border-border absolute inset-0 border-l-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 left-0 h-6 w-0.5 bg-gradient-to-b from-transparent'
              motionProps={{
                animate: { top: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>

      {/* LawMaster - Top Right */}
      <MotionPreset
        fade
        slide={{ direction: 'down', offset: 30 }}
        delay={0.6}
        transition={{ duration: 0.5 }}
        className='absolute top-15 right-9 origin-top rotate-47 lg:max-xl:top-14 lg:max-xl:right-0 lg:max-xl:rotate-41'
      >
        <div className='relative flex flex-col items-center'>
          <Avatar
            className={`${apps[1].bgColor} border-background relative z-2 size-12 -rotate-45 border-2 p-2.5`}
          >
            <AvatarImage src={apps[1].icon} alt={apps[1].name} />
            <AvatarFallback className='text-xs'>{apps[1].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -top-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-40 w-0.5'>
            <div className='border-border absolute inset-0 border-l-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 left-0 h-6 w-0.5 bg-gradient-to-b from-transparent'
              motionProps={{
                animate: { top: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>

      {/* HubSpot - Right */}
      <MotionPreset
        fade
        slide={{ direction: 'left', offset: 30 }}
        delay={0.7}
        transition={{ duration: 0.5 }}
        className='absolute top-1/2 right-0 -translate-y-1/2'
      >
        <div className='relative flex items-center'>
          <div className='relative h-0.5 w-40'>
            <div className='border-border absolute inset-0 border-t-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 right-0 h-0.5 w-6 bg-gradient-to-l from-transparent'
              motionProps={{
                animate: { right: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
          <Avatar className={`${apps[2].bgColor} border-background relative z-2 size-12 border-2 p-2.5`}>
            <AvatarImage src={apps[2].icon} alt={apps[2].name} />
            <AvatarFallback className='text-xs'>{apps[2].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -right-2 z-1 size-16 rounded-full'></div>
        </div>
      </MotionPreset>

      {/* Salesforce - Bottom Right */}
      <MotionPreset
        fade
        slide={{ direction: 'up', offset: 30 }}
        delay={0.8}
        transition={{ duration: 0.5 }}
        className='absolute right-28 bottom-7 rotate-[135deg] lg:max-xl:right-18 lg:max-xl:rotate-142'
      >
        <div className='relative flex flex-col items-center'>
          <Avatar
            className={`${apps[3].bgColor} border-background relative z-2 size-12 rotate-224 border-2 p-2.5`}
          >
            <AvatarImage src={apps[3].icon} alt={apps[3].name} />
            <AvatarFallback className='text-xs'>{apps[3].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -top-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-40 w-0.5'>
            <div className='border-border absolute inset-0 border-l-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 left-0 h-6 w-0.5 bg-gradient-to-b from-transparent'
              motionProps={{
                animate: { top: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>

      {/* Microsoft - Bottom */}
      <MotionPreset
        fade
        slide={{ direction: 'up', offset: 30 }}
        delay={0.9}
        transition={{ duration: 0.5 }}
        className='absolute bottom-0 left-1/2 -translate-x-1/2'
      >
        <div className='relative flex flex-col-reverse items-center'>
          <Avatar className={`${apps[4].bgColor} border-background relative z-2 size-12 border-2 p-2.5`}>
            <AvatarImage src={apps[4].icon} alt={apps[4].name} />
            <AvatarFallback className='text-xs'>{apps[4].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -bottom-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-40 w-0.5'>
            <div className='border-border absolute inset-0 border-l-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute bottom-0 left-0 h-6 w-0.5 bg-gradient-to-t from-transparent'
              motionProps={{
                animate: { bottom: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>

      {/* AWS - Bottom Left */}
      <MotionPreset
        fade
        slide={{ direction: 'up', offset: 30 }}
        delay={1}
        transition={{ duration: 0.5 }}
        className='absolute bottom-7 left-28 -rotate-[135deg] lg:max-xl:left-18 lg:max-xl:-rotate-142'
      >
        <div className='relative flex flex-col items-center'>
          <Avatar
            className={`${apps[5].bgColor} border-background relative z-2 size-12 rotate-135 border-2 p-2.5`}
          >
            <AvatarImage src={apps[5].icon} alt={apps[5].name} />
            <AvatarFallback className='text-xs'>{apps[5].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -top-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-40 w-0.5'>
            <div className='border-border absolute inset-0 border-l-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 left-0 h-6 w-0.5 bg-gradient-to-b from-transparent'
              motionProps={{
                animate: { top: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>

      {/* Google Cloud - Left */}
      <MotionPreset
        fade
        slide={{ direction: 'right', offset: 30 }}
        delay={1.1}
        transition={{ duration: 0.5 }}
        className='absolute top-1/2 left-0 -translate-y-1/2'
      >
        <div className='relative flex items-center'>
          <Avatar className={`${apps[6].bgColor} border-background relative z-2 size-12 border-2 p-2.5`}>
            <AvatarImage src={apps[6].icon} alt={apps[6].name} />
            <AvatarFallback className='text-xs'>{apps[6].name}</AvatarFallback>
          </Avatar>
          <div className='bg-background absolute -left-2 z-1 size-16 rounded-full'></div>
          <div className='relative h-0.5 w-40'>
            <div className='border-border absolute inset-0 border-t-2 border-dashed' />
            <MotionPreset
              component='span'
              className='to-primary absolute top-0 left-0 h-0.5 w-6 bg-gradient-to-r from-transparent'
              motionProps={{
                animate: { left: ['0%', '100%'] },
                transition: { duration: 2, repeat: Infinity, ease: 'linear', delay: 0.25 }
              }}
            />
          </div>
        </div>
      </MotionPreset>
    </div>
  )
}
