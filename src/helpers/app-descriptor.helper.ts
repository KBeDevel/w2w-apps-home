import { AppDescriptor } from '../types'

import FastTrackIcon from '../assets/svg/fasttrack-logo-new.svg'

export const applicationDescriptions: AppDescriptor[] = [
  {
    icon: {
      link: 'https://static.wetoworld.com/logos/fasttrack-logo-new.svg', 
      svg: FastTrackIcon,
      alt: 'Fast Track - Market Accelerator'
    },
    description: {
      long: 'Integral logistics, customs and consulting solution that supports export and international e-commerce fulfillment, facilitating Latin American exporters the delivery to the final customer of their products sold to the North American market through online sales channels, either directly or through marketplaces such as Amazon.'
    },
    references: [
      {
        title: 'Go to app',
        link: '/fast-track?ref=home&lang=en-US'
      }
    ],
    title: 'We To World - Fast Track',
    elementId: 'fasttrack'
  },
]
